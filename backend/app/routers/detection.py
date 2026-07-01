from fastapi import APIRouter, UploadFile, File, HTTPException, Query
from app.models.cube import FaceDetectionResult
from app.services.color_detector import detect_face_colors, is_blurry
import numpy as np
import cv2

router = APIRouter()

VALID_FACES = ["front", "right", "back", "left", "up", "down"]

@router.post("/detect-face", response_model=FaceDetectionResult)
async def detect_face(
    face: str = Query(..., description="Face name: front|right|back|left|up|down"),
    image: UploadFile = File(...)):
    if face not in VALID_FACES:
        raise HTTPException(status_code=400, detail=f"Invalid face. Must be one of: {VALID_FACES}")

    contents = await image.read()

    # Blur check
    nparr = np.frombuffer(contents, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    if img is None:
        raise HTTPException(status_code=400, detail="Could not read image. Please upload a valid image file.")

    if is_blurry(img):
        raise HTTPException(status_code=422, detail="Image is too blurry. Please upload a clearer photo.")

    # Detect colors
    try:
        colors = detect_face_colors(contents)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Color detection failed: {str(e)}")

    return FaceDetectionResult(face=face, colors=colors)