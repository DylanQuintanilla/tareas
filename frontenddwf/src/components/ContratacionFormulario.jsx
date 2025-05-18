import React, { useState, useEffect } from 'react';
import { obtenerCargos } from '../service/CargosServices';
import { obtenerTiposContratacion } from '../service/TipoContratacion';
import { obtenerDepartamentos } from '../service/DepartamentoService';
import { obtenerEmpleados } from '../service/EmpleadoService';
import { createContratacion, updateContratacion } from '../service/ContratacioneService';

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
  const [fechaContratacion, setFechaContratacion] = useState('');
  const [estado, setEstado] = useState(true);

  const [cargos, setCargos] = useState([]);
  const [tiposContratacion, setTiposContratacion] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [isLoading, setIsLoading] = useState(isLoadingProp);
  const [error, setError] = useState("");

  useEffect(() => {
    if (contratacionInicial) {
      setIdCargo(contratacionInicial.idCargo ?? "");
      setIdTipoContratacion(contratacionInicial.idTipoContratacion ?? "");
      setIdDepartamento(contratacionInicial.idDepartamento ?? "");
      setIdEmpleado(contratacionInicial.idEmpleado ?? "");
      setSalario(contratacionInicial.salario ?? "");
      setFechaContratacion(contratacionInicial.fechaContratacion ?? "");
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
    setIsLoading(true);

    const payload = {
      idDepartamento,
      idEmpleado,
      idCargo,
      idTipoContratacion,
      fechaContratacion,
      estado,
      salario,
    };

    try {
      // Diferencia entre crear y editar
      if (modo === "editar" && contratacionInicial && (contratacionInicial.id || contratacionInicial.idContratacion)) {
        const idUpdate = contratacionInicial.id || contratacionInicial.idContratacion;
        await updateContratacion(idUpdate, payload);
      } else {
        await createContratacion(payload);
      }
      if (onSave) onSave();
    } catch (error) {
      setError(error.message || "Error al guardar la contratación.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <label htmlFor="cargo">Cargo</label>
        <select
          id="cargo"
          value={idCargo}
          onChange={(e) => setIdCargo(e.target.value)}
        >
          <option value="">Seleccione un cargo</option>
          {cargos.map((cargo) => (
            <option key={cargo.idCargo} value={cargo.idCargo}>
              {cargo.cargo}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="tipoContratacion">Tipo de Contratación</label>
        <select
          id="tipoContratacion"
          value={idTipoContratacion}
          onChange={(e) => setIdTipoContratacion(e.target.value)}
        >
          <option value="">Seleccione un tipo de contratación</option>
          {tiposContratacion.map((tipo) => (
            <option key={tipo.idTipoContratacion} value={tipo.idTipoContratacion}>
              {tipo.tipoContratacion}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="departamento">Departamento</label>
        <select
          id="departamento"
          value={idDepartamento}
          onChange={(e) => setIdDepartamento(e.target.value)}
        >
          <option value="">Seleccione un departamento</option>
          {departamentos.map((departamento) => (
            <option key={departamento.idDepartamento} value={departamento.idDepartamento}>
              {departamento.nombreDepartamento}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="empleado">Empleado</label>
        <select
          id="empleado"
          value={idEmpleado}
          onChange={(e) => setIdEmpleado(e.target.value)}
        >
          <option value="">Seleccione un empleado</option>
          {empleados.map((empleado) => (
            <option key={empleado.idEmpleado} value={empleado.idEmpleado}>
              {empleado.nombrePersona}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="salario">Salario</label>
        <input
          type="number"
          id="salario"
          value={salario}
          onChange={(e) => setSalario(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="fechaContratacion">Fecha de Contratación</label>
        <input
          type="date"
          id="fechaContratacion"
          value={fechaContratacion}
          onChange={(e) => setFechaContratacion(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="estado">Estado</label>
        <select
          id="estado"
          value={estado ? "true" : "false"}
          onChange={(e) => setEstado(e.target.value === 'true')}
        >
          <option value="true">Activo</option>
          <option value="false">Inactivo</option>
        </select>
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Guardando..." : modo === "editar" ? "Actualizar" : "Crear"}
      </button>
    </form>
  );
};

export default ContratacionFormulario;
