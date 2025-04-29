import { useState, useEffect } from 'react';

const useCanvas = () => {
    const [canvasState, setCanvasState] = useState({
        elements: [],
        backgroundColor: '#ffffff',
    });

    const addElement = (element) => {
        setCanvasState((prevState) => ({
            ...prevState,
            elements: [...prevState.elements, element],
        }));
    };

    const removeElement = (elementId) => {
        setCanvasState((prevState) => ({
            ...prevState,
            elements: prevState.elements.filter((el) => el.id !== elementId),
        }));
    };

    const clearCanvas = () => {
        setCanvasState({
            elements: [],
            backgroundColor: '#ffffff',
        });
    };

    useEffect(() => {
        // Logic to sync canvas state with external storage or API can be added here
    }, [canvasState]);

    return {
        canvasState,
        addElement,
        removeElement,
        clearCanvas,
    };
};

export default useCanvas;