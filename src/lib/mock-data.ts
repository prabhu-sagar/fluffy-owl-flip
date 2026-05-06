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

  // 1. Premium Flight + Cab
  routes.push({
    id: 'r1',
    totalDuration: 180,
    totalCost: 5500,
    reliabilityScore: 95 - (weatherImpact * 10),
    type: 'fastest',
    co2Saved: 0.5,
    score: 10,
    segments: [
      { mode: 'cab', from: source, to: 'Airport', duration: 45, cost: 600, departureTime: '08:00', arrivalTime: '08:45', delayRisk: 0.1 },
      { mode: 'flight', from: 'Airport', to: 'Dest Airport', duration: 90, cost: 4500, departureTime: '10:30', arrivalTime: '12:00', delayRisk: 0.05 + (weatherImpact * 0.1) },
      { mode: 'cab', from: 'Dest Airport', to: dest, duration: 45, cost: 400, departureTime: '12:30', arrivalTime: '13:15', delayRisk: 0.1 }
    ]
  });

  // 2. Express Train + Metro
  routes.push({
    id: 'r2',
    totalDuration: 420,
    totalCost: 1800,
    reliabilityScore: 92 - (weatherImpact * 5),
    type: 'recommended',
    co2Saved: 5.2,
    score: 15,
    segments: [
      { mode: 'cab', from: source, to: 'Station', duration: 30, cost: 250, departureTime: '07:00', arrivalTime: '07:30', delayRisk: 0.05 },
      { mode: 'train', from: 'Station', to: 'Dest Station', duration: 360, cost: 1500, departureTime: '08:00', arrivalTime: '14:00', delayRisk: 0.1 },
      { mode: 'cab', from: 'Dest Station', to: dest, duration: 30, cost: 50, departureTime: '14:15', arrivalTime: '14:45', delayRisk: 0.02 }
    ]
  });

  // 3. Budget Bus
  routes.push({
    id: 'r3',
    totalDuration: 600,
    totalCost: 850,
    reliabilityScore: 85 - (weatherImpact * 8),
    type: 'cheapest',
    co2Saved: 3.8,
    score: 20,
    segments: [
      { mode: 'bus', from: source, to: dest, duration: 600, cost: 850, departureTime: '21:00', arrivalTime: '07:00', delayRisk: 0.15 }
    ]
  });

  // 4. Eco-Friendly (Train + Walking)
  routes.push({
    id: 'r4',
    totalDuration: 480,
    totalCost: 1200,
    reliabilityScore: 90,
    type: 'eco-friendly',
    co2Saved: 8.5,
    score: 25,
    segments: [
      { mode: 'train', from: source, to: 'Dest Station', duration: 450, cost: 1200, departureTime: '09:00', arrivalTime: '16:30', delayRisk: 0.05 },
      { mode: 'cab', from: 'Dest Station', to: dest, duration: 30, cost: 0, departureTime: '16:45', arrivalTime: '17:15', delayRisk: 0 }
    ]
  });

  // Add 6 more variations to reach 10
  for (let i = 5; i <= 10; i++) {
    routes.push({
      id: `r${i}`,
      totalDuration: 200 + (i * 40),
      totalCost: 5000 - (i * 400),
      reliabilityScore: 90 - i,
      type: i % 2 === 0 ? 'fastest' : 'recommended',
      co2Saved: i * 0.8,
      score: 30 + i,
      segments: [
        { mode: 'cab', from: source, to: 'Hub', duration: 40, cost: 300, departureTime: '10:00', arrivalTime: '10:40', delayRisk: 0.1 },
        { mode: i % 3 === 0 ? 'flight' : 'train', from: 'Hub', to: 'Dest Hub', duration: 120 + (i * 20), cost: 2000, departureTime: '12:00', arrivalTime: '15:00', delayRisk: 0.1 },
        { mode: 'bus', from: 'Dest Hub', to: dest, duration: 60, cost: 200, departureTime: '15:30', arrivalTime: '16:30', delayRisk: 0.1 }
      ]
    });
  }

  return routes;
};

export const PRICE_TRENDS = [
  { day: 'Today', price: 1250 },
  { day: '2 May', price: 1400 },
  { day: '3 May', price: 1800 },
  { day: '4 May', price: 2100 },
  { day: '5 May', price: 2400 },
  { day: '6 May', price: 2800 },
];