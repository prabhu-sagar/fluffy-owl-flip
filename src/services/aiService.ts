"use client";

import { TravelRoute, WeatherCondition } from '@/lib/mock-data';

export const getAIRecommendation = (routes: TravelRoute[], weather: WeatherCondition) => {
  if (weather === 'Storm') {
    return routes.find(r => r.segments.every(s => s.mode !== 'flight')) || routes[0];
  }
  
  return routes.reduce((prev, current) => {
    const prevScore = prev.reliabilityScore * 0.6 + (10000 / prev.totalCost) * 0.4;
    const currScore = current.reliabilityScore * 0.6 + (10000 / current.totalCost) * 0.4;
    return currScore > prevScore ? current : prev;
  });
};

export const processChatQuery = async (query: string) => {
  // Simulate network latency
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const q = query.toLowerCase();

  // 11. Refuse unrelated topics
  const unrelatedKeywords = ['politics', 'coding', 'programming', 'math', 'history', 'science'];
  if (unrelatedKeywords.some(k => q.includes(k))) {
    return "I'm your AI Smart Travel Assistant. I specialize in travel planning and can't help with unrelated topics. How can I help with your trip today?";
  }

  // 7. Handle "Best way to travel from A to B" or comparisons
  if (q.includes('from') && q.includes('to')) {
    const match = q.match(/from\s+([a-zA-Z\s]+)\s+to\s+([a-zA-Z\s]+)/);
    const source = match ? match[1].trim() : "your origin";
    const dest = match ? match[2].trim() : "your destination";
    
    const capitalizedSource = source.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    const capitalizedDest = dest.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

    // 10. Format responses as requested
    return `Travel Options from ${capitalizedSource} to ${capitalizedDest}:

✈ Flight: ₹4,500 | 1.5 hrs (Fastest)
🚆 Train: ₹1,200 | 10 hrs (Cheapest)
🚌 Bus: ₹1,500 | 12 hrs

Recommendation:
Train is the most economical option, while flight is best for saving time.`;
  }

  // 4. Suggest best options based on specific needs
  if (q.includes('cheap') || q.includes('budget')) {
    return "For the most budget-friendly travel, I recommend booking sleeper class trains or state-run buses. Booking at least 2 weeks in advance can save you up to 30% on costs.";
  }

  if (q.includes('fast') || q.includes('quick')) {
    return "Flights are consistently the fastest option for distances over 500km. For shorter distances, consider high-speed rail or express cabs to avoid airport check-in times.";
  }

  // 12. General travel questions
  if (q.includes('tips')) {
    return "Travel Tips:
1. Pack light to avoid extra baggage fees.
2. Download offline maps for your destination.
3. Carry a portable power bank for long journeys.
4. Book mid-week for the best flight prices.";
  }

  if (q.includes('visit goa')) {
    return "Best time to visit Goa:
The peak season is from November to February when the weather is pleasant (20°C-30°C). For budget travelers, June to September offers lush greenery but heavy rainfall.";
  }

  // 8. Clarification for unclear input
  if (q.length < 5) {
    return "Could you please provide more details about your travel plans, such as your destination or preferred mode of transport?";
  }

  // Default helpful response
  return "I'm here to help you plan your perfect trip! Would you like to compare travel costs, find the fastest route, or get some travel tips for your next destination?";
};