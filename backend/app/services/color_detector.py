import cv2
import numpy as np
from PIL import Image

# HSV color ranges for each cube color
COLOR_RANGES = {
    "W": [  # White
        ((0, 0, 180), (180, 60, 255)),
    ],
    "Y": [  # Yellow
        ((20, 100, 100), (35, 255, 255)),
    ],
    "R": [  # Red 
        ((0, 100, 100), (10, 255, 255)),
        ((160, 100, 100), (180, 255, 255)),
    ],
    "O": [  # Orange
        ((10, 100, 100), (20, 255, 255)),
    ],
    "B": [  # Blue
        ((100, 100, 50), (130, 255, 255)),
    ],
    "G": [  # Green
        ((40, 60, 60), (85, 255, 255)),
    ],
}


def classify_color(hsv_pixel: np.ndarray) -> str:
    """Classify a single HSV pixel to a cube color code."""
    h, s, v = int(hsv_pixel[0]), int(hsv_pixel[1]), int(hsv_pixel[2])

    for color_code, ranges in COLOR_RANGES.items():
        for (h_min, s_min, v_min), (h_max, s_max, v_max) in ranges:
            if h_min <= h <= h_max and s_min <= s <= s_max and v_min <= v <= v_max:
                return color_code

    return "X"  # Unknown


def is_blurry(image: np.ndarray, threshold: float = 100.0) -> bool:
    """Check if image is blurry using Laplacian variance."""
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    variance = cv2.Laplacian(gray, cv2.CV_64F).var()
    return variance < threshold


def detect_face_colors(image_bytes: bytes) -> list[str]:
    """
    Detect the 9 sticker colors from a face image.
    Returns list of 9 color codes top-left to bottom-right.
    """
    # Decode image
    nparr = np.frombuffer(image_bytes, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    if img is None:
        raise ValueError("Could not decode image.")

    h, w = img.shape[:2]

    # Crop center 80% to remove borders
    margin_x = int(w * 0.1)
    margin_y = int(h * 0.1)
    img = img[margin_y:h - margin_y, margin_x:w - margin_x]
    h, w = img.shape[:2]

    # Convert to HSV
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

    colors = []

    # Sample 3x3 grid
    for row in range(3):
        for col in range(3):
            # Center of each cell
            cx = int((col + 0.5) * w / 3)
            cy = int((row + 0.5) * h / 3)

            # Sample 5x5 patch and average
            patch = hsv[
                max(0, cy - 10):cy + 10,
                max(0, cx - 10):cx + 10
            ]
            avg = np.mean(patch, axis=(0, 1))
            color = classify_color(avg)
            colors.append(color)

    return colors