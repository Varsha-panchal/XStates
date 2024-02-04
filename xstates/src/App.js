
import React, { useState, useEffect } from "react";
import CountryDropdown from "./CountryDropdown";
import StateDropdown from "./StateDropdown";
import CityDropdown from "./CityDropdown";

export default function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  // Fetch countries on initial render
  useEffect(() => {
    fetch("https://crio-location-selector.onrender.com/countries")
      .then((response) => response.json())
      .then((data) => setCountries(data))
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  return (
    <div>
      <CountryDropdown
        countries={countries}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
      />
      {selectedCountry && (
        <StateDropdown
          country={selectedCountry}
          selectedState={selectedState}
          setSelectedState={setSelectedState}
        />
      )}
      {selectedState && (
        <CityDropdown
          country={selectedCountry}
          state={selectedState}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
        />
      )}
      {selectedCity && (
        <div>
          <p>{`You Selected ${selectedCity}, ${selectedState}, ${selectedCountry}`}</p>
        </div>
      )}
    </div>
  );
};