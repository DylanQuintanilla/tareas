"use client";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";

// Componente para proteger rutas privadas
export default function ProtectedRoot({ children }) {
  const token = useSelector((state) => state.auth.token);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (
      !token &&
      pathname !== "/auth/login" &&
      pathname !== "/auth/register"
    ) {
      router.replace("/auth/login");
    }
  }, [token, router, pathname]);

  return <>{children}</>;
}
