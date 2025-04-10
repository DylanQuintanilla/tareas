"use client";
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from "next/navigation";
import EmpleadoFormulario from "@/components/EmpleadoFormulario";
import { getEmpleadoById, updateEmpleado } from "@/service/EmpleadoService";

const EditarEmpleado = () => {
  const params = useParams();
  const router = useRouter();
  
  // Estado inicial vacío para el empleado
  const [empleado, setEmpleado] = useState({
    nombrePersona: "",
    usuario: "",
    numeroDUI: "",
    numeroTelefono: "",
    correoInstitucional: "",
    fechaNacimiento: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Cargar los datos del empleado si existe params.id
  useEffect(() => {
    if (params.id) {
      const fetchEmpleado = async () => {
        try {
          setIsLoading(true);
          const data = await getEmpleadoById(params.id);
          if (data) {
            setEmpleado(data);
          } else {
            setError("Empleado no encontrado.");
          }
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      };
      fetchEmpleado();
    } else {
      setError("ID del empleado no proporcionado.");
      console.error("ID del empleado no proporcionado.");
    }
  }, [params.id]);

  // Función para guardar los cambios, similar a la de Jugador
  const handleSave = async (updatedEmpleado) => {
    try {
      setIsLoading(true);
      const data = await updateEmpleado(params.id, updatedEmpleado);
      alert("Empleado actualizado exitosamente.");
      // Asegúrate de que data.id contenga el ID correcto
      router.push(`/dashboard/ver-empleado/${data.id}`);
    } catch (err) {
      console.error("Error al actualizar empleado:", err.message);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container">
        <h2>Cargando empleado...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <h2>Error: {error}</h2>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h2>{params.id ? "Editar Empleado" : "Crear Empleado"}</h2>
      <EmpleadoFormulario empleadoInicial={empleado} onSave={handleSave} />
    </div>
  );
};

export default EditarEmpleado;
