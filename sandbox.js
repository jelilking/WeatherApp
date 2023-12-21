const apiKey = "2529d8af77c97e78299f746da52ff1ed";
const weatherDataEl = document.querySelector("#weather-data");
const cityInputEl = document.querySelector("#city-input");
const formEl = document.querySelector("form");
const err = "An error happened please try again later";

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const cityValue = cityInputEl.value;
  getWeatherData(cityValue);
});

async function getWeatherData(cityValue) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metrics`
    );
    if (!response.ok) {
      throw new Error("Network Response Was Not Ok");
    }

    const data = await response.json();
    console.log(data);
    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const details = [
      `Feels like: ${Math.round(data.main.feels_like)}`,
      `Humidity: ${data.main.humidity}%`,
      `Wind Speed: ${data.wind.speed} m/s`,
    ];

    weatherDataEl.querySelector(
      ".icon"
    ).innerHTML = `http://openweathermap.org/img/wn/${icon}.png`;

    weatherDataEl.querySelector(
      ".temperature"
    ).textContent = `${temperature}°C`;

    weatherDataEl.querySelector(".description").textContent = `${description}`;

    weatherDataEl.querySelector(".details").innerHTML = details
      .map((detail) => `<div>${detail}</div>`)
      .join("");
  } catch (error) {
    weatherDataEl.querySelector(".icon").innerHTML = ``;

    weatherDataEl.querySelector(".temperature").textContent = ``;

    weatherDataEl.querySelector(".description").textContent = `${err}`;

    weatherDataEl.querySelector(".details").innerHTML = "";
  }
}
