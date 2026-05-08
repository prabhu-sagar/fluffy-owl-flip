"use client";

/**
 * AI Service for Travel Assistant
 * Uses Google Gemini API (gemini-pro) to provide intelligent travel recommendations.
 */

const SYSTEM_PROMPT = `
You are "Dyad Travel AI", a sophisticated travel concierge. 
Your goal is to help users plan perfect journeys.

CONTEXT:
- You are part of an app that handles multi-modal transport (Flights, Trains, Buses, Cabs).
- You have access to real-time weather and route reliability data.

GUIDELINES:
1. Be concise and professional yet friendly.
2. Use Markdown for formatting (bolding, lists).
3. When asked about a route, provide estimated travel time and best mode of transport.
4. Always encourage sustainable travel when feasible.

FORMAT:
- Start with a brief greeting.
- Use bullet points for clarity.
`;

export const processChatQuery = async (query: string): Promise<string> => {
  // Retrieve API Key from environment or local storage
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || localStorage.getItem('VITE_GEMINI_API_KEY');

  if (!apiKey || apiKey === 'placeholder-key') {
    return "⚠️ **API Key Missing**: Please add your Gemini API Key in the **Profile** settings to enable live AI responses.";
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`,
      {
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
          ]
        })
      }
    );

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
    return `❌ **Assistant Error**: ${error.message}. Please verify your API key in Profile settings.`;
  }
};