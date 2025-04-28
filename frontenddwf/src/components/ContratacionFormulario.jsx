"use client";

import React, { useState, useEffect } from "react";
import {
  createContratacion,
  updateContratacion,
} from "@/service/ContratacioneService";
import { getDepartamentos } from "@/service/DepartamentoService";
import { getCargos } from "@/service/CargosServices";
import { getTiposContratacion } from "@/service/TipoContratacion";
import { getEmpleados } from "@/service/EmpleadoService";

const ContratacionFormulario = ({
  contratacionInicial = null,
  onSave,
  isLoading = false,
}) => {
  const [contratacion, setContratacion] = useState({
    id: null,
    departamento: "",
    empleado: "",
    cargo: "",
    tipoContratacion: "",
    fechaContratacion: "",
    salario: "",
    estado: "true",
  });
  const [departamentos, setDepartamentos] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [cargos, setCargos] = useState([]);
  const [tiposContratacion, setTiposContratacion] = useState([]);
  const [error, setError] = useState("");

  // Precarga para edición
  useEffect(() => {
    if (contratacionInicial) {
      setContratacion({
        id: contratacionInicial.id,
        departamento: contratacionInicial.idDepartamento?.toString() || "",
        empleado: contratacionInicial.idEmpleado?.toString() || "",
        cargo: contratacionInicial.idCargo?.toString() || "",
        tipoContratacion:
          contratacionInicial.idTipoContratacion?.toString() || "",
        fechaContratacion:
          contratacionInicial.fechaContratacion?.split("T")[0] || "",
        salario: String(contratacionInicial.salario || ""),
        estado: contratacionInicial.estado?.toString() || "true",
      });
    }
  }, [contratacionInicial]);

  // Carga listas para selects
  useEffect(() => {
    (async () => {
      try {
        const [
          departamentosData,
          empleadosData,
          cargosData,
          tiposData,
        ] = await Promise.all([
          getDepartamentos(),
          getEmpleados(),
          getCargos(),
          getTiposContratacion(),
        ]);
        setDepartamentos(departamentosData);
        setEmpleados(empleadosData);
        setCargos(cargosData);
        setTiposContratacion(tiposData);
      } catch (e) {
        console.error("Error al cargar datos:", e);
        setError("No se pudieron cargar los datos del formulario.");
      }
    })();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContratacion((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Convertimos todos los IDs a número
    const payload = {
      idDepartamento:     Number(contratacion.departamento),
      idEmpleado:         Number(contratacion.empleado),
      idCargo:            Number(contratacion.cargo),
      idTipoContratacion: Number(contratacion.tipoContratacion),
      fechaContratacion:  contratacion.fechaContratacion,
      salario:            Number(contratacion.salario),
      estado:             contratacion.estado === "true",
    };

    // Debug: ver en consola qué valores obtenemos
    console.log("▶️ Payload a enviar:", payload);

    // Validación: cada campo ID debe ser un número válido > 0
    const invalidId =
      isNaN(payload.idDepartamento) || payload.idDepartamento <= 0 ||
      isNaN(payload.idEmpleado)     || payload.idEmpleado     <= 0 ||
      isNaN(payload.idCargo)        || payload.idCargo        <= 0 ||
      isNaN(payload.idTipoContratacion) || payload.idTipoContratacion <= 0;

    if (invalidId) {
      setError("Por favor, selecciona todos los campos obligatorios.");
      return;
    }

    try {
      if (contratacion.id) {
        await updateContratacion(contratacion.id, payload);
      } else {
        await createContratacion(payload);
      }
      onSave();
    } catch (err) {
      console.error("Error al guardar contratación:", err);
      setError(
        err.response?.data?.message ||
        "Error al procesar la solicitud de contratación"
      );
    }
  };

  return (
    <div className="form-container">
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        {/* Departamento / Empleado */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="departamento">Departamento</label>
            <select
              id="departamento"
              name="departamento"
              value={contratacion.departamento}
              onChange={handleChange}
              required
            >
              <option key="default-dep" value="">
                Seleccione un departamento
              </option>
              {departamentos.map((dep) => (
                <option key={`dep-${dep.id}`} value={dep.id}>
                  {dep.nombreDepartamento}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="empleado">Empleado</label>
            <select
              id="empleado"
              name="empleado"
              value={contratacion.empleado}
              onChange={handleChange}
              required
            >
              <option key="default-emp" value="">
                Seleccione un empleado
              </option>
              {empleados.map((emp) => (
                <option key={`emp-${emp.id}`} value={emp.id}>
                  {emp.nombrePersona} ({emp.usuario})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Cargo / Tipo Contratación */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="cargo">Cargo</label>
            <select
              id="cargo"
              name="cargo"
              value={contratacion.cargo}
              onChange={handleChange}
              required
            >
              <option key="default-cargo" value="">
                Seleccione un cargo
              </option>
              {cargos.map((c) => (
                <option key={`cargo-${c.id}`} value={c.id}>
                  {c.cargo}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="tipoContratacion">
              Tipo de Contratación
            </label>
            <select
              id="tipoContratacion"
              name="tipoContratacion"
              value={contratacion.tipoContratacion}
              onChange={handleChange}
              required
            >
              <option key="default-tipo" value="">
                Seleccione un tipo
              </option>
              {tiposContratacion.map((t) => (
                <option key={`tipo-${t.id}`} value={t.id}>
                  {t.tipoContratacion}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Fecha / Salario */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="fechaContratacion">
              Fecha de Contratación
            </label>
            <input
              type="date"
              id="fechaContratacion"
              name="fechaContratacion"
              value={contratacion.fechaContratacion}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="salario">Salario</label>
            <input
              type="number"
              id="salario"
              name="salario"
              step="0.01"
              min="0"
              placeholder="Ej. 1500.50"
              value={contratacion.salario}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Estado */}
        <div className="form-group">
          <label htmlFor="estado">Estado</label>
          <select
            id="estado"
            name="estado"
            value={contratacion.estado}
            onChange={handleChange}
            required
          >
            <option key="estado-true" value="true">
              Activo
            </option>
            <option key="estado-false" value="false">
              Inactivo
            </option>
          </select>
        </div>

        {/* Botón */}
        <div className="button-group">
          <button type="submit" disabled={isLoading}>
            {isLoading
              ? "Guardando..."
              : contratacion.id
              ? "Actualizar"
              : "Crear"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContratacionFormulario;
