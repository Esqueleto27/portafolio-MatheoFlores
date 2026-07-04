import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const role =
    locale === "en"
      ? "Full-Stack Developer — Websites that help businesses sell"
      : "Full-Stack Developer — Webs que ayudan a vender";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#070708",
          backgroundImage:
            "radial-gradient(circle at 78% 30%, rgba(37,99,235,0.35), transparent 60%), radial-gradient(circle at 10% 90%, rgba(91,140,255,0.2), transparent 55%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "16px",
              height: "16px",
              borderRadius: "50%",
              background: "#2563eb",
            }}
          />
          <span
            style={{
              fontSize: "28px",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#d6dbe6",
            }}
          >
            Matheo Flores
          </span>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: "72px",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: "#ffffff",
            lineHeight: 1.05,
            maxWidth: "980px",
          }}
        >
          {role.split(" — ")[0]}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: "36px",
            fontWeight: 500,
            color: "#8a8f9c",
            marginTop: "20px",
            maxWidth: "900px",
          }}
        >
          {role.split(" — ")[1]}
        </div>
      </div>
    ),
    { ...size }
  );
}
