"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContratacionCard from "@/components/ContratacionCard";
import { getContrataciones } from "@/service/ContratacioneService";

const ListadoContrataciones = () => {
  const [contrataciones, setContrataciones] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchContrataciones = async () => {
      setIsLoading(true);
      try {
        const data = await getContrataciones();
        console.log("Contrataciones obtenidas:", data); // Debugging: Log the fetched data
        setContrataciones(data);
      } catch (err) {
        console.error("Error fetching contrataciones:", err.message); // Debugging: Log the error
        setError(err.message || "Error al obtener la lista de contrataciones.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchContrataciones();
  }, []);

  const handleDelete = (id) => {
    setContrataciones((prevContrataciones) => prevContrataciones.filter((contratacion) => contratacion.id !== id));
  };

  if (isLoading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Header />
        <div className="container">
          <h2>Cargando contrataciones...</h2>
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
        <h2>Listado de Contrataciones</h2>
        <div className="card-container">
          {contrataciones.length > 0 ? (
            contrataciones.map((contratacion) => (
              <ContratacionCard
                key={contratacion.id}
                contratacion={contratacion}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <p>No hay contrataciones registradas.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ListadoContrataciones;
