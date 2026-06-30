export type CubeColors = Record<string, string[]>;

const VALID_COLORS = ["W", "Y", "R", "O", "B", "G"];
const EXPECTED_PER_COLOR = 9;
const FACE_ORDER = ["F", "R", "B", "L", "U", "D"];

export function validateStage1(colors: CubeColors): string | null {
  const counts: Record<string, number> = {};

  for (const face of Object.keys(colors)) {
    for (const sticker of colors[face]) {
      if (sticker === "X") continue;
      if (!VALID_COLORS.includes(sticker)) {
        return `Invalid color "${sticker}" found on face ${face}.`;
      }
      counts[sticker] = (counts[sticker] ?? 0) + 1;
    }
  }

  for (const [color, count] of Object.entries(counts)) {
    if (count > EXPECTED_PER_COLOR) {
      return `Color "${color}" appears ${count} times. Maximum is 9.`;
    }
  }

  return null;
}

export function isComplete(colors: CubeColors): boolean {
  for (const face of FACE_ORDER) {
    if (!colors[face]) return false;
    for (const sticker of colors[face]) {
      if (sticker === "X") return false;
    }
  }
  return true;
}

export function toStateString(colors: CubeColors): string {
  const order = ["U", "R", "F", "D", "L", "B"];
  return order.map((f) => (colors[f] ?? Array(9).fill("X")).join("")).join("");
}