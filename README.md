# Family Activity Finder

A web application that provides personalized family activity recommendations using AI-powered web search. Built with React, Express, and Claude AI.

## Overview

Family Activity Finder helps families discover engaging activities tailored to their children's ages, location, availability, and preferences. The app uses Claude AI with real-time web search to find current events, venues, and activities that match your specific needs.

## Features

- **AI-Powered Recommendations**: Uses Claude 4 Sonnet with web search capabilities to find real, current activities
- **Personalized Results**: Tailored recommendations based on:
  - Children's age range
  - Location (city/area)
  - Availability (when you're free)
  - Maximum travel distance
  - Additional preferences
- **Smart Sorting**: Sort recommendations by:
  - Relevance (AI ranking)
  - Distance (nearest first)
  - Name (alphabetical)
- **Ranked Results**: Clear #1-#5 ranking badges on each recommendation
- **Detailed Information**: Each recommendation includes:
  - Activity name and description
  - Location and distance from city center
  - Why it's great for your family
- **Mock Data Mode**: Test the UI without consuming API credits
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

### Frontend
- **React** 18.3 - UI framework
- **Vite** 6.0 - Build tool and dev server
- **CSS3** - Custom styling with CSS variables

### Backend
- **Node.js** - JavaScript runtime
- **Express** 4.x - Web server framework
- **Anthropic Claude API** - AI recommendations with web search
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Development Tools
- **ESLint** - Code linting
- **Nodemon** - Auto-restart server during development

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Claude API Key** - [Get one from Anthropic](https://console.anthropic.com/)
- **Git** - For version control

Check your installations:
```bash
node --version  # Should be v18 or higher
npm --version   # Should be v9 or higher
git --version
```

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/ngk123/family-activity-demo.git
cd family-activity-demo
```

### 2. Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env  # Or create manually
```

**Configure `.env` file** (create if it doesn't exist):
```env
# Required: Your Anthropic API key
ANTHROPIC_API_KEY=your_api_key_here

# Server configuration
PORT=3001
NODE_ENV=development

# Toggle between real API and mock data
# Set to 'true' for testing without API calls
# Set to 'false' to use real Claude API
USE_MOCK_DATA=false
```

**IMPORTANT**: Never commit your `.env` file to git. It's already in `.gitignore`.

### 3. Frontend Setup

```bash
# Navigate to frontend folder (from project root)
cd frontend

# Install dependencies
npm install
```

## Running the Application

You need to run both the backend server and frontend dev server simultaneously.

### Option 1: Two Terminal Windows

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
You should see: `Server running on port 3001`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
You should see: `Local: http://localhost:5173/`

### Option 2: Production Mode

**Backend:**
```bash
cd backend
npm start
```

**Frontend (build first):**
```bash
cd frontend
npm run build
npm run preview
```

### Accessing the App

Open your browser and navigate to:
```
http://localhost:5173
```

The frontend (port 5173) will communicate with the backend (port 3001) automatically.

## Project Structure

```
FamilyEventApp/
├── backend/
│   ├── data/
│   │   └── mockRecommendations.js    # Static test data
│   ├── middleware/
│   │   └── validation.js             # Request validation
│   ├── routes/
│   │   └── recommendations.js        # API endpoints
│   ├── services/
│   │   ├── claude.js                 # Anthropic client initialization
│   │   ├── promptBuilder.js          # Build prompts for Claude
│   │   └── responseParser.js         # Parse Claude responses
│   ├── .env                          # Environment variables (not in git)
│   ├── package.json                  # Backend dependencies
│   └── server.js                     # Express server entry point
│
├── frontend/
│   ├── public/                       # Static assets
│   ├── src/
│   │   ├── components/
│   │   │   ├── ActivityForm.jsx      # Input form
│   │   │   ├── RecommendationList.jsx # List with sorting
│   │   │   ├── RecommendationCard.jsx # Individual card
│   │   │   ├── LoadingSpinner.jsx    # Loading state
│   │   │   └── ErrorMessage.jsx      # Error handling
│   │   ├── services/
│   │   │   └── api.js                # Backend API calls
│   │   ├── App.jsx                   # Main app component
│   │   ├── App.css                   # Global styles
│   │   └── main.jsx                  # React entry point
│   ├── package.json                  # Frontend dependencies
│   └── vite.config.js                # Vite configuration
│
├── CLAUDE.md                         # Project instructions for AI
├── prompt.md                         # Prompt template documentation
├── todo.md                           # Project todo list
└── README.md                         # This file
```

## API Documentation

### POST /api/recommendations

Get personalized activity recommendations.

**Request Body:**
```json
{
  "city": "San Francisco",
  "minAge": 5,
  "maxAge": 12,
  "availability": "Saturday afternoon",
  "maxDistance": 15,
  "preferences": "outdoor activities, educational"
}
```

**Field Validation:**
- `city` (required): String, city name
- `minAge` (required): Number, 0-18
- `maxAge` (required): Number, 0-18, must be >= minAge
- `availability` (required): String, when you're free
- `maxDistance` (required): Number, 1-50 miles
- `preferences` (optional): String, additional preferences

**Success Response (200):**
```json
{
  "recommendations": [
    {
      "title": "Children's Discovery Museum",
      "emoji": "🔬",
      "location": "Downtown San Francisco",
      "distance": "3.2 miles",
      "description": "Interactive science museum perfect for kids..."
    }
    // ... 4 more recommendations
  ]
}
```

**Error Responses:**
- `400` - Validation error (invalid request)
- `401` - Authentication error (invalid API key)
- `429` - Rate limit exceeded
- `500` - Server error
- `503` - Claude API unavailable

## Development Workflow

### Mock Data vs Real API

**Use Mock Data** when:
- Testing UI changes
- Developing new features
- Avoiding API rate limits
- Working without internet

Set in `backend/.env`:
```env
USE_MOCK_DATA=true
```

**Use Real API** when:
- Testing actual recommendations
- Demonstrating the app
- Verifying Claude integration

Set in `backend/.env`:
```env
USE_MOCK_DATA=false
```

### Making Changes

1. **Frontend changes**: Edit files in `frontend/src/`, Vite will hot-reload
2. **Backend changes**: Edit files in `backend/`, Nodemon will auto-restart
3. **Environment changes**: Restart the backend server after changing `.env`

### Git Workflow

```bash
# Check status
git status

# Stage changes
git add .

# Commit with message
git commit -m "Description of changes"

# Push to GitHub
git push origin main
```

## Troubleshooting

### Backend won't start

**Error: `ANTHROPIC_API_KEY is not set`**
- Solution: Create `backend/.env` file and add your API key

**Error: `Port 3001 already in use`**
- Solution: Kill the process using port 3001 or change PORT in `.env`
```bash
# Find and kill process on port 3001 (Mac/Linux)
lsof -ti:3001 | xargs kill -9

# Or change port in backend/.env
PORT=3002
```

### Frontend can't connect to backend

**Error: `Can't connect to server`**
- Solution: Make sure backend is running on port 3001
- Check console for `Server running on port 3001`

### API Errors

**Error: `Rate limit exceeded (429)`**
- Solution: Switch to mock data mode or wait a few minutes
```env
USE_MOCK_DATA=true
```

**Error: `Authentication failed (401)`**
- Solution: Check your API key in `backend/.env`
- Get a new key from https://console.anthropic.com/

**Error: `Request timed out`**
- Solution: This is normal for web search operations (can take 30-60 seconds)
- If persistent, check your internet connection

### Build Errors

**Error: Dependencies not found**
```bash
# Reinstall dependencies
cd backend && npm install
cd ../frontend && npm install
```

**Error: `Cannot find module`**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Environment Variables

### Backend (.env)

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `ANTHROPIC_API_KEY` | Yes | - | Your Claude API key |
| `PORT` | No | 3001 | Backend server port |
| `NODE_ENV` | No | development | Environment mode |
| `USE_MOCK_DATA` | No | false | Use mock data instead of API |

### Frontend

Frontend configuration uses `vite.config.js`. No `.env` needed currently.

## Project Milestones

### ✅ Milestone 1: UI with Dummy Data
- React frontend with Vite
- Activity input form
- Static recommendation cards
- Responsive design

### ✅ Milestone 2: Claude API Integration
- Express backend server
- Claude API with web search tool
- Real-time recommendations
- Location and distance info
- Ranking system (#1-#5)
- Sort by relevance, distance, name
- Mock data toggle
- Loading and error states

### 🔄 Milestone 3: Planned Features
- User authentication
- Save favorite activities
- Share recommendations
- Filter by activity type
- Map view integration
- Calendar integration

## Tech Architecture Explained

### How It Works

1. **User fills out form** → Frontend validates and sends to backend
2. **Backend receives request** → Validates data and builds prompt
3. **Claude API called** → Uses web search to find current activities
4. **Response parsed** → Extracts 5 recommendations with details
5. **Frontend displays** → Shows cards with ranking and sorting

### Why This Stack?

- **React**: Component-based UI makes it easy to build and maintain
- **Vite**: Fast development with instant hot module replacement
- **Express**: Lightweight, flexible backend framework
- **Claude API**: Best-in-class AI with web search for current data
- **Separation of concerns**: Frontend and backend are independent

### Key Design Patterns

1. **Service Layer**: Business logic separated from routes
2. **Middleware**: Validation and error handling as reusable functions
3. **Component Composition**: Small, reusable React components
4. **Feature Toggles**: Easy switching between mock and real data
5. **Error Boundaries**: Graceful error handling at every level

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Support

If you encounter issues:
1. Check the Troubleshooting section above
2. Review the console logs (browser and terminal)
3. Open an issue on GitHub with:
   - Error message
   - Steps to reproduce
   - Your environment (Node version, OS)

## Acknowledgments

- Built with Claude Code
- Powered by Anthropic's Claude AI
- UI inspired by modern design principles

---

**Happy Activity Finding!** 🎉
