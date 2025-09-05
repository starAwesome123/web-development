
        const apiKeyInput = document.getElementById("apiKeyInput");
        const myInput = document.getElementById("myInput");
        const getWeatherBtn = document.getElementById("getWeather");
        const weatherDisplay = document.getElementById("weatherDisplay");
        const message = document.getElementById("message");

        function fetchWeather() {
            const API_KEY = apiKeyInput.value.trim();
            const city = myInput.value.trim();

            if (API_KEY === "") {
                message.innerHTML = `<span class="text-red-600">Please enter a valid API key.</span>`;
                return;
            }
            if (city === "") {
                message.innerHTML = `<span class="text-red-600">Please enter a city name.</span>`;
                return;
            }

            // Clear previous results and show loading message
            weatherDisplay.innerHTML = '';
            message.textContent = 'Loading weather data...';
            
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

            axios.get(url)
                .then(response => {
                    const data = response.data;
                    displayWeather(data);
                    message.textContent = '';
                })
                .catch(error => {
                    console.error("Error fetching weather:", error);
                    let errorMessage = 'Could not retrieve weather data. Please check your city name and API key.';
                    if (error.response && error.response.data && error.response.data.message) {
                        errorMessage = error.response.data.message;
                    }
                    displayError(errorMessage);
                });
        }

        function displayWeather(data) {
            const weather = data.weather[0];
            const weatherInfo = getWeatherIconAndColor(weather.id);

            weatherDisplay.innerHTML = `
                <div class="text-4xl font-bold text-gray-800">${data.main.temp.toFixed(1)}°C</div>
                <div class="text-xl font-semibold text-gray-600 mt-2">${data.name}, ${data.sys.country}</div>
                <div class="text-lg text-gray-500">${weather.description}</div>
                <div class="text-7xl mt-4">
                    <i class="fas ${weatherInfo.iconClass} ${weatherInfo.iconColor}"></i>
                </div>
            `;
        }

        function displayError(msg) {
            weatherDisplay.innerHTML = '';
            message.innerHTML = `<span class="text-red-600">${msg}</span>`;
        }

        function getWeatherIconAndColor(weatherId) {
            if (weatherId >= 200 && weatherId < 300) return { iconClass: 'fa-cloud-bolt', iconColor: 'text-gray-700' };
            if (weatherId >= 300 && weatherId < 400) return { iconClass: 'fa-cloud-drizzle', iconColor: 'text-blue-400' };
            if (weatherId >= 500 && weatherId < 600) return { iconClass: 'fa-cloud-showers-heavy', iconColor: 'text-blue-600' };
            if (weatherId >= 600 && weatherId < 700) return { iconClass: 'fa-snowflake', iconColor: 'text-blue-300' };
            if (weatherId >= 700 && weatherId < 800) return { iconClass: 'fa-smog', iconColor: 'text-gray-500' };
            if (weatherId === 800) return { iconClass: 'fa-sun', iconColor: 'text-yellow-500' };
            if (weatherId > 800) return { iconClass: 'fa-cloud', iconColor: 'text-gray-400' };
            return { iconClass: 'fa-question', iconColor: 'text-gray-500' };
        }

        getWeatherBtn.addEventListener("click", fetchWeather);
        myInput.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                fetchWeather();
            }
        });