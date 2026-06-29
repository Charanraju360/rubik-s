from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import health, detection, validation, solvers

app = FastAPI(
    title="Rubik-S API",
    description="Backend API for the Rubik-S cube solving platform",
    version="0.1.0"
)

# CORS — allow frontend to talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(health.router)
app.include_router(detection.router)
app.include_router(validation.router)
app.include_router(solvers.router)