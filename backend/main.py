from fastapi import FastAPI
from routes import game
import uvicorn
from fastapi.middleware.cors import CORSMiddleware

# uvicorn app --reload

app = FastAPI()

# Include the routes
app.include_router(game.router, prefix="/game", tags=["Game"])

def run_app():
    app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)
    
    return app

if __name__ == "__main__":
    uvicorn.run("main:run_app", host="127.0.0.1", port=8000, reload=True, factory=True)