import { useState } from 'react';
import ActivityForm from './components/ActivityForm';
import RecommendationList from './components/RecommendationList';
import { dummyRecommendations } from './data/dummyRecommendations';
import './App.css';

function App() {
  const [recommendations, setRecommendations] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleFormSubmit = (formData) => {
    // For Milestone 1, we just show dummy data
    // In Milestone 2, this will call the backend API
    console.log('Form submitted with data:', formData);

    // Simulate a brief loading state
    setRecommendations([]);
    setHasSearched(true);

    setTimeout(() => {
      setRecommendations(dummyRecommendations);
    }, 500);
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
            <ActivityForm onSubmit={handleFormSubmit} />
          </div>

          <div className="results-section">
            {hasSearched ? (
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
        <p>Built with React + Vite • Milestone 1: UI with Dummy Data ✅</p>
      </footer>
    </div>
  );
}

export default App;
