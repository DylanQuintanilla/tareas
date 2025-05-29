"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContratacionCard from "@/components/ContratacionCard";
import { getContrataciones } from "@/service/ContratacioneService";
import { getDepartamentos } from "@/service/DepartamentoService";
import { getEmpleados } from "@/service/EmpleadoService";
import { getCargos } from "@/service/CargosServices";
import { getTiposContratacion } from "@/service/TipoContratacion";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/Context/AuthContext";
import { jwtDecode } from "jwt-decode";

const ListadoContrataciones = () => {
  const [contrataciones, setContrataciones] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [cargos, setCargos] = useState([]);
  const [tiposContratacion, setTiposContratacion] = useState([]);
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
    const fetchAll = async () => {
      setIsLoading(true);
      try {
        const [
          contratacionesData,
          departamentosData,
          empleadosData,
          cargosData,
          tiposData,
        ] = await Promise.all([
          getContrataciones(),
          getDepartamentos(),
          getEmpleados(),
          getCargos(),
          getTiposContratacion(),
        ]);

        setContrataciones(contratacionesData);
        setDepartamentos(departamentosData);
        setEmpleados(empleadosData);
        setCargos(cargosData);
        setTiposContratacion(tiposData);
      } catch (e) {
        console.error("Error cargando datos:", e);
        setError("No se pudieron cargar los datos.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchAll();
  }, []);

  // Crear mapas de lookup para nombres
  const departamentoMap = Object.fromEntries(
    departamentos.map((d) => [d.idDepartamento, d.nombreDepartamento])
  );
  const empleadoMap = Object.fromEntries(
    empleados.map((e) => [e.idEmpleado, e.nombrePersona])
  );
  const cargoMap = Object.fromEntries(
    cargos.map((c) => [c.idCargo, c.cargo])
  );
  const tipoMap = Object.fromEntries(
    tiposContratacion.map((t) => [t.idTipoContratacion, t.tipoContratacion])
  );

  const handleDelete = (idEliminado) => {
    setContrataciones((prev) => prev.filter((c) => c.idContratacion !== idEliminado));
  };

  if (isLoading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Header />
        <div className="container my-5">
          <h2>Cargando contrataciones...</h2>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Header />
        <div className="container my-5">
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
        <h2 className="text-2xl font-bold text-indigo-700 mb-6">Listado de Contrataciones</h2>
        <div className="flex flex-wrap gap-6 justify-center">
          {contrataciones.length > 0 ? (
            contrataciones.map((c) => (
              <ContratacionCard
                key={c.idContratacion || `${c.idDepartamento}-${c.idEmpleado}-${c.idCargo}-${c.idTipoContratacion}-${c.fechaContratacion}`}
                id={c.idContratacion}
                nombreDepartamento={departamentoMap[c.idDepartamento]}
                nombreEmpleado={empleadoMap[c.idEmpleado]}
                nombreCargo={cargoMap[c.idCargo]}
                nombreTipoContratacion={tipoMap[c.idTipoContratacion]}
                fechaContratacion={c.fechaContratacion}
                salario={c.salario}
                estado={c.estado}
                onDelete={handleDelete}
                canDelete={isAdmin}
                cardClassName="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 min-w-[260px] max-w-xs flex flex-col items-center"
              >
                <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "10px" }}>
                  <button
                    style={{ background: "#7c6cf7", color: "#fff", border: "none", borderRadius: "20px", padding: "8px 20px", cursor: "pointer" }}
                    onClick={() =>
                      router.push(
                        `/dashboard/editar-contratacion/${c.idContratacion}`
                      )
                    }
                  >
                    Editar
                  </button>
                  <button
                    style={{ background: "#4f46e5", color: "#fff", border: "none", borderRadius: "20px", padding: "8px 20px", cursor: "pointer" }}
                    onClick={() =>
                      router.push(
                        `/dashboard/ver-contratacion/${c.idContratacion}`
                      )
                    }
                  >
                    Ver
                  </button>
                  {isAdmin && (
                    <button
                      style={{ background: "#e74c3c", color: "#fff", border: "none", borderRadius: "20px", padding: "8px 20px", cursor: "pointer" }}
                      onClick={() => handleDelete(c.idContratacion)}
                    >
                      Eliminar
                    </button>
                  )}
                </div>
              </ContratacionCard>
            ))
          ) : (
            <p>No hay contrataciones registradas.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ListadoContrataciones;
