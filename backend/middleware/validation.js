/**
 * Validates recommendation request data
 */
function validateRecommendationRequest(req, res, next) {
  const { city, minAge, maxAge, availability, maxDistance, preferences } = req.body;

  // Validate required fields
  if (!city || typeof city !== 'string' || city.trim() === '') {
    return res.status(400).json({
      error: 'Validation failed',
      details: 'City is required and must be a non-empty string'
    });
  }

  if (!availability || typeof availability !== 'string' || availability.trim() === '') {
    return res.status(400).json({
      error: 'Validation failed',
      details: 'Availability is required and must be a non-empty string'
    });
  }

  if (typeof minAge !== 'number' || minAge < 0 || minAge > 18) {
    return res.status(400).json({
      error: 'Validation failed',
      details: 'minAge must be a number between 0 and 18'
    });
  }

  if (typeof maxAge !== 'number' || maxAge < 0 || maxAge > 18) {
    return res.status(400).json({
      error: 'Validation failed',
      details: 'maxAge must be a number between 0 and 18'
    });
  }

  if (maxAge < minAge) {
    return res.status(400).json({
      error: 'Validation failed',
      details: 'maxAge must be greater than or equal to minAge'
    });
  }

  if (typeof maxDistance !== 'number' || maxDistance < 1 || maxDistance > 50) {
    return res.status(400).json({
      error: 'Validation failed',
      details: 'maxDistance must be a number between 1 and 50'
    });
  }

  // Validate optional fields
  if (preferences && typeof preferences !== 'string') {
    return res.status(400).json({
      error: 'Validation failed',
      details: 'preferences must be a string if provided'
    });
  }

  // Validation passed
  next();
}

module.exports = { validateRecommendationRequest };
