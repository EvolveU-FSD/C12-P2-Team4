import React, { useEffect, useState } from "react"
import Lottie from "lottie-react"
import sunnyAnimation from "../../components/animations/sunnyAnimation - 1713559789200.json"
import snowyAnimation from "../../components/animations/snowyAnimation - 1713560177923.json"
import cloudyAnimation from "../../components/animations/cloudyAnimation - 1713560092557.json"
import rainAnimation from "../../components/animations/rainAnimation - 1713559937649.json"
import "./weather.css"

function Weather() {
  const [data, setData] = useState([])
  const [cityName, setCityName] = useState("")
  const [forecast, setForecast] = useState([])

  useEffect(() => {
    fetch("/api/itinerary")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error))

    // const YOUR_WEATHER_API_KEY = import.meta.env.VITE_APP_WEATHER_API_KEY

    const apiKey = "1ada488dc5f7b624d882cbf49f94afc8"
    const city = "Calgary"
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch weather data")
        }
        return response.json()
      })
      .then((data) => {
        setCityName(data.city.name)

        const forecastData = data.list
          .filter((item, index) => index % 8 === 0)
          .map((item) => ({
            date: new Date(item.dt * 1000).toLocaleDateString(),
            weather: item.weather[0].main,
            temperature: Math.round(item.main.temp - 273.15),
          }))
        setForecast(forecastData)
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error)
      })
  }, [])

  const renderWeatherAnimation = (weather) => {
    switch (weather) {
      case "Clear":
        return (
          <Lottie animationData={sunnyAnimation} loop duration={1000000000} />
        )
      case "Clouds":
        return (
          <Lottie animationData={cloudyAnimation} loop duration={1000000000} />
        )
      case "Rain":
        return (
          <Lottie animationData={rainAnimation} loop duration={1000000000} />
        )
      case "Snow":
        return (
          <Lottie animationData={snowyAnimation} loop duration={1000000000} />
        )
      default:
        return null
    }
  }

  return (
    <div id="card flex flex-col justify-center gap-2">
      <p className="forecast-header flex flex-row justify-center mt-2">
        5 Day Forecast of Calgary
      </p>
      <div className="forecast-container">
        {forecast.map((day, index) => (
          <div key={index} className="forecast-item mt-2 ">
            <p>{day.date}</p>
            <div className="weather-icon mt-2">
              {renderWeatherAnimation(day.weather)}
            </div>
            <p>{day.temperature}°C</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Weather
// import React, { useEffect, useState } from "react"
// // import ItineraryCard from "../ItineraryCard/ItineraryCard"

// import "./weather.css"

// export default function Weather() {
//   const [weather, setWeather] = useState(null)

//   useEffect(() => {
// const YOUR_WEATHER_API_KEY = import.meta.env.VITE_APP_WEATHER_API_KEY

// const city = "Calgary"
// const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${YOUR_WEATHER_API_KEY}`

//     fetch(url)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Failed to fetch weather data")
//         }
//         return response.json()
//       })
//       .then((data) => {
//         const temperatureInCelsius = Math.round(data.main.temp - 273.15)
//         const weatherInfo = {
//           icon: data.weather[0].icon,
//           temperature: temperatureInCelsius,
//         }
//         setWeather(weatherInfo)
//       })
//       .catch((error) => {
//         console.error("Error fetching weather data:", error)
//       })
//   }, [])

//   return (
//     <>
//       <div className="weather-container">
//         {weather && (
//           <div className="weather-info">
//             <img
//               src={`https://openweathermap.org/img/wn/${weather.icon}.png`}
//               alt="Weather icon"
//             />
//             <p>Temperature: {weather.temperature}°C</p>
//           </div>
//         )}
//       </div>
//       {/* <div className="itinerary-container">
//         <ItineraryCard />
//         <ItineraryCard />
//       </div> */}
//     </>
//   )
// }
