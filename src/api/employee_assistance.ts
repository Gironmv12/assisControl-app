import axios from "axios";
import { API_URL } from "../../constants";

export interface AttendanceRecord {
  id: number;
  usuario_id: number;
  fecha: string;
  hora_entrada: string;
  hora_salida: string | null;
  registro_manual: string;
}

export async function recordAttendance(token: string) {
  try {
    const response = await axios.post(`${API_URL}/asistencias/registrar-asistencia`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
    console.log('recordAttendance response:', response.data)    // <<-- aquí
    return response.data
  } catch (error) {
    console.error('Error al registrar asistencia:', error)
    throw error
  }
}


/**
 * Obtiene todas las asistencias del usuario autenticado.
 *
 * @param token - Token JWT de autorización.
 * @returns Promise<AttendanceRecord[]> - Lista de registros de asistencia.
 */
export async function fetchAttendances(token: string): Promise<AttendanceRecord[]> {
  try {
    const { data } = await axios.get<{ asistencias: AttendanceRecord[] }>(
      `${API_URL}/asistencias/consultar-asistencias`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return data.asistencias;
  } catch (error) {
    console.error("Error al consultar asistencias:", error);
    throw error;
  }
}