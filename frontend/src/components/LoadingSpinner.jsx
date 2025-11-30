import './LoadingSpinner.css';

function LoadingSpinner() {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p className="loading-message">Finding amazing activities for your family...</p>
      <p className="loading-submessage">This may take 30-60 seconds while we search the web for current events and venues</p>
    </div>
  );
}

export default LoadingSpinner;
