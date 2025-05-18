import React, { useState } from "react";
import { useAuth } from "@/app/Context/AuthContext";

const RegisterFormulario = ({ onSuccess }) => {
  const { register } = useAuth();
  const [form, setForm] = useState({
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    age: "",
    phone: "", // Nuevo campo
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Formatear automáticamente el número de teléfono (70707070 -> 7070-7070)
    if (name === "phone") {
      const raw = value.replace(/\D/g, "").slice(0, 8); // Solo dígitos, máximo 8
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
    <form onSubmit={handleSubmit}>
      <h2>Registrarse</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">Registro exitoso</p>}
      <div>
        <label>Usuario</label>
        <input name="username" value={form.username} onChange={handleChange} required />
      </div>
      <div>
        <label>Contraseña</label>
        <input name="password" type="password" value={form.password} onChange={handleChange} required />
      </div>
      <div>
        <label>Nombre</label>
        <input name="firstname" value={form.firstname} onChange={handleChange} required />
      </div>
      <div>
        <label>Apellido</label>
        <input name="lastname" value={form.lastname} onChange={handleChange} required />
      </div>
      <div>
        <label>Edad</label>
        <input name="age" type="number" value={form.age} onChange={handleChange} required />
      </div>
      <div>
        <label>Teléfono</label>
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          pattern="^\d{4}-\d{4}$"
          title="Debe tener el formato 7070-7070"
          placeholder="7070-7070"
          required
        />
      </div>
      <button type="submit">Registrarse</button>
    </form>
  );
};

export default RegisterFormulario;
