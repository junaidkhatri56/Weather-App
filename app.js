const result = document.querySelector(".weatherInfo");
const searchInp = document.querySelector(".searchInp");
const searchBtn = document.querySelector(".searchBtn");

// Initially hide the weather info container
document.querySelector(".weatherInfo").style.display = "none";

function callWeather(city){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=bf6a9c3f2567c81c0a09b5701777d25f&units=metric`)
    .then(res => res.json())
    .then(res => {
        if (res.cod === "404") {
            // If the city is not found, display the error message
            result.innerHTML = "Invalid City Name! Please correct it, Thanks...";
            document.querySelector(".weatherInfo").style.display = "block";
            document.querySelector(".weatherInfo").style.color = "red";
        } else {
            // If city is found, display the weather data
            result.innerHTML = ""; // Clear the div

            result.innerHTML += `
                <h1>${res.name}</h1>
                <p>Weather: ${res.weather[0].description}</p>
                <p>Temperature: ${Math.round(res.main.temp)}°C</p>
                <p>Humidity: ${res.main.humidity}%</p>
                <p>Wind: ${res.wind.speed} km/h</p>
            `;

            // Show the weather info once data is loaded
            document.querySelector(".weatherInfo").style.display = "block";
            document.querySelector(".weatherInfo").style.color = "#fff";
        }
    })
    .catch((err) => {
        result.innerHTML = "An error occurred while fetching the weather data.";
    });
}

searchBtn.addEventListener("click", () => {
    callWeather(searchInp.value);
});
