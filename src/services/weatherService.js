"use client";

// In a real app, you would use: const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export const fetchWeather = async (city) => {
  // Simulating OpenWeather API call
  await new Promise(resolve => setTimeout(resolve, 600));
  
  const conditions = ['Clear', 'Rain', 'Storm'];
  return {
    temp: Math.floor(Math.random() * 15) + 15,
    condition: conditions[Math.floor(Math.random() * conditions.length)],
    humidity: 65 + Math.floor(Math.random() * 20),
    windSpeed: 10 + Math.floor(Math.random() * 15)
  };
};