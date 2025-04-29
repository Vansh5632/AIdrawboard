import React, { useEffect, useState } from 'react';
import Excalidraw from '@excalidraw/excalidraw';
import { useCanvas } from '../../hooks/useCanvas';

const ExcalidrawWrapper: React.FC = () => {
    const { canvasState, updateCanvasState } = useCanvas();
    const [elements, setElements] = useState(canvasState.elements || []);
    const [appState, setAppState] = useState(canvasState.appState || {});

    useEffect(() => {
        setElements(canvasState.elements);
        setAppState(canvasState.appState);
    }, [canvasState]);

    const handleChange = (newElements: any[], newAppState: any) => {
        setElements(newElements);
        setAppState(newAppState);
        updateCanvasState({ elements: newElements, appState: newAppState });
    };

    return (
        <Excalidraw
            initialData={{ elements, appState }}
            onChange={handleChange}
            style={{ width: '100%', height: '100%' }}
        />
    );
};

export default ExcalidrawWrapper;