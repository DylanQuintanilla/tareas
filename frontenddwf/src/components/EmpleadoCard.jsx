"use client";
import React, { useState } from "react";
import Link from "next/link";
import { deleteEmpleado } from "@/service/EmpleadoService";
import { useRouter } from "next/navigation";

const EmpleadoCard = ({ empleado }) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (e) => {
    e.preventDefault();
    if (confirm("¿Estás seguro de eliminar este empleado?")) {
      setIsDeleting(true);
      try {
        await deleteEmpleado(empleado.id);
        alert("Empleado eliminado correctamente.");
        router.refresh(); // Refresh the page to update the list of employees
      } catch (err) {
        console.error("Error al eliminar el empleado:", err);
        alert("Hubo un error al intentar eliminar el empleado.");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="empleado-card">
      <h3>{empleado.nombre} {empleado.apellido}</h3>
      <p><strong>Email:</strong> {empleado.email}</p>
      <p><strong>Cargo:</strong> {empleado.cargo}</p>
      <p><strong>Fecha de Ingreso:</strong> {empleado.fechaIngreso}</p>
      <div className="card-actions" style={{ marginTop: "1rem", display: "flex", gap: "1rem", justifyContent: "center" }}>
        <Link href={`/dashboard/editar-empleado/${empleado.id}`}>
          <button className="action-button">Editar</button>
        </Link>
        <button className="action-button" onClick={handleDelete} disabled={isDeleting}>
          {isDeleting ? "Eliminando..." : "Eliminar"}
        </button>
      </div>
    </div>
  );
};

export default EmpleadoCard;
