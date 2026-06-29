const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function checkHealth() {
  const res = await fetch(`${API_URL}/health`);
  return res.json();
}

export async function validateCube(state: string) {
  const res = await fetch(`${API_URL}/validate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ state }),
  });
  return res.json();
}

export async function solveIda(state: string) {
  const res = await fetch(`${API_URL}/solve/ida`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ state }),
  });
  return res.json();
}

export async function solveKociemba(state: string) {
  const res = await fetch(`${API_URL}/solve/kociemba`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ state }),
  });
  return res.json();
}

export async function solveDeepCube(state: string) {
  const res = await fetch(`${API_URL}/solve/deepcube`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ state }),
  });
  return res.json();
}

export async function compareAll(state: string) {
  const res = await fetch(`${API_URL}/compare`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ state }),
  });
  return res.json();
}

export async function detectFace(face: string, image: File) {
  const formData = new FormData();
  formData.append("face", face);
  formData.append("image", image);
  const res = await fetch(`${API_URL}/detect-face`, {
    method: "POST",
    body: formData,
  });
  return res.json();
}