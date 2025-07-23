import os
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from datetime import datetime
import logging

# Re-enable Google Generative AI library components
from google.generativeai import GenerativeModel, configure

# Load environment variables from .env file
load_dotenv()

# --- IMPORTS FOR YOUR SERVICES ---
from services.qloo_service import get_user_tastes

# --- FLASK APP SETUP ---
app = Flask(__name__)
PORT = int(os.getenv("PORT", 3001))

# --- CORS CONFIGURATION ---
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")
print(f"🌐 CORS enabled for: {FRONTEND_URL}")
CORS(app, resources={r"/api/*": {"origins": FRONTEND_URL}}, supports_credentials=True)

# --- GLOBAL LOGGING CONFIGURATION ---
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')

# --- ENVIRONMENT VARIABLE CHECKS & API INITIALIZATION ---
QLOO_API_KEY = os.getenv("QLOO_API_KEY")
if not QLOO_API_KEY:
    print("❌ QLOO_API_KEY is not set in environment variables! Qloo API calls will likely fail.")

# Initialize Gemini AI Model
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
genAI_model = None
if GEMINI_API_KEY:
    try:
        configure(api_key=GEMINI_API_KEY)
        genAI_model = GenerativeModel(model_name="models/gemini-2.5-flash")
        print("🔑 Gemini AI: ✅ Connected (using configure)")
    except Exception as e:
        print(f"❌ Gemini AI connection failed: {e}")
else:
    print("🔑 Gemini AI: ❌ No API key found. AI recommendations will be limited.")

# --- API ROUTES ---

@app.route('/api/recommendations', methods=['POST'])
def recommendations():
    data = request.get_json()
    user_input = data.get('userInput')
    domain = data.get('domain')

    if not user_input or not domain:
        return jsonify({"error": "Missing required fields (userInput, domain)"}), 400

    recommendations_text = ""
    # Initialize these with defaults in case Qloo service completely fails
    qloo_status_message_for_gemini = "Qloo could not provide specific insights for this query."
    qloo_specific_recommendations = []

    try:
        qloo_result = get_user_tastes(user_input, domain, QLOO_API_KEY)
        
        # --- NEW: Extract structured data from Qloo service response ---
        # Update the status message and specific recommendations based on Qloo's actual return
        qloo_status_message_for_gemini = qloo_result.get("status_message", qloo_status_message_for_gemini)
        qloo_specific_recommendations = qloo_result.get("qloo_recommendations", [])
        
    except ValueError as e:
        app.logger.error(f"Qloo service error: {e}")
        qloo_status_message_for_gemini = f"Qloo service encountered an error: {e}"
    except Exception as e:
        app.logger.error(f"An unexpected error in Qloo service call: {e}")
        qloo_status_message_for_gemini = f"An unexpected error occurred during Qloo processing: {e}"

    # --- Step 2: Generate recommendations using Gemini AI ---
    if genAI_model:
        # --- Prepare Qloo context for Gemini ---
        qloo_context_for_gemini = ""
        if qloo_specific_recommendations:
            # Format the list of Qloo recommendations for Gemini
            # Example: "Rihanna, Adele, Mariah Carey"
            recommended_names = [item.get('name', 'unknown') for item in qloo_specific_recommendations if item.get('name')]
            if recommended_names:
                qloo_context_for_gemini = f"Based on Qloo's Taste AI, here are some specific recommendations: {', '.join(recommended_names)}."
            else:
                # If recommendations list is not empty but names couldn't be extracted
                qloo_context_for_gemini = f"Qloo returned some results, but could not extract specific names. (Status: {qloo_status_message_for_gemini})"
        else:
            # If Qloo returned no specific recommendations or encountered an issue
            qloo_context_for_gemini = f"Qloo could not provide specific insights for this query. (Status: {qloo_status_message_for_gemini})"

        prompt = f"""
        You are a cultural intelligence AI that creates beautiful, personalized recommendations.
        
        User Input: "{user_input}"
        Domain: {domain}
        
        {qloo_context_for_gemini}
        
        Given the user's input, the domain, AND the specific recommendations from Qloo (if any), create a beautifully written, personalized recommendation that:
        1. Acknowledges their cultural preferences and mood
        2. Integrates and elaborates on the specific recommendations provided by Qloo (if available). If Qloo had no specific recommendations, state that your recommendations are based on general knowledge.
        3. Explains the cultural connections and why these fit their taste.
        4. Uses a warm, creative, and inspiring tone
        5. Formats your response as a cohesive, flowing narrative (not a list) that feels personal and insightful.
        Make it feel like advice from a culturally savvy friend who truly understands their taste.
        """
        
        try:
            result = genAI_model.generate_content(prompt)
            recommendations_text = result.text
        except Exception as gemini_error:
            app.logger.error(f"❌ Error generating recommendations with Gemini: {gemini_error}", exc_info=True)
            recommendations_text = "Failed to generate AI recommendations. Please try again later. (Gemini error)."
            
    else:
        # Fallback message if Gemini API key is not configured
        recommendations_text = f"""
        Based on your interest in "{user_input}" and the {domain} domain, here are some personalized recommendations.
        
        This is a fallback response. To get full AI-powered recommendations, please ensure your GEMINI_API_KEY is correctly set in the .env file.
        (Qloo feedback: {qloo_status_message_for_gemini})
        """

    # Return the generated recommendations to the frontend
    return jsonify({"recommendations": recommendations_text})

# Health check endpoint
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "ok", "timestamp": datetime.now().isoformat()})

# --- SERVER STARTUP ---
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=PORT)

    print(f"🚀 CultureSphere AI Backend Server running on port {PORT}")
    print(f"📡 API endpoints available at http://localhost:{PORT}/api")