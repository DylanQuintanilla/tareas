"use client";
import React, { useState } from "react";
import CargoFormulario from "@/components/CargoFormulario";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";

const CrearCargo = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSave = () => {
    router.push("/dashboard/listado-cargos");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <main className="container my-5">
        <h2>Crear Nuevo Cargo</h2>
        {error && <p className="error">{error}</p>}
        <CargoFormulario onSave={handleSave} />
      </main>
      <Footer />
    </div>
  );
};

export default CrearCargo;
