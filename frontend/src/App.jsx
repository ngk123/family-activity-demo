import { useState } from 'react';
import ActivityForm from './components/ActivityForm';
import RecommendationList from './components/RecommendationList';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { fetchRecommendations } from './services/api';
import './App.css';

function App() {
  const [recommendations, setRecommendations] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFormSubmit = async (formData) => {
    console.log('Form submitted with data:', formData);

    // Reset states
    setIsLoading(true);
    setError(null);
    setRecommendations([]);

    try {
      // Call backend API
      const data = await fetchRecommendations(formData);
      setRecommendations(data.recommendations);
      setHasSearched(true);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching recommendations:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎉 Family Activity Finder</h1>
        <p className="app-subtitle">
          Discover amazing activities perfect for your family
        </p>
      </header>

      <main className="app-main">
        <div className="app-content">
          <div className="form-section">
            <ActivityForm onSubmit={handleFormSubmit} isLoading={isLoading} />
          </div>

          <div className="results-section">
            {isLoading ? (
              <LoadingSpinner />
            ) : error ? (
              <ErrorMessage error={error} onRetry={() => setError(null)} />
            ) : hasSearched ? (
              <RecommendationList recommendations={recommendations} />
            ) : (
              <div className="empty-state">
                <p>👈 Fill out the form to get personalized activity recommendations!</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <p>Built with React + Express + Claude API • Milestone 2: Live Recommendations ✅</p>
      </footer>
    </div>
  );
}

export default App;
