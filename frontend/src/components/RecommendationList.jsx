import { useState } from 'react';
import RecommendationCard from './RecommendationCard';
import './RecommendationList.css';

function RecommendationList({ recommendations }) {
  const [sortBy, setSortBy] = useState('relevance');

  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="empty-state">
        <p>Fill out the form above to get personalized activity recommendations! 🎯</p>
      </div>
    );
  }

  // Helper function to extract numeric distance from string (e.g., "3.2 miles" -> 3.2)
  const parseDistance = (distanceStr) => {
    if (!distanceStr) return Infinity; // Put items without distance at the end
    const match = distanceStr.match(/(\d+\.?\d*)/);
    return match ? parseFloat(match[1]) : Infinity;
  };

  // Sort recommendations based on selected criteria
  const getSortedRecommendations = () => {
    const sorted = [...recommendations];

    switch (sortBy) {
      case 'distance':
        return sorted.sort((a, b) => parseDistance(a.distance) - parseDistance(b.distance));

      case 'name':
        return sorted.sort((a, b) => a.title.localeCompare(b.title));

      case 'relevance':
      default:
        // Keep original order (Claude's ranking by relevance)
        return sorted;
    }
  };

  const sortedRecommendations = getSortedRecommendations();

  return (
    <div className="recommendations-container">
      <div className="recommendations-header">
        <h2 className="recommendations-title">Your Activity Recommendations</h2>

        <div className="sort-controls">
          <label htmlFor="sort-select" className="sort-label">Sort by:</label>
          <select
            id="sort-select"
            className="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="relevance">🎯 Relevance</option>
            <option value="distance">🚗 Distance</option>
            <option value="name">📝 Name (A-Z)</option>
          </select>
        </div>
      </div>

      <div className="recommendations-grid">
        {sortedRecommendations.map((rec, index) => (
          <RecommendationCard
            key={index}
            recommendation={rec}
            rank={index + 1}
          />
        ))}
      </div>
    </div>
  );
}

export default RecommendationList;
