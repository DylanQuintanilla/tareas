const API_URL = "http://localhost:8080/tipos-contratacion";

export const getTiposContratacion = async () => {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Error al obtener tipos de contratación: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Datos de tipos de contratación:", data);
    return data;
  } catch (error) {
    console.error("Error al obtener tipos de contratación:", error.message);
    return [];
  }
};

export const getTipoContratacionById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Error al obtener tipo de contratación: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Tipo de contratación obtenido:", data);
    return data;
  } catch (error) {
    console.error("Error al obtener tipo de contratación:", error.message);
    return null;
  }
};

export const createTipoContratacion = async (tipoContratacion) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tipoContratacion),
    });

    if (!response.ok) {
      throw new Error(`Error al crear tipo de contratación: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Tipo de contratación creado:", data);
    return data;
  } catch (error) {
    console.error("Error al crear tipo de contratación:", error.message);
    throw error;
  }
};

export const updateTipoContratacion = async (id, tipoContratacion) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tipoContratacion),
    });

    if (!response.ok) {
      throw new Error(`Error al actualizar tipo de contratación: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Tipo de contratación actualizado:", data);
    return data;
  } catch (error) {
    console.error("Error al actualizar tipo de contratación:", error.message);
    throw error;
  }
};

export const deleteTipoContratacion = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Error al eliminar tipo de contratación: ${response.status} ${response.statusText}`);
    }

    console.log(`Tipo de contratación con ID ${id} eliminado exitosamente.`);
    return true;
  } catch (error) {
    console.error("Error al eliminar tipo de contratación:", error.message);
    return false;
  }
};
