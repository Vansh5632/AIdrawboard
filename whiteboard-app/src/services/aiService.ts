import axios from 'axios';
import { AnalysisData } from '../types/analysis';

const AI_SERVICE_URL = 'https://api.example.com/ai'; // Replace with your actual AI service URL

export const fetchAIAnalysis = async (canvasData: any): Promise<AnalysisData> => {
    try {
        const response = await axios.post(`${AI_SERVICE_URL}/analyze`, { data: canvasData });
        return response.data;
    } catch (error) {
        console.error('Error fetching AI analysis:', error);
        throw new Error('Failed to fetch AI analysis');
    }
};