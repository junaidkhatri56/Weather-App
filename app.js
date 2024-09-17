const result = document.querySelector(".weatherInfo");
const searchInp = document.querySelector(".searchInp");
const searchBtn = document.querySelector(".searchBtn");

document.querySelector(".weatherInfo").style.display = "none";

function callWeather(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=bf6a9c3f2567c81c0a09b5701777d25f&units=metric`)
    .then(res => res.json())
    .then(res => {
        if (res.cod === "404") {
            result.innerHTML = "Invalid City Name! Please correct it, Thanks...";
            result.style.display = "block";
            result.style.color = "red";
        } else {
            const weatherIcon = {
                'Clear': '☀️',
                'Clouds': '☁️',
                'Rain': '🌧️',
                'Snow': '❄️',
                'Drizzle': '🌦️',
                'Thunderstorm': '⛈️',
                'Mist': '🌫️',
                'Smoke': '💨',
                'Haze': '🌫️',
                'Fog': '🌁',
                'Dust': '🌬️'
            };

            result.innerHTML = `
                <div id="city-name">${res.name}</div>
                <div id="weather-icon">${weatherIcon[res.weather[0].main] || '🌤️'}</div>
                <div id="weather-desc">${res.weather[0].description}</div>
                <div id="temp">🌡️ ${Math.round(res.main.temp)}°C</div>
                <div id="humidity">💧 Humidity: ${res.main.humidity}%</div>
                <div id="wind">🌬️ Wind: ${res.wind.speed} km/h</div>
            `;

            result.style.display = "block";
            result.style.color = "#fff";
        }
    })
    .catch((err) => {
        result.innerHTML = "An error occurred while fetching the weather data.";
    });
}

searchBtn.addEventListener("click", () => {
    callWeather(searchInp.value);
});
