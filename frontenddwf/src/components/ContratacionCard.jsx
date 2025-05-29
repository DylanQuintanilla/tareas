// src/components/ContratacionCard.jsx (o donde lo tengas)
"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { deleteContratacion } from "@/service/ContratacioneService";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog';
import { motion } from "framer-motion";

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
  canDelete,
}) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!id) {
      console.error("El ID de la contratación es undefined o no válido.");
      alert("No se puede eliminar esta contratación porque el ID no es válido.");
      return;
    }

    confirmDialog({
      message: '¿Estás seguro de que quieres eliminar esta contratación? Esta acción no se puede deshacer.',
      header: 'Confirmación de Eliminación',
      icon: 'pi pi-exclamation-triangle',
      acceptClassName: 'p-button-danger',
      acceptLabel: 'Sí, eliminar',
      rejectLabel: 'No, cancelar',
      accept: async () => {
        try {
          const success = await deleteContratacion(id);
          if (success) {
            alert("Contratación eliminada exitosamente.");
            onDelete(id); 
          }
        } catch (error) {
          console.error("Error al eliminar contratación:", error);
          alert("Error al eliminar contratación: " + (error.message || "Por favor, inténtalo de nuevo."));
        }
      },
      reject: () => {
        // El usuario canceló
      }
    });
  };

  const formatCurrency = (value) => {
    if (value === undefined || value === null) return "No disponible";
    return new Intl.NumberFormat('es-SV', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(value);
  };

  const getStatusSeverity = (status) => {
    return status ? 'success' : 'danger'; 
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-100 group"
    >
      <ConfirmDialog />

      <div className="p-6 md:p-8 flex flex-col gap-5">
        <h3 className="text-2xl md:text-3xl font-extrabold text-indigo-800 leading-tight">
          {nombreEmpleado || "Empleado Desconocido"}
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-gray-700 text-base">
          <p className="flex items-center gap-2">
            <i className="pi pi-briefcase text-indigo-500 text-lg"></i>
            <span className="font-medium">Departamento:</span>{" "}
            {nombreDepartamento || "No disponible"}
          </p>
          <p className="flex items-center gap-2">
            <i className="pi pi-users text-indigo-500 text-lg"></i>
            <span className="font-medium">Cargo:</span>{" "}
            {nombreCargo || "No disponible"}
          </p>
          <p className="flex items-center gap-2">
            <i className="pi pi-file-o text-indigo-500 text-lg"></i>
            <span className="font-medium">Tipo Contratación:</span>{" "}
            {nombreTipoContratacion || "No disponible"}
          </p>
          <p className="flex items-center gap-2">
            <i className="pi pi-calendar text-indigo-500 text-lg"></i>
            <span className="font-medium">F. Contratación:</span>{" "}
            {fechaContratacion || "No disponible"}
          </p>
          <p className="col-span-1 sm:col-span-2 flex items-center gap-2">
            <i className="pi pi-dollar text-indigo-500 text-lg"></i>
            <span className="font-medium">Salario:</span>{" "}
            {formatCurrency(salario)}
          </p>
          <p className="col-span-1 sm:col-span-2 flex items-center gap-2">
            <i className="pi pi-check-circle text-indigo-500 text-lg"></i>
            <span className="font-medium">Estado:</span>{" "}
            <Tag
              value={estado ? "Activo" : "Inactivo"}
              severity={getStatusSeverity(estado)}
              className="px-3 py-1 text-sm rounded-full font-semibold"
            />
          </p>
        </div>

        <div className="flex flex-wrap gap-3 pt-6 border-t border-gray-100 mt-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            label="Editar"
            icon="pi pi-pencil"
            className="p-button-sm p-button-outlined p-button-secondary hover:p-button-secondary-hovered flex-grow"
            onClick={() => router.push(`/dashboard/editar-contratacion/${id}`)}
          />
          <Button
            label="Ver"
            icon="pi pi-eye"
            className="p-button-sm p-button-outlined p-button-info hover:p-button-info-hovered flex-grow"
            onClick={() => router.push(`/dashboard/ver-contratacion/${id}`)}
          />
          {canDelete && (
            <Button
              label="Eliminar"
              icon="pi pi-trash"
              className="p-button-sm p-button-outlined p-button-danger hover:p-button-danger-hovered flex-grow"
              onClick={handleDelete}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
}