"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createEmpleado, updateEmpleado } from "@/service/EmpleadoService";

const EmpleadoFormulario = ({ empleadoInicial = null, onSave, modo = "crear" }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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
    if (empleadoInicial && Object.keys(empleadoInicial).length > 0) {
      setEmpleado((prev) => ({
        ...prev,
        ...empleadoInicial,
        id: empleadoInicial.id || empleadoInicial.idEmpleado || prev.id,
      }));
    }
  }, [empleadoInicial]);

  // Formatear DUI automáticamente: 12345678-9
  const formatearDUI = (valor) => {
    const soloNumeros = valor.replace(/\D/g, "").slice(0, 9); // máx 9 dígitos
    if (soloNumeros.length > 8) {
      return soloNumeros.slice(0, 8) + "-" + soloNumeros.slice(8);
    }
    return soloNumeros;
  };

  // Formatear Teléfono automáticamente: 1234-5678
  const formatearTelefono = (valor) => {
    const soloNumeros = valor.replace(/\D/g, "").slice(0, 8); // máx 8 dígitos
    if (soloNumeros.length > 4) {
      return soloNumeros.slice(0, 4) + "-" + soloNumeros.slice(4);
    }
    return soloNumeros;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    let nuevoValor = value;

    if (name === "numeroDUI") {
      nuevoValor = formatearDUI(value);
    }

    if (name === "numeroTelefono") {
      nuevoValor = formatearTelefono(value);
    }

    setEmpleado((prev) => ({
      ...prev,
      [name]: nuevoValor,
    }));
  };

  const validarCampos = () => {
    const duiRegex = /^\d{8}-\d{1}$/;
    const telRegex = /^\d{4}-\d{4}$/;

    if (!duiRegex.test(empleado.numeroDUI)) {
      setError("Formato de DUI inválido. Ejemplo: 06371984-6");
      return false;
    }
    if (!telRegex.test(empleado.numeroTelefono)) {
      setError("Formato de teléfono inválido. Ejemplo: 7548-0324");
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
      let empleadoId = empleado.id ?? empleado.idEmpleado;
      if (modo === "editar") {
        if (!empleadoId) {
          setError("No se encontró el ID del empleado para actualizar.");
          setIsLoading(false);
          return;
        }
        const data = await updateEmpleado(empleadoId, { ...empleado, id: empleadoId });
        if (data && data.id) {
          if (onSave) onSave();
          router.push("/dashboard/ver-empleado/" + data.id);
        } else {
          if (onSave) onSave();
          router.push("/dashboard/listado-empleados");
        }
      } else {
        await createEmpleado(empleado);
        if (onSave) onSave();
        router.push("/dashboard/listado-empleados");
      }
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
              placeholder="Ej: 06371984-6"
              maxLength={10}
              value={empleado.numeroDUI ?? ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="numeroTelefono">Número Teléfono</label>
            <input
              type="text"
              id="numeroTelefono"
              name="numeroTelefono"
              placeholder="Ej: 7548-0324"
              maxLength={9}
              value={empleado.numeroTelefono ?? ""}
              onChange={handleChange}
              required
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
