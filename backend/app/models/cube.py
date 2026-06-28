from pydantic import BaseModel
from typing import List, Optional


class CubeState(BaseModel):
    """
    54-character string representing the cube.
    Face order: U R F D L B
    Each face: 9 stickers, top-left to bottom-right.
    Colors: W=white, Y=yellow, R=red, O=orange, B=blue, G=green
    """
    state: str


class SolverResult(BaseModel):
    solver: str
    status: str        # "success" or "failed"
    moves: Optional[List[str]] = None
    move_count: Optional[int] = None
    solve_time_ms: Optional[float] = None


class ValidationResult(BaseModel):
    valid: bool
    error: Optional[str] = None


class FaceDetectionResult(BaseModel):
    face: str          # "front", "right", "back", "left", "up", "down"
    colors: List[str] 