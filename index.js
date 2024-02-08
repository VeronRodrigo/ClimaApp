window.addEventListener('load', () => {

            function getWeatherByLocation(latitude, longitude) {
                const apiKey = '8cd289075f84687c78da13bf871cbae4';
                const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=es&appid=${apiKey}`;
        
                fetchWeather(apiUrl);
            }
            
            
            function getWeatherByCity(city) {
                const apiKey = '457a2f1677b4f3cbce0df2e12aa31d1b'; 
                const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=es&appid=${apiKey}`;
            
                fetchWeather(apiUrl);

            }

            loadSearchHistory();


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


        function loadSearchHistory() {
            const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
            const historyList = document.getElementById('search-history');
            
            historyList.innerHTML = ''; 
            
            searchHistory.forEach(info => {
                const listItem = document.createElement('li');
                listItem.textContent = info.city + " " + info.temperature + " °C";
                historyList.appendChild(listItem);
            });
    }

        function saveToSearchHistory(info) {
            let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
            if (!searchHistory.find(object => object.city === info.city)) {
                searchHistory.push(info);
                localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
                loadSearchHistory();
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

    document.getElementById('buscar-btn').addEventListener('click', () => {
        searchWeather();
    });

    document.getElementById('ciudad-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchWeather();
        }
    });

    function searchWeather() {
        const city = document.getElementById('ciudad-input').value.trim();
        const temperature = document.getElementById('temperature').innerHTML.trim();
        if (city !== '' && temperature !== "") {
            getWeatherByCity(city);
            saveToSearchHistory({city, temperature});
        } else {
            alert('Por favor, ingrese el nombre de una ciudad.');
        }
    }
});