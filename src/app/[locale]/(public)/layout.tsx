import { getTranslations } from "next-intl/server";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { RevealObserver } from "@/components/RevealObserver";
import { CursorGlow } from "@/components/CursorGlow";
import { PageEffects } from "@/components/PageEffects";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = await getTranslations("nav");

  return (
    <>
      <a href="#main-content" className="skip-link">
        {t("skip_to_content")}
      </a>
      <PageEffects />
      <Navbar />
      <main id="main-content" style={{ flex: 1, paddingTop: "104px" }}>
        {children}
      </main>
      <Footer />
      <RevealObserver />
      <CursorGlow />
    </>
  );
}
