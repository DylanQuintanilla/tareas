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
        <h2 className="text-2xl font-bold text-indigo-700 mb-10">Listado de Departamentos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-16 justify-items-center">
          {departamentos.length > 0 ? (
            departamentos.map((dep) => (
              <div
                className="w-full bg-white rounded-2xl shadow-lg border border-gray-200 p-8 min-w-[350px] max-w-lg flex flex-col"
                key={dep.idDepartamento || dep.id}
              >
                <h3 className="text-2xl font-extrabold text-indigo-800 mb-2">{dep.nombreDepartamento}</h3>
                <div className="grid grid-cols-1 gap-y-2 text-gray-700 text-base mb-4">
                  <p><span className="font-medium">ID:</span> {dep.idDepartamento || dep.id}</p>
                  <p><span className="font-medium">Descripción:</span> {dep.descripcionDepartamento}</p>
                </div>
                <div className="flex flex-wrap gap-3 pt-6 border-t border-gray-100 mt-auto">
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
