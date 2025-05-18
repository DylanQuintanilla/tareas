"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getTiposContratacion, deleteTipoContratacion } from "@/service/TipoContratacion";
import { useRouter } from "next/navigation";

const ListadoTiposContratacion = () => {
  const [tipos, setTipos] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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
        <h2>Listado de Tipos de Contratación</h2>
        <div className="card-container">
          {tipos.length > 0 ? (
            tipos.map((tipo) => (
              <div className="card" key={tipo.idTipoContratacion || tipo.id}>
                <h3>{tipo.tipoContratacion}</h3>
                <p><strong>ID:</strong> {tipo.idTipoContratacion || tipo.id}</p>
                <div className="button-group">
                  <button onClick={() => router.push(`/dashboard/ver-tipo-contratacion/${tipo.idTipoContratacion || tipo.id}`)}>
                    Ver
                  </button>
                  <button onClick={() => router.push(`/dashboard/editar-tipo-contratacion/${tipo.idTipoContratacion || tipo.id}`)}>
                    Editar
                  </button>
                  <button onClick={() => handleDelete(tipo.idTipoContratacion || tipo.id)}>
                    Eliminar
                  </button>
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
