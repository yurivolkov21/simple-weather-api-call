// Import các thư viện
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import path from 'path';

// Load biến môi trường từ file .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve static files từ folder public

// Dữ liệu giả lập cho chế độ mock
const mockWeatherData: Record<string, any> = {
    'hanoi': {
        city: 'Hanoi',
        temperature: 28,
        description: 'Partly cloudy',
        humidity: 70,
        windSpeed: 15
    },
    'saigon': {
        city: 'Saigon',
        temperature: 32,
        description: 'Sunny',
        humidity: 80,
        windSpeed: 10
    },
    'danang': {
        city: 'Da Nang',
        temperature: 30,
        description: 'Clear sky',
        humidity: 75,
        windSpeed: 12
    }
}

// API endpoint để lấy dữ liệu thời tiết (API endpoint: GET /weather?city=hanoi)
app.get('/weather', async (req, res) => {
    try {
        const city = req.query.city as string;

        if (!city) {
            return res.status(400).json({ error: 'City parameter is required' });
        }

        const mode = process.env.WEATHER_MODE || 'mock';

        if (mode === 'mock') {
            // Sử dụng dữ liệu mock
            const cityLower = city.toLowerCase();
            const weatherData = mockWeatherData[cityLower];

            if (!weatherData) {
                return res.status(404).json({
                    error: `Weather data not found for city: ${city}. try 'hanoi', 'saigon', or 'danang' .`
                });
            }

            return res.json(weatherData);
        } else {
            // Sử dụng OpenWeatherMap API
            const apiKey = process.env.OPENWEATHER_API_KEY;
            const baseUrl = process.env.OPENWEATHER_BASE_URL;

            const response = await axios.get(`${baseUrl}/weather`, {
                params: {
                    q: city,
                    appid: apiKey,
                    units: 'metric'
                }
            });

            // Format lại dữ liệu trả về
            const weatherData = {
                city: response.data.name,
                temperature: response.data.main.temp,
                description: response.data.weather[0].description,
                humidity: response.data.main.humidity,
                windSpeed: response.data.wind.speed
            };

            return res.json(weatherData);
        }
    } catch (error: any) {
        console.error('Error fetching weather data:', error.message);
        return res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

// Khởi động server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    console.log(`Weather API mode: ${process.env.WEATHER_MODE || 'mock'}`);
})
