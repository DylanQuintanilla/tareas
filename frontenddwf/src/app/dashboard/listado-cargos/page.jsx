"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getCargos, deleteCargo } from "@/service/CargosServices";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/Context/AuthContext";
import jwtDecode from "jwt-decode";

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
      const decoded = jwtDecode(token);
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
        <h2>Listado de Cargos</h2>
        <div className="card-container">
          {cargos.length > 0 ? (
            cargos.map((cargo) => (
              <div className="card" key={cargo.idCargo || cargo.id}>
                <h3>{cargo.cargo}</h3>
                <p><strong>ID:</strong> {cargo.idCargo || cargo.id}</p>
                <p><strong>Descripción:</strong> {cargo.descripcionCargo}</p>
                <p><strong>Jefatura:</strong> {cargo.jefatura ? "Sí" : "No"}</p>
                <div className="button-group">
                  <button onClick={() => router.push(`/dashboard/ver-cargo/${cargo.idCargo || cargo.id}`)}>
                    Ver
                  </button>
                  <button onClick={() => router.push(`/dashboard/editar-cargo/${cargo.idCargo || cargo.id}`)}>
                    Editar
                  </button>
                  {isAdmin && (
                    <button onClick={() => handleDelete(cargo.idCargo || cargo.id)}>
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
