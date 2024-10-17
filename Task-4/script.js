const apiKey = 'your_openweathermap_api_key'; // Replace with your API key
const apiUrl = 'https://api.openweathermap.org/data/2.5/';

const currentWeatherDiv = document.getElementById('current-weather-details');
const forecastChartCtx = document.getElementById('forecast-chart').getContext('2d');
let forecastChart;

// Fetch and display weather based on city
async function getWeatherData(location) {
    try {
        const currentWeatherResponse = await fetch(`${apiUrl}weather?q=${location}&units=metric&appid=${apiKey}`);
        const currentWeather = await currentWeatherResponse.json();
        displayCurrentWeather(currentWeather);

        const forecastResponse = await fetch(`${apiUrl}forecast?q=${location}&units=metric&appid=${apiKey}`);
        const forecastData = await forecastResponse.json();
        displayForecast(forecastData);
    } catch (error) {
        alert('Error retrieving weather data');
    }
}

// Display current weather
function displayCurrentWeather(data) {
    const temperature = `${Math.round(data.main.temp)}°C`;
    const details = `
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
        <p><strong>Pressure:</strong> ${data.main.pressure} hPa</p>
        <p><strong>Description:</strong> ${data.weather[0].description}</p>
    `;
    currentWeatherDiv.querySelector('.temperature').innerHTML = temperature;
    currentWeatherDiv.querySelector('.details').innerHTML = details;
}

// Display 5-day forecast
function displayForecast(data) {
    const labels = data.list.filter((_, index) => index % 8 === 0).map(item => {
        return new Date(item.dt * 1000).toLocaleDateString();
    });

    const temperatures = data.list.filter((_, index) => index % 8 === 0).map(item => item.main.temp);

    if (forecastChart) forecastChart.destroy();

    forecastChart = new Chart(forecastChartCtx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Temperature (°C)',
                data: temperatures,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
}

// Search event
document.getElementById('search-btn').addEventListener('click', () => {
    const location = document.getElementById('location-input').value;
    if (location) {
        getWeatherData(location);
    } else {
        alert('Please enter a location');
    }
});

// Geolocation event
document.getElementById('geolocation-btn').addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            const response = await fetch(`${apiUrl}weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`);
            const data = await response.json();
            getWeatherData(data.name);
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
});
