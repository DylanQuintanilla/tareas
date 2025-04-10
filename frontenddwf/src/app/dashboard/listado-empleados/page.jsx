"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EmpleadoCard from "@/components/EmpleadoCard";
import { getEmpleados } from "@/service/EmpleadoService";

const ListadoEmpleados = () => {
  const [empleados, setEmpleados] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchEmpleados = async () => {
      setIsLoading(true);
      try {
        const data = await getEmpleados();
        console.log("Empleados obtenidos:", data); // Debugging: Log the fetched data
        setEmpleados(data);
      } catch (err) {
        console.error("Error fetching empleados:", err.message); // Debugging: Log the error
        setError(err.message || "Error al obtener la lista de empleados.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmpleados();
  }, []);

  const handleDelete = (id) => {
    setEmpleados((prevEmpleados) => prevEmpleados.filter((empleado) => empleado.id !== id));
  };

  if (isLoading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Header />
        <div className="container">
          <h2>Cargando empleados...</h2>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Header />
        <div className="container">
          <h2>Error: {error}</h2>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <main className="container my-5">
        <h2>Listado de Empleados</h2>
        <div className="card-container">
          {empleados.length > 0 ? (
            empleados.map((empleado) => (
              <EmpleadoCard
                key={empleado.id}
                empleado={empleado}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <p>No hay empleados registrados.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ListadoEmpleados;
