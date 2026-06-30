const FACES = [
  { key: "F", label: "Front",  color: "#ff3000" },
  { key: "R", label: "Right",  color: "#009b48" },
  { key: "B", label: "Back",   color: "#ff8c00" },
  { key: "L", label: "Left",   color: "#0045ad" },
  { key: "U", label: "Up",     color: "#ffffff" },
  { key: "D", label: "Down",   color: "#ffd500" },
];

interface FaceIndicatorProps {
  completedFaces: string[];
}

export default function FaceIndicator({ completedFaces }: FaceIndicatorProps) {
  return (
    <div className="flex gap-2 flex-wrap justify-center">
      {FACES.map((f, i) => {
        const isDone = completedFaces.includes(f.key);
        return (
          <div
            key={f.key}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium transition-all ${
              isDone
                ? "border-green-700 bg-green-900/20 text-green-400"
                : "border-gray-800 text-gray-600"
            }`}
          >
            <span
              className="w-3 h-3 rounded-sm inline-block border border-gray-600"
              style={{ backgroundColor: f.color }}
            />
            {i + 1}. {f.label}
            {isDone && <span className="text-green-400">✓</span>}
          </div>
        );
      })}
    </div>
  );
}