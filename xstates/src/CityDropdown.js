import React, { useState, useEffect } from 'react';

const CityDropdown = ({ country, state, selectedCity, setSelectedCity }) => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    if (country && state) {
      fetch(`https://crio-location-selector.onrender.com/country=${country}/state=${state}/cities`)
        .then((response) => response.json())
        .then((data) => setCities(data))
        .catch((error) => console.error(`Error fetching cities for ${state}, ${country}:` , error));
    }
  }, [country, state]);

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  return (
    <div>
      <label>Select City:</label>
      <select value={selectedCity || ''} onChange={handleCityChange}>
        <option value="" disabled>
          Select City
        </option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CityDropdown;