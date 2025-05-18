"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getCargoById } from "@/service/CargosServices";

const VerCargo = () => {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();

  const [cargo, setCargo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCargo = async () => {
      if (!id) {
        setError("ID de cargo no proporcionado.");
        return;
      }
      setIsLoading(true);
      try {
        const data = await getCargoById(id);
        if (data) {
          setCargo(data);
          setError("");
        } else {
          setError("Cargo no encontrado.");
        }
      } catch (err) {
        setError(err.message || "Error al obtener el cargo.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCargo();
  }, [id]);

  if (isLoading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Header />
        <div className="container my-5">
          <h2>Cargando cargo...</h2>
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
        <h2>Detalle del Cargo</h2>
        {cargo && (
          <div className="card">
            <h3>{cargo.cargo}</h3>
            <p><strong>ID:</strong> {cargo.idCargo || cargo.id}</p>
            <p><strong>Descripción:</strong> {cargo.descripcionCargo}</p>
            <p><strong>Jefatura:</strong> {cargo.jefatura ? "Sí" : "No"}</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default VerCargo;
