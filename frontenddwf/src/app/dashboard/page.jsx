"use client";
import React from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { motion } from "framer-motion";
import { FaUsers, FaClipboardList, FaBriefcase, FaBuilding, FaFileAlt, FaUserPlus, FaFileSignature, FaPlusCircle } from "react-icons/fa";

const dashboardLinks = [
  {
    href: "/dashboard/listado-empleados",
    label: "Listado de Empleados",
    icon: <FaUsers className="text-indigo-500 text-3xl mb-2" />,
    color: "from-indigo-100 to-indigo-300"
  },
  {
    href: "/dashboard/listado-contrataciones",
    label: "Listado de Contrataciones",
    icon: <FaClipboardList className="text-purple-500 text-3xl mb-2" />,
    color: "from-purple-100 to-purple-300"
  },
  {
    href: "/dashboard/listado-cargos",
    label: "Listado de Cargos",
    icon: <FaBriefcase className="text-blue-500 text-3xl mb-2" />,
    color: "from-blue-100 to-blue-300"
  },
  {
    href: "/dashboard/listado-departamentos",
    label: "Listado de Departamentos",
    icon: <FaBuilding className="text-green-500 text-3xl mb-2" />,
    color: "from-green-100 to-green-300"
  },
  {
    href: "/dashboard/listado-tipos-contratacion",
    label: "Listado de Tipos de Contratación",
    icon: <FaFileAlt className="text-pink-500 text-3xl mb-2" />,
    color: "from-pink-100 to-pink-300"
  },
  {
    href: "/dashboard/crear-empleado",
    label: "Crear Empleado",
    icon: <FaUserPlus className="text-indigo-400 text-3xl mb-2" />,
    color: "from-indigo-50 to-indigo-200"
  },
  {
    href: "/dashboard/crear-contratacion",
    label: "Crear Contratación",
    icon: <FaFileSignature className="text-purple-400 text-3xl mb-2" />,
    color: "from-purple-50 to-purple-200"
  },
  {
    href: "/dashboard/crear-cargo",
    label: "Crear Cargo",
    icon: <FaPlusCircle className="text-blue-400 text-3xl mb-2" />,
    color: "from-blue-50 to-blue-200"
  },
  {
    href: "/dashboard/crear-departamento",
    label: "Crear Departamento",
    icon: <FaPlusCircle className="text-green-400 text-3xl mb-2" />,
    color: "from-green-50 to-green-200"
  },
  {
    href: "/dashboard/crear-tipo-contratacion",
    label: "Crear Tipo de Contratación",
    icon: <FaPlusCircle className="text-pink-400 text-3xl mb-2" />,
    color: "from-pink-50 to-pink-200"
  },
  // {
  //   href: "/dashboard/estadisticas",
  //   label: "Estadísticas",
  //   icon: <FaChartBar className="text-yellow-500 text-3xl mb-2" />,
  //   color: "from-yellow-100 to-yellow-300"
  // },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center py-10">
        <motion.h1
          className="text-4xl font-extrabold text-indigo-700 mb-10 drop-shadow text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Dashboard
        </motion.h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl px-4">
          {dashboardLinks.map((link, idx) => (
            <motion.div
              key={link.href}
              whileHover={{ scale: 1.05, boxShadow: "0 8px 32px rgba(80,80,180,0.18)" }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className={`rounded-2xl shadow-xl border-0 bg-gradient-to-br ${link.color} flex flex-col items-center justify-center min-h-[200px]`}>
                <div className="flex flex-col items-center justify-center h-full py-8">
                  {link.icon}
                  <span className="font-bold text-lg text-black mb-4 text-center">{link.label}</span>
                  <Link href={link.href} passHref>
                    <Button
                      label="Ir"
                      icon="pi pi-arrow-right"
                      className="p-button-rounded p-button-lg"
                      style={{
                        background: "linear-gradient(90deg, #7c6cf7, #5a4be7)",
                        border: "none",
                        color: "#fff",
                        fontWeight: 600,
                        marginTop: 10,
                        cursor: "pointer"
                      }}
                    />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
