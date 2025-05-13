import axios from 'axios';
import { API_URL } from '../../constants';

/**
 * Inicia sesión de un usuario enviando las credenciales al servidor.
 *
 * @param {string} username - El nombre de usuario del usuario que intenta iniciar sesión.
 * @param {string} password - La contraseña del usuario que intenta iniciar sesión.
 * @returns {Promise<any>} Una promesa que resuelve con los datos de la respuesta del servidor si el inicio de sesión es exitoso.
 * @throws {Error} Lanza un error si ocurre un problema durante la solicitud de inicio de sesión.
 */
export async function loginUser(username: string, password: string) {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      username,
      password
    });
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}