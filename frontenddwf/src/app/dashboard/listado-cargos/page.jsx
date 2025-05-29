// src/app/dashboard/listado-cargos/page.jsx
"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CargoCard from "@/components/CargoCard";
import { getCargos, deleteCargo } from "@/service/CargosServices";
import { useAuth } from "@/app/Context/AuthContext";
import { jwtDecode } from "jwt-decode";

const ListadoCargos = () => {
  const [cargos, setCargos] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  let isAdmin = false;
  try {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      const roles = decoded?.roles || [];
      isAdmin = Array.isArray(roles)
        ? roles.includes("ROLE_ADMIN")
        : roles === "ROLE_ADMIN";
    }
  } catch {
    isAdmin = false;
  }

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

  const handleDelete = async (id) => {
    try {
      const ok = await deleteCargo(id);
      if (ok) {
        setCargos(prev => prev.filter(c => (c.id || c.idCargo) !== id));
      } else {
        alert("Error al eliminar cargo.");
      }
    } catch {
      alert("Error al eliminar cargo.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="container my-5">
          <h2>Cargando cargos...</h2>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="container my-5">
          <h2>Error: {error}</h2>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container my-5">
        <h2 className="text-2xl font-bold text-indigo-700 mb-6">Listado de Cargos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cargos.length > 0 ? (
            cargos.map(cargo => (
              <CargoCard
                key={cargo.idCargo || cargo.id}
                cargo={cargo}
                onDelete={handleDelete}
                canDelete={isAdmin}
              />
            ))
          ) : (
            <p>No hay cargos registrados.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ListadoCargos;
