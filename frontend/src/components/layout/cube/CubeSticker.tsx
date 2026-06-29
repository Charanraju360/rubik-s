import { ThreeEvent } from "@react-three/fiber";

interface StickerProps {
  position: [number, number, number];
  color: string;
  onClick?: (e: ThreeEvent<MouseEvent>) => void;
}

const COLOR_MAP: Record<string, string> = {
  W: "#ffffff", // White
  Y: "#ffd500", // Yellow
  R: "#ff3000", // Red
  O: "#ff8c00", // Orange
  B: "#0045ad", // Blue
  G: "#009b48", // Green
  X: "#1a1a1a", // Unknown / unset
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