"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getTiposContratacion, deleteTipoContratacion } from "@/service/TipoContratacion";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/Context/AuthContext";
import { jwtDecode } from "jwt-decode";

const ListadoTiposContratacion = () => {
  const [tipos, setTipos] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

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
    if (!id) return;
    if (confirm("¿Estás seguro de eliminar este tipo de contratación?")) {
      try {
        const ok = await deleteTipoContratacion(id);
        if (ok) {
          setTipos((prev) => prev.filter((t) => (t.id || t.idTipoContratacion) !== id));
          alert("Tipo de contratación eliminado exitosamente.");
        } else {
          alert("Error al eliminar tipo de contratación.");
        }
      } catch (err) {
        alert("Error al eliminar tipo de contratación.");
      }
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <main className="container my-5">
        <h2 className="text-2xl font-bold text-indigo-700 mb-6">Listado de Tipos de Contratación</h2>
        <div className="flex flex-wrap gap-6 justify-center">
          {tipos.length > 0 ? (
            tipos.map((tipo) => (
              <div
                className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 min-w-[260px] max-w-xs flex flex-col items-center"
                key={tipo.idTipoContratacion || tipo.id}
              >
                <h3 className="text-lg font-bold text-indigo-700 mb-2">{tipo.tipoContratacion}</h3>
                <p className="text-gray-800"><strong>ID:</strong> {tipo.idTipoContratacion || tipo.id}</p>
                <div className="flex gap-3 mt-4">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-5 py-2 font-semibold transition"
                    onClick={() => router.push(`/dashboard/ver-tipo-contratacion/${tipo.idTipoContratacion || tipo.id}`)}
                  >
                    Ver
                  </button>
                  <button
                    className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-full px-5 py-2 font-semibold transition"
                    onClick={() => router.push(`/dashboard/editar-tipo-contratacion/${tipo.idTipoContratacion || tipo.id}`)}
                  >
                    Editar
                  </button>
                  {isAdmin && (
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white rounded-full px-5 py-2 font-semibold transition"
                      onClick={() => handleDelete(tipo.idTipoContratacion || tipo.id)}
                    >
                      Eliminar
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>No hay tipos de contratación registrados.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ListadoTiposContratacion;
