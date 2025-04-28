import React, { useState, useEffect } from 'react';
import { obtenerCargos } from '../service/CargosServices';
import { obtenerTiposContratacion } from '../service/TipoContratacion';
import { obtenerDepartamentos } from '../service/DepartamentoService';
import { obtenerEmpleados } from '../service/EmpleadoService';

const FormularioContratacion = () => {
  const [idCargo, setIdCargo] = useState(null);
  const [idTipoContratacion, setIdTipoContratacion] = useState(null);
  const [idDepartamento, setIdDepartamento] = useState(1);
  const [idEmpleado, setIdEmpleado] = useState(1);
  const [salario, setSalario] = useState('');
  const [fechaContratacion, setFechaContratacion] = useState('2025-04-21');
  const [estado, setEstado] = useState(true);

  const [cargos, setCargos] = useState([]);
  const [tiposContratacion, setTiposContratacion] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [empleados, setEmpleados] = useState([]);

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
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      idDepartamento,
      idEmpleado,
      idCargo,
      idTipoContratacion,
      fechaContratacion,
      estado,
      salario,
    };

    console.log('Payload a enviar:', payload);

    try {
      const response = await fetch('http://localhost:8080/contrataciones', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Error al guardar la contratación: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Contratación guardada exitosamente:', data);
      alert('Contratación guardada exitosamente.');
    } catch (error) {
      console.error('Error al guardar la contratación:', error.message);
      alert('Error al guardar la contratación.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="cargo">Cargo</label>
        <select
          id="cargo"
          value={idCargo || ''}
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
          value={idTipoContratacion || ''}
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
          value={idDepartamento || ''}
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
          value={idEmpleado || ''}
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
          value={estado}
          onChange={(e) => setEstado(e.target.value === 'true')}
        >
          <option value="true">Activo</option>
          <option value="false">Inactivo</option>
        </select>
      </div>
      <button type="submit">Enviar</button>
    </form>
  );
};

export default FormularioContratacion;
