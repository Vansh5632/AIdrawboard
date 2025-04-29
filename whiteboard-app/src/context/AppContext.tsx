import React, { createContext, useContext, useState } from 'react';

interface AppContextType {
    canvasState: any; // Replace 'any' with the appropriate type
    setCanvasState: React.Dispatch<React.SetStateAction<any>>; // Replace 'any' with the appropriate type
    aiAnalysisResults: any; // Replace 'any' with the appropriate type
    setAIAnalysisResults: React.Dispatch<React.SetStateAction<any>>; // Replace 'any' with the appropriate type
    collaborationState: any; // Replace 'any' with the appropriate type
    setCollaborationState: React.Dispatch<React.SetStateAction<any>>; // Replace 'any' with the appropriate type
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [canvasState, setCanvasState] = useState<any>(null); // Replace 'any' with the appropriate type
    const [aiAnalysisResults, setAIAnalysisResults] = useState<any>(null); // Replace 'any' with the appropriate type
    const [collaborationState, setCollaborationState] = useState<any>(null); // Replace 'any' with the appropriate type

    return (
        <AppContext.Provider value={{ canvasState, setCanvasState, aiAnalysisResults, setAIAnalysisResults, collaborationState, setCollaborationState }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};