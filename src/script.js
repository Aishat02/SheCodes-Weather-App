function displayResponse(response) {
  let displayInput = document.querySelector("#city");
  let temperature = document.querySelector("#temperature-number");
  let windSpeed = document.querySelector("#wind-speed");
  let description = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let date = new Date(response.data.time * 1000);
  let dateElement = document.querySelector("#date");
  let icon = document.querySelector("#icon");

  displayInput.innerHTML = response.data.city;
  temperature.innerHTML = Math.round(response.data.temperature.current);
  windSpeed.innerHTML = `${response.data.wind.speed}km/h`;
  description.innerHTML = response.data.condition.description;
  humidity.innerHTML = `${response.data.temperature.humidity}%`;
  dateElement.innerHTML = formatDate(date);
  icon.innerHTML = `<img src="${response.data.condition.icon_url}" alt="${response.data.condition.icon}" class="icon" />`;
}
function formatDate(date) {
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];

  return `${day} ${hour}:${minutes}`;
}
function displayForecast() {
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastData = "";

  days.forEach(function (day) {
    forecastData =
      forecastData +
      `
      <div class="forecast-day">
        <div class="forecast-date">${day}</div>
        <div class="forecast-icon">🌦️</div>
        <div class="forecast-temperatures">
          <div class="forecast-temperature">
            <strong>15º</strong>
          </div>
          <div class="forecast-temperature">9º</div>
        </div>
      </div>
    `;
  });

  let forecast = document.querySelector("#forecast");
  forecast.innerHTML = forecastData;
}

function apiIntegration(city) {
  let apiKey = "904a433ef2bc43b3a3fab6dt34359of5";
  let weatherApi = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(weatherApi).then(displayResponse);
}
function weather(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");

  apiIntegration(searchInput.value);
}
let searchButton = document.querySelector("#search-engine");
searchButton.addEventListener("submit", weather);

apiIntegration("Abuja");
displayForecast();
