"use client";
import React from "react";
import TipoContratacionFormulario from "@/components/TipoContratacionFormulario";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";

const CrearTipoContratacion = () => {
  const router = useRouter();

  const handleSave = () => {
    router.push("/dashboard/listado-tipos-contratacion");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <main className="container my-5">
        <h2>Crear Nuevo Tipo de Contratación</h2>
        <TipoContratacionFormulario onSave={handleSave} />
      </main>
      <Footer />
    </div>
  );
};

export default CrearTipoContratacion;
