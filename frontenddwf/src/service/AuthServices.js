const API_URL = "http://localhost:8080/api/auth";

export const loginService = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) {
      throw new Error("Credenciales inválidas");
    }
    return await response.json();
  } catch (error) {
    return null;
  }
};

export const registerService = async (registerData) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registerData),
    });
    if (!response.ok) {
      throw new Error("Error al registrar usuario");
    }
    return await response.json();
  } catch (error) {
    return null;
  }
};
