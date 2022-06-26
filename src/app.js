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

function displayFahrenheit(event) {
  event.preventDefault();
  let temperatureNow = document.querySelector("#temperature");

  toCelsius.classList.remove("active");
  toFahrenheit.classList.add("active");

  let temperaureFahrenheit = (celsiusTemperature * 9) / 5 + 32;
  temperatureNow.innerHTML = Math.round(temperaureFahrenheit);
}

function displayCelsius(event) {
  event.preventDefault();
  let tempNow = document.querySelector("#temperature");

  toFahrenheit.classList.remove("active");
  toCelsius.classList.add("active");

  tempNow.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let formSearch = document.querySelector("#search-form");
formSearch.addEventListener("submit", searchCity);

let toFahrenheit = document.querySelector("#fahrenheit");
toFahrenheit.addEventListener("click", displayFahrenheit);

let toCelsius = document.querySelector("#celsius");
toCelsius.addEventListener("click", displayCelsius);

myWeather("Zaporizhia");
