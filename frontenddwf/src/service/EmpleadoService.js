// /service/EmpleadoService.js

const useMockData = true; // Set to true to use mock data instead of API

const mockEmpleados = [
  {
    id: 1,
    nombre: "Juan",
    apellido: "Pérez",
    email: "juan.perez@example.com",
    fechaIngreso: "2023-01-15",
    cargo: "Gerente de Ventas"
  },
  {
    id: 2,
    nombre: "María",
    apellido: "Gómez",
    email: "maria.gomez@example.com",
    fechaIngreso: "2022-11-01",
    cargo: "Analista de Datos"
  }
];

// Obtener la lista de empleados.
export const getEmpleados = async () => {
  if (useMockData) {
    console.log("Usando datos mock para empleados.");
    return mockEmpleados;
  }
  try {
    const response = await fetch('http://localhost:8000/api/v1/empleado', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    console.log('Datos de empleados:', data);

    if (!response.ok) {
      console.log('Error en la respuesta:', data.message);
      return [];
    }
    // Se asume que la API envía un arreglo en data.data.
    return Array.isArray(data.data) ? data.data : [];
  } catch (error) {
    console.log('Error al obtener empleados:', error.message);
    return [];
  }
};

// Obtener un empleado por ID.
export const getEmpleadoById = async (id) => {
  if (useMockData) {
    console.log(`Usando datos mock para empleado con ID: ${id}`);
    return mockEmpleados.find((empleado) => empleado.id === parseInt(id)) || null;
  }
  try {
    const response = await fetch(`http://localhost:8000/api/v1/empleado/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    console.log('Datos del empleado:', data);

    if (!response.ok) {
      console.log('Error en la respuesta:', data.message);
      return null;
    }
    return data;
  } catch (error) {
    console.log('Error al obtener empleado:', error.message);
    return null;
  }
};

// Crear un nuevo empleado.
export const saveEmpleado = async (empleado) => {
  if (useMockData) {
    console.log("Usando datos mock para crear empleado.");
    const newEmpleado = { ...empleado, id: mockEmpleados.length + 1 };
    mockEmpleados.push(newEmpleado);
    return newEmpleado;
  }
  try {
    const response = await fetch('http://localhost:8000/api/v1/empleado', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      // Se envía el objeto empleado completo.
      body: JSON.stringify(empleado)
    });

    const data = await response.json();
    console.log('Datos:', data);

    if (!response.ok) {
      console.log('Error en la respuesta:', data.message);
      return null;
    }
    return data.data;
  } catch (error) {
    console.log('Error al crear empleado:', error.message);
    return null;
  }
};

// Actualizar un empleado existente.
export const updateEmpleado = async (id, empleado) => {
  if (useMockData) {
    console.log(`Usando datos mock para actualizar empleado con ID: ${id}`);
    const index = mockEmpleados.findIndex((emp) => emp.id === parseInt(id));
    if (index !== -1) {
      mockEmpleados[index] = { ...mockEmpleados[index], ...empleado };
      return mockEmpleados[index];
    }
    return null;
  }
  try {
    const response = await fetch(`http://localhost:8000/api/v1/empleado/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(empleado)
    });

    const data = await response.json();
    console.log('Datos:', data);

    if (!response.ok) {
      console.log('Error en la respuesta:', data.message);
      return null;
    }
    return data.data;
  } catch (error) {
    console.log('Error al actualizar empleado:', error.message);
    return null;
  }
};

// Eliminar un empleado.
export const deleteEmpleado = async (id) => {
  if (useMockData) {
    console.log(`Usando datos mock para eliminar empleado con ID: ${id}`);
    const index = mockEmpleados.findIndex((emp) => emp.id === parseInt(id));
    if (index !== -1) {
      const deletedEmpleado = mockEmpleados.splice(index, 1);
      return deletedEmpleado[0];
    }
    throw new Error("Empleado no encontrado.");
  }
  try {
    const response = await fetch(`http://localhost:8000/api/v1/empleado/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const data = await response.json();
      console.error("Error en la respuesta:", data.message);
      throw new Error(data.message || "Error al eliminar el empleado.");
    }

    console.log(`Empleado con ID ${id} eliminado correctamente.`);
    return true;
  } catch (error) {
    console.error("Error al eliminar empleado:", error.message);
    throw error;
  }
};
