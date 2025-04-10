"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const router = useRouter();

  // Redirige automáticamente a la página pública (paginaPrincipal) al iniciar la app.
  useEffect(() => {
    router.push("/paginaPrincipal");
  }, [router]);

  return (
    <div>
      <h1>Cargando...</h1>
    </div>
  );
}
