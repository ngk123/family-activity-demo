/**
 * Builds a prompt for Claude API from user request data
 * @param {Object} requestData - User's activity search parameters
 * @param {string} requestData.city - City name
 * @param {number} requestData.minAge - Minimum kid age
 * @param {number} requestData.maxAge - Maximum kid age
 * @param {string} requestData.availability - When they're free (e.g., "Saturday afternoon")
 * @param {number} requestData.maxDistance - Maximum travel distance in miles
 * @param {string} requestData.preferences - Optional preferences
 * @returns {string} Formatted prompt for Claude
 */
function buildPrompt(requestData) {
  const { city, minAge, maxAge, availability, maxDistance, preferences } = requestData;

  // Format kids ages
  let kidsAges;
  if (minAge === maxAge) {
    kidsAges = `${minAge}`;
  } else {
    kidsAges = `${minAge}-${maxAge}`;
  }

  // Build the prompt using the template from prompt.md
  const prompt = `I need 5 weekend activity recommendations for a family with the following details:

**Location**: ${city}
**Children's Ages**: ${kidsAges}
**When They're Free**: ${availability}
**Max Travel Distance**: ${maxDistance} miles from ${city}
**Additional Preferences**: ${preferences || "None specified"}

Please use your web search capabilities to find current, real activities and events in ${city} that match these criteria.

Requirements:
1. All activities must be:
   - Age-appropriate for children aged ${kidsAges}
   - Located within ${maxDistance} miles of ${city}
   - Available or suitable for ${availability}
   - Family-friendly and safe
   - Varied in type (mix of indoor/outdoor, active/educational, free/paid, etc.)

2. For each recommendation, provide:
   - A descriptive title with a relevant emoji
   - Specific location (neighborhood/area within ${city})
   - Distance from ${city} center (in miles)
   - 2-4 sentences explaining:
     * What the activity is
     * Why it's great for this family
     * Any practical details (approximate cost, duration, special considerations)

3. Format each recommendation EXACTLY as follows:
**[Activity Name] [emoji]**
📍 Location: [Specific area/neighborhood]
🚗 Distance: [X.X miles from city center]
[2-4 sentence description here]

4. Search for current, real events and venues. If you find specific events happening during ${availability}, prioritize those.

Please provide exactly 5 recommendations now.`;

  return prompt;
}

module.exports = { buildPrompt };
