"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getCargos, deleteCargo } from "@/service/CargosServices";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/Context/AuthContext";
import { jwtDecode } from "jwt-decode";

const ListadoCargos = () => {
  const [cargos, setCargos] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  // Decodifica el token para saber si es admin
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
    if (!id) return;
    if (confirm("¿Estás seguro de eliminar este cargo?")) {
      try {
        const ok = await deleteCargo(id);
        if (ok) {
          setCargos((prev) => prev.filter((c) => (c.id || c.idCargo) !== id));
          alert("Cargo eliminado exitosamente.");
        } else {
          alert("Error al eliminar cargo.");
        }
      } catch (err) {
        alert("Error al eliminar cargo.");
      }
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <main className="container my-5">
        <h2 className="text-2xl font-bold text-indigo-700 mb-10">Listado de Cargos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-16 justify-items-center">
          {cargos.length > 0 ? (
            cargos.map((cargo) => (
              <div
                className="w-full bg-white rounded-2xl shadow-lg border border-gray-200 p-8 min-w-[350px] max-w-lg flex flex-col"
                key={cargo.idCargo || cargo.id}
              >
                <h3 className="text-2xl font-extrabold text-indigo-800 mb-2">{cargo.cargo}</h3>
                <div className="grid grid-cols-1 gap-y-2 text-gray-700 text-base mb-4">
                  <p><span className="font-medium">ID:</span> {cargo.idCargo || cargo.id}</p>
                  <p><span className="font-medium">Descripción:</span> {cargo.descripcionCargo}</p>
                  <p><span className="font-medium">Jefatura:</span> {cargo.jefatura ? "Sí" : "No"}</p>
                </div>
                <div className="flex flex-wrap gap-3 pt-6 border-t border-gray-100 mt-auto">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-5 py-2 font-semibold transition"
                    onClick={() => router.push(`/dashboard/ver-cargo/${cargo.idCargo || cargo.id}`)}
                  >
                    Ver
                  </button>
                  <button
                    className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-full px-5 py-2 font-semibold transition"
                    onClick={() => router.push(`/dashboard/editar-cargo/${cargo.idCargo || cargo.id}`)}
                  >
                    Editar
                  </button>
                  {isAdmin && (
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white rounded-full px-5 py-2 font-semibold transition"
                      onClick={() => handleDelete(cargo.idCargo || cargo.id)}
                    >
                      Eliminar
                    </button>
                  )}
                </div>
              </div>
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
