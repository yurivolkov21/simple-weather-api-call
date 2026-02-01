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
    // Thành phố Việt Nam - Miền Bắc
    'hanoi': {
        city: 'Hanoi',
        temperature: 28,
        description: 'Partly cloudy',
        humidity: 70,
        windSpeed: 15
    },
    'haiphong': {
        city: 'Hai Phong',
        temperature: 27,
        description: 'Cloudy with sea breeze',
        humidity: 78,
        windSpeed: 18
    },

    // Thành phố Việt Nam - Miền Trung
    'danang': {
        city: 'Da Nang',
        temperature: 30,
        description: 'Clear sky',
        humidity: 75,
        windSpeed: 12
    },
    'hue': {
        city: 'Hue',
        temperature: 28,
        description: 'Light rain',
        humidity: 90,
        windSpeed: 15
    },
    'nhatrang': {
        city: 'Nha Trang',
        temperature: 29,
        description: 'Sunny beach weather',
        humidity: 75,
        windSpeed: 12
    },
    'quynhon': {
        city: 'Quy Nhon',
        temperature: 30,
        description: 'Partly cloudy',
        humidity: 76,
        windSpeed: 14
    },

    // Thành phố Việt Nam - Miền Nam
    'saigon': {
        city: 'Saigon',
        temperature: 32,
        description: 'Sunny',
        humidity: 80,
        windSpeed: 10
    },
    'hochiminh': {
        city: 'Ho Chi Minh',
        temperature: 33,
        description: 'Hot and sunny',
        humidity: 85,
        windSpeed: 8
    },
    'cantho': {
        city: 'Can Tho',
        temperature: 31,
        description: 'Warm with scattered clouds',
        humidity: 82,
        windSpeed: 10
    },
    'vungtau': {
        city: 'Vung Tau',
        temperature: 30,
        description: 'Coastal breeze',
        humidity: 77,
        windSpeed: 16
    },

    // Cao nguyên
    'dalat': {
        city: 'Da Lat',
        temperature: 22,
        description: 'Cool and foggy',
        humidity: 88,
        windSpeed: 5
    },

    // Thành phố quốc tế
    'london': {
        city: 'London',
        temperature: 15,
        description: 'Rainy',
        humidity: 82,
        windSpeed: 20
    },
    'tokyo': {
        city: 'Tokyo',
        temperature: 24,
        description: 'Clear sky',
        humidity: 65,
        windSpeed: 12
    },
    'paris': {
        city: 'Paris',
        temperature: 18,
        description: 'Cloudy',
        humidity: 70,
        windSpeed: 15
    },
    'newyork': {
        city: 'New York',
        temperature: 22,
        description: 'Partly cloudy',
        humidity: 60,
        windSpeed: 18
    },
    'sydney': {
        city: 'Sydney',
        temperature: 26,
        description: 'Sunny',
        humidity: 55,
        windSpeed: 14
    },
    'singapore': {
        city: 'Singapore',
        temperature: 31,
        description: 'Hot and humid',
        humidity: 88,
        windSpeed: 8
    },
    'bangkok': {
        city: 'Bangkok',
        temperature: 34,
        description: 'Very hot',
        humidity: 75,
        windSpeed: 7
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
                    error: `Weather data not found for ${city}. Available cities: Hanoi, Haiphong, Danang, Hue, Nhatrang, Quynhon, Saigon, HoChiMinh, Cantho, Vungtau, Dalat, London, Tokyo, Paris, NewYork, Sydney, Singapore, Bangkok`
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
