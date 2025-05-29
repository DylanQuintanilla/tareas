"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EmpleadoCard from "@/components/EmpleadoCard";
import { getEmpleados } from "@/service/EmpleadoService";
import { useAuth } from "@/app/Context/AuthContext";
import { jwtDecode } from "jwt-decode";

const ListadoEmpleados = () => {
  const [empleados, setEmpleados] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth(); // <-- Agregado

  let isAdmin = false;
  try {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token); // Usa jwtDecode (named export)
      const roles = decoded?.roles || [];
      isAdmin = Array.isArray(roles)
        ? roles.includes("ROLE_ADMIN")
        : roles === "ROLE_ADMIN";
    }
  } catch (e) {
    isAdmin = false;
  }

  useEffect(() => {
    const fetchEmpleados = async () => {
      setIsLoading(true);
      try {
        const data = await getEmpleados(); // Use getEmpleados here
        console.log("Empleados obtenidos:", data); // Debugging: Log the fetched data
        setEmpleados(data);
      } catch (err) {
        console.error("Error fetching empleados:", err.message); // Debugging: Log the error
        setError(err.message || "Error al obtener la lista de empleados.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmpleados();
  }, []);

  const handleDelete = (id) => {
    setEmpleados((prevEmpleados) =>
      prevEmpleados.filter(
        (empleado) => (empleado.id || empleado.idEmpleado) !== id
      )
    );
  };

  if (isLoading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Header />
        <div className="container">
          <h2>Cargando empleados...</h2>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Header />
        <div className="container">
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
        <h2 className="text-2xl font-bold text-indigo-700 mb-6">Listado de Empleados</h2>
        <div className="flex flex-wrap gap-6 justify-center">
          {empleados.length > 0 ? (
            empleados.map((empleado) => (
              <EmpleadoCard
                key={empleado.idEmpleado || empleado.id}
                empleado={{
                  ...empleado,
                  id: empleado.id || empleado.idEmpleado
                }}
                onDelete={handleDelete}
                canDelete={isAdmin}
                cardClassName="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 min-w-[260px] max-w-xs flex flex-col items-center"
                // Puedes usar cardClassName en tu EmpleadoCard para aplicar estos estilos
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
