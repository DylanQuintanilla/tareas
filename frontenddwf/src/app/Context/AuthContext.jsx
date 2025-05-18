"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { loginService, registerService } from "@/service/AuthServices";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Cargar usuario/token desde localStorage si existe
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  const login = async (username, password) => {
    const data = await loginService(username, password);
    if (data && data.token) {
      setUser({ username });
      setToken(data.token);
      localStorage.setItem("user", JSON.stringify({ username }));
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
