export type TransportMode = 'flight' | 'train' | 'bus' | 'metro' | 'walking';

export interface RouteSegment {
  mode: TransportMode;
  from: string;
  to: string;
  duration: number; // in minutes
  cost: number;
  departureTime: string;
  arrivalTime: string;
  delayRisk: number; // 0 to 1
}

export interface TravelRoute {
  id: string;
  totalDuration: number;
  totalCost: number;
  segments: RouteSegment[];
  reliabilityScore: number; // 0 to 100
  type: 'fastest' | 'cheapest' | 'recommended' | 'balanced';
}

export const MOCK_ROUTES: TravelRoute[] = [
  {
    id: '1',
    totalDuration: 145,
    totalCost: 85,
    reliabilityScore: 94,
    type: 'recommended',
    segments: [
      { mode: 'metro', from: 'Downtown', to: 'Central Station', duration: 15, cost: 2.5, departureTime: '08:00', arrivalTime: '08:15', delayRisk: 0.05 },
      { mode: 'train', from: 'Central Station', to: 'Airport Terminal', duration: 30, cost: 12.5, departureTime: '08:30', arrivalTime: '09:00', delayRisk: 0.1 },
      { mode: 'flight', from: 'Airport Terminal', to: 'Destination City', duration: 90, cost: 65, departureTime: '10:30', arrivalTime: '12:00', delayRisk: 0.15 },
      { mode: 'bus', from: 'Arrival Gate', to: 'Hotel District', duration: 10, cost: 5, departureTime: '12:15', arrivalTime: '12:25', delayRisk: 0.08 },
    ]
  },
  {
    id: '2',
    totalDuration: 320,
    totalCost: 45,
    reliabilityScore: 88,
    type: 'cheapest',
    segments: [
      { mode: 'bus', from: 'Downtown', to: 'Regional Hub', duration: 120, cost: 15, departureTime: '07:00', arrivalTime: '09:00', delayRisk: 0.2 },
      { mode: 'bus', from: 'Regional Hub', to: 'Destination City', duration: 200, cost: 30, departureTime: '09:30', arrivalTime: '12:50', delayRisk: 0.25 },
    ]
  },
  {
    id: '3',
    totalDuration: 120,
    totalCost: 120,
    reliabilityScore: 98,
    type: 'fastest',
    segments: [
      { mode: 'flight', from: 'City Heliport', to: 'Destination Executive', duration: 120, cost: 120, departureTime: '09:00', arrivalTime: '11:00', delayRisk: 0.02 },
    ]
  }
];