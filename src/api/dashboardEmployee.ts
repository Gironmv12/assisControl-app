import axios from 'axios';
import { API_URL } from '../../constants';

export interface ResumenResponse {
    nombre_completo: string;
    asistencia_hoy: boolean;
    horario_del_dia:{
        dia: string;
        hora_inicio: string;
        hora_fin: string;
    }
    asistencias_del_mes: number;
    ultima_asistencia: {
        fecha: string;
        hora_entrada: string;
        hora_salida: string;
    };
    avisos: string | null;
}

/**
 * Obtiene el resumen de inicio para el empleado desde la API.
 *
 * Realiza una solicitud GET al endpoint `${API_URL}/inicio/resumen` y retorna la respuesta tipada como `ResumenResponse`.
 * Si ocurre un error en la solicitud, lanza una excepción con un mensaje descriptivo.
 *
 * @returns {Promise<ResumenResponse>} Promesa que resuelve con el resumen obtenido de la API.
 * @throws {Error} Si ocurre un error en la solicitud o en la respuesta del servidor.
 */
export async function getResumen(token: string): Promise<ResumenResponse> {
  try {
    const { data } = await axios.get<ResumenResponse>(`${API_URL}/inicio/resumen`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message || 'Error desconocido en la respuesta del servidor';
      throw new Error(`Error al obtener el resumen: ${message}`);
    } else {
      throw new Error(`Error inesperado al obtener el resumen: ${error?.message || error}`);
    }
  }
}