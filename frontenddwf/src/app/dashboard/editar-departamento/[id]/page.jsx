"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import DepartamentoFormulario from "@/components/DepartamentoFormulario";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getDepartamentoById, updateDepartamento } from "@/service/DepartamentoService";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Message } from "primereact/message";
import { motion } from "framer-motion";

const EditarDepartamento = () => {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();

  const [departamento, setDepartamento] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nombreDepartamento: "",
    descripcionDepartamento: "",
  });

  useEffect(() => {
    const fetchDepartamento = async () => {
      if (!id) {
        setError("ID de departamento no proporcionado.");
        return;
      }
      setIsLoading(true);
      try {
        const data = await getDepartamentoById(id);
        if (data) {
          setDepartamento(data);
          setForm({
            nombreDepartamento: data.nombreDepartamento || "",
            descripcionDepartamento: data.descripcionDepartamento || "",
          });
          setError("");
        } else {
          setError("Departamento no encontrado.");
        }
      } catch (err) {
        setError(err.message || "Error al obtener el departamento.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchDepartamento();
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
      await updateDepartamento(id, form);
      setSuccess(true);
      setTimeout(() => {
        router.push("/dashboard/listado-departamentos");
      }, 1500);
    } catch (err) {
      setError(err.message || "Error al actualizar el departamento.");
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Header />
        <div className="container my-5">
          <h2>Cargando departamento...</h2>
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
          <h2 className="text-3xl font-extrabold text-center mb-4 text-indigo-700 tracking-tight drop-shadow">
            Editar Departamento
          </h2>
          {error && <Message severity="error" text={error} className="w-full" />}
          {success && <Message severity="success" text="Departamento actualizado" className="w-full" />}

          <div className="grid grid-cols-1 gap-6">
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-black text-base mb-1">Nombre del Departamento</label>
              <div className="rounded-xl bg-gray-50 border border-gray-200 px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-indigo-300 transition">
                <InputText
                  name="nombreDepartamento"
                  value={form.nombreDepartamento}
                  onChange={handleChange}
                  required
                  placeholder="Nombre del departamento"
                  className="w-full !text-black bg-transparent"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-black text-base mb-1">Descripción</label>
              <div className="rounded-xl bg-gray-50 border border-gray-200 px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-indigo-300 transition">
                <InputText
                  name="descripcionDepartamento"
                  value={form.descripcionDepartamento}
                  onChange={handleChange}
                  required
                  placeholder="Descripción del departamento"
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
                background: "#f3f4f6",
              }}
            />
          </div>
        </motion.form>
      </main>
      <Footer />
    </div>
  );
};

export default EditarDepartamento;
