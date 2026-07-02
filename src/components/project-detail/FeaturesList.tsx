import type { Feature, Locale } from "@/lib/mock-data";

export function FeaturesList({
  features,
  title,
  locale,
  transitionDelay,
}: {
  features?: Feature[];
  title: string;
  locale: Locale;
  transitionDelay: number;
}) {
  if (!features || features.length === 0) return null;

  return (
    <div data-reveal style={{ marginBottom: "48px", transitionDelay: `${transitionDelay}s` }}>
      <h2
        style={{
          fontSize: "clamp(18px, 2vw, 22px)",
          fontWeight: 600,
          letterSpacing: "-0.02em",
          color: "var(--accent)",
          marginBottom: "20px",
        }}
      >
        {title}
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "20px" }}>
        {features.map((feature, i) => (
          <div key={i}>
            <p
              style={{
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "var(--muted)",
                fontFamily: "var(--font-geist-mono)",
                marginBottom: "6px",
              }}
            >
              {locale === "en" ? feature.title_en : feature.title_es}
            </p>
            <p style={{ fontSize: "15px", color: "var(--soft)", lineHeight: 1.6, margin: 0 }}>
              {locale === "en" ? feature.benefit_en : feature.benefit_es}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
