from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from generator import generate_answer
from fastapi.responses import StreamingResponse

app = FastAPI()


class ChatRequest(BaseModel):
    query: str


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/chat")
def chat(request: ChatRequest):
    """API endpoint to receive a chat query and return a response."""
    return StreamingResponse(generate_answer(request.query), media_type="text/plain")


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
