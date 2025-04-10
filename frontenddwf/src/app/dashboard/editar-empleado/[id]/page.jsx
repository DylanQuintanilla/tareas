"use client";
import React, { useEffect, useState } from "react";
import EmpleadoFormulario from "@/components/EmpleadoFormulario";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useParams } from "next/navigation";
import { getEmpleadoById } from "@/service/EmpleadoService";

const EditarEmpleado = () => {
  const { id } = useParams(); // Extract the employee ID from the URL
  const [empleado, setEmpleado] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchEmpleado = async () => {
      if (!id) {
        setError("ID del empleado no proporcionado.");
        return;
      }

      setIsLoading(true);
      try {
        const data = await getEmpleadoById(id);
        if (data) {
          setEmpleado(data);
        } else {
          setError("No se encontró el empleado.");
        }
      } catch (err) {
        setError(err.message || "Error al obtener los datos del empleado.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmpleado();
  }, [id]);

  if (isLoading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Header />
        <main className="container my-5">
          <h2>Cargando empleado...</h2>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Header />
        <main className="container my-5">
          <h2>Error: {error}</h2>
        </main>
        <Footer />
      </div>
    );
  }

  if (!empleado) {
    return (
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Header />
        <main className="container my-5">
          <h2>No se encontró el empleado</h2>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <main className="container my-5">
        <h2 className="form-title">Editar Empleado</h2>
        <EmpleadoFormulario empleadoInicial={empleado} />
      </main>
      <Footer />
    </div>
  );
};

export default EditarEmpleado;
