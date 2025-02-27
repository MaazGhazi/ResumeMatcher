from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

# Create a Pydantic model for structured data
class Message(BaseModel):
    message: str

@app.get("/api/hello", response_model=Message)
async def hello_world():
    return {"message": "Hello from FastAPI!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000)
