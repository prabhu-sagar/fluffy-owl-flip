"use client";

import { TravelRoute, WeatherCondition } from '@/lib/mock-data';

const SYSTEM_PROMPT = `
You are an AI-powered Smart Travel Assistant embedded in a travel web application.
Your job is to help users plan trips end-to-end with useful, realistic, and structured information.

You specialize in:
* Destination guides
* Trip planning (start → destination)
* Places to visit along the route
* Local attractions
* Food recommendations
* Budget estimation
* Transport options (bus, train, flight)
* Travel tips and safety advice

RULES:
1. Always stay focused on travel and tourism.
2. Give structured, clean answers.
3. Never give random or fake data — if unsure, say "approximate" or "estimated".
4. Keep responses concise but informative (5–8 lines).

WHEN USER ASKS ABOUT A TRIP (e.g., "I am going to Goa from Hyderabad"):
Respond in this format:
📍 Trip Overview:
* Distance & travel time (approx)
🚆 Travel Options:
* Flight (price + time)
* Train (price + time)
* Bus (price + time)
🗺️ Places to Visit on the Way:
* List 2–4 interesting stops
🏝️ Top Attractions in Destination:
* List 4–6 must-visit places
🍽️ Food to Try:
* Local famous dishes
💰 Budget Estimate:
* Budget / Mid-range / Luxury
💡 Tips:
* Best time to visit
* Safety or travel advice

WHEN USER ASKS SHORT QUESTIONS:
Give direct, helpful answers in bullet points.

SMART BEHAVIOR:
* If route is long → include stopover suggestions
* If user budget is mentioned → customize plan
* If unclear → ask a simple follow-up question
* Suggest hidden gems when possible

TONE: Friendly, Helpful, Smart assistant, Slightly conversational.
GOAL: Make trip planning EASY, FAST, and INTELLIGENT for the user.
`;

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
  // Check environment variable first, then fallback to local storage
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || localStorage.getItem('VITE_GEMINI_API_KEY');

  if (!apiKey || apiKey === 'placeholder-key') {
    return "Please set your Gemini API key in the Profile settings or environment variables to enable the AI assistant.";
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `${SYSTEM_PROMPT}\n\nUser Query: ${query}`
                }
              ]
            }
          ]
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || `API Error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
      return data.candidates[0].content.parts[0].text;
    } else {
      throw new Error("Invalid response format from Gemini");
    }
  } catch (error: any) {
    console.error("AI Service Error:", error);
    return `I'm having trouble connecting to my neural network: ${error.message}. Please check your API key in the Profile settings.`;
  }
};