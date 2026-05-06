"use client";

import { TravelRoute, WeatherCondition } from '@/lib/mock-data';

export const getAIRecommendation = (routes: TravelRoute[], weather: WeatherCondition) => {
  if (weather === 'Storm') {
    return routes.find(r => r.segments.every(s => s.mode !== 'flight')) || routes[0];
  }
  
  // Optimization logic: Highest reliability + Lowest cost/time ratio
  return routes.reduce((prev, current) => {
    const prevScore = prev.reliabilityScore * 0.6 + (10000 / prev.totalCost) * 0.4;
    const currScore = current.reliabilityScore * 0.6 + (10000 / current.totalCost) * 0.4;
    return currScore > prevScore ? current : prev;
  });
};

export const processChatQuery = async (query: string) => {
  // Simulating Hugging Face / OpenAI response
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const q = query.toLowerCase();
  if (q.includes('cheap')) return "I've analyzed the current trends. The bus route is 40% cheaper today, but the train offers better value considering the 2-hour time saving.";
  if (q.includes('weather')) return "The forecast shows light rain. I recommend avoiding open-air transit and sticking to the Metro or Train segments.";
  return "I'm monitoring live traffic and weather. Based on your preferences, the recommended rail route remains the most reliable option.";
};