import os
import json
import google.generativeai as genai
import logging

# Configure logging
logger = logging.getLogger(__name__)

# Load the API key from the environment variable
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")

def generate_recommendation(user_input: str, qloo_tastes: dict, domain: str) -> str:
    """
    Uses the Gemini API to generate a personalized recommendation based on user input
    and cultural tastes from the Qloo API.
    """
    if not GEMINI_API_KEY:
        raise ValueError("GEMINI_API_KEY environment variable not set.")

    genai.configure(api_key=GEMINI_API_KEY)
    model = genai.GenerativeModel('gemini-1.5-flash')

    relevant_tastes = qloo_tastes.get("results", {}).get("items", [])
    tastes_list = [f"{item['type']} in {item['domain']}: {item['name']}" for item in relevant_tastes]

    prompt = f"""
    You are an expert in culture and lifestyle.
    
    The user is interested in the following topics:
    User Input: {user_input}
    
    You have analyzed their interests and found related cultural data:
    Qloo Tastes: {", ".join(tastes_list)}
    
    Based on this information, provide a personalized recommendation for the user.
    The recommendation should be conversational, creative, and relevant to the user's interests.
    Focus on the provided domain: {domain}
    """
    
    logger.info("Generating Gemini recommendation...")

    try:
        response = model.generate_content(prompt)
        if response and response.text:
            return response.text
        else:
            return "Unable to generate a recommendation at this time. Please try again."

    except Exception as e:
        logger.error(f"Error generating recommendation from Gemini: {e}")
        return "An error occurred while generating your recommendation. Please try again later."