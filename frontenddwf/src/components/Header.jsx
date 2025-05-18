"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "@/app/Context/AuthContext";
import '@/app/globals.css';

const Header = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-container">
          <img src="/img/Logo/ojo.png" alt="Logo de la empresa" className="logo" />
        </div>
        {user && (
          <nav className="nav">
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/dashboard/crear-empleado">Crear Empleado</Link>
            <Link href="/dashboard/listado-empleados">Empleados</Link>
          </nav>
        )}
        <div className="user-menu">
          {user ? (
            <>
              <button onClick={() => setMenuOpen(!menuOpen)} className="user-button">
                <FaUser size={20} />
                <span>Usuario</span>
              </button>
              {menuOpen && (
                <div className="dropdown">
                  <Link href="/perfil">Perfil</Link>
                  <button onClick={logout} className="dropdown-item">
                    <FaSignOutAlt size={16} /> Cerrar sesión
                  </button>
                </div>
              )}
            </>
          ) : null}
        </div>
      </div>
    </header>
  );
};

export default Header;
