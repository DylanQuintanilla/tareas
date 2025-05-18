"use client";
import React, { useState, useEffect } from "react";
import { createTipoContratacion, updateTipoContratacion } from "@/service/TipoContratacion";

const TipoContratacionFormulario = ({ tipoContratacionInicial = null, onSave, modo = "crear" }) => {
  const [tipoContratacion, setTipoContratacion] = useState({
    tipoContratacion: "",
    id: undefined,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (tipoContratacionInicial) {
      setTipoContratacion({
        ...tipoContratacion,
        ...tipoContratacionInicial,
        id: tipoContratacionInicial.id || tipoContratacionInicial.idTipoContratacion,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tipoContratacionInicial]);

  const handleChange = (e) => {
    setTipoContratacion((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      let tipoId = tipoContratacion.id || tipoContratacion.idTipoContratacion;
      const payload = {
        tipoContratacion: tipoContratacion.tipoContratacion,
      };
      if (modo === "editar" && tipoId) {
        await updateTipoContratacion(tipoId, { ...payload, id: tipoId });
      } else {
        await createTipoContratacion(payload);
      }
      if (onSave) onSave();
    } catch (err) {
      setError(err.message || "Error al guardar el tipo de contratación.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <label htmlFor="tipoContratacion">Tipo de Contratación</label>
        <input
          type="text"
          id="tipoContratacion"
          name="tipoContratacion"
          value={tipoContratacion.tipoContratacion}
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

export default TipoContratacionFormulario;
