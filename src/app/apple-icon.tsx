import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#0b57d0" }}>
        <svg width="120" height="120" viewBox="0 0 40 40">
          <path d="M13 9.5h9.5l5.5 5.5v14a2 2 0 0 1-2 2H13a2 2 0 0 1-2-2v-17.5a2 2 0 0 1 2-2z" fill="#fff" />
          <path d="M15 18.5h7M15 22h5" stroke="#9fb3d1" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="26" cy="26.5" r="6" fill="#081731" />
          <path d="m23.4 26.6 1.8 1.8 3.4-3.6" fill="none" stroke="#7dd3fc" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    ),
    size,
  );
}
