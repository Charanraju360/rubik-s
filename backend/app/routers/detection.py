from fastapi import APIRouter, UploadFile, File
from app.models.cube import FaceDetectionResult

router = APIRouter()


@router.post("/detect-face", response_model=FaceDetectionResult)
async def detect_face(
    face: str,
    image: UploadFile = File(...)
):

    return FaceDetectionResult(
        face=face,
        colors=["W", "W", "W", "W", "W", "W", "W", "W", "W"]
    )