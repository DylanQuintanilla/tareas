"use client";
import React, { useState } from "react";
import ContratacionFormulario from "@/components/ContratacionFormulario";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";

const CrearContratacion = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSave = () => {
    router.push("/dashboard/listado-contrataciones");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <main className="container my-5">
        <h2 className="form-title">Crear Nueva Contratación</h2>
        {error && <p className="error">{error}</p>}
        <ContratacionFormulario onSave={handleSave} isLoading={isLoading} />
      </main>
      <Footer />
    </div>
  );
};

export default CrearContratacion;
