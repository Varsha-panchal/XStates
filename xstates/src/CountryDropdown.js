import React from 'react';

const CountryDropdown = ({ countries, selectedCountry, setSelectedCountry }) => {
  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  return (
    <div>
      <label>Select Country:</label>
      <select value={selectedCountry || ''} onChange={handleCountryChange}>
        <option value="" disabled>
          Select Country
        </option>
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CountryDropdown;