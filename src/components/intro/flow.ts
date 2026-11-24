/*
 * Homepage opening.
 *
 * The bio's own words storm the screen the way the reference video does: big
 * serif words packed edge to edge, then smaller phrases flowing along arcs,
 * spirals and columns, over a smeared, glitching layer of color (cyan rivers,
 * orange flecks, pastel washes, vertical bars) that is dragged around in
 * blocks every frame like a damaged video file. At the end the color washes
 * out to the page, and every word of the bio flies into its exact place in
 * the paragraphs, which then take over from the drawing.
 *
 * Same contract as before: returns the Animation that hides the bio until the
 * handover. finish() skips to the page, cancel() stops everything.
 */

const MAIN = 4100; // ms of storm before the landing
const LAND_START = 3600; // first bio word leaves for the page
const LAND_SPAN = 1050; // last word leaves this much later (reading order)
const LAND_FLIGHT = 460;
const HANDOVER = 220;
const TOTAL = LAND_START + LAND_SPAN + LAND_FLIGHT + HANDOVER;

type Word = {
  s: string;
  x: number;
  y: number;
  size: number;
  kind: 0 | 1 | 2; // 0 big, 1 phrase word, 2 tiny caps
  born: number;
  life: number;
  drift: number;
  tone: number;
  ghost: number;
  flick: number;
};
type Lander = {
  s: string;
  font: string;
  slotX: number;
  slotY: number;
  x0: number;
  y0: number;
  c1x: number;
  c1y: number;
  c2x: number;
  c2y: number;
  s0: number;
  leave: number;
};
type Shape = { k: number; x: number; y: number; s: number; born: number; life: number; seed: number };
type Agent = {
  k: number; // 0 ribbon, 1 fleck, 2 river, 3 wash
  x: number;
  y: number;
  px: number;
  py: number;
  vx: number;
  vy: number;
  w: number;
  c1: string;
  c2: string;
  born: number;
  life: number;
  trail?: number[];
  ph?: number;
};
type Bar = { x: number; y: number; h: number; cols: string[]; ws: number[]; born: number; life: number; dir: number };

const BLUES = ["#1f6fe0", "#2a8ff0", "#33c4f2", "#4fd6e8", "#1c56d6", "#3aa8ff", "#5fe0f0"];
const RIVERS = ["#33c4f2", "#2a9df4", "#4fd6e8", "#1f6fe0", "#5ad1e6"];
const BLUE_LIGHT = ["#9fe6ff", "#bdf1ff", "#7fd8f7", "#c9f4ff"];
const HOTS = ["#ff6a1a", "#f0441e", "#ff8a2a", "#e8321e", "#ff5a36", "#ffb21a", "#d82a2a"];
const PASTELS = ["#ffd23a", "#ff8fc8", "#e05ad8", "#b9a2ff", "#8a6cff", "#9ef0c0", "#c9f06a", "#7fd8f7", "#ffb0a0", "#ffe27a", "#a8f0ff", "#f7a8ff"];
const BARCOLS = ["#33c4f2", "#1f6fe0", "#7fd8f7", "#b9a2ff", "#8a6cff", "#ff8fc8", "#4fd6e8", "#2350d8", "#e05ad8", "#5ad1e6", "#ff5a7a"];
const STOP = new Set(
  "a an the and or but of to in on at for with by from as is are was were be been it its this that these those i me my we our you your he she they them his her their not no so if then than into over about up out just also very can will would could should do does did have has had".split(" ")
);

const rnd = (a = 1, b?: number) => (b === undefined ? Math.random() * a : a + Math.random() * (b - a));
const pick = <T,>(a: T[]): T => a[(Math.random() * a.length) | 0];
const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);
const sstep = (a: number, b: number, v: number) => {
  const t = clamp((v - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const letters = (w: string) => w.replace(/[^A-Za-zÀ-ÿ0-9'’&-]/g, "");

function prepText(tokens: string[]) {
  const words = tokens.filter(Boolean);
  const freq = new Map<string, number>();
  for (const w of words) {
    const k = letters(w).toLowerCase();
    if (k.length < 3 || STOP.has(k)) continue;
    freq.set(k, (freq.get(k) || 0) + 1);
  }
  // Recurring "motif" words, like the repeated words in the reference.
  const motif = Array.from(freq.entries())
    .sort((a, b) => b[1] * Math.sqrt(b[0].length) - a[1] * Math.sqrt(a[0].length))
    .slice(0, 16)
    .map((e) => e[0]);
  const phrases: string[][] = [];
  for (let i = 0; i < words.length; ) {
    const n = Math.min(words.length - i, 3 + ((Math.random() * 7) | 0));
    phrases.push(words.slice(i, i + n));
    i += n;
  }
  return { words, motif: motif.length ? motif : words.slice(0, 10), phrases: phrases.length ? phrases : [words] };
}

function parseColor(c: string, fallback: [number, number, number]): [number, number, number] {
  const m = c.match(/rgba?\(\s*([\d.]+)[ ,]+([\d.]+)[ ,]+([\d.]+)(?:[ ,/]+([\d.]+))?/);
  if (!m || (m[4] !== undefined && parseFloat(m[4]) === 0)) return fallback;
  return [+m[1] / 255, +m[2] / 255, +m[3] / 255];
}

/* ---------- shaders ---------- */

const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`;
const FIELD = `
uniform vec2 uRes;
uniform float uT;
uniform vec2 uVc;
uniform float uVortex;
vec2 field(vec2 uv){
  float asp = uRes.x / uRes.y;
  vec2 q = vec2(uv.x * asp, uv.y);
  float t = uT;
  vec2 v;
  v.x = sin(q.y*3.1 + t*0.9) + 0.6*sin((q.x+q.y)*5.3 - t*1.3) + 0.3*sin(q.x*9.0 + t*2.1);
  v.y = cos(q.x*2.7 - t*0.8) + 0.6*cos((q.x-q.y)*4.7 + t*1.1) + 0.3*cos(q.y*8.0 - t*1.9);
  vec2 d = q - vec2(uVc.x * asp, uVc.y);
  float r2 = dot(d, d);
  v += uVortex * (vec2(-d.y, d.x) * 3.2 - d * 0.9) * exp(-r2 * 3.5);
  return v;
}`;
const FEEDBACK = `
precision highp float;
uniform sampler2D uPrev;
uniform sampler2D uInj;
uniform float uAmt;
uniform float uDecay;
uniform float uBlock;
uniform float uBlockMix;
uniform float uSeed;
uniform float uGlitch;
uniform vec3 uBg;
uniform vec3 uTear;
${FIELD}
float h(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
void main(){
  vec2 fc = gl_FragCoord.xy;
  vec2 uv = fc / uRes;
  vec2 bp = floor(fc / uBlock);
  vec2 bc = (bp + 0.5) * uBlock / uRes;
  vec2 v = mix(field(uv), field(bc), uBlockMix) * uAmt;
  float r = h(bp + uSeed);
  if (r > 1.0 - uGlitch) {
    v = vec2((h(bp * 3.1 + uSeed) - 0.5) * 2.0, -uBlock * (0.35 + 0.9 * h(bp * 1.7 + uSeed)));
  } else if (r < uGlitch * 0.55) {
    v *= 3.2;
  } else if (r < uGlitch * 0.9) {
    v = vec2(0.0);
  }
  if (uv.y > uTear.x && uv.y < uTear.y) v.x += uTear.z;
  v = floor(v + 0.5);
  vec2 su = (fc - v) / uRes;
  vec3 c = (su.x < 0.0 || su.y < 0.0 || su.x > 1.0 || su.y > 1.0) ? uBg : texture2D(uPrev, su).rgb;
  c = mix(c, uBg, uDecay);
  vec4 inj = texture2D(uInj, uv);
  c = inj.rgb + c * (1.0 - inj.a);
  gl_FragColor = vec4(c, 1.0);
}`;
const DISPLAY = `
precision highp float;
uniform sampler2D uTex;
uniform vec2 uOut;
uniform float uAb;
uniform float uSat;
void main(){
  vec2 uv = gl_FragCoord.xy / uOut;
  vec2 o = vec2(uAb / uOut.x, 0.0);
  vec3 c = vec3(texture2D(uTex, uv + o).r, texture2D(uTex, uv).g, texture2D(uTex, uv - o).b);
  float l = dot(c, vec3(0.299, 0.587, 0.114));
  c = clamp(mix(vec3(l), c, uSat), 0.0, 1.0);
  gl_FragColor = vec4(c, 1.0);
}`;

/* ---------- opening ---------- */

export function startIntroFlow(root: HTMLElement, canvas: HTMLCanvasElement): Animation | null {
  const bio = root.querySelector<HTMLElement>(".home-bio");
  const spans = Array.from(root.querySelectorAll<HTMLElement>(".intro-word"));
  const tx = canvas.getContext("2d");
  if (!bio || !tx || !spans.length || !canvas.parentNode) return null;

  const W = window.innerWidth;
  const H = window.innerHeight;
  const VMIN = Math.min(W, H);
  const K = clamp(W / 1440, 0.7, 1.4); // paint scale
  const KT = clamp(VMIN / 900, 0.62, 1.25); // text scale
  const DPR = Math.min(window.devicePixelRatio || 1, 2, Math.sqrt(4_000_000 / (W * H)));
  const S = Math.min(W > 1600 ? 0.55 : 0.66, Math.sqrt(550_000 / (W * H)));
  const SW = Math.max(2, Math.round(W * S));
  const SH = Math.max(2, Math.round(H * S));
  const OD = Math.min(DPR, 1.5);
  const OW = Math.round(W * OD);
  const OH = Math.round(H * OD);
  canvas.width = Math.round(W * DPR);
  canvas.height = Math.round(H * DPR);

  const style = getComputedStyle(bio);
  const size = parseFloat(style.fontSize) || 20;
  const family = style.fontFamily || '"Times New Roman", Times, serif';
  const bioFont = `${style.fontStyle} ${style.fontWeight} ${size}px ${family}`;
  const ink = style.color || "#111";
  const BG = parseColor(getComputedStyle(document.body).backgroundColor, [1, 254 / 255, 254 / 255]);
  const bgCss = `rgb(${Math.round(BG[0] * 255)},${Math.round(BG[1] * 255)},${Math.round(BG[2] * 255)})`;

  // Where each word sits on the page: left edge and baseline.
  const probe = document.createElement("span");
  probe.style.cssText = "display:inline-block;width:0;height:0";
  spans[0].append(probe);
  const rise = probe.getBoundingClientRect().top - spans[0].getBoundingClientRect().top;
  probe.remove();
  const texts = spans.map((s) => s.textContent ?? "");
  const rects = spans.map((s) => s.getBoundingClientRect());
  const T = prepText(texts);

  /* --- layers: color (WebGL) under the given canvas, which draws the words --- */
  let glc = document.createElement("canvas");
  const inj = document.createElement("canvas");
  inj.width = SW;
  inj.height = SH;
  const ix = inj.getContext("2d");
  if (!ix) return null;
  glc.className = `${canvas.className} intro-color`;
  glc.setAttribute("aria-hidden", "true");
  canvas.parentNode.insertBefore(glc, canvas);

  let gl: WebGLRenderingContext | null = null;
  let pc: CanvasRenderingContext2D | null = null;
  let fbProg: WebGLProgram | null = null;
  let dpProg: WebGLProgram | null = null;
  let texA: WebGLTexture | null = null;
  let texB: WebGLTexture | null = null;
  let fbA: WebGLFramebuffer | null = null;
  let fbB: WebGLFramebuffer | null = null;
  let injTex: WebGLTexture | null = null;
  const U: Record<string, WebGLUniformLocation | null> = {};

  const initGL = () => {
    const g = glc.getContext("webgl", { alpha: false, antialias: false, depth: false, stencil: false, premultipliedAlpha: false, failIfMajorPerformanceCaveat: true });
    if (!g) return false;
    const compile = (src: string, type: number) => {
      const s = g.createShader(type)!;
      g.shaderSource(s, src);
      g.compileShader(s);
      if (!g.getShaderParameter(s, g.COMPILE_STATUS)) throw new Error("shader");
      return s;
    };
    const program = (fs: string) => {
      const p = g.createProgram()!;
      g.attachShader(p, compile(VERT, g.VERTEX_SHADER));
      g.attachShader(p, compile(fs, g.FRAGMENT_SHADER));
      g.bindAttribLocation(p, 0, "p");
      g.linkProgram(p);
      if (!g.getProgramParameter(p, g.LINK_STATUS)) throw new Error("link");
      return p;
    };
    const mkTex = (w: number, h: number) => {
      const t = g.createTexture()!;
      g.bindTexture(g.TEXTURE_2D, t);
      g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MIN_FILTER, g.LINEAR);
      g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MAG_FILTER, g.LINEAR);
      g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_S, g.CLAMP_TO_EDGE);
      g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_T, g.CLAMP_TO_EDGE);
      if (w) g.texImage2D(g.TEXTURE_2D, 0, g.RGBA, w, h, 0, g.RGBA, g.UNSIGNED_BYTE, null);
      return t;
    };
    const mkFb = (t: WebGLTexture) => {
      const f = g.createFramebuffer()!;
      g.bindFramebuffer(g.FRAMEBUFFER, f);
      g.framebufferTexture2D(g.FRAMEBUFFER, g.COLOR_ATTACHMENT0, g.TEXTURE_2D, t, 0);
      g.clearColor(BG[0], BG[1], BG[2], 1);
      g.clear(g.COLOR_BUFFER_BIT);
      return f;
    };
    try {
      fbProg = program(FEEDBACK);
      dpProg = program(DISPLAY);
      const buf = g.createBuffer();
      g.bindBuffer(g.ARRAY_BUFFER, buf);
      g.bufferData(g.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), g.STATIC_DRAW);
      g.enableVertexAttribArray(0);
      g.vertexAttribPointer(0, 2, g.FLOAT, false, 0, 0);
      for (const n of ["uPrev", "uInj", "uAmt", "uDecay", "uBlock", "uBlockMix", "uSeed", "uGlitch", "uBg", "uTear", "uRes", "uT", "uVc", "uVortex"]) U["f" + n] = g.getUniformLocation(fbProg, n);
      for (const n of ["uTex", "uOut", "uAb", "uSat"]) U["d" + n] = g.getUniformLocation(dpProg, n);
      injTex = mkTex(0, 0);
      texA = mkTex(SW, SH);
      texB = mkTex(SW, SH);
      fbA = mkFb(texA);
      fbB = mkFb(texB);
      glc.width = OW;
      glc.height = OH;
      gl = g;
      return true;
    } catch {
      g.getExtension("WEBGL_lose_context")?.loseContext();
      return false;
    }
  };
  const use2D = () => {
    gl = null;
    const fresh = document.createElement("canvas");
    fresh.className = glc.className;
    fresh.setAttribute("aria-hidden", "true");
    glc.replaceWith(fresh);
    glc = fresh;
    glc.width = SW;
    glc.height = SH;
    pc = glc.getContext("2d");
    if (pc) {
      pc.fillStyle = bgCss;
      pc.fillRect(0, 0, SW, SH);
    }
  };
  if (initGL()) glc.addEventListener("webglcontextlost", use2D, { once: true });
  else use2D();

  /* --- flow field (mirrors the shader; CSS px, y down) --- */
  let vcx = 0.5,
    vcy = 0.5,
    vortex = 0,
    amt = 1.5,
    simT = 0;
  const flow = (x: number, y: number): [number, number] => {
    const asp = W / H;
    const qx = (x / W) * asp,
      qy = 1 - y / H;
    const t = simT;
    let vx = Math.sin(qy * 3.1 + t * 0.9) + 0.6 * Math.sin((qx + qy) * 5.3 - t * 1.3) + 0.3 * Math.sin(qx * 9 + t * 2.1);
    let vy = Math.cos(qx * 2.7 - t * 0.8) + 0.6 * Math.cos((qx - qy) * 4.7 + t * 1.1) + 0.3 * Math.cos(qy * 8 - t * 1.9);
    const dx = qx - vcx * asp,
      dy = qy - vcy;
    const e = vortex * Math.exp(-(dx * dx + dy * dy) * 3.5);
    vx += e * (-dy * 3.2 - dx * 0.9);
    vy += e * (dx * 3.2 - dy * 0.9);
    return [(vx * amt) / S, (-vy * amt) / S];
  };

  /* --- state --- */
  const words: Word[] = [];
  const stamp: Word[] = [];
  const shapes: Shape[] = [];
  const agents: Agent[] = [];
  const bars: Bar[] = [];
  const attract = [0, 1, 2, 3, 4].map((i) => ({ ph: rnd(6.28), sp: rnd(0.25, 0.6), ax: rnd(0.2, 0.42), ay: rnd(0.18, 0.4), i }));
  const acc = { big: 0, phrase: 0, cap: 0, shape: 0, ribbon: 0, fleck: 0, bar: 0, river: 0, wash: 0 };
  let t = 0; // seconds
  let seed = 0,
    seedClock = 0,
    tear = [0, 0, 0],
    tearClock = 0,
    burst = 0;
  const fontPx = (px: number) => `${px.toFixed(1)}px ${family}`;
  const attractor = (i: number): [number, number] => {
    const a = attract[i % attract.length];
    const ph = a.ph + simT * a.sp;
    return [W * (0.5 + a.ax * Math.cos(ph + a.i * 1.3)), H * (0.5 + a.ay * Math.sin(ph * 1.27 + a.i))];
  };

  /* --- the landing: every bio word flies to its place, in reading order --- */
  tx.font = bioFont;
  const landers: Lander[] = spans.map((_, i) => {
    const part = spans.length > 1 ? i / (spans.length - 1) : 0;
    const slotX = rects[i].left;
    const slotY = rects[i].top + rise;
    const [ax, ay] = attractor(i);
    const x0 = clamp(ax + rnd(-0.3, 0.3) * W, -40, W - 40);
    const y0 = clamp(ay + rnd(-0.3, 0.3) * H, 20, H + 20);
    const sweep = rnd(-1, 1) * VMIN * 0.25;
    return {
      s: texts[i],
      font: bioFont,
      slotX,
      slotY,
      x0,
      y0,
      c1x: x0 + (slotX - x0) * 0.3 - (slotY - y0) * 0.35 + sweep,
      c1y: y0 + (slotY - y0) * 0.3 + (slotX - x0) * 0.35,
      c2x: slotX - size * 2.4,
      c2y: slotY - size * 1.1,
      s0: rnd(0.75, 1.5),
      leave: (LAND_START + part * LAND_SPAN) / 1000,
    };
  });

  const spawnBig = (p: number) => {
    const sz = VMIN * lerp(0.04, 0.026, sstep(0, 0.28, p)) * rnd(0.75, 1.2);
    const s = Math.random() < 0.5 ? pick(T.motif) : pick(T.words);
    const row = Math.round(rnd(-0.5, H / (sz * 0.9)));
    words.push({ s: s.toLowerCase(), x: rnd(-sz, W - sz * 0.5), y: row * sz * 0.9 + rnd(-sz * 0.15, sz * 0.15), size: sz, kind: 0, born: t, life: rnd(0.22, 0.7), drift: rnd(0.4, 1.2), tone: Math.random() < 0.22 ? rnd(0.35, 0.65) : 0, ghost: 0.035, flick: Math.random() < 0.25 ? rnd(0.3, 0.6) : 0 });
    stamp.push(words[words.length - 1]);
  };
  const spawnCap = () => {
    const s = letters(Math.random() < 0.45 ? pick(T.motif) : pick(T.words)).toUpperCase();
    if (s) words.push({ s, x: rnd(0, W - 30), y: rnd(10, H), size: rnd(5, 7) * KT, kind: 2, born: t, life: rnd(0.2, 0.85), drift: rnd(0.6, 1.4), tone: Math.random() < 0.3 ? rnd(0.3, 0.55) : 0, ghost: 0.01, flick: Math.random() < 0.3 ? 0.4 : 0 });
  };
  const spawnPhrase = (p: number) => {
    const ph = pick(T.phrases);
    const sz = (p < 0.28 ? lerp(17, 13.5, sstep(0, 0.28, p)) : lerp(13.5, 10.5, sstep(0.28, 0.85, p))) * rnd(0.85, 1.15) * KT;
    tx.font = fontPx(sz);
    const ws = ph.map((w) => tx.measureText(w).width);
    const type = pick(["arc", "arc", "arc", "line", "column", "spiral", "diag", "wave", "column"]);
    const gap = sz * rnd(0.25, 0.55);
    let x = rnd(W * 0.04, W * 0.8),
      y = rnd(H * 0.08, H * 0.92);
    const pts: [number, number][] = [];
    if (type === "arc" || type === "spiral") {
      const R0 = rnd(0.12, 0.42) * VMIN;
      const cx = x + rnd(-R0, R0),
        cy = y + rnd(-R0, R0);
      let a = rnd(Math.PI * 2);
      let R = R0;
      const dir = Math.random() < 0.5 ? 1 : -1;
      for (let i = 0; i < ph.length; i++) {
        pts.push([cx + Math.cos(a) * R, cy + Math.sin(a) * R]);
        a += (dir * (ws[i] * 0.55 + gap + sz * 0.6)) / R;
        if (type === "spiral") R *= 0.9;
      }
    } else if (type === "column") {
      for (let i = 0; i < ph.length; i++) pts.push([x + (i % 2 ? rnd(-sz * 0.6, sz * 0.6) : 0), y + i * sz * 1.22]);
    } else if (type === "diag") {
      for (let i = 0; i < ph.length; i++) {
        pts.push([x, y]);
        x += ws[i] * 0.55 + gap;
        y += sz * 1.15;
      }
    } else if (type === "wave") {
      for (let i = 0; i < ph.length; i++) {
        pts.push([x, y + Math.sin(i * 0.95) * sz * 1.4]);
        x += ws[i] + gap;
      }
    } else {
      for (let i = 0; i < ph.length; i++) {
        if (x + ws[i] > W - 8) {
          x = rnd(W * 0.05, W * 0.4);
          y += sz * 1.3;
        }
        pts.push([x, y + rnd(-2, 2)]);
        x += ws[i] + gap;
      }
    }
    const stagger = rnd(0.014, 0.035);
    const life = rnd(0.35, 0.9);
    const drift = rnd(0.5, 1.1);
    for (let i = 0; i < ph.length; i++) {
      words.push({ s: ph[i], x: pts[i][0], y: pts[i][1], size: sz * (Math.random() < 0.12 ? rnd(0.6, 1.4) : 1), kind: 1, born: t + i * stagger, life: life + rnd(-0.1, 0.25), drift, tone: Math.random() < 0.15 ? rnd(0.3, 0.6) : 0, ghost: 0.02, flick: Math.random() < 0.15 ? 0.5 : 0 });
    }
    if (Math.random() < 0.6) {
      const j = (Math.random() * pts.length) | 0;
      const s = letters(pick(T.words)).toUpperCase();
      if (s) words.push({ s, x: pts[j][0] + rnd(-40, 60), y: pts[j][1] + rnd(-14, 18), size: rnd(5, 6.5) * KT, kind: 2, born: t, life: life * 0.8, drift, tone: 0, ghost: 0.05, flick: 0 });
    }
  };
  const spawnShape = (near?: [number, number]) => {
    const [x, y] = near ?? [rnd(0, W), rnd(0, H)];
    shapes.push({ k: (Math.random() * 6) | 0, x: x + (near ? rnd(-60, 60) : 0), y: y + (near ? rnd(-40, 40) : 0), s: rnd(6, 15) * KT, born: t, life: rnd(0.25, 0.95), seed: rnd(1000) });
  };
  const spawnAgent = (kind: number, p: number) => {
    const [axp, ayp] = attractor((Math.random() * attract.length) | 0);
    const spread = (kind === 0 ? 0.11 : 0.14) * Math.max(W, H);
    const x = Math.random() < 0.9 ? axp + rnd(-spread, spread) : rnd(0, W);
    const y = Math.random() < 0.9 ? ayp + rnd(-spread * 0.7, spread * 0.7) : rnd(0, H);
    if (kind === 0) agents.push({ k: 0, x, y, px: x, py: y, vx: rnd(-3, 3), vy: rnd(-3, 3), w: rnd(7, 26) * K * lerp(1, 1.3, p), c1: pick(BLUES), c2: pick(BLUE_LIGHT), born: t, life: rnd(0.7, 2.1) });
    else agents.push({ k: 1, x, y, px: x, py: y, vx: rnd(-6, 6), vy: rnd(-6, 6), w: rnd(3, 10) * K, c1: Math.random() < 0.8 ? pick(HOTS) : pick(PASTELS), c2: "", born: t, life: rnd(0.12, 0.5) });
  };
  const spawnRiver = (p: number) => {
    const [axp, ayp] = attractor((Math.random() * attract.length) | 0);
    const x = axp + rnd(-0.18, 0.18) * W,
      y = ayp + rnd(-0.18, 0.18) * H;
    agents.push({ k: 2, x, y, px: x, py: y, vx: rnd(-4, 4), vy: rnd(-4, 4), w: rnd(14, 34) * K * lerp(1, 1.2, p), c1: pick(RIVERS), c2: pick(BLUE_LIGHT), born: t, life: rnd(1.4, 3.2), trail: [], ph: rnd(6.28) });
  };
  const spawnWash = () => {
    const [axp, ayp] = attractor((Math.random() * attract.length) | 0);
    const sp = 0.14 * Math.max(W, H);
    const x = axp + (Math.random() + Math.random() - 1) * sp,
      y = ayp + (Math.random() + Math.random() - 1) * sp * 0.8;
    const r = Math.random();
    const c1 = r < 0.5 ? pick(PASTELS) : r < 0.75 ? pick(BLUE_LIGHT.concat(BLUES)) : pick(HOTS);
    agents.push({ k: 3, x, y, px: x, py: y, vx: rnd(-5, 5), vy: rnd(-5, 5), w: rnd(14, 48) * K, c1, c2: "", born: t, life: rnd(0.35, 1.1) });
  };
  const spawnBar = () => {
    const n = 2 + ((Math.random() * 5) | 0);
    const ws: number[] = [];
    const cols: string[] = [];
    for (let i = 0; i < n; i++) {
      ws.push(rnd(8, 26) * K);
      cols.push(pick(BARCOLS));
    }
    const [axp, ayp] = attractor((Math.random() * attract.length) | 0);
    bars.push({ x: Math.random() < 0.7 ? axp + rnd(-W * 0.25, W * 0.2) : rnd(0, W), y: Math.random() < 0.7 ? ayp + rnd(-H * 0.3, H * 0.2) : rnd(0, H), h: rnd(30, 200) * K, cols, ws, born: t, life: rnd(0.08, 0.3), dir: Math.random() < 0.5 ? 1 : -1 });
  };

  const wobblePath = (ctx: CanvasRenderingContext2D, sh: Shape, jit: number) => {
    const { x, y, s } = sh;
    const j = () => (Math.random() - 0.5) * jit;
    ctx.beginPath();
    if (sh.k === 0 || sh.k === 1) {
      const r = sh.k === 1 ? s * 0.35 : s * 0.06;
      const n = 14;
      for (let i = 0; i <= n * 4; i++) {
        const side = Math.floor(i / n) % 4;
        const f = (i % n) / n;
        let px = 0,
          py = 0;
        if (side === 0) (px = -s + 2 * s * f), (py = -s);
        else if (side === 1) (px = s), (py = -s + 2 * s * f);
        else if (side === 2) (px = s - 2 * s * f), (py = s);
        else (px = -s), (py = s - 2 * s * f);
        const cx = clamp(px, -s + r, s - r),
          cy = clamp(py, -s + r, s - r);
        const dx = px - cx,
          dy = py - cy,
          dl = Math.hypot(dx, dy) || 1;
        const k = dl > r ? r / dl : 1;
        const fx = x + cx + dx * k + j(),
          fy = y + cy + dy * k + j();
        if (i === 0) ctx.moveTo(fx, fy);
        else ctx.lineTo(fx, fy);
      }
    } else if (sh.k === 2 || sh.k === 3) {
      for (let c = 0; c < (sh.k === 3 ? 2 : 1); c++) {
        const ox = c ? s * 0.9 : 0;
        const r = s * (c ? 0.75 : 0.85);
        for (let i = 0; i <= 18; i++) {
          const a = (i / 18) * Math.PI * 2;
          const fx = x + ox + Math.cos(a) * (r + j()),
            fy = y + Math.sin(a) * (r + j());
          if (i === 0) ctx.moveTo(fx, fy);
          else ctx.lineTo(fx, fy);
        }
      }
    } else if (sh.k === 4) {
      for (let i = 0; i <= 26; i++) {
        const a = (i / 26) * Math.PI * 2;
        const rr = s * (1 + 0.18 * Math.sin(a * 5 + sh.seed)) + j();
        const fx = x + Math.cos(a) * rr * 1.3,
          fy = y + Math.sin(a) * rr * 0.85;
        if (i === 0) ctx.moveTo(fx, fy);
        else ctx.lineTo(fx, fy);
      }
    } else {
      ctx.arc(x, y, s * 0.45, 0, Math.PI * 2);
    }
  };
  const drawWordTo = (ctx: CanvasRenderingContext2D, w: Word, color: string) => {
    ctx.font = fontPx(w.size);
    ctx.fillStyle = color;
    ctx.fillText(w.s, w.x, w.y);
  };

  /* --- one step of the storm --- */
  const step = (dt: number) => {
    const ms = t * 1000;
    const p = clamp(ms / MAIN, 0, 1);
    const out = sstep(LAND_START - 300, MAIN + 300, ms); // storm winding down
    simT += dt * (1 + 1.5 * sstep(0.3, 1, p));
    amt = lerp(1.4, 3.2, sstep(0, 0.5, p)) + 3.5 * sstep(0.8, 1, p);
    vortex = 1.5 * sstep(0.22, 0.42, p) * (1 - sstep(0.8, 0.98, p));
    vcx = 0.5 + 0.16 * Math.sin(simT * 0.35);
    vcy = 0.5 + 0.12 * Math.cos(simT * 0.29);

    const rates = {
      big: p < 0.26 ? lerp(24, 4, p / 0.26) : 0,
      phrase: 8 + 18 * sstep(0.06, 0.24, p),
      cap: 18 + 60 * sstep(0.08, 0.35, p),
      shape: 10 + 26 * sstep(0.1, 0.4, p),
      ribbon: 14 + 6 * sstep(0.05, 0.55, p),
      fleck: 38 + 14 * sstep(0.1, 0.55, p),
      bar: 8 + 3 * sstep(0.15, 0.6, p) + burst * 12,
      river: 3 + 0.8 * sstep(0.1, 0.5, p),
      wash: 30 + 6 * sstep(0.05, 0.5, p),
    };
    const area = clamp((W * H) / (1440 * 900), 0.45, 1.8);
    const scaleBy: Record<keyof typeof rates, number> = { big: 1, phrase: Math.sqrt(area), cap: area, shape: area, ribbon: area, fleck: area, bar: area, river: Math.sqrt(area), wash: area };
    for (const k of Object.keys(rates) as (keyof typeof rates)[]) {
      acc[k] += rates[k] * scaleBy[k] * (1 - out) * dt;
      while (acc[k] >= 1) {
        acc[k] -= 1;
        if (k === "big") spawnBig(p);
        else if (k === "phrase") spawnPhrase(p);
        else if (k === "cap") spawnCap();
        else if (k === "shape") {
          const w = words.length ? words[(Math.random() * words.length) | 0] : null;
          spawnShape(w && Math.random() < 0.6 ? [w.x, w.y] : undefined);
        } else if (k === "ribbon") spawnAgent(0, p);
        else if (k === "fleck") spawnAgent(1, p);
        else if (k === "river") spawnRiver(p);
        else if (k === "wash") spawnWash();
        else spawnBar();
      }
    }

    seedClock -= dt;
    if (seedClock <= 0) {
      seed = rnd(1000);
      seedClock = rnd(0.05, 0.16);
      burst = Math.random() < 0.18 * (1 - out) ? 1 : 0;
    }
    tearClock -= dt;
    if (tearClock <= 0) {
      tearClock = rnd(0.25, 0.9);
      if (Math.random() < (0.45 * sstep(0.2, 0.6, p) + 0.1) * (1 - out)) {
        const y0 = rnd(0, 0.9);
        tear = [y0, y0 + rnd(0.04, 0.22), rnd(-14, 14)];
      } else tear = [0, 0, 0];
    }

    const f60 = dt * 60;
    ix.setTransform(1, 0, 0, 1, 0, 0);
    ix.clearRect(0, 0, SW, SH);
    ix.setTransform(S, 0, 0, S, 0, 0);
    ix.lineCap = "round";
    ix.lineJoin = "round";

    for (let i = agents.length - 1; i >= 0; i--) {
      const a = agents[i];
      const age = (t - a.born) / a.life;
      if (age >= 1) {
        agents.splice(i, 1);
        continue;
      }
      if (a.k === 2) {
        // Rivers redraw their whole trail, carried along by the flow, so they stay one piece.
        const tr = a.trail!;
        for (let j = 0; j < tr.length; j += 2) {
          const [bx, by] = flow(tr[j], tr[j + 1]);
          tr[j] += bx * f60;
          tr[j + 1] += by * f60;
        }
        const [fx, fy] = flow(a.x, a.y);
        const sw = Math.sin(t * 2.4 + a.ph!) * 0.9;
        a.vx = a.vx * 0.9 + (fx * 2.4 - fy * sw) * 0.1;
        a.vy = a.vy * 0.9 + (fy * 2.4 + fx * sw) * 0.1;
        a.x += a.vx * f60;
        a.y += a.vy * f60;
        tr.push(a.x, a.y);
        if (tr.length > 80) tr.splice(0, tr.length - 80);
        const n = tr.length / 2;
        const fade = Math.min(1, (1 - age) * 3) * (1 - out);
        for (let pass = 0; pass < 2; pass++) {
          ix.strokeStyle = pass ? a.c2 : a.c1;
          ix.globalAlpha = (pass ? 0.7 : 0.92) * fade;
          for (let j = 1; j < n; j++) {
            ix.lineWidth = a.w * (0.25 + (0.75 * j) / n) * (pass ? 0.6 : 1);
            ix.beginPath();
            ix.moveTo(tr[(j - 1) * 2], tr[(j - 1) * 2 + 1]);
            ix.lineTo(tr[j * 2], tr[j * 2 + 1]);
            ix.stroke();
          }
        }
        continue;
      }
      const [fx, fy] = flow(a.x, a.y);
      const inertia = a.k === 0 ? 0.9 : 0.72;
      a.vx = a.vx * inertia + fx * (1 - inertia) * (a.k === 0 ? 2.6 : 3.4);
      a.vy = a.vy * inertia + fy * (1 - inertia) * (a.k === 0 ? 2.6 : 3.4);
      // Start where the last stroke has been carried to, so strokes stay continuous.
      a.px = a.x + fx * f60;
      a.py = a.y + fy * f60;
      a.x += a.vx * f60;
      a.y += a.vy * f60;
      const taper = Math.sin(Math.PI * Math.min(1, age * 1.05)) * 0.85 + 0.15;
      ix.globalAlpha = (a.k === 0 ? 0.95 : a.k === 3 ? 0.42 : 0.9) * (1 - out);
      ix.strokeStyle = a.c1;
      ix.lineWidth = a.w * taper;
      ix.beginPath();
      ix.moveTo(a.px, a.py);
      ix.lineTo(a.x, a.y);
      ix.stroke();
      if (a.k === 1 && a.w > 5) {
        ix.globalAlpha = 0.8 * (1 - out);
        ix.strokeStyle = "#b8200f";
        ix.lineWidth = a.w * taper * 0.35;
        ix.beginPath();
        ix.moveTo(a.px, a.py);
        ix.lineTo(a.x, a.y);
        ix.stroke();
      }
      if (a.k === 0) {
        ix.globalAlpha = 0.75 * (1 - out);
        ix.strokeStyle = a.c2;
        ix.lineWidth = a.w * taper * 0.45;
        const nx = -a.vy,
          ny = a.vx,
          nl = Math.hypot(nx, ny) || 1;
        const o = a.w * 0.18;
        ix.beginPath();
        ix.moveTo(a.px + (nx / nl) * o, a.py + (ny / nl) * o);
        ix.lineTo(a.x + (nx / nl) * o, a.y + (ny / nl) * o);
        ix.stroke();
      }
    }

    // Pastel speckle around the paint clusters.
    const speck = Math.round((110 + 90 * sstep(0.08, 0.55, p)) * (1 - out) * f60 * Math.min(1, (W * H) / (1440 * 900) + 0.3));
    for (let i = 0; i < speck; i++) {
      const [axp, ayp] = attractor((Math.random() * attract.length) | 0);
      const sp = 0.17 * Math.max(W, H);
      const x = axp + (Math.random() + Math.random() + Math.random() - 1.5) * sp;
      const y = ayp + (Math.random() + Math.random() + Math.random() - 1.5) * sp * 0.75;
      ix.globalAlpha = rnd(0.35, 0.85);
      ix.fillStyle = Math.random() < 0.3 ? pick(BLUES) : Math.random() < 0.25 ? pick(HOTS) : pick(PASTELS);
      const s = rnd(1.2, 5) * K;
      ix.fillRect(x, y, s * rnd(0.6, 2.4), s * rnd(0.5, 1.6));
    }

    for (let i = bars.length - 1; i >= 0; i--) {
      const b = bars[i];
      if ((t - b.born) / b.life >= 1) {
        bars.splice(i, 1);
        continue;
      }
      let x = b.x;
      for (let k = 0; k < b.ws.length; k++) {
        const g = ix.createLinearGradient(0, b.y, 0, b.y + b.h);
        g.addColorStop(0, b.dir > 0 ? b.cols[k] + "00" : b.cols[k]);
        g.addColorStop(0.35, b.cols[k]);
        g.addColorStop(1, b.dir > 0 ? b.cols[k] : b.cols[k] + "33");
        ix.globalAlpha = 0.85 * (1 - out);
        ix.fillStyle = g;
        ix.fillRect(x, b.y, b.ws[k], b.h);
        x += b.ws[k];
      }
    }

    // Fresh big words leave one ghost copy behind.
    for (const w of stamp) {
      ix.globalAlpha = rnd(0.35, 0.65);
      drawWordTo(ix, w, Math.random() < 0.6 ? "#9a9a9a" : ink);
    }
    stamp.length = 0;
    for (let i = words.length - 1; i >= 0; i--) {
      const w = words[i];
      if (t < w.born) continue;
      if ((t - w.born) / w.life >= 1) {
        words.splice(i, 1);
        continue;
      }
      const [fx, fy] = flow(w.x, w.y);
      w.x += fx * w.drift * f60 * 0.9;
      w.y += fy * w.drift * f60 * 0.9;
      if (Math.random() < w.ghost * f60 * (1 - out)) {
        ix.globalAlpha = w.kind === 0 ? rnd(0.35, 0.7) : rnd(0.3, 0.6);
        drawWordTo(ix, w, Math.random() < 0.5 ? "#9a9a9a" : ink);
      }
    }
    for (let i = shapes.length - 1; i >= 0; i--) {
      const s = shapes[i];
      if ((t - s.born) / s.life >= 1) {
        shapes.splice(i, 1);
        continue;
      }
      const [fx, fy] = flow(s.x, s.y);
      s.x += fx * 0.7 * f60;
      s.y += fy * 0.7 * f60;
      if (Math.random() < 0.08 * f60 * (1 - out)) {
        ix.globalAlpha = 0.6;
        ix.strokeStyle = ink;
        ix.lineWidth = 1.2;
        wobblePath(ix, s, 1.4);
        ix.stroke();
      }
    }
    // Landing words smear a faint trail while they fly.
    if (ms < LAND_START + LAND_SPAN) {
      ix.font = bioFont;
      ix.fillStyle = "#9a9a9a";
      for (const l of landers) {
        const k = (t - l.leave) / (LAND_FLIGHT / 1000);
        if (k > 0 && k < 0.7 && Math.random() < 0.25 * f60) {
          const [x, y, sc] = landerPose(l, k);
          ix.globalAlpha = 0.4;
          ix.setTransform(S * sc, 0, 0, S * sc, S * x, S * y);
          ix.fillText(l.s, 0, 0);
        }
      }
      ix.setTransform(S, 0, 0, S, 0, 0);
    }
    ix.globalAlpha = 1;
  };

  const landerPose = (l: Lander, k: number): [number, number, number] => {
    const e = 1 - Math.pow(1 - clamp(k, 0, 1), 2.4);
    const f = 1 - e;
    const a = f * f * f,
      b = 3 * f * f * e,
      c = 3 * f * e * e,
      d = e * e * e;
    return [a * l.x0 + b * l.c1x + c * l.c2x + d * l.slotX, a * l.y0 + b * l.c1y + c * l.c2y + d * l.slotY, lerp(l.s0, 1, sstep(0, 0.85, k))];
  };

  /* --- the color layer --- */
  const mosh = (dt: number) => {
    const ms = t * 1000;
    const p = clamp(ms / MAIN, 0, 1);
    const f60 = dt * 60;
    // Washes back to the page color: lightly during the storm, fully during the landing.
    const decay60 = lerp(0.05, 0.031, sstep(0, 0.35, p)) + 0.02 * sstep(0.84, 1, p) + 0.16 * sstep(LAND_START, LAND_START + 700, ms);
    const decay = ms > LAND_START + LAND_SPAN ? 1 : 1 - Math.pow(1 - decay60, f60);
    const block = (burst ? rnd(18, 34) : rnd(10, 16)) * S * 1.5;
    if (gl) {
      gl.bindTexture(gl.TEXTURE_2D, injTex);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, inj);
      gl.useProgram(fbProg);
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbB);
      gl.viewport(0, 0, SW, SH);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texA);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, injTex);
      gl.uniform1i(U.fuPrev, 0);
      gl.uniform1i(U.fuInj, 1);
      gl.uniform1f(U.fuAmt, amt * f60);
      gl.uniform1f(U.fuDecay, decay);
      gl.uniform1f(U.fuBlock, block);
      gl.uniform1f(U.fuBlockMix, burst ? 1 : 0.7);
      gl.uniform1f(U.fuSeed, seed);
      gl.uniform1f(U.fuGlitch, (0.02 + 0.05 * sstep(0.25, 0.8, p) + burst * 0.05) * (1 - sstep(LAND_START, MAIN, ms)));
      gl.uniform3f(U.fuBg, BG[0], BG[1], BG[2]);
      gl.uniform3f(U.fuTear, tear[0], tear[1], tear[2] * S * f60);
      gl.uniform2f(U.fuRes, SW, SH);
      gl.uniform1f(U.fuT, simT);
      gl.uniform2f(U.fuVc, vcx, vcy);
      gl.uniform1f(U.fuVortex, vortex);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      [texA, texB] = [texB, texA];
      [fbA, fbB] = [fbB, fbA];
      gl.useProgram(dpProg);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, OW, OH);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texA);
      gl.uniform1i(U.duTex, 0);
      gl.uniform2f(U.duOut, OW, OH);
      gl.uniform1f(U.duAb, 1.2 + burst * 2.5);
      gl.uniform1f(U.duSat, 1.18);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    } else if (pc) {
      const strips = 24;
      const sh = SH / strips;
      for (let i = 0; i < strips; i++) {
        const [fx, fy] = flow(W * 0.5, (i + 0.5) * (H / strips));
        pc.drawImage(glc, 0, i * sh, SW, sh, fx * S * f60, i * sh + fy * S * f60, SW, sh);
      }
      pc.globalAlpha = decay;
      pc.fillStyle = bgCss;
      pc.fillRect(0, 0, SW, SH);
      pc.globalAlpha = 1;
      pc.drawImage(inj, 0, 0);
    }
  };

  /* --- the crisp layer: live words, little drawn frames, landing bio --- */
  const crisp = () => {
    const ms = t * 1000;
    const storm = 1 - sstep(LAND_START + 150, MAIN + 500, ms);
    tx.setTransform(1, 0, 0, 1, 0, 0);
    tx.clearRect(0, 0, canvas.width, canvas.height);
    tx.setTransform(DPR, 0, 0, DPR, 0, 0);
    tx.textBaseline = "alphabetic";
    const ls = tx as unknown as { letterSpacing?: string };
    if (storm > 0) {
      let lastFont = "";
      for (const w of words) {
        if (t < w.born) continue;
        if (w.flick && Math.random() < w.flick * 0.5) continue;
        const f = fontPx(w.size);
        if (f !== lastFont) {
          tx.font = f;
          lastFont = f;
        }
        tx.globalAlpha = (w.tone ? 1 - w.tone : 1) * storm;
        tx.fillStyle = ink;
        if (w.kind === 2) ls.letterSpacing = "0.06em";
        tx.fillText(w.s, w.x, w.y);
        if (w.kind === 2) ls.letterSpacing = "0px";
      }
      tx.globalAlpha = storm;
      tx.strokeStyle = ink;
      tx.fillStyle = ink;
      tx.lineWidth = 1.15;
      for (const s of shapes) {
        wobblePath(tx, s, 1.1);
        if (s.k === 5) tx.fill();
        else tx.stroke();
      }
    }
    // Bio words on their way to the page, then sitting exactly on it.
    const handover = 1 - Math.pow(clamp((ms - (TOTAL - HANDOVER)) / HANDOVER, 0, 1), 2);
    tx.fillStyle = ink;
    for (const l of landers) {
      const k = (t - l.leave) / (LAND_FLIGHT / 1000);
      if (k < 0) continue;
      const [x, y, sc] = landerPose(l, k);
      if (tx.font !== l.font) tx.font = l.font;
      tx.globalAlpha = k >= 1 ? handover : 1;
      tx.setTransform(DPR * sc, 0, 0, DPR * sc, DPR * x, DPR * y);
      tx.fillText(l.s, 0, 0);
    }
    tx.globalAlpha = 1;
  };

  // Start mid-flow, like the reference: a few frames of color, a wall of words.
  for (let i = 0; i < 24; i++) {
    const dt = 1 / 30;
    step(dt);
    mosh(dt);
    t += dt * 0.15;
  }
  t = 0;
  for (let i = 0; i < 16; i++) spawnBig(0);

  // The real paragraph takes over from the drawn words once every one has landed on it.
  // The clock is held paused and moved by the frames themselves, so a slow first frame
  // or a hidden tab never skips the opening: it plays from the top whenever it is seen.
  const clock = bio.animate([{ opacity: 0 }, { opacity: 0, offset: 1 - HANDOVER / TOTAL }, { opacity: 1 }], { duration: TOTAL, fill: "both", id: "intro-flow" });
  clock.pause();

  let alive = true;
  let lastNow = 0;
  let raf = 0;
  let targetsChanged = false;
  const invalidateTargets = () => { targetsChanged = true; };
  const updateTargets = () => {
    const bounds = canvas.getBoundingClientRect();
    spans[0].append(probe);
    const baseline = probe.getBoundingClientRect().top - spans[0].getBoundingClientRect().top;
    probe.remove();
    const targetStyle = getComputedStyle(bio);
    const font = `${targetStyle.fontStyle} ${targetStyle.fontWeight} ${targetStyle.fontSize} ${family}`;
    spans.forEach((span, i) => {
      const rect = span.getBoundingClientRect();
      landers[i].slotX = (rect.left - bounds.left) * W / bounds.width;
      landers[i].slotY = (rect.top + baseline - bounds.top) * H / bounds.height;
      landers[i].font = font;
    });
    targetsChanged = false;
  };
  window.addEventListener("resize", invalidateTargets);
  window.addEventListener("scroll", invalidateTargets, { passive: true });
  const cleanup = () => {
    if (!alive) return;
    alive = false;
    cancelAnimationFrame(raf);
    document.removeEventListener("visibilitychange", visibility);
    window.removeEventListener("resize", invalidateTargets);
    window.removeEventListener("scroll", invalidateTargets);
    glc.removeEventListener("webglcontextlost", use2D);
    gl?.getExtension("WEBGL_lose_context")?.loseContext();
    glc.remove();
  };
  void clock.finished.then(cleanup, cleanup);
  const tick = (now: number) => {
    if (!alive) return;
    if (clock.playState === "idle" || clock.playState === "finished") {
      cleanup();
      return;
    }
    const dt = lastNow ? clamp((now - lastNow) / 1000, 0, 0.05) : 0;
    lastNow = now;
    t += dt;
    if (t * 1000 >= TOTAL) {
      clock.finish();
      return;
    }
    try {
      clock.currentTime = t * 1000;
      if (targetsChanged && t * 1000 >= LAND_START - 250) updateTargets();
      if (dt > 0) {
        step(dt);
        mosh(dt);
      }
      crisp();
    } catch {
      // Keep the page usable if a drawing context fails mid-animation.
      clock.finish();
      return;
    }
    raf = requestAnimationFrame(tick);
  };
  const visibility = () => {
    cancelAnimationFrame(raf);
    lastNow = 0;
    if (alive && !document.hidden) raf = requestAnimationFrame(tick);
  };
  document.addEventListener("visibilitychange", visibility);
  visibility();
  return clock;
}
