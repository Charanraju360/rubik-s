from fastapi import APIRouter
from app.models.cube import CubeState, SolverResult
import time

router = APIRouter()


@router.post("/solve/ida", response_model=SolverResult)
def solve_ida(cube: CubeState):
    """
    Solves the cube using IDA* algorithm.
    """
    start = time.time()
    elapsed = round((time.time() - start) * 1000, 2)

    return SolverResult(
        solver="IDA*",
        status="failed",
        moves=[],
        move_count=0,
        solve_time_ms=elapsed
    )


@router.post("/solve/kociemba", response_model=SolverResult)
def solve_kociemba(cube: CubeState):
    """
    Solves the cube using Kociemba Two-Phase algorithm.
    """
    start = time.time()
    elapsed = round((time.time() - start) * 1000, 2)

    return SolverResult(
        solver="Kociemba",
        status="failed",
        moves=[],
        move_count=0,
        solve_time_ms=elapsed
    )


@router.post("/solve/deepcube", response_model=SolverResult)
def solve_deepcube(cube: CubeState):
    """
    Solves the cube using DeepCubeA AI model.
    """
    start = time.time()
    elapsed = round((time.time() - start) * 1000, 2)

    return SolverResult(
        solver="DeepCubeA",
        status="failed",
        moves=[],
        move_count=0,
        solve_time_ms=elapsed
    )


@router.post("/compare", response_model=list[SolverResult])
def compare_all(cube: CubeState):
    """
    Runs all three solvers and returns combined results.
    """
    return [
        SolverResult(solver="IDA*", status="failed", moves=[], move_count=0, solve_time_ms=0),
        SolverResult(solver="Kociemba", status="failed", moves=[], move_count=0, solve_time_ms=0),
        SolverResult(solver="DeepCubeA", status="failed", moves=[], move_count=0, solve_time_ms=0),
    ]