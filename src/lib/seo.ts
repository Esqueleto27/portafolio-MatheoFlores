export const SITE_URL = "https://matheoflores.dev";

// Builds canonical + hreflang alternates for a given locale/path pair.
// `path` is locale-agnostic, e.g. "/", "/about", "/projects/my-slug".
export function buildAlternates(locale: "es" | "en", path: string) {
  const clean = path === "/" ? "" : path;
  return {
    canonical: `${SITE_URL}/${locale}${clean}`,
    languages: {
      es: `${SITE_URL}/es${clean}`,
      en: `${SITE_URL}/en${clean}`,
      "x-default": `${SITE_URL}/es${clean}`,
    },
  };
}
