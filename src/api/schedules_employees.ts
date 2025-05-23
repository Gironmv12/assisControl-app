import axios from 'axios'
import { API_URL } from '../../constants'

export interface ScheduleEmployee {
  id: number
  empleado_id: number
  dia_semana: string
  hora_inicio: string
  hora_fin: string
}

export async function fetchSchedulesEmployees(
  token: string
): Promise<ScheduleEmployee[]> {
  try {
    const { data } = await axios.get<{ horarios: ScheduleEmployee[] }>(
      `${API_URL}/horarios/`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    return data.horarios
  } catch (error) {
    console.error('Error fetching schedules employees:', error)
    throw error
  }
}