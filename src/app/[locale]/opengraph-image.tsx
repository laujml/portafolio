import { ImageResponse } from "next/og";

export const alt = "Lau";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const title = locale === "es" ? "Hola, soy Lau" : "Hi, I'm Lau";
  const subtitle =
    locale === "es"
      ? "Desarrolladora full-stack y estudiante de ingeniería de software en El Salvador."
      : "Full-stack developer and software engineering student from El Salvador.";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#FFF9F0",
          color: "#2B1B17",
          padding: 72,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 680 }}>
          <div style={{ fontSize: 84, fontWeight: 700 }}>{title}</div>
          <div style={{ marginTop: 24, fontSize: 32, lineHeight: 1.3 }}>{subtitle}</div>
        </div>
        <div
          style={{
            width: 280,
            height: 360,
            borderRadius: "180px 180px 36px 36px",
            background: "#F4B8C6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 96,
            fontWeight: 700,
          }}
        >
          L
        </div>
      </div>
    ),
    { ...size },
  );
}
