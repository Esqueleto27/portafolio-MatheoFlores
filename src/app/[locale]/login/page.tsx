"use client";

import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { signIn } from "@/lib/auth";

export default function LoginPage() {
  const t = useTranslations("login");
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    const result = await signIn(email, password);
    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.replace("/admin");
    }
  }

  return (
    <section
      style={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px clamp(20px, 6vw, 72px)",
      }}
    >
      <div
        data-reveal
        style={{
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(28px, 3.8vw, 36px)",
            fontWeight: 600,
            letterSpacing: "-0.03em",
            color: "var(--text)",
            textAlign: "center",
            marginBottom: "36px",
          }}
        >
          {t("section_title")}
        </h1>

        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
          onSubmit={handleSubmit}
        >
          <input
            name="email"
            type="email"
            placeholder={t("email")}
            required
            style={{
              width: "100%",
              padding: "14px 16px",
              fontSize: "15px",
              fontFamily: "var(--font-geist-sans)",
              color: "var(--text)",
              background: "var(--fill)",
              border: "1px solid var(--hair)",
              borderRadius: "12px",
              outline: "none",
              boxSizing: "border-box" as const,
            }}
          />
          <input
            name="password"
            type="password"
            placeholder={t("password")}
            required
            style={{
              width: "100%",
              padding: "14px 16px",
              fontSize: "15px",
              fontFamily: "var(--font-geist-sans)",
              color: "var(--text)",
              background: "var(--fill)",
              border: "1px solid var(--hair)",
              borderRadius: "12px",
              outline: "none",
              boxSizing: "border-box" as const,
            }}
          />
          {error && (
            <p style={{ color: "#ef4444", fontSize: "13px", margin: 0 }}>
              {error}
            </p>
          )}
          <Button
            type="submit"
            variant="primary"
            style={{ width: "100%" }}
            disabled={loading}
          >
            {loading ? "..." : t("submit")}
          </Button>
        </form>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Link href="/forgot" className="link-accent" style={{ fontSize: "13px" }}>
            {t("forgot")}
          </Link>
        </div>
      </div>
    </section>
  );
}
