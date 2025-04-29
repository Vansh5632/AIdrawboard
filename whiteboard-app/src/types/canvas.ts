export type CanvasState = {
    elements: any[]; // Replace 'any' with the specific type for elements if available
    zoom: number;
    scrollX: number;
    scrollY: number;
};

export type CanvasProps = {
    initialState: CanvasState;
    onChange: (newState: CanvasState) => void;
};