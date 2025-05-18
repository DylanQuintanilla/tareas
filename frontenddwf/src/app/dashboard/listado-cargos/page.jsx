"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getCargos } from "@/service/CargosServices";

const ListadoCargos = () => {
  const [cargos, setCargos] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCargos = async () => {
      setIsLoading(true);
      try {
        const data = await getCargos();
        setCargos(data);
      } catch (err) {
        setError(err.message || "Error al obtener la lista de cargos.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCargos();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <main className="container my-5">
        <h2>Listado de Cargos</h2>
        {isLoading ? (
          <p>Cargando cargos...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          <ul>
            {cargos.map((cargo) => (
              <li key={cargo.idCargo || cargo.id}>{cargo.cargo}</li>
            ))}
          </ul>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ListadoCargos;
