"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getDepartamentos, deleteDepartamento } from "@/service/DepartamentoService";
import { useRouter } from "next/navigation";

const ListadoDepartamentos = () => {
  const [departamentos, setDepartamentos] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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
        <h2>Listado de Departamentos</h2>
        <div className="card-container">
          {departamentos.length > 0 ? (
            departamentos.map((dep) => (
              <div className="card" key={dep.idDepartamento || dep.id}>
                <h3>{dep.nombreDepartamento}</h3>
                <p><strong>ID:</strong> {dep.idDepartamento || dep.id}</p>
                <p><strong>Descripción:</strong> {dep.descripcionDepartamento}</p>
                <div className="button-group">
                  <button onClick={() => router.push(`/dashboard/ver-departamento/${dep.idDepartamento || dep.id}`)}>
                    Ver
                  </button>
                  <button onClick={() => router.push(`/dashboard/editar-departamento/${dep.idDepartamento || dep.id}`)}>
                    Editar
                  </button>
                  <button onClick={() => handleDelete(dep.idDepartamento || dep.id)}>
                    Eliminar
                  </button>
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
