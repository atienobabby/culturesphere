# CultureSphere AI
Discover what fits your soul – explore music, travel, fashion, wellness, dining, and learning based on your cultural DNA.

<img width="1626" height="777" alt="Image" src="https://github.com/user-attachments/assets/b5965514-9d92-4ed2-9cfa-2fbd68b585f0" />

## 🌟 Overview
CultureSphere AI is an innovative cultural intelligence platform designed to provide deeply personalized lifestyle recommendations across multiple domains. Unlike generic recommendation systems, CultureSphere AI leverages cutting-edge AI to understand your unique "cultural DNA," offering insights that feel like advice from a culturally savvy friend. Users can explore music, dining, travel, fashion, learning, and wellness recommendations without requiring authentication, making discovery effortless and intuitive.

## ✨ How It Works
CultureSphere AI combines the power of Qloo's Taste AI™ and Google Gemini to deliver its unique insights:

- **User Input**: You describe your tastes, mood, or preferences in natural language (e.g., `"upbeat music for studying"`, `"restaurants for a romantic evening"`).

- **Taste Analysis (Qloo)**: Your input is sent to Qloo's Taste AI™ API. Qloo acts as a "taste expert," analyzing your preferences to identify deep cultural affinities and cross-domain connections.

- **AI Narrative (Gemini)**: Qloo's refined taste data, combined with your original context, is then passed to Google Gemini AI. Gemini transforms this data into creative, well-written, and personalized lifestyle recommendations.

- **Cultural Insights**: You receive beautifully articulated guidance that not only suggests new content but also explains why it fits your unique cultural profile.

## 🏗 Project Structure

```bash
culturesphere-ai/
├── frontend/                 # React + TailwindCSS application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Domain-specific pages (Music, Travel, etc.)
│   │   ├── contexts/        # React contexts (Theme management)
│   │   └── utils/           # API utilities and helpers
│   ├── public/              # Static assets
│   └── package.json         # Frontend dependencies
├── backend/                 # Flask API server
│   ├── app.py               # Main Flask application
│   ├── services/            # API integration services
│   │   ├── qloo_service.py    # Qloo API integration
│   │   └── gemini_service.py  # Google Gemini integration
│   ├── utils/               # Backend utilities
│   └── requirements.txt     # Python dependencies
├── .env.example             # Environment variables template
├── package.json             # Root package.json for concurrent running
└── README.md                # This file
```

## 🧠 API Integration

### Qloo's Taste AI™ API

Qloo provides the core cultural intelligence by analyzing taste patterns across entertainment, lifestyle, and consumer domains.

- Processes user input to identify nuanced cultural affinities.  
- Returns cross-domain recommendations.  
- Provides taste profiles that inform deeply personalized suggestions.  
- Enables discovery of unexpected cultural connections.

### Google Gemini API

Google's Gemini LLM transforms Qloo's raw taste data into personalized narratives.

- Interprets user context and emotional state.  
- Generates creative, well-written lifestyle recommendations.  
- Provides cultural context and explanations.

## 🔑 API Setup Instructions

### Getting Your Google Gemini API Key (Free Tier)

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)  
2. Sign in with your Google account  
3. Click **Create API Key**  
4. Copy your API key immediately  

**Free Tier Limits:**
- 60 requests per minute  
- 1,500 requests per day  

> Store your key securely in `.env`. Never commit to Git.

### Getting Access to Qloo’s API

1. Visit [Qloo Developers](https://www.qloo.com/developers)  
2. Review docs and request access  
3. Submit your use case and wait for approval (1–2 weeks)  

**Alternative (Mock Data):**  
If `QLOO_API_KEY` is not present, the backend uses mock responses from `qloo_service.py`.

## ⚙️ Environment Setup

### 1. Create `.env` File

```env
# Google Gemini API Configuration
GEMINI_API_KEY=your_gemini_api_key_here

# Qloo Taste AI API Configuration
QLOO_API_KEY=your_qloo_api_key_here
QLOO_BASE_URL=https://api.qloo.com/v1

# Flask Configuration
FLASK_ENV=development
FLASK_DEBUG=True
SECRET_KEY=your_secret_key_for_sessions

# CORS Configuration
FRONTEND_URL=http://localhost:5173
```

### 2. Install Dependencies

#### Root Dependencies (for concurrently):

```bash
npm install
```

#### Frontend:

```bash
cd frontend
npm install
cd ..
```

#### Backend:

```bash
cd backend
pip install -r requirements.txt
cd ..
```

## 🔧 Backend Setup & Run Instructions (Flask - Python)

### Prerequisites

- Python 3.8 or higher  
- pip installed

### Run the Backend

#### Option 1: Backend only

```bash
cd backend
python app.py
```

Access: http://localhost:5000

#### Option 2: Run Full Stack

See section **🚀 Full Application Testing**.

## 🧠 Backend API Endpoints

### `POST /api/recommendations`

```json
{
  "userInput": "I love Solange and jazz music",
  "domain": "music"
}
```

### `GET /api/health`  
Health check

### `GET /api/domains`  
Get available domains

## 💻 Frontend Setup & Run Instructions (React)

### Prerequisites

- Node.js 16+  
- npm

### Run Frontend

#### Option 1: Frontend only

```bash
cd frontend
npm run dev
```

Open http://localhost:5173

#### Option 2: Full Stack

See **🚀 Full Application Testing**

### Frontend Build

```bash
cd frontend
npm run build
```

Outputs to `dist/`.

## 🚀 Local Testing & Development

### Full Stack (Recommended)

```bash
npm start
```

This starts:
- Flask backend on `localhost:5000`
- React frontend on `localhost:5173`

Access app at http://localhost:5173  
Test input: `"I love jazz and minimalist design"`

### Test Backend via `curl`

```bash
curl -X POST http://localhost:5000/api/recommendations \
  -H "Content-Type: application/json" \
  -d '{
    "userInput": "I love Solange and jazz music",
    "domain": "music"
  }'
```

## 🛠️ Development Tips

- **Mock Data**: Active if `QLOO_API_KEY` is missing  
- **Errors**: Check console and backend logs  
- **Rate Limits**: Gemini has 1,500/day free  
- **CORS**: Ensure `FRONTEND_URL` matches exactly

## 🌐 Deployment Options

### Backend (Flask)

#### Render:

- Connect GitHub  
- Set environment variables  
- Start command:  
  ```bash
  gunicorn app:app
  ```

#### Heroku:

- Add `Procfile` in `backend/`:
  ```text
  web: gunicorn app:app
  ```

### Frontend (React)

#### Vercel:

- Auto-detects React  
- Build: `npm run build`  
- Output dir: `dist`  

#### Netlify:

- Connect GitHub or upload `dist/`  
- Handle React Router routing manually if needed

### Full Stack Deployment Tips

- Set backend CORS to allow frontend URL  
- Update frontend API URLs to deployed backend

## 🔒 Security Considerations

- Never commit API keys  
- Monitor usage  
- Use `.env` and rotate keys as needed  
- Use HTTPS and production-level Flask settings

## 🤝 Contributing

1. Fork  
2. Create a branch  
3. Make changes  
4. Test  
5. Submit PR

## 📄 License

MIT License – see `LICENSE` file

## 🆘 Troubleshooting

### Common Errors

**API Key not found**  
- Ensure `.env` exists and is correct  
- Restart dev servers

**CORS issues**  
- `FRONTEND_URL` must match running frontend URL exactly

**No Qloo access**  
- Backend uses mock data automatically  
- Contact Qloo for approval status

**Gemini rate limits**  
- Monitor in AI Studio  
- Upgrade tier if needed

**Backend won’t start**  
- Python not installed  
- Try:  
  ```bash
  pip install -r backend/requirements.txt
  ```

For more help, open an issue in the GitHub repository.
