import CubeSticker from "./CubeSticker";
import { ThreeEvent } from "@react-three/fiber";

interface FaceProps {
  colors: string[];        // 9 colors, top-left to bottom-right
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
  const offsets: [number, number][] = [
    [-1, 1],  [0, 1],  [1, 1],
    [-1, 0],  [0, 0],  [1, 0],
    [-1, -1], [0, -1], [1, -1],
  ];

  return (
    <group position={position} rotation={rotation}>
      {offsets.map(([x, y], i) => (
        <CubeSticker
          key={i}
          position={[x, y, 0]}
          color={colors[i] ?? "X"}
          onClick={(e) => onStickerClick?.(i, e)}
        />
      ))}
    </group>
  );
}