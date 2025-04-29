import axios from 'axios';

const API_BASE_URL = 'https://api.example.com'; // Replace with your actual API base URL

export const fetchAnalysisResults = async (data: any) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/analyze`, data);
        return response.data;
    } catch (error) {
        console.error('Error fetching analysis results:', error);
        throw error;
    }
};

export const saveCanvasData = async (canvasData: any) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/saveCanvas`, canvasData);
        return response.data;
    } catch (error) {
        console.error('Error saving canvas data:', error);
        throw error;
    }
};

export const fetchUserPresence = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/userPresence`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user presence:', error);
        throw error;
    }
};