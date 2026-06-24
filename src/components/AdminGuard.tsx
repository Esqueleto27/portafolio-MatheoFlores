"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { getSession } from "@/lib/auth";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const redirected = useRef(false);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        setAuthorized(true);
      } else if (!redirected.current) {
        redirected.current = true;
        router.replace("/login");
      }
    });
  }, [router]);

  if (!authorized) return null;

  return <>{children}</>;
}
