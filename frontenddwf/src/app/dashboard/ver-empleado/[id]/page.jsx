"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useParams } from "next/navigation";
import { getEmpleadoById } from "@/service/EmpleadoService";

const VerEmpleado = () => {
  const { id } = useParams(); // Extract the employee ID from the URL
  const [empleado, setEmpleado] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchEmpleado = async () => {
      if (!id) {
        setError("ID del empleado no proporcionado.");
        console.error("ID del empleado no proporcionado."); // Debugging: Log missing ID
        return;
      }

      setIsLoading(true);
      try {
        console.log(`Fetching empleado with ID: ${id}`); // Debugging: Log the ID
        const data = await getEmpleadoById(id);
        if (data) {
          setEmpleado(data);
        } else {
          setError("No se encontró el empleado.");
        }
      } catch (err) {
        console.error("Error fetching empleado:", err.message); // Debugging: Log the error
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
        <h2 className="form-title">Detalles del Empleado</h2>
        <p><strong>Nombre:</strong> {empleado.nombrePersona}</p>
        <p><strong>Usuario:</strong> {empleado.usuario}</p>
        <p><strong>DUI:</strong> {empleado.numeroDUI}</p>
        <p><strong>Teléfono:</strong> {empleado.numeroTelefono}</p>
        <p><strong>Correo:</strong> {empleado.correoInstitucional}</p>
        <p><strong>Fecha de Nacimiento:</strong> {empleado.fechaNacimiento}</p>
      </main>
      <Footer />
    </div>
  );
};

export default VerEmpleado;
