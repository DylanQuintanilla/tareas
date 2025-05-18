"use client";
import React from "react";
import RegisterFormulario from "@/components/RegisterFormulario";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/Context/AuthContext";

const Register = () => {
  const router = useRouter();
  const { user } = useAuth();

  if (user) {
    router.replace("/dashboard");
    return null;
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div>
        <RegisterFormulario onSuccess={() => router.push("/Auth/Login")} />
        <p>
          ¿Ya tienes una cuenta?{" "}
          <Link href="/Auth/Login">Inicia sesión aquí</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
