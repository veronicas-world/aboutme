// Frames extracted directly from the user's black-and-white horse sheet.
const PAPER = "#f7f4ec";
export const HORSE_INTRO_DURATION = 3900;

const FRAME_WIDTH = 376;
const FRAME_HEIGHT = 208;
const HORSE_WIDTH = 52;
// The first source tile is a standing pose. The other eight form the run:
// lift, reach, extension, push-off, recovery, and collection.
const GALLOP_ORDER = [1, 2, 3, 6, 7, 8, 5, 4];
const GALLOP_FRAME_MS = 100;
// Lift charcoal midtones just enough to separate the coat's shaded planes.
// Black pixels stay black, and the source silhouette and alpha stay intact.
const COAT_TONES = Uint8Array.from({ length: 256 }, (_, value) =>
  Math.round(255 * (value / 255) ** 0.9));

function hash(x: number, y: number, seed: number) {
  const value = Math.sin(x * 127.1 + y * 311.7 + seed * 74.7) * 43758.5453;
  return value - Math.floor(value);
}

export type HorseSprites = {
  get(frame: number): HTMLCanvasElement;
  dust: HTMLCanvasElement;
  kick: HTMLCanvasElement;
};

export async function createHorseSprites(): Promise<HorseSprites> {
  const image = new Image();
  const dustImage = new Image();
  image.src = "/intro/horse-gallop.png";
  dustImage.src = "/intro/horse-dust.png";
  await Promise.all([image.decode(), dustImage.decode()]);
  // Fade out the ground-level edge once, in the cached texture. Keep the
  // upper billows and pixel detail sharp, and soften every dust layer.
  const dust = document.createElement("canvas");
  dust.width = dustImage.naturalWidth;
  dust.height = dustImage.naturalHeight;
  const dustCtx = dust.getContext("2d");
  if (!dustCtx) throw new Error("Dust texture canvas is unavailable");
  dustCtx.drawImage(dustImage, 0, 0);
  const lowerEdge = dustCtx.createLinearGradient(0, dust.height * 0.6, 0, dust.height);
  lowerEdge.addColorStop(0, "rgba(0,0,0,1)");
  lowerEdge.addColorStop(0.35, "rgba(0,0,0,0.72)");
  lowerEdge.addColorStop(0.7, "rgba(0,0,0,0.18)");
  lowerEdge.addColorStop(1, "rgba(0,0,0,0)");
  dustCtx.globalCompositeOperation = "destination-in";
  dustCtx.fillStyle = lowerEdge;
  dustCtx.fillRect(0, 0, dust.width, dust.height);
  // A denser, softly edged fragment connects the long plume to the rear
  // hooves, instead of leaving a gap at the texture's fine emission tip.
  const kick = document.createElement("canvas");
  kick.width = 512;
  kick.height = 192;
  const kickCtx = kick.getContext("2d");
  if (!kickCtx) throw new Error("Dust sprite canvas is unavailable");
  kickCtx.imageSmoothingEnabled = false;
  kickCtx.drawImage(dust, 0, 0, dust.width * 0.6, dust.height, 0, 0, kick.width, kick.height);
  const edge = kickCtx.createLinearGradient(0, 0, kick.width, 0);
  edge.addColorStop(0, "rgba(0,0,0,0)");
  edge.addColorStop(0.18, "rgba(0,0,0,1)");
  edge.addColorStop(0.78, "rgba(0,0,0,1)");
  edge.addColorStop(1, "rgba(0,0,0,0)");
  kickCtx.globalCompositeOperation = "destination-in";
  kickCtx.fillStyle = edge;
  kickCtx.fillRect(0, 0, kick.width, kick.height);
  const frames = GALLOP_ORDER.map((tile) => {
    const canvas = document.createElement("canvas");
    canvas.width = FRAME_WIDTH;
    canvas.height = FRAME_HEIGHT;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Horse sprite canvas is unavailable");
    ctx.drawImage(
      image,
      (tile % 3) * FRAME_WIDTH, Math.floor(tile / 3) * FRAME_HEIGHT,
      FRAME_WIDTH, FRAME_HEIGHT,
      0, 0, FRAME_WIDTH, FRAME_HEIGHT,
    );
    const coat = ctx.getImageData(0, 0, FRAME_WIDTH, FRAME_HEIGHT);
    for (let i = 0; i < coat.data.length; i += 4) {
      coat.data[i] = COAT_TONES[coat.data[i]];
      coat.data[i + 1] = COAT_TONES[coat.data[i + 1]];
      coat.data[i + 2] = COAT_TONES[coat.data[i + 2]];
    }
    ctx.putImageData(coat, 0, 0);
    return canvas;
  });
  return {
    dust,
    kick,
    get(frame) {
      return frames[((frame % frames.length) + frames.length) % frames.length];
    },
  };
}

const HERD = [
  { offset: 1.1, depth: -1, size: 0.78, phase: 2 },
  { offset: 0.6, depth: -1.1, size: 0.8, phase: 6 },
  { offset: 0.05, depth: -0.8, size: 0.82, phase: 1 },
  { offset: 1.5, depth: 0.5, size: 0.9, phase: 3 },
  { offset: 0.95, depth: 0.8, size: 0.92, phase: 5 },
  { offset: 0.43, depth: 0.45, size: 0.94, phase: 7 },
  { offset: 0, depth: 0.8, size: 0.975, phase: 0 },
];

function noise(index: number) {
  return hash(index, 0, 0);
}

function ease(t: number) {
  return t * t * (3 - 2 * t);
}

export function paintHorseIntro(
  ctx: CanvasRenderingContext2D,
  sprites: HorseSprites,
  width: number,
  height: number,
  elapsed: number,
) {
  ctx.clearRect(0, 0, width, height);
  ctx.imageSmoothingEnabled = false;
  const base = Math.max(2, Math.min(7, Math.round(width / 210)));
  const leadWidth = HORSE_WIDTH * Math.max(1, Math.round(base * 0.975));
  const travel = width + leadWidth * 2.4;
  const leadX = -leadWidth * 0.9 + ((elapsed - 120) / 2800) * travel;
  const ground = height * 0.5 + leadWidth * 0.18;
  const herd = HERD.map((horse) => {
    const w = Math.round(leadWidth * horse.size / 0.975);
    const h = w * FRAME_HEIGHT / FRAME_WIDTH;
    return {
      ...horse, w, h,
      x: leadX - horse.offset * leadWidth * 1.32 + (leadWidth - w) * 0.25,
      y: Math.round(ground + horse.depth * leadWidth * 0.16 - h * 0.9),
    };
  });
  // The source tile includes loose pixels behind the animal. Anchor to
  // the actual hindquarters, not the outside edge of those fragments.
  const lastHorse = herd.reduce((last, horse) =>
    horse.x + horse.w * 0.43 < last.x + last.w * 0.43 ? horse : last);
  const trailX = lastHorse.x + lastHorse.w * 0.43;
  const groundY = lastHorse.y + lastHorse.h * 0.9;
  const dispersal = ease(Math.max(0, Math.min(1, (elapsed - 2950) / 700)));
  // Keep the page fully covered until HomeIntro removes the finished intro.
  ctx.fillStyle = PAPER;
  ctx.fillRect(0, 0, width, height);

  // The main cloud stays behind the final horse; small hoof puffs below
  // join the leading horses as they enter, before the full plume arrives.
  const dustOpacity = Math.min(1, elapsed / 450) * Math.max(0, Math.min(1, (3650 - elapsed) / 700));
  const tip = trailX;
  const plumeLength = Math.min(
    Math.max(width * 0.68, leadWidth * 2.8),
    Math.max(leadWidth * 1.1, tip + leadWidth * 0.12),
  );
  const plumeHeight = Math.max(40, leadWidth * 0.42);
  // The old cloud grows while losing density; fresh dust stays low at the
  // hooves. Its right edge remains pinned behind the rearmost horse.
  const fadingWidth = plumeLength * (1 + dispersal * 0.65);
  const fadingHeight = plumeHeight * (1 + dispersal * 1.5);
  ctx.globalAlpha = dustOpacity * 0.9;
  ctx.drawImage(sprites.dust, Math.round(tip - fadingWidth), Math.round(groundY - fadingHeight * 0.94), Math.round(fadingWidth), Math.round(fadingHeight));
  ctx.globalAlpha = dustOpacity * 0.26;
  ctx.drawImage(sprites.dust, Math.round(tip - plumeLength * 0.8), Math.round(groundY - plumeHeight * 0.16), Math.round(plumeLength * 0.8), Math.round(plumeHeight * 0.65));
  for (let i = 0; i < 9; i++) {
    const age = (elapsed / 1600 + noise(i + 51)) % 1;
    const spread = ease(age);
    const w = leadWidth * (0.65 + spread * 2.5) * (1 + dispersal * 0.6);
    const h = plumeHeight * (0.45 + spread * 2.2) * (1 + dispersal * 0.75);
    const right = tip - age * plumeLength * 0.8;
    const y = groundY - h * 0.86 - age * plumeHeight * 0.55;
    ctx.globalAlpha = dustOpacity * (1 - age) ** 1.15 * 0.5;
    ctx.drawImage(sprites.dust, Math.floor(right - w), Math.round(y), Math.round(w), Math.round(h));
  }
  const kickWidth = Math.round(leadWidth * 0.7);
  const kickHeight = Math.round(plumeHeight * 0.62);
  ctx.globalAlpha = dustOpacity * 0.7;
  ctx.drawImage(sprites.kick, Math.floor(tip - kickWidth), Math.round(groundY - kickHeight * 0.7), kickWidth, kickHeight);
  const colors = ["#545454", "#777777", "#a2a2a2", "#c6c6c6", "#dedede"];
  const grain = Math.max(1, Math.round(leadWidth / 170));
  for (let i = 0; i < 180; i++) {
    const age = (elapsed / 1600 + noise(i + 9)) % 1;
    const size = grain * (1 + Math.floor(noise(i + 81) * 2));
    const x = Math.floor(tip - age * plumeLength - size);
    const spread = (0.2 + ease(age) * 2.5) * (1 + dispersal * 0.8);
    const y = groundY - plumeHeight * 0.16 + (noise(i + 301) - 0.5) * plumeHeight * spread - age * plumeHeight * 0.55;
    ctx.globalAlpha = dustOpacity * (1 - age) ** 1.15 * 0.6;
    ctx.fillStyle = colors[i % colors.length];
    ctx.fillRect(x, Math.round(y), size, size);
  }
  herd.forEach((horse) => {
    for (let i = 0; i < 2; i++) {
      const age = (elapsed / 700 + horse.phase * 0.13 + i * 0.5) % 1;
      const w = horse.w * (0.4 + age * 0.35);
      const h = horse.h * (0.22 + age * 0.2);
      const right = horse.x + horse.w * 0.43 - age * horse.w * 0.4;
      const ground = horse.y + horse.h * 0.9;
      ctx.globalAlpha = dustOpacity * (1 - age) ** 0.8 * 0.24;
      ctx.drawImage(sprites.kick, Math.floor(right - w), Math.round(ground - h * 0.55), Math.round(w), Math.round(h));
    }
  });
  ctx.globalAlpha = 1;

  herd.forEach((horse) => {
    const { x, y, w, h } = horse;
    const cycle = Math.floor(elapsed / GALLOP_FRAME_MS + horse.phase);
    // Keep the supplied anatomy and motion intact, without extra bending
    // or rotation layered on top of the photographed poses.
    ctx.drawImage(sprites.get(cycle), Math.round(x), y, w, h);
  });
}
