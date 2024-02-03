
import React, { useState, useEffect } from 'react';

const LocationSelector = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    // Fetch all countries on initial render
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await fetch('https://crio-location-selector.onrender.com/countries');
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const fetchStates = async () => {
    try {
      const response = await fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`);
      const data = await response.json();
      setStates(data);
    } catch (error) {
      console.error('Error fetching states:', error);
    }
  };

  const fetchCities = async () => {
    try {
      const response = await fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`);
      const data = await response.json();
      setCities(data);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    setSelectedState('');
    setSelectedCity('');
    fetchStates();
  };

  const handleStateChange = (state) => {
    setSelectedState(state);
    setSelectedCity('');
    fetchCities();
  };

  const handleCityChange = (city) => {
    setSelectedCity(city);
  };

  return (
    <div>
      <label>Select Country:</label>
      <select onChange={(e) => handleCountryChange(e.target.value)} value={selectedCountry}>
        <option value="">-- Select Country --</option>
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>

      {selectedCountry && (
        <>
          <label>Select State:</label>
          <select onChange={(e) => handleStateChange(e.target.value)} value={selectedState}>
            <option value="">-- Select State --</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </>
      )}

      {selectedState && (
        <>
          <label>Select City:</label>
          <select onChange={(e) => handleCityChange(e.target.value)} value={selectedCity}>
            <option value="">-- Select City --</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </>
      )}

      {selectedCity && (
        <p>{`You Selected ${selectedCity}, ${selectedState}, ${selectedCountry}`}</p>
      )}
    </div>
  );
};

export default LocationSelector;