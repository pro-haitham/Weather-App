Weather Forecast App
A clean, responsive weather application that provides current weather conditions and 5-day forecasts for any city worldwide. Built with vanilla JavaScript and the Open-Meteo API.

https://img.shields.io/badge/Weather-App-blue
https://img.shields.io/badge/JavaScript-ES6+-yellow
https://img.shields.io/badge/API-Open--Meteo-green

🌟 Features
Current Weather Data: Temperature, humidity, wind speed, pressure, and "feels like" temperature

5-Day Forecast: Daily weather predictions with icons and descriptions

Location-Based Weather: Get weather for your current location using geolocation

City Search: Search for weather in any city worldwide

Responsive Design: Works perfectly on desktop and mobile devices

No API Key Required: Uses free Open-Meteo API

Clean UI: Modern, intuitive interface with weather emojis

📸 Screenshots
https://screenshot.png

🛠️ Installation
Prerequisites
A modern web browser with JavaScript enabled

Local web server (optional, for local development)

Local Setup
Clone the repository

bash
git clone https://github.com/yourusername/weather-app.git
cd weather-app
Set up the project structure

text
weather-app/
├── index.html
├── assets/
│   ├── style.css
│   └── script.js
└── README.md
Run the application

Option 1: Open index.html directly in your browser

Option 2: Use a local server:

bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server

# Using PHP
php -S localhost:8000
Access the app

Navigate to http://localhost:8000 (if using local server)

Or open index.html directly in your browser

📁 Project Structure
text
weather-app/
├── index.html          # Main HTML structure
├── assets/
│   ├── style.css       # CSS styles and responsive design
│   └── script.js       # JavaScript functionality and API calls
└── README.md          # Project documentation
🎯 Usage
Searching for Weather
Enter a city name in the search input (e.g., "London", "Tokyo", "New York")

Click the "Search" button or press Enter

View current weather and 5-day forecast

Using Your Location
Click the "Use My Location" button

Allow location access when prompted

The app will automatically display weather for your current location

Understanding the Display
Current Weather: Shows temperature, conditions, and detailed metrics

5-Day Forecast: Displays daily high temperatures and weather conditions

Weather Icons: Emoji-based icons representing different weather conditions

🔧 Technical Details
APIs Used
Open-Meteo Weather API: Free weather data without API key requirements

Open-Meteo Geocoding API: Converts city names to coordinates

Browser Geolocation API: Gets user's current location

Key JavaScript Components
WeatherApp Class
The main application class that handles all functionality:

javascript
class WeatherApp {
    constructor() {
        // API endpoints and DOM elements initialization
        this.baseUrl = 'https://api.open-meteo.com/v1';
        this.geocodingUrl = 'https://geocoding-api.open-meteo.com/v1';
        // ... element references and initialization
    }
}
Core Methods
fetchWeatherData(city): Fetches weather data for a given city

displayWeather(data): Renders weather information to the UI

getLocationWeather(): Handles geolocation-based weather

displayForecast(dailyData): Shows 5-day forecast

Weather Code Mapping
The app uses WMO weather codes from the Open-Meteo API:

Code Range	Description	Icon
0	Clear sky	☀️
1-2	Partly cloudy	⛅
3	Overcast	☁️
45-48	Fog	🌫️
51-55	Drizzle	🌦️
61-65	Rain	🌧️
80-82	Showers	💦
95-99	Thunderstorm	⛈️
🌐 API Endpoints
Geocoding API
text
GET https://geocoding-api.open-meteo.com/v1/search?name={city}&count=1
Returns coordinates and location data for city names.

Weather API
text
GET https://api.open-meteo.com/v1/forecast?
  latitude={lat}&longitude={lon}&
  current=temperature_2m,relative_humidity_2m,apparent_temperature,pressure_msl,wind_speed_10m,weather_code&
  daily=weather_code,temperature_2m_max,temperature_2m_min&
  timezone=auto
Returns current weather and forecast data.

🎨 Customization
Styling
Modify assets/style.css to customize:

Color scheme (update CSS variables)

Layout and spacing

Font families and sizes

Responsive breakpoints

Features
Extend assets/script.js to add:

Temperature unit toggle (Celsius/Fahrenheit)

Additional weather metrics

Different icon sets

Weather alerts or notifications

🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

Fork the project

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request

🐛 Troubleshooting
Common Issues
Icons not displaying:

Ensure your browser supports emoji rendering

Check that CSS is properly loaded

Location not working:

Verify location permissions are granted

Ensure HTTPS is used (required for geolocation on some browsers)

City not found:

Check spelling of city names

Try using English city names

No weather data:

Verify internet connection

Check browser console for API errors

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

🙏 Acknowledgments
Open-Meteo for providing free weather API

Weather data based on various global meteorological services

Icons using native emoji for cross-platform compatibility

📞 Support
If you have any questions or issues, please open an issue on GitHub.

Built with ❤️ using Vanilla JavaScript
