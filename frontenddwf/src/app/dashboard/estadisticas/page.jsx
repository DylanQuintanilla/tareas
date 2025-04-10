"use client";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Estadisticas = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <main className="container my-5">
        <h2>Estadísticas</h2>
        <p>Esta sección mostrará estadísticas relevantes sobre los empleados.</p>
        {/* Aquí puedes agregar gráficos o tablas con estadísticas */}
      </main>
      <Footer />
    </div>
  );
};

export default Estadisticas;
