import React, { useState, useEffect } from 'react';
import { obtenerCargos } from '../service/CargosServices';
import { obtenerTiposContratacion } from '../service/TipoContratacion';
import { obtenerDepartamentos } from '../service/DepartamentoService';
import { obtenerEmpleados } from '../service/EmpleadoService';
import { createContratacion, updateContratacion } from '../service/ContratacioneService';
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { motion } from "framer-motion";

const ContratacionFormulario = ({
  contratacionInicial = null,
  onSave,
  modo = "crear",
  isLoading: isLoadingProp = false,
}) => {
  const [idCargo, setIdCargo] = useState("");
  const [idTipoContratacion, setIdTipoContratacion] = useState("");
  const [idDepartamento, setIdDepartamento] = useState("");
  const [idEmpleado, setIdEmpleado] = useState("");
  const [salario, setSalario] = useState('');
  const [fechaContratacion, setFechaContratacion] = useState(null);
  const [estado, setEstado] = useState(true);

  const [cargos, setCargos] = useState([]);
  const [tiposContratacion, setTiposContratacion] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [isLoading, setIsLoading] = useState(isLoadingProp);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (contratacionInicial) {
      setIdCargo(contratacionInicial.idCargo ?? "");
      setIdTipoContratacion(contratacionInicial.idTipoContratacion ?? "");
      setIdDepartamento(contratacionInicial.idDepartamento ?? "");
      setIdEmpleado(contratacionInicial.idEmpleado ?? "");
      setSalario(contratacionInicial.salario ?? "");
      setFechaContratacion(
        contratacionInicial.fechaContratacion
          ? new Date(contratacionInicial.fechaContratacion)
          : null
      );
      setEstado(
        typeof contratacionInicial.estado === "boolean"
          ? contratacionInicial.estado
          : contratacionInicial.estado === "true"
      );
    }
  }, [contratacionInicial]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cargosData = await obtenerCargos();
        const tiposContratacionData = await obtenerTiposContratacion();
        const departamentosData = await obtenerDepartamentos();
        const empleadosData = await obtenerEmpleados();

        setCargos(cargosData);
        setTiposContratacion(tiposContratacionData);
        setDepartamentos(departamentosData);
        setEmpleados(empleadosData);
      } catch (error) {
        setError('Error fetching data: ' + error.message);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setIsLoading(true);

    if (!idCargo || !idTipoContratacion || !idDepartamento || !idEmpleado || !salario || !fechaContratacion) {
      setError("Todos los campos son obligatorios.");
      setIsLoading(false);
      return;
    }

    const payload = {
      idDepartamento,
      idEmpleado,
      idCargo,
      idTipoContratacion,
      fechaContratacion: fechaContratacion ? fechaContratacion.toISOString().split("T")[0] : "",
      estado,
      salario,
    };

    try {
      if (modo === "editar" && contratacionInicial && (contratacionInicial.id || contratacionInicial.idContratacion)) {
        const idUpdate = contratacionInicial.id || contratacionInicial.idContratacion;
        await updateContratacion(idUpdate, payload);
      } else {
        await createContratacion(payload);
      }
      setSuccess(true);
      if (onSave) onSave();
    } catch (error) {
      setError(error.message || "Error al guardar la contratación.");
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
            {success && <Message severity="success" text={modo === "editar" ? "Contratación actualizada correctamente!" : "Contratación creada correctamente!"} className="w-full" />}
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-black text-base mb-1">Cargo</label>
            <Dropdown
              value={idCargo}
              options={cargos.map(c => ({ label: c.cargo, value: c.idCargo }))}
              onChange={e => setIdCargo(e.value)}
              placeholder="Seleccione un cargo"
              className="w-full !text-black bg-transparent rounded-xl bg-gray-50 border border-gray-200 px-3 py-2 shadow-sm"
              panelClassName="!bg-white !text-black"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-black text-base mb-1">Tipo de Contratación</label>
            <Dropdown
              value={idTipoContratacion}
              options={tiposContratacion.map(t => ({ label: t.tipoContratacion, value: t.idTipoContratacion }))}
              onChange={e => setIdTipoContratacion(e.value)}
              placeholder="Seleccione un tipo"
              className="w-full !text-black bg-transparent rounded-xl bg-gray-50 border border-gray-200 px-3 py-2 shadow-sm"
              panelClassName="!bg-white !text-black"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-black text-base mb-1">Departamento</label>
            <Dropdown
              value={idDepartamento}
              options={departamentos.map(d => ({ label: d.nombreDepartamento, value: d.idDepartamento }))}
              onChange={e => setIdDepartamento(e.value)}
              placeholder="Seleccione un departamento"
              className="w-full !text-black bg-transparent rounded-xl bg-gray-50 border border-gray-200 px-3 py-2 shadow-sm"
              panelClassName="!bg-white !text-black"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-black text-base mb-1">Empleado</label>
            <Dropdown
              value={idEmpleado}
              options={empleados.map(e => ({ label: e.nombrePersona, value: e.idEmpleado }))}
              onChange={e => setIdEmpleado(e.value)}
              placeholder="Seleccione un empleado"
              className="w-full !text-black bg-transparent rounded-xl bg-gray-50 border border-gray-200 px-3 py-2 shadow-sm"
              panelClassName="!bg-white !text-black"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-black text-base mb-1">Salario</label>
            <div className="rounded-xl bg-gray-50 border border-gray-200 px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-indigo-300 transition">
              <InputText
                name="salario"
                value={salario}
                onChange={e => setSalario(e.target.value)}
                required
                placeholder="Salario"
                type="number"
                className="w-full !text-black bg-transparent"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-black text-base mb-1">Fecha de Contratación</label>
            <div className="rounded-xl bg-gray-50 border border-gray-200 px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-indigo-300 transition">
              <Calendar
                value={fechaContratacion}
                onChange={e => setFechaContratacion(e.value)}
                dateFormat="yy-mm-dd"
                showIcon
                placeholder="Seleccione la fecha"
                required
                className="w-full !text-black bg-transparent"
                panelClassName="!bg-white !text-black"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1 md:col-span-2">
            <label className="font-semibold text-black text-base mb-1">Estado</label>
            <Dropdown
              value={estado}
              options={[
                { label: "Activo", value: true },
                { label: "Inactivo", value: false },
              ]}
              onChange={e => setEstado(e.value)}
              placeholder="Seleccione estado"
              className="w-full !text-black bg-transparent rounded-xl bg-gray-50 border border-gray-200 px-3 py-2 shadow-sm"
              panelClassName="!bg-white !text-black"
              required
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mt-8 items-center justify-center">
          <Button
            type="submit"
            label={isLoading ? "Guardando..." : (modo === "editar" ? "Actualizar Contratación" : "Crear Contratación")}
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
            onClick={() => window.history.back()}
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

export default ContratacionFormulario;
