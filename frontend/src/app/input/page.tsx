"use client";

import dynamic from "next/dynamic";
import { DEFAULT_COLORS } from "@/components/cube/RubiksCube";

// Must load dynamically — Three.js needs browser
const RubiksCube = dynamic(() => import("@/components/cube/RubiksCube"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full text-gray-500">
      Loading cube...
    </div>
  ),
});

export default function InputPage() {
  return (
    <div className="flex flex-col items-center px-4 py-8">
      <h2 className="text-3xl font-bold mb-2">Enter Cube State</h2>
      <p className="text-gray-400 mb-8 text-sm">
        Drag to rotate · Click stickers to color (Phase 4)
      </p>

      {/* 3D Cube Viewer */}
      <div className="w-full max-w-xl h-[480px] rounded-2xl overflow-hidden border border-gray-800 bg-gray-900">
        <RubiksCube colors={DEFAULT_COLORS} />
      </div>

      <p className="text-gray-700 text-xs mt-6">
        Manual coloring and image upload coming in Phase 4 & 5...
      </p>
    </div>
  );
}