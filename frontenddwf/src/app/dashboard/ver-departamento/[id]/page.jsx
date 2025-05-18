"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getDepartamentoById } from "@/service/DepartamentoService";

const VerDepartamento = () => {
  const params = useParams();
  const id = params?.id;

  const [departamento, setDepartamento] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDepartamento = async () => {
      if (!id) {
        setError("ID de departamento no proporcionado.");
        return;
      }
      setIsLoading(true);
      try {
        const data = await getDepartamentoById(id);
        if (data) {
          setDepartamento(data);
          setError("");
        } else {
          setError("Departamento no encontrado.");
        }
      } catch (err) {
        setError(err.message || "Error al obtener el departamento.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchDepartamento();
  }, [id]);

  if (isLoading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Header />
        <div className="container my-5">
          <h2>Cargando departamento...</h2>
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
        <h2>Detalle del Departamento</h2>
        {departamento && (
          <div className="card">
            <h3>{departamento.nombreDepartamento}</h3>
            <p><strong>ID:</strong> {departamento.idDepartamento || departamento.id}</p>
            <p><strong>Descripción:</strong> {departamento.descripcionDepartamento}</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default VerDepartamento;
