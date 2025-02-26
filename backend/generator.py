import google.generativeai as genai
import os
import sys
from dotenv import load_dotenv
import time

load_dotenv()
api_key = os.getenv("GOOGLE_API_KEY")

if not api_key:
    sys.exit("❌ GOOGLE_API_KEY not found in .env file! Make sure you set it.")

genai.configure(api_key=api_key)


def generate_answer(query):
    """Retrieve documents and generate an answer using Google Gemini AI."""
    from retriever import retrieve_documents

    # docs = retrieve_documents(query)
    # context = "\n".join([doc.page_content for doc in docs])
    # prompt = f"Based on this context, answer the question:\n{context}\n\nQuestion: {query}"

    # model = genai.GenerativeModel("gemini-pro")
    # response = model.generate_content(prompt)

    # return response.text

    def response_stream():
        response_data = "✅ This is a hardcoded response for testing. Integration with Gemini AI is currently disabled."
        for word in response_data.split():
            yield word + " "
            time.sleep(0.1)

    return response_stream()
