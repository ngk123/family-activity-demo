# Family Activity Finder - Specification

## Overview
A web app that helps parents find weekend activities for their kids based on location, ages, availability, and preferences.

## Requirements

### Functional Requirements
1. User inputs:
   - City (text input)
   - Kids' ages (number inputs or comma-separated)
   - Availability (e.g., "Saturday afternoon", text input)
   - Max travel distance in miles (number input)
   - Other preferences (optional text area)

2. Output:
   - 5 activity recommendations
   - Each recommendation includes:
     - Bold title with relevant emoji
     - 2-4 sentence description
     - Age-appropriate and location-specific

3. AI-powered recommendations using Claude API with web search

### Non-Functional Requirements
- Simple, clean UI
- Mobile-responsive
- Fast response times (< 10 seconds)
- Secure API key handling (backend only)

## Tech Stack

### Frontend
- **React 18+** with Vite
- **CSS** - Plain CSS or Tailwind CSS for simplicity
- **Fetch API** for backend communication

### Backend
- **Node.js** with Express.js
- **@anthropic-ai/sdk** for Claude API integration
- **cors** for cross-origin requests
- **dotenv** for environment variables

### APIs
- **Claude Messages API** with Web Search Tool
- Reference: https://docs.claude.com/en/docs/agents-and-tools/tool-use/web-search-tool

## Design Guidelines

### UI/UX Principles
- **Simple and Clean**: Minimal design, focus on functionality
- **Clear CTAs**: Prominent "Find Activities" button
- **Readable**: Large fonts, good contrast, emoji for visual interest
- **Responsive**: Works well on mobile and desktop
- **Helpful**: Show loading states, clear error messages

### Visual Style
- Modern, friendly aesthetic appropriate for families
- Use whitespace effectively
- Card-based layout for recommendations
- Subtle animations for loading states

### Accessibility
- Semantic HTML
- Proper labels for form inputs
- Keyboard navigation support
- Good color contrast

## Milestones

### Milestone 1: UI Setup with Dummy Data
**Goal**: Build functional frontend with static data

Tasks:
- Set up React project with Vite
- Create form component with all input fields
- Create recommendation card component
- Display 5 hardcoded recommendations
- Basic responsive styling
- No backend needed yet

**Success Criteria**: Users can fill out form and see dummy recommendations

### Milestone 2: Claude API Integration
**Goal**: Replace dummy data with real AI recommendations

Tasks:
- Set up Express backend
- Integrate Claude Messages API with Web Search Tool
- Create POST endpoint for recommendations
- Connect frontend to backend
- Parse and display Claude's responses
- Handle loading and error states

**Success Criteria**: Users get real, location-specific activity recommendations from Claude

### Milestone 3: Polish and Deploy
**Goal**: Production-ready application

Tasks:
- Refine UI/UX
- Add comprehensive error handling
- Optimize performance
- Deploy frontend (Vercel/Netlify)
- Deploy backend (Railway/Render)
- Test end-to-end

**Success Criteria**: Live, publicly accessible app that works reliably
