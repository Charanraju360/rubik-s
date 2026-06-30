"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { COLOR_MAP } from "./CubeSticker";

export interface CubeColors {
  U: string[];
  D: string[];
  F: string[];
  B: string[];
  L: string[];
  R: string[];
}

export const DEFAULT_COLORS: CubeColors = {
  U: Array(9).fill("W"),
  D: Array(9).fill("Y"),
  F: Array(9).fill("R"),
  B: Array(9).fill("O"),
  L: Array(9).fill("B"),
  R: Array(9).fill("G"),
};

const FACE_DEFS: {
  key: keyof CubeColors;
  normal: THREE.Vector3;
  up: THREE.Vector3;
}[] = [
  { key: "F", normal: new THREE.Vector3(0, 0, 1),  up: new THREE.Vector3(0, 1, 0) },
  { key: "B", normal: new THREE.Vector3(0, 0, -1), up: new THREE.Vector3(0, 1, 0) },
  { key: "L", normal: new THREE.Vector3(-1, 0, 0), up: new THREE.Vector3(0, 1, 0) },
  { key: "R", normal: new THREE.Vector3(1, 0, 0),  up: new THREE.Vector3(0, 1, 0) },
  { key: "U", normal: new THREE.Vector3(0, 1, 0),  up: new THREE.Vector3(0, 0, -1) },
  { key: "D", normal: new THREE.Vector3(0, -1, 0), up: new THREE.Vector3(0, 0, 1) },
];

interface RubiksCubeProps {
  colors?: CubeColors;
  onStickerClick?: (face: keyof CubeColors, index: number) => void;
}

export default function RubiksCube({ colors = DEFAULT_COLORS, onStickerClick }: RubiksCubeProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const cubeGroupRef = useRef<THREE.Group | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const stickersRef = useRef<{ mesh: THREE.Mesh; face: keyof CubeColors; index: number }[]>([]);
  const isDragging = useRef(false);
  const didDrag = useRef(false);
  const prevMouse = useRef({ x: 0, y: 0 });
  const onClickRef = useRef(onStickerClick);

  useEffect(() => {
    onClickRef.current = onStickerClick;
  }, [onStickerClick]);

  // Init scene once
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#111827");

    const camera = new THREE.PerspectiveCamera(
      45,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.set(6, 5, 6);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mount.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.8));
    const dir = new THREE.DirectionalLight(0xffffff, 1);
    dir.position.set(10, 10, 5);
    scene.add(dir);

    const group = new THREE.Group();
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(3.1, 3.1, 3.1),
      new THREE.MeshStandardMaterial({ color: "#111111" })
    );
    group.add(body);
    scene.add(group);
    cubeGroupRef.current = group;

    // Build stickers
    const SIZE = 0.82;
    const GAP = 1.05;
    const OFFSET = 1.56;
    stickersRef.current = [];

    FACE_DEFS.forEach(({ key, normal, up }) => {
      const right = new THREE.Vector3().crossVectors(up, normal).negate();

      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          const index = row * 3 + col;
          const color = colors[key][index] ?? "X";

          const mesh = new THREE.Mesh(
            new THREE.PlaneGeometry(SIZE, SIZE),
            new THREE.MeshStandardMaterial({
              color: COLOR_MAP[color] ?? COLOR_MAP["X"],
              roughness: 0.4,
            })
          );

          const u = (col - 1) * GAP;
          const v = -(row - 1) * GAP;
          const pos = new THREE.Vector3()
            .addScaledVector(normal, OFFSET)
            .addScaledVector(right, u)
            .addScaledVector(up, v);

          mesh.position.copy(pos);
          mesh.lookAt(pos.clone().add(normal));
          group.add(mesh);
          stickersRef.current.push({ mesh, face: key, index });
        }
      }
    });

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    const onMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      didDrag.current = false;
      prevMouse.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseUp = () => { isDragging.current = false; };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || !cubeGroupRef.current) return;
      const dx = e.clientX - prevMouse.current.x;
      const dy = e.clientY - prevMouse.current.y;
      if (Math.abs(dx) > 2 || Math.abs(dy) > 2) didDrag.current = true;
      cubeGroupRef.current.rotation.y += dx * 0.01;
      cubeGroupRef.current.rotation.x += dy * 0.01;
      prevMouse.current = { x: e.clientX, y: e.clientY };
    };

    const onClick = (e: MouseEvent) => {
      if (didDrag.current) return; // ignore click after drag
      if (!cameraRef.current) return;

      const rect = mount.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(x, y), cameraRef.current);

      const meshes = stickersRef.current.map((s) => s.mesh);
      const hits = raycaster.intersectObjects(meshes);

      if (hits.length > 0) {
        const hit = hits[0].object as THREE.Mesh;
        const found = stickersRef.current.find((s) => s.mesh === hit);
        if (found && onClickRef.current) {
          onClickRef.current(found.face, found.index);
        }
      }
    };

    mount.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mousemove", onMouseMove);
    mount.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      mount.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mousemove", onMouseMove);
      mount.removeEventListener("click", onClick);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    stickersRef.current.forEach(({ mesh, face, index }) => {
      const color = colors[face][index] ?? "X";
      const mat = mesh.material as THREE.MeshStandardMaterial;
      mat.color.set(COLOR_MAP[color] ?? COLOR_MAP["X"]);
    });
  }, [colors]);

  return (
    <div
      ref={mountRef}
      style={{ width: "100%", height: "100%", cursor: "grab" }}
    />
  );
}