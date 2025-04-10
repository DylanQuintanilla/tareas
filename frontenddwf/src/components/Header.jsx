"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import '@/app/globals.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-container">
          <img src="/img/Logo/ojo.png" alt="Logo de la empresa" className="logo" />
        </div>
        <nav className="nav">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/dashboard/crear-empleado">Crear Empleado</Link>
          <Link href="/dashboard/listado-empleados">Empleados</Link>
        </nav>
        <div className="user-menu">
          <button onClick={() => setMenuOpen(!menuOpen)} className="user-button">
            <FaUser size={20} />
            <span>Usuario</span>
          </button>
          {menuOpen && (
            <div className="dropdown">
              <Link href="/perfil">Perfil</Link>
              <button className="dropdown-item">
                <FaSignOutAlt size={16} /> Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
