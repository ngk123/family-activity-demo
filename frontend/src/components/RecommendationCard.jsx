import './RecommendationCard.css';

function RecommendationCard({ recommendation }) {
  return (
    <div className="recommendation-card">
      <h3 className="card-title">
        {recommendation.title} {recommendation.emoji}
      </h3>
      <p className="card-description">
        {recommendation.description}
      </p>
    </div>
  );
}

export default RecommendationCard;
