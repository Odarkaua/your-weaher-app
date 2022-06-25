function formatDate(timestamp) {
  //calculate the date
  let date = new Date(timestamp);
  console.log(date);
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
  console.log(response.data);
  let temperatureToday = document.querySelector("#temperature");
  let cityNow = document.querySelector("#city");
  let skyNow = document.querySelector("#sky");
  let windNow = document.querySelector("#wind");
  let humidityNow = document.querySelector("#humidity");
  let dateNow = document.querySelector("#date");
  let iconNow = document.querySelector("#icon");

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

let apiKey = "b92d2cf75492770cfbea71584322a36b";
let cityName = "London";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

console.log(apiUrl);
axios.get(apiUrl).then(dailyTemperature);
