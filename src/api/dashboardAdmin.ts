import axios from 'axios';
import { API_URL } from '../../constants';

export const fetchAssistDay = async (): Promise<any> => {
    try {
        const response = await axios.get(`${API_URL}/dashboard/asistencias`);
        return response.data;
    } catch (error) {
        console.error('error :', error);
        throw new Error('Failed to fetch assist day');
    }
};
