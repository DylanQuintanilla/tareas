"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import TipoContratacionFormulario from "@/components/TipoContratacionFormulario";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getTipoContratacionById, updateTipoContratacion } from "@/service/TipoContratacion";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Message } from "primereact/message";
import { motion } from "framer-motion";

const EditarTipoContratacion = () => {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();

  const [tipo, setTipo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    tipoContratacion: "",
  });

  useEffect(() => {
    const fetchTipo = async () => {
      if (!id) {
        setError("ID de tipo de contratación no proporcionado.");
        return;
      }
      setIsLoading(true);
      try {
        const data = await getTipoContratacionById(id);
        if (data) {
          setTipo(data);
          setForm({ tipoContratacion: data.tipoContratacion });
          setError("");
        } else {
          setError("Tipo de contratación no encontrado.");
        }
      } catch (err) {
        setError(err.message || "Error al obtener el tipo de contratación.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchTipo();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      await updateTipoContratacion(id, form);
      setSuccess(true);
      setTimeout(() => {
        router.push("/dashboard/listado-tipos-contratacion");
      }, 1500);
    } catch (err) {
      setError(err.message || "Error al actualizar el tipo de contratación.");
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Header />
        <div className="container my-5">
          <h2>Cargando tipo de contratación...</h2>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Header />
        <div className="container my-5">
          <h2>Error: {error}</h2>
        </div>
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
          className="w-full max-w-xl bg-white/90 rounded-3xl shadow-2xl border border-gray-100 px-6 py-10 flex flex-col gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-extrabold text-center mb-4 text-indigo-700 tracking-tight drop-shadow">Editar Tipo de Contratación</h2>
          {error && <Message severity="error" text={error} className="w-full" />}
          {success && <Message severity="success" text="Tipo de contratación actualizado" className="w-full" />}

          <div className="grid grid-cols-1 gap-6">
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-black text-base mb-1">Tipo de Contratación</label>
              <div className="rounded-xl bg-gray-50 border border-gray-200 px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-indigo-300 transition">
                <InputText
                  name="tipoContratacion"
                  value={form.tipoContratacion}
                  onChange={handleChange}
                  required
                  placeholder="Tipo de contratación"
                  className="w-full !text-black bg-transparent"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4 mt-8 md:flex-row md:justify-center">
            <Button
              type="submit"
              label={loading ? "Actualizando..." : "Actualizar"}
              icon="pi pi-save"
              loading={loading}
              className="w-full md:w-48 p-button-rounded p-button-lg"
              style={{
                background: "linear-gradient(90deg, #7c6cf7, #5a4be7)",
                border: "none",
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

export default EditarTipoContratacion;
