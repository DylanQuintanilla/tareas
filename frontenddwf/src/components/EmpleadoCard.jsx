"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { deleteEmpleado } from "@/service/EmpleadoService";

export default function EmpleadoCard({ empleado, onDelete }) {
  const router = useRouter();

  const handleDelete = async (id) => {
    try {
      await deleteEmpleado(id);
      onDelete(id); // Notify parent to update the list
    } catch (error) {
      console.error("Error deleting empleado:", error);
    }
  };

  const handleEdit = (id) => {
    router.push(`/dashboard/editar-empleado/${id}`);
  };

  const handleView = (id) => {
    router.push(`/dashboard/ver-empleado/${id}`);
  };

  return (
    <div className="card">
      <h3>{empleado.nombrePersona}</h3>
      <p>Usuario: {empleado.usuario}</p>
      <p>DUI: {empleado.numeroDUI}</p>
      <p>Teléfono: {empleado.numeroTelefono}</p>
      <p>Correo: {empleado.correoInstitucional}</p>
      <p>Fecha Nacimiento: {empleado.fechaNacimiento}</p>
      <div className="button-group">
        <button onClick={() => handleView(empleado.id)}>Ver</button>
        <button onClick={() => handleEdit(empleado.id)}>Editar</button>
        <button onClick={() => handleDelete(empleado.id)}>Eliminar</button>
      </div>
    </div>
  );
}
