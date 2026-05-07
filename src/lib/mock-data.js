const WEATHER_DELAY_MAP = {
  'Clear': 0,
  'Rain': 2,
  'Storm': 3
};

export const DELAY_DATA = [
  { name: '08:00', delay: 5 },
  { name: '10:00', delay: 12 },
  { name: '12:00', delay: 8 },
  { name: '14:00', delay: 15 },
  { name: '16:00', delay: 20 },
  { name: '18:00', delay: 10 },
];

export const generateRoutes = (
  distance, 
  style,
  weather = 'Clear',
  source = "Source",
  dest = "Destination"
) => {
  const routes = [];
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
      { mode: 'flight', from: `${source} Airport`, to: `${dest} Airport`, duration: 90, cost: 3500 + (citySeed * 10), departureTime: '10:30', arrivalTime: '12:00', delayRisk: 0.05 + (weatherImpact * 0.1) },
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
      { mode: 'cab', from: source, to: `${source} Junction`, duration: 30, cost: 250, departureTime: '07:00', arrivalTime: '07:30', delayRisk: 0.05 },
      { mode: 'train', from: `${source} Junction`, to: `${dest} Central`, duration: 320 + (citySeed % 50), cost: 1000 + (citySeed * 2), departureTime: '08:00', arrivalTime: '13:20', delayRisk: 0.1 },
      { mode: 'cab', from: `${dest} Central`, to: dest, duration: 30, cost: 50, departureTime: '13:45', arrivalTime: '14:15', delayRisk: 0.02 }
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
      { mode: 'bus', from: source, to: dest, duration: 550 + (citySeed % 120), cost: 600 + (citySeed * 3), departureTime: '21:00', arrivalTime: '06:30', delayRisk: 0.15 }
    ]
  });

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