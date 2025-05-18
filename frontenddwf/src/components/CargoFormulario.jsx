"use client";
import React, { useState, useEffect } from "react";
import { createCargo, updateCargo } from "@/service/CargosServices";

const CargoFormulario = ({ cargoInicial = null, onSave, modo = "crear" }) => {
  const [cargo, setCargo] = useState({
    cargo: "",
    descripcionCargo: "",
    jefatura: false,
    id: undefined,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (cargoInicial) {
      setCargo({
        ...cargo,
        ...cargoInicial,
        id: cargoInicial.id || cargoInicial.idCargo,
        descripcionCargo: cargoInicial.descripcionCargo || "",
        jefatura:
          typeof cargoInicial.jefatura === "boolean"
            ? cargoInicial.jefatura
            : cargoInicial.jefatura === "true",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cargoInicial]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCargo((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      let cargoId = cargo.id || cargo.idCargo;
      const payload = {
        cargo: cargo.cargo,
        descripcionCargo: cargo.descripcionCargo,
        jefatura: cargo.jefatura,
      };
      if (modo === "editar" && cargoId) {
        await updateCargo(cargoId, { ...payload, id: cargoId });
      } else {
        await createCargo(payload);
      }
      if (onSave) onSave();
    } catch (err) {
      setError(err.message || "Error al guardar el cargo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <label htmlFor="cargo">Nombre del Cargo</label>
        <input
          type="text"
          id="cargo"
          name="cargo"
          value={cargo.cargo}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="descripcionCargo">Descripción</label>
        <input
          type="text"
          id="descripcionCargo"
          name="descripcionCargo"
          value={cargo.descripcionCargo}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="jefatura">¿Es Jefatura?</label>
        <input
          type="checkbox"
          id="jefatura"
          name="jefatura"
          checked={cargo.jefatura}
          onChange={handleChange}
        />
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Guardando..." : modo === "editar" ? "Actualizar" : "Crear"}
      </button>
    </form>
  );
};

export default CargoFormulario;
