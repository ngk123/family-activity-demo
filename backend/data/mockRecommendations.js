/**
 * Mock recommendations for testing without calling Claude API
 * Used when USE_MOCK_DATA=true in .env
 */

function getMockRecommendations(city, minAge, maxAge) {
  return [
    {
      title: `${city} Children's Discovery Museum`,
      emoji: "🔬",
      location: `Downtown ${city}`,
      distance: "3.2 miles",
      description: `This interactive science museum is perfect for kids aged ${minAge}-${maxAge}, featuring hands-on exhibits about physics, biology, and technology. Entry costs around $15 per child with family memberships available. Plan for 2-3 hours of exploration. Open weekends from 10am-5pm with special Saturday workshops.`
    },
    {
      title: `${city} Adventure Park`,
      emoji: "🎡",
      location: `${city} Westside`,
      distance: "5.7 miles",
      description: "An outdoor adventure park with age-appropriate climbing walls, zip lines, and obstacle courses for children. Professional instructors provide safety equipment and guidance. Costs approximately $25-35 per child for a 2-hour session. Advance booking recommended for weekend slots."
    },
    {
      title: `${city} Public Library - Main Branch`,
      emoji: "📚",
      location: `Central ${city}`,
      distance: "2.1 miles",
      description: "Free weekend program featuring interactive storytelling, arts and crafts, and educational activities. Perfect for all ages with sessions grouped by age range. No registration required, just drop in on Saturday mornings at 10am. Includes take-home craft projects."
    },
    {
      title: `Nature Trail at ${city} Regional Park`,
      emoji: "🌲",
      location: `${city} North`,
      distance: "8.4 miles",
      description: "Family-friendly hiking trail with easy terrain suitable for young children. Features educational nature signs, a small playground at the halfway point, and picnic areas. Completely free with ample parking. Trail is 1.5 miles round-trip and takes about 90 minutes with kids."
    },
    {
      title: `${city} Community Aquatic Center`,
      emoji: "🏊",
      location: `${city} Southside`,
      distance: "4.6 miles",
      description: "Indoor heated pool with designated family swim times on Saturday afternoons. Includes shallow areas for young children and fun water features. Lifeguards on duty and swimming lessons available. Entry fee is $8 per person with family passes available at discounted rates."
    }
  ];
}

module.exports = { getMockRecommendations };
