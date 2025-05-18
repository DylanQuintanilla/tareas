"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import TipoContratacionFormulario from "@/components/TipoContratacionFormulario";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getTipoContratacionById, updateTipoContratacion } from "@/service/TipoContratacion";

const EditarTipoContratacion = () => {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();

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

  const handleSave = () => {
    router.push("/dashboard/listado-tipos-contratacion");
  };

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
        <h2>Editar Tipo de Contratación</h2>
        {tipo && (
          <TipoContratacionFormulario
            tipoContratacionInicial={tipo}
            onSave={handleSave}
            modo="editar"
          />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default EditarTipoContratacion;
