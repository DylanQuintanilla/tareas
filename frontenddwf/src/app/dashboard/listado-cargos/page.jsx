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
        <h2 className="text-2xl font-bold text-indigo-700 mb-6">Listado de Cargos</h2>
        <div className="flex flex-wrap gap-6 justify-center">
          {cargos.length > 0 ? (
            cargos.map((cargo) => (
              <div
                className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 min-w-[260px] max-w-xs flex flex-col items-center"
                key={cargo.idCargo || cargo.id}
              >
                <h3 className="text-lg font-bold text-indigo-700 mb-2">{cargo.cargo}</h3>
                <p className="text-gray-800"><strong>ID:</strong> {cargo.idCargo || cargo.id}</p>
                <p className="text-gray-800"><strong>Descripción:</strong> {cargo.descripcionCargo}</p>
                <p className="text-gray-800"><strong>Jefatura:</strong> {cargo.jefatura ? "Sí" : "No"}</p>
                <div className="flex gap-3 mt-4">
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
