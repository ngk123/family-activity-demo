const Anthropic = require('@anthropic-ai/sdk');

// Initialize Anthropic client with API key from environment variables
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

// Validate API key exists
if (!process.env.ANTHROPIC_API_KEY) {
  console.error('ERROR: ANTHROPIC_API_KEY is not set in environment variables');
  process.exit(1);
}

module.exports = anthropic;
