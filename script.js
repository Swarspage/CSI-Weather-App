let URL = "https://api.openweathermap.org/data/2.5/weather?";

let apiKey = "b46933bc93b4aa6ec03386c873f64178";
let searchBtn = document.querySelector(".search-bar button");
let cityName = document.querySelector(".city>h1");
let inputCity = document.querySelector(".search-bar input");
let cityTemp = document.querySelector(".temp");
let humidity = document.querySelector(".humid");
let windSpeed = document.querySelector(".speed");
let windDirection = document.querySelector(".direction");
let container = document.querySelector(".container");

async function getData(city) {
  const response = await fetch(URL + `q=${city}&appid=${apiKey}&units=metric`);
  let data = await response.json();
  return {
    tempMax: data.main.temp_max,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    windDeg: data.wind.deg,
    weather: data.weather[0].main,
  };
}
inputCity.addEventListener("keypress", async (event) => {
  if (event.key === "Enter") {
    let city = inputCity.value.trim();
    if (!city) return;
    let data = await getData(city);
    cityName.innerText = city;
    cityTemp.innerText = data.tempMax + "°C";
    humidity.innerText = data.humidity + "%";
    windSpeed.innerText = data.windSpeed + " km/h";
    windDirection.innerText = data.windDeg + "°";
    container.className = "container";
    switch (data.weather) {
      case "Clouds":
        container.classList.add("clouds");
        break;
      case "Clear":
        container.classList.add("clear");
        break;
      case "Rain":
        container.classList.add("rain");
        break;
      case "Snow":
        container.classList.add("snow");
        break;
      default:
        container.classList.add("default-weather");
    }
  }
});
