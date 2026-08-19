import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/* The share card for link previews (LinkedIn, iMessage, Slack, X).
   Built at request time from the site's own font and palette. */

export const alt = "Nupur Aggarwal — Product Designer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* The brand ramp shared with the button glow border and the particle words. */
const GRADIENT = ["#ffd21f", "#f0964e", "#9b83e8", "#6fa8e8", "#b8d94e"];

export default async function OpenGraphImage() {
  const [bold, regular] = await Promise.all([
    readFile(join(process.cwd(), "public/fonts/Saans-TRIAL-Bold.otf")),
    readFile(join(process.cwd(), "public/fonts/Saans-TRIAL-Regular.otf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "72px 80px",
          background: "#0f0e0c",
          color: "#f5f3ee",
          fontFamily: "Saans",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            fontWeight: 400,
            color: "rgba(245, 243, 238, 0.55)",
            letterSpacing: "0.08em",
          }}
        >
          nupur.works
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 96,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
          >
            Nupur Aggarwal
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 20,
              fontSize: 40,
              fontWeight: 400,
              color: "rgba(245, 243, 238, 0.72)",
            }}
          >
            Product Designer · AI workflows and developer ecosystems
          </div>
        </div>

        <div style={{ display: "flex", gap: 0, height: 12, borderRadius: 6, overflow: "hidden" }}>
          {GRADIENT.map((color) => (
            <div key={color} style={{ display: "flex", flex: 1, background: color }} />
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Saans", data: bold, weight: 700 },
        { name: "Saans", data: regular, weight: 400 },
      ],
    },
  );
}
