// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';

function ItineraryCard() {
    const [weather, setWeather] = useState({ icon: '', temperature: '' });

    useEffect(() => {
        fetchWeatherData();
    }, []);

    function fetchWeatherData() {
        const apiKey = 'YOUR_OPENWEATHER_API_KEY'; // Replace 'YOUR_OPENWEATHER_API_KEY' with your actual API key
        const city = 'Calgary';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch weather data');
                }
                return response.json();
            })
            .then(data => {
                const temperatureInCelsius = Math.round(data.main.temp - 273.15);
                const weatherData = {
                    icon: data.weather[0].icon,
                    temperature: temperatureInCelsius
                };
                setWeather(weatherData);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });
    }

    return (
        <div id="dayCard">
            <h2>Itinerary Card</h2>
            {weather.icon && (
                <img src={`https://openweathermap.org/img/wn/${weather.icon}.png`} alt="Weather Icon" />
            )}
            {weather.temperature && <p>Temperature: {weather.temperature}°C</p>}
        </div>
    );
}

export default ItineraryCard;
