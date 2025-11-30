// API base URL - defaults to localhost backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

/**
 * Fetches activity recommendations from the backend API
 * @param {Object} formData - Form data from ActivityForm
 * @returns {Promise<Object>} Response with recommendations array
 */
export async function fetchRecommendations(formData) {
  // Create abort controller for timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 second timeout (web search takes time)

  try {
    const response = await fetch(`${API_BASE_URL}/api/recommendations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
      signal: controller.signal
    });

    // Clear timeout on successful response
    clearTimeout(timeoutId);

    // Handle non-200 responses
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || errorData.details || 'Failed to fetch recommendations');
    }

    // Parse and return JSON
    return response.json();

  } catch (error) {
    // Clear timeout on error
    clearTimeout(timeoutId);

    // Handle timeout
    if (error.name === 'AbortError') {
      throw new Error('Request timed out. The service may be busy. Please try again.');
    }

    // Handle network errors
    if (error instanceof TypeError) {
      throw new Error("Can't connect to server. Make sure the backend is running on port 3001.");
    }

    // Re-throw other errors
    throw error;
  }
}
