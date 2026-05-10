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
  attractions?: string[];
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

export const PRICE_TRENDS = [
  { day: 'Mon', price: 2400 },
  { day: 'Tue', price: 3200 },
  { day: 'Wed', price: 2800 },
  { day: 'Thu', price: 4500 },
  { day: 'Fri', price: 3900 },
  { day: 'Sat', price: 5200 },
  { day: 'Sun', price: 4800 },
];

export const DELAY_DATA = [
  { time: '08:00', delay: 5 },
  { time: '10:00', delay: 12 },
  { time: '12:00', delay: 8 },
  { time: '14:00', delay: 25 },
  { time: '16:00', delay: 40 },
  { time: '18:00', delay: 15 },
];

const WEATHER_DELAY_MAP: Record<WeatherCondition, number> = {
  'Clear': 0,
  'Rain': 2,
  'Storm': 3
};

export const generateRoutes = (
  distance: number, 
  style: 'balanced' | 'fastest' | 'cheapest',
  weather: WeatherCondition = 'Clear',
  source: string = "Source",
  dest: string = "Destination"
): TravelRoute[] => {
  const routes: TravelRoute[] = [];
  const weatherImpact = WEATHER_DELAY_MAP[weather];
  const citySeed = dest.length + (dest.charCodeAt(0) || 0);

  // 1. Premium Flight + Cab (Fastest)
  routes.push({
    id: 'r1',
    totalDuration: 150 + (citySeed % 60),
    totalCost: 4000 + (citySeed * 20),
    reliabilityScore: 95 - (weatherImpact * 10),
    type: 'fastest',
    co2Saved: 0.5,
    score: 10,
    segments: [
      { mode: 'cab', from: source, to: `${source} Airport`, duration: 45, cost: 600, departureTime: '08:00', arrivalTime: '08:45', delayRisk: 0.1 },
      { mode: 'flight', from: `${source} Airport`, to: `${dest} Airport`, duration: 90, cost: 3500, departureTime: '10:30', arrivalTime: '12:00', delayRisk: 0.05 + (weatherImpact * 0.1) },
      { mode: 'cab', from: `${dest} Airport`, to: dest, duration: 45, cost: 400, departureTime: '12:30', arrivalTime: '13:15', delayRisk: 0.1 }
    ]
  });

  // 2. Express Train + Metro (Recommended)
  routes.push({
    id: 'r2',
    totalDuration: 380 + (citySeed % 100),
    totalCost: 1200 + (citySeed * 5),
    reliabilityScore: 92 - (weatherImpact * 5),
    type: 'recommended',
    co2Saved: 5.2,
    score: 15,
    segments: [
      { mode: 'metro', from: source, to: `${source} Central`, duration: 20, cost: 40, departureTime: '07:10', arrivalTime: '07:30', delayRisk: 0.02 },
      { mode: 'train', from: `${source} Central`, to: `${dest} Junction`, duration: 320, cost: 1000, departureTime: '08:00', arrivalTime: '13:20', delayRisk: 0.1 },
      { mode: 'metro', from: `${dest} Junction`, to: dest, duration: 25, cost: 30, departureTime: '13:45', arrivalTime: '14:10', delayRisk: 0.02 }
    ]
  });

  // 3. Budget Bus (Cheapest)
  routes.push({
    id: 'r3',
    totalDuration: 550 + (citySeed % 120),
    totalCost: 600 + (citySeed * 3),
    reliabilityScore: 85 - (weatherImpact * 8),
    type: 'cheapest',
    co2Saved: 3.8,
    score: 20,
    segments: [
      { mode: 'bus', from: source, to: dest, duration: 550, cost: 600, departureTime: '21:00', arrivalTime: '06:30', delayRisk: 0.15 }
    ]
  });

  return routes;
};