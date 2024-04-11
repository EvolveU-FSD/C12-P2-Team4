import React, { useEffect, useState } from 'react';
import "./ItineraryCard.css";

function ItineraryCard() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const apiKey = ""; // Replace "YOUR_API_KEY" with your actual API key
    const city = "Calgary";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }
        return response.json();
      })
      .then((data) => {
        const temperatureInCelsius = Math.round(data.main.temp - 273.15);
        const weatherInfo = {
          icon: data.weather[0].icon,
          temperature: temperatureInCelsius,
        };
        setWeather(weatherInfo);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }, []); // Empty dependency array means this effect runs only once, similar to window.onload

  return (
    <div id="card">
      {weather && (
        <div className="weather-info">
          <img src={`https://openweathermap.org/img/wn/${weather.icon}.png`} alt="Weather icon" />
          <p>Temperature: {weather.temperature}°C</p>
        </div>
      )}
    </div>
  );
}

export default ItineraryCard;
