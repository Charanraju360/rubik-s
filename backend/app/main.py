from fastapi import FastAPI

app = FastAPI(title="Rubik-S API")


@app.get("/health")
def health():
    return {"status": "ok", "project": "Rubik-S"}