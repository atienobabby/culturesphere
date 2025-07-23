import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv() # Load your .env file

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if GEMINI_API_KEY:
    try:
        genai.configure(api_key=GEMINI_API_KEY)

        print("Available Gemini Models:")
        # Use a set to store unique model names to avoid duplicates if different versions exist
        available_model_names = set() 
        for m in genai.list_models():
            # Only list models capable of generating content (text, not just embeddings)
            if "generateContent" in m.supported_generation_methods:
                available_model_names.add(m.name)

        # Print the sorted unique model names
        for model_name in sorted(list(available_model_names)):
            print(f"- {model_name}")

    except Exception as e:
        print(f"Error connecting to Gemini API to list models: {e}")
else:
    print("GEMINI_API_KEY not found in .env file. Please ensure it's set.")