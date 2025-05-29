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

  const handleDelete = (id) => {
    setContrataciones((prev) =>
      prev.filter((c) => c.idContratacion !== id)
    );
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
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
          Listado de Contrataciones
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {contrataciones.length > 0 ? (
            contrataciones.map((c) => (
              <ContratacionCard
                key={
                  c.idContratacion ||
                  `${c.idDepartamento}-${c.idEmpleado}-${c.idCargo}-${c.idTipoContratacion}-${c.fechaContratacion}`
                }
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
                cardClassName="w-full bg-white rounded-2xl shadow-lg border border-gray-200 p-6 flex flex-col"
              >
                <div className="flex flex-wrap justify-center gap-3 mt-4">
                  <button
                    className="bg-purple-600 text-white rounded-full px-4 py-2 hover:bg-purple-700 transition"
                    onClick={() =>
                      router.push(
                        `/dashboard/editar-contratacion/${c.idContratacion}`
                      )
                    }
                  >
                    Editar
                  </button>
                  <button
                    className="bg-indigo-600 text-white rounded-full px-4 py-2 hover:bg-indigo-700 transition"
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
                      className="bg-red-600 text-white rounded-full px-4 py-2 hover:bg-red-700 transition"
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
