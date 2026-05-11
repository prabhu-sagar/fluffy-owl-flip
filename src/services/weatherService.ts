"use client";

import { WeatherCondition } from '@/lib/mock-data';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const fetchWeather = async (city: string): Promise<{
  temp: number;
  condition: WeatherCondition;
  humidity: number;
  windSpeed: number;
}> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/weather/${city}`);
    const data = response.data.data;
    
    // Map OpenWeatherMap conditions to our internal types
    const mainCondition = data.weather?.[0]?.main || 'Clear';
    let condition: WeatherCondition = 'Clear';
    if (['Rain', 'Drizzle'].includes(mainCondition)) condition = 'Rain';
    if (mainCondition === 'Thunderstorm') condition = 'Storm';

    return {
      temp: Math.round(data.main?.temp || 25),
      condition,
      humidity: data.main?.humidity || 60,
      windSpeed: Math.round((data.wind?.speed || 0) * 3.6) // m/s to km/h
    };
  } catch (error) {
    console.error("Weather API Error, using fallback:", error);
    return {
      temp: 24,
      condition: 'Clear',
      humidity: 55,
      windSpeed: 12
    };
  }
};