import type { Metadata } from "next";

// The login page itself is a client component and can't export metadata —
// this pass-through layout keeps the route out of search results.
export const metadata: Metadata = {
  title: "Login",
  robots: { index: false, follow: false },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
