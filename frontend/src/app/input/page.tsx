"use client";

import dynamic from "next/dynamic";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import ColorPicker from "@/components/input/ColorPicker";
import FaceIndicator from "@/components/input/FaceIndicator";
import ValidationBanner from "@/components/input/ValidationBanner";
import { validateStage1, isComplete, toStateString } from "@/lib/validation";
import type { CubeColors } from "@/components/cube/RubiksCube";

const RubiksCube = dynamic(() => import("@/components/cube/RubiksCube"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full text-gray-500">
      Loading cube...
    </div>
  ),
});

const FACE_ORDER = ["F", "R", "B", "L", "U", "D"] as const;

function makeEmptyColors(): CubeColors {
  return {
    U: Array(9).fill("X"),
    D: Array(9).fill("X"),
    F: Array(9).fill("X"),
    B: Array(9).fill("X"),
    L: Array(9).fill("X"),
    R: Array(9).fill("X"),
  };
}

export default function InputPage() {
  const router = useRouter();
  const [colors, setColors] = useState<CubeColors>(makeEmptyColors());
  const [selectedColor, setSelectedColor] = useState<string>("W");
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<"choose" | "manual">("choose");

  const completedFaces = FACE_ORDER.filter((f) => colors[f]?.every((s) => s !== "X"));
  const allDone = isComplete(colors);

  const handleStickerClick = useCallback(
    (face: keyof CubeColors, index: number) => {
      setColors((prev) => {
        const updated = {
          ...prev,
          [face]: prev[face].map((c, i) => (i === index ? selectedColor : c)),
        };
        setError(validateStage1(updated));
        return updated;
      });
    },
    [selectedColor]
  );

  const handleReset = () => {
    setColors(makeEmptyColors());
    setError(null);
  };

  const handleProceed = () => {
    const state = toStateString(colors);
    sessionStorage.setItem("cubeState", state);
    router.push("/solver");
  };

  if (mode === "choose") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[90vh] px-4">
        <h2 className="text-3xl font-bold mb-2">Enter Cube State</h2>
        <p className="text-gray-400 mb-8 text-sm">Choose how you want to input your cube</p>

        <div className="flex gap-6">
          <button
            onClick={() => setMode("manual")}
            className="bg-gray-900 border border-gray-800 rounded-xl p-8 text-center hover:border-blue-500 transition-colors w-52"
          >
            <div className="text-4xl mb-3">🖱️</div>
            <h3 className="font-semibold mb-1">Manual</h3>
            <p className="text-gray-500 text-sm">Click to color each sticker</p>
          </button>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 text-center w-52 opacity-40 cursor-not-allowed">
            <div className="text-4xl mb-3">📸</div>
            <h3 className="font-semibold mb-1">Upload Images</h3>
            <p className="text-gray-500 text-sm">Coming in Phase 5</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center px-4 py-8 gap-6">
      <div>
        <h2 className="text-3xl font-bold text-center mb-1">Color Your Cube</h2>
        <p className="text-gray-400 text-sm text-center">Select a color then click each sticker</p>
      </div>

      <FaceIndicator completedFaces={completedFaces} />
      <ValidationBanner error={error} />

      <div className="w-full max-w-xl h-[440px] rounded-2xl overflow-hidden border border-gray-800 bg-gray-900">
        <RubiksCube colors={colors} onStickerClick={handleStickerClick} />
      </div>

      <ColorPicker selectedColor={selectedColor} onColorSelect={setSelectedColor} />

      <div className="flex gap-4 mt-2">
        <button
          onClick={handleReset}
          className="px-6 py-2 rounded-lg border border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white transition-colors text-sm"
        >
          Reset
        </button>

        <button
          onClick={handleProceed}
          disabled={!allDone || !!error}
          className={`px-8 py-2 rounded-lg font-semibold text-sm transition-colors ${
            allDone && !error
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-gray-800 text-gray-600 cursor-not-allowed"
          }`}
        >
          {allDone ? "Proceed to Solver →" : `Fill all stickers (${completedFaces.length}/6 faces done)`}
        </button>
      </div>

      <button
        onClick={() => setMode("choose")}
        className="text-gray-600 text-xs hover:text-gray-400 transition-colors"
      >
        ← Back to input selection
      </button>
    </div>
  );
}