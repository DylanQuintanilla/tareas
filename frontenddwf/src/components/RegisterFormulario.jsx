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
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    const data = await register({ ...form, age: Number(form.age) });
    if (data && data.username) {
      setSuccess(true);
      // Redirige inmediatamente si onSuccess está definido
      if (onSuccess) {
        onSuccess();
      }
    } else {
      setError("Error al registrar usuario");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registrarse</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>Registro exitoso</p>}
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
      <button type="submit">Registrarse</button>
    </form>
  );
};

export default RegisterFormulario;
// No es necesario cambiar nada aquí si solo usas el formulario, pero si tienes enlaces internos, usa minúsculas.
