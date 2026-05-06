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
}

export const MOCK_ROUTES: TravelRoute[] = [
  {
    id: '1',
    totalDuration: 330,
    totalCost: 1250,
    reliabilityScore: 94,
    type: 'recommended',
    co2Saved: 2.4,
    segments: [
      { mode: 'cab', from: 'Home', to: 'Station', duration: 30, cost: 150, departureTime: '08:00', arrivalTime: '08:30', delayRisk: 0.05 },
      { mode: 'train', from: 'Hyderabad', to: 'Bangalore', duration: 240, cost: 900, departureTime: '09:00', arrivalTime: '13:00', delayRisk: 0.1 },
      { mode: 'cab', from: 'Station', to: 'Office', duration: 60, cost: 200, departureTime: '13:15', arrivalTime: '14:15', delayRisk: 0.15 },
    ]
  },
  {
    id: '2',
    totalDuration: 230,
    totalCost: 2950,
    reliabilityScore: 98,
    type: 'fastest',
    co2Saved: 0.8,
    segments: [
      { mode: 'flight', from: 'HYD', to: 'BLR', duration: 70, cost: 2500, departureTime: '10:00', arrivalTime: '11:10', delayRisk: 0.02 },
    ]
  }
];

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