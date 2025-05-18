const API_URL = "http://localhost:8080/contrataciones";

export const createContratacion = async (contratacion) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contratacion),
    });

    if (!response.ok) {
      throw new Error(`Error al crear contratación: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Contratación creada:", data);
    return data;
  } catch (error) {
    console.error("Error al crear contratación:", error.message);
    throw error;
  }
};

export const updateContratacion = async (id, contratacion) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contratacion),
    });

    if (!response.ok) {
      throw new Error(`Error al actualizar contratación: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Contratación actualizada:", data);
    return data;
  } catch (error) {
    console.error("Error al actualizar contratación:", error.message);
    throw error;
  }
};

export const getContrataciones = async () => {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Error al obtener contrataciones: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener contrataciones:", error.message);
    return [];
  }
};

export const getContratacionById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Error al obtener contratación: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener contratación:", error.message);
    return null;
  }
};

export const deleteContratacion = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Error al eliminar contratación: ${response.status} ${response.statusText}`);
    }

    return true;
  } catch (error) {
    console.error("Error al eliminar contratación:", error.message);
    return false;
  }
};
