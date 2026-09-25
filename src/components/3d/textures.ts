import * as THREE from "three";

// Resolve the self-hosted Inter family name that next/font registered on <html>.
const FONT = typeof document !== "undefined"
  ? `${getComputedStyle(document.documentElement).getPropertyValue("--font-inter").trim() || "Arial"}, Arial, Helvetica, sans-serif`
  : "Arial, sans-serif";

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
}

function finish(canvas: HTMLCanvasElement) {
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  tex.needsUpdate = true;
  return tex;
}

/** The face of the floating "account statement". Values are abstract bars — never real data. */
export function createDocumentTexture() {
  const w = 1024;
  const h = 1344;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;

  const bg = ctx.createLinearGradient(0, 0, 0, h);
  bg.addColorStop(0, "#ffffff");
  bg.addColorStop(1, "#eaf0f8");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Header
  ctx.fillStyle = "#137a3d";
  roundRect(ctx, 72, 76, 64, 64, 14);
  ctx.fill();
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 7;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  ctx.moveTo(90, 109);
  ctx.lineTo(101, 120);
  ctx.lineTo(120, 97);
  ctx.stroke();

  ctx.fillStyle = "#0b1a33";
  ctx.font = `700 46px ${FONT}`;
  ctx.textBaseline = "middle";
  ctx.fillText("Your Custom Plan", 164, 96);
  ctx.fillStyle = "#56657d";
  ctx.font = `500 28px ${FONT}`;
  ctx.fillText("Debt relief program", 164, 136);

  ctx.fillStyle = "#d5dde9";
  ctx.fillRect(72, 196, w - 144, 3);

  const rows: [string, number][] = [
    ["Credit card", 250],
    ["Credit card", 210],
    ["Medical bill", 170],
    ["Personal loan", 190],
    ["Monthly program amount", 140],
    ["Account manager", 150],
    ["Online access", 120],
  ];
  let y = 262;
  for (const [label, barW] of rows) {
    ctx.fillStyle = "#3f4d64";
    ctx.font = `500 30px ${FONT}`;
    ctx.fillText(label, 72, y);
    ctx.fillStyle = "#c3cedd";
    roundRect(ctx, w - 72 - barW, y - 11, barW, 22, 11);
    ctx.fill();
    y += 78;
  }

  // Highlighted row
  const hy = y - 10;
  ctx.fillStyle = "rgba(74, 222, 128, 0.18)";
  roundRect(ctx, 52, hy - 44, w - 104, 92, 18);
  ctx.fill();
  ctx.strokeStyle = "rgba(22, 163, 74, 0.9)";
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.fillStyle = "#0b1a33";
  ctx.font = `700 32px ${FONT}`;
  ctx.fillText("Creditor negotiation", 84, hy);
  ctx.fillStyle = "#0e2445";
  roundRect(ctx, w - 84 - 190, hy - 14, 190, 28, 14);
  ctx.fill();

  // Footer paragraph lines
  ctx.fillStyle = "#d0d9e6";
  let fy = hy + 120;
  for (const lw of [860, 820, 880, 640]) {
    roundRect(ctx, 72, fy, lw, 16, 8);
    ctx.fill();
    fy += 40;
  }
  ctx.fillStyle = "#137a3d";
  roundRect(ctx, 72, fy + 30, 220, 20, 10);
  ctx.fill();

  return finish(canvas);
}

/** A back-sheet texture: faint ruled lines. */
export function createSheetTexture(tint = "#dfe7f3") {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 672;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = tint;
  ctx.fillRect(0, 0, 512, 672);
  ctx.fillStyle = "rgba(11, 26, 51, 0.12)";
  for (let i = 0; i < 12; i++) {
    roundRect(ctx, 40, 70 + i * 46, i % 3 === 2 ? 280 : 430, 12, 6);
    ctx.fill();
  }
  return finish(canvas);
}

/** Small metadata panel: check indicator + label. */
export function createChipTexture(label: string) {
  const w = 560;
  const h = 150;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, w, h);

  const g = ctx.createLinearGradient(0, 0, w, h);
  g.addColorStop(0, "rgba(18, 60, 70, 0.92)");
  g.addColorStop(1, "rgba(8, 23, 49, 0.92)");
  ctx.fillStyle = g;
  roundRect(ctx, 4, 4, w - 8, h - 8, 30);
  ctx.fill();
  ctx.strokeStyle = "rgba(134, 239, 172, 0.55)";
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillStyle = "#4ade80";
  ctx.beginPath();
  ctx.arc(76, h / 2, 28, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#081731";
  ctx.lineWidth = 7;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  ctx.moveTo(63, h / 2 + 1);
  ctx.lineTo(72, h / 2 + 10);
  ctx.lineTo(90, h / 2 - 10);
  ctx.stroke();

  ctx.fillStyle = "#ffffff";
  ctx.font = `600 44px ${FONT}`;
  ctx.textBaseline = "middle";
  ctx.fillText(label, 128, h / 2 + 2);
  return finish(canvas);
}

export function createDotTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.35, "rgba(255,255,255,0.8)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(canvas);
}

export function createShadowTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  g.addColorStop(0, "rgba(0,0,0,0.55)");
  g.addColorStop(0.6, "rgba(0,0,0,0.18)");
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 256);
  return new THREE.CanvasTexture(canvas);
}
