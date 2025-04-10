"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { deleteEmpleado } from "@/service/EmpleadoService";

export default function EmpleadoCard({ empleado }) {
  const router = useRouter();
  console.log("Empleado recibido:", empleado);
  console.log("Keys del objeto empleado:", Object.keys(empleado));

  const handleEdit = () => {
    if (empleado.id === undefined) {
      console.error("El ID del empleado es undefined");
      return; // Evita la navegación si no hay ID
    }
    router.push(`/dashboard/editar-empleado/${empleado.id}`);
  };

  // Resto del componente...
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
        <button onClick={handleEdit}>Editar</button>
        <button onClick={async () => {
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
          }}>Eliminar</button>
      </div>
    </div>
  );
}
