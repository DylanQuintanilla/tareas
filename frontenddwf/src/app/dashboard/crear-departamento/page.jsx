"use client";
import React from "react";
import DepartamentoFormulario from "@/components/DepartamentoFormulario";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";

const CrearDepartamento = () => {
  const router = useRouter();

  const handleSave = () => {
    router.push("/dashboard/listado-departamentos");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <main className="container my-5">
        <h2>Crear Nuevo Departamento</h2>
        <DepartamentoFormulario onSave={handleSave} />
      </main>
      <Footer />
    </div>
  );
};

export default CrearDepartamento;
