// Model: Chứa logic lấy weather data
import axios from 'axios';
import { mockWeatherData } from '../data/mockData.js';

// Interface cho Weather Data
export interface WeatherData {
    city: string;
    temperature: number;
    description: string;
    humidity: number;
    windSpeed: number;
}

// Hàm lấy weather data từ mock
export const getWeatherFromMock = (city: string): WeatherData | null => {
    const cityLower = city.toLowerCase();
    return mockWeatherData[cityLower] || null;
};

// Hàm lấy weather data từ OpenWeatherMap API
export const getWeatherFromAPI = async (city: string): Promise<WeatherData> => {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const baseUrl = process.env.OPENWEATHER_BASE_URL;

    const response = await axios.get(`${baseUrl}/weather`, {
        params: {
            q: city,
            appid: apiKey,
            units: 'metric'
        }
    });

    return {
        city: response.data.name,
        temperature: response.data.main.temp,
        description: response.data.weather[0].description,
        humidity: response.data.main.humidity,
        windSpeed: response.data.wind.speed
    };
};

// Lấy danh sách tất cả các thành phố có sẵn
export const getAvailableCities = (): string[] => {
    return Object.keys(mockWeatherData).map(key =>
        mockWeatherData[key]?.city || ''
    );
};