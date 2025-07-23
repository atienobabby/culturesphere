# CultureSphere AI

A cultural intelligence platform that delivers personalized lifestyle recommendations across multiple domains using AI-powered taste analysis. Users can explore music, dining, travel, fashion, learning, and wellness recommendations without requiring authentication.

## 🌟 Overview

CultureSphere AI combines the power of **Qloo's Taste AI™** and **Google Gemini** to create deeply personalized cultural recommendations. Users input their preferences in natural language, and the system returns creative, narrative-driven insights that feel like advice from a culturally savvy friend.

### How It Works

1. **User Input**: Users describe their tastes, mood, or preferences in any cultural domain
2. **Taste Analysis**: Qloo's Taste AI™ API analyzes the input to identify cross-domain cultural affinities
3. **AI Narrative**: Google Gemini processes the taste data and user context to generate personalized, creative recommendations
4. **Cultural Insights**: Users receive beautifully written lifestyle guidance that connects their tastes across domains

## 🏗 Project Structure

```
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
└── README.md             # This file
```

## 🧠 API Integration

### Qloo's Taste AI™ API
Qloo provides cultural intelligence by analyzing taste patterns across entertainment, lifestyle, and consumer domains. In CultureSphere AI, Qloo:

- Processes user input to identify cultural affinities
- Returns cross-domain recommendations (e.g., if you like certain music, what restaurants you might enjoy)
- Provides taste profiles that inform personalized suggestions
- Enables discovery of cultural connections across different lifestyle areas

### Google Gemini API
Google's Gemini LLM transforms raw taste data into engaging, personalized narratives. Gemini:

- Interprets user context and emotional state from their input
- Combines Qloo's taste data with user preferences
- Generates creative, well-written lifestyle recommendations
- Provides cultural context and explanations for suggestions
- Creates cohesive narratives that feel personal and insightful

## 🔑 API Setup Instructions

### Getting Your Google Gemini API Key (Free Tier)

1. **Visit Google AI Studio**
   - Go to [https://makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
   - Sign in with your Google account

2. **Create API Key**
   - Click "Create API Key"
   - Select "Create API key in new project" or choose an existing project
   - Copy your API key immediately (you won't be able to see it again)

3. **Free Tier Limits**
   - 60 requests per minute
   - 1,500 requests per day
   - No cost for usage within these limits

4. **Important Security Notes**
   - Never commit your API key to version control
   - Store it securely in your `.env` file
   - Consider setting up API key restrictions in Google Cloud Console

### Getting Access to Qloo's Taste AI™ API

Qloo's API requires approval and is primarily available for commercial applications.

1. **Visit Qloo's Developer Portal**
   - Go to [https://www.qloo.com/developers](https://www.qloo.com/developers)
   - Review their API documentation and use cases

2. **Request Access**
   - Fill out their partnership/access request form
   - Describe your use case and application
   - Provide details about expected usage volume
   - Include information about your project and goals

3. **Application Process**
   - Qloo reviews applications manually
   - Response time varies (typically 1-2 weeks)
   - They may request additional information or a demo

4. **Alternative for Development**
   - For initial development and testing, you can use mock data
   - The backend includes sample responses that mirror Qloo's API structure
   - This allows you to build and test the application while waiting for API access

## ⚙️ Environment Setup

### Create `.env` File

Copy `.env.example` to `.env` and add your API keys:

```bash
# Google Gemini API Configuration
GEMINI_API_KEY=your_gemini_api_key_here

# Qloo Taste AI API Configuration  
QLOO_API_KEY=your_qloo_api_key_here
QLOO_BASE_URL=https://api.qloo.com/v1

# Flask Configuration
FLASK_ENV=development
FLASK_DEBUG=True
SECRET_KEY=your_secret_key_for_sessions

# CORS Configuration (for local development)
FRONTEND_URL=http://localhost:3000
```

### Environment Variables Explained

- `GEMINI_API_KEY`: Your Google Gemini API key from Google AI Studio
- `QLOO_API_KEY`: Your Qloo API key (once approved)
- `QLOO_BASE_URL`: Qloo's API base URL
- `FLASK_ENV`: Set to 'development' for local development
- `FLASK_DEBUG`: Enable Flask debug mode for development
- `SECRET_KEY`: Used for session management (generate a random string)
- `FRONTEND_URL`: Frontend URL for CORS configuration

## 🔧 Backend Setup & Run Instructions

### Prerequisites
- Node.js 16 or higher
- npm package manager

### Installation

1. **Install Dependencies** (from project root)
   ```bash
   npm install
   ```

2. **Set Up Environment Variables**
   - Ensure your `.env` file is in the project root with all required variables

### Running the Backend

```bash
# Option 1: Run backend only
npm run server

# Option 2: Run both frontend and backend concurrently (recommended)
npm start
```

The Express server will start on `http://localhost:3001`

### Backend API Endpoints

- `POST /api/recommendations` - Generate recommendations for a domain
- `GET /api/health` - Health check endpoint
- `GET /api/domains` - List available cultural domains

## 💻 Frontend Setup & Run Instructions

### Prerequisites
- Node.js 16 or higher
- npm or yarn package manager

### Installation

1. **Install Dependencies** (from project root, if not already done)
   ```bash
   npm install
   ```

### Running the Frontend

```bash
# Development server
npm run dev

# Or run both frontend and backend together
npm start
```

The React application will start on `http://localhost:3000`

### Frontend Build

```bash
# Production build
npm run build
```

## 🚀 Local Testing & Development

### Full Application Testing

1. **Start Both Servers** (recommended)
   ```bash
   npm start
   ```
   This will start both the Express backend (port 3001) and React frontend (port 5173) concurrently.

2. **Or Start Servers Separately**
   ```bash
   # Terminal 1: Start backend
   npm run server
   
   # Terminal 2: Start frontend
   npm run dev
   ```

3. **Access the Application**
   - Open `http://localhost:5173` in your browser
   - Navigate to any domain page (Music, Travel, etc.)
   - Enter a test input like: "I love jazz and minimalist design"
   - Verify the recommendation generation works

### API Testing

You can test the backend API directly using curl or Postman:

```bash
curl -X POST http://localhost:3001/api/recommendations \
  -H "Content-Type: application/json" \
  -d '{
    "userInput": "I love Solange and jazz music",
    "domain": "music"
  }'
```

### Development Tips

1. **Mock Data**: The backend includes mock Qloo responses for development
2. **Error Handling**: Check browser console and Node.js server logs for debugging
3. **API Rate Limits**: Be mindful of Gemini's free tier limits during testing
4. **CORS Issues**: Ensure `FRONTEND_URL` in `.env` matches your frontend URL

## 🌐 Deployment Options

### Backend Deployment (Flask)

**Backend Deployment (Node.js/Express)**

**Render**:
- Connect your GitHub repository
- Set environment variables in Render dashboard
- Use `npm run server` as the start command

**Heroku**:
- Create a `Procfile` with: `web: npm run server`
- Set environment variables in Heroku dashboard
- Deploy via Git or GitHub integration

### Frontend Deployment (React)

**Vercel**:
- Connect your GitHub repository
- Set build command: `npm run build`
- Set output directory: `dist`
- Configure environment variables for API endpoints

**Netlify**:
- Drag and drop the `dist` folder after running `npm run build`
- Or connect via GitHub for automatic deployments
- Configure redirects for React Router

### Full-Stack Deployment

For a complete deployment, you'll need:
1. Backend deployed to a service like Render or Heroku
2. Frontend deployed to Vercel or Netlify
3. Update frontend API URLs to point to your deployed backend
4. Ensure CORS is configured for your production frontend URL

## 🔒 Security Considerations

- Never commit API keys to version control
- Use environment variables for all sensitive configuration
- Implement rate limiting in production
- Consider API key rotation policies
- Monitor API usage to stay within limits

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Troubleshooting

### Common Issues

**"API Key not found" errors**:
- Verify your `.env` file is in the correct location
- Check that environment variables are properly set
- Restart the Node.js server after changing `.env`

**CORS errors**:
- Ensure `FRONTEND_URL` in `.env` matches your frontend URL
- Check that both frontend and backend are running

**Qloo API access**:
- Remember that Qloo API requires approval
- Use mock data for development while waiting for access
- Contact Qloo support if your application is pending for extended periods

**Gemini API rate limits**:
- Monitor your usage in Google AI Studio
- Implement request queuing if hitting rate limits
- Consider upgrading to paid tier for higher limits

For additional support, please open an issue in the GitHub repository.