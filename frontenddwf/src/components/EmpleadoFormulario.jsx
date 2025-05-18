"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createEmpleado, updateEmpleado } from "@/service/EmpleadoService";

const EmpleadoFormulario = ({ empleadoInicial = null, onSave, modo = "crear" }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Inicializa el formulario con los datos del empleadoInicial si existen
  const [empleado, setEmpleado] = useState({
    nombrePersona: "",
    usuario: "",
    numeroDUI: "",
    numeroTelefono: "",
    correoInstitucional: "",
    fechaNacimiento: "",
    id: undefined,
  });

  useEffect(() => {
    // Solo actualiza si los datos realmente cambiaron
    if (empleadoInicial && Object.keys(empleadoInicial).length > 0) {
      setEmpleado((prev) => ({
        ...prev,
        ...empleadoInicial,
        id: empleadoInicial.id || empleadoInicial.idEmpleado || prev.id,
      }));
    }
  }, [empleadoInicial]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmpleado((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validarCampos = () => {
    const duiRegex = /^\d{8}-\d{1}$/;
    const telRegex = /^\+[1-9]\d{1,14}$/;
    if (!duiRegex.test(empleado.numeroDUI)) {
      setError("Formato de DUI inválido. Ejemplo: 06371984-6");
      return false;
    }
    if (!telRegex.test(empleado.numeroTelefono)) {
      setError("Formato de teléfono inválido. Ejemplo: +50375480324");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!validarCampos()) return;
    setIsLoading(true);
    try {
      if (empleado.id) {
        await updateEmpleado(empleado.id, empleado);
      } else {
        await createEmpleado(empleado);
      }
      onSave();
      router.push("/dashboard/listado-empleados");
    } catch (err) {
      setError(err.message || "Error al guardar los datos del empleado.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container">
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="nombrePersona">Nombre Persona</label>
            <input
              type="text"
              id="nombrePersona"
              name="nombrePersona"
              placeholder="Nombre Persona"
              value={empleado.nombrePersona ?? ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="usuario">Usuario</label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="Usuario"
              value={empleado.usuario ?? ""}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="numeroDUI">Número DUI</label>
            <input
              type="text"
              id="numeroDUI"
              name="numeroDUI"
              placeholder="Número DUI"
              value={empleado.numeroDUI ?? ""}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="numeroTelefono">Número Teléfono</label>
            <input
              type="text"
              id="numeroTelefono"
              name="numeroTelefono"
              placeholder="Número Teléfono"
              value={empleado.numeroTelefono ?? ""}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="correoInstitucional">Correo Institucional</label>
          <input
            type="email"
            id="correoInstitucional"
            name="correoInstitucional"
            placeholder="ejemplo@correo.com"
            value={empleado.correoInstitucional ?? ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="fechaNacimiento">Fecha Nacimiento</label>
          <input
            type="date"
            id="fechaNacimiento"
            name="fechaNacimiento"
            value={empleado.fechaNacimiento ?? ""}
            onChange={handleChange}
          />
        </div>
        <div className="button-group">
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Guardando..." : modo === "editar" ? "Actualizar" : "Crear"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmpleadoFormulario;
