const apiKey = "RRAWrWooKPMKLEztkp8ktyk3eq5rkuOF"; // Your Tomorrow.io API key
const weatherSection = document.getElementById("weather-section");
const cityInput = document.getElementById("city-input");
const getWeatherBtn = document.getElementById("get-weather-btn");

// Function to directly use coordinates or city name
async function fetchWeather(location) {
  // API URL using the provided format
  const url = `https://api.tomorrow.io/v4/weather/forecast?location=${location}&apikey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Check if data is available and contains weather info
    if (data && data.data) {
      // Assuming data comes in a similar format to the provided example
      displayWeather(data.data.timelines.hourly[0].values);
    } else {
      weatherSection.innerHTML =
        "<p>Location not found or invalid input. Please try again.</p>";
      weatherSection.style.display = "block";
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
    weatherSection.innerHTML =
      "<p>Error fetching weather. Please try again later.</p>";
    weatherSection.style.display = "block";
  }
}

// Display weather data and outfit recommendation
function displayWeather(values) {
  const temp = values.temperature;
  const condition = values.weatherCode;

  let outfitRecommendation = getOutfitRecommendation(temp, condition);

  weatherSection.innerHTML = `
        <p>The current temperature is <strong>${temp}°C</strong> with <strong>${getWeatherConditionName(
    condition
  )}</strong>.</p>
        <p class="outfit-recommendation">${outfitRecommendation}</p>
    `;
  weatherSection.style.display = "block";
}

// Get outfit recommendation based on temperature
function getOutfitRecommendation(temp, condition) {
  if (temp < 10) {
    return "It's quite cold! Wear a warm coat, scarf, and gloves.";
  } else if (temp >= 10 && temp < 20) {
    return "It's a bit chilly. A light jacket and pants should be good.";
  } else if (temp >= 20 && temp < 30) {
    return "The weather is warm! A t-shirt and jeans or a dress will be perfect.";
  } else {
    return "It's hot outside! Stay cool with shorts and a light top.";
  }
}

// Convert weather code to a readable condition
function getWeatherConditionName(code) {
  switch (code) {
    case 1000:
      return "Clear";
    case 1100:
      return "Mostly Clear";
    case 1101:
      return "Partly Cloudy";
    case 1102:
      return "Mostly Cloudy";
    case 2000:
      return "Foggy";
    case 4000:
      return "Drizzle";
    case 4200:
      return "Light Rain";
    case 4001:
      return "Rain";
    case 5000:
      return "Snow";
    default:
      return "Unknown";
  }
}

// Event listener for the button
getWeatherBtn.addEventListener("click", () => {
  const location = cityInput.value.trim(); // Expecting a latitude and longitude input, e.g., "42.3478,-71.0466"
  if (location) {
    fetchWeather(location);
  }
});
