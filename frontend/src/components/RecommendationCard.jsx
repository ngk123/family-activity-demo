import './RecommendationCard.css';

function RecommendationCard({ recommendation, rank }) {
  return (
    <div className="recommendation-card">
      <div className="card-rank">#{rank}</div>
      <div className="card-header">
        <span className="card-emoji">{recommendation.emoji}</span>
        <div className="card-header-text">
          <h3 className="card-title">{recommendation.title}</h3>
          <div className="card-meta">
            {recommendation.location && (
              <span className="card-meta-item">
                <span className="card-meta-icon">📍</span>
                {recommendation.location}
              </span>
            )}
            {recommendation.distance && (
              <span className="card-meta-item">
                <span className="card-meta-icon">🚗</span>
                {recommendation.distance}
              </span>
            )}
          </div>
        </div>
      </div>
      <p className="card-description">
        {recommendation.description}
      </p>
    </div>
  );
}

export default RecommendationCard;
