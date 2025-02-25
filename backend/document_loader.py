from langchain_community.document_loaders import PyPDFLoader
import os

def load_documents(directory="data"):
    """Load PDF documents from the data directory."""
    documents = []
    for file in os.listdir(directory):
        if file.endswith(".pdf"):
            loader = PyPDFLoader(os.path.join(directory, file))
            docs = loader.load()
            print(f"Loaded {len(docs)} pages from {file}")  # Debugging line
            documents.extend(docs)

    if not documents:
        print("⚠️ No documents found! Please place PDFs in the 'data' folder.")

    return documents

# Test document loading
if __name__ == "__main__":
    docs = load_documents()
    print(f"✅ Total Documents Loaded: {len(docs)}")
