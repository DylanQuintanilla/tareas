"use client";
import React, { useEffect } from "react";
import RegisterFormulario from "@/components/RegisterFormulario";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/Context/AuthContext";

const Register = () => {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      router.replace("/dashboard");
    }
  }, [user, router]);

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div>
        <RegisterFormulario onSuccess={() => router.push("/auth/login")} />
        <p>
          ¿Ya tienes una cuenta?{" "}
          <Link href="/auth/login">Inicia sesión aquí</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
