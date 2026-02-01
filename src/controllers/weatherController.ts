// Controller: Xử lý logic nghiệp vụ và request/response
import type { Request, Response } from 'express';
import {
    getWeatherFromMock,
    getWeatherFromAPI,
    getAvailableCities
} from '../models/weatherModel.js';

// Controller để lấy thông tin thời tiết
export const getWeather = async (req: Request, res: Response): Promise<void> => {
    try {
        const city = req.query.city as string;

        // Validate input
        if (!city) {
            res.status(400).json({ error: 'City parameter is required' });
            return;
        }

        // Lấy mode từ environment variable
        const mode = process.env.WEATHER_MODE || 'mock';

        if (mode === 'mock') {
            // Sử dụng mock data
            const weatherData = getWeatherFromMock(city);

            if (!weatherData) {
                const availableCities = getAvailableCities();
                res.status(404).json({
                    error: `Weather data not found for ${city}. Available cities: ${availableCities.join(', ')}`
                });
                return;
            }

            res.json(weatherData);
        } else {
            // Sử dụng OpenWeatherMap API
            const weatherData = await getWeatherFromAPI(city);
            res.json(weatherData);
        }
    } catch (error: any) {
        console.error('Error fetching weather data:', error.message);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
};