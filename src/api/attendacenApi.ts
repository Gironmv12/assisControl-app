import axios, { AxiosError } from 'axios';
import { API_URL } from '../../constants';

// Configuración de una instancia de Axios
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Payload para registrar una nueva asistencia.
 */
export interface AsistenciaPayload {
  usuario_id: number;
  fecha: string;
  hora_entrada: string;
  hora_salida: string;
  registro_manual?: string; // Opcional, indica quién registró manualmente
}

/**
 * Payload para actualizar una asistencia existente.
 */
export interface ActualizarAsistenciaPayload {
  hora_entrada: string;
  hora_salida: string;
  registro_manual?: string; // Opcional, indica quién actualizó manualmente
}

/**
 * Parámetros de consulta para obtener asistencias.
 */
export interface ConsultarAsistenciasQuery {
  usuario_id?: number;
  fecha?: string;
  fecha_inicio?: string;
  fecha_fin?: string;
}

// Función auxiliar para manejar errores de manera consistente
function handleAxiosError(error: unknown): never {
  if (axios.isAxiosError(error)) {
    console.error('Error de Axios:', error.response?.data);
  } else {
    console.error('Error desconocido:', error);
  }
  throw error;
}

export interface Usuario {
  id: number;
  persona_id: number;
  username: string;
  password_hash: string;
  rol_id: number;
  persona: {
    id: number;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    curp: string;
    correo: string;
    telefono: string;
  }
}

/**
 * Registra una nueva asistencia.
 * @param asistencia Datos de la asistencia a registrar.
 * @returns Promesa con la respuesta del servidor.
 */
export async function registrarAsistencia(asistencia: AsistenciaPayload): Promise<any> {
  const payload = {
    ...asistencia,
    registro_manual: asistencia.registro_manual ?? 'admin', // Usa 'admin' si no se proporciona
  };
  try {
    const response = await apiClient.post('/asistencias/registrar', payload);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
}

/**
 * Actualiza una asistencia existente.
 * @param id ID de la asistencia a actualizar.
 * @param asistencia Datos actualizados de la asistencia.
 * @returns Promesa con la respuesta del servidor.
 */
export async function actualizarAsistencia(id: number, asistencia: ActualizarAsistenciaPayload): Promise<any> {
  try {
    const response = await apiClient.put(`/asistencias/actualizar/${id}`, asistencia);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
}

/**
 * Consulta asistencias basadas en parámetros de query.
 * @param query Parámetros de consulta.
 * @returns Promesa con la lista de asistencias.
 */
export async function consultarAsistencias(query: ConsultarAsistenciasQuery): Promise<any> {
  try {
    const response = await apiClient.get('/asistencias/consultar', { params: query });
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
}

/**
 * Obtiene la lista de usuarios.
 * @returns Promesa con la lista de usuarios.
 */
export async function obtenerUsuarios(): Promise<Usuario[]> {
    try {
        const response = await apiClient.get('/empleados/usuarios');
        if (!response.data || !Array.isArray(response.data)) {
            throw new Error('La respuesta del servidor no es válida o no contiene una lista de usuarios.');
        }
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                console.error('Error en la respuesta del servidor:', error.response.data);
            } else if (error.request) {
                console.error('No se recibió respuesta del servidor:', error.request);
            } else {
                console.error('Error al configurar la solicitud:', error.message);
            }
        } else {
            console.error('Error desconocido al obtener usuarios:', error);
        }
        handleAxiosError(error);
    }
}