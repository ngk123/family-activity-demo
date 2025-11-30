import RecommendationCard from './RecommendationCard';
import './RecommendationList.css';

function RecommendationList({ recommendations }) {
  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="empty-state">
        <p>Fill out the form above to get personalized activity recommendations! 🎯</p>
      </div>
    );
  }

  return (
    <div className="recommendations-container">
      <h2 className="recommendations-title">Your Activity Recommendations</h2>
      <div className="recommendations-grid">
        {recommendations.map((rec, index) => (
          <RecommendationCard key={index} recommendation={rec} />
        ))}
      </div>
    </div>
  );
}

export default RecommendationList;
