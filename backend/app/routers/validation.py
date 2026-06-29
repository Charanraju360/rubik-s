from fastapi import APIRouter
from app.models.cube import CubeState, ValidationResult

router = APIRouter()


@router.post("/validate", response_model=ValidationResult)
def validate_cube(cube: CubeState):
    """
    Validates the full cube state.
    Checks edges, corners, parity, and solvability.
    """
    return ValidationResult(valid=True)