"use client";
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from "next/navigation";
import EmpleadoFormulario from "@/components/EmpleadoFormulario";
import { getEmpleadoById, updateEmpleado } from "@/service/EmpleadoService";

const EditarEmpleado = () => {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();

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

  useEffect(() => {
    const fetchEmpleado = async () => {
      if (!id || id === "undefined" || id === "") {
        setError("ID de empleado no proporcionado.");
        return;
      }
      try {
        setIsLoading(true);
        const data = await getEmpleadoById(id);
        if (data) {
          setEmpleado({
            ...data,
            id: data.id || data.idEmpleado, // <-- mapea idEmpleado a id para el formulario
          });
          setError("");
        } else {
          setEmpleado({
            nombrePersona: "",
            usuario: "",
            numeroDUI: "",
            numeroTelefono: "",
            correoInstitucional: "",
            fechaNacimiento: "",
          });
          setError("");
        }
      } catch (err) {
        setError(err.message || "Error al obtener el empleado.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchEmpleado();
  }, [id]);

  const handleSave = async (updatedEmpleado) => {
    try {
      setIsLoading(true);
      const empleadoId = updatedEmpleado.id ?? updatedEmpleado.idEmpleado;
      const data = await updateEmpleado(empleadoId, updatedEmpleado);
      alert("Empleado actualizado exitosamente.");
      // Usa el id correcto para redirigir
      router.push(`/dashboard/ver-empleado/${data.id ?? data.idEmpleado}`);
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

  // Solo muestra error si es realmente un error de backend
  if (error && error !== "ID de empleado no proporcionado.") {
    return (
      <div className="container">
        <h2>Error: {error}</h2>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h2>Actualizar Empleado</h2>
      <EmpleadoFormulario empleadoInicial={empleado} onSave={handleSave} modo="editar" />
    </div>
  );
};

export default EditarEmpleado;
