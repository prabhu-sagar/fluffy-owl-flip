"use client";

/**
 * AI Service for Travel Assistant
 * Uses Google Gemini API to provide intelligent travel recommendations.
 */

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

const SYSTEM_PROMPT = `
You are "Dyad Travel AI", a sophisticated travel concierge. 
Your goal is to help users plan perfect journeys.

CONTEXT:
- You are part of an app that handles multi-modal transport (Flights, Trains, Buses, Cabs).
- You have access to real-time weather and route reliability data (simulated).

GUIDELINES:
1. Be concise and professional yet friendly.
2. Use Markdown for formatting (bolding, lists).
3. When asked about a route, provide:
   - Estimated travel time.
   - Best mode of transport based on "Value for Money".
   - 2-3 "Hidden Gem" attractions at the destination.
4. If the user mentions a specific city, give a "Local's Tip" (e.g., a specific dish or a less-crowded viewpoint).
5. Always encourage sustainable travel (trains/buses) when feasible.

FORMAT:
- Start with a brief greeting.
- Use bullet points for clarity.
- End with a helpful follow-up question.
`;

export const processChatQuery = async (query: string): Promise<string> => {
  // Retrieve API Key from environment or local storage (set in Profile)
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || localStorage.getItem('VITE_GEMINI_API_KEY');

  if (!apiKey || apiKey === 'placeholder-key') {
    return "⚠️ **API Key Missing**: Please add your Gemini API Key in the **Profile** settings to enable live AI responses. \n\n*In the meantime, I can help you with basic navigation!*";
  }

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `${SYSTEM_PROMPT}\n\nUser Message: ${query}`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Failed to connect to Gemini API");
    }

    const data = await response.json();
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!aiResponse) {
      throw new Error("Empty response from AI model");
    }

    return aiResponse;
  } catch (error: any) {
    console.error("AI Service Error:", error);
    return `❌ **Assistant Error**: ${error.message}. Please verify your API key and connection.`;
  }
};