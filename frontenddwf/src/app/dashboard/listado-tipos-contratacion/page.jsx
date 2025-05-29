"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TipoContratacionCard from "@/components/TipoContratacionCard";
import { getTiposContratacion, deleteTipoContratacion } from "@/service/TipoContratacion";
import { useAuth } from "@/app/Context/AuthContext";
import { jwtDecode } from "jwt-decode";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

const ListadoTiposContratacion = () => {
  const [tipos, setTipos] = useState([]);
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
    const fetchTipos = async () => {
      setIsLoading(true);
      try {
        const data = await getTiposContratacion();
        setTipos(data);
      } catch (err) {
        setError(err.message || "Error al obtener los tipos de contratación.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchTipos();
  }, []);

  const handleDelete = async (id) => {
    try {
      const ok = await deleteTipoContratacion(id);
      if (ok) {
        setTipos((prev) => prev.filter((t) => (t.id || t.idTipoContratacion) !== id));
      } else {
        alert("Error al eliminar tipo de contratación.");
      }
    } catch {
      alert("Error al eliminar tipo de contratación.");
    }
  };

  // Carga inicial
  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="container my-5">
          <h2>Cargando tipos de contratación...</h2>
        </div>
        <Footer />
      </div>
    );
  }

  // Error
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

  // Renderizado final
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <ConfirmDialog />
      <main className="container my-5">
        <h2 className="text-2xl font-bold text-indigo-700 mb-6">
          Listado de Tipos de Contratación
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tipos.length > 0 ? (
            tipos.map((tipo) => (
              <TipoContratacionCard
                key={tipo.idTipoContratacion || tipo.id}
                tipo={tipo}
                onDelete={handleDelete}
                canDelete={isAdmin}
                showConfirmDialog={confirmDialog}
              />
            ))
          ) : (
            <p>No hay tipos registrados.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ListadoTiposContratacion;
