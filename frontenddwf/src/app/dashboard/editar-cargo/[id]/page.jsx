"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import CargoFormulario from "@/components/CargoFormulario";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getCargoById, updateCargo } from "@/service/CargosServices";

const EditarCargo = () => {
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

  const handleSave = () => {
    router.push("/dashboard/listado-cargos");
  };

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
        <h2>Editar Cargo</h2>
        {cargo && (
          <CargoFormulario cargoInicial={cargo} onSave={handleSave} modo="editar" />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default EditarCargo;
