"use client";

import { useState, useRef } from "react";

const FACE_ORDER = [
  { key: "F", label: "Front",  color: "#ff3000" },
  { key: "R", label: "Right",  color: "#009b48" },
  { key: "B", label: "Back",   color: "#ff8c00" },
  { key: "L", label: "Left",   color: "#0045ad" },
  { key: "U", label: "Up",     color: "#ffffff" },
  { key: "D", label: "Down",   color: "#ffd500" },
];

interface FaceUploaderProps {
  onFaceDetected: (face: string, colors: string[]) => void;
}

export default function FaceUploader({ onFaceDetected }: FaceUploaderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentFace = FACE_ORDER[currentIndex];

  const handleFile = async (file: File) => {
    setError(null);
    setPreview(URL.createObjectURL(file));
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(
        `${API_URL}/detect-face?face=${currentFace.key.toLowerCase() === "f" ? "front" :
          currentFace.key.toLowerCase() === "r" ? "right" :
          currentFace.key.toLowerCase() === "b" ? "back" :
          currentFace.key.toLowerCase() === "l" ? "left" :
          currentFace.key.toLowerCase() === "u" ? "up" : "down"}`,
        { method: "POST", body: formData }
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || "Detection failed");
      }

      const data = await res.json();
      onFaceDetected(currentFace.key, data.colors);

      if (currentIndex < FACE_ORDER.length - 1) {
        setCurrentIndex((i) => i + 1);
        setPreview(null);
      } else {
        setDone(true);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  if (done) {
    return (
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="text-5xl">✅</div>
        <h3 className="text-xl font-bold text-green-400">All 6 faces detected!</h3>
        <p className="text-gray-400 text-sm">Check the cube and fix any wrong stickers manually.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-md">
      {/* Progress */}
      <div className="flex gap-2">
        {FACE_ORDER.map((f, i) => (
          <div
            key={f.key}
            className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold border transition-all ${
              i < currentIndex
                ? "border-green-600 bg-green-900/30 text-green-400"
                : i === currentIndex
                ? "border-blue-500 bg-blue-900/30 text-white"
                : "border-gray-800 text-gray-600"
            }`}
            style={i === currentIndex ? { borderColor: f.color } : {}}
          >
            {i < currentIndex ? "✓" : f.key}
          </div>
        ))}
      </div>

      {/* Current face instruction */}
      <div className="text-center">
        <p className="text-gray-400 text-sm">Upload photo of the</p>
        <h3 className="text-2xl font-bold" style={{ color: currentFace.color }}>
          {currentFace.label} Face
        </h3>
        <p className="text-gray-600 text-xs mt-1">
          Face {currentIndex + 1} of {FACE_ORDER.length}
        </p>
      </div>

      {/* Drop zone */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => inputRef.current?.click()}
        className="w-full border-2 border-dashed border-gray-700 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
      >
        {preview ? (
          <img src={preview} alt="preview" className="max-h-40 mx-auto rounded-lg" />
        ) : (
          <>
            <div className="text-4xl mb-2">📸</div>
            <p className="text-gray-400 text-sm">Drop image here or click to upload</p>
            <p className="text-gray-600 text-xs mt-1">JPG, PNG supported</p>
          </>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />

      {/* Error */}
      {error && (
        <div className="w-full bg-red-900/30 border border-red-700 text-red-300 rounded-xl px-4 py-3 text-sm">
          ⚠️ {error}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="text-blue-400 text-sm animate-pulse">
          Detecting colors...
        </div>
      )}
    </div>
  );
}