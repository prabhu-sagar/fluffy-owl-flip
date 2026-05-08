"use client";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { TravelRoute, WeatherCondition } from '@/lib/mock-data';

// Initialize the Gemini API with the key from environment variables
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || "");

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
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    return "Please set your VITE_GEMINI_API_KEY in the environment variables to enable the real AI assistant. \n\nCurrently, I'm running in demonstration mode.";
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    // We use a chat session to maintain the system prompt context
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: SYSTEM_PROMPT }],
        },
        {
          role: "model",
          parts: [{ text: "Understood. I am ready to assist as your Smart Travel Assistant. I will follow all rules and formatting requirements strictly." }],
        },
      ],
    });

    const result = await chat.sendMessage(query);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("AI Service Error:", error);
    return "I'm having trouble connecting to my neural network right now. Please try again in a moment.";
  }
};