"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createCargo, updateCargo } from "@/service/CargosServices";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { motion } from "framer-motion";

const CargoFormulario = ({ cargoInicial = null, onSave, modo = "crear" }) => {
  const router = useRouter();

  const [cargo, setCargo] = useState({
    cargo: "",
    descripcionCargo: "",
    jefatura: false,
    id: undefined,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

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
    const { name, value } = e.target;
    setCargo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleJefaturaChange = (e) => {
    setCargo((prev) => ({
      ...prev,
      jefatura: e.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setIsLoading(true);

    if (!cargo.cargo || !cargo.descripcionCargo) {
      setError("Todos los campos son obligatorios.");
      setIsLoading(false);
      return;
    }

    try {
      let cargoId = cargo.id || cargo.idCargo;
      const payload = {
        cargo: cargo.cargo,
        descripcionCargo: cargo.descripcionCargo,
        jefatura: cargo.jefatura,
      };

      if (modo === "editar" && cargoId) {
        await updateCargo(cargoId, { ...payload, id: cargoId });
        setSuccess(true);
        if (onSave) onSave();
        setTimeout(() => {
          router.push("/dashboard/listado-cargos");
        }, 1200);
      } else {
        await createCargo(payload);
        setSuccess(true);
        if (onSave) onSave();
        setTimeout(() => {
          router.push("/dashboard/listado-cargos");
        }, 1200);
      }
    } catch (err) {
      setError(err.message || "Error al guardar el cargo.");
      setSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto my-8 bg-white/95 rounded-3xl shadow-2xl border border-gray-200 px-8 py-10">
      <motion.form
        onSubmit={handleSubmit}
        className="w-full flex flex-col gap-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {(error || success) && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {error && (
              <Message
                severity="error"
                text={error}
                className="w-full"
              />
            )}
            {success && (
              <Message
                severity="success"
                text={
                  modo === "editar"
                    ? "Cargo actualizado correctamente!"
                    : "Cargo creado correctamente!"
                }
                className="w-full"
              />
            )}
          </motion.div>
        )}

        <div className="grid grid-cols-1 gap-6">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="cargo"
              className="font-semibold text-black text-base mb-1"
            >
              Nombre del Cargo
            </label>
            <div className="rounded-xl bg-gray-50 border border-gray-200 px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-indigo-300 transition">
              <InputText
                id="cargo"
                name="cargo"
                value={cargo.cargo}
                onChange={handleChange}
                required
                placeholder="Nombre del cargo"
                className="w-full !text-black bg-transparent"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="descripcionCargo"
              className="font-semibold text-black text-base mb-1"
            >
              Descripción
            </label>
            <div className="rounded-xl bg-gray-50 border border-gray-200 px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-indigo-300 transition">
              <InputText
                id="descripcionCargo"
                name="descripcionCargo"
                value={cargo.descripcionCargo}
                onChange={handleChange}
                required
                placeholder="Descripción del cargo"
                className="w-full !text-black bg-transparent"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-black text-base mb-1">
              ¿Es Jefatura?
            </label>
            <Dropdown
              value={cargo.jefatura}
              options={[
                { label: "No", value: false },
                { label: "Sí", value: true },
              ]}
              onChange={handleJefaturaChange}
              placeholder="Seleccione"
              className="w-full !text-black bg-transparent rounded-xl bg-gray-50 border border-gray-200 px-3 py-2 shadow-sm"
              panelClassName="!bg-white !text-black"
              required
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mt-8 items-center justify-center">
          <Button
            type="submit"
            label={
              isLoading
                ? "Guardando..."
                : modo === "editar"
                ? "Actualizar Cargo"
                : "Crear Cargo"
            }
            icon={
              isLoading
                ? "pi pi-spin pi-spinner"
                : modo === "editar"
                ? "pi pi-save"
                : "pi pi-plus"
            }
            loading={isLoading}
            className="w-full md:w-60 p-button-rounded p-button-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-200"
            style={{
              background: "linear-gradient(90deg, #6A5ACD, #836FFF)",
              border: "none",
              color: "white",
              fontWeight: "600",
            }}
          />
          <Button
            type="button"
            label="Atrás"
            icon="pi pi-arrow-left"
            className="w-full md:w-60 p-button-outlined p-button-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-200"
            onClick={() => router.back()}
            style={{
              borderColor: "#7c6cf7",
              color: "#23213a",
              fontWeight: "600",
              background: "#f3f4f6",
            }}
          />
        </div>
      </motion.form>
    </div>
  );
};

export default CargoFormulario;
