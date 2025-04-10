import React, { useState } from "react";
import { createEmpleado, updateEmpleado } from "../service/EmpleadoService";

export default function EmpleadoFormulario({ empleado, onSave }) {
  const [formData, setFormData] = useState(
    empleado || {
      nombrePersona: "",
      usuario: "",
      numeroDUI: "",
      numeroTelefono: "",
      correoInstitucional: "",
      fechaNacimiento: "",
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.id) {
      await updateEmpleado(formData.id, formData);
    } else {
      await createEmpleado(formData);
    }
    onSave();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre Persona:</label>
        <input
          type="text"
          name="nombrePersona"
          value={formData.nombrePersona}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Usuario:</label>
        <input
          type="text"
          name="usuario"
          value={formData.usuario}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Número DUI:</label>
        <input
          type="text"
          name="numeroDUI"
          value={formData.numeroDUI}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Número Teléfono:</label>
        <input
          type="text"
          name="numeroTelefono"
          value={formData.numeroTelefono}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Correo Institucional:</label>
        <input
          type="email"
          name="correoInstitucional"
          value={formData.correoInstitucional}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Fecha Nacimiento:</label>
        <input
          type="date"
          name="fechaNacimiento"
          value={formData.fechaNacimiento}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Guardar</button>
    </form>
  );
}