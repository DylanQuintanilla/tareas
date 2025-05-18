"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { deleteContratacion } from "@/service/ContratacioneService";

export default function ContratacionCard({
  id,
  nombreDepartamento,
  nombreEmpleado,
  nombreCargo,
  nombreTipoContratacion,
  fechaContratacion,
  salario,
  estado,
  onDelete,
}) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!id) {
      console.error("El ID de la contratación es undefined o no válido.");
      alert("No se puede eliminar esta contratación porque el ID no es válido.");
      return;
    }
  
    if (confirm("¿Estás seguro de eliminar esta contratación?")) {
      try {
        const success = await deleteContratacion(id);
        if (success) {
          alert("Contratación eliminada exitosamente.");
          onDelete(id);
        }
      } catch (error) {
        console.error("Error al eliminar contratación:", error);
        alert("Error al eliminar contratación.");
      }
    }
  };

  return (
    <div className="card">
      <h3>{nombreEmpleado || "No disponible"}</h3>
      <p><strong>Departamento:</strong> {nombreDepartamento || "No disponible"}</p>
      <p><strong>Cargo:</strong> {nombreCargo || "No disponible"}</p>
      <p><strong>Tipo de Contratación:</strong> {nombreTipoContratacion || "No disponible"}</p>
      <p><strong>Fecha de Contratación:</strong> {fechaContratacion || "No disponible"}</p>
      <p><strong>Salario:</strong> ${salario || "No disponible"}</p>
      <p><strong>Estado:</strong> {estado ? "Activo" : "Inactivo"}</p>
      <div className="button-group">
        <button onClick={() => router.push(`/dashboard/editar-contratacion/${id}`)}>
          Editar
        </button>
        <button onClick={handleDelete}>
          Eliminar
        </button>
      </div>
    </div>
  );
}

