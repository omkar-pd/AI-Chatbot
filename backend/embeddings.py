from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
import os

embedding_model = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)


def store_embeddings(documents, index_path="models/faiss_index"):
    """Convert documents to embeddings and store in FAISS."""
    vector_store = FAISS.from_documents(documents, embedding_model)
    vector_store.save_local(index_path)
    print("✅ Embeddings stored successfully!")


if __name__ == "__main__":
    from document_loader import load_documents

    docs = load_documents()
    store_embeddings(docs)
