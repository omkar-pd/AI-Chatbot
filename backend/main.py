from fastapi import FastAPI
from generator import generate_answer

app = FastAPI()

@app.get("/rag")
def query_rag(query: str):
    """API endpoint for querying the RAG system."""
    response = generate_answer(query)
    return {"query": query, "response": response}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
