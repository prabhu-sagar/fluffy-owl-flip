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
  // Simulating a more dynamic AI response system
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const q = query.toLowerCase();
  
  if (q.includes('cheap') || q.includes('budget') || q.includes('cost')) {
    return "I've analyzed the current trends. The bus route is currently 40% cheaper, but the train offers the best value-to-time ratio for your specific distance.";
  }
  
  if (q.includes('weather') || q.includes('rain') || q.includes('storm')) {
    return "The forecast indicates light rain in your destination. I recommend sticking to rail or metro segments as they are less affected by surface traffic congestion during showers.";
  }

  if (q.includes('fast') || q.includes('quick') || q.includes('time')) {
    return "If speed is your priority, the flight segment is the fastest, but remember to account for the 2-hour check-in window which makes the express train a competitive alternative.";
  }

  if (q.includes('hello') || q.includes('hi') || q.includes('hey')) {
    return "Hello! I'm your AI Travel Concierge. How can I help you optimize your journey today? I can compare costs, check weather impacts, or find the fastest routes.";
  }

  if (q.includes('book') || q.includes('reserve')) {
    return "I can help with that! Simply click the 'Book This Route' button in the journey breakdown view to finalize your reservation.";
  }
  
  return "That's an interesting point. Based on real-time data for your route, I'd suggest monitoring the reliability scores, as they fluctuate based on live terminal load.";
};