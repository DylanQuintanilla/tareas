const API_URL = "http://localhost:8080/contrataciones"; // Base URL for Contratación API

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
    console.log("Datos de contrataciones:", data);
    return data;
  } catch (error) {
    console.error("Error al obtener contrataciones:", error.message);
    return [];
  }
};

export const getContratacionById = async (id) => {
  try {
    if (!id) {
      throw new Error("El ID de la contratación no fue proporcionado.");
    }

    const response = await fetch(`${API_URL}/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error en la respuesta:", errorData.message);
      throw new Error(errorData.message || `Error al obtener contratación: ${response.status}`);
    }

    const data = await response.json();
    console.log("Contratación obtenida exitosamente:", data);
    return data;
  } catch (error) {
    console.error("Error al obtener contratación:", error.message);
    return null;
  }
};

export const createContratacion = async (contratacion) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contratacion),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error en la respuesta:", errorData.message);
      throw new Error(errorData.message || `Error al crear contratación: ${response.status}`);
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
      const errorData = await response.json();
      console.error("Error en la respuesta:", errorData.message);
      throw new Error(errorData.message || `Error al actualizar contratación: ${response.status}`);
    }

    const data = await response.json();
    console.log("Contratación actualizada:", data);
    return data;
  } catch (error) {
    console.error("Error al actualizar contratación:", error.message);
    throw error;
  }
};

export const deleteContratacion = async (id) => {
  try {
    if (!id) {
      throw new Error("El ID de la contratación no fue proporcionado.");
    }

    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error en la respuesta:", errorData.message);
      throw new Error(errorData.message || `Error al eliminar contratación: ${response.status}`);
    }

    console.log(`Contratación con ID ${id} eliminada exitosamente.`);
    return true;
  } catch (error) {
    console.error("Error al eliminar contratación:", error.message);
    return false;
  }
};
