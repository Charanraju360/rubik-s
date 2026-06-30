interface ColorPickerProps {
  selectedColor: string;
  onColorSelect: (color: string) => void;
}

const COLORS = [
  { code: "W", label: "White",  hex: "#ffffff" },
  { code: "Y", label: "Yellow", hex: "#ffd500" },
  { code: "R", label: "Red",    hex: "#ff3000" },
  { code: "O", label: "Orange", hex: "#ff8c00" },
  { code: "B", label: "Blue",   hex: "#0045ad" },
  { code: "G", label: "Green",  hex: "#009b48" },
];

export default function ColorPicker({ selectedColor, onColorSelect }: ColorPickerProps) {
  return (
    <div className="flex flex-col gap-3 items-center">
      <p className="text-gray-400 text-sm font-medium">Selected Color</p>
      <div className="flex gap-3 flex-wrap justify-center">
        {COLORS.map((c) => (
          <button
            key={c.code}
            title={c.label}
            onClick={() => onColorSelect(c.code)}
            className={`w-10 h-10 rounded-lg border-2 transition-all ${
              selectedColor === c.code
                ? "border-white scale-110 shadow-lg"
                : "border-gray-700 hover:border-gray-400"
            }`}
            style={{ backgroundColor: c.hex }}
          />
        ))}
      </div>
      <p className="text-gray-600 text-xs">Click a color then click a sticker</p>
    </div>
  );
}