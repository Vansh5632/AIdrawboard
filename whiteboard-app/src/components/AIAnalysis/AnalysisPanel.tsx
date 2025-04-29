import React from 'react';
import { useAIAnalysis } from '../../hooks/useAIAnalysis';
import AnalysisResult from './AnalysisResult';

const AnalysisPanel: React.FC = () => {
    const { analysisResults } = useAIAnalysis();

    return (
        <div className="analysis-panel">
            <h2>AI Analysis Results</h2>
            {analysisResults.length > 0 ? (
                analysisResults.map((result, index) => (
                    <AnalysisResult key={index} result={result} />
                ))
            ) : (
                <p>No analysis results available.</p>
            )}
        </div>
    );
};

export default AnalysisPanel;