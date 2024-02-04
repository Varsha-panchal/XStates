import React, { useState, useEffect } from 'react';

const StateDropdown = ({ country, selectedState, setSelectedState }) => {
  const [states, setStates] = useState([]);

  useEffect(() => {
    if (country) {
      fetch(`https://crio-location-selector.onrender.com/country=${country}/states`)
        .then((response) => response.json())
        .then((data) => setStates(data))
        .catch((error) => console.error(`Error fetching states for ${country}:`, error));
    }
  }, [country]);

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
  };

  return (
    <div>
      <label>Select State:</label>
      <select value={selectedState || ''} onChange={handleStateChange}>
        <option value="" disabled>
          Select State
        </option>
        {states.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StateDropdown;