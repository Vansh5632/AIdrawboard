import React from 'react';
import ExcalidrawWrapper from './ExcalidrawWrapper';
import { useCanvas } from '../../hooks/useCanvas';
import { useAIAnalysis } from '../../hooks/useAIAnalysis';
import { useCollaboration } from '../../hooks/useCollaboration';
import AnalysisPanel from '../AIAnalysis/AnalysisPanel';
import CollaborationControls from '../Collaboration/CollaborationControls';

const Canvas: React.FC = () => {
    const { canvasState, updateCanvas } = useCanvas();
    const { analysisResults } = useAIAnalysis();
    const { collaborationState } = useCollaboration();

    return (
        <div className="canvas-container">
            <ExcalidrawWrapper canvasState={canvasState} updateCanvas={updateCanvas} />
            <AnalysisPanel results={analysisResults} />
            <CollaborationControls state={collaborationState} />
        </div>
    );
};

export default Canvas;