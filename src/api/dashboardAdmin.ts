import axios from 'axios';
import { API_URL } from '../../constants';

/**
 * Obtiene los datos de asistencia del día desde el endpoint del dashboard.
 *
 * @async
 * @function
 * @returns {Promise<any>} Una promesa que resuelve con los datos de asistencia.
 * @throws {Error} Lanza un error si no se puede obtener la información de asistencia.
 */
export const fetchAssistDay = async (): Promise<any> => {
    try {
        const response = await axios.get(`${API_URL}/dashboard/asistencias`);
        return response.data;
    } catch (error) {
        console.error('error :', error);
        throw new Error('Failed to fetch assist day');
    }
};
