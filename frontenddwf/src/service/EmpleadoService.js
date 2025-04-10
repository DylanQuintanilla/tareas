const API_URL = "http://localhost:8080/empleados"; // Updated API base URL

// Obtener la lista de empleados.
export const getEmpleados = async () => {
  try {
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
    console.log("Datos de empleados:", data);
    return data; // Assuming the API returns a list of employees
  } catch (error) {
    console.error("Error al obtener empleados:", error.message);
    return [];
  }
};

// Obtener un empleado por ID.
export const getEmpleadoById = async (id) => {
  try {
    if (!id) {
      throw new Error("El ID del empleado no fue proporcionado.");
    }

    console.log(`Fetching empleado with ID: ${id}`); // Debugging: Log the ID
    const response = await fetch(`${API_URL}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error en la respuesta:", errorData.message); // Debugging: Log the backend error
      throw new Error(errorData.message || `Error al obtener empleado: ${response.status}`);
    }

    const data = await response.json();
    console.log("Empleado obtenido exitosamente:", data); // Debugging: Log the response
    return data; // Assuming the API returns a single employee object
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

    const data = await response.json();
    console.log("Empleado creado:", data);

    if (!response.ok) {
      console.error("Error en la respuesta:", data.errors || data.message); // Log validation errors
      throw new Error(data.errors?.[0]?.defaultMessage || data.message || `Error al crear empleado: ${response.status}`);
    }

    return data; // Assuming the API returns the created employee object
  } catch (error) {
    console.error("Error al crear empleado:", error.message);
    throw error;
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
      throw new Error(`Error al actualizar empleado: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Empleado actualizado:", data);
    return data; // Assuming the API returns the updated employee object
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
      throw new Error(`Error al eliminar empleado: ${response.status} ${response.statusText}`);
    }

    console.log(`Empleado con ID ${id} eliminado exitosamente.`);
    return true;
  } catch (error) {
    console.error("Error al eliminar empleado:", error.message);
    return false;
  }
};
