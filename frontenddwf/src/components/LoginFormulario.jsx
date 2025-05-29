import React, { useState } from "react";
import { useAuth } from "@/app/Context/AuthContext";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { motion } from "framer-motion";
import { FaUser, FaLock } from "react-icons/fa";

const LoginFormulario = ({ onSuccess }) => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const ok = await login(username, password);
    setLoading(false);
    if (ok) {
      if (onSuccess) onSuccess();
    } else {
      setError("Credenciales inválidas");
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
      <h2 className="text-2xl font-bold text-center mb-2 text-indigo-700">Iniciar Sesión</h2>
      {error && <Message severity="error" text={error} className="w-full" />}
      <div className="flex flex-col gap-2">
        <label htmlFor="username" className="font-semibold flex items-center gap-2">
          <FaUser className="text-indigo-400" /> Usuario
        </label>
        <InputText
          id="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
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
          value={password}
          onChange={e => setPassword(e.target.value)}
          feedback={false}
          toggleMask
          required
          placeholder="Contraseña"
          className="w-full"
          inputClassName="w-full"
        />
      </div>
      <Button
        type="submit"
        label={loading ? "Ingresando..." : "Ingresar"}
        icon="pi pi-sign-in"
        loading={loading}
        className="w-full mt-2 p-button-rounded p-button-lg p-button-gradient"
        style={{
          background: "linear-gradient(90deg, #7c6cf7, #5a4be7)",
          border: "none",
        }}
      />
    </motion.form>
  );
};

export default LoginFormulario;
