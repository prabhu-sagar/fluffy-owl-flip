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

  // 1. Refuse unrelated topics (Politics, Coding, etc.)
  const unrelatedKeywords = ['politics', 'coding', 'programming', 'math', 'science', 'javascript', 'python', 'react', 'node'];
  if (unrelatedKeywords.some(k => q.includes(k))) {
    return "I'm your AI Smart Travel Assistant. I specialize in travel planning and cannot assist with unrelated topics. How can I help with your trip today?";
  }

  // 2. Handle Trip Queries (e.g., "Hyderabad to Goa")
  if (q.includes('from') && q.includes('to') || (q.includes(' to ') && q.split(' to ').length === 2)) {
    let source = "Origin";
    let dest = "Destination";
    
    if (q.includes('from') && q.includes('to')) {
      const match = q.match(/from\s+([a-zA-Z\s]+)\s+to\s+([a-zA-Z\s]+)/);
      if (match) {
        source = match[1].trim();
        dest = match[2].trim();
      }
    } else {
      const parts = q.split(' to ');
      source = parts[0].trim();
      dest = parts[1].trim();
    }

    const capSource = source.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    const capDest = dest.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

    return `📍 Trip Overview:
* Distance: ~650km | Travel Time: 1.5h (Air) to 12h (Road)

🚆 Travel Options:
* Flight: ₹4,500+ | 1.5 hrs
* Train: ₹1,200+ | 10-14 hrs
* Bus: ₹1,500+ | 12-15 hrs

🗺️ Places to Visit on the Way:
* Kurnool (Historical Forts)
* Belum Caves (Natural Wonders)
* Hampi (UNESCO Heritage Site - slight detour)

🏝️ Top Attractions in ${capDest}:
* Calangute & Baga Beaches
* Old Goa Churches
* Dudhsagar Falls
* Panjim Latin Quarter
* Anjuna Flea Market

🍽️ Food to Try:
* Goan Fish Curry, Bebinca, and Prawn Balchão

💰 Budget Estimate:
* Budget: ₹10k | Mid-range: ₹25k | Luxury: ₹60k+

💡 Tips:
* Best time: Nov to Feb.
* Rent a scooter for local travel; stay in South Goa for peace.`;
  }

  // 3. Handle Short Questions (e.g., "Best places in Goa")
  if (q.includes('best places') || q.includes('top attractions') || q.includes('visit')) {
    return `Here are the top recommendations for your request:
• Historic Landmarks: Explore the local heritage sites and museums.
• Nature & Parks: Visit the botanical gardens and scenic viewpoints.
• Local Markets: Perfect for authentic shopping and street food.
• Hidden Gems: Check out the lesser-known cafes in the old quarters.`;
  }

  if (q.includes('cheap') || q.includes('budget')) {
    return `To keep your trip budget-friendly:
• Use public transport like state buses or local trains.
• Book hostels or homestays instead of luxury resorts.
• Eat at local "dhaba" style eateries for authentic, cheap food.
• Travel during the shoulder season (monsoons) for 40% lower rates.`;
  }

  // Default helpful response
  return "I'm your AI Travel Assistant! I can help you plan trips, find the best transport, or suggest local food and attractions. For example, try asking: 'Plan a trip from Hyderabad to Goa' or 'Best food in Mumbai'.";
};