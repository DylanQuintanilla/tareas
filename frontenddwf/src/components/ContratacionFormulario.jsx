"use client";
import React, { useState, useEffect } from "react";
import { createContratacion, updateContratacion } from "@/service/ContratacioneService";
import { getDepartamentos } from "@/service/DepartamentoService";
import { getCargos } from "@/service/CargosServices";
import { getTiposContratacion } from "@/service/TipoContratacion";
import { getEmpleados } from "@/service/EmpleadoService";

const ContratacionFormulario = ({ contratacionInicial = null, onSave, isLoading = false }) => {
  const [contratacion, setContratacion] = useState({
    idDepartamento: "",
    idEmpleado: "",
    idCargo: "",
    idTipoContratacion: "",
    fechaContratacion: "",
    salario: "",
    estado: true,
  });

  const [departamentos, setDepartamentos] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [cargos, setCargos] = useState([]);
  const [tiposContratacion, setTiposContratacion] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (contratacionInicial) {
      setContratacion(contratacionInicial);
    }
  }, [contratacionInicial]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [departamentosData, empleadosData, cargosData, tiposContratacionData] = await Promise.all([
          getDepartamentos(),
          getEmpleados(),
          getCargos(),
          getTiposContratacion(),
        ]);

        setDepartamentos(departamentosData);
        setEmpleados(empleadosData);
        setCargos(cargosData);
        setTiposContratacion(tiposContratacionData);
      } catch (err) {
        console.error("Error al cargar datos:", err.message);
        setError("Error al cargar datos para el formulario.");
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContratacion((prev) => ({
      ...prev,
      [name]: name === "estado" ? value === "true" : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (contratacion.id) {
        await updateContratacion(contratacion.id, contratacion);
      } else {
        await createContratacion(contratacion);
      }
      onSave();
    } catch (err) {
      console.error("Error al guardar contratación:", err.message);
      setError("Error al guardar los datos de la contratación.");
    }
  };

  return (
    <div className="form-container">
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="idDepartamento">Departamento</label>
            <select
              id="idDepartamento"
              name="idDepartamento"
              value={contratacion.idDepartamento}
              onChange={handleChange}
              required
              className="form-control styled-select"
            >
              <option value="">Seleccione un departamento</option>
              {departamentos.map((dep) => (
                <option key={dep.id} value={dep.id}>
                  {dep.nombreDepartamento}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="idEmpleado">Empleado</label>
            <select
              id="idEmpleado"
              name="idEmpleado"
              value={contratacion.idEmpleado}
              onChange={handleChange}
              required
              className="form-control styled-select"
            >
              <option value="">Seleccione un empleado</option>
              {empleados.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.nombrePersona} ({emp.usuario})
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="idCargo">Cargo</label>
            <select
              id="idCargo"
              name="idCargo"
              value={contratacion.idCargo}
              onChange={handleChange}
              required
              className="form-control styled-select"
            >
              <option value="">Seleccione un cargo</option>
              {cargos.map((cargo) => (
                <option key={cargo.id} value={cargo.id}>
                  {cargo.cargo}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="idTipoContratacion">Tipo de Contratación</label>
            <select
              id="idTipoContratacion"
              name="idTipoContratacion"
              value={contratacion.idTipoContratacion}
              onChange={handleChange}
              required
              className="form-control styled-select"
            >
              <option value="">Seleccione un tipo de contratación</option>
              {tiposContratacion.map((tipo) => (
                <option key={tipo.id} value={tipo.id}>
                  {tipo.tipoContratacion}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="fechaContratacion">Fecha de Contratación</label>
            <input
              type="date"
              id="fechaContratacion"
              name="fechaContratacion"
              value={contratacion.fechaContratacion}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="salario">Salario</label>
            <input
              type="number"
              id="salario"
              name="salario"
              placeholder="Ej. 500.00"
              value={contratacion.salario}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="estado">Estado</label>
          <select
            id="estado"
            name="estado"
            value={contratacion.estado.toString()}
            onChange={handleChange}
            required
            className="form-control styled-select"
          >
            <option value="true">Activo</option>
            <option value="false">Inactivo</option>
          </select>
        </div>
        <div className="button-group">
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Guardando..." : contratacion.id ? "Actualizar" : "Crear"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContratacionFormulario;