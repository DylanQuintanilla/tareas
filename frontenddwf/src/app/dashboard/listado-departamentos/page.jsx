"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getDepartamentos, deleteDepartamento } from "@/service/DepartamentoService";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/Context/AuthContext";
import { jwtDecode } from "jwt-decode";

const ListadoDepartamentos = () => {
  const [departamentos, setDepartamentos] = useState([]);
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
    const fetchDepartamentos = async () => {
      setIsLoading(true);
      try {
        const data = await getDepartamentos();
        setDepartamentos(data);
      } catch (err) {
        setError(err.message || "Error al obtener la lista de departamentos.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchDepartamentos();
  }, []);

  const handleDelete = async (id) => {
    if (!id) return;
    if (confirm("¿Estás seguro de eliminar este departamento?")) {
      try {
        const ok = await deleteDepartamento(id);
        if (ok) {
          setDepartamentos((prev) => prev.filter((d) => (d.id || d.idDepartamento) !== id));
          alert("Departamento eliminado exitosamente.");
        } else {
          alert("Error al eliminar departamento.");
        }
      } catch (err) {
        alert("Error al eliminar departamento.");
      }
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <main className="container my-5">
        <h2 className="text-2xl font-bold text-indigo-700 mb-6">Listado de Departamentos</h2>
        <div className="flex flex-wrap gap-6 justify-center">
          {departamentos.length > 0 ? (
            departamentos.map((dep) => (
              <div
                className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 min-w-[260px] max-w-xs flex flex-col items-center"
                key={dep.idDepartamento || dep.id}
              >
                <h3 className="text-lg font-bold text-indigo-700 mb-2">{dep.nombreDepartamento}</h3>
                <p className="text-gray-800"><strong>ID:</strong> {dep.idDepartamento || dep.id}</p>
                <p className="text-gray-800"><strong>Descripción:</strong> {dep.descripcionDepartamento}</p>
                <div className="flex gap-3 mt-4">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-5 py-2 font-semibold transition"
                    onClick={() => router.push(`/dashboard/ver-departamento/${dep.idDepartamento || dep.id}`)}
                  >
                    Ver
                  </button>
                  <button
                    className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-full px-5 py-2 font-semibold transition"
                    onClick={() => router.push(`/dashboard/editar-departamento/${dep.idDepartamento || dep.id}`)}
                  >
                    Editar
                  </button>
                  {isAdmin && (
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white rounded-full px-5 py-2 font-semibold transition"
                      onClick={() => handleDelete(dep.idDepartamento || dep.id)}
                    >
                      Eliminar
                    </button>
                  )}
                </div>
              </div>
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
