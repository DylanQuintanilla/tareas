import React from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Dashboard = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <main className="container my-5">
        <h2>Dashboard</h2>
        <div className="navigation-links">
          <ul>
            <li>
              <Link href="/dashboard/listado-empleados">Listado de Empleados</Link>
            </li>
            <li>
              <Link href="/dashboard/listado-contrataciones">Listado de Contrataciones</Link>
            </li>
            <li>
              <Link href="/dashboard/crear-empleado">Crear Empleado</Link>
            </li>
            <li>
              <Link href="/dashboard/estadisticas">Estadísticas</Link>
            </li>
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
