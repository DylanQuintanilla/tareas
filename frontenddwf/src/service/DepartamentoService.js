const API_URL = "http://localhost:8080/departamentos";

export const getDepartamentos = async () => {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Error al obtener departamentos: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Datos de departamentos:", data);

    // Ensure each departamento has a valid `id` field
    return data.map((dep) => ({
      ...dep,
      id: dep.idDepartamento, // Map `idDepartamento` to `id`
    }));
  } catch (error) {
    console.error("Error al obtener departamentos:", error.message);
    return [];
  }
};

export const getDepartamentoById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Error al obtener departamento: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Departamento obtenido:", data);

    // Map `idDepartamento` to `id`
    return { ...data, id: data.idDepartamento };
  } catch (error) {
    console.error("Error al obtener departamento:", error.message);
    return null;
  }
};

export const createDepartamento = async (departamento) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(departamento),
    });

    if (!response.ok) {
      throw new Error(`Error al crear departamento: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Departamento creado:", data);
    return data;
  } catch (error) {
    console.error("Error al crear departamento:", error.message);
    throw error;
  }
};

export const updateDepartamento = async (id, departamento) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(departamento),
    });

    if (!response.ok) {
      throw new Error(`Error al actualizar departamento: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Departamento actualizado:", data);
    return data;
  } catch (error) {
    console.error("Error al actualizar departamento:", error.message);
    throw error;
  }
};

export const deleteDepartamento = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Error al eliminar departamento: ${response.status} ${response.statusText}`);
    }

    console.log(`Departamento con ID ${id} eliminado exitosamente.`);
    return true;
  } catch (error) {
    console.error("Error al eliminar departamento:", error.message);
    return false;
  }
};
