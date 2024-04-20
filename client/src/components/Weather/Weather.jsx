import React, { useEffect, useState } from "react"
// import ItineraryCard from "../ItineraryCard/ItineraryCard"

import "./weather.css"

export default function Weather() {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const YOUR_WEATHER_API_KEY = import.meta.env.VITE_APP_WEATHER_API_KEY

    const city = "Calgary"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${YOUR_WEATHER_API_KEY}`

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch weather data")
        }
        return response.json()
      })
      .then((data) => {
        const temperatureInCelsius = Math.round(data.main.temp - 273.15)
        const weatherInfo = {
          icon: data.weather[0].icon,
          temperature: temperatureInCelsius,
        }
        setWeather(weatherInfo)
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error)
      })
  }, [])

  return (
    <>
      <div className="weather-container">
        {weather && (
          <div className="weather-info">
            <img
              src={`https://openweathermap.org/img/wn/${weather.icon}.png`}
              alt="Weather icon"
            />
            <p>Temperature: {weather.temperature}°C</p>
          </div>
        )}
      </div>
      {/* <div className="itinerary-container">
        <ItineraryCard />
        <ItineraryCard />
      </div> */}
    </>
  )
}
