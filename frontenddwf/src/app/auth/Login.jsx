"use client";
import React from "react";
import LoginFormulario from "@/components/LoginFormulario";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/Context/AuthContext";

const Login = () => {
  const router = useRouter();
  const { user } = useAuth();

  if (user) {
    router.replace("/dashboard");
    return null;
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div>
        <LoginFormulario onSuccess={() => router.push("/dashboard")} />
        <p>
          ¿No tienes una cuenta?{" "}
          <Link href="/Auth/Register">Regístrate aquí</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
