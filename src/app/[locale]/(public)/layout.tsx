import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { RevealObserver } from "@/components/RevealObserver";
import { CursorGlow } from "@/components/CursorGlow";
import { PageEffects } from "@/components/PageEffects";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PageEffects />
      <Navbar />
      <main style={{ flex: 1, paddingTop: "104px" }}>{children}</main>
      <Footer />
      <RevealObserver />
      <CursorGlow />
    </>
  );
}
