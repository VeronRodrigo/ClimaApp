window.addEventListener('load', () => {
            function getWeatherByLocation(latitude, longitude) {
                const apiKey = '8cd289075f84687c78da13bf871cbae4';
                const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=es&appid=${apiKey}`;
        
                fetchWeather(apiUrl);
            }
            
            //Buscador
            
            function getWeatherByCity(city) {
                const apiKey = '457a2f1677b4f3cbce0df2e12aa31d1b'; 
                const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=es&appid=${apiKey}`;
            
                fetchWeather(apiUrl);
            }
            async function fetchWeather(apiUrl) {
                try {
                    const response = await fetch(apiUrl);
                    const data = await response.json();

                    const location = data.name;
                    const temperature = data.main.temp;
                    const description = data.weather[0].description;
                    const min = data.main.temp_min;
                    const max = data.main.temp_max;

                    const icon = data.weather[0].icon;
                    const iconUrl = `http://openweathermap.org/img/wn/${icon}.png`;
                
        
                    document.getElementById('icon').src = iconUrl;
                    document.getElementById('location').textContent = location;
                    document.getElementById('temperature').textContent = temperature;
                    document.getElementById('description').textContent = description;
                    document.getElementById('min').textContent = min;
                    document.getElementById('max').textContent = max;
                } catch (error) {
                    console.error('Error fetching weather data:', error);
                }
            }
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    const {latitude, longitude} = position.coords;
                    getWeatherByLocation (latitude, longitude);
                });
            } else {
                showError ('La ubicacion no esta disponible');
                return;
            }

            document.getElementById('buscar-btn').addEventListener('click', () =>{
                const city = document.getElementById('ciudad-input').value.trim();
                if (city !== ''){
                    getWeatherByCity(city);
                } else {
                    showError ('Ingrese el nombre de una ciudad.');
                    return;
                }
            });
        });