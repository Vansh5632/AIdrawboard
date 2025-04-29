// src/app/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { Excalidraw } from "@excalidraw/excalidraw";
import { useWhiteboardStore } from "@/stores/useWhiteboardStore";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type {
  ExcalidrawImperativeAPI
} from "@excalidraw/excalidraw/types";

export default function Home() {
  const { elements, setElements, roomId } = useWhiteboardStore();
  const [showAnalysis, setShowAnalysis] = useState(false);
  const excalidrawRef = useRef<ExcalidrawImperativeAPI|null>(null);
  const [isCollaborating, setIsCollaborating] = useState(false);

  // Handle canvas changes

  const handleChange = (elements) => {
    setElements(elements);
    // Additional logic for saving or processing changes could go here
  };

  // Toggle AI analysis panel
  const toggleAnalysis = () => {
    setShowAnalysis(!showAnalysis);
  };

  // Toggle collaboration mode
  const toggleCollaboration = () => {
    setIsCollaborating(!isCollaborating);
    // Additional logic for initiating collaboration session could go here
  };

  return (
    <main className="h-screen flex flex-col">
      {/* Top toolbar */}
      <div className="bg-secondary p-2 flex justify-between items-center">
        <h1 className="text-xl font-bold">Whiteboard</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={toggleAnalysis}>
            {showAnalysis ? "Hide Analysis" : "Show Analysis"}
          </Button>
          <Button
            variant={isCollaborating ? "secondary" : "outline"}
            size="sm"
            onClick={toggleCollaboration}
          >
            {isCollaborating ? "Stop Sharing" : "Collaborate"}
          </Button>
        </div>
      </div>

      {/* Main content area with Excalidraw and optional panels */}
      <div className="flex flex-1 overflow-hidden">
        {/* Excalidraw canvas (main component) */}
        <div className={cn("flex-1", showAnalysis ? "w-3/4" : "w-full")}>
          <Excalidraw
            ref={excalidrawRef}
            onChange={handleChange}
            initialData={{ elements }}
            excalidrawAPI={(api) => {
              // This ensures the component updates when elements change in the store
              if (api && elements) {
                api.updateScene({ elements });
              }
            }}
          />
        </div>

        {/* AI Analysis Panel (conditionally rendered) */}
        {showAnalysis && (
          <div className="w-1/4 bg-card p-4 border-l border-border overflow-y-auto">
            <h2 className="text-lg font-medium mb-4">AI Analysis</h2>
            <div className="space-y-4">
              <div className="bg-muted p-3 rounded-md">
                <h3 className="font-medium">Shape Recognition</h3>
                <p className="text-sm text-muted-foreground">
                  Detected 3 rectangles, 2 circles, and 1 triangle
                </p>
              </div>
              <div className="bg-muted p-3 rounded-md">
                <h3 className="font-medium">Text Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Identified key topics: Design, Planning, Structure
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Collaboration status bar (bottom) */}
      {isCollaborating && (
        <div className="bg-accent p-2 flex items-center gap-2">
          <div className="text-sm">
            <span className="font-medium">Room: </span>
            <span className="text-muted-foreground">
              {roomId || "Creating session..."}
            </span>
          </div>
          <div className="ml-auto flex gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            <span className="text-xs">2 users connected</span>
          </div>
        </div>
      )}
    </main>
  );
}
