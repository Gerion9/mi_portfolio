/**
 * Procedural project covers, generated at build time as inline SVG.
 * One visual language per domain, seeded by the project slug so every cover
 * is unique and stable across builds:
 *   geo  -> hexbin choropleth + contour rings (H3 / topography)
 *   llm  -> attention matrix + token arcs
 *   ml   -> history + forecast cone
 *   data -> pipeline DAG + bars
 *   web  -> interface wireframe
 */
import type { CoverVariant, Domain } from './projects';

const W = 400;
const H = 250;

export const COVER_COLORS: Record<Domain, [string, string]> = {
  geo: ['#2dd4bf', '#6366f1'],
  llm: ['#a78bfa', '#ec4899'],
  ml: ['#fbbf24', '#f24968'],
  data: ['#38bdf8', '#6366f1'],
  web: ['#f472b6', '#8b5cf6'],
};

function hash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function rng(seed: number) {
  let a = seed || 1;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const r1 = (n: number) => Math.round(n * 10) / 10;

/** Smooth closed curve through points (quadratic segments via midpoints). */
function smoothClosed(points: [number, number][]): string {
  const n = points.length;
  const mid = (a: [number, number], b: [number, number]) => [r1((a[0] + b[0]) / 2), r1((a[1] + b[1]) / 2)];
  const start = mid(points[n - 1], points[0]);
  let d = `M${start[0]} ${start[1]}`;
  for (let i = 0; i < n; i++) {
    const p = points[i];
    const m = mid(p, points[(i + 1) % n]);
    d += `Q${r1(p[0])} ${r1(p[1])} ${m[0]} ${m[1]}`;
  }
  return `${d}Z`;
}

function geoArt(rand: () => number, uid: string): string {
  const blobs = Array.from({ length: 3 }, () => ({
    x: 70 + rand() * 260,
    y: 50 + rand() * 150,
    s: 55 + rand() * 50,
    w: 0.6 + rand() * 0.5,
  }));
  const field = (x: number, y: number) =>
    blobs.reduce((acc, b) => acc + b.w * Math.exp(-((x - b.x) ** 2 + (y - b.y) ** 2) / (2 * b.s * b.s)), 0);

  // Hexbin choropleth (pointy-top cells), bucketed by value into 5 opacity classes
  const s = 14;
  const hw = r1((Math.sqrt(3) * s) / 2);
  const buckets: string[][] = [[], [], [], [], []];
  let peak = { v: 0, x: 0, y: 0 };
  for (let row = 0; row * s * 1.5 < H + s; row++) {
    for (let col = 0; col * hw * 2 < W + hw; col++) {
      const cx = col * hw * 2 + (row % 2 ? hw : 0);
      const cy = row * s * 1.5;
      const v = field(cx, cy) + (rand() - 0.5) * 0.08;
      if (v < 0.32) continue;
      if (v > peak.v) peak = { v, x: cx, y: cy };
      const b = Math.min(4, Math.floor((v - 0.32) * 6));
      buckets[b].push(`M${r1(cx)} ${r1(cy - s + 1)}l${hw - 1} ${(s - 1) / 2}v${s - 1}l-${hw - 1} ${(s - 1) / 2}l-${hw - 1} -${(s - 1) / 2}v-${s - 1}z`);
    }
  }
  const opacities = [0.12, 0.22, 0.36, 0.52, 0.72];
  const hexes = buckets
    .map((paths, i) => (paths.length ? `<path d="${paths.join('')}" fill="url(#g-${uid})" fill-opacity="${opacities[i]}"/>` : ''))
    .join('');

  // Contour rings around the densest blob
  const top = blobs.reduce((a, b) => (b.w > a.w ? b : a));
  const phase = rand() * Math.PI * 2;
  const rings = [26, 44, 64, 86]
    .map((radius, k) => {
      const pts: [number, number][] = Array.from({ length: 14 }, (_, i) => {
        const a = (i / 14) * Math.PI * 2;
        const wobble = 1 + 0.16 * Math.sin(a * 3 + phase + k) + 0.08 * Math.sin(a * 5 - phase);
        return [top.x + Math.cos(a) * radius * wobble * 1.25, top.y + Math.sin(a) * radius * wobble * 0.8];
      });
      return `<path d="${smoothClosed(pts)}" fill="none" stroke="#fff" stroke-opacity="${0.22 - k * 0.04}" stroke-width="1"/>`;
    })
    .join('');

  const pin = `<circle cx="${r1(peak.x)}" cy="${r1(peak.y)}" r="9" fill="none" stroke="#fff" stroke-opacity=".7"/><circle cx="${r1(peak.x)}" cy="${r1(peak.y)}" r="3.2" fill="#fff"/>`;
  return hexes + rings + pin;
}

function llmArt(rand: () => number, uid: string): string {
  const n = 9;
  const size = 15;
  const gap = 4;
  const ox = W - n * (size + gap) - 28;
  const oy = (H - n * (size + gap)) / 2 + 6;
  const buckets: string[][] = [[], [], [], [], []];
  const focus = Math.floor(rand() * n);
  for (let i = 0; i < n; i++) {
    // causal attention: row i attends to columns <= i
    const weights = Array.from({ length: n }, (_, j) => {
      if (j > i) return 0;
      const diag = j === i ? 1.4 : 0;
      const recency = Math.exp(-(i - j) * 0.55);
      const head = j === focus ? 1.1 : 0;
      return Math.exp(diag + recency + head + rand() * 0.9);
    });
    const sum = weights.reduce((a, b) => a + b, 0);
    weights.forEach((w, j) => {
      if (j > i) return;
      const p = w / sum;
      const b = Math.min(4, Math.floor(p * 9));
      buckets[b].push(`M${ox + j * (size + gap)} ${oy + i * (size + gap)}h${size}v${size}h-${size}z`);
    });
  }
  const opacities = [0.14, 0.3, 0.48, 0.68, 0.92];
  const cells = buckets
    .map((paths, i) => (paths.length ? `<path d="${paths.join('')}" fill="url(#g-${uid})" fill-opacity="${opacities[i]}"/>` : ''))
    .join('');
  const empty = `<path d="${Array.from({ length: n }, (_, i) =>
    Array.from({ length: n - i - 1 }, (_, k) => {
      const j = i + k + 1;
      return `M${ox + j * (size + gap) + 0.5} ${oy + i * (size + gap) + 0.5}h${size - 1}v${size - 1}h-${size - 1}z`;
    }).join(''),
  ).join('')}" fill="none" stroke="#fff" stroke-opacity=".06"/>`;

  // Token row + attention arcs on the left
  const tokens = Array.from({ length: 6 }, (_, i) => {
    const w = 22 + Math.round(rand() * 26);
    return { x: 28, y: 52 + i * 26, w };
  });
  const tokenRects = tokens
    .map((t, i) => `<rect x="${t.x}" y="${t.y}" width="${t.w}" height="14" rx="7" fill="#fff" fill-opacity="${i === 2 ? 0.55 : 0.12}"/>`)
    .join('');
  const arcs = tokens
    .slice(0, 5)
    .map((t, i) => {
      const from = tokens[2];
      if (i === 2) return '';
      const x1 = from.x + from.w + 6;
      const y1 = from.y + 7;
      const x2 = t.x + t.w + 6;
      const y2 = t.y + 7;
      const bend = 40 + Math.abs(i - 2) * 22;
      return `<path d="M${x1} ${y1}C${x1 + bend} ${y1} ${x2 + bend} ${y2} ${x2} ${y2}" fill="none" stroke="url(#g-${uid})" stroke-opacity=".7" stroke-width="1.2"/>`;
    })
    .join('');
  return empty + cells + tokenRects + arcs;
}

function mlArt(rand: () => number, uid: string): string {
  const x0 = 28;
  const split = 250;
  const x1 = 372;
  const base = 150;
  const histN = 30;
  const pts: [number, number][] = [];
  let y = base + (rand() - 0.5) * 30;
  const trend = -0.9 - rand() * 0.8;
  const season = 10 + rand() * 12;
  for (let i = 0; i <= histN; i++) {
    const x = x0 + ((split - x0) * i) / histN;
    y += trend + (rand() - 0.5) * 9;
    pts.push([x, y + Math.sin(i * 0.9) * season * 0.5]);
  }
  const last = pts[pts.length - 1];
  const fN = 12;
  const fc: [number, number][] = [];
  const up: [number, number][] = [];
  const lo: [number, number][] = [];
  for (let i = 0; i <= fN; i++) {
    const x = split + ((x1 - split) * i) / fN;
    const yy = last[1] + trend * i * 2.2 + Math.sin((histN + i) * 0.9) * season * 0.5;
    const spread = 4 + i * 3.4;
    fc.push([x, yy]);
    up.push([x, yy - spread]);
    lo.push([x, yy + spread]);
  }
  const line = (p: [number, number][]) => p.map((q, i) => `${i ? 'L' : 'M'}${r1(q[0])} ${r1(q[1])}`).join('');
  const band = `${line(up)}${lo
    .reverse()
    .map((q) => `L${r1(q[0])} ${r1(q[1])}`)
    .join('')}Z`;
  const grid = [70, 120, 170, 220].map((gy) => `<path d="M${x0} ${gy}H${x1}" stroke="#fff" stroke-opacity=".06"/>`).join('');
  const area = `${line(pts)}L${r1(last[0])} 236L${x0} 236Z`;
  return (
    grid +
    `<path d="${area}" fill="url(#g-${uid})" fill-opacity=".1"/>` +
    `<path d="${band}" fill="url(#g-${uid})" fill-opacity=".22"/>` +
    `<path d="M${split} 40V236" stroke="#fff" stroke-opacity=".25" stroke-dasharray="3 5"/>` +
    `<path d="${line(pts)}" fill="none" stroke="#fff" stroke-opacity=".85" stroke-width="1.6" stroke-linejoin="round"/>` +
    `<path d="${line(fc)}" fill="none" stroke="url(#g-${uid})" stroke-width="1.8" stroke-dasharray="5 5"/>` +
    `<circle cx="${r1(last[0])}" cy="${r1(last[1])}" r="4" fill="#fff"/>`
  );
}

function dataArt(rand: () => number, uid: string): string {
  const cols = [3, 4, 2, 1];
  const nodes = cols.map((count, c) =>
    Array.from({ length: count }, (_, i) => ({
      x: 34 + c * 92,
      y: H / 2 - ((count - 1) * 44) / 2 + i * 44 - 9,
      w: c === 3 ? 66 : 58,
    })),
  );
  let links = '';
  for (let c = 0; c < nodes.length - 1; c++) {
    nodes[c].forEach((a) => {
      nodes[c + 1].forEach((b) => {
        if (rand() < 0.55 || nodes[c + 1].length === 1) {
          const sx = a.x + a.w;
          const sy = a.y + 9;
          const tx = b.x;
          const ty = b.y + 9;
          const mx = (sx + tx) / 2;
          links += `M${sx} ${sy}C${mx} ${sy} ${mx} ${ty} ${tx} ${ty}`;
        }
      });
    });
  }
  const rects = nodes
    .flat()
    .map(
      (n, i) =>
        `<rect x="${n.x}" y="${n.y}" width="${n.w}" height="18" rx="5" fill="${i === nodes.flat().length - 1 ? `url(#g-${uid})` : '#fff'}" fill-opacity="${i === nodes.flat().length - 1 ? 0.9 : 0.1}" stroke="#fff" stroke-opacity=".2"/>`,
    )
    .join('');
  const bars = Array.from({ length: 7 }, (_, i) => {
    const h = 10 + rand() * 34;
    return `M${300 + i * 11} ${226 - h}h6v${r1(h)}h-6z`;
  }).join('');
  return (
    `<path d="${links}" fill="none" stroke="url(#g-${uid})" stroke-opacity=".55" stroke-width="1.2"/>` +
    rects +
    `<path d="${bars}" fill="url(#g-${uid})" fill-opacity=".5"/>`
  );
}

function webArt(rand: () => number, uid: string): string {
  const x = 46;
  const y = 30;
  const w = 308;
  const h = 196;
  const cards = Array.from({ length: 3 }, (_, i) => {
    const cw = (w - 48) / 3;
    return `<rect x="${x + 16 + i * (cw + 8)}" y="${y + 120}" width="${r1(cw)}" height="${46 + Math.round(rand() * 14)}" rx="6" fill="#fff" fill-opacity=".07" stroke="#fff" stroke-opacity=".1"/>`;
  }).join('');
  return (
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="#fff" fill-opacity=".03" stroke="#fff" stroke-opacity=".16"/>` +
    `<path d="M${x} ${y + 24}H${x + w}" stroke="#fff" stroke-opacity=".12"/>` +
    [0, 1, 2].map((i) => `<circle cx="${x + 16 + i * 12}" cy="${y + 12}" r="3.5" fill="#fff" fill-opacity=".25"/>`).join('') +
    `<rect x="${x + 16}" y="${y + 40}" width="${w - 32}" height="66" rx="8" fill="url(#g-${uid})" fill-opacity=".55"/>` +
    `<rect x="${x + 30}" y="${y + 58}" width="${90 + Math.round(rand() * 50)}" height="10" rx="5" fill="#fff" fill-opacity=".85"/>` +
    `<rect x="${x + 30}" y="${y + 76}" width="${60 + Math.round(rand() * 40)}" height="8" rx="4" fill="#fff" fill-opacity=".45"/>` +
    cards
  );
}

/** Topography: smooth rings around a few peaks + a hotspot. */
function contoursArt(rand: () => number, uid: string): string {
  const peaks = Array.from({ length: 3 }, (_, k) => ({
    x: 70 + rand() * 260,
    y: 50 + rand() * 150,
    n: 3 + Math.floor(rand() * 3) + (k === 0 ? 1 : 0),
    phase: rand() * Math.PI * 2,
  }));
  let out = '';
  peaks.forEach((pk, k) => {
    for (let i = 1; i <= pk.n; i++) {
      const radius = i * (18 + k * 2);
      const pts: [number, number][] = Array.from({ length: 14 }, (_, j) => {
        const a = (j / 14) * Math.PI * 2;
        const wob = 1 + 0.2 * Math.sin(a * 2 + pk.phase + i * 0.4) + 0.09 * Math.sin(a * 5 - pk.phase);
        return [pk.x + Math.cos(a) * radius * wob * 1.3, pk.y + Math.sin(a) * radius * wob * 0.85];
      });
      const major = i % 3 === 0;
      out += `<path d="${smoothClosed(pts)}" fill="${i === 1 && k === 0 ? `url(#g-${uid})` : 'none'}" fill-opacity=".55" stroke="${k === 0 ? `url(#g-${uid})` : '#fff'}" stroke-opacity="${k === 0 ? 0.85 - i * 0.1 : major ? 0.3 : 0.16}" stroke-width="${major ? 1.4 : 1}"/>`;
    }
  });
  const p = peaks[0];
  return `${out}<circle cx="${r1(p.x)}" cy="${r1(p.y)}" r="3" fill="#fff"/>`;
}

/** Points of interest: clustered dots, a few match links, cluster halos. */
function pointsArt(rand: () => number, uid: string): string {
  const centers = Array.from({ length: 4 }, () => ({ x: 60 + rand() * 280, y: 45 + rand() * 160, s: 14 + rand() * 22 }));
  const gauss = () => (rand() + rand() + rand() - 1.5) / 1.5;
  const a: string[] = [];
  const b: string[] = [];
  const pts: [number, number][] = [];
  centers.forEach((c, k) => {
    const n = 14 + Math.floor(rand() * 10);
    for (let i = 0; i < n; i++) {
      const x = r1(c.x + gauss() * c.s * 2);
      const y = r1(c.y + gauss() * c.s * 1.5);
      pts.push([x, y]);
      (k % 2 ? b : a).push(`M${x} ${y}h0`);
    }
  });
  const links = Array.from({ length: 8 }, () => {
    const p = pts[Math.floor(rand() * pts.length)];
    const q = [p[0] + (rand() - 0.5) * 24, p[1] + (rand() - 0.5) * 18];
    return `M${p[0]} ${p[1]}L${r1(q[0])} ${r1(q[1])}`;
  }).join('');
  const halos = centers
    .map((c) => `<circle cx="${r1(c.x)}" cy="${r1(c.y)}" r="${r1(c.s * 2.4)}" fill="url(#g-${uid})" fill-opacity=".07" stroke="#fff" stroke-opacity=".12" stroke-dasharray="2 4"/>`)
    .join('');
  return (
    halos +
    `<path d="${links}" stroke="#fff" stroke-opacity=".35"/>` +
    `<path d="${a.join('')}" stroke="${COVER_COLORS.geo[0]}" stroke-width="4.5" stroke-linecap="round"/>` +
    `<path d="${b.join('')}" stroke="#fff" stroke-opacity=".8" stroke-width="3.5" stroke-linecap="round"/>`
  );
}

/** Knowledge graph with one highlighted multi-hop path. */
function graphArt(rand: () => number, uid: string): string {
  const nodes = Array.from({ length: 15 }, (_, i) => {
    const a = (i / 15) * Math.PI * 2 + rand() * 0.4;
    const ring = i % 3 === 0 ? 0.45 : 1;
    return { x: 200 + Math.cos(a) * 150 * ring + (rand() - 0.5) * 30, y: 125 + Math.sin(a) * 85 * ring + (rand() - 0.5) * 20 };
  });
  const edges: [number, number][] = [];
  nodes.forEach((n, i) => {
    const near = nodes
      .map((m, j) => ({ j, d: Math.hypot(m.x - n.x, m.y - n.y) }))
      .filter((o) => o.j !== i)
      .sort((p, q) => p.d - q.d)
      .slice(0, 2);
    near.forEach((o) => {
      if (!edges.some(([u, v]) => (u === i && v === o.j) || (u === o.j && v === i))) edges.push([i, o.j]);
    });
  });
  const start = Math.floor(rand() * nodes.length);
  const hops = [start];
  for (let h = 0; h < 3; h++) {
    const cur = hops[hops.length - 1];
    const next = edges.filter(([u, v]) => u === cur || v === cur).map(([u, v]) => (u === cur ? v : u)).find((x) => !hops.includes(x));
    if (next === undefined) break;
    hops.push(next);
  }
  const base = edges.map(([u, v]) => `M${r1(nodes[u].x)} ${r1(nodes[u].y)}L${r1(nodes[v].x)} ${r1(nodes[v].y)}`).join('');
  const path = hops.map((h, i) => `${i ? 'L' : 'M'}${r1(nodes[h].x)} ${r1(nodes[h].y)}`).join('');
  const dots = nodes
    .map((n, i) => {
      const on = hops.includes(i);
      return `<circle cx="${r1(n.x)}" cy="${r1(n.y)}" r="${on ? 6 : 4}" fill="${on ? `url(#g-${uid})` : '#0b0b13'}" stroke="#fff" stroke-opacity="${on ? 0.9 : 0.35}"/>`;
    })
    .join('');
  return `<path d="${base}" stroke="#fff" stroke-opacity=".14"/><path d="${path}" fill="none" stroke="url(#g-${uid})" stroke-width="2.2" stroke-linejoin="round"/>${dots}`;
}

/** Conversation: user and agent bubbles with a typing indicator. */
function chatArt(rand: () => number, uid: string): string {
  let y = 34;
  let out = '';
  for (let i = 0; i < 5; i++) {
    const agent = i % 2 === 1;
    const w = 90 + Math.round(rand() * 110);
    const h = i === 2 ? 40 : 26;
    const x = agent ? 372 - w : 28;
    out += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="13" fill="${agent ? `url(#g-${uid})` : '#fff'}" fill-opacity="${agent ? 0.8 : 0.09}" stroke="#fff" stroke-opacity="${agent ? 0 : 0.12}"/>`;
    out += `<rect x="${x + 12}" y="${y + 10}" width="${Math.max(30, w - 40 - Math.round(rand() * 30))}" height="6" rx="3" fill="#fff" fill-opacity="${agent ? 0.85 : 0.35}"/>`;
    if (h > 30) out += `<rect x="${x + 12}" y="${y + 22}" width="${Math.max(24, w - 70)}" height="6" rx="3" fill="#fff" fill-opacity=".3"/>`;
    y += h + 10;
  }
  out += `<rect x="28" y="${y}" width="54" height="22" rx="11" fill="#fff" fill-opacity=".09"/>`;
  out += [0, 1, 2].map((i) => `<circle cx="${43 + i * 12}" cy="${y + 11}" r="2.6" fill="#fff" fill-opacity="${0.35 + i * 0.2}"/>`).join('');
  return out;
}

/** Document extraction: a page with highlighted fields mapped to structured output. */
function docArt(rand: () => number, uid: string): string {
  const px = 34;
  const py = 26;
  let page = `<rect x="${px}" y="${py}" width="150" height="198" rx="8" fill="#fff" fill-opacity=".06" stroke="#fff" stroke-opacity=".18"/>`;
  const hits: number[] = [];
  for (let i = 0; i < 13; i++) {
    const y = py + 18 + i * 13.5;
    const w = 80 + Math.round(rand() * 50);
    const hit = rand() < 0.28 && hits.length < 3;
    if (hit) hits.push(y);
    page += `<rect x="${px + 12}" y="${y}" width="${w}" height="6" rx="3" fill="${hit ? `url(#g-${uid})` : '#fff'}" fill-opacity="${hit ? 0.95 : 0.2}"/>`;
  }
  if (!hits.length) hits.push(py + 45);
  const ox = 246;
  let panel = `<rect x="${ox}" y="${py + 20}" width="122" height="${36 + hits.length * 30}" rx="10" fill="#fff" fill-opacity=".04" stroke="url(#g-${uid})" stroke-opacity=".7"/>`;
  hits.forEach((hy, i) => {
    const ty = py + 40 + i * 30;
    panel += `<rect x="${ox + 12}" y="${ty}" width="34" height="6" rx="3" fill="#fff" fill-opacity=".45"/><rect x="${ox + 52}" y="${ty}" width="${40 + Math.round(rand() * 24)}" height="6" rx="3" fill="url(#g-${uid})"/>`;
    panel += `<path d="M${px + 140} ${hy + 3}C${px + 190} ${hy + 3} ${ox - 40} ${ty + 3} ${ox - 4} ${ty + 3}" fill="none" stroke="url(#g-${uid})" stroke-opacity=".6" stroke-dasharray="3 4"/>`;
  });
  return page + panel;
}

/** Clusters in an embedding space. */
function clustersArt(rand: () => number, uid: string): string {
  const cols = COVER_COLORS.ml.concat(['#c4b5fd', '#ffffff']);
  const gauss = () => (rand() + rand() + rand() - 1.5) / 1.5;
  let out = '';
  for (let k = 0; k < 4; k++) {
    const cx = 70 + rand() * 260;
    const cy = 50 + rand() * 150;
    const s = 16 + rand() * 18;
    const dots = Array.from({ length: 22 }, () => `M${r1(cx + gauss() * s * 1.7)} ${r1(cy + gauss() * s * 1.3)}h0`).join('');
    out += `<ellipse cx="${r1(cx)}" cy="${r1(cy)}" rx="${r1(s * 2.6)}" ry="${r1(s * 2)}" fill="none" stroke="#fff" stroke-opacity=".12" stroke-dasharray="2 4"/>`;
    out += `<path d="${dots}" stroke="${cols[k % cols.length]}" stroke-opacity="${k === 3 ? 0.55 : 0.9}" stroke-width="4" stroke-linecap="round"/>`;
  }
  return out + `<path d="M24 226H376M24 226V24" stroke="#fff" stroke-opacity=".12"/><rect width="1" height="1" fill="url(#g-${uid})" opacity="0"/>`;
}

/** Dashboard: KPI tiles, bars and a line. */
function dashboardArt(rand: () => number, uid: string): string {
  let out = '';
  [0, 1, 2].forEach((i) => {
    const x = 30 + i * 118;
    out += `<rect x="${x}" y="26" width="104" height="54" rx="9" fill="#fff" fill-opacity=".05" stroke="#fff" stroke-opacity=".12"/>`;
    out += `<rect x="${x + 12}" y="40" width="${30 + Math.round(rand() * 20)}" height="5" rx="2.5" fill="#fff" fill-opacity=".35"/>`;
    out += `<rect x="${x + 12}" y="54" width="${44 + Math.round(rand() * 26)}" height="12" rx="4" fill="${i === 0 ? `url(#g-${uid})` : '#fff'}" fill-opacity="${i === 0 ? 0.95 : 0.7}"/>`;
  });
  out += `<rect x="30" y="94" width="196" height="132" rx="10" fill="#fff" fill-opacity=".04" stroke="#fff" stroke-opacity=".12"/>`;
  const bars = Array.from({ length: 9 }, (_, i) => {
    const h = 20 + rand() * 80;
    return `M${46 + i * 19} ${r1(212 - h)}h11v${r1(h)}h-11z`;
  }).join('');
  out += `<path d="${bars}" fill="url(#g-${uid})" fill-opacity=".75"/>`;
  out += `<rect x="238" y="94" width="132" height="132" rx="10" fill="#fff" fill-opacity=".04" stroke="#fff" stroke-opacity=".12"/>`;
  let y = 190;
  const line = Array.from({ length: 10 }, (_, i) => {
    y = Math.max(110, Math.min(214, y - 6 + (rand() - 0.5) * 22));
    return `${i ? 'L' : 'M'}${250 + i * 12} ${r1(y)}`;
  }).join('');
  out += `<path d="${line}" fill="none" stroke="#fff" stroke-opacity=".85" stroke-width="1.6"/>`;
  return out;
}

const ART: Record<CoverVariant, (rand: () => number, uid: string) => string> = {
  hexbin: geoArt,
  contours: contoursArt,
  points: pointsArt,
  attention: llmArt,
  graph: graphArt,
  chat: chatArt,
  doc: docArt,
  forecast: mlArt,
  clusters: clustersArt,
  dag: dataArt,
  dashboard: dashboardArt,
  wireframe: webArt,
};

const DEFAULT_VARIANT: Record<Domain, CoverVariant> = {
  geo: 'hexbin',
  llm: 'attention',
  ml: 'forecast',
  data: 'dag',
  web: 'wireframe',
};

export function coverSvg(slug: string, domain: Domain, uid: string, className = '', variant?: CoverVariant): string {
  const art = ART[variant ?? DEFAULT_VARIANT[domain]];
  const rand = rng(hash(`${slug}:${domain}`));
  const [a, b] = COVER_COLORS[domain];
  // Glow center, mapped into the bled background's bounding box
  const gx = Math.round(((400 + (0.55 + rand() * 0.35) * W) / (W + 800)) * 1000) / 1000;
  const gy = Math.round(((300 + (0.2 + rand() * 0.5) * H) / (H + 600)) * 1000) / 1000;
  return (
    `<svg xmlns="http://www.w3.org/2000/svg"${className ? ` class="${className}"` : ''} viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">` +
    `<defs>` +
    `<linearGradient id="g-${uid}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>` +
    `<radialGradient id="r-${uid}" cx="${gx}" cy="${gy}" r=".26"><stop offset="0" stop-color="${a}" stop-opacity=".28"/><stop offset=".6" stop-color="${b}" stop-opacity=".08"/><stop offset="1" stop-color="${b}" stop-opacity="0"/></radialGradient>` +
    `<pattern id="p-${uid}" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="#fff" stroke-opacity=".045"/></pattern>` +
    `</defs>` +
    // Background bleeds past the viewBox so "meet" never letterboxes
    `<rect x="-400" y="-300" width="${W + 800}" height="${H + 600}" fill="#0b0b13"/>` +
    `<rect x="-400" y="-300" width="${W + 800}" height="${H + 600}" fill="url(#r-${uid})"/>` +
    `<rect x="-400" y="-300" width="${W + 800}" height="${H + 600}" fill="url(#p-${uid})"/>` +
    art(rand, uid) +
    `</svg>`
  );
}
