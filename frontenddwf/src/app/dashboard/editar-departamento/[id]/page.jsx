"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import DepartamentoFormulario from "@/components/DepartamentoFormulario";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getDepartamentoById, updateDepartamento } from "@/service/DepartamentoService";

const EditarDepartamento = () => {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();

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

  const handleSave = () => {
    router.push("/dashboard/listado-departamentos");
  };

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
        <h2>Editar Departamento</h2>
        {departamento && (
          <DepartamentoFormulario departamentoInicial={departamento} onSave={handleSave} modo="editar" />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default EditarDepartamento;
