import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import RouteCard from './RouteCard';
import { TravelRoute } from '@/lib/mock-data';

const mockRoute: TravelRoute = {
  id: '1',
  totalDuration: 120,
  totalCost: 500,
  reliabilityScore: 95,
  type: 'recommended',
  segments: [
    {
      mode: 'train',
      from: 'A',
      to: 'B',
      duration: 120,
      cost: 500,
      departureTime: '10:00',
      arrivalTime: '12:00',
      delayRisk: 0.05
    }
  ],
  co2Saved: 10,
  score: 90
};

describe('RouteCard', () => {
  it('renders route information correctly', () => {
    render(<RouteCard route={mockRoute} index={0} onViewDetails={() => {}} />);
    
    expect(screen.getByText('2h 0m')).toBeInTheDocument();
    expect(screen.getByText('₹500')).toBeInTheDocument();
    expect(screen.getByText('95%')).toBeInTheDocument();
  });
});