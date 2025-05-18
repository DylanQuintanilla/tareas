"use client";
import { useAuth } from "@/app/Context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({ children }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/auth/login"); // <-- usa minúsculas aquí
    }
  }, [user, router]);

  if (!user) return null; // No renderiza nada hasta que se resuelva la autenticación

  return <>{children}</>;
}
