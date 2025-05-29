"use client";
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from "next/navigation";
import { getEmpleadoById, updateEmpleado } from "@/service/EmpleadoService";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { motion } from "framer-motion";

const EditarEmpleado = () => {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();

  const [form, setForm] = useState({
    nombrePersona: "",
    usuario: "",
    numeroDUI: "",
    numeroTelefono: "",
    correoInstitucional: "",
    fechaNacimiento: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchEmpleado = async () => {
      if (!id || id === "undefined" || id === "") {
        setError("ID de empleado no proporcionado.");
        return;
      }
      try {
        setIsLoading(true);
        const data = await getEmpleadoById(id);
        if (data) {
          setForm({
            nombrePersona: data.nombrePersona || "",
            usuario: data.usuario || "",
            numeroDUI: data.numeroDUI || "",
            numeroTelefono: data.numeroTelefono || "",
            correoInstitucional: data.correoInstitucional || "",
            fechaNacimiento: data.fechaNacimiento ? new Date(data.fechaNacimiento) : null,
          });
          setError("");
        } else {
          setForm({
            nombrePersona: "",
            usuario: "",
            numeroDUI: "",
            numeroTelefono: "",
            correoInstitucional: "",
            fechaNacimiento: "",
          });
          setError("");
        }
      } catch (err) {
        setError(err.message || "Error al obtener el empleado.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchEmpleado();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (e) => {
    setForm((prev) => ({
      ...prev,
      fechaNacimiento: e.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess(false);
    try {
      const empleadoId = id;
      const payload = {
        ...form,
        fechaNacimiento: form.fechaNacimiento
          ? form.fechaNacimiento instanceof Date
            ? form.fechaNacimiento.toISOString().split("T")[0]
            : form.fechaNacimiento
          : "",
      };
      const data = await updateEmpleado(empleadoId, payload);
      setSuccess(true);
      setTimeout(() => router.push(`/dashboard/ver-empleado/${data.id ?? data.idEmpleado}`), 1200);
    } catch (err) {
      setError(err.message || "Error al actualizar empleado.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-100 via-purple-100 to-blue-100">
        <Header />
        <main className="flex flex-1 items-center justify-center py-12">
          <div className="w-full max-w-xl bg-white/90 rounded-3xl shadow-2xl border border-gray-100 px-12 py-12 flex flex-col gap-8">
            <h2 className="text-3xl font-extrabold text-center mb-4 text-indigo-700 tracking-tight drop-shadow">
              Editar Empleado
            </h2>
            <p className="text-center text-lg">Cargando empleado...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error && error !== "ID de empleado no proporcionado.") {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-100 via-purple-100 to-blue-100">
        <Header />
        <main className="flex flex-1 items-center justify-center py-12">
          <div className="w-full max-w-xl bg-white/90 rounded-3xl shadow-2xl border border-gray-100 px-12 py-12 flex flex-col gap-8">
            <h2 className="text-3xl font-extrabold text-center mb-4 text-indigo-700 tracking-tight drop-shadow">
              Editar Empleado
            </h2>
            <Message severity="error" text={error} className="w-full" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-100 via-purple-100 to-blue-100">
      <Header />
      <main className="flex flex-1 items-center justify-center py-12">
        <motion.form
          onSubmit={handleSubmit}
          className="w-full max-w-xl bg-white/90 rounded-3xl shadow-2xl border border-gray-100 px-12 py-12 flex flex-col gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-extrabold text-center mb-4 text-black tracking-tight drop-shadow">
            Editar Empleado
          </h2>
          {error && <Message severity="error" text={error} className="w-full" />}
          {success && <Message severity="success" text="Empleado actualizado" className="w-full" />}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-black text-base mb-1">Nombre Persona</label>
              <div className="rounded-xl bg-gray-50 border border-gray-200 px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-indigo-300 transition">
                <InputText
                  name="nombrePersona"
                  value={form.nombrePersona}
                  onChange={handleChange}
                  required
                  placeholder="Nombre"
                  className="w-full !text-black bg-transparent"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-black text-base mb-1">Usuario</label>
              <div className="rounded-xl bg-gray-50 border border-gray-200 px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-indigo-300 transition">
                <InputText
                  name="usuario"
                  value={form.usuario}
                  onChange={handleChange}
                  required
                  placeholder="Usuario"
                  className="w-full !text-black bg-transparent"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-black text-base mb-1">Número DUI</label>
              <div className="rounded-xl bg-gray-50 border border-gray-200 px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-indigo-300 transition">
                <InputText
                  name="numeroDUI"
                  value={form.numeroDUI}
                  onChange={handleChange}
                  required
                  placeholder="06871985-7"
                  className="w-full !text-black bg-transparent"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-black text-base mb-1">Número Teléfono</label>
              <div className="rounded-xl bg-gray-50 border border-gray-200 px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-indigo-300 transition">
                <InputText
                  name="numeroTelefono"
                  value={form.numeroTelefono}
                  onChange={handleChange}
                  required
                  placeholder="7070-7070"
                  className="w-full !text-black bg-transparent"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1 md:col-span-2">
              <label className="font-semibold text-black text-base mb-1">Correo Institucional</label>
              <div className="rounded-xl bg-gray-50 border border-gray-200 px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-indigo-300 transition">
                <InputText
                  name="correoInstitucional"
                  value={form.correoInstitucional}
                  onChange={handleChange}
                  required
                  placeholder="ejemplo@correo.com"
                  className="w-full !text-black bg-transparent"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1 md:col-span-2">
              <label className="font-semibold text-black text-base mb-1">Fecha Nacimiento</label>
              <div className="rounded-xl bg-gray-50 border border-gray-200 px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-indigo-300 transition">
                <Calendar
                  value={form.fechaNacimiento ? new Date(form.fechaNacimiento) : null}
                  onChange={handleDateChange}
                  dateFormat="yy-mm-dd"
                  showIcon
                  className="w-full !text-black bg-transparent"
                  placeholder="Seleccione la fecha"
                  required
                  panelClassName="!bg-white !text-black"
                  inputClassName="!text-black"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4 mt-8 items-center justify-center">
            <Button
              type="submit"
              label="Actualizar"
              icon="pi pi-save"
              className="w-full md:w-48 p-button-rounded p-button-lg"
              style={{
                background: "linear-gradient(90deg, #7c6cf7, #5a4be7)",
                border: "none",
                color: "#23213a",
              }}
            />
            <Button
              type="button"
              label="Atrás"
              icon="pi pi-arrow-left"
              className="w-full md:w-48 p-button-secondary p-button-text"
              onClick={() => router.back()}
              style={{
                color: "#23213a",
                fontWeight: 600,
                border: "1px solid #e0e0e0",
                background: "#f3f4f6"
              }}
            />
          </div>
        </motion.form>
      </main>
      <Footer />
    </div>
  );
};

export default EditarEmpleado;
