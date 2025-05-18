"use client";
import React, { useState, useEffect } from "react";
import { createDepartamento, updateDepartamento } from "@/service/DepartamentoService";

const DepartamentoFormulario = ({ departamentoInicial = null, onSave, modo = "crear" }) => {
  const [departamento, setDepartamento] = useState({
    nombreDepartamento: "",
    descripcionDepartamento: "",
    id: undefined,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (departamentoInicial) {
      setDepartamento({
        ...departamento,
        ...departamentoInicial,
        id: departamentoInicial.id || departamentoInicial.idDepartamento,
        descripcionDepartamento: departamentoInicial.descripcionDepartamento || "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [departamentoInicial]);

  const handleChange = (e) => {
    setDepartamento((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      let departamentoId = departamento.id || departamento.idDepartamento;
      const payload = {
        nombreDepartamento: departamento.nombreDepartamento,
        descripcionDepartamento: departamento.descripcionDepartamento,
      };
      if (modo === "editar" && departamentoId) {
        await updateDepartamento(departamentoId, { ...payload, id: departamentoId });
      } else {
        await createDepartamento(payload);
      }
      if (onSave) onSave();
    } catch (err) {
      setError(err.message || "Error al guardar el departamento.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <label htmlFor="nombreDepartamento">Nombre del Departamento</label>
        <input
          type="text"
          id="nombreDepartamento"
          name="nombreDepartamento"
          value={departamento.nombreDepartamento}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="descripcionDepartamento">Descripción</label>
        <input
          type="text"
          id="descripcionDepartamento"
          name="descripcionDepartamento"
          value={departamento.descripcionDepartamento}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Guardando..." : modo === "editar" ? "Actualizar" : "Crear"}
      </button>
    </form>
  );
};

export default DepartamentoFormulario;
