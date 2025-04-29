import React from 'react';
import { AnalysisResult as AnalysisResultType } from '../../types/analysis';

interface AnalysisResultProps {
    result: AnalysisResultType;
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({ result }) => {
    return (
        <div className="analysis-result">
            <h3>{result.title}</h3>
            <p>{result.description}</p>
            <div className="result-details">
                <strong>Score:</strong> {result.score}
            </div>
        </div>
    );
};

export default AnalysisResult;