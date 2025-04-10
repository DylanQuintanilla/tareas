"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { deleteContratacion } from "@/service/ContratacioneService";

export default function ContratacionCard({ contratacion, onDelete }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!contratacion.id) {
      console.error("El ID de la contratación es undefined o no válido:", contratacion);
      return;
    }

    if (confirm("¿Estás seguro de eliminar esta contratación?")) {
      try {
        const success = await deleteContratacion(contratacion.id);
        if (success) {
          alert("Contratación eliminada exitosamente.");
          onDelete(contratacion.id); // Notify parent to update the list
        }
      } catch (error) {
        console.error("Error al eliminar contratación:", error);
        alert("Error al eliminar contratación.");
      }
    }
  };

  return (
    <div className="card">
      <h3>Contratación ID: {contratacion.id}</h3>
      <p><strong>Empleado:</strong> {contratacion.idEmpleado}</p>
      <p><strong>Departamento:</strong> {contratacion.idDepartamento}</p>
      <p><strong>Cargo:</strong> {contratacion.idCargo}</p>
      <p><strong>Tipo de Contratación:</strong> {contratacion.idTipoContratacion}</p>
      <p><strong>Fecha de Contratación:</strong> {contratacion.fechaContratacion}</p>
      <p><strong>Salario:</strong> ${contratacion.salario}</p>
      <p><strong>Estado:</strong> {contratacion.estado ? "Activo" : "Inactivo"}</p>
      <div className="button-group">
        <button onClick={() => router.push(`/dashboard/ver-contratacion/${contratacion.id}`)}>Ver</button>
        <button onClick={() => router.push(`/dashboard/editar-contratacion/${contratacion.id}`)}>Editar</button>
        <button onClick={handleDelete}>Eliminar</button>
      </div>
    </div>
  );
}
