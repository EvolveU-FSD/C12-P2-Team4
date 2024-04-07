// Function to create the itinerary card dynamically
function createItineraryCard() {
    const dayCard = document.createElement("div");
    dayCard.id = "dayCard";
    dayCard.innerHTML = "Itinerary Card"; // Set initial text content
    // Append the card to the body or any desired parent element
    document.body.appendChild(dayCard);
    console.log("Itinerary card created:", dayCard);
}

// Call the function to create the itinerary card
createItineraryCard();

// Fetch current weather data from OpenWeather API

function fetchWeatherData() {
    const apiKey = '1ada488dc5f7b624d882cbf49f94afc8';
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
            const temperatureInCelsius = Math.round(data.main.temp - 273.15); // Convert temperature to Celsius and round
            const weather = {
                icon: data.weather[0].icon,
                temperature: temperatureInCelsius
            };
            updateWeatherInfo(weather.icon, weather.temperature);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}


// Fetch weather data and update day card when the page loads

function updateWeatherInfo(iconCode, temperature) {
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
    const weatherIcon = document.createElement("img");
    weatherIcon.src = iconUrl;

    const weatherTemp = document.createElement("p");
    weatherTemp.textContent = `Temperature: ${temperature}°C`;

    const dayCard = document.getElementById('dayCard');
    dayCard.innerHTML = ''; // Clear previous content
    dayCard.appendChild(weatherIcon);
    dayCard.appendChild(weatherTemp);
}
window.onload = function () {
    fetchWeatherData();
};
