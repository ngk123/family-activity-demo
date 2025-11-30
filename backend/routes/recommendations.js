const express = require('express');
const router = express.Router();

// Import services
const anthropic = require('../services/claude');
const { buildPrompt } = require('../services/promptBuilder');
const { parseRecommendations } = require('../services/responseParser');
const { getMockRecommendations } = require('../data/mockRecommendations');

// Import middleware
const { validateRecommendationRequest } = require('../middleware/validation');

/**
 * POST /api/recommendations
 * Get activity recommendations based on family preferences
 */
router.post('/api/recommendations', validateRecommendationRequest, async (req, res, next) => {
  try {
    const { city, minAge, maxAge, availability, maxDistance, preferences } = req.body;

    console.log('Received recommendation request:', { city, minAge, maxAge, availability, maxDistance, preferences });

    // Check if we should use mock data (for testing/development)
    if (process.env.USE_MOCK_DATA === 'true') {
      console.log('🎭 Using MOCK DATA (set USE_MOCK_DATA=false in .env to use real Claude API)');

      // Simulate API delay for realistic testing
      await new Promise(resolve => setTimeout(resolve, 1500));

      const recommendations = getMockRecommendations(city, minAge, maxAge);
      console.log(`Returning ${recommendations.length} mock recommendations`);

      return res.json({ recommendations });
    }

    // Build prompt from request data
    const prompt = buildPrompt(req.body);

    console.log('Calling Claude API with web search...');

    // Call Claude Messages API with web search tool
    const response = await anthropic.messages.create({
      model: "claude-4-sonnet",
      max_tokens: 4096,
      tools: [{
        type: "web_search_20250305",
        name: "web_search",
        max_uses: 5
      }],
      messages: [{
        role: "user",
        content: prompt
      }]
    });

    console.log('Claude API response received');

    // Parse the response to extract recommendations
    const recommendations = parseRecommendations(response);

    console.log(`Parsed ${recommendations.length} recommendations`);

    // Return recommendations to frontend
    res.json({ recommendations });

  } catch (error) {
    console.error('Error in recommendations endpoint:', error);

    // Handle specific Claude API errors
    if (error.status === 429) {
      error.status = 429;
      return next(error);
    }

    if (error.status === 401) {
      return res.status(401).json({
        error: 'Authentication failed',
        details: 'Invalid API key. Please check your ANTHROPIC_API_KEY.'
      });
    }

    if (error.status === 400) {
      return res.status(400).json({
        error: 'Bad request',
        details: error.message || 'Invalid request to Claude API'
      });
    }

    // Pass other errors to error handling middleware
    next(error);
  }
});

module.exports = router;
