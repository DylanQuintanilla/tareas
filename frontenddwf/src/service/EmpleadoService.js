const API_URL = "http://localhost:8080/empleados";

// Obtener la lista de empleados.
export const obtenerEmpleados = async () => {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Error al obtener empleados: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Datos de empleados:", data);
    return data;
  } catch (error) {
    console.error("Error al obtener empleados:", error.message);
    return [];
  }
};


// Obtener un empleado por ID (nueva función).
export const getEmpleadoById = async (id) => {
  try {
    if (!id || id === "undefined") {
      throw new Error("El ID del empleado no fue proporcionado.");
    }
    console.log(`Fetching empleado con ID: ${id}`);
    const response = await fetch(`${API_URL}/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      // Intenta extraer mensaje de error solo si hay contenido
      let errorMsg = `Error al obtener empleado: ${response.status}`;
      try {
        const errorData = await response.clone().json();
        errorMsg = errorData.message || errorMsg;
      } catch (e) {
        // No hay JSON en la respuesta
      }
      console.error("Error en la respuesta:", errorMsg);
      throw new Error(errorMsg);
    }

    // Si la respuesta está vacía, retorna null
    const text = await response.text();
    if (!text) {
      return null;
    }
    const data = JSON.parse(text);
    console.log("Empleado obtenido exitosamente:", data);
    return data;
  } catch (error) {
    console.error("Error al obtener empleado:", error.message);
    return null;
  }
};

// Alias para getEmpleado (nueva función).
export const obtenerEmpleado = getEmpleadoById;

// Export getEmpleados for consistency
export const getEmpleados = obtenerEmpleados;


// Crear un nuevo empleado.
export const createEmpleado = async (empleado) => {
  try {
    console.log("Enviando datos del empleado:", empleado);
    // No incluyas el campo id en el body
    const {
      nombrePersona,
      usuario,
      numeroDUI,
      numeroTelefono,
      correoInstitucional,
      fechaNacimiento,
    } = empleado;

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombrePersona,
        usuario,
        numeroDUI,
        numeroTelefono,
        correoInstitucional,
        fechaNacimiento,
      }),
    });

    // Maneja respuesta vacía o error
    let data = null;
    const text = await response.text();
    if (text) {
      data = JSON.parse(text);
    }

    if (!response.ok) {
      const errorMsg =
        (data && (data.errors?.[0]?.defaultMessage || data.message)) ||
        `Error al crear empleado: ${response.status}`;
      console.error("Error en la respuesta:", errorMsg);
      throw new Error(errorMsg);
    }

    console.log("Empleado creado:", data);
    return data;
  } catch (error) {
    console.error("Error al crear empleado:", error.message);
    throw error;
  }
};

export const updateEmpleado = async (id, empleado) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(empleado),
    });

    if (!response.ok) {
      throw new Error(`Error al actualizar empleado: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Empleado actualizado:", data);
    return { ...data, id: data.id || data._id };
  } catch (error) {
    console.error("Error al actualizar empleado:", error.message);
    throw error;
  }
};

// Eliminar un empleado.
export const deleteEmpleado = async (id) => {
  try {
    if (!id) {
      throw new Error("El ID del empleado no fue proporcionado.");
    }

    console.log(`Eliminando empleado con ID: ${id}`); // Debugging: Log the ID
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error en la respuesta:", errorData.message); // Debugging: Log the backend error
      throw new Error(errorData.message || `Error al eliminar empleado: ${response.status}`);
    }

    console.log(`Empleado con ID ${id} eliminado exitosamente.`);
    return true;
  } catch (error) {
    console.error("Error al eliminar empleado:", error.message);
    return false;
  }
};
