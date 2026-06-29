import CubeSticker from "./CubeSticker";
import { ThreeEvent } from "@react-three/fiber";

interface FaceProps {
  colors: string[];
  position: [number, number, number];
  rotation: [number, number, number];
  onStickerClick?: (index: number, e: ThreeEvent<MouseEvent>) => void;
}

export default function CubeFace({
  colors,
  position,
  rotation,
  onStickerClick,
}: FaceProps) {
  return <group position={position} rotation={rotation}></group>;
}