// stores/useWhiteboardStore.ts
import { create } from 'zustand';

type Element = {
  id: string;
  type: 'text' | 'rectangle' | 'ellipse';
  x: number;
  y: number;
  text?: string;
};

interface WhiteboardState {
  elements: Element[];
  roomId: string | null;
  setElements: (elements: Element[]) => void;
}

export const useWhiteboardStore = create<WhiteboardState>((set) => ({
  elements: [],
  roomId: null,
  setElements: (elements) => set({ elements }),
}));