import React, { useState } from "react";
import { useAuth } from "@/app/Context/AuthContext";

const LoginFormulario = ({ onSuccess }) => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const ok = await login(username, password);
    if (ok) {
      if (onSuccess) onSuccess();
    } else {
      setError("Credenciales inválidas");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Iniciar Sesión</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <label>Usuario</label>
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Ingresar</button>
      {/* No es necesario cambiar nada aquí si solo usas el formulario, pero si tienes enlaces internos, usa minúsculas. */}
    </form>
  );
};

export default LoginFormulario;
