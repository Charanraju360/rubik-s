"use client";

import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import CubeFace from "./CubeFace";
import { ThreeEvent } from "@react-three/fiber";

export interface CubeColors {
  U: string[]; // Up    - White
  D: string[]; // Down  - Yellow
  F: string[]; // Front - Red
  B: string[]; // Back  - Orange
  L: string[]; // Left  - Blue
  R: string[]; // Right - Green
}

export const DEFAULT_COLORS: CubeColors = {
  U: Array(9).fill("W"),
  D: Array(9).fill("Y"),
  F: Array(9).fill("R"),
  B: Array(9).fill("O"),
  L: Array(9).fill("B"),
  R: Array(9).fill("G"),
};

interface RubiksCubeProps {
  colors?: CubeColors;
  onStickerClick?: (
    face: keyof CubeColors,
    index: number,
    e: ThreeEvent<MouseEvent>
  ) => void;
}

const GAP = 3.05;

export default function RubiksCube({
  colors = DEFAULT_COLORS,
  onStickerClick,
}: RubiksCubeProps) {
  return (
    <Canvas
      camera={{ position: [5, 5, 5], fov: 45 }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 5]} intensity={1} />

      <group>
        {/* Front face - Z+ */}
        <CubeFace
          colors={colors.F}
          position={[0, 0, GAP / 2]}
          rotation={[0, 0, 0]}
          onStickerClick={(i, e) => onStickerClick?.("F", i, e)}
        />

        {/* Back face - Z- */}
        <CubeFace
          colors={colors.B}
          position={[0, 0, -GAP / 2]}
          rotation={[0, Math.PI, 0]}
          onStickerClick={(i, e) => onStickerClick?.("B", i, e)}
        />

        {/* Left face - X- */}
        <CubeFace
          colors={colors.L}
          position={[-GAP / 2, 0, 0]}
          rotation={[0, -Math.PI / 2, 0]}
          onStickerClick={(i, e) => onStickerClick?.("L", i, e)}
        />

        {/* Right face - X+ */}
        <CubeFace
          colors={colors.R}
          position={[GAP / 2, 0, 0]}
          rotation={[0, Math.PI / 2, 0]}
          onStickerClick={(i, e) => onStickerClick?.("R", i, e)}
        />

        {/* Up face - Y+ */}
        <CubeFace
          colors={colors.U}
          position={[0, GAP / 2, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          onStickerClick={(i, e) => onStickerClick?.("U", i, e)}
        />

        {/* Down face - Y- */}
        <CubeFace
          colors={colors.D}
          position={[0, -GAP / 2, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          onStickerClick={(i, e) => onStickerClick?.("D", i, e)}
        />
      </group>

      <OrbitControls enablePan={false} minDistance={4} maxDistance={12} />
    </Canvas>
  );
}