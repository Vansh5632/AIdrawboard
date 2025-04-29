import React from 'react';
import Canvas from '../Canvas';
import AnalysisPanel from '../AIAnalysis/AnalysisPanel';
import CollaborationControls from '../Collaboration/CollaborationControls';
import './MainLayout.css';

const MainLayout: React.FC = () => {
    return (
        <div className="main-layout">
            <div className="canvas-container">
                <Canvas />
            </div>
            <div className="analysis-panel">
                <AnalysisPanel />
            </div>
            <div className="collaboration-controls">
                <CollaborationControls />
            </div>
        </div>
    );
};

export default MainLayout;