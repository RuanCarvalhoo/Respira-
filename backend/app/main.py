from fastapi import FastAPI
from app.api.endpoints import calculator, auth

app = FastAPI(
    title="Respira+ API",
    description="API for Respira+ Carbon Footprint Tracker",
    version="0.1.0",
)

app.include_router(calculator.router, prefix="/api/calculate", tags=["calculator"])
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])

@app.get("/")
def read_root():
    return {"message": "Welcome to Respira+ API"}
