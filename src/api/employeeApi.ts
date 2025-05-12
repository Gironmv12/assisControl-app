import axios from "axios";
import { API_URL } from "../../constants";

// Interface para representar la información de la persona
export interface Persona {
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    curp: string;
    correo: string;
    telefono: string;
}

// Interface del usuario que contiene la persona
export interface Usuario {
    persona: Persona;
    username: string;
}

// Interface del empleado con la estructura completa retornada por la API
export interface Empleado {
    id: number;
    usuario_id: number;
    puesto: string;
    departamento: string;
    numero_identificador: string;
    usuario: Usuario;
    horarios_laborales: Array<{
        id: number;
        empleado_id: number;
        dia_semana: string;
        hora_inicio: string;
        hora_fin: string;
    }>;
}

// Interface para la vista que muestra solo los campos necesarios (ahora con id)
export interface EmpleadoDatos {
    id: number;
    nombre: string;
    puesto: string;
    departamento: string;
    apellido_paterno: string;
    apellido_materno: string;
}

//nueva interfaz para crear un empleado
export interface CreateEmployeePayload {
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    curp: string;
    correo: string;
    telefono: string;
    username: string;
    password: string;
    puesto: string;
    departamento: string;
    horarios: Array<{
        dia_semana: string;
        hora_inicio: string;
        hora_fin: string;
    }>;
}

// Función para obtener la lista de empleados desde la API
export const fecthEmployees = async (): Promise<EmpleadoDatos[]> => {
    try {
        const response = await axios.get<Empleado[]>(`${API_URL}/empleados`);

        // Mapeamos los datos para obtener la estructura requerida
        const empleados: EmpleadoDatos[] = response.data.map((employee) => ({
            id: employee.id,
            nombre: employee.usuario.persona.nombre,
            apellido_paterno: employee.usuario.persona.apellido_paterno,
            apellido_materno: employee.usuario.persona.apellido_materno,
            puesto: employee.puesto,
            departamento: employee.departamento,
        }));

        return empleados;

    } catch (error) {
        console.error("Error fetching employees:", error);
        throw new Error("Failed to fetch employees");
    }
};

// Función para obtener un empleado por id
export const fecthEmployeeById = async (id: number): Promise<Empleado> => {
    try {
        const response = await axios.get<Empleado>(`${API_URL}/empleados/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching employee by ID:", error);
        throw new Error("Failed to fetch employee");
    }
};

//funcion para consumir el enpoint POST para crear un empleado

export const createEmployee = async (payload: CreateEmployeePayload): Promise<Empleado> => {
    try {
        const response = await axios.post<Empleado>(`${API_URL}/empleados/crear`, payload);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            // El servidor respondió con un código de estado fuera del rango 2xx
            console.error("Error response data:", error.response.data);
            console.error("Error response status:", error.response.status);
            console.error("Error response headers:", error.response.headers);
        } else if (error.request) {
            // La solicitud fue hecha pero no se recibió respuesta
            console.error("Error request:", error.request);
        } else {
            // Algo pasó al configurar la solicitud que desencadenó un error
            console.error("Error message:", error.message);
        }
        throw new Error("Failed to create employee");
    }
};
//funcion para consumir el enpoint PUT para actualizar un empleado
export const updateEmployee = async (id: number, payload: CreateEmployeePayload): Promise<Empleado> => {
    try {
        const response = await axios.put<Empleado>(`${API_URL}/empleados/${id}`, payload);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            // El servidor respondió con un código de estado fuera del rango 2xx
            console.error("Error response data:", error.response.data);
            console.error("Error response status:", error.response.status);
            console.error("Error response headers:", error.response.headers);
        } else if (error.request) {
            // La solicitud fue hecha pero no se recibió respuesta
            console.error("Error request:", error.request);
        } else {
            // Algo pasó al configurar la solicitud que desencadenó un error
            console.error("Error message:", error.message);
        }
        throw new Error("Failed to update employee");
    }
}

//funcion para consumir el enpoint DELETE para eliminar un empleado
export const deleteEmployee = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/empleados/${id}`);
    } catch (error: any) {
        if (error.response) {
            // El servidor respondió con un código de estado fuera del rango 2xx
            console.error("Error response data:", error.response.data);
            console.error("Error response status:", error.response.status);
            console.error("Error response headers:", error.response.headers);
        } else if (error.request) {
            // La solicitud fue hecha pero no se recibió respuesta
            console.error("Error request:", error.request);
        } else {
            // Algo pasó al configurar la solicitud que desencadenó un error
            console.error("Error message:", error.message);
        }
        throw new Error("Failed to delete employee");
    }
};