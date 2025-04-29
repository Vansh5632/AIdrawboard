import { useState, useEffect } from 'react';
import { fetchAIAnalysis } from '../services/aiService';
import { AnalysisData } from '../types/analysis';

const useAIAnalysis = (canvasData: any) => {
    const [analysisResults, setAnalysisResults] = useState<AnalysisData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const analyzeCanvasData = async () => {
            setLoading(true);
            setError(null);
            try {
                const results = await fetchAIAnalysis(canvasData);
                setAnalysisResults(results);
            } catch (err) {
                setError('Failed to fetch AI analysis results');
            } finally {
                setLoading(false);
            }
        };

        if (canvasData) {
            analyzeCanvasData();
        }
    }, [canvasData]);

    return { analysisResults, loading, error };
};

export default useAIAnalysis;