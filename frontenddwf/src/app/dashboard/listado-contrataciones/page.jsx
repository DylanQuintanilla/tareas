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

const ListadoContrataciones = () => {
  const [contrataciones, setContrataciones] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [cargos, setCargos] = useState([]);
  const [tiposContratacion, setTiposContratacion] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
        <h2>Listado de Contrataciones</h2>
        <div className="card-container">
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
              />
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
