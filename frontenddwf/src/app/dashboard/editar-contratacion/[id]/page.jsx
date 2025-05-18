"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ContratacionFormulario from "@/components/ContratacionFormulario";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getContratacionById } from "@/service/ContratacioneService";

const EditarContratacion = () => {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();

  const [contratacion, setContratacion] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchContratacion = async () => {
      if (!id) {
        setError("ID de contratación no proporcionado.");
        return;
      }
      setIsLoading(true);
      try {
        const data = await getContratacionById(id);
        if (data) {
          setContratacion(data);
          setError("");
        } else {
          setError("Contratación no encontrada.");
        }
      } catch (err) {
        setError(err.message || "Error al obtener la contratación.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchContratacion();
  }, [id]);

  const handleSave = () => {
    router.push("/dashboard/listado-contrataciones");
  };

  if (isLoading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Header />
        <div className="container my-5">
          <h2>Cargando contratación...</h2>
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
        <h2>Editar Contratación</h2>
        {contratacion && (
          <ContratacionFormulario
            contratacionInicial={contratacion}
            onSave={handleSave}
            modo="editar"
            isLoading={isLoading}
          />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default EditarContratacion;
