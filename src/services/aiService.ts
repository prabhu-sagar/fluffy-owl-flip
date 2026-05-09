"use client";

/**
 * AI Service for Travel Assistant
 * Uses Google Gemini API (gemini-pro) to provide intelligent travel recommendations.
 */

const SYSTEM_PROMPT = `
You are an intelligent travel assistant. Your role is to help users plan trips, solve travel problems, and suggest the best options.

CAPABILITIES:
- Suggest travel routes (bus, train, flight)
- Create itineraries based on budget and time
- Recommend tourist places, food, and stays
- Suggest alternatives if plans fail
- Provide tips for safety and convenience

GUIDELINES:
- Ask clarifying questions if needed (e.g., budget, interests, travel style).
- Give structured answers (day-wise plan, options, costs).
- Keep answers simple and practical.
- Focus on real-world usefulness.

EXAMPLE STRUCTURE FOR TRIP PLANNING:
- Travel options (Mode, Duration, Approx Cost)
- Day-wise plan (Morning, Afternoon, Evening activities)
- Budget estimate (Low, Mid, High range)
- Must-visit places & Local food recommendations

Always use Markdown for clear formatting.
`;

export const processChatQuery = async (query: string): Promise<string> => {
  // Retrieve API Key from environment or local storage
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || localStorage.getItem('VITE_GEMINI_API_KEY');

  if (!apiKey || apiKey === 'placeholder-key' || apiKey.trim() === '') {
    return "⚠️ **API Key Missing**: Please add your Gemini API Key in the **Profile** settings to enable live AI responses.\n\n[Get a free key here](https://aistudio.google.com/app/apikey)";
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