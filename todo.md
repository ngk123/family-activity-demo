# Milestone 1 Tasks: UI Setup with Dummy Data

## Project Setup
- [x] Create project directory structure
  - [x] Create `frontend` folder
  - [x] Create `backend` folder (prepare for Milestone 2)
- [x] Initialize React project with Vite
  - [x] Run `npm create vite@latest frontend -- --template react`
  - [x] Navigate to frontend folder and run `npm install`
  - [x] Clean up default Vite template files

## Component Development

### Input Form Component
- [x] Create `src/components/ActivityForm.jsx`
- [x] Add form fields:
  - [x] City input (text)
  - [x] Kids ages input (improved with dual range sliders!)
  - [x] Availability input (text, e.g., "Saturday afternoon")
  - [x] Max distance input (improved with range slider!)
  - [x] Preferences textarea (optional)
- [x] Add "Find Activities" submit button
- [x] Add basic form validation
- [x] Handle form state with useState
- [x] Create onSubmit handler (will just set state for now)

### Recommendation Components
- [x] Create `src/components/RecommendationCard.jsx`
  - [x] Display emoji and bold title
  - [x] Display 2-4 sentence description
  - [x] Style as a card with padding, border, etc.
- [x] Create `src/components/RecommendationList.jsx`
  - [x] Accept array of 5 recommendations as props
  - [x] Map over recommendations and render RecommendationCard for each
  - [x] Handle empty state (no recommendations yet)

### Dummy Data
- [x] Create `src/data/dummyRecommendations.js`
- [x] Add 5 hardcoded recommendations with:
  - [x] Bold titles with emojis
  - [x] 2-4 sentence descriptions
  - [x] Example: "Adventure Playground 🎡", "Science Museum 🔬", etc.

## Main App Integration
- [x] Update `src/App.jsx`
  - [x] Import ActivityForm and RecommendationList
  - [x] Add app title/header
  - [x] Set up state for recommendations
  - [x] Wire form submission to update recommendations state
  - [x] Conditional rendering: show dummy data after form submit

## Styling
- [x] Choose CSS approach (plain CSS)
- [x] Create `src/App.css`
- [x] Style the form:
  - [x] Clean input fields with labels
  - [x] Responsive layout (side-by-side on desktop, stacked on mobile)
  - [x] Styled submit button with gradient
  - [x] Custom range sliders with branded colors
  - [x] Single-column form layout for narrow sidebar
- [x] Style recommendation cards:
  - [x] Card layout with spacing
  - [x] Bold titles with emojis
  - [x] Readable text
  - [x] Grid layout (responsive)
  - [x] Hover effects
- [x] Make layout mobile-responsive
  - [x] Test on mobile viewport
  - [x] Adjust spacing and sizes
  - [x] Breakpoints at 1024px, 768px, 480px

## Testing & Polish
- [x] Test form submission with various inputs
- [x] Verify dummy recommendations display correctly
- [x] Test responsive design on different screen sizes
- [x] Check accessibility (labels, focus states)
- [x] Clean up console warnings/errors
- [x] Update page title in `index.html`
- [x] Clean up redundant files (removed duplicate /src folder)

## Documentation
- [ ] Add README.md to frontend folder with:
  - [ ] Setup instructions
  - [ ] How to run dev server
  - [ ] What Milestone 1 accomplishes

## Completion Criteria
- [x] Form accepts all required inputs
- [x] Clicking "Find Activities" displays 5 dummy recommendations
- [x] UI is clean, readable, and mobile-responsive
- [x] No console errors
- [x] Ready to connect to backend in Milestone 2

---

## ✅ Milestone 1 Complete!

**Additional Improvements Made:**
- Side-by-side layout (form left, results right)
- Sticky form positioning for better UX
- Range sliders for age and distance inputs
- Real-time value display on sliders
- Elegant narrow form column (320-420px)
- Custom slider styling with brand colors
- Clean project structure (removed redundant files)

**Dev Server Running:** http://localhost:5173/

**Next Up:** Milestone 2 - Claude API Integration with Web Search Tool

---

# Milestone 2 Tasks: Claude API Integration with Web Search

## Backend Setup

### Express Server Initialization
- [ ] Navigate to `backend` folder
  - [ ] Run: `cd backend`
- [ ] Initialize Node.js project
  - [ ] Run: `npm init -y`
  - [ ] Verify `package.json` created
- [ ] Install production dependencies
  - [ ] Run: `npm install express @anthropic-ai/sdk cors dotenv`
  - [ ] Verify all packages in `package.json` dependencies
- [ ] Install development dependencies
  - [ ] Run: `npm install --save-dev nodemon`
  - [ ] Verify nodemon in `devDependencies`
- [ ] Update `package.json` scripts
  - [ ] Add `"start": "node server.js"`
  - [ ] Add `"dev": "nodemon server.js"`
  - [ ] Add `"test": "echo \"Error: no test specified\" && exit 1"`
- [ ] Create `.env` file in backend folder
  - [ ] Run: `touch .env` (or create manually)
  - [ ] Add line: `ANTHROPIC_API_KEY=your_actual_api_key_here`
  - [ ] Add line: `PORT=3001`
  - [ ] Add line: `NODE_ENV=development`
- [ ] Verify `.env` is in `.gitignore`
  - [ ] Check root `.gitignore` contains `backend/.env`
  - [ ] If not, add it to prevent accidental commits
- [ ] Create `backend/server.js` entry point
  - [ ] Import required modules:
    ```javascript
    const express = require('express');
    const cors = require('cors');
    const dotenv = require('dotenv');
    ```
  - [ ] Configure dotenv: `dotenv.config();`
  - [ ] Initialize Express app: `const app = express();`
  - [ ] Set up CORS middleware: `app.use(cors());`
  - [ ] Set up JSON parsing: `app.use(express.json());`
  - [ ] Set port from env: `const PORT = process.env.PORT || 3001;`
  - [ ] Add basic health check route: `app.get('/health', (req, res) => res.json({ status: 'ok' }));`
  - [ ] Add server listen: `app.listen(PORT, () => console.log(\`Server running on port \${PORT}\`));`
  - [ ] Test server starts without errors

### Claude API Integration
- [ ] Create `backend/services/` folder
  - [ ] Run: `mkdir services`
- [ ] Create `backend/services/claude.js`
  - [ ] Import Anthropic SDK: `const Anthropic = require('@anthropic-ai/sdk');`
  - [ ] Initialize client:
    ```javascript
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY
    });
    ```
  - [ ] Export client: `module.exports = anthropic;`
  - [ ] Add error handling for missing API key
- [ ] Create `backend/services/promptBuilder.js`
  - [ ] Read `prompt.md` file to understand template structure
  - [ ] Create function: `buildPrompt(requestData)`
  - [ ] Extract parameters from requestData:
    - [ ] `city` (string)
    - [ ] `minAge` and `maxAge` (integers)
    - [ ] `availability` (string, e.g., "Saturday afternoon")
    - [ ] `maxDistance` (integer, miles)
    - [ ] `preferences` (string, optional)
  - [ ] Format kids ages:
    - [ ] If `minAge === maxAge`: use single age (e.g., "5")
    - [ ] If different: use range (e.g., "5-12")
  - [ ] Build prompt string using template from `prompt.md`
  - [ ] Include all parameters in human-readable format
  - [ ] Return complete prompt string
  - [ ] Export function: `module.exports = { buildPrompt };`
- [ ] Create `backend/services/responseParser.js`
  - [ ] Create function: `parseRecommendations(claudeResponse)`
  - [ ] Extract text content from Claude's response object
  - [ ] Parse text to find 5 recommendations
  - [ ] For each recommendation, extract:
    - [ ] Title (bold text before emoji)
    - [ ] Emoji (using regex or string matching)
    - [ ] Description (2-4 sentences after title)
  - [ ] Structure as array of objects:
    ```javascript
    [{
      title: "Activity Name",
      emoji: "🎡",
      description: "Description text here..."
    }]
    ```
  - [ ] Handle parsing errors:
    - [ ] Return error object if parsing fails
    - [ ] Log parsing issues for debugging
    - [ ] Provide fallback structure
  - [ ] Validate that exactly 5 recommendations are returned
  - [ ] Export function: `module.exports = { parseRecommendations };`

### API Routes
- [ ] Create `backend/routes/` folder
  - [ ] Run: `mkdir routes`
- [ ] Create `backend/routes/recommendations.js`
  - [ ] Import Express Router: `const express = require('express');`
  - [ ] Create router: `const router = express.Router();`
  - [ ] Import services:
    ```javascript
    const anthropic = require('../services/claude');
    const { buildPrompt } = require('../services/promptBuilder');
    const { parseRecommendations } = require('../services/responseParser');
    ```
  - [ ] Create POST `/api/recommendations` endpoint:
    ```javascript
    router.post('/api/recommendations', async (req, res) => {
      // Implementation here
    });
    ```
  - [ ] Inside endpoint, extract request body:
    - [ ] `const { city, minAge, maxAge, availability, maxDistance, preferences } = req.body;`
  - [ ] Validate required fields (see Error Handling section below)
  - [ ] Build prompt using `buildPrompt(req.body)`
  - [ ] Call Claude Messages API:
    ```javascript
    const response = await anthropic.messages.create({
      model: "claude-4-sonnet",
      max_tokens: 4096,
      tools: [{ type: "web_search" }],
      messages: [{ role: "user", content: prompt }]
    });
    ```
  - [ ] Parse response using `parseRecommendations(response)`
  - [ ] Return JSON response: `res.json({ recommendations: parsedData })`
  - [ ] Wrap in try-catch block for error handling
  - [ ] Export router: `module.exports = router;`
- [ ] Register routes in `backend/server.js`
  - [ ] Import routes: `const recommendationsRouter = require('./routes/recommendations');`
  - [ ] Use routes: `app.use(recommendationsRouter);`
  - [ ] Place AFTER middleware setup, BEFORE `app.listen()`
- [ ] Add request logging middleware (optional but helpful)
  - [ ] Create simple logger:
    ```javascript
    app.use((req, res, next) => {
      console.log(`${req.method} ${req.path}`);
      next();
    });
    ```
  - [ ] Place BEFORE route registration

### Error Handling & Validation
- [ ] Create `backend/middleware/` folder
  - [ ] Run: `mkdir middleware`
- [ ] Create `backend/middleware/validation.js`
  - [ ] Create function: `validateRecommendationRequest(req, res, next)`
  - [ ] Check required fields:
    - [ ] Verify `city` exists and is string
    - [ ] Verify `availability` exists and is string
    - [ ] Verify `minAge` exists and is number (0-18)
    - [ ] Verify `maxAge` exists and is number (0-18)
    - [ ] Verify `maxAge >= minAge`
    - [ ] Verify `maxDistance` exists and is number (1-50)
  - [ ] Check optional fields:
    - [ ] If `preferences` provided, verify it's a string
  - [ ] Return 400 error if validation fails:
    ```javascript
    return res.status(400).json({
      error: 'Validation failed',
      details: 'Specific error message here'
    });
    ```
  - [ ] Call `next()` if validation passes
  - [ ] Export function: `module.exports = { validateRecommendationRequest };`
- [ ] Apply validation in `routes/recommendations.js`
  - [ ] Import: `const { validateRecommendationRequest } = require('../middleware/validation');`
  - [ ] Use as middleware: `router.post('/api/recommendations', validateRecommendationRequest, async (req, res) => {...})`
- [ ] Add error handling middleware in `backend/server.js`
  - [ ] Create error handler (place AFTER all routes):
    ```javascript
    app.use((err, req, res, next) => {
      console.error(err.stack);

      // Handle specific error types
      if (err.status === 429) {
        return res.status(429).json({ error: 'Rate limit exceeded. Please try again later.' });
      }

      if (err.status === 503) {
        return res.status(503).json({ error: 'Claude API unavailable. Please try again later.' });
      }

      // Default 500 error
      res.status(err.status || 500).json({
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
      });
    });
    ```
- [ ] Handle Claude API specific errors in route:
  - [ ] Catch rate limit errors (429)
  - [ ] Catch authentication errors (401)
  - [ ] Catch invalid request errors (400)
  - [ ] Pass errors to error middleware using `next(err)`

## Frontend Integration

### API Service Layer
- [ ] Create `frontend/src/services/` folder
  - [ ] Run: `mkdir -p frontend/src/services`
- [ ] Create `frontend/src/services/api.js`
  - [ ] Define base URL constant:
    ```javascript
    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
    ```
  - [ ] Create `fetchRecommendations(formData)` async function:
    ```javascript
    export async function fetchRecommendations(formData) {
      const response = await fetch(`${API_BASE_URL}/api/recommendations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to fetch recommendations');
      }

      return response.json();
    }
    ```
  - [ ] Add timeout handling:
    - [ ] Use `AbortController` for 30-second timeout
    - [ ] Throw timeout error if exceeded
  - [ ] Handle network errors:
    - [ ] Wrap fetch in try-catch
    - [ ] Check for `TypeError` (network failure)
    - [ ] Return user-friendly error messages
  - [ ] Export function

### Update App Component
- [ ] Open `frontend/src/App.jsx`
- [ ] Import API service:
  - [ ] Add: `import { fetchRecommendations } from './services/api';`
- [ ] Add new state variables:
  - [ ] `const [isLoading, setIsLoading] = useState(false);`
  - [ ] `const [error, setError] = useState(null);`
- [ ] Update `handleFormSubmit` function:
  - [ ] Make it async: `const handleFormSubmit = async (formData) => {`
  - [ ] Add loading state management:
    ```javascript
    setIsLoading(true);
    setError(null);
    ```
  - [ ] Replace dummy data call with real API call:
    ```javascript
    try {
      const data = await fetchRecommendations(formData);
      setRecommendations(data.recommendations);
      setHasSearched(true);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching recommendations:', err);
    } finally {
      setIsLoading(false);
    }
    ```
- [ ] Update JSX to handle loading state:
  - [ ] Show loading spinner when `isLoading === true`
  - [ ] Disable form when loading
  - [ ] Show error message when `error !== null`
- [ ] Pass `isLoading` prop to ActivityForm:
  - [ ] `<ActivityForm onSubmit={handleFormSubmit} isLoading={isLoading} />`
- [ ] Update ActivityForm to disable during loading:
  - [ ] Add `disabled={isLoading}` to submit button
  - [ ] Optionally disable all input fields

### Loading Component
- [ ] Create `frontend/src/components/LoadingSpinner.jsx`
  - [ ] Create simple spinner component:
    ```jsx
    function LoadingSpinner() {
      return (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Finding amazing activities for your family...</p>
        </div>
      );
    }
    export default LoadingSpinner;
    ```
- [ ] Create `frontend/src/components/LoadingSpinner.css`
  - [ ] Add spinner animation:
    ```css
    .spinner {
      border: 4px solid var(--border-color);
      border-top: 4px solid var(--primary-color);
      border-radius: 50%;
      width: 40px;
      height: 40px;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    ```
  - [ ] Style loading container with centering
- [ ] Import and use LoadingSpinner in `App.jsx`:
  - [ ] Show when `isLoading === true`
  - [ ] Place in results section

### Error Handling UI
- [ ] Create `frontend/src/components/ErrorMessage.jsx`
  - [ ] Accept props: `error`, `onRetry`
  - [ ] Display error message clearly
  - [ ] Add retry button that calls `onRetry()`
  - [ ] Structure:
    ```jsx
    function ErrorMessage({ error, onRetry }) {
      return (
        <div className="error-message">
          <h3>⚠️ Oops! Something went wrong</h3>
          <p>{error}</p>
          <button onClick={onRetry} className="retry-btn">
            Try Again
          </button>
        </div>
      );
    }
    export default ErrorMessage;
    ```
- [ ] Create `frontend/src/components/ErrorMessage.css`
  - [ ] Style error container with red/warning colors
  - [ ] Style retry button
  - [ ] Add icon or visual indicator
- [ ] Update `App.jsx` to use ErrorMessage:
  - [ ] Import ErrorMessage component
  - [ ] Show when `error !== null`
  - [ ] Pass error message and retry handler:
    ```jsx
    {error && (
      <ErrorMessage
        error={error}
        onRetry={() => setError(null)}
      />
    )}
    ```
- [ ] Optional: Add error boundary
  - [ ] Create `ErrorBoundary.jsx` class component
  - [ ] Wrap App in ErrorBoundary in `main.jsx`
  - [ ] Catch React rendering errors

## Testing & Integration

### Backend Testing
- [ ] Start backend server
  - [ ] Navigate to backend folder: `cd backend`
  - [ ] Run: `npm run dev`
  - [ ] Verify console shows: "Server running on port 3001"
  - [ ] Check for any errors or warnings
  - [ ] Verify no missing dependencies
- [ ] Test health check endpoint
  - [ ] Open browser to: `http://localhost:3001/health`
  - [ ] Should see: `{"status":"ok"}`
  - [ ] Or use curl: `curl http://localhost:3001/health`
- [ ] Test API endpoint with curl or Postman
  - [ ] Create test request body:
    ```json
    {
      "city": "San Francisco",
      "minAge": 5,
      "maxAge": 12,
      "availability": "Saturday afternoon",
      "maxDistance": 15,
      "preferences": "outdoor activities"
    }
    ```
  - [ ] Send POST request:
    ```bash
    curl -X POST http://localhost:3001/api/recommendations \
      -H "Content-Type: application/json" \
      -d '{"city":"San Francisco","minAge":5,"maxAge":12,"availability":"Saturday afternoon","maxDistance":15,"preferences":"outdoor"}'
    ```
  - [ ] Verify response contains:
    - [ ] `recommendations` array with 5 items
    - [ ] Each item has `title`, `emoji`, `description`
    - [ ] Response time is reasonable (< 30 seconds)
  - [ ] Check backend console for:
    - [ ] Request logged
    - [ ] No error messages
    - [ ] Claude API call successful
- [ ] Test error scenarios:
  - [ ] **Missing city field:**
    - [ ] Send request without `city`
    - [ ] Should return 400 error with validation message
  - [ ] **Invalid age range:**
    - [ ] Send `minAge: 15, maxAge: 5`
    - [ ] Should return 400 error
  - [ ] **Invalid API key:**
    - [ ] Temporarily change API key in `.env`
    - [ ] Should return 401 or appropriate error
  - [ ] **Malformed JSON:**
    - [ ] Send invalid JSON body
    - [ ] Should return 400 error
- [ ] Verify web search tool usage
  - [ ] Check Claude API response structure
  - [ ] Look for tool use in response
  - [ ] Verify recommendations include current information

### Frontend-Backend Integration
- [ ] Run both servers simultaneously
  - [ ] **Terminal 1:** `cd backend && npm run dev` (port 3001)
  - [ ] **Terminal 2:** `cd frontend && npm run dev` (port 5173)
  - [ ] Verify both servers running without conflicts
- [ ] Test full flow end-to-end:
  - [ ] Open browser to `http://localhost:5173`
  - [ ] Fill out form with test data:
    - [ ] City: "San Francisco"
    - [ ] Age range: 5-12 years
    - [ ] Availability: "Saturday afternoon"
    - [ ] Distance: 15 miles
    - [ ] Preferences: "outdoor activities"
  - [ ] Click "Find Activities" button
  - [ ] **Verify loading state:**
    - [ ] Loading spinner appears
    - [ ] Submit button disabled
    - [ ] Loading message shows
  - [ ] **Verify recommendations appear:**
    - [ ] 5 cards display
    - [ ] Each has title, emoji, description
    - [ ] Descriptions are 2-4 sentences
    - [ ] Content is San Francisco-specific
  - [ ] **Verify formatting:**
    - [ ] Emojis display correctly
    - [ ] Text is readable
    - [ ] Cards are styled properly
- [ ] Test error scenarios from UI:
  - [ ] **Backend server down:**
    - [ ] Stop backend server (Ctrl+C in Terminal 1)
    - [ ] Submit form from frontend
    - [ ] Should show error message
    - [ ] Error should be user-friendly
    - [ ] Retry button should be available
  - [ ] **Network timeout:**
    - [ ] Simulate by adding delay in backend
    - [ ] Should show timeout error after 30 seconds
  - [ ] **Invalid form data:**
    - [ ] Try to submit without city
    - [ ] Form validation should prevent submission
  - [ ] **Claude API error:**
    - [ ] Test with invalid API key
    - [ ] Should show error message in UI
- [ ] Test form reset after submission
  - [ ] Submit form successfully
  - [ ] Submit again with different data
  - [ ] Verify recommendations update correctly

### Response Quality Testing
- [ ] Test with different cities:
  - [ ] **New York City:**
    - [ ] Verify NYC-specific activities (Central Park, museums, etc.)
    - [ ] Check recommendations are geographically accurate
  - [ ] **Seattle:**
    - [ ] Look for Seattle landmarks and activities
    - [ ] Verify Pacific Northwest context
  - [ ] **Small town (e.g., "Boulder, Colorado"):**
    - [ ] Verify works with smaller cities
    - [ ] Activities should still be relevant
- [ ] Test with different age ranges:
  - [ ] **Ages 0-3 (toddlers):**
    - [ ] Should recommend age-appropriate activities
    - [ ] Expect: play areas, gentle activities
  - [ ] **Ages 13-18 (teens):**
    - [ ] Should recommend teen-friendly activities
    - [ ] Expect: adventure sports, escape rooms, etc.
  - [ ] **Mixed ages (5-15):**
    - [ ] Should recommend activities suitable for wide range
- [ ] Test with different time slots:
  - [ ] "Saturday morning"
  - [ ] "Weekday afternoon"
  - [ ] "Sunday evening"
  - [ ] Verify timing influences recommendations
- [ ] Test with different preferences:
  - [ ] "educational"
  - [ ] "free activities"
  - [ ] "indoor activities"
  - [ ] "arts and crafts"
  - [ ] Verify preferences are reflected in results
- [ ] Verify web search tool finds current information:
  - [ ] Look for recently opened venues
  - [ ] Check for current events (not past events)
  - [ ] Verify hours/availability are up-to-date
  - [ ] Check recommendations aren't from closed venues

## Polish & Optimization

### Loading States
- [ ] Verify LoadingSpinner displays properly
  - [ ] Check spinner animation is smooth
  - [ ] Verify loading message is centered
  - [ ] Test on different screen sizes
- [ ] Ensure form is disabled during loading
  - [ ] Submit button shows disabled state
  - [ ] Button text changes to "Searching..." or shows loading icon
  - [ ] All input fields are disabled (optional, but good UX)
- [ ] Add smooth transitions
  - [ ] Fade in loading spinner: `transition: opacity 0.3s;`
  - [ ] Fade in recommendations when they appear
  - [ ] Smooth error message appearance
- [ ] Optional: Add skeleton loading state
  - [ ] Show 5 empty card outlines while loading
  - [ ] Use gray placeholders with pulse animation

### Error Messages
- [ ] Review all error messages for user-friendliness
  - [ ] Replace technical errors with plain language
  - [ ] Network errors: "Can't connect to server. Check your internet connection."
  - [ ] API errors: "Service temporarily unavailable. Please try again."
  - [ ] Validation errors: "Please fill in all required fields."
- [ ] Ensure retry buttons work correctly
  - [ ] Test retry after network error
  - [ ] Test retry after API error
  - [ ] Clear error state on retry
- [ ] Add specific timeout handling
  - [ ] Show: "Request timed out. The service may be busy. Please try again."
  - [ ] Provide retry option
- [ ] Add helpful guidance for common errors
  - [ ] "Make sure backend server is running on port 3001"
  - [ ] "Check your API key is configured correctly"

### Performance
- [ ] Implement request timeout
  - [ ] Set 30-second timeout in `api.js`
  - [ ] Use AbortController:
    ```javascript
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);
    ```
  - [ ] Clear timeout on success
  - [ ] Handle abort error gracefully
- [ ] Test with slow network conditions
  - [ ] Use browser DevTools Network throttling
  - [ ] Test on "Slow 3G"
  - [ ] Verify loading states remain responsive
  - [ ] Ensure timeout works
- [ ] Optional: Add request caching
  - [ ] Cache results by form data hash
  - [ ] Show cached results immediately
  - [ ] Add "Refresh" option to get new results
  - [ ] Set cache expiration (e.g., 1 hour)

## Documentation

### Backend README
- [ ] Create `backend/README.md`
- [ ] Add project overview:
  - [ ] "Backend API for Family Activity Finder"
  - [ ] Brief description of functionality
- [ ] Add setup instructions:
  ```markdown
  ## Setup
  1. Install dependencies: `npm install`
  2. Create `.env` file with required variables (see below)
  3. Run development server: `npm run dev`
  4. Run production server: `npm start`
  ```
- [ ] Document environment variables:
  ```markdown
  ## Environment Variables
  - `ANTHROPIC_API_KEY`: Your Claude API key (required)
  - `PORT`: Server port (default: 3001)
  - `NODE_ENV`: Environment (development/production)
  ```
- [ ] Document API endpoints:
  ```markdown
  ## API Endpoints

  ### POST /api/recommendations
  Get activity recommendations based on family preferences.

  **Request Body:**
  ```json
  {
    "city": "San Francisco",
    "minAge": 5,
    "maxAge": 12,
    "availability": "Saturday afternoon",
    "maxDistance": 15,
    "preferences": "outdoor activities"
  }
  ```

  **Response:**
  ```json
  {
    "recommendations": [
      {
        "title": "Activity Name",
        "emoji": "🎡",
        "description": "Description here..."
      }
    ]
  }
  ```
  ```
- [ ] Add troubleshooting section
  - [ ] Common errors and solutions
  - [ ] API key issues
  - [ ] Port conflicts

### Environment Setup
- [ ] Create `backend/.env.example`:
  ```
  ANTHROPIC_API_KEY=your_api_key_here
  PORT=3001
  NODE_ENV=development
  ```
- [ ] Create `frontend/.env.example` (if needed):
  ```
  VITE_API_URL=http://localhost:3001
  ```
- [ ] Update main `README.md` with full stack instructions:
  - [ ] Project overview
  - [ ] Tech stack list
  - [ ] Complete setup guide (both frontend and backend)
  - [ ] How to run both servers
  - [ ] Environment variable setup
  - [ ] Testing instructions
  - [ ] Link to Milestone 1, 2, 3 details

### Code Comments
- [ ] Add comments to `backend/services/claude.js`:
  - [ ] Explain Anthropic client initialization
  - [ ] Document API key validation
- [ ] Add comments to `backend/services/promptBuilder.js`:
  - [ ] Explain prompt template structure
  - [ ] Document age range formatting logic
  - [ ] Clarify parameter substitution
- [ ] Add comments to `backend/services/responseParser.js`:
  - [ ] Explain parsing strategy
  - [ ] Document regex patterns used
  - [ ] Clarify error handling approach
- [ ] Add comments to `backend/routes/recommendations.js`:
  - [ ] Document request flow
  - [ ] Explain error handling
  - [ ] Clarify response structure
- [ ] Add JSDoc comments where helpful:
  ```javascript
  /**
   * Builds a prompt for Claude API from user request data
   * @param {Object} requestData - User's activity search parameters
   * @param {string} requestData.city - City name
   * @param {number} requestData.minAge - Minimum kid age
   * @param {number} requestData.maxAge - Maximum kid age
   * @returns {string} Formatted prompt for Claude
   */
  function buildPrompt(requestData) { ... }
  ```

## Completion Criteria
- [ ] Backend server runs without errors
  - [ ] `npm run dev` starts successfully
  - [ ] No console errors
  - [ ] All dependencies installed
- [ ] Claude API integration works with web search tool
  - [ ] API calls complete successfully
  - [ ] Web search tool is used in requests
  - [ ] Responses include current, location-specific information
- [ ] Frontend successfully calls backend API
  - [ ] API service layer implemented
  - [ ] Requests reach backend
  - [ ] Responses parsed correctly
- [ ] Real recommendations display in UI (not dummy data)
  - [ ] 5 recommendations appear
  - [ ] Each has title, emoji, description
  - [ ] Formatting matches design
- [ ] Recommendations are location-specific and relevant
  - [ ] Test multiple cities
  - [ ] Verify activities are real
  - [ ] Confirm they match search criteria
- [ ] Loading states work properly
  - [ ] Spinner appears during API call
  - [ ] Form disables during loading
  - [ ] Smooth transitions
- [ ] Error handling works for common scenarios
  - [ ] Network errors handled
  - [ ] API errors handled
  - [ ] Validation errors handled
  - [ ] User-friendly error messages
- [ ] Code is documented and clean
  - [ ] README files complete
  - [ ] Code comments added
  - [ ] No console.log statements left in production code
  - [ ] Consistent code style
- [ ] Both servers can run simultaneously (frontend + backend)
  - [ ] No port conflicts
  - [ ] CORS configured correctly
  - [ ] Environment variables set properly
- [ ] Ready for Milestone 3 (deployment)
  - [ ] All tests passing
  - [ ] Documentation complete
  - [ ] No critical bugs
