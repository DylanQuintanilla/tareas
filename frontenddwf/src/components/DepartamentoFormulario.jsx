"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import { createDepartamento, updateDepartamento } from "@/service/DepartamentoService";

// Importa los componentes de PrimeReact y Framer Motion necesarios
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { motion } from "framer-motion";

const DepartamentoFormulario = ({ departamentoInicial = null, onSave, modo = "crear" }) => {
  const router = useRouter(); 
  
  const [departamento, setDepartamento] = useState({
    nombreDepartamento: "",
    descripcionDepartamento: "",
    id: undefined,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

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
    setSuccess(false); // Reiniciar estado de éxito
    setIsLoading(true);

    // Validación básica
    if (!departamento.nombreDepartamento || !departamento.descripcionDepartamento) {
        setError("Todos los campos son obligatorios.");
        setIsLoading(false);
        return;
    }

    try {
      let departamentoId = departamento.id || departamento.idDepartamento;
      const payload = {
        nombreDepartamento: departamento.nombreDepartamento,
        descripcionDepartamento: departamento.descripcionDepartamento,
      };
      
      if (modo === "editar" && departamentoId) {
        await updateDepartamento(departamentoId, { ...payload, id: departamentoId });
        setSuccess(true);
        if (onSave) onSave(); 
        setTimeout(() => {
          // Después de editar, asumimos que quieres volver al listado general de departamentos
          router.push("/dashboard/listado-departamentos"); 
        }, 1200); // 1.2 segundos para que el usuario vea el mensaje
      } else { // Modo "crear"
        await createDepartamento(payload);
        setSuccess(true);
        if (onSave) onSave();
        setTimeout(() => {
          // Después de crear, redirige al listado de departamentos
          router.push("/dashboard/listado-departamentos"); 
        }, 1200); // 1.2 segundos para que el usuario vea el mensaje
      }

    } catch (err) {
      setError(err.message || "Error al guardar el departamento.");
      setSuccess(false); // Asegurarse de que el mensaje de éxito no aparezca
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
            {success && <Message severity="success" text={modo === "editar" ? "Departamento actualizado correctamente!" : "Departamento creado correctamente!"} className="w-full" />}
          </motion.div>
        )}

        <div className="grid grid-cols-1 gap-6">
          <div className="flex flex-col gap-1">
            <label htmlFor="nombreDepartamento" className="font-semibold text-black text-base mb-1">
              Nombre del Departamento
            </label>
            <div className="rounded-xl bg-gray-50 border border-gray-200 px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-indigo-300 transition">
              <InputText
                id="nombreDepartamento"
                name="nombreDepartamento"
                value={departamento.nombreDepartamento}
                onChange={handleChange}
                required
                placeholder="Nombre del departamento"
                className="w-full !text-black bg-transparent"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="descripcionDepartamento" className="font-semibold text-black text-base mb-1">
              Descripción
            </label>
            <div className="rounded-xl bg-gray-50 border border-gray-200 px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-indigo-300 transition">
              <InputText
                id="descripcionDepartamento"
                name="descripcionDepartamento"
                value={departamento.descripcionDepartamento}
                onChange={handleChange}
                required
                placeholder="Descripción del departamento"
                className="w-full !text-black bg-transparent"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mt-8 items-center justify-center">
          <Button
            type="submit"
            label={isLoading ? "Guardando..." : (modo === "editar" ? "Actualizar Departamento" : "Crear Departamento")}
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

export default DepartamentoFormulario;