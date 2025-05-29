import React, { useState } from "react";
import { useAuth } from "@/app/Context/AuthContext";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { motion } from "framer-motion";
import { FaUser, FaLock, FaIdCard, FaCalendarAlt, FaPhone } from "react-icons/fa";

const RegisterFormulario = ({ onSuccess }) => {
  const { register } = useAuth();
  const [form, setForm] = useState({
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    age: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const raw = value.replace(/\D/g, "").slice(0, 8);
      const formatted = raw.length > 4
        ? `${raw.slice(0, 4)}-${raw.slice(4)}`
        : raw;
      setForm({ ...form, phone: formatted });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    const data = await register({ ...form, age: Number(form.age) });
    if (data && data.username) {
      setSuccess(true);
      if (onSuccess) onSuccess();
    } else {
      setError("Error al registrar usuario");
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 p-8 rounded-2xl shadow-2xl bg-white/90 border border-gray-200"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ minWidth: 320, maxWidth: 400, width: "100%" }}
    >
      <h2 className="text-2xl font-bold text-center mb-2 text-indigo-700">Registrarse</h2>
      {error && <Message severity="error" text={error} className="w-full" />}
      {success && <Message severity="success" text="Registro exitoso" className="w-full" />}
      <div className="flex flex-col gap-2">
        <label htmlFor="username" className="font-semibold flex items-center gap-2">
          <FaUser className="text-indigo-400" /> Usuario
        </label>
        <InputText
          id="username"
          name="username"
          value={form.username}
          onChange={handleChange}
          required
          placeholder="Usuario"
          className="w-full"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="font-semibold flex items-center gap-2">
          <FaLock className="text-indigo-400" /> Contraseña
        </label>
        <Password
          id="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          feedback={false}
          toggleMask
          required
          placeholder="Contraseña"
          className="w-full"
          inputClassName="w-full"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="firstname" className="font-semibold flex items-center gap-2">
          <FaIdCard className="text-indigo-400" /> Nombre
        </label>
        <InputText
          id="firstname"
          name="firstname"
          value={form.firstname}
          onChange={handleChange}
          required
          placeholder="Nombre"
          className="w-full"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="lastname" className="font-semibold flex items-center gap-2">
          <FaIdCard className="text-indigo-400" /> Apellido
        </label>
        <InputText
          id="lastname"
          name="lastname"
          value={form.lastname}
          onChange={handleChange}
          required
          placeholder="Apellido"
          className="w-full"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="age" className="font-semibold flex items-center gap-2">
          <FaCalendarAlt className="text-indigo-400" /> Edad
        </label>
        <InputText
          id="age"
          name="age"
          type="number"
          value={form.age}
          onChange={handleChange}
          required
          placeholder="Edad"
          className="w-full"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="phone" className="font-semibold flex items-center gap-2">
          <FaPhone className="text-indigo-400" /> Teléfono
        </label>
        <InputText
          id="phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          pattern="^\d{4}-\d{4}$"
          title="Debe tener el formato 7070-7070"
          placeholder="7070-7070"
          required
          className="w-full"
        />
      </div>
      <Button
        type="submit"
        label="Registrarse"
        icon="pi pi-user-plus"
        className="w-full mt-2 p-button-rounded p-button-lg p-button-gradient"
        style={{
          background: "linear-gradient(90deg, #7c6cf7, #5a4be7)",
          border: "none",
        }}
      />
    </motion.form>
  );
};

export default RegisterFormulario;
