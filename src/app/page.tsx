"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useWhiteboardStore } from "@/stores/useWhiteboardStore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";
import type { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types";
import { convertToExcalidrawElements } from "@excalidraw/excalidraw";

// Dynamically import Excalidraw to ensure it only runs on the client
const Excalidraw = dynamic(
  async () => {
    const { Excalidraw } = await import("@excalidraw/excalidraw");
    return Excalidraw;
  },
  { ssr: false }
);

export default function Home() {
  const { setElements, roomId } = useWhiteboardStore();
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [isCollaborating, setIsCollaborating] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const excalidrawRef = useRef<ExcalidrawImperativeAPI | null>(null);
  const isInitialMount = useRef(true);
  const [isClient, setIsClient] = useState(false); // New state to track client-side rendering

  // Initial shapes
  const elements = convertToExcalidrawElements([
    { type: "rectangle", x: 100, y: 250 },
    { type: "ellipse", x: 250, y: 250 },
    { type: "diamond", x: 380, y: 250 },
  ]);

  const handleChange = (updatedElements: any) => {
    if (JSON.stringify(updatedElements) !== JSON.stringify(elements)) {
      setElements(updatedElements);
    }
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (excalidrawRef.current && elements) {
      excalidrawRef.current.updateScene({ elements });
    }
  }, [elements]);

  useEffect(() => {
    setIsClient(true); // Set isClient to true when the component mounts on the client
  }, []);

  const toggleAnalysis = () => setShowAnalysis(!showAnalysis);
  const toggleCollaboration = () => setIsCollaborating(!isCollaborating);
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    document.documentElement.classList.toggle("dark");
  };

  return (
    <TooltipProvider>
      <main className="h-screen flex flex-col font-sans">
        {/* Top Toolbar */}
        <div className="backdrop-blur-xl bg-gray-900/50 border-b border-gray-700/50 shadow-2xl p-4 flex justify-between items-center rounded-b-3xl mx-4 mt-4 transition-all duration-300">
          <h1 className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
            Whiteboard
          </h1>
          <div className="flex gap-3 items-center">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleAnalysis}
                  className="relative bg-gray-800/50 border-gray-600 text-white hover:bg-gradient-to-r hover:from-pink-500/20 hover:to-purple-500/20 transition-all duration-300 hover:shadow-[0_0_15px_rgba(236,72,153,0.5)]"
                >
                  {showAnalysis ? "Hide Analysis" : "Show Analysis"}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Toggle AI analysis panel</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={isCollaborating ? "secondary" : "outline"}
                  size="sm"
                  onClick={toggleCollaboration}
                  className={cn(
                    "relative bg-gray-800/50 border-gray-600 text-white transition-all duration-300",
                    isCollaborating
                      ? "bg-gradient-to-r from-green-400 to-blue-500 shadow-[0_0_15px_rgba(74,222,128,0.5)]"
                      : "hover:bg-gradient-to-r hover:from-green-400/20 hover:to-blue-500/20 hover:shadow-[0_0_15px_rgba(74,222,128,0.3)]"
                  )}
                >
                  {isCollaborating ? "Stop Sharing" : "Collaborate"}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Start or stop collaborative session</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleTheme}
                  className="text-white hover:bg-gray-700/50"
                >
                  {theme === "dark" ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Toggle {theme === "dark" ? "light" : "dark"} mode</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-1 overflow-hidden px-4 py-2 gap-4">
          {/* Excalidraw Canvas */}
          <div
            className={cn(
              "flex-1 rounded-3xl shadow-2xl overflow-hidden transition-all duration-500 bg-white/10 backdrop-blur-md",
              showAnalysis ? "w-3/4" : "w-full",
              "border border-gray-700/50 hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]"
            )}
          >
            {isClient && (
              <Excalidraw
                excalidrawAPI={(api) => (excalidrawRef.current = api)}
                onChange={handleChange}
                initialData={{
                  elements,
                  appState: {
                    zenModeEnabled: true,
                    viewBackgroundColor: "#a5d8ff",
                    theme,
                  },
                  scrollToContent: true,
                }}
                theme={theme}
              />
            )}
          </div>

          {/* AI Analysis Panel */}
          {showAnalysis && (
            <Card
              className={cn(
                "w-1/4 bg-gray-900/70 backdrop-blur-xl border-gray-700/50 rounded-3xl shadow-2xl flex flex-col gap-4",
                "animate-in slide-in-from-right duration-500 hover:shadow-[0_0_20px_rgba(236,72,153,0.3)]"
              )}
            >
              <CardHeader className="px-6 py-4 pb-2">
                <CardTitle className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400">
                  AI Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="px-6 py-2 space-y-6">
                <div className="bg-gray-800/50 p-4 rounded-xl shadow-inner hover:bg-gray-800/70 transition-colors">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-white">
                      Shape Recognition
                    </h3>
                    <Badge
                      variant="outline"
                      className="bg-gradient-to-r from-indigo-500/20 to-pink-500/20 text-white border-indigo-500/50"
                    >
                      3 items
                    </Badge>
                  </div>
                  <Separator className="bg-gray-700/50 my-2" />
                  <p className="text-sm text-gray-300">
                    Detected{" "}
                    <span className="font-bold text-pink-400">1 rectangle</span>
                    ,{" "}
                    <span className="font-bold text-indigo-400">1 ellipse</span>
                    , and{" "}
                    <span className="font-bold text-purple-400">1 diamond</span>
                  </p>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-xl shadow-inner hover:bg-gray-800/70 transition-colors">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-white">Text Analysis</h3>
                    <Badge
                      variant="outline"
                      className="bg-gradient-to-r from-indigo-500/20 to-pink-500/20 text-white border-indigo-500/50"
                    >
                      3 topics
                    </Badge>
                  </div>
                  <Separator className="bg-gray-700/50 my-2" />
                  <p className="text-sm text-gray-300">
                    Identified key topics:{" "}
                    <span className="font-bold text-indigo-300">Design</span>,{" "}
                    <span className="font-bold text-pink-300">Planning</span>,{" "}
                    <span className="font-bold text-purple-300">Structure</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Collaboration Status Bar */}
        {isCollaborating && (
          <div className="bg-gradient-to-r from-green-500/80 to-blue-600/80 text-white p-3 flex items-center gap-2 rounded-t-3xl mx-4 mb-4 shadow-2xl animate-in slide-in-from-bottom duration-300">
            <div className="text-sm">
              <span className="font-semibold">Collaboration Active</span> — Room
              ID:{" "}
              <span className="font-mono bg-black/20 px-2 py-0.5 rounded">
                {roomId || "123-abc"}
              </span>
            </div>
          </div>
        )}
      </main>
    </TooltipProvider>
  );
}