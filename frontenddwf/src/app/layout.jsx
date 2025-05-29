"use client";
import React, { useEffect } from "react";
import { AuthProvider, useAuth } from "@/app/Context/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import './globals.css';

// Este componente envuelve la protección de rutas para la raíz
function ProtectedRoot({ children }) {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Si no está autenticado y no está en /auth/login o /auth/register, redirige a login
    if (
      !user &&
      pathname !== "/auth/login" &&
      pathname !== "/auth/register"
    ) {
      router.replace("/auth/login");
    }
  }, [user, router, pathname]);

  return <>{children}</>;
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        {/* CDN de Tailwind CSS Browser para soporte CDN */}
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
      </head>
      <body>
        <AuthProvider>
          <ProtectedRoot>
            {children}
          </ProtectedRoot>
        </AuthProvider>
      </body>
    </html>
  );
}