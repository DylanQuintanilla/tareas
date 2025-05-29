"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createTipoContratacion, updateTipoContratacion } from "@/service/TipoContratacion";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { motion } from "framer-motion";

const TipoContratacionFormulario = ({ tipoInicial = null, onSave, modo = "crear" }) => {
  const router = useRouter();

  const [tipo, setTipo] = useState({
    tipoContratacion: "",
    descripcion: "",
    id: undefined,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (tipoInicial) {
      setTipo({
        ...tipo,
        ...tipoInicial,
        id: tipoInicial.id || tipoInicial.idTipoContratacion,
        descripcion: tipoInicial.descripcion || "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tipoInicial]);

  const handleChange = (e) => {
    setTipo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setIsLoading(true);

    if (!tipo.tipoContratacion || !tipo.descripcion) {
      setError("Todos los campos son obligatorios.");
      setIsLoading(false);
      return;
    }

    try {
      let tipoId = tipo.id || tipo.idTipoContratacion;
      const payload = {
        tipoContratacion: tipo.tipoContratacion,
        descripcion: tipo.descripcion,
      };

      if (modo === "editar" && tipoId) {
        await updateTipoContratacion(tipoId, { ...payload, id: tipoId });
        setSuccess(true);
        if (onSave) onSave();
        setTimeout(() => {
          router.push("/dashboard/listado-tipos-contratacion");
        }, 1200);
      } else {
        await createTipoContratacion(payload);
        setSuccess(true);
        if (onSave) onSave();
        setTimeout(() => {
          router.push("/dashboard/listado-tipos-contratacion");
        }, 1200);
      }
    } catch (err) {
      setError(err.message || "Error al guardar el tipo de contratación.");
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
            {error && <Message severity="error" text={error} className="w-full" />}
            {success && <Message severity="success" text={modo === "editar" ? "Tipo de contratación actualizado correctamente!" : "Tipo de contratación creado correctamente!"} className="w-full" />}
          </motion.div>
        )}

        <div className="grid grid-cols-1 gap-6">
          <div className="flex flex-col gap-1">
            <label htmlFor="tipoContratacion" className="font-semibold text-black text-base mb-1">
              Tipo de Contratación
            </label>
            <div className="rounded-xl bg-gray-50 border border-gray-200 px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-indigo-300 transition">
              <InputText
                id="tipoContratacion"
                name="tipoContratacion"
                value={tipo.tipoContratacion}
                onChange={handleChange}
                required
                placeholder="Tipo de contratación"
                className="w-full !text-black bg-transparent"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="descripcion" className="font-semibold text-black text-base mb-1">
              Descripción
            </label>
            <div className="rounded-xl bg-gray-50 border border-gray-200 px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-indigo-300 transition">
              <InputText
                id="descripcion"
                name="descripcion"
                value={tipo.descripcion}
                onChange={handleChange}
                required
                placeholder="Descripción del tipo de contratación"
                className="w-full !text-black bg-transparent"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mt-8 items-center justify-center">
          <Button
            type="submit"
            label={isLoading ? "Guardando..." : (modo === "editar" ? "Actualizar Tipo" : "Crear Tipo")}
            icon={isLoading ? "pi pi-spin pi-spinner" : (modo === "editar" ? "pi pi-save" : "pi pi-plus")}
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

export default TipoContratacionFormulario;
