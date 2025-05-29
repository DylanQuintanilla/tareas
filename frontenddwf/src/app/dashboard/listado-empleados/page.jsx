"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EmpleadoCard from "@/components/EmpleadoCard";
import { getEmpleados } from "@/service/EmpleadoService";
import { useAuth } from "@/app/Context/AuthContext";
import { jwtDecode } from "jwt-decode";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

const ListadoEmpleados = () => {
  const [empleados, setEmpleados] = useState([]);
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
    const fetchEmpleados = async () => {
      setIsLoading(true);
      try {
        const data = await getEmpleados();
        setEmpleados(data);
      } catch (err) {
        console.error("Error fetching empleados:", err);
        setError(err.message || "Error al obtener la lista de empleados.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchEmpleados();
  }, []);

  const handleDelete = (id) => {
    setEmpleados((prev) =>
      prev.filter((emp) => (emp.id || emp.idEmpleado) !== id)
    );
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="container my-5">
          <h2>Cargando empleados...</h2>
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
      <ConfirmDialog />
      <main className="container my-5">
        <h2 className="text-2xl font-bold text-indigo-700 mb-6">
          Listado de Empleados
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {empleados.length > 0 ? (
            empleados.map((empleado) => (
              <EmpleadoCard
                key={empleado.idEmpleado || empleado.id}
                empleado={empleado}
                onDelete={handleDelete}
                canDelete={isAdmin}
                showConfirmDialog={confirmDialog}
              />
            ))
          ) : (
            <p>No hay empleados registrados.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ListadoEmpleados;
