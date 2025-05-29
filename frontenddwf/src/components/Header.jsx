"use client";
import React, { useState, useRef, useEffect } from "react"; // Añadimos useRef y useEffect
import Link from "next/link";
import { FaUser, FaSignOutAlt, FaBars } from "react-icons/fa"; // Añadimos FaBars para el menú móvil
import { useAuth } from "@/app/Context/AuthContext";
// import { Menu } from "primereact/menu"; // No necesario si construimos el dropdown con Tailwind
import { Button } from "primereact/button";
import '@/app/globals.css'; // Asegúrate de que tus estilos globales se importen

const Header = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // Estado para el menú móvil
  const menuRef = useRef(null); // Referencia para cerrar el menú al hacer clic fuera
  const mobileMenuRef = useRef(null); // Referencia para el menú móvil

  // Cerrar el menú de usuario y móvil al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Función para cerrar ambos menús
  const closeMenus = () => {
    setMenuOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    // Header principal:
    // - Fondo degradado más sutil y moderno de Tailwind: bg-gradient-to-r from-blue-700 to-indigo-800
    // - Sombra más pronunciada: shadow-xl
    // - Padding y sticky para que se quede arriba al hacer scroll
    <header className="fixed w-full top-0 z-50 py-4 bg-gradient-to-r from-blue-700 to-indigo-800 text-white shadow-xl">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo y Nombre del Dashboard */}
        <Link href="/dashboard" className="flex items-center space-x-3 group">
          <img src="/img/Logo/ojo.png" alt="Logo de la empresa" className="w-10 h-10 object-contain transition-transform duration-300 group-hover:scale-110" />
          <span className="hidden md:inline text-xl font-extrabold tracking-tight drop-shadow-md">DWF Dashboard</span>
        </Link>

        {/* Menú de usuario y botón de menú móvil */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              {/* Menú de usuario (visible en pantallas grandes) */}
              <div className="relative hidden md:block" ref={menuRef}>
                <Button
                  icon={<FaUser className="text-lg" />} // Icono ligeramente más grande
                  label={user.username || "Usuario"}
                  className="p-button-text p-button-sm text-white font-semibold flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  onClick={() => setMenuOpen((open) => !open)}
                  style={{ background: "transparent", boxShadow: "none" }} // Anulamos estilos de PrimeReact si interfieren
                />
                {menuOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-lg shadow-xl overflow-hidden animate-fadeIn text-gray-800 border border-gray-200">
                    <Link
                      href="/perfil"
                      className="flex items-center space-x-3 px-5 py-3 text-base hover:bg-blue-100 hover:text-blue-700 transition-colors duration-200"
                      onClick={closeMenus}
                    >
                      <FaUser size={18} />
                      <span>Perfil</span>
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        closeMenus();
                      }}
                      className="w-full flex items-center space-x-3 px-5 py-3 text-base text-left hover:bg-blue-100 hover:text-blue-700 transition-colors duration-200"
                    >
                      <FaSignOutAlt size={18} />
                      <span>Cerrar sesión</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Botón de menú para móviles (visible en pantallas pequeñas) */}
              <div className="md:hidden relative" ref={mobileMenuRef}>
                <Button
                  icon={<FaBars className="text-xl" />}
                  className="p-button-text p-button-sm text-white px-3 py-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  onClick={() => setMobileMenuOpen((open) => !open)}
                  style={{ background: "transparent", boxShadow: "none" }}
                />
                {mobileMenuOpen && (
                  <div className="absolute right-0 mt-3 w-64 bg-white rounded-lg shadow-xl overflow-hidden animate-fadeIn text-gray-800 border border-gray-200">
                    {/* Elementos de navegación del menú móvil */}
                    <Link
                      href="/dashboard"
                      className="flex items-center space-x-3 px-5 py-3 text-base hover:bg-blue-100 hover:text-blue-700 transition-colors duration-200"
                      onClick={closeMenus}
                    >
                      Dashboard
                    </Link>
                    {/* Elementos del menú de usuario en móvil */}
                    <hr className="border-gray-200 my-1" /> {/* Separador */}
                    <Link
                      href="/perfil"
                      className="flex items-center space-x-3 px-5 py-3 text-base hover:bg-blue-100 hover:text-blue-700 transition-colors duration-200"
                      onClick={closeMenus}
                    >
                      <FaUser size={18} />
                      <span>Perfil</span>
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        closeMenus();
                      }}
                      className="w-full flex items-center space-x-3 px-5 py-3 text-base text-left hover:bg-blue-100 hover:text-blue-700 transition-colors duration-200"
                    >
                      <FaSignOutAlt size={18} />
                      <span>Cerrar sesión</span>
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </header>
  );
};

export default Header;