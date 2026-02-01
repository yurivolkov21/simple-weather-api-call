// Data: Mock weather data cho các thành phố
import type { WeatherData } from '../models/weatherModel.js';

// Mock weather data - Dữ liệu thời tiết giả lập
export const mockWeatherData: Record<string, WeatherData> = {
    // ===== VIỆT NAM - MIỀN BẮC =====
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

    // ===== VIỆT NAM - MIỀN TRUNG =====
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

    // ===== VIỆT NAM - MIỀN NAM =====
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

    // ===== CAO NGUYÊN =====
    'dalat': {
        city: 'Da Lat',
        temperature: 22,
        description: 'Cool and foggy',
        humidity: 88,
        windSpeed: 5
    },

    // ===== THÀNH PHỐ QUỐC TẾ =====
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
};
