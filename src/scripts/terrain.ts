/**
 * Terrain field: the signature hero background.
 *
 * A shader-gradient "terrain" (domain-warped simplex fbm) rendered with its own
 * topographic contour lines, plus an H3-style hexbin lens that follows the
 * pointer (or drifts on its own when idle / on touch). One fragment shader,
 * no dependencies, adaptive resolution, paused when off-screen or hidden.
 */

const VERT = /* glsl */ `#version 300 es
in vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }`;

const FRAG = /* glsl */ `#version 300 es
precision highp float;

uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_lens;
uniform float u_lensOn;
uniform vec2 u_focus;
uniform float u_seed;
uniform float u_hexPx;
uniform vec3 u_c0;
uniform vec3 u_c1;
uniform vec3 u_c2;
uniform vec3 u_c3;
uniform vec3 u_c4;

out vec4 outColor;

vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }

// 2D simplex noise (Ashima Arts / Stefan Gustavson, MIT)
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

const mat2 ROT = mat2(0.8, -0.6, 0.6, 0.8);

float fbm3(vec2 p) {
  float s = 0.0;
  float a = 0.55;
  for (int i = 0; i < 3; i++) {
    s += a * snoise(p);
    p = ROT * p * 1.97 + 11.7;
    a *= 0.45;
  }
  return s;
}

float fbm2(vec2 p) {
  return 0.6 * snoise(p) + 0.27 * snoise(ROT * p * 1.97 + 11.7);
}

// Domain-warped height field: large, slow, glossy forms
float terrain(vec2 p, float t) {
  vec2 q = vec2(fbm2(p + vec2(0.0, 0.3 * t)), fbm2(p + vec2(5.2, 1.3) - 0.24 * t));
  return fbm3(p + 1.05 * q + vec2(0.16 * t, -0.1 * t));
}

// Pointy-top hex tiling: xy = local offset from cell center, zw = cell id
vec4 hexCell(vec2 p) {
  const vec2 s = vec2(1.0, 1.7320508);
  vec4 c = floor(vec4(p, p - vec2(0.5, 1.0)) / s.xyxy) + 0.5;
  vec4 h = vec4(p - c.xy * s, p - (c.zw + 0.5) * s);
  return dot(h.xy, h.xy) < dot(h.zw, h.zw) ? vec4(h.xy, c.xy) : vec4(h.zw, c.zw + 0.5);
}

// 0 at the cell center, 0.5 on the edge
float hexDist(vec2 p) {
  p = abs(p);
  return max(dot(p, vec2(0.5, 0.8660254)), p.x);
}

vec3 palette(float e) {
  vec3 col = mix(u_c0, u_c1, smoothstep(0.2, 0.55, e));
  col = mix(col, u_c2, smoothstep(0.5, 0.8, e));
  return mix(col, u_c3, smoothstep(0.76, 1.0, e));
}

const float SCALE = 0.95;

void main() {
  vec2 frag = gl_FragCoord.xy;
  vec2 uv = frag / u_res;
  float aspect = u_res.x / u_res.y;
  vec2 asp = vec2(aspect, 1.0);
  float t = u_time;
  vec2 seed = vec2(u_seed, u_seed * 0.37);

  // Oblique view: the far (upper) terrain is foreshortened, like a tilted map
  vec2 p = (uv - 0.5) * asp * SCALE;
  p.y *= 1.0 + 0.42 * uv.y;
  p += seed;

  // Light pools around the focus point; the text side stays calm
  vec2 fd = (uv - u_focus) * vec2(aspect * 0.7, 1.0);
  float focus = smoothstep(1.05, 0.0, length(fd));

  // Lens: the pointer raises the terrain and lights up the structure around it
  vec2 dl = (uv - u_lens) * asp;
  float r2 = dot(dl, dl);
  float textMask = 0.35 + 0.65 * focus;
  float lens = u_lensOn * exp(-r2 / 0.06) * textMask;
  float bump = u_lensOn * 0.32 * exp(-r2 / 0.03);

  float h = terrain(p, t) + bump;
  float e = clamp(h * 0.58 + 0.5, 0.0, 1.0);

  vec3 col = palette(e);
  col = mix(u_c0, col, 0.07 + 0.93 * focus);

  // Hillshade (GIS convention: light from the north-west at 45 degrees) plus a
  // soft specular on the ridges: the lit, displaced-surface depth of a shader gradient.
  vec2 grad = vec2(dFdx(h), dFdy(h)) * u_res * 0.07;
  vec3 nrm = normalize(vec3(-grad, 1.0));
  vec3 L = normalize(vec3(-0.5, 0.5, 0.707));
  float lambert = clamp(dot(nrm, L), 0.0, 1.0);
  col *= 0.74 + 0.46 * lambert;
  float spec = pow(clamp(dot(nrm, normalize(L + vec3(0.0, 0.0, 1.0))), 0.0, 1.0), 28.0);
  col += mix(u_c2, u_c3, 0.55) * spec * 0.22 * focus * smoothstep(0.45, 0.9, e);

  // Topographic contour lines (index contour every 5th level)
  float hv = h * 8.0;
  float fw = max(fwidth(hv), 1e-4);
  float minor = 1.0 - smoothstep(0.0, 1.1, abs(fract(hv - 0.5) - 0.5) / fw);
  float major = 1.0 - smoothstep(0.0, 1.5, abs(fract(hv / 5.0 - 0.5) - 0.5) * 5.0 / fw);
  float lineMask = 0.25 + 0.75 * focus;
  vec3 lineCol = mix(vec3(1.0), u_c3, 0.18);
  col += lineCol * (minor * (0.028 + 0.3 * lens) + major * (0.06 + 0.42 * lens)) * lineMask;

  // H3-style hexbin "aggregation" inside the lens
  if (lens > 0.015) {
    vec2 hp = frag / u_hexPx;
    vec4 hx = hexCell(hp);
    vec2 centerUv = (hp - hx.xy) * u_hexPx / u_res;
    vec2 dc = (centerUv - u_lens) * asp;
    float dc2 = dot(dc, dc);
    float cellLens = u_lensOn * exp(-dc2 / 0.03) * textMask;
    vec2 cp = (centerUv - 0.5) * asp * SCALE;
    cp.y *= 1.0 + 0.42 * centerUv.y;
    cp += seed;
    float hc = terrain(cp, t) + u_lensOn * 0.32 * exp(-dc2 / 0.03);
    float q = floor(clamp(hc * 0.58 + 0.5, 0.0, 1.0) * 6.0) / 6.0;
    vec3 heat = mix(u_c2, u_c4, smoothstep(0.35, 0.95, q));
    float d = hexDist(hx.xy);
    float aa = 1.5 / u_hexPx;
    float edge = smoothstep(0.5 - aa * 1.5, 0.5 - aa * 0.2, d);
    float fill = 1.0 - smoothstep(0.42, 0.42 + aa, d);
    col = mix(col, heat, fill * cellLens * (0.08 + 0.32 * q));
    col += vec3(1.0) * edge * cellLens * 0.12;
  }

  // Vignette + fade into the page below
  float vig = smoothstep(1.4, 0.3, length((uv - vec2(0.5, 0.55)) * vec2(aspect * 0.6, 1.0)));
  col *= 0.6 + 0.4 * vig;
  col = mix(u_c0, col, smoothstep(0.0, 0.34, uv.y));

  // Dither so the upscaled canvas never bands
  float n = fract(sin(dot(frag + fract(t * 7.0) * 17.0, vec2(12.9898, 78.233))) * 43758.5453);
  col += (n - 0.5) * (1.6 / 255.0);

  outColor = vec4(col, 1.0);
}`;

export interface TerrainOptions {
  /** Where the light pools, in uv (0..1, y up). */
  focus?: [number, number];
  /** Focus on portrait screens. */
  focusPortrait?: [number, number];
  /** c0 (ink) .. c4 (hexbin heat) as hex colors. */
  palette?: [string, string, string, string, string];
  seed?: number;
  /** Called every frame with the lens position (uv) and whether a real pointer drives it. */
  onLens?: (x: number, y: number, pointer: boolean) => void;
}

const DEFAULT_PALETTE: [string, string, string, string, string] = ['#07070c', '#141246', '#4b44db', '#f24968', '#2dd4bf'];

function hexToRgb(hex: string): [number, number, number] {
  const v = parseInt(hex.replace('#', ''), 16);
  return [((v >> 16) & 255) / 255, ((v >> 8) & 255) / 255, (v & 255) / 255];
}

function compile(gl: WebGL2RenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  // Status is only queried after linking completes (see KHR_parallel_shader_compile below)
  return shader;
}

export interface TerrainController {
  destroy: () => void;
  /** User-controlled pause (WCAG 2.2.2): freezes the field on its current frame. */
  setPaused: (paused: boolean) => void;
}

export function mountTerrain(canvas: HTMLCanvasElement, options: TerrainOptions = {}): TerrainController {
  const noop: TerrainController = { destroy: () => {}, setPaused: () => {} };
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarse = window.matchMedia('(pointer: coarse)').matches;

  const gl = canvas.getContext('webgl2', {
    alpha: false,
    antialias: false,
    depth: false,
    stencil: false,
    premultipliedAlpha: false,
    preserveDrawingBuffer: false,
    // A decorative background should not wake the discrete GPU
    powerPreference: 'low-power',
  });
  if (!gl) {
    canvas.dataset.state = 'unsupported';
    return noop;
  }

  // Everything that needs a linked program. Its destroy() stops the loop and
  // removes listeners; the context itself belongs to mountTerrain.
  const setup = (program: WebGLProgram): TerrainController => {
    gl.useProgram(program);

    // One oversized triangle covers the viewport
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, 'a_pos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const u = (name: string) => gl.getUniformLocation(program, name);
    const uRes = u('u_res');
    const uTime = u('u_time');
    const uLens = u('u_lens');
    const uLensOn = u('u_lensOn');
    const uFocus = u('u_focus');
    const uSeed = u('u_seed');
    const uHexPx = u('u_hexPx');

    const colors = options.palette ?? DEFAULT_PALETTE;
    colors.forEach((hex, i) => gl.uniform3fv(u(`u_c${i}`), hexToRgb(hex)));
    gl.uniform1f(uSeed, options.seed ?? 3.7);

    const focus = options.focus ?? [0.74, 0.58];
    const focusPortrait = options.focusPortrait ?? [0.7, 0.72];

    // --- Sizing (adaptive resolution) ----------------------------------------
    let quality = coarse ? 0.5 : 0.72;
    let cssW = 1;
    let cssH = 1;
    let scale = 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      cssW = Math.max(1, rect.width);
      cssH = Math.max(1, rect.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      scale = dpr * quality;
      const w = Math.max(1, Math.round(cssW * scale));
      const h = Math.max(1, Math.round(cssH * scale));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
      // Hex cells ~ 40 CSS px wide regardless of render scale
      gl.uniform1f(uHexPx, (cssW < 640 ? 30 : 40) * scale);
      const portrait = cssW < cssH * 0.9;
      const f = portrait ? focusPortrait : focus;
      gl.uniform2f(uFocus, f[0], f[1]);
    };

    // --- Lens state -----------------------------------------------------------
    const lens = { x: focus[0] - 0.06, y: focus[1] - 0.04 };
    const target = { x: lens.x, y: lens.y };
    let lensOn = reduceMotion ? 1 : 0;
    let lastPointer = -Infinity;

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1 - (e.clientY - rect.top) / rect.height;
      if (x < 0 || x > 1 || y < 0 || y > 1) return;
      target.x = x;
      target.y = y;
      lastPointer = performance.now();
    };

    let lastTime = 4.0;
    const draw = (time: number) => {
      lastTime = time;
      gl.uniform1f(uTime, time);
      gl.uniform2f(uLens, lens.x, lens.y);
      gl.uniform1f(uLensOn, lensOn);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const markReady = () => {
      if (canvas.dataset.state !== 'ready' && !gl.isContextLost()) canvas.dataset.state = 'ready';
    };

    // Resizing clears the drawing buffer: repaint the current frame right away
    // (also while paused), so the hero never shows an empty canvas.
    const refit = () => {
      resize();
      draw(lastTime);
    };

    resize();

    // Reduced motion: a single, considered still frame
    if (reduceMotion) {
      lens.x = focus[0] - 0.08;
      lens.y = focus[1] - 0.06;
      draw(9.0);
      markReady();
      options.onLens?.(lens.x, lens.y, false);
      const ro = new ResizeObserver(refit);
      ro.observe(canvas);
      return {
        destroy: () => ro.disconnect(),
        setPaused: () => {},
      };
    }

    // --- Animation loop -------------------------------------------------------
    let raf = 0;
    let running = false;
    let visible = true;
    let userPaused = false;
    let lastTick = performance.now();
    let lastDraw = lastTick;
    let elapsed = 0;
    let drewLastTick = false;

    // Adaptive resolution. The tick right after a draw carries that frame's GPU
    // cost: when those ticks run long against the display's own cadence (the
    // shortest tick seen) render fewer pixels, when they fit allow more. A level
    // that proved too heavy is never tried again.
    let ceiling = coarse ? 0.7 : 1;
    let minDelta = Infinity;
    let postSum = 0;
    let postCount = 0;
    let adjustments = 0;

    const adapt = (delta: number, afterDraw: boolean) => {
      if (adjustments >= 6) return;
      minDelta = Math.min(minDelta, Math.max(4, delta));
      if (!afterDraw) return;
      postSum += delta;
      postCount += 1;
      if (postCount < 48) return;
      const avg = postSum / postCount;
      const cadence = minDelta;
      postSum = 0;
      postCount = 0;
      minDelta = Infinity;
      if ((avg > 28 || avg > cadence * 1.6) && quality > 0.36) {
        ceiling = quality * 0.98;
        quality = Math.max(0.36, quality * 0.8);
      } else if (avg < cadence * 1.15 && avg < 20 && quality < ceiling) {
        quality = Math.min(ceiling, quality * 1.12);
      } else {
        return;
      }
      adjustments += 1;
      refit();
    };

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);

      const delta = now - lastTick;
      lastTick = now;
      // Ignore stalls (long tasks, throttled frames) when measuring
      if (delta > 0 && delta < 250) adapt(delta, drewLastTick);
      drewLastTick = false;

      // Cap the draw rate: ~60 fps while the pointer drives the lens, ~30 fps on
      // autopilot (the field itself moves slowly; 120 Hz screens gain nothing).
      const pointerActive = now - lastPointer < 2600;
      if (now - lastDraw < (pointerActive ? 15 : 31)) return;
      const dt = Math.min(0.05, (now - lastDraw) / 1000);
      lastDraw = now;
      elapsed += dt;

      if (!pointerActive) {
        // Autopilot: a slow Lissajous drift around the focus
        target.x = focus[0] - 0.06 + 0.17 * Math.sin(elapsed * 0.21);
        target.y = focus[1] - 0.04 + 0.16 * Math.sin(elapsed * 0.29 + 1.3);
      }
      const follow = 1 - Math.exp(-dt * (pointerActive ? 7.5 : 1.4));
      lens.x += (target.x - lens.x) * follow;
      lens.y += (target.y - lens.y) * follow;
      lensOn += (1 - lensOn) * (1 - Math.exp(-dt * 1.8));

      draw(elapsed * 0.045 + 4.0);
      drewLastTick = true;
      options.onLens?.(lens.x, lens.y, pointerActive);

      markReady();
    };

    const play = () => {
      if (running || userPaused || !visible || document.hidden || gl.isContextLost()) return;
      running = true;
      lastTick = lastDraw = performance.now();
      drewLastTick = false;
      raf = requestAnimationFrame(tick);
    };

    const pause = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) play();
        else pause();
      },
      { rootMargin: '80px' },
    );
    io.observe(canvas);

    const onVisibility = () => (document.hidden ? pause() : play());
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    const ro = new ResizeObserver(refit);
    ro.observe(canvas);

    // Paint one frame right away (even in a hidden or prerendered tab) so the
    // canvas is never blank when it becomes visible.
    draw(4.0);
    markReady();
    options.onLens?.(lens.x, lens.y, false);
    play();

    return {
      destroy: () => {
        pause();
        io.disconnect();
        ro.disconnect();
        document.removeEventListener('visibilitychange', onVisibility);
        window.removeEventListener('pointermove', onPointerMove);
      },
      setPaused: (paused: boolean) => {
        userPaused = paused;
        if (paused) pause();
        else play();
      },
    };
  };

  const state = { destroyed: false, paused: false, impl: null as TerrainController | null };

  // Compile and link (again after a lost context comes back), letting the
  // driver work off the main thread when it can, then set up.
  const boot = () => {
    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    const program = gl.createProgram();
    if (!vs || !fs || !program) {
      if (!gl.isContextLost()) canvas.dataset.state = 'unsupported';
      return;
    }
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    const finish = () => {
      if (state.destroyed || gl.isContextLost()) return;
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.warn('[terrain] shader failed', gl.getShaderInfoLog(fs), gl.getProgramInfoLog(program));
        canvas.dataset.state = 'unsupported';
        return;
      }
      state.impl = setup(program);
      if (state.paused) state.impl.setPaused(true);
    };
    const parallel = gl.getExtension('KHR_parallel_shader_compile');
    const poll = () => {
      if (state.destroyed || gl.isContextLost()) return;
      if (gl.getProgramParameter(program, parallel!.COMPLETION_STATUS_KHR)) finish();
      else requestAnimationFrame(poll);
    };
    if (parallel) requestAnimationFrame(poll);
    else finish();
  };

  // Browsers drop GPU contexts (background tabs on mobile, driver resets).
  // Ask for it back, let the CSS fallback show meanwhile, rebuild on restore.
  const onLost = (e: Event) => {
    e.preventDefault();
    state.impl?.destroy();
    state.impl = null;
    canvas.dataset.state = 'lost';
  };
  const onRestored = () => {
    if (!state.destroyed) boot();
  };
  canvas.addEventListener('webglcontextlost', onLost);
  canvas.addEventListener('webglcontextrestored', onRestored);

  boot();

  return {
    destroy: () => {
      state.destroyed = true;
      state.impl?.destroy();
      state.impl = null;
      canvas.removeEventListener('webglcontextlost', onLost);
      canvas.removeEventListener('webglcontextrestored', onRestored);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    },
    setPaused: (paused: boolean) => {
      state.paused = paused;
      state.impl?.setPaused(paused);
    },
  };
}
