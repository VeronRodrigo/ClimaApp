window.addEventListener('load', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            console.log (position)
            const { latitude, longitude } = position.coords;

            const apiKey = '8cd289075f84687c78da13bf871cbae4';

            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

            try {
                const response = await fetch(apiUrl);
                const data = await response.json();

                const location = data.name;
                const temperature = data.main.temp;
                const description = data.weather[0].description;

                document.getElementById('location').textContent = location;
                document.getElementById('temperature').textContent = temperature;
                document.getElementById('description').textContent = description;
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        });
    } else {
        console.error('La geolocalización no está disponible.');
    }
});
