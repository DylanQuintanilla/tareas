"use client";
import React from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Dashboard = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <main className="container my-5">
        <h1 style={{ textAlign: "center" }}>Dashboard</h1>
        <ul>
          <li>
            <Link href="/dashboard/listado-empleados">Listado de Empleados</Link>
          </li>
          <li>
            <Link href="/dashboard/listado-contrataciones">Listado de Contrataciones</Link>
          </li>
          <li>
            <Link href="/dashboard/listado-cargos">Listado de Cargos</Link>
          </li>
          <li>
            <Link href="/dashboard/listado-departamentos">Listado de Departamentos</Link>
          </li>
          <li>
            <Link href="/dashboard/listado-tipos-contratacion">Listado de Tipos de Contratación</Link>
          </li>
          <li>
            <Link href="/dashboard/crear-empleado">Crear Empleado</Link>
          </li>
          <li>
            <Link href="/dashboard/crear-contratacion">Crear Contratación</Link>
          </li>
          <li>
            <Link href="/dashboard/crear-cargo">Crear Cargo</Link>
          </li>
          <li>
            <Link href="/dashboard/crear-departamento">Crear Departamento</Link>
          </li>
          <li>
            <Link href="/dashboard/crear-tipo-contratacion">Crear Tipo de Contratación</Link>
          </li>
          {/* <li>
            <Link href="/dashboard/estadisticas">Estadísticas</Link>
          </li> */}
        </ul>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
