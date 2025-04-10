"use client";
import React from "react";
import EmpleadoFormulario from "@/components/EmpleadoFormulario";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CrearEmpleado = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <main className="container my-5">
        <h2 className="form-title">Crear Nuevo Empleado</h2>
        <EmpleadoFormulario />
      </main>
      <Footer />
    </div>
  );
};

export default CrearEmpleado;
