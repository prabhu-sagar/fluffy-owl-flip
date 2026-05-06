export type TransportMode = 'flight' | 'train' | 'bus' | 'metro' | 'cab' | 'walking';
export type WeatherCondition = 'Clear' | 'Rain' | 'Storm';

export interface RouteSegment {
  mode: TransportMode;
  from: string;
  to: string;
  duration: number;
  cost: number;
  departureTime: string;
  arrivalTime: string;
  delayRisk: number;
}

export interface TravelRoute {
  id: string;
  totalDuration: number;
  totalCost: number;
  reliabilityScore: number;
  type: 'fastest' | 'cheapest' | 'recommended' | 'eco-friendly';
  segments: RouteSegment[];
  co2Saved: number;
  score: number;
}

// Weather to Delay Mapping for ML simulation
const WEATHER_DELAY_MAP: Record<WeatherCondition, number> = {
  'Clear': 0,
  'Rain': 2,
  'Storm': 3
};

const WEIGHTS = {
  balanced: { time: 0.4, cost: 0.4, delay: 0.2 },
  fastest: { time: 0.7, cost: 0.1, delay: 0.2 },
  cheapest: { time: 0.1, cost: 0.7, delay: 0.2 },
};

export const calculateCabFare = (distance: number, surge: number = 1.2) => {
  return 50 + (distance * 10) * surge;
};

export const calculateFlightTime = (distance: number) => {
  return (distance / 700) * 60 + 120; // minutes
};

export const generateRoutes = (
  distance: number, 
  style: 'balanced' | 'fastest' | 'cheapest',
  weather: WeatherCondition = 'Clear'
): TravelRoute[] => {
  const routes: TravelRoute[] = [];
  const w = WEIGHTS[style];
  const weatherImpact = WEATHER_DELAY_MAP[weather];
  const transferPenalty = 15; // minutes per transfer

  // Flight Option (> 300km)
  if (distance > 300) {
    const flightTime = calculateFlightTime(distance);
    const flightCost = 2500 + (distance * 2.5);
    const flightDelay = 0.05 + (weatherImpact * 0.1);
    
    routes.push({
      id: 'flight-1',
      totalDuration: flightTime,
      totalCost: flightCost,
      reliabilityScore: Math.max(0, 100 - (flightDelay * 100)),
      type: 'fastest',
      co2Saved: 0.2,
      score: (w.time * flightTime) + (w.cost * flightCost / 50) + (w.delay * flightDelay * 500),
      segments: [{ mode: 'flight', from: 'Source', to: 'Dest', duration: flightTime, cost: flightCost, departureTime: '10:00', arrivalTime: '12:30', delayRisk: flightDelay }]
    });
  }

  // Train Option (> 50km)
  if (distance > 50) {
    const trainTime = (distance / 55) * 60;
    const trainCost = 400 + (distance * 1.2);
    const trainDelay = 0.1 + (weatherImpact * 0.05);
    const cabToStation = calculateCabFare(15);
    
    routes.push({
      id: 'train-1',
      totalDuration: trainTime + 30 + transferPenalty,
      totalCost: trainCost + cabToStation,
      reliabilityScore: Math.max(0, 100 - (trainDelay * 100)),
      type: 'recommended',
      co2Saved: 4.8,
      score: (w.time * trainTime) + (w.cost * trainCost / 50) + (w.delay * trainDelay * 500) + transferPenalty,
      segments: [
        { mode: 'cab', from: 'Home', to: 'Station', duration: 30, cost: cabToStation, departureTime: '08:00', arrivalTime: '08:30', delayRisk: 0.05 },
        { mode: 'train', from: 'Source', to: 'Dest', duration: trainTime, cost: trainCost, departureTime: '09:00', arrivalTime: '14:30', delayRisk: trainDelay }
      ]
    });
  }

  // Bus Option (20-400km)
  if (distance >= 20 && distance <= 400) {
    const busTime = (distance / 45) * 60;
    const busCost = 150 + (distance * 1.8);
    const busDelay = 0.15 + (weatherImpact * 0.08);
    
    routes.push({
      id: 'bus-1',
      totalDuration: busTime,
      totalCost: busCost,
      reliabilityScore: Math.max(0, 100 - (busDelay * 100)),
      type: 'cheapest',
      co2Saved: 2.5,
      score: (w.time * busTime) + (w.cost * busCost / 50) + (w.delay * busDelay * 500),
      segments: [{ mode: 'bus', from: 'Source', to: 'Dest', duration: busTime, cost: busCost, departureTime: '07:00', arrivalTime: '11:00', delayRisk: busDelay }]
    });
  }

  return routes.sort((a, b) => a.score - b.score);
};

export const PRICE_TRENDS = [
  { day: 'Today', price: 1250 },
  { day: '2 May', price: 1400 },
  { day: '3 May', price: 1800 },
  { day: '4 May', price: 2100 },
  { day: '5 May', price: 2400 },
  { day: '6 May', price: 2800 },
];