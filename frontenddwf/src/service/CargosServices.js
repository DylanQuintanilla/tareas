const API_URL = "http://localhost:8080/cargos";

export const getCargos = async () => {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Error al obtener cargos: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Datos de cargos:", data);
    return data;
  } catch (error) {
    console.error("Error al obtener cargos:", error.message);
    return [];
  }
};

export const getCargoById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Error al obtener cargo: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Cargo obtenido:", data);
    return data;
  } catch (error) {
    console.error("Error al obtener cargo:", error.message);
    return null;
  }
};

export const createCargo = async (cargo) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cargo),
    });

    if (!response.ok) {
      throw new Error(`Error al crear cargo: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Cargo creado:", data);
    return data;
  } catch (error) {
    console.error("Error al crear cargo:", error.message);
    throw error;
  }
};

export const updateCargo = async (id, cargo) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cargo),
    });

    if (!response.ok) {
      throw new Error(`Error al actualizar cargo: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Cargo actualizado:", data);
    return data;
  } catch (error) {
    console.error("Error al actualizar cargo:", error.message);
    throw error;
  }
};

export const deleteCargo = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Error al eliminar cargo: ${response.status} ${response.statusText}`);
    }

    console.log(`Cargo con ID ${id} eliminado exitosamente.`);
    return true;
  } catch (error) {
    console.error("Error al eliminar cargo:", error.message);
    return false;
  }
};
