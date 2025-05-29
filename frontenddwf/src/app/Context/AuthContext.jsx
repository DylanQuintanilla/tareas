"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { loginService, registerService } from "@/service/AuthServices";

// Decodificador JWT simple (no seguro para producción, solo frontend)
function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return {};
  }
}

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Cargar usuario/token desde localStorage si existe
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (storedUser && storedToken) {
      // Recalcula el rol desde el token por si el user guardado no tiene el campo correcto
      const decoded = parseJwt(storedToken);
      let role = null;
      if (Array.isArray(decoded?.roles)) {
        role = decoded.roles[0];
      } else if (typeof decoded?.roles === "string") {
        role = decoded.roles;
      }
      const userData = { ...JSON.parse(storedUser), role };
      setUser(userData);
      setToken(storedToken);
    }
  }, []);

  const login = async (username, password) => {
    const data = await loginService(username, password);
    if (data && data.token) {
      // Decodifica el token para obtener el rol
      const decoded = parseJwt(data.token);
      let role = null;
      if (Array.isArray(decoded?.roles)) {
        role = decoded.roles[0];
      } else if (typeof decoded?.roles === "string") {
        role = decoded.roles;
      }
      const userData = { username, role };
      setUser(userData);
      setToken(data.token);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", data.token);
      return true;
    }
    return false;
  };

  const register = async (registerData) => {
    const data = await registerService(registerData);
    return data;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
