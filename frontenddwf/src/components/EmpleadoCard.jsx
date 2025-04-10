"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { deleteEmpleado } from "@/service/EmpleadoService";

export default function EmpleadoCard({ empleado, onDelete }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!empleado.id) {
      console.error("El ID del empleado es undefined o no válido:", empleado);
      return;
    }

    if (confirm("¿Estás seguro de eliminar este empleado?")) {
      try {
        const success = await deleteEmpleado(empleado.id);
        if (success) {
          alert("Empleado eliminado exitosamente.");
          onDelete(empleado.id); // Notify parent to update the list
        }
      } catch (error) {
        console.error("Error al eliminar empleado:", error);
        alert("Error al eliminar empleado.");
      }
    }
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
        <button onClick={() => router.push(`/dashboard/ver-empleado/${empleado.id}`)}>Ver</button>
        <button onClick={() => router.push(`/dashboard/editar-empleado/${empleado.id}`)}>Editar</button>
        <button onClick={handleDelete}>Eliminar</button>
      </div>
    </div>
  );
}
