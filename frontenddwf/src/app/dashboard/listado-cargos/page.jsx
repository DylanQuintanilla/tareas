"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CargoCard from "@/components/CargoCard";
import { getCargos, deleteCargo } from "@/service/CargosServices";
import { useAuth } from "@/app/Context/AuthContext";
import { jwtDecode } from "jwt-decode";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

const ListadoCargos = () => {
  const [cargos, setCargos] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  // Determinar si es admin
  let isAdmin = false;
  try {
    const token = localStorage.getItem("token");
    if (token) {
      const { roles = [] } = jwtDecode(token);
      isAdmin = Array.isArray(roles)
        ? roles.includes("ROLE_ADMIN")
        : roles === "ROLE_ADMIN";
    }
  } catch {
    isAdmin = false;
  }

  // Carga inicial
  useEffect(() => {
    const fetchCargos = async () => {
      setIsLoading(true);
      try {
        setCargos(await getCargos());
      } catch (err) {
        setError(err.message || "Error al obtener la lista de cargos.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCargos();
  }, []);

  // Sólo aquí se llama a confirmDialog
  const handleDelete = (id) => {
    confirmDialog({
      message: "¿Estás seguro de eliminar este cargo?",
      header: "Confirmación de Eliminación",
      icon: "pi pi-exclamation-triangle",
      acceptClassName: "p-button-danger",
      acceptLabel: "Sí, eliminar",
      rejectLabel: "No, cancelar",
      accept: async () => {
        try {
          const ok = await deleteCargo(id);
          if (ok) {
            setCargos(prev => prev.filter(c => (c.id || c.idCargo) !== id));
          } else {
            alert("No se puede eliminar el cargo porque está siendo usado en una contratación.");
          }
        } catch (err) {
          // Si el backend responde error por restricción de clave foránea, muestra mensaje claro
          alert("No se puede eliminar el cargo porque está siendo usado en una contratación.");
        }
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="container my-5">Cargando cargos...</div>
        <Footer />
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="container my-5 text-red-600">Error: {error}</div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {/* Única instancia del dialog */}
      <ConfirmDialog />

      <main className="container my-5">
        <h2 className="text-2xl font-bold text-indigo-700 mb-6">
          Listado de Cargos
        </h2>
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
