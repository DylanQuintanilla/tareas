// frontenddwf/src/components/EmpleadoFormulario.jsx
"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createEmpleado, updateEmpleado } from "@/service/EmpleadoService";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { motion } from "framer-motion";

// IMPORTANTE: Asegúrate de que las siguientes líneas NO estén aquí.
// Deben estar en tu archivo `frontenddwf/src/app/globals.css` solamente.
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";


const EmpleadoFormulario = ({ empleadoInicial = null, onSave, modo = "crear" }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [empleado, setEmpleado] = useState({
    nombrePersona: "",
    usuario: "",
    numeroDUI: "",
    numeroTelefono: "",
    correoInstitucional: "",
    fechaNacimiento: null, // Inicializa como null para Calendar de PrimeReact
    id: undefined,
  });

  useEffect(() => {
    if (empleadoInicial && Object.keys(empleadoInicial).length > 0) {
      // Para Calendar de PrimeReact, la fecha debe ser un objeto Date o null
      const initialDate = empleadoInicial.fechaNacimiento
        ? new Date(empleadoInicial.fechaNacimiento)
        : null;

      setEmpleado((prev) => ({
        ...prev,
        ...empleadoInicial,
        fechaNacimiento: initialDate,
        id: empleadoInicial.id || empleadoInicial.idEmpleado || prev.id,
      }));
    }
  }, [empleadoInicial]);

  const formatearDUI = (valor) => {
    const soloNumeros = valor.replace(/\D/g, "").slice(0, 9);
    if (soloNumeros.length > 8) {
      return soloNumeros.slice(0, 8) + "-" + soloNumeros.slice(8);
    }
    return soloNumeros;
  };

  const formatearTelefono = (valor) => {
    const soloNumeros = valor.replace(/\D/g, "").slice(0, 8);
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

  const handleDateChange = (e) => {
    setEmpleado((prev) => ({
      ...prev,
      fechaNacimiento: e.value, // e.value ya es un objeto Date o null
    }));
  };

  const validarCampos = () => {
    setError(""); // Limpiar errores antes de validar
    setSuccess(false); // Limpiar éxito también

    // Validar que los campos obligatorios no estén vacíos
    if (!empleado.nombrePersona || !empleado.usuario || !empleado.numeroDUI ||
        !empleado.numeroTelefono || !empleado.correoInstitucional || !empleado.fechaNacimiento) {
      setError("Todos los campos son obligatorios.");
      return false;
    }

    const duiRegex = /^\d{8}-\d{1}$/;
    const telRegex = /^\d{4}-\d{4}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!duiRegex.test(empleado.numeroDUI)) {
      setError("Formato de DUI inválido. Ejemplo: 06371984-6");
      return false;
    }
    if (!telRegex.test(empleado.numeroTelefono)) {
      setError("Formato de teléfono inválido. Ejemplo: 7548-0324");
      return false;
    }
    if (!emailRegex.test(empleado.correoInstitucional)) {
      setError("Formato de correo institucional inválido.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarCampos()) {
      return; // Detener si la validación falla (el error ya se estableció)
    }
    setIsLoading(true);

    // Asegurarse de enviar la fecha en formato de cadena ISO 8601 (YYYY-MM-DD)
    const empleadoToSave = {
      ...empleado,
      fechaNacimiento: empleado.fechaNacimiento
        ? empleado.fechaNacimiento.toISOString().split('T')[0]
        : null,
    };

    try {
      let empleadoId = empleado.id ?? empleado.idEmpleado;
      if (modo === "editar") {
        if (!empleadoId) {
          setError("No se encontró el ID del empleado para actualizar.");
          setIsLoading(false);
          return;
        }
        const data = await updateEmpleado(empleadoId, { ...empleadoToSave, id: empleadoId });
        setSuccess(true);
        if (onSave) onSave();
        setTimeout(() => {
          router.push("/dashboard/ver-empleado/" + (data.id ?? empleadoId));
        }, 1200);
      } else {
        await createEmpleado(empleadoToSave);
        setSuccess(true);
        if (onSave) onSave();
        setTimeout(() => {
          router.push("/dashboard/listado-empleados");
        }, 1200);
      }
    } catch (err) {
      setError(err.message || "Error al guardar los datos del empleado. Intenta de nuevo.");
      setSuccess(false); // Asegúrate de que el mensaje de éxito no aparezca si hay error
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
            {success && <Message severity="success" text={modo === "editar" ? "Empleado actualizado correctamente!" : "Empleado creado correctamente!"} className="w-full" />}
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-1">
            <label htmlFor="nombrePersona" className="font-semibold text-black text-base mb-1">
              Nombre Persona
            </label>
            <div className="rounded-xl bg-gray-50 border border-gray-200 px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-indigo-300 transition">
              <InputText
                id="nombrePersona"
                name="nombrePersona"
                value={empleado.nombrePersona || ''}
                onChange={handleChange}
                required
                placeholder="Nombre completo"
                className="w-full !text-black bg-transparent"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="usuario" className="font-semibold text-black text-base mb-1">
              Usuario
            </label>
            <div className="rounded-xl bg-gray-50 border border-gray-200 px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-indigo-300 transition">
              <InputText
                id="usuario"
                name="usuario"
                value={empleado.usuario || ''}
                onChange={handleChange}
                required
                placeholder="Nombre de usuario"
                className="w-full !text-black bg-transparent"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="numeroDUI" className="font-semibold text-black text-base mb-1">
              Número DUI
            </label>
            <div className="rounded-xl bg-gray-50 border border-gray-200 px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-indigo-300 transition">
              <InputText
                id="numeroDUI"
                name="numeroDUI"
                value={empleado.numeroDUI || ''}
                onChange={handleChange}
                required
                placeholder="Ej: 06371984-6"
                maxLength={10}
                className="w-full !text-black bg-transparent"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="numeroTelefono" className="font-semibold text-black text-base mb-1">
              Número Teléfono
            </label>
            <div className="rounded-xl bg-gray-50 border border-gray-200 px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-indigo-300 transition">
              <InputText
                id="numeroTelefono"
                name="numeroTelefono"
                value={empleado.numeroTelefono || ''}
                onChange={handleChange}
                required
                placeholder="Ej: 7548-0324"
                maxLength={9}
                className="w-full !text-black bg-transparent"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1 md:col-span-2">
            <label htmlFor="correoInstitucional" className="font-semibold text-black text-base mb-1">
              Correo Institucional
            </label>
            <div className="rounded-xl bg-gray-50 border border-gray-200 px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-indigo-300 transition">
              <InputText
                id="correoInstitucional"
                name="correoInstitucional"
                value={empleado.correoInstitucional || ''}
                onChange={handleChange}
                required
                placeholder="ejemplo@correo.com"
                type="email"
                className="w-full !text-black bg-transparent"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1 md:col-span-2">
            <label htmlFor="fechaNacimiento" className="font-semibold text-black text-base mb-1">
              Fecha Nacimiento
            </label>
            <div className="rounded-xl bg-gray-50 border border-gray-200 px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-indigo-300 transition">
              <Calendar
                id="fechaNacimiento"
                name="fechaNacimiento"
                value={empleado.fechaNacimiento}
                onChange={handleDateChange}
                dateFormat="yy-mm-dd"
                showIcon
                placeholder="Seleccione la fecha"
                required
                className="w-full !text-black bg-transparent"
                inputClassName="!text-black"
                panelClassName="!bg-white !text-black"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mt-8 items-center justify-center">
          <Button
            type="submit"
            label={isLoading ? "Guardando..." : (modo === "editar" ? "Actualizar Empleado" : "Crear Empleado")}
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

export default EmpleadoFormulario;