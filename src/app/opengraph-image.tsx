import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = site.name + " — Web, Linux & Cloud";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ display: "flex", width: "100%", height: "100%", flexDirection: "column", justifyContent: "center", background: "#0f0f11", color: "#f4f4f6", padding: "80px", borderLeft: "16px solid #e50914" }}>
      <div style={{ display: "flex", fontSize: 28, color: "#ff7770", marginBottom: 36 }}>RVILLE.DEV / PORTFOLIO</div>
      <div style={{ display: "flex", fontSize: 64, fontWeight: 700, lineHeight: 1.1 }}>Orville Giovanni</div>
      <div style={{ display: "flex", fontSize: 64, fontWeight: 700, lineHeight: 1.1 }}>Sambono</div>
      <div style={{ display: "flex", fontSize: 30, marginTop: 36, color: "#e1e2e5" }}>Software Engineer · Web · Linux · Cloud</div>
    </div>,
    size,
  );
}
