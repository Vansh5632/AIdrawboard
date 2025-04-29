import React, { createContext, useContext, useState } from 'react';
import { CanvasState } from '../types/canvas';

const CanvasContext = createContext<{
  canvasState: CanvasState;
  setCanvasState: React.Dispatch<React.SetStateAction<CanvasState>>;
} | undefined>(undefined);

export const CanvasProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [canvasState, setCanvasState] = useState<CanvasState>({
    elements: [],
    // Add other initial state properties as needed
  });

  return (
    <CanvasContext.Provider value={{ canvasState, setCanvasState }}>
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvasContext = () => {
  const context = useContext(CanvasContext);
  if (!context) {
    throw new Error('useCanvasContext must be used within a CanvasProvider');
  }
  return context;
};