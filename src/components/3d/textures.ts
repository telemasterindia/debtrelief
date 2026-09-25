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
  ctx.fillStyle = "#378108";
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

  ctx.fillStyle = "#222222";
  ctx.font = `700 64px ${FONT}`;
  ctx.textBaseline = "middle";
  ctx.fillText("Your Custom Plan", 164, 100);
  ctx.fillStyle = "#3f4d64";
  ctx.font = `500 36px ${FONT}`;
  ctx.fillText("Greenlight Debt Relief", 164, 150);

  ctx.fillStyle = "#d5dde9";
  ctx.fillRect(72, 206, w - 144, 3);

  // Debts in the plan (values are abstract bars — never real data)
  const rows: [string, number][] = [
    ["Credit card", 230],
    ["Credit card", 190],
    ["Medical bill", 160],
  ];
  let y = 300;
  for (const [label, barW] of rows) {
    ctx.fillStyle = "#22304a";
    ctx.font = `500 52px ${FONT}`;
    ctx.fillText(label, 72, y);
    ctx.fillStyle = "#c3cedd";
    roundRect(ctx, w - 72 - barW, y - 15, barW, 30, 15);
    ctx.fill();
    y += 120;
  }

  // Highlighted row: the affordable monthly amount
  const hy = y + 10;
  ctx.fillStyle = "rgba(55, 129, 8, 0.12)";
  roundRect(ctx, 52, hy - 64, w - 104, 128, 24);
  ctx.fill();
  ctx.strokeStyle = "rgba(55, 129, 8, 0.85)";
  ctx.lineWidth = 4;
  ctx.stroke();
  ctx.fillStyle = "#222222";
  ctx.font = `700 54px ${FONT}`;
  ctx.fillText("Monthly amount", 88, hy);
  ctx.fillStyle = "#378108";
  roundRect(ctx, w - 88 - 200, hy - 16, 200, 32, 16);
  ctx.fill();

  // Progress bar
  const py = hy + 170;
  ctx.fillStyle = "#3f4d64";
  ctx.font = `600 46px ${FONT}`;
  ctx.fillText("Plan progress", 72, py);
  ctx.fillStyle = "#dfe6ef";
  roundRect(ctx, 72, py + 50, w - 144, 32, 16);
  ctx.fill();
  const bar = ctx.createLinearGradient(72, 0, w - 72, 0);
  bar.addColorStop(0, "#1d5505");
  bar.addColorStop(1, "#4a9a1a");
  ctx.fillStyle = bar;
  roundRect(ctx, 72, py + 50, (w - 144) * 0.45, 32, 16);
  ctx.fill();

  // Fine-print lines
  ctx.fillStyle = "#d6dee9";
  let fy = py + 170;
  for (const lw of [860, 800, 870, 560]) {
    roundRect(ctx, 72, fy, lw, 18, 9);
    ctx.fill();
    fy += 46;
  }

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
  g.addColorStop(0, "rgba(44, 53, 46, 0.94)");
  g.addColorStop(1, "rgba(20, 25, 21, 0.94)");
  ctx.fillStyle = g;
  roundRect(ctx, 4, 4, w - 8, h - 8, 30);
  ctx.fill();
  ctx.strokeStyle = "rgba(140, 200, 97, 0.5)";
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillStyle = "#8cc861";
  ctx.beginPath();
  ctx.arc(76, h / 2, 28, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#151a16";
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

/** A generic credit card face (decorative — no real names or numbers). */
export function createCardTexture(variant: "charcoal" | "green") {
  const w = 1012;
  const h = 638;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createLinearGradient(0, 0, w, h);
  if (variant === "charcoal") {
    g.addColorStop(0, "#3a433c");
    g.addColorStop(1, "#151a16");
  } else {
    g.addColorStop(0, "#4a9a1a");
    g.addColorStop(1, "#1d5505");
  }
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);

  // Soft light sweep
  const sweep = ctx.createLinearGradient(0, 0, w, 0);
  sweep.addColorStop(0, "rgba(255,255,255,0)");
  sweep.addColorStop(0.55, "rgba(255,255,255,0.10)");
  sweep.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = sweep;
  ctx.beginPath();
  ctx.moveTo(w * 0.35, 0);
  ctx.lineTo(w * 0.75, 0);
  ctx.lineTo(w * 0.5, h);
  ctx.lineTo(w * 0.1, h);
  ctx.fill();

  // EMV chip
  const chip = ctx.createLinearGradient(90, 220, 230, 330);
  chip.addColorStop(0, "#f4e3a1");
  chip.addColorStop(1, "#c9a74a");
  ctx.fillStyle = chip;
  roundRect(ctx, 90, 220, 140, 108, 18);
  ctx.fill();
  ctx.strokeStyle = "rgba(90,70,20,0.45)";
  ctx.lineWidth = 3;
  for (const y of [256, 292]) {
    ctx.beginPath();
    ctx.moveTo(90, y);
    ctx.lineTo(230, y);
    ctx.stroke();
  }

  // Number placeholder dots
  ctx.fillStyle = "rgba(255,255,255,0.85)";
  for (let group = 0; group < 4; group++) {
    for (let i = 0; i < 4; i++) {
      ctx.beginPath();
      ctx.arc(100 + group * 205 + i * 36, 450, 11, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.fillStyle = "rgba(255,255,255,0.55)";
  roundRect(ctx, 90, 520, 300, 24, 12);
  ctx.fill();

  // Network-style circles (generic)
  ctx.globalAlpha = 0.85;
  ctx.fillStyle = "rgba(255,255,255,0.55)";
  ctx.beginPath();
  ctx.arc(w - 190, 110, 52, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,0.3)";
  ctx.beginPath();
  ctx.arc(w - 125, 110, 52, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;
  return finish(canvas);
}
