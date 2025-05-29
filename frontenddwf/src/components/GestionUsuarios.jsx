"use client";
import React, { useEffect } from "react";
import { useAuth } from "@/app/Context/AuthContext";
import "@/styles/auth-form.css";

const GestionUsuarios = () => {
  const { user } = useAuth();
  // Supón que tienes un array de usuarios y una función handleDelete
  // const [usuarios, setUsuarios] = React.useState([]);
  // function handleDelete(id) { ... }

  return (
    <div>
      <h2>Gestión de Usuarios</h2>
      {/* ...existing code... */}
      {usuarios && usuarios.map((usuario) => (
        <div key={usuario.id} style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span>{usuario.nombre}</span>
          {/* Mostrar botón Eliminar solo si el usuario logueado es admin */}
          {user?.role === "ROLE_ADMIN" && (
            <button onClick={() => handleDelete(usuario.id)}>
              Eliminar
            </button>
          )}
        </div>
      ))}
      {/* ...existing code... */}
    </div>
  );
};

export default GestionUsuarios;