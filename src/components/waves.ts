/*
 * The moving landscape along the bottom of every page: pink hills drawn in
 * stacked zigzag lines (with patches where the lines turn upright), a teal sea
 * of dashed wave lines in front of them, and a pale yellow shore. Everything is
 * line work on the page's white, and it keeps flowing. It pauses while it is
 * off screen and stands still for visitors who prefer reduced motion.
 */

const PINK = "#f6bcd8";
const PINK_DEEP = "#f1a9cc";
const TEAL = "#a3ddd9";
const SAND_FILL = "#fffdf1";
const SAND_LINE = "#f5eab9";

// Small hash for repeatable per-band choices.
const hash = (n: number) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

export function startWaveBand(canvas: HTMLCanvasElement): () => void {
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};
  const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const bg = getComputedStyle(document.body).backgroundColor || "#fffefe";

  let W = 0;
  let H = 0;
  let dpr = 1;
  let raf = 0;
  let onScreen = false;
  let last = 0;
  const start = performance.now();

  // Region edges, as heights from the top of the band (0..H).
  // Three balanced bands: pink hills on top, the teal sea, a wide yellow shore below.
  const hillTop = (u: number, t: number) =>
    H * (0.1 + 0.1 * Math.sin(u * 3.3 + 0.6 + t * 0.05) + 0.06 * Math.sin(u * 8.6 + 2.1) + 0.025 * Math.sin(u * 21 + t * 0.12));
  const seaTop = (u: number, t: number) =>
    H * (0.4 + 0.1 * Math.sin(u * 2.2 + 2.6 + t * 0.07) + 0.05 * Math.sin(u * 6.3 + 0.4 - t * 0.09) + 0.02 * Math.sin(u * 17 + t * 0.4));
  const sandTop = (u: number, t: number) =>
    H * (0.72 + 0.09 * Math.sin(u * 2.9 + 1.2 + t * 0.04) + 0.04 * Math.sin(u * 7.4 + 0.3) - 0.22 * Math.max(0, 1 - u * 2.2));

  const region = (top: (u: number) => number, step: number) => {
    ctx.beginPath();
    ctx.moveTo(0, H + 2);
    for (let x = 0; x <= W + step; x += step) ctx.lineTo(x, top(x / W));
    ctx.lineTo(W + step, H + 2);
    ctx.closePath();
  };

  const draw = (t: number) => {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    const small = W < 600;

    // Pink hills: zigzag lines that follow the hill line down the slope.
    const gap = small ? 3.8 : 4.4;
    const zig = small ? 5.5 : 6.6; // zigzag wavelength
    const amp = small ? 1.3 : 1.6;
    const stepX = zig / 3;
    ctx.lineWidth = 1.35;
    ctx.strokeStyle = PINK;
    ctx.globalAlpha = 0.95;
    const rows = Math.ceil(H / gap) + 2;
    for (let k = 0; k < rows; k++) {
      ctx.beginPath();
      let open = false;
      const phase = t * 1.6 + k * 0.9;
      for (let x = 0; x <= W + stepX; x += stepX) {
        const u = x / W;
        const y = hillTop(u, t) + k * gap + amp * Math.sin((x / zig) * Math.PI * 2 + phase) + 1.2 * Math.sin(u * 30 + k * 0.4 + t * 0.6);
        if (y > H + 4) {
          open = false;
          continue;
        }
        if (open) ctx.lineTo(x, y);
        else {
          ctx.moveTo(x, y);
          open = true;
        }
      }
      ctx.stroke();
    }

    // Patches where the lines stand upright, a deeper pink, sliding slowly.
    const bandW = small ? 34 : 56;
    const slide = (t * 9) % (bandW * 4);
    for (let b = -1; b * bandW * 2 < W + bandW * 4; b++) {
      if (hash(b) < 0.45) continue;
      const x0 = b * bandW * 2 + slide - bandW * 4 + hash(b + 9) * bandW;
      const w = bandW * (0.5 + hash(b + 3) * 0.8);
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x0, H + 2);
      for (let x = x0; x <= x0 + w; x += 4) ctx.lineTo(x, hillTop(x / W, t) + 3);
      ctx.lineTo(x0 + w, H + 2);
      ctx.closePath();
      ctx.clip();
      ctx.fillStyle = bg;
      ctx.fill();
      ctx.strokeStyle = PINK_DEEP;
      ctx.globalAlpha = 0.9;
      ctx.beginPath();
      for (let x = x0 + 2; x < x0 + w; x += gap * 0.85) {
        const top = hillTop(x / W, t);
        for (let y = top; y <= H + 2; y += stepX) {
          const xx = x + amp * Math.sin((y / zig) * Math.PI * 2 + t * 1.6 + x * 0.05);
          if (y === top) ctx.moveTo(xx, y);
          else ctx.lineTo(xx, y);
        }
      }
      ctx.stroke();
      ctx.restore();
    }

    // Teal sea: dashed wave lines that keep flowing along.
    const seaGap = small ? 5.5 : 6.5;
    region((u) => seaTop(u, t) - 1, 6);
    ctx.globalAlpha = 1;
    ctx.fillStyle = bg;
    ctx.fill();
    ctx.save();
    ctx.clip();
    ctx.strokeStyle = TEAL;
    ctx.lineWidth = 1.45;
    ctx.lineCap = "butt";
    ctx.setLineDash([3.5, 4.5]);
    for (let k = 0; k < Math.ceil(H / seaGap) + 2; k++) {
      ctx.lineDashOffset = -t * 14 - k * 2.3;
      ctx.globalAlpha = 0.85;
      ctx.beginPath();
      for (let x = -6; x <= W + 6; x += 6) {
        const u = x / W;
        const y = seaTop(u, t) + 2 + k * seaGap + 2.6 * Math.sin(x * 0.018 + k * 0.55 - t * 0.9) + 1.4 * Math.sin(x * 0.05 - k * 0.3 + t * 1.3);
        if (x < 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    ctx.setLineDash([]);
    ctx.restore();

    // Pale yellow shore along the bottom.
    region((u) => sandTop(u, t), 6);
    ctx.globalAlpha = 1;
    ctx.fillStyle = SAND_FILL;
    ctx.fill();
    ctx.save();
    ctx.clip();
    ctx.strokeStyle = SAND_LINE;
    ctx.lineWidth = 1.3;
    ctx.lineCap = "round";
    for (let k = 0; k < Math.ceil(H / 6) + 2; k++) {
      ctx.beginPath();
      for (let x = 0; x <= W + 5; x += 5) {
        const u = x / W;
        const y = sandTop(u, t) + 2 + k * 6 + 1.6 * Math.sin(x * 0.07 + k + t * 0.8);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    ctx.restore();
    ctx.globalAlpha = 1;
  };

  const frame = (now: number) => {
    raf = 0;
    if (!onScreen) return;
    // About 30 frames a second is plenty for slow water and saves battery.
    if (now - last >= 32) {
      last = now;
      draw((now - start) / 1000);
    }
    raf = requestAnimationFrame(frame);
  };
  const resize = () => {
    const box = canvas.getBoundingClientRect();
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    if (box.width === W && box.height === H && pixelRatio === dpr) return;
    W = box.width;
    H = box.height;
    dpr = pixelRatio;
    canvas.width = Math.max(1, Math.round(W * dpr));
    canvas.height = Math.max(1, Math.round(H * dpr));
    draw(still ? 0 : (performance.now() - start) / 1000);
  };
  resize();

  const sizeWatch = new ResizeObserver(resize);
  sizeWatch.observe(canvas);
  const viewWatch = new IntersectionObserver(([entry]) => {
    onScreen = entry.isIntersecting && !still;
    if (onScreen && !raf) raf = requestAnimationFrame(frame);
  });
  viewWatch.observe(canvas);

  return () => {
    sizeWatch.disconnect();
    viewWatch.disconnect();
    if (raf) cancelAnimationFrame(raf);
  };
}
