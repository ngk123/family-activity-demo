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
- [ ] Initialize Node.js project
  - [ ] Run `npm init -y`
  - [ ] Install dependencies: `express`, `@anthropic-ai/sdk`, `cors`, `dotenv`
  - [ ] Install dev dependency: `nodemon`
- [ ] Create `.env` file
  - [ ] Add `ANTHROPIC_API_KEY=your_key_here`
  - [ ] Add `.env` to `.gitignore`
- [ ] Create `server.js` entry point
  - [ ] Import and configure Express
  - [ ] Set up CORS middleware
  - [ ] Configure dotenv for environment variables
  - [ ] Set up port (e.g., 3001)

### Claude API Integration
- [ ] Create `services/claude.js`
  - [ ] Initialize Anthropic client with API key
  - [ ] Export client instance
- [ ] Create `services/promptBuilder.js`
  - [ ] Implement function to build prompt from request data
  - [ ] Use template from `prompt.md`
  - [ ] Format kids ages properly (e.g., "5-12" or "5, 8, 12")
  - [ ] Include all required parameters (city, ages, availability, distance, preferences)
- [ ] Create `services/responseParser.js`
  - [ ] Parse Claude's text response
  - [ ] Extract 5 recommendations
  - [ ] Structure each recommendation with title, emoji, description
  - [ ] Handle parsing errors gracefully

### API Routes
- [ ] Create `routes/recommendations.js`
  - [ ] Set up POST `/api/recommendations` endpoint
  - [ ] Validate incoming request body
  - [ ] Call Claude Messages API with web search tool enabled
  - [ ] Handle Claude API errors (rate limits, invalid requests, etc.)
  - [ ] Return formatted response to frontend
- [ ] Register routes in `server.js`
- [ ] Add request logging middleware (optional but helpful)

### Error Handling & Validation
- [ ] Add input validation
  - [ ] Validate required fields (city, availability, minAge, maxAge, maxDistance)
  - [ ] Validate data types and ranges
  - [ ] Return clear error messages
- [ ] Add error handling middleware
  - [ ] Handle 400 (bad request)
  - [ ] Handle 429 (rate limit)
  - [ ] Handle 500 (server error)
  - [ ] Handle 503 (Claude API unavailable)

## Frontend Integration

### API Service Layer
- [ ] Create `frontend/src/services/api.js`
  - [ ] Create base URL configuration (e.g., `http://localhost:3001`)
  - [ ] Implement `fetchRecommendations(formData)` function
  - [ ] Use fetch API to POST to backend
  - [ ] Handle network errors
  - [ ] Return parsed JSON response

### Update App Component
- [ ] Modify `App.jsx` to call real API
  - [ ] Replace dummy data call with API call
  - [ ] Add loading state (`isLoading`)
  - [ ] Add error state (`error`)
  - [ ] Update handleFormSubmit to be async
  - [ ] Handle API errors and display to user
- [ ] Create loading component or state
  - [ ] Show spinner or skeleton while fetching
  - [ ] Disable form during loading
  - [ ] Add loading message

### Error Handling UI
- [ ] Create `components/ErrorMessage.jsx`
  - [ ] Display error messages clearly
  - [ ] Allow user to retry
  - [ ] Style error states
- [ ] Update `App.jsx` to use ErrorMessage component
- [ ] Add error boundary (optional but recommended)

## Testing & Integration

### Backend Testing
- [ ] Start backend server
  - [ ] Run `npm run dev` (with nodemon)
  - [ ] Verify server starts on correct port
  - [ ] Check console for any errors
- [ ] Test API endpoint directly
  - [ ] Use Postman or curl to test POST `/api/recommendations`
  - [ ] Verify Claude API integration works
  - [ ] Verify web search tool is being used
  - [ ] Check response format matches frontend expectations
- [ ] Test error scenarios
  - [ ] Missing required fields
  - [ ] Invalid API key
  - [ ] Malformed requests

### Frontend-Backend Integration
- [ ] Update frontend to point to backend URL
- [ ] Test full flow end-to-end
  - [ ] Submit form from UI
  - [ ] Verify loading state shows
  - [ ] Verify real recommendations appear
  - [ ] Check that recommendations are location-specific
  - [ ] Verify emojis and formatting are correct
- [ ] Test error scenarios from UI
  - [ ] Backend server down
  - [ ] Network timeout
  - [ ] Invalid form data
  - [ ] Claude API errors

### Response Quality Testing
- [ ] Test with different cities
  - [ ] Verify recommendations are location-specific
  - [ ] Check that activities are real/relevant
- [ ] Test with different age ranges
  - [ ] Verify age-appropriate recommendations
- [ ] Test with different time slots
  - [ ] Check if timing is considered
- [ ] Verify web search tool is finding current information
  - [ ] Look for recent events or newly opened venues

## Polish & Optimization

### Loading States
- [ ] Add loading spinner or skeleton
- [ ] Disable form inputs during loading
- [ ] Show progress indicator
- [ ] Add smooth transitions

### Error Messages
- [ ] User-friendly error messages
- [ ] Retry buttons for failed requests
- [ ] Timeout handling
- [ ] Network error guidance

### Performance
- [ ] Add request timeout (e.g., 30 seconds)
- [ ] Consider adding request caching (optional)
- [ ] Test with slow network conditions

## Documentation

### Backend README
- [ ] Create `backend/README.md`
  - [ ] Setup instructions
  - [ ] Environment variables needed
  - [ ] How to run the server
  - [ ] API endpoint documentation

### Environment Setup
- [ ] Create `.env.example` files
  - [ ] Backend: List all required env vars
  - [ ] Frontend: Add backend URL if needed
- [ ] Update main README with full stack instructions

### Code Comments
- [ ] Add comments to Claude API integration
- [ ] Document prompt building logic
- [ ] Explain response parsing

## Completion Criteria
- [ ] Backend server runs without errors
- [ ] Claude API integration works with web search tool
- [ ] Frontend successfully calls backend API
- [ ] Real recommendations display in UI (not dummy data)
- [ ] Recommendations are location-specific and relevant
- [ ] Loading states work properly
- [ ] Error handling works for common scenarios
- [ ] Code is documented and clean
- [ ] Both servers can run simultaneously (frontend + backend)
- [ ] Ready for Milestone 3 (deployment)
