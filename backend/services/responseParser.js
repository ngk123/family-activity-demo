/**
 * Parses Claude's response to extract recommendations
 * @param {Object} claudeResponse - Response from Claude API
 * @returns {Array} Array of recommendation objects
 */
function parseRecommendations(claudeResponse) {
  try {
    // Extract text content from Claude's response
    let text = '';

    // Claude's response.content is an array of content blocks
    if (claudeResponse.content && Array.isArray(claudeResponse.content)) {
      text = claudeResponse.content
        .filter(block => block.type === 'text')
        .map(block => block.text)
        .join('\n');
    }

    if (!text) {
      throw new Error('No text content in Claude response');
    }

    // Parse recommendations using regex
    // Format: **[Activity Name] [emoji]**\n📍 Location: ...\n🚗 Distance: ...\n[Description]
    const recommendations = [];

    // Split by double asterisks to find titles
    const sections = text.split(/\*\*/).filter(s => s.trim());

    for (let i = 0; i < sections.length; i += 2) {
      if (i + 1 < sections.length) {
        const titleLine = sections[i].trim();
        const content = sections[i + 1].trim();

        // Skip if this doesn't look like a recommendation
        if (!titleLine || !content) continue;

        // Extract emoji from title (emoji is usually at the end)
        const emojiMatch = titleLine.match(/([\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}])/u);
        const emoji = emojiMatch ? emojiMatch[0] : '🎯';

        // Remove emoji from title to get clean title
        const title = titleLine.replace(/([\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}])/gu, '').trim();

        // Extract location (look for 📍 Location: or just "Location:")
        const locationMatch = content.match(/(?:📍\s*)?Location:\s*([^\n]+)/i);
        const location = locationMatch ? locationMatch[1].trim() : null;

        // Extract distance (look for 🚗 Distance: or just "Distance:")
        const distanceMatch = content.match(/(?:🚗\s*)?Distance:\s*([^\n]+)/i);
        const distance = distanceMatch ? distanceMatch[1].trim() : null;

        // Extract description (everything after location/distance metadata)
        let description = content;

        // Remove location and distance lines to get just the description
        description = description.replace(/(?:📍\s*)?Location:[^\n]+\n?/gi, '');
        description = description.replace(/(?:🚗\s*)?Distance:[^\n]+\n?/gi, '');

        // Clean up description (remove extra whitespace, take first paragraph)
        const cleanDescription = description.split('\n\n')[0].trim();

        if (title && cleanDescription) {
          recommendations.push({
            title,
            emoji,
            location,
            distance,
            description: cleanDescription
          });
        }
      }
    }

    // Validate we got exactly 5 recommendations
    if (recommendations.length === 0) {
      throw new Error('No recommendations found in response');
    }

    // Return first 5 recommendations if we got more
    return recommendations.slice(0, 5);

  } catch (error) {
    console.error('Error parsing recommendations:', error);

    // Return a fallback error object
    return [{
      title: 'Error',
      emoji: '⚠️',
      description: `Unable to parse recommendations: ${error.message}`
    }];
  }
}

module.exports = { parseRecommendations };
