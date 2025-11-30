# Claude API Prompt for Activity Recommendations

## System Prompt

```
You are a family activity recommendation expert helping parents find fun, age-appropriate activities for their children.
```

## User Prompt Template

```
I need 5 weekend activity recommendations for a family with the following details:

**Location**: {city}
**Children's Ages**: {kidsAges}
**When They're Free**: {availability}
**Max Travel Distance**: {maxDistance} miles from {city}
**Additional Preferences**: {preferences || "None specified"}

Please use your web search capabilities to find current, real activities and events in {city} that match these criteria.

Requirements:
1. All activities must be:
   - Age-appropriate for children aged {kidsAges}
   - Located within {maxDistance} miles of {city}
   - Available or suitable for {availability}
   - Family-friendly and safe
   - Varied in type (mix of indoor/outdoor, active/educational, free/paid, etc.)

2. For each recommendation, provide:
   - A descriptive title with a relevant emoji
   - 2-4 sentences explaining:
     * What the activity is
     * Why it's great for this family
     * Any practical details (approximate cost, duration, special considerations)

3. Format each recommendation EXACTLY as follows:
**[Activity Name] [emoji]**
[2-4 sentence description here]

4. Search for current, real events and venues. If you find specific events happening during {availability}, prioritize those.

Please provide exactly 5 recommendations now.
```

## Implementation Notes

### Variable Substitution
When calling the Claude API from the Express backend:

```javascript
const prompt = `
I need 5 weekend activity recommendations for a family with the following details:

**Location**: ${city}
**Children's Ages**: ${kidsAges.join(', ')}
**When They're Free**: ${availability}
**Max Travel Distance**: ${maxDistance} miles from ${city}
**Additional Preferences**: ${preferences || "None specified"}

[... rest of prompt as above ...]
`;
```

### Using Web Search Tool

According to the Claude API documentation, enable web search by including it in the tools parameter:

```javascript
const response = await anthropic.messages.create({
  model: "claude-3-7-sonnet-20250219",
  max_tokens: 4096,
  tools: [{
    type: "web_search"
  }],
  messages: [{
    role: "user",
    content: prompt
  }]
});
```

### Response Parsing

Claude's response will be in `response.content`. Extract the text content and parse it for display in the frontend.

Expected format:
```
**Adventure Playground at Central Park 🎡**
This expansive playground features age-appropriate equipment for kids 5-10, including climbing structures, swings, and a splash pad. It's completely free and perfect for Saturday afternoon visits. Located just 3 miles from downtown, with ample parking and picnic areas for families.

**Children's Science Museum 🔬**
[... 4 more recommendations ...]
```
