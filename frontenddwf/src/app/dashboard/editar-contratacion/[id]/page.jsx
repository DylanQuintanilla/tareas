"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getContratacionById, updateContratacion } from "@/service/ContratacioneService";
import { getDepartamentos } from "@/service/DepartamentoService";
import { getEmpleados } from "@/service/EmpleadoService";
import { getCargos } from "@/service/CargosServices";
import { getTiposContratacion } from "@/service/TipoContratacion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Message } from "primereact/message";
import { motion } from "framer-motion";

const EditarContratacion = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [form, setForm] = useState({
    idDepartamento: "",
    idEmpleado: "",
    idCargo: "",
    idTipoContratacion: "",
    fechaContratacion: "",
    salario: "",
    estado: true,
  });
  const [departamentos, setDepartamentos] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [cargos, setCargos] = useState([]);
  const [tiposContratacion, setTiposContratacion] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // Cargar datos iniciales
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          contratacion,
          departamentosData,
          empleadosData,
          cargosData,
          tiposData,
        ] = await Promise.all([
          getContratacionById(id),
          getDepartamentos(),
          getEmpleados(),
          getCargos(),
          getTiposContratacion(),
        ]);
        setForm({
          idDepartamento: contratacion.idDepartamento,
          idEmpleado: contratacion.idEmpleado,
          idCargo: contratacion.idCargo,
          idTipoContratacion: contratacion.idTipoContratacion,
          fechaContratacion: contratacion.fechaContratacion,
          salario: contratacion.salario,
          estado: contratacion.estado,
        });
        setDepartamentos(departamentosData);
        setEmpleados(empleadosData);
        setCargos(cargosData);
        setTiposContratacion(tiposData);
      } catch (e) {
        setError("No se pudieron cargar los datos.");
      }
    };
    if (id) fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target || {};
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleDropdownChange = (name, value) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (e) => {
    setForm((prev) => ({
      ...prev,
      fechaContratacion: e.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);
    try {
      const updated = await updateContratacion(id, {
        ...form,
        salario: Number(form.salario),
      });
      if (updated) {
        setSuccess(true);
        setTimeout(() => router.push("/dashboard/listado-contrataciones"), 1200);
      } else {
        setError("No se pudo actualizar la contratación.");
      }
    } catch (err) {
      setError("Error al actualizar la contratación.");
    } finally {
      setLoading(false);
    }
  };

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
          <h2 className="text-3xl font-extrabold text-center mb-4 text-indigo-700 tracking-tight drop-shadow">Editar Contratación</h2>
          {error && <Message severity="error" text={error} className="w-full" />}
          {success && <Message severity="success" text="Contratación actualizada" className="w-full" />}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Cargo */}
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-black text-base mb-1">Cargo</label>
              <div className="rounded-xl bg-gray-50 border border-gray-200 px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-indigo-300 transition">
                <Dropdown
                  value={form.idCargo}
                  options={cargos.map(c => ({ label: c.cargo, value: c.idCargo }))}
                  onChange={e => handleDropdownChange("idCargo", e.value)}
                  placeholder="Seleccione un cargo"
                  className="w-full text-black bg-transparent"
                  showClear
                  required
                  panelClassName="!bg-white !text-black"
                  dropdownIcon="pi pi-chevron-down"
                  clearIcon="pi pi-times text-red-500"
                />
              </div>
            </div>
            {/* Tipo de Contratación */}
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-black text-base mb-1">Tipo de Contratación</label>
              <div className="rounded-xl bg-gray-50 border border-gray-200 px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-indigo-300 transition">
                <Dropdown
                  value={form.idTipoContratacion}
                  options={tiposContratacion.map(t => ({ label: t.tipoContratacion, value: t.idTipoContratacion }))}
                  onChange={e => handleDropdownChange("idTipoContratacion", e.value)}
                  placeholder="Seleccione un tipo"
                  className="w-full text-black bg-transparent"
                  showClear
                  required
                  panelClassName="!bg-white !text-black"
                  dropdownIcon="pi pi-chevron-down"
                  clearIcon="pi pi-times text-red-500"
                />
              </div>
            </div>
            {/* Departamento */}
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-black text-base mb-1">Departamento</label>
              <div className="rounded-xl bg-gray-50 border border-gray-200 px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-indigo-300 transition">
                <Dropdown
                  value={form.idDepartamento}
                  options={departamentos.map(d => ({ label: d.nombreDepartamento, value: d.idDepartamento }))}
                  onChange={e => handleDropdownChange("idDepartamento", e.value)}
                  placeholder="Seleccione un departamento"
                  className="w-full text-black bg-transparent"
                  showClear
                  required
                  panelClassName="!bg-white !text-black"
                  dropdownIcon="pi pi-chevron-down"
                  clearIcon="pi pi-times text-red-500"
                />
              </div>
            </div>
            {/* Empleado */}
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-black text-base mb-1">Empleado</label>
              <div className="rounded-xl bg-gray-50 border border-gray-200 px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-indigo-300 transition">
                <Dropdown
                  value={form.idEmpleado}
                  options={empleados.map(e => ({ label: e.nombrePersona, value: e.idEmpleado }))}
                  onChange={e => handleDropdownChange("idEmpleado", e.value)}
                  placeholder="Seleccione un empleado"
                  className="w-full text-black bg-transparent"
                  showClear
                  required
                  filter
                  filterPlaceholder="Buscar empleado"
                  panelClassName="!bg-white !text-black"
                  optionLabel="label"
                  optionValue="value"
                  dropdownIcon="pi pi-chevron-down"
                  clearIcon="pi pi-times text-red-500"
                />
              </div>
            </div>
            {/* Salario */}
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-black text-base mb-1">Salario</label>
              <div className="rounded-xl bg-gray-50 border border-gray-200 px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-indigo-300 transition">
                <InputText
                  name="salario"
                  value={form.salario}
                  onChange={handleChange}
                  required
                  placeholder="Salario"
                  className="w-full !text-black bg-transparent"
                  type="number"
                  min={0}
                />
              </div>
            </div>
            {/* Fecha de Contratación */}
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-black text-base mb-1">Fecha de Contratación</label>
              <div className="rounded-xl bg-gray-50 border border-gray-200 px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-indigo-300 transition">
                <Calendar
                  value={form.fechaContratacion ? new Date(form.fechaContratacion) : null}
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
            {/* Estado */}
            <div className="flex flex-col gap-1 md:col-span-2">
              <label className="font-semibold text-black text-base mb-1">Estado</label>
              <div className="rounded-xl bg-gray-50 border border-gray-200 px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-indigo-300 transition">
                <Dropdown
                  value={form.estado}
                  options={[
                    { label: "Activo", value: true },
                    { label: "Inactivo", value: false },
                  ]}
                  onChange={e => handleDropdownChange("estado", e.value)}
                  className="w-full text-black bg-transparent"
                  required
                  panelClassName="!bg-white !text-black"
                  dropdownIcon="pi pi-chevron-down"
                  clearIcon="pi pi-times text-red-500"
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

export default EditarContratacion;
