import { useState } from 'react';
import './ActivityForm.css';

function ActivityForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    city: '',
    minAge: 5,
    maxAge: 12,
    availability: '',
    maxDistance: 15,
    preferences: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSliderChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseInt(value)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.city || !formData.availability) {
      alert('Please fill in all required fields');
      return;
    }

    // Format kids ages for the backend
    const formattedData = {
      ...formData,
      kidsAges: formData.minAge === formData.maxAge
        ? `${formData.minAge}`
        : `${formData.minAge}-${formData.maxAge}`
    };

    // Call the parent component's onSubmit handler
    onSubmit(formattedData);
  };

  return (
    <form className="activity-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <h2>Find Activities</h2>
        <p>Tell us about your family!</p>
      </div>

      <div className="form-fields">
        <div className="form-group">
          <label htmlFor="city">City *</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="e.g., San Francisco"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="minAge">
            Kids' Age Range *
            <span className="value-display">{formData.minAge} - {formData.maxAge} years</span>
          </label>
          <div className="dual-slider">
            <div className="slider-group">
              <small>Min Age</small>
              <input
                type="range"
                id="minAge"
                name="minAge"
                min="0"
                max="18"
                value={formData.minAge}
                onChange={handleSliderChange}
                className="slider"
              />
            </div>
            <div className="slider-group">
              <small>Max Age</small>
              <input
                type="range"
                id="maxAge"
                name="maxAge"
                min="0"
                max="18"
                value={formData.maxAge}
                onChange={handleSliderChange}
                className="slider"
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="availability">When Are You Free? *</label>
          <input
            type="text"
            id="availability"
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            placeholder="e.g., Saturday afternoon"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="maxDistance">
            Max Distance
            <span className="value-display">{formData.maxDistance} miles</span>
          </label>
          <input
            type="range"
            id="maxDistance"
            name="maxDistance"
            min="1"
            max="50"
            value={formData.maxDistance}
            onChange={handleSliderChange}
            className="slider"
          />
        </div>

        <div className="form-group">
          <label htmlFor="preferences">Other Preferences (Optional)</label>
          <textarea
            id="preferences"
            name="preferences"
            value={formData.preferences}
            onChange={handleChange}
            placeholder="e.g., outdoor, educational, free"
            rows="3"
          />
        </div>
      </div>

      <button type="submit" className="submit-btn">
        Find Activities 🔍
      </button>
    </form>
  );
}

export default ActivityForm;
