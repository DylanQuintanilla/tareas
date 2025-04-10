"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { saveEmpleado, updateEmpleado } from "@/service/EmpleadoService";

const EmpleadoFormulario = ({ empleadoInicial = null }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Initialize the form state with the provided employee data or default values
  const [empleado, setEmpleado] = useState({
    nombre: "",
    apellido: "",
    email: "",
    fechaIngreso: "",
    cargo: "",
  });

  useEffect(() => {
    if (empleadoInicial) {
      setEmpleado(empleadoInicial);
    }
  }, [empleadoInicial]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmpleado((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      if (empleadoInicial) {
        // Update existing employee
        await updateEmpleado(empleadoInicial.id, empleado);
      } else {
        // Create new employee
        await saveEmpleado(empleado);
      }
      // Redirect to the employee list after successful creation or update
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
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Nombre"
              value={empleado.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="apellido">Apellido</label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              placeholder="Apellido"
              value={empleado.apellido}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="ejemplo@correo.com"
              value={empleado.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="fechaIngreso">Fecha de Ingreso</label>
            <input
              type="date"
              id="fechaIngreso"
              name="fechaIngreso"
              value={empleado.fechaIngreso}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="cargo">Cargo</label>
          <input
            type="text"
            id="cargo"
            name="cargo"
            placeholder="Ej. Gerente de área"
            value={empleado.cargo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="button-group">
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Guardando..." : empleadoInicial ? "Actualizar" : "Crear"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmpleadoFormulario;
