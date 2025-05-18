"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getTipoContratacionById } from "@/service/TipoContratacion";

const VerTipoContratacion = () => {
  const params = useParams();
  const id = params?.id;

  const [tipo, setTipo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTipo = async () => {
      if (!id) {
        setError("ID de tipo de contratación no proporcionado.");
        return;
      }
      setIsLoading(true);
      try {
        const data = await getTipoContratacionById(id);
        if (data) {
          setTipo(data);
          setError("");
        } else {
          setError("Tipo de contratación no encontrado.");
        }
      } catch (err) {
        setError(err.message || "Error al obtener el tipo de contratación.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchTipo();
  }, [id]);

  if (isLoading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Header />
        <div className="container my-5">
          <h2>Cargando tipo de contratación...</h2>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Header />
        <div className="container my-5">
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
        <h2>Detalle del Tipo de Contratación</h2>
        {tipo && (
          <div className="card">
            <h3>{tipo.tipoContratacion}</h3>
            <p><strong>ID:</strong> {tipo.idTipoContratacion || tipo.id}</p>
            {/* Eliminada la sección de descripción porque no existe en la base de datos */}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default VerTipoContratacion;
