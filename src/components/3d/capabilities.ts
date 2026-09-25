export type Quality = "high" | "medium";

export type SceneMode = { kind: "static" } | { kind: "3d"; quality: Quality; reducedMotion: boolean };

/**
 * Returns "hardware" when GPU-accelerated WebGL is available, "software" when WebGL
 * is emulated on the CPU (common on older PCs and virtual machines — rendering there
 * would make the page sluggish), or "none".
 */
export function webGLSupport(): "hardware" | "software" | "none" {
  try {
    const canvas = document.createElement("canvas");
    const gl = (canvas.getContext("webgl2") || canvas.getContext("webgl")) as WebGLRenderingContext | null;
    if (!gl) return "none";
    const info = gl.getExtension("WEBGL_debug_renderer_info");
    const renderer = info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : "";
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return /swiftshader|llvmpipe|softpipe|software|basic render/i.test(renderer) ? "software" : "hardware";
  } catch {
    return "none";
  }
}

/** Decide how much 3D the current device should receive. */
export function detectSceneMode(): SceneMode {
  const width = window.innerWidth;
  const nav = navigator as Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number };
  const saveData = nav.connection?.saveData === true;
  const lowMemory = typeof nav.deviceMemory === "number" && nav.deviceMemory < 4;
  const coarse = window.matchMedia("(pointer: coarse)").matches;

  // Phones (and data-saver / low-memory devices) get the static illustration.
  // `?force3d` lets QA preview the scene on machines without a GPU.
  const forced = new URLSearchParams(window.location.search).has("force3d");
  if (!forced && (width < 768 || saveData || lowMemory || webGLSupport() !== "hardware")) return { kind: "static" };

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const quality: Quality = width >= 1200 && !coarse ? "high" : "medium";
  return { kind: "3d", quality, reducedMotion };
}
