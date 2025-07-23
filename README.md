# CultureSphere AI
Discover what fits your soul – explore music, travel, fashion, wellness, dining, and learning based on your cultural DNA.

<img width="1626" height="777" alt="Image" src="https://github.com/user-attachments/assets/b5965514-9d92-4ed2-9cfa-2fbd68b585f0" />
## 🌟 Overview
CultureSphere AI is an innovative cultural intelligence platform designed to provide deeply personalized lifestyle recommendations across multiple domains. Unlike generic recommendation systems, CultureSphere AI leverages cutting-edge AI to understand your unique "cultural DNA," offering insights that feel like advice from a culturally savvy friend. Users can explore music, dining, travel, fashion, learning, and wellness recommendations without requiring authentication, making discovery effortless and intuitive.

## ✨ How It Works
CultureSphere AI combines the power of Qloo's Taste AI™ and Google Gemini to deliver its unique insights:

User Input: You describe your tastes, mood, or preferences in natural language (e.g., "upbeat music for studying," "restaurants for a romantic evening").

Taste Analysis (Qloo): Your input is sent to Qloo's Taste AI™ API. Qloo acts as a "taste expert," analyzing your preferences to identify deep cultural affinities and cross-domain connections (e.g., if you like certain music, what travel destinations or dining experiences you might also enjoy).

AI Narrative (Gemini): Qloo's refined taste data, combined with your original context, is then passed to Google Gemini AI. Gemini acts as the "smart writer," transforming this data into creative, well-written, and personalized lifestyle recommendations.

Cultural Insights: You receive beautifully articulated guidance that not only suggests new content but also explains why it fits your unique cultural profile, creating a truly insightful and personal experience.

## 🏗 Project Structure
culturesphere-ai/
├── frontend/                 # React + TailwindCSS application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Domain-specific pages (Music, Travel, etc.)
│   │   ├── contexts/       # React contexts (Theme management)
│   │   └── utils/          # API utilities and helpers
│   ├── public/             # Static assets
│   └── package.json        # Frontend dependencies
├── backend/                 # Flask API server
│   ├── app.py             # Main Flask application
│   ├── services/          # API integration services
│   │   ├── qloo_service.py    # Qloo API integration
│   │   └── gemini_service.py  # Google Gemini integration
│   ├── utils/             # Backend utilities
│   └── requirements.txt   # Python dependencies
├── .env.example           # Environment variables template
├── package.json           # Root package.json for concurrent running
└── README.md             # This file

## 🧠 API Integration
CultureSphere AI leverages two powerful AI services:

## Qloo's Taste AI™ API
Qloo provides the core cultural intelligence by analyzing taste patterns across entertainment, lifestyle, and consumer domains. In CultureSphere AI, Qloo:

Processes user input to identify nuanced cultural affinities.

Returns cross-domain recommendations (e.g., if you like certain music, what restaurants or fashion styles you might enjoy).

Provides taste profiles that inform deeply personalized suggestions.

Enables the discovery of unexpected cultural connections across different lifestyle areas.

## Google Gemini API
Google's Gemini Large Language Model transforms Qloo's raw taste data into engaging, personalized narratives. Gemini:

Interprets user context and emotional state from their input.

Combines Qloo's taste data with user preferences to create a rich prompt.

Generates creative, well-written lifestyle recommendations in a conversational style.

Provides cultural context and explanations for suggestions, making the recommendations feel personal and insightful.

## 🔑 API Setup Instructions
To run CultureSphere AI, you will need API keys for Google Gemini and Qloo.

Getting Your Google Gemini API Key (Free Tier)
Visit Google AI Studio: Go to https://makersuite.google.com/app/apikey.

Sign in with your Google account.

Create API Key: Click "Create API Key" and select "Create API key in new project" or choose an existing project.

Copy your API key immediately (you won't be able to see it again after this step).

Free Tier Limits:

60 requests per minute

1,500 requests per day

No cost for usage within these limits.

Important Security Notes:

Never commit your API key to version control (e.g., GitHub).

Store it securely in your .env file (see Environment Setup).

Consider setting up API key restrictions in Google Cloud Console for production environments.

Getting Access to Qloo's Taste AI™ API
Qloo's API requires approval and is primarily available for commercial applications.

Visit Qloo's Developer Portal: Go to https://www.qloo.com/developers.

Review their API documentation and use cases.

Request Access: Fill out their partnership/access request form. Describe your use case and application, including details about expected usage volume, your project, and goals.

Application Process: Qloo reviews applications manually, and response time can vary (typically 1-2 weeks). They may request additional information or a demo.

Alternative for Development (Mock Data):
For initial development and testing, or while waiting for Qloo API access, the backend includes sample responses that mirror Qloo's API structure. This allows you to build and test the application's full flow without an active Qloo key. The qloo_service.py file contains logic to use mock data if QLOO_API_KEY is not provided.

⚙️ Environment Setup
1. Create .env File
Copy the provided .env.example file to a new file named .env in the project root directory (culturesphere-ai/). Then, add your API keys and other configurations:

# Google Gemini API Configuration
GEMINI_API_KEY=your_gemini_api_key_here

# Qloo Taste AI API Configuration
# QLOO_API_KEY is optional for development if using mock data
QLOO_API_KEY=your_qloo_api_key_here
QLOO_BASE_URL=https://api.qloo.com/v1

# Flask Configuration
FLASK_ENV=development
FLASK_DEBUG=True
SECRET_KEY=your_secret_key_for_sessions

# CORS Configuration (for local development)
# This should match the port your React frontend runs on
FRONTEND_URL=http://localhost:5173

Environment Variables Explained:

GEMINI_API_KEY: Your Google Gemini API key from Google AI Studio.

QLOO_API_KEY: Your Qloo API key (once approved). If left blank, the backend will use mock data for Qloo responses.

QLOO_BASE_URL: Qloo's API base URL.

FLASK_ENV: Set to 'development' for local development.

FLASK_DEBUG: Enable Flask debug mode for development (set to False for production).

SECRET_KEY: Used for session management in Flask (generate a random, strong string).

FRONTEND_URL: The URL of your React frontend for Cross-Origin Resource Sharing (CORS) configuration. This should be http://localhost:5173 for local development.

2. Install Dependencies
You will need to install dependencies for both the frontend and the backend.

Install Root Dependencies (for concurrently):

# From the project root (culturesphere-ai/)
npm install

Install Frontend Dependencies:

# From the project root (culturesphere-ai/)
cd frontend
npm install
cd ..

Install Backend Dependencies:

# From the project root (culturesphere-ai/)
cd backend
pip install -r requirements.txt
cd ..

🔧 Backend Setup & Run Instructions (Flask - Python)
The backend is a Flask API server.

Prerequisites
Python 3.8 or higher

pip (Python package installer)

Running the Backend
You can run the backend independently or concurrently with the frontend.

Option 1: Run backend only

# From the backend/ directory
cd backend
python app.py

The Flask development server will start on http://127.0.0.1:5000 (or http://localhost:5000).

Option 2: Run both frontend and backend concurrently (recommended for local development)

See "Full Application Testing" in the next section.

Backend API Endpoints
POST /api/recommendations - Generate recommendations for a domain.

Request Body Example:

{
    "userInput": "I love Solange and jazz music",
    "domain": "music"
}

GET /api/health - Health check endpoint.

GET /api/domains - List available cultural domains.

💻 Frontend Setup & Run Instructions (React)
The frontend is a React application built with Vite and styled with TailwindCSS.

Prerequisites
Node.js 16 or higher

npm package manager

Running the Frontend
You can run the frontend independently or concurrently with the backend.

Option 1: Run frontend only (development server)

# From the frontend/ directory
cd frontend
npm run dev

The React application will start on http://localhost:5173.

Option 2: Run both frontend and backend concurrently (recommended for local development)

See "Full Application Testing" in the next section.

Frontend Build
To create a production-ready build of the frontend:

# From the frontend/ directory
cd frontend
npm run build

This will generate optimized static assets in the dist folder.

🚀 Local Testing & Development
Full Application Testing (Recommended)
To run both the Flask backend and React frontend simultaneously for a complete local development experience:

Ensure all dependencies are installed as per "Install Dependencies" section.

From the project root (culturesphere-ai/), run:

npm start

This command uses concurrently to start both the Flask backend (on port 5000) and the React frontend (on port 5173).

Access the Application:

Open http://localhost:5173 in your web browser.

Navigate to any domain page (Music, Travel, etc.).

Enter a test input like: "I love jazz and minimalist design."

Verify that the recommendation generation works, including the loading spinner and error handling.

API Testing
You can test the backend API directly using curl or a tool like Postman/Insomnia:

curl -X POST http://localhost:5000/api/recommendations \
  -H "Content-Type: application/json" \
  -d '{
    "userInput": "I love Solange and jazz music",
    "domain": "music"
  }'

Development Tips
Mock Data: The backend is configured to use mock Qloo responses if QLOO_API_KEY is not provided in your .env file. This is useful for development without live Qloo access.

Error Handling: Check your browser's developer console and the terminal where your backend server is running for any error messages during debugging.

API Rate Limits: Be mindful of Google Gemini's free tier limits during extensive testing.

CORS Issues: Ensure FRONTEND_URL in your project root's .env file exactly matches the URL and port your React frontend is running on (e.g., http://localhost:5173).

🌐 Deployment Options
Backend Deployment (Flask - Python)
You can deploy your Flask backend to platforms that support Python applications.

Render:

Connect your GitHub repository to Render.

Set environment variables (e.g., GEMINI_API_KEY, QLOO_API_KEY, SECRET_KEY, FLASK_ENV=production) in the Render dashboard.

Configure the build command (e.g., pip install -r requirements.txt) and start command (e.g., gunicorn app:app for production-ready WSGI server, or flask run --host=0.0.0.0 --port=$PORT for simpler cases) for your Flask app.

Heroku:

Create a Procfile in your backend/ directory with: web: gunicorn app:app.

Set environment variables in the Heroku dashboard.

Deploy via Git or GitHub integration.

Frontend Deployment (React)
You can deploy your React frontend to static site hosting services.

Vercel:

Connect your GitHub repository.

Vercel will usually auto-detect a React project.

Ensure the build command is npm run build and the output directory is dist.

Configure environment variables for API endpoints (pointing to your deployed backend URL).

Netlify:

Drag and drop the dist folder after running npm run build.

Or connect via GitHub for automatic deployments.

Configure redirects for React Router if you're using client-side routing.

Full-Stack Deployment Considerations
For a complete deployed application:

Deploy your backend to a service like Render or Heroku.

Deploy your frontend to Vercel or Netlify.

Crucially, update the API URLs in your frontend code to point to your deployed backend URL (e.g., https://your-backend-app.onrender.com/api).

Ensure CORS is configured in your Flask backend to allow requests from your production frontend URL.

🔒 Security Considerations
Never commit API keys or sensitive information to version control. Always use environment variables.

For production deployments, consider implementing rate limiting on your backend to prevent abuse and manage API costs.

Regularly monitor your API usage in Google AI Studio to stay within free tier limits or manage billing.

Consider API key rotation policies for enhanced security in production.

🤝 Contributing
We welcome contributions to CultureSphere AI!

Fork the repository.

Create a feature branch (git checkout -b feature/YourFeatureName).

Make your changes.

Test thoroughly.

Submit a pull request with a clear description of your changes.

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

🆘 Troubleshooting
Common Issues
"API Key not found" errors:

Verify your .env file is in the project root.

Ensure environment variables are correctly defined in .env.

Restart both your backend and frontend servers after changing .env variables.

CORS errors:

Ensure FRONTEND_URL in your project root's .env file exactly matches the URL/port your React frontend is running on (e.g., http://localhost:5173).

For deployed versions, ensure your backend's CORS configuration allows requests from your deployed frontend URL.

Qloo API access:

Remember that Qloo API requires approval. If you don't have a key, the backend will automatically use mock data for development.

Contact Qloo support if your application is pending for an extended period.

Gemini API rate limits:

Monitor your usage in Google AI Studio.

If you hit limits, consider implementing request queuing or upgrading to a paid tier for higher limits.

Backend not starting (Python errors):

Ensure you have Python and pip installed correctly.

Verify all Python dependencies are installed (pip install -r backend/requirements.txt).

Check the terminal where you're running the Flask server for specific error messages.

For additional support, please open an issue in the GitHub repository.
