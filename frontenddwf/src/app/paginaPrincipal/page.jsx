"use client";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <div className="home container">
      <div className="logo-container">
        {/* Logo or branding can go here */}
      </div>
      <h1 className="page-title">Bienvenido al Sistema de Gestión de Recurso Humano</h1>
      <p className="page-description">
        Explora las funcionalidades principales del sistema para gestionar empleados, contrataciones, visualizar estadísticas y más.
      </p>
      <div className="card-container">
        <a href="/dashboard/crear-empleado" className="card">
          <h3>Crear Empleado</h3>
        </a>
        <a href="/dashboard/listado-empleados" className="card">
          <h3>Listado de Empleados</h3>
        </a>
        <a href="/dashboard/crear-contratacion" className="card">
          <h3>Crear Contratación</h3>
        </a>
        <a href="/dashboard/listado-contrataciones" className="card">
          <h3>Listado de Contrataciones</h3>
        </a>
        <a href="/dashboard/estadisticas" className="card">
          <h3>Estadísticas</h3>
        </a>
      </div>
    </div>
  );
};

const PaginaPrincipal = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <main>
        <Home />
      </main>
      <Footer />
    </div>
  );
};

export default PaginaPrincipal;
