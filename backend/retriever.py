from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings
import os

embedding_model = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

def retrieve_documents(query, index_path="models/faiss_index", k=3):
    """Retrieve top-k relevant documents based on similarity."""
    
    # Check if FAISS index exists
    if not os.path.exists(index_path):
        raise FileNotFoundError(f"FAISS index not found at {index_path}. Please run `backend/embeddings.py` first.")

    try:
        # ✅ FIX: Allow safe deserialization since this is a trusted source
        vector_store = FAISS.load_local(index_path, embedding_model, allow_dangerous_deserialization=True)
        docs = vector_store.similarity_search(query, k=k)
        return docs
    except Exception as e:
        raise RuntimeError(f"Error loading FAISS index: {str(e)}")

# Test retrieval
if __name__ == "__main__":
    query = "What is Domestic Violence?"
    results = retrieve_documents(query)
    for doc in results:
        print(doc.page_content)
