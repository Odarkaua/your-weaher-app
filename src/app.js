function formatDate(timestamp) {
  //calculate the date
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  let week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Sunday",
    "Friday",
    "Saturday",
  ];
  let weekDay = week[date.getDay()];

  return `${weekDay} ${hours}:${minutes}`;
}

function formatDayFromNumbers(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Sunday",
    "Friday",
    "Saturday",
  ];

  return week[day];
}

// set weather
function cityWeather(response) {
  let currentTemerature = document.querySelector("#degree");
  let currentCity = document.querySelector("#current-city");
  currentTemerature.innerHTML = Math.round(response.data.main.temp);
  currentCity.innerHTML = response.data.name;
}

// forecast for 5 days

function getForecast(coordinates) {
  let apiKey = "b92d2cf75492770cfbea71584322a36b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

function showForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class = "row">`;
  let forecast = response.data.daily;

  console.log(response.data.daily);

  forecast.forEach(function (daysForecast, index) {
    if (index < 5) {
      let celsiusTemperatureMax = Math.round(daysForecast.temp.max);
      let celsiusTemperatureMin = Math.round(daysForecast.temp.min);

      forecastHTML += `    <div class="col-2">
            <div class="forecast-day">${formatDayFromNumbers(
              daysForecast.dt
            )}</div>
            <img
              src="http://openweathermap.org/img/wn/${
                daysForecast.weather[0].icon
              }@2x.png"
              alt="the weather icon"
              width = "64"
            />
            <div class="weather-forecast-temperature">
              <span class="max-temperature" id = "#temperature-max">${celsiusTemperatureMax}°</span>
              <span class="min-temperature" id = "#temperature-max">${celsiusTemperatureMin}°</span>
            </div>
          </div>  
          `;
    }
  });

  forecastHTML += `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//find place
function handlePosition(position) {
  let keyApi = "b92d2cf75492770cfbea71584322a36b";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let findPlace = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${keyApi}&units=metric`;
  axios.get(findPlace).then(showForecast);

  let cityName = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${keyApi}&units=metric`;
  axios.get(cityName).then(dailyTemperature);
}

function myPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

// weather at the moment

function dailyTemperature(response) {
  let temperatureToday = document.querySelector("#temperature");
  let cityNow = document.querySelector("#city");
  let skyNow = document.querySelector("#sky");
  let windNow = document.querySelector("#wind");
  let humidityNow = document.querySelector("#humidity");
  let dateNow = document.querySelector("#date");
  let iconNow = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  temperatureToday.innerHTML = Math.round(response.data.main.temp);
  cityNow.innerHTML = response.data.name;
  skyNow.innerHTML = response.data.weather[0].main;
  windNow.innerHTML = Math.round(response.data.wind.speed);
  humidityNow.innerHTML = response.data.main.humidity;
  dateNow.innerHTML = formatDate(response.data.dt * 1000);
  iconNow.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconNow.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function myWeather(cityName) {
  let apiKey = "b92d2cf75492770cfbea71584322a36b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(dailyTemperature);
}

function searchCity(event) {
  event.preventDefault();
  let searchCityNow = document.querySelector("#city-input");
  myWeather(searchCityNow.value);
}

// switch degrees

/*function displayFahrenheit(event) {
  event.preventDefault();
  let temperatureNow = document.querySelector("#temperature");
  let temperatureMax = document.querySelector("#temperature-max");
  let temperatureMin = document.querySelector("#temperature-min");

  toCelsius.classList.remove("active");
  toFahrenheit.classList.add("active");

  let temperaureFahrenheit = (celsiusTemperature * 9) / 5 + 32;
  let temperaureFahrenheitMax = (celsiusTemperatureMax * 9) / 5 + 32;
  let temperaureFahrenheitMin = (celsiusTemperatureMin * 9) / 5 + 32;

  temperatureNow.innerHTML = Math.round(temperaureFahrenheit);
  temperatureMax.innerHTML = Math.round(temperaureFahrenheitMax);
  temperatureMin.innerHTML = Math.round(temperaureFahrenheitMin);
}

function displayCelsius(event) {
  event.preventDefault();
  let tempNow = document.querySelector("#temperature");
  let tempMax = document.querySelector("#temperature-max");
  let tempMin = document.querySelector("#temperature-min");

  toFahrenheit.classList.remove("active");
  toCelsius.classList.add("active");

  tempNow.innerHTML = Math.round(celsiusTemperature);
  tempMax.innerHTML = Math.round(celsiusTemperatureMax);
  tempMin.innerHTML = Math.round(celsiusTemperatureMin);
}

let celsiusTemperature = null;
let celsiusTemperatureMax = null;
let celsiusTemperatureMin = null;

let toFahrenheit = document.querySelector("#fahrenheit");
toFahrenheit.addEventListener("click", displayFahrenheit);

let toCelsius = document.querySelector("#celsius");
toCelsius.addEventListener("click", displayCelsius);
*/

myWeather("Zaporizhia");

let formSearch = document.querySelector("#search-form");
formSearch.addEventListener("submit", searchCity);

// Find my place
let findMe = document.querySelector("#find-my-place");
findMe.addEventListener("click", myPosition);
