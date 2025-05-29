"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { deleteEmpleado } from "@/service/EmpleadoService";
import { Button } from "primereact/button";
import { motion } from "framer-motion";

function EmpleadoCard({ empleado, onDelete, canDelete, showConfirmDialog }) {
  const router = useRouter();

  const handleDelete = async () => {
    const empleadoId = empleado.id || empleado.idEmpleado;
    if (!empleadoId) {
      alert("ID de empleado no válido.");
      return;
    }
    if (showConfirmDialog) {
      showConfirmDialog({
        message: "¿Estás seguro de eliminar este empleado?",
        header: "Confirmación de Eliminación",
        icon: "pi pi-exclamation-triangle",
        acceptClassName: "p-button-danger",
        acceptLabel: "Sí, eliminar",
        rejectLabel: "No, cancelar",
        accept: async () => {
          try {
            // Manejo robusto de error: si la respuesta no es JSON, muestra mensaje genérico
            await deleteEmpleado(empleadoId);
            alert("Empleado eliminado exitosamente.");
            onDelete(empleadoId);
          } catch (error) {
            alert("Error al eliminar empleado.");
          }
        },
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-100 group min-w-[320px] max-w-lg"
    >
      <div className="p-6 md:p-8 flex flex-col gap-5">
        <h3 className="text-2xl md:text-3xl font-extrabold text-indigo-800 leading-tight">
          {empleado.nombrePersona}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-gray-700 text-base">
          <p className="flex items-center gap-2">
            <i className="pi pi-user text-indigo-500 text-lg"></i>
            <span className="font-medium">Usuario:</span> {empleado.usuario}
          </p>
          <p className="flex items-center gap-2">
            <i className="pi pi-id-card text-indigo-500 text-lg"></i>
            <span className="font-medium">DUI:</span> {empleado.numeroDUI}
          </p>
          <p className="flex items-center gap-2">
            <i className="pi pi-phone text-indigo-500 text-lg"></i>
            <span className="font-medium">Teléfono:</span> {empleado.numeroTelefono}
          </p>
          <p className="flex items-center gap-2">
            <i className="pi pi-envelope text-indigo-500 text-lg"></i>
            <span className="font-medium">Correo:</span> {empleado.correoInstitucional}
          </p>
          <p className="flex items-center gap-2 col-span-1 sm:col-span-2">
            <i className="pi pi-calendar text-indigo-500 text-lg"></i>
            <span className="font-medium">Fecha Nacimiento:</span> {empleado.fechaNacimiento}
          </p>
        </div>
        <div className="flex flex-wrap gap-3 pt-6 border-t border-gray-100 mt-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            label="Editar"
            icon="pi pi-pencil"
            className="p-button-sm p-button-outlined p-button-secondary flex-grow"
            onClick={() => router.push(`/dashboard/editar-empleado/${empleado.id || empleado.idEmpleado}`)}
          />
          <Button
            label="Ver"
            icon="pi pi-eye"
            className="p-button-sm p-button-outlined p-button-info flex-grow"
            onClick={() => router.push(`/dashboard/ver-empleado/${empleado.id || empleado.idEmpleado}`)}
          />
          {canDelete && (
            <Button
              label="Eliminar"
              icon="pi pi-trash"
              className="p-button-sm p-button-outlined p-button-danger flex-grow"
              onClick={handleDelete}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default EmpleadoCard;
