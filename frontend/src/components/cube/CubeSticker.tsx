"use client";

import { ThreeEvent } from "@react-three/fiber";

interface StickerProps {
  position: [number, number, number];
  color: string;
  onClick?: (e: ThreeEvent<MouseEvent>) => void;
}

export const COLOR_MAP: Record<string, string> = {
  W: "#ffffff",
  Y: "#ffd500",
  R: "#ff3000",
  O: "#ff8c00",
  B: "#0045ad",
  G: "#009b48",
  X: "#222222",
};

export default function CubeSticker({ position, color, onClick }: StickerProps) {
  const hex = COLOR_MAP[color] ?? COLOR_MAP["X"];

  return (
    <mesh position={position} onClick={onClick}>
      <planeGeometry args={[0.85, 0.85]} />
      <meshStandardMaterial color={hex} />
    </mesh>
  );
}