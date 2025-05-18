"use client";
import React, { useEffect } from "react";
import LoginFormulario from "@/components/LoginFormulario";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/Context/AuthContext";
import "@/styles/auth-form.css";

const Login = () => {
  const router = useRouter();
  const { user } = useAuth();

  // Redirige si ya está logueado
  if (user) {
    router.replace("/dashboard");
    return null;
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f4f6fb" }}>
      <div className="auth-form-container">
        <LoginFormulario onSuccess={() => router.push("/dashboard")} />
        <p>
          ¿No tienes una cuenta?{" "}
          <Link href="/auth/register">Regístrate aquí</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
