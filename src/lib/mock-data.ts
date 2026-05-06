export type TransportMode = 'flight' | 'train' | 'bus' | 'metro' | 'cab' | 'walking';

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

// Scoring weights based on travel style
const WEIGHTS = {
  balanced: { time: 0.4, cost: 0.4, delay: 0.2 },
  fastest: { time: 0.7, cost: 0.1, delay: 0.2 },
  cheapest: { time: 0.1, cost: 0.7, delay: 0.2 },
};

export const generateRoutes = (distance: number, style: 'balanced' | 'fastest' | 'cheapest'): TravelRoute[] => {
  const routes: TravelRoute[] = [];
  const w = WEIGHTS[style];

  // Rule: If distance > 300km, suggest Flight or Train
  if (distance > 300) {
    // Flight Option
    const flightTime = (distance / 700) * 60 + 120; // min
    const flightCost = 2500 + (distance * 2);
    const flightDelay = 0.05;
    routes.push({
      id: 'flight-1',
      totalDuration: flightTime,
      totalCost: flightCost,
      reliabilityScore: 98,
      type: 'fastest',
      co2Saved: 0.5,
      score: (w.time * flightTime) + (w.cost * flightCost / 10) + (w.delay * flightDelay * 100),
      segments: [{ mode: 'flight', from: 'Source', to: 'Dest', duration: flightTime, cost: flightCost, departureTime: '10:00', arrivalTime: '12:30', delayRisk: flightDelay }]
    });

    // Train Option
    const trainTime = (distance / 60) * 60;
    const trainCost = 500 + (distance * 1.5);
    const trainDelay = 0.15;
    routes.push({
      id: 'train-1',
      totalDuration: trainTime,
      totalCost: trainCost,
      reliabilityScore: 85,
      type: 'recommended',
      co2Saved: 4.2,
      score: (w.time * trainTime) + (w.cost * trainCost / 10) + (w.delay * trainDelay * 100),
      segments: [
        { mode: 'cab', from: 'Home', to: 'Station', duration: 30, cost: 150, departureTime: '08:00', arrivalTime: '08:30', delayRisk: 0.05 },
        { mode: 'train', from: 'Source', to: 'Dest', duration: trainTime, cost: trainCost, departureTime: '09:00', arrivalTime: '15:00', delayRisk: trainDelay }
      ]
    });
  } 
  // Rule: If 20-300km, suggest Bus or Train
  else if (distance >= 20) {
    const busTime = (distance / 40) * 60;
    const busCost = 100 + (distance * 2);
    routes.push({
      id: 'bus-1',
      totalDuration: busTime,
      totalCost: busCost,
      reliabilityScore: 90,
      type: 'cheapest',
      co2Saved: 2.1,
      score: 0,
      segments: [{ mode: 'bus', from: 'Source', to: 'Dest', duration: busTime, cost: busCost, departureTime: '08:00', arrivalTime: '10:00', delayRisk: 0.1 }]
    });
  }
  // Rule: If < 20km, suggest Metro + Cab
  else {
    routes.push({
      id: 'local-1',
      totalDuration: 45,
      totalCost: 200,
      reliabilityScore: 95,
      type: 'recommended',
      co2Saved: 1.2,
      score: 0,
      segments: [
        { mode: 'metro', from: 'A', to: 'B', duration: 20, cost: 40, departureTime: '08:00', arrivalTime: '08:20', delayRisk: 0.02 },
        { mode: 'cab', from: 'B', to: 'Dest', duration: 25, cost: 160, departureTime: '08:25', arrivalTime: '08:50', delayRisk: 0.1 }
      ]
    });
  }

  return routes;
};

export const MOCK_ROUTES: TravelRoute[] = generateRoutes(600, 'balanced');

export const PRICE_TRENDS = [
  { day: 'Today', price: 1250 },
  { day: '2 May', price: 1400 },
  { day: '3 May', price: 1800 },
  { day: '4 May', price: 2100 },
  { day: '5 May', price: 2400 },
  { day: '6 May', price: 2800 },
];

export const DELAY_DATA = [
  { time: '6 AM', prob: 10 },
  { time: '12 PM', prob: 45 },
  { time: '6 PM', prob: 65 },
  { time: '12 AM', prob: 20 },
];