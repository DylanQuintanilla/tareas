"use client";
import React from "react";
import EmpleadoFormulario from "@/components/EmpleadoFormulario";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";

const CrearEmpleado = () => {
  const router = useRouter();

  const handleSave = () => {
    // Redirect to the employee list after saving
    router.push("/dashboard/listado-empleados");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <main className="container my-5">
        <h2 className="form-title">Crear Nuevo Empleado</h2>
        <EmpleadoFormulario onSave={handleSave} />
      </main>
      <Footer />
    </div>
  );
};

export default CrearEmpleado;
