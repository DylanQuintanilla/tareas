"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DepartamentoCard from "@/components/DepartamentoCard";
import { getDepartamentos, deleteDepartamento } from "@/service/DepartamentoService";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/Context/AuthContext";
import { jwtDecode } from "jwt-decode";

const ListadoDepartamentos = () => {
  const [departamentos, setDepartamentos] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

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
    const fetchDepartamentos = async () => {
      setIsLoading(true);
      try {
        const data = await getDepartamentos();
        setDepartamentos(data);
      } catch (err) {
        setError(err.message || "Error al obtener departamentos.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchDepartamentos();
  }, []);

  const handleDelete = async (id) => {
    try {
      const ok = await deleteDepartamento(id);
      if (ok) setDepartamentos(prev => prev.filter(d => (d.id || d.idDepartamento) !== id));
    } catch {
      // maneja error si deseas
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="container my-5">
          <h2>Cargando departamentos...</h2>
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
        <h2 className="text-2xl font-bold text-indigo-700 mb-6">
          Listado de Departamentos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {departamentos.length > 0 ? (
            departamentos.map(dep => (
              <DepartamentoCard
                key={dep.idDepartamento || dep.id}
                departamento={dep}
                onDelete={handleDelete}
                canDelete={isAdmin}
              />
            ))
          ) : (
            <p>No hay departamentos registrados.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ListadoDepartamentos;