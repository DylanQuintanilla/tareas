// /service/EmpleadoService.js

const API_URL = "http://localhost:8080/empleados"; // Ensure this matches your backend's base URL

const useMockData = true; // Set to true to use mock data instead of APId

const mockEmpleados = [
  {
    id: 1,
    nombrePersona: "Juan Pérez",
    usuario: "juan.perez",
    numeroDUI: "06371984-6",
    numeroTelefono: "12345678",
    correoInstitucional: "juan.perez@empresa.com",
    fechaNacimiento: "1990-01-01",
  },
  {
    id: 2,
    nombrePersona: "María Gómez",
    usuario: "maria.gomez",
    numeroDUI: "12345678-9",
    numeroTelefono: "87654321",
    correoInstitucional: "maria.gomez@empresa.com",
    fechaNacimiento: "1985-05-15",
  },
];

// Obtener la lista de empleados.
export const getEmpleados = async () => {
  try {
    console.log("Fetching empleados from:", API_URL); // Debugging: Log the API URL
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error al obtener empleados: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Datos de empleados desde la API:", data); // Debugging: Log the API response
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error al obtener empleados:", error.message);
    return [];
  }
};

// Obtener un empleado por ID.
export const getEmpleadoById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener empleado");
    }

    return await response.json();
  } catch (error) {
    console.error("Error al obtener empleado:", error.message);
    return null;
  }
};

// Crear un nuevo empleado.
export const createEmpleado = async (empleado) => {
  try {
    console.log("Enviando datos del empleado:", empleado); // Debugging: Log the request body
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombrePersona: empleado.nombrePersona,
        usuario: empleado.usuario,
        numeroDUI: empleado.numeroDUI,
        numeroTelefono: empleado.numeroTelefono,
        correoInstitucional: empleado.correoInstitucional,
        fechaNacimiento: empleado.fechaNacimiento,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error en la respuesta:", errorData.message); // Debugging: Log the backend error
      throw new Error(errorData.message || "Error al crear empleado");
    }

    const data = await response.json();
    console.log("Empleado creado exitosamente:", data); // Debugging: Log the response
    return data;
  } catch (error) {
    console.error("Error al crear empleado:", error.message);
    return null;
  }
};

// Actualizar un empleado existente.
export const updateEmpleado = async (id, empleado) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(empleado),
    });

    if (!response.ok) {
      throw new Error("Error al actualizar empleado");
    }

    return await response.json();
  } catch (error) {
    console.error("Error al actualizar empleado:", error.message);
    return null;
  }
};

// Eliminar un empleado.
export const deleteEmpleado = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al eliminar empleado");
    }

    return true;
  } catch (error) {
    console.error("Error al eliminar empleado:", error.message);
    return false;
  }
};
