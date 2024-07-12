import React, { useState } from "react";
import axios from "axios"; // Import axios for making HTTP requests
import Weather from "./Weather";
import Graph from "./Graph";
import Forecast from "./Forecast"; // Import the new Forecast component
import "./Overview.css";
import MapComponent from "./MapComponent";
import { auth } from "./firebase"; // Import auth
import { useAuthState } from 'react-firebase-hooks/auth';

const Overview = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState("");
  const [coords, setCoords] = useState({ lat: 51.505, lon: -0.09 }); // Default to London
  const [cityName, setCityName] = useState("");
  const [showMap, setShowMap] = useState(false); // State to control map visibility
  const apiKey = "8fbd3b1571c73c718314a597b7502785";

  const fetchWeatherData = async () => {
    if (!city) {
      setError("Please enter a city name");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=40&appid=${apiKey}&units=metric`;

      const [weatherResponse, forecastResponse] = await Promise.all([
        axios.get(weatherUrl),
        axios.get(forecastUrl),
      ]);

      if (weatherResponse.status !== 200) {
        throw new Error("Weather data not available");
      }

      if (forecastResponse.status !== 200) {
        throw new Error("Forecast data not available");
      }

      const weatherData = weatherResponse.data;
      const forecastData = forecastResponse.data;

      setWeatherData(weatherData);
      setForecastData(forecastData);

      const { lat, lon } = weatherData.coord;
      setCoords({ lat, lon });
      setCityName(weatherData.name);
      setShowMap(true); // Show the map after fetching weather data
    } catch (error) {
      setError(error.message);
      setWeatherData(null);
      setForecastData(null);
      setShowMap(false); // Hide the map if there is an error
    } finally {
      setLoading(false);
    }
  };

  // Firebase Authentication State
  const [user] = useAuthState(auth);

  // Check if user is logged in
  if (!user) {
    return (
      <div className="overview">
        <h1>Welcome to the Weather App!</h1>
        <p>Please login or sign up to view weather details.</p>
      </div>
    );
  }

  return (
    <div className="overview">
      <h1 class="l">Weather App</h1>
      <div className="weather-search">
      
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button className="k" onClick={fetchWeatherData}>Get Weather</button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          {weatherData && <Weather weatherData={weatherData} />}
          {forecastData && <Graph forecastData={forecastData} />}
          {forecastData && <Forecast forecastData={forecastData} />}
          {showMap && (
            <div className="map-container">
              <MapComponent lat={coords.lat} lon={coords.lon} city={cityName} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Overview;
