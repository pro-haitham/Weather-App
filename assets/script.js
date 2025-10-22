// script.js - Fixed version
class WeatherApp {
    constructor() {
        this.baseUrl = 'https://api.open-meteo.com/v1';
        this.geocodingUrl = 'https://geocoding-api.open-meteo.com/v1';
        
        this.searchInput = document.getElementById('search-input');
        this.searchBtn = document.getElementById('search-btn');
        this.locationBtn = document.getElementById('location-btn');
        
        this.initializeEventListeners();
        this.loadDefaultWeather();
    }
    
    initializeEventListeners() {
        this.searchBtn.addEventListener('click', () => {
            this.searchWeather();
        });
        
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.searchWeather();
            }
        });
        
        this.locationBtn.addEventListener('click', () => {
            this.getLocationWeather();
        });
    }
    
    async searchWeather() {
        const city = this.searchInput.value.trim();
        if (!city) {
            this.showError('Please enter a city name');
            return;
        }
        
        this.showLoading();
        try {
            const weatherData = await this.fetchWeatherData(city);
            this.displayWeather(weatherData);
        } catch (error) {
            this.showError('City not found. Please try again.');
            console.error('Error fetching weather data:', error);
        }
    }
    
    async fetchWeatherData(city) {
        // First, get coordinates for the city
        const geoResponse = await fetch(
            `${this.geocodingUrl}/search?name=${city}&count=1`
        );
        const geoData = await geoResponse.json();
        
        if (!geoData.results || geoData.results.length === 0) {
            throw new Error('City not found');
        }
        
        const { latitude, longitude, name, country, admin1 } = geoData.results[0];
        
        // Get weather data using coordinates
        const weatherResponse = await fetch(
            `${this.baseUrl}/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,pressure_msl,wind_speed_10m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`
        );
        const weatherData = await weatherResponse.json();
        
        return {
            name: name,
            country: country,
            region: admin1,
            coordinates: { lat: latitude, lon: longitude },
            current: weatherData.current,
            daily: weatherData.daily
        };
    }
    
    displayWeather(data) {
        document.getElementById('city-name').textContent = `${data.name}, ${data.country}`;
        document.getElementById('current-temp').textContent = Math.round(data.current.temperature_2m);
        document.getElementById('weather-description').textContent = this.getWeatherDescription(data.current.weather_code);
        document.getElementById('feels-like').textContent = `${Math.round(data.current.apparent_temperature)}°C`;
        document.getElementById('humidity').textContent = `${data.current.relative_humidity_2m}%`;
        document.getElementById('wind-speed').textContent = `${data.current.wind_speed_10m} km/h`;
        document.getElementById('pressure').textContent = `${Math.round(data.current.pressure_msl)} hPa`;
        
        // Set weather icon using emoji
        const iconEmoji = this.getWeatherIcon(data.current.weather_code);
        const weatherIcon = document.getElementById('weather-icon');
        weatherIcon.textContent = iconEmoji;
        weatherIcon.setAttribute('aria-label', this.getWeatherDescription(data.current.weather_code));
        
        // Display forecast
        this.displayForecast(data.daily);
        
        this.hideLoading();
    }
    
    displayForecast(dailyData) {
        const forecastContainer = document.getElementById('forecast-container');
        forecastContainer.innerHTML = '';
        
        // Show next 5 days
        for (let i = 0; i < 5; i++) {
            const date = new Date(dailyData.time[i]);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
            const monthDay = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            
            const forecastElement = document.createElement('div');
            forecastElement.className = 'forecast-day';
            
            const forecastIcon = this.getWeatherIcon(dailyData.weather_code[i]);
            const forecastDescription = this.getWeatherDescription(dailyData.weather_code[i]);
            
            forecastElement.innerHTML = `
                <div class="forecast-date">
                    <div>${dayName}</div>
                    <div>${monthDay}</div>
                </div>
                <div class="forecast-icon" aria-label="${forecastDescription}">
                    ${forecastIcon}
                </div>
                <div class="forecast-temp">
                    ${Math.round(dailyData.temperature_2m_max[i])}°C
                </div>
                <div class="forecast-description">
                    ${forecastDescription}
                </div>
            `;
            
            forecastContainer.appendChild(forecastElement);
        }
    }
    
    getWeatherDescription(weatherCode) {
        const weatherCodes = {
            0: 'Clear sky',
            1: 'Mainly clear',
            2: 'Partly cloudy',
            3: 'Overcast',
            45: 'Fog',
            48: 'Fog',
            51: 'Light drizzle',
            53: 'Moderate drizzle',
            55: 'Dense drizzle',
            61: 'Light rain',
            63: 'Moderate rain',
            65: 'Heavy rain',
            80: 'Light showers',
            81: 'Moderate showers',
            82: 'Heavy showers',
            95: 'Thunderstorm',
            96: 'Thunderstorm with hail',
            99: 'Thunderstorm with hail'
        };
        return weatherCodes[weatherCode] || 'Unknown';
    }
    
    getWeatherIcon(weatherCode) {
        // Return emoji icons
        if (weatherCode === 0) return '☀️'; // Clear sky
        if (weatherCode <= 2) return '⛅'; // Mainly clear to partly cloudy
        if (weatherCode === 3) return '☁️'; // Overcast
        if (weatherCode <= 48) return '🌫️'; // Fog
        if (weatherCode <= 55) return '🌦️'; // Drizzle
        if (weatherCode <= 65) return '🌧️'; // Rain
        if (weatherCode <= 82) return '💦'; // Showers
        if (weatherCode >= 95) return '⛈️'; // Thunderstorm
        return '🌈'; // Default
    }
    
    getLocationWeather() {
        if (!navigator.geolocation) {
            this.showError('Geolocation is not supported by your browser');
            return;
        }
        
        this.showLoading();
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    // Get city name from coordinates
                    const geoResponse = await fetch(
                        `${this.geocodingUrl}/search?latitude=${latitude}&longitude=${longitude}&count=1`
                    );
                    const geoData = await geoResponse.json();
                    
                    if (geoData.results && geoData.results.length > 0) {
                        this.searchInput.value = geoData.results[0].name;
                        this.searchWeather();
                    } else {
                        const weatherResponse = await fetch(
                            `${this.baseUrl}/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,pressure_msl,wind_speed_10m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`
                        );
                        const weatherData = await weatherResponse.json();
                        
                        const customData = {
                            name: 'Your Location',
                            country: '',
                            current: weatherData.current,
                            daily: weatherData.daily
                        };
                        this.displayWeather(customData);
                    }
                } catch (error) {
                    this.showError('Failed to get weather data for your location');
                    console.error('Error fetching location weather:', error);
                }
            },
            (error) => {
                this.showError('Unable to retrieve your location');
                console.error('Geolocation error:', error);
            }
        );
    }
    
    async loadDefaultWeather() {
        try {
            const weatherData = await this.fetchWeatherData('London');
            this.displayWeather(weatherData);
        } catch (error) {
            console.error('Error loading default weather:', error);
        }
    }
    
    showLoading() {
        const main = document.querySelector('main');
        main.style.opacity = '0.7';
    }
    
    hideLoading() {
        const main = document.querySelector('main');
        main.style.opacity = '1';
    }
    
    showError(message) {
        const existingError = document.querySelector('.error');
        if (existingError) {
            existingError.remove();
        }
        
        const errorElement = document.createElement('div');
        errorElement.className = 'error';
        errorElement.textContent = message;
        
        document.querySelector('main').prepend(errorElement);
        
        setTimeout(() => {
            errorElement.remove();
        }, 5000);
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    new WeatherApp();
});