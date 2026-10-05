/**
 * Work explorer: search + domain + organization filters, list/grid views,
 * URL-synced state (?q=&domain=&org=&view=) and View Transitions on filter
 * changes. Each card links to its own case-study page (/experience/<slug>).
 */
type View = 'list' | 'grid';

interface State {
  q: string;
  domain: string;
  company: string;
  view: View;
}

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const fold = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');

export function initExplorer(root: HTMLElement) {
  const search = root.querySelector<HTMLInputElement>('[data-search]');
  const domainButtons = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-domain]'));
  const companies = Array.from(root.querySelectorAll<HTMLSelectElement>('select[data-company]'));
  const viewButtons = Array.from(root.querySelectorAll<HTMLButtonElement>('button[data-view]'));
  const list = root.querySelector<HTMLElement>('[data-list]');
  const items = Array.from(root.querySelectorAll<HTMLElement>('[data-project]'));
  const groups = Array.from(root.querySelectorAll<HTMLElement>('[data-year-group]'));
  const results = root.querySelector<HTMLElement>('[data-results]');
  const empty = root.querySelector<HTMLElement>('[data-empty]');
  const resets = root.querySelectorAll<HTMLButtonElement>('[data-reset]');
  if (!list || !items.length) return;

  // Old deep links (/experience#slug) now live at /experience/slug
  let legacy = '';
  try {
    legacy = decodeURIComponent(window.location.hash.slice(1));
  } catch {
    /* malformed escape in the hash: ignore it */
  }
  const legacyItem = legacy ? items.find((el) => el.dataset.slug === legacy) : undefined;
  const legacyHref = legacyItem?.querySelector<HTMLAnchorElement>('a[data-case]')?.href;
  if (legacyHref) {
    window.location.replace(legacyHref);
    return;
  }

  const labels = {
    many: root.dataset.resultsMany || '{count}',
    one: root.dataset.resultsOne || '1',
  };

  const params = new URLSearchParams(window.location.search);
  let storedView: View | null = null;
  try {
    storedView = localStorage.getItem('work-view') as View | null;
  } catch {
    /* storage unavailable */
  }
  // Unknown values from a hand-edited URL fall back to the defaults
  const domains = new Set(domainButtons.map((b) => b.dataset.domain));
  const orgs = new Set(companies.flatMap((c) => Array.from(c.options, (o) => o.value)));
  const domainParam = params.get('domain') ?? 'all';
  const orgParam = params.get('org') ?? '';
  const state: State = {
    q: params.get('q') ?? '',
    domain: domains.has(domainParam) ? domainParam : 'all',
    company: orgs.has(orgParam) ? orgParam : '',
    view: (params.get('view') ?? storedView) === 'grid' ? 'grid' : 'list',
  };

  // Card text (title, description, company) + extra terms (all tags, English title)
  const haystacks = new Map(items.map((el) => [el, fold(`${el.dataset.search || ''} ${el.textContent || ''}`)]));
  const terms = () => fold(state.q).split(/\s+/).filter(Boolean);

  const matches = (el: HTMLElement) => {
    if (state.domain !== 'all' && !(el.dataset.domains || '').split(' ').includes(state.domain)) return false;
    if (state.company && el.dataset.company !== state.company) return false;
    const hay = haystacks.get(el) || '';
    return terms().every((t) => hay.includes(t));
  };

  const render = () => {
    let count = 0;
    items.forEach((el) => {
      const ok = matches(el);
      el.hidden = !ok;
      if (ok) count += 1;
    });
    groups.forEach((g) => {
      const n = g.querySelectorAll('[data-project]:not([hidden])').length;
      g.hidden = n === 0;
      const badge = g.querySelector<HTMLElement>('[data-year-count]');
      if (badge) badge.textContent = String(n);
    });
    if (results) results.textContent = count === 1 ? labels.one : labels.many.replace('{count}', String(count));
    if (empty) empty.hidden = count !== 0;

    domainButtons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.domain === state.domain)));
    companies.forEach((c) => (c.value = state.company));
    viewButtons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.view === state.view)));
    list.dataset.view = state.view;
    root.classList.toggle('is-filtered', state.q !== '' || state.domain !== 'all' || state.company !== '');
  };

  const syncUrl = () => {
    const p = new URLSearchParams();
    if (state.q) p.set('q', state.q);
    if (state.domain !== 'all') p.set('domain', state.domain);
    if (state.company) p.set('org', state.company);
    if (state.view !== 'list') p.set('view', state.view);
    const qs = p.toString();
    window.history.replaceState(window.history.state, '', `${window.location.pathname}${qs ? `?${qs}` : ''}`);
  };

  // Animate layout changes with the View Transitions API when available
  const update = (mutate: () => void, animate = true) => {
    const apply = () => {
      mutate();
      render();
      syncUrl();
    };
    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => { ready: Promise<void>; finished: Promise<void> };
    };
    if (!animate || reduceMotion() || !doc.startViewTransition || document.visibilityState !== 'visible') {
      apply();
      return;
    }
    // Names exist only for the duration of a filter transition, so they never
    // collide with the cross-document case-cover morph.
    items.forEach((el) => el.style.setProperty('view-transition-name', `p-${el.dataset.slug}`));
    document.documentElement.classList.add('vt-filter');
    const cleanup = () => {
      document.documentElement.classList.remove('vt-filter');
      items.forEach((el) => el.style.removeProperty('view-transition-name'));
    };
    const transition = doc.startViewTransition(apply);
    // An aborted transition still runs the update; just swallow the rejection
    transition.ready.catch(() => {});
    transition.finished.then(cleanup, cleanup);
  };

  let typing = 0;
  search?.addEventListener('input', () => {
    window.clearTimeout(typing);
    const value = search.value;
    typing = window.setTimeout(() => update(() => (state.q = value.trim()), false), 90);
  });
  search?.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && search.value) {
      e.preventDefault();
      search.value = '';
      update(() => (state.q = ''), false);
    }
  });

  domainButtons.forEach((b) => b.addEventListener('click', () => update(() => (state.domain = b.dataset.domain || 'all'))));
  companies.forEach((c) => c.addEventListener('change', () => update(() => (state.company = c.value))));
  viewButtons.forEach((b) =>
    b.addEventListener('click', () => {
      update(() => (state.view = (b.dataset.view as View) || 'list'));
      try {
        localStorage.setItem('work-view', state.view);
      } catch {
        /* ignore */
      }
    }),
  );
  resets.forEach((b) =>
    b.addEventListener('click', () => {
      if (search) search.value = '';
      update(() => {
        state.q = '';
        state.domain = 'all';
        state.company = '';
      });
      search?.focus();
    }),
  );

  // "/" focuses the search field (ignored while typing in a field)
  // Ctrl/Cmd+K focuses the search: a modifier keeps it clear of WCAG 2.1.4
  const kbd = root.querySelector<HTMLElement>('[data-search-kbd]');
  if (kbd && /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent)) kbd.textContent = '⌘K';
  document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() !== 'k' || !(e.ctrlKey || e.metaKey) || e.altKey || e.shiftKey) return;
    e.preventDefault();
    search?.focus();
    search?.select();
  });

  if (search) search.value = state.q;
  // The server-rendered markup already shows the default state: skip the
  // initial pass over every card unless the URL or a stored view changes it
  const isDefault = !state.q && state.domain === 'all' && !state.company && state.view === 'list';
  if (!isDefault) render();
}
