import './ErrorMessage.css';

function ErrorMessage({ error, onRetry }) {
  return (
    <div className="error-container">
      <h3 className="error-title">⚠️ Oops! Something went wrong</h3>
      <p className="error-message">{error}</p>
      <button onClick={onRetry} className="retry-btn">
        Try Again
      </button>
    </div>
  );
}

export default ErrorMessage;
