"use client";

import { TravelRoute, WeatherCondition } from '@/lib/mock-data';

const SYSTEM_PROMPT = `
You are an AI-powered Smart Travel Assistant.
Your job is to help users plan trips end-to-end with useful, realistic, and structured information.
`;

const MOCK_RESPONSES: Record<string, string> = {
  "default": "📍 Trip Overview:\n* Distance: ~600km | Time: 1.5h (Flight) / 8h (Train)\n\n🚆 Travel Options:\n* Flight: ₹4,500+ (Fastest)\n* Train: ₹1,200+ (Comfortable)\n* Bus: ₹800+ (Budget)\n\n🗺️ Stops: Kurnool, Anantapur\n\n🏝️ Attractions: Lalbagh, Cubbon Park, Palace\n\n🍽️ Food: Masala Dosa, Filter Coffee\n\n💰 Budget: Mid-range (₹15k for 3 days)\n\n💡 Tip: Book trains 2 weeks in advance!",
  "hello": "Hello! I'm your AI Travel Concierge. I can help you plan routes, find attractions, and estimate budgets. Where are we heading today?",
  "goa": "📍 Trip Overview:\n* Distance: ~650km | Time: 1.2h (Flight) / 12h (Bus)\n\n🚆 Travel Options:\n* Flight: ₹5,000+ \n* Bus: ₹1,500+ (Sleeper)\n\n🗺️ Stops: Belgaum, Chorla Ghat\n\n🏝️ Attractions: Baga Beach, Old Goa Churches, Dudhsagar Falls\n\n🍽️ Food: Fish Curry, Bebinca\n\n💰 Budget: Mid-range (₹20k for 4 days)\n\n💡 Tip: Rent a scooter for the best experience!",
};

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
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || localStorage.getItem('VITE_GEMINI_API_KEY');
  const lowerQuery = query.toLowerCase();

  // Demo Mode Fallback
  if (!apiKey || apiKey === 'placeholder-key') {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate thinking
    
    if (lowerQuery.includes('goa')) return MOCK_RESPONSES["goa"];
    if (lowerQuery.includes('hi') || lowerQuery.includes('hello')) return MOCK_RESPONSES["hello"];
    
    return `[DEMO MODE] ${MOCK_RESPONSES["default"]}\n\n(Note: To get real-time custom answers, please add your Gemini API key in the Profile settings.)`;
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `${SYSTEM_PROMPT}\n\nUser Query: ${query}` }] }]
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || `API Error: ${response.status}`);
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "I couldn't process that request.";
  } catch (error: any) {
    console.error("AI Service Error:", error);
    return `I'm having trouble connecting to my neural network: ${error.message}. Please check your API key in the Profile settings.`;
  }
};