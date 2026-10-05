/**
 * Site-wide interaction layer, built on Motion (motion.dev, vanilla API).
 *
 * Everything is opt-in through data attributes so pages stay plain HTML:
 *   .reveal / .split        scroll-triggered reveals (CSS transitions, toggled here)
 *   [data-count]            count-up numbers
 *   [data-tilt]             3D tilt (spring)
 *   .spotlight              pointer-tracked glow + border light
 *   [data-scramble]         text decode effect on reveal / hover
 *   [data-rotate]           rotating words
 *   [data-copy]             copy-to-clipboard with feedback
 *   [data-scroll-progress]  scroll-linked progress (writes --progress)
 */
import { animate, inView, scroll, springValue, motionValue, styleEffect } from 'motion';

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

// --- Reveals ----------------------------------------------------------------
function setupReveals() {
  const targets = document.querySelectorAll<HTMLElement>('.reveal:not(.is-in), .split:not(.split-load):not(.is-in)');
  if (!targets.length) return;
  if (reduceMotion()) {
    targets.forEach((el) => el.classList.add('is-in'));
    return;
  }
  inView(
    targets,
    (el) => {
      el.classList.add('is-in');
    },
    // Any intersection, not a share of the element: blocks taller than the
    // viewport (high zoom, short windows) must still reveal.
    { amount: 'some', margin: '0px 0px -8% 0px' },
  );
}

// --- Count-up ---------------------------------------------------------------
function formatNumber(value: number, decimals: number, locale: string) {
  return value.toLocaleString(locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

function setupCounters() {
  const counters = document.querySelectorAll<HTMLElement>('[data-count]');
  if (!counters.length) return;
  const locale = document.documentElement.lang === 'es' ? 'es-MX' : 'en-US';

  counters.forEach((el) => {
    const to = parseFloat(el.dataset.count || '0');
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const final = formatNumber(to, decimals, locale);
    if (reduceMotion()) {
      el.textContent = final;
      return;
    }
    el.textContent = formatNumber(0, decimals, locale);
    inView(
      el,
      () => {
        animate(0, to, {
          duration: 1.8,
          ease: [0.16, 1, 0.3, 1],
          onUpdate: (v) => (el.textContent = formatNumber(v, decimals, locale)),
          onComplete: () => (el.textContent = final),
        });
      },
      { amount: 0.6 },
    );
  });
}

// --- Tilt -------------------------------------------------------------------
function setupTilt() {
  if (!finePointer() || reduceMotion()) return;
  document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((el) => {
    if (el.dataset.tiltReady) return;
    el.dataset.tiltReady = 'true';
    const max = parseFloat(el.dataset.tilt || '') || 6;
    const rx = springValue(motionValue<number>(0), { stiffness: 160, damping: 20 });
    const ry = springValue(motionValue<number>(0), { stiffness: 160, damping: 20 });
    styleEffect(el, { rotateX: rx, rotateY: ry, transformPerspective: motionValue(1000) });

    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      ry.set(px * max * 2);
      rx.set(-py * max * 2);
      el.style.setProperty('--gx', `${(px + 0.5) * 100}%`);
      el.style.setProperty('--gy', `${(py + 0.5) * 100}%`);
    });
    el.addEventListener('pointerleave', () => {
      rx.set(0);
      ry.set(0);
    });
  });
}

// --- Spotlight --------------------------------------------------------------
function setupSpotlight() {
  document.querySelectorAll<HTMLElement>('.spotlight').forEach((el) => {
    if (el.dataset.spotReady) return;
    el.dataset.spotReady = 'true';
    let raf = 0;
    let px = 0;
    let py = 0;
    const write = () => {
      raf = 0;
      el.style.setProperty('--mx', `${px}px`);
      el.style.setProperty('--my', `${py}px`);
    };
    el.addEventListener(
      'pointermove',
      (e) => {
        const r = el.getBoundingClientRect();
        px = e.clientX - r.left;
        py = e.clientY - r.top;
        if (!raf) raf = requestAnimationFrame(write);
      },
      { passive: true },
    );
    el.addEventListener(
      'pointerdown',
      (e) => {
        if (e.pointerType !== 'touch') return;
        const r = el.getBoundingClientRect();
        px = e.clientX - r.left;
        py = e.clientY - r.top;
        write();
        el.classList.add('is-touch');
        window.setTimeout(() => el.classList.remove('is-touch'), 900);
      },
      { passive: true },
    );
  });
}

// --- Scramble (decode) ------------------------------------------------------
const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+=<>/\\';

function scrambleTo(el: HTMLElement, text: string, duration = 900) {
  if (reduceMotion()) {
    el.textContent = text;
    return;
  }
  const startAt = performance.now();
  const chars = [...text];
  const step = (now: number) => {
    const p = Math.min(1, (now - startAt) / duration);
    const revealed = Math.floor(p * chars.length);
    el.textContent = chars
      .map((c, i) => (i < revealed || c === ' ' ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
      .join('');
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = text;
  };
  requestAnimationFrame(step);
}

function setupScramble() {
  document.querySelectorAll<HTMLElement>('[data-scramble]').forEach((el) => {
    if (el.dataset.scrambleReady) return;
    el.dataset.scrambleReady = 'true';
    const text = el.textContent || '';
    el.setAttribute('aria-label', text);
    inView(el, () => scrambleTo(el, text, 700 + text.length * 18), { amount: 0.8 });
    const trigger = el.closest<HTMLElement>('[data-scramble-trigger]') ?? el;
    if (finePointer()) trigger.addEventListener('pointerenter', () => scrambleTo(el, text, 500));
  });
}

// --- Rotating words -----------------------------------------------------------
// Decodes through every role once and settles back on the first one in under
// five seconds, so it never needs a pause control (WCAG 2.2.2).
function setupRotators() {
  document.querySelectorAll<HTMLElement>('[data-rotate]').forEach((el) => {
    if (el.dataset.rotateReady) return;
    el.dataset.rotateReady = 'true';
    const words = (el.dataset.rotate || '').split('|').filter(Boolean);
    const target = el.querySelector<HTMLElement>('[data-rotate-word]');
    if (!target || words.length < 2 || reduceMotion()) return;
    const sequence = [...words.slice(1), words[0]];
    const stepMs = Math.min(1100, 4600 / sequence.length);
    sequence.forEach((word, i) => {
      window.setTimeout(() => scrambleTo(target, word, Math.min(600, stepMs - 150)), 1400 + i * stepMs);
    });
    if (finePointer()) {
      let i = 0;
      el.addEventListener('pointerenter', () => {
        i = (i + 1) % words.length;
        scrambleTo(target, words[i], 550);
      });
    }
  });
}

// --- User motion toggle (pauses shader, marquee and looping animations) ------
function setupMotionToggle() {
  const root = document.documentElement;
  const buttons = document.querySelectorAll<HTMLButtonElement>('[data-motion-toggle]');
  let paused = false;
  try {
    paused = localStorage.getItem('motion-paused') === '1';
  } catch {
    /* storage unavailable: default to playing */
  }
  const apply = (value: boolean) => {
    root.classList.toggle('motion-paused', value);
    buttons.forEach((btn) => {
      const label = btn.querySelector<HTMLElement>('[data-motion-label]');
      if (label) label.textContent = (value ? btn.dataset.labelPlay : btn.dataset.labelPause) ?? '';
    });
    window.dispatchEvent(new CustomEvent('motion-pause', { detail: value }));
  };
  apply(paused);
  buttons.forEach((btn) => {
    if (btn.dataset.toggleReady) return;
    btn.dataset.toggleReady = 'true';
    btn.addEventListener('click', () => {
      paused = !paused;
      try {
        localStorage.setItem('motion-paused', paused ? '1' : '0');
      } catch {
        /* ignore */
      }
      apply(paused);
    });
  });
}

// --- Copy to clipboard ------------------------------------------------------
function setupCopy() {
  const buttons = document.querySelectorAll<HTMLButtonElement>('[data-copy]');
  if (!buttons.length) return;
  // One polite live region announces the confirmation (WCAG 4.1.3)
  let status = document.querySelector<HTMLElement>('[data-copy-status]');
  if (!status) {
    status = document.createElement('p');
    status.className = 'sr-only';
    status.setAttribute('role', 'status');
    status.setAttribute('data-copy-status', '');
    document.body.append(status);
  }
  const live = status;
  buttons.forEach((btn) => {
    if (btn.dataset.copyReady) return;
    btn.dataset.copyReady = 'true';
    const label = btn.querySelector<HTMLElement>('[data-copy-label]');
    const original = label?.textContent ?? '';
    let timer = 0;
    btn.addEventListener('click', async () => {
      const value = btn.dataset.copy || '';
      try {
        await navigator.clipboard.writeText(value);
      } catch {
        window.location.href = `mailto:${value}`;
        return;
      }
      if (!label) return;
      label.textContent = btn.dataset.copied || 'Copied';
      live.textContent = label.textContent;
      btn.dataset.state = 'copied';
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        label.textContent = original;
        live.textContent = '';
        delete btn.dataset.state;
      }, 1800);
    });
  });
}

// --- Scroll-linked progress ---------------------------------------------------
function setupScrollProgress() {
  // Reduced motion keeps the full line (CSS default); native scroll-driven
  // animations (CSS animation-timeline) handle it where supported.
  if (reduceMotion() || window.CSS?.supports?.('animation-timeline: view()')) return;
  document.querySelectorAll<HTMLElement>('[data-scroll-progress]').forEach((el) => {
    if (el.dataset.progressReady) return;
    el.dataset.progressReady = 'true';
    scroll(
      (progress: number) => {
        el.style.setProperty('--progress', progress.toFixed(4));
      },
      { target: el, offset: ['start 75%', 'end 55%'] },
    );
  });
}

// --- Case-study morph ---------------------------------------------------------
// Clicking a project card names its cover "case-cover"; the case page's hero
// cover carries the same name, so the browser morphs one into the other
// (cross-document View Transitions, progressive enhancement).
function setupCaseMorph() {
  // On a case page the hero cover already carries the name
  const hero = document.getElementById('case-hero');
  const clear = () =>
    document.querySelectorAll<HTMLElement>('[data-cover]').forEach((c) => c.style.removeProperty('view-transition-name'));
  document.addEventListener('click', (e) => {
    const link = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[data-case]');
    if (!link || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const cover = link.closest('[data-case-root]')?.querySelector<HTMLElement>('[data-cover]');
    clear();
    if (cover && !reduceMotion()) {
      // A duplicated name aborts the transition: release the hero first
      hero?.style.setProperty('view-transition-name', 'none');
      cover.style.setProperty('view-transition-name', 'case-cover');
    }
  });
  // Coming back (bfcache) must not leave a stale name behind
  window.addEventListener('pageshow', () => {
    clear();
    hero?.style.setProperty('view-transition-name', 'case-cover');
  });
}

// --- Offscreen pause ---------------------------------------------------------
// Looping CSS/SVG animations ([data-loop]) only run while on screen: no style
// or paint work for things nobody can see.
function setupOffscreenPause() {
  const loops = document.querySelectorAll<HTMLElement>('[data-loop]');
  if (!loops.length || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.target.toggleAttribute('data-offscreen', !e.isIntersecting)),
    { rootMargin: '120px' },
  );
  loops.forEach((el) => {
    el.setAttribute('data-offscreen', '');
    io.observe(el);
  });
}

export function initInteractions() {
  setupMotionToggle();
  setupOffscreenPause();
  setupCaseMorph();
  setupReveals();
  setupCounters();
  setupTilt();
  setupSpotlight();
  setupScramble();
  setupRotators();
  setupCopy();
  setupScrollProgress();
  (window as unknown as { __revealReady?: boolean }).__revealReady = true;
}

export { scrambleTo };
