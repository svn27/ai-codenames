from fastapi import FastAPI
from routes import game
import uvicorn

# uvicorn app --reload

app = FastAPI()

# Include the routes
app.include_router(game.router, prefix="/game", tags=["Game"])

def run_app():
    """Run the FastAPI app"""
    return app

if __name__ == "__main__":
    uvicorn.run("main:run_app", host="127.0.0.1", port=8000, reload=True, factory=True)