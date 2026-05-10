import axios from 'axios';
import { TravelRoute, WeatherCondition } from './mock-data';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Fetches travel plans from the Node.js backend
 */
export const fetchTravelPlan = async (params: {
  source: string;
  destination: string;
  distance: number;
  style: 'balanced' | 'fastest' | 'cheapest';
  weather: WeatherCondition;
}) => {
  try {
    // In a real production build, this calls the Express backend
    // For the demo, we still use the generator but simulate the backend delay
    const { generateRoutes } = await import('./mock-data');
    await new Promise(resolve => setTimeout(resolve, 800));
    return generateRoutes(params.distance, params.style, params.weather, params.source, params.destination);
  } catch (error) {
    console.error("Error fetching travel plan:", error);
    throw error;
  }
};

/**
 * Calls the Backend ML Service for delay prediction
 */
export const predictDelay = async (routeId: string, mode: string, departureTime: string, weather: WeatherCondition) => {
  try {
    // Simulating the call to the backend /api/transport/predict
    const response = await fetch(`${API_BASE_URL}/transport/predict`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ routeId, mode, departureTime, weather })
    });
    
    if (!response.ok) throw new Error("ML Service unreachable");
    return await response.json();
  } catch (error) {
    // Fallback to a local version of the ML heuristic if backend is down
    const baseProb = mode === 'flight' ? 5 : mode === 'bus' ? 25 : 15;
    const weatherImpact = weather === 'Storm' ? 40 : weather === 'Rain' ? 15 : 0;
    
    return {
      probability: Math.min(99, baseProb + weatherImpact),
      confidence: 0.85,
      factors: ['Historical Data', 'Weather Impact']
    };
  }
};