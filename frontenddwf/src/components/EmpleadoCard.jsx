"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { deleteEmpleado } from "@/service/EmpleadoService";

export default function EmpleadoCard({ empleado }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm("¿Estás seguro de eliminar este empleado?")) {
      try {
        const success = await deleteEmpleado(empleado.id);
        if (success) {
          alert("Empleado eliminado exitosamente.");
          router.push("/dashboard/listado-empleados");
        }
      } catch (error) {
        console.error("Error al eliminar empleado:", error);
      }
    }
  };

  const handleEdit = () => {
    router.push(`/dashboard/editar-empleado/${empleado.id}`);
  };

  const handleView = () => {
    router.push(`/dashboard/ver-empleado/${empleado.id}`);
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
        <button onClick={handleView}>Ver</button>
        <button onClick={handleEdit}>Editar</button>
        <button onClick={handleDelete}>Eliminar</button>
      </div>
    </div>
  );
}
