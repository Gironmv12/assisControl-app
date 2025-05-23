import axios from "axios";
import { API_URL } from "../../constants";

export interface ProfileResponse {
    datos_cuenta:{
        id: number;
        username: string;
    },
    datos_personales:{
        nombre: string;
        apellido_paterno: string;
        apellido_materno: string;
        correo: string;
        telefono: string;
    },
    informacion_laboral:{
        puesto: string;
        departamento: string;
        numero_identificador: string;
    }
}

export async function fetchMyProfile(token: string): Promise<ProfileResponse> {
  try {
    const { data } = await axios.get<ProfileResponse>(
      `${API_URL}/perfil/me`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
    return data
  } catch (error) {
    console.error('Error fetching profile:', error)
    throw error
  }
}