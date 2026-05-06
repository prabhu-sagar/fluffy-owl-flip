"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ChevronRight, MoreVertical } from 'lucide-react';
import { motion } from 'framer-motion';
import RouteDetails from '@/components/travel/RouteDetails';
import { TravelRoute } from '@/lib/mock-data';

const MyTrips = () => {
  const [selectedTrip, setSelectedTrip] = React.useState<any | null>(null);
  const [trips, setTrips] = React.useState<any[]>([]);

  React.useEffect(() => {
    const storedTrips = JSON.parse(localStorage.getItem('bookedTrips') || '[]');
    
    // Default mock trips if none stored
    const mockTrips = [
      {
        id: 'm1',
        destination: 'Bangalore',
        source: 'Hyderabad',
        date: '15 May 2025',
        status: 'Upcoming',
        mode: 'Train',
        cost: '₹1,250',
        fullRoute: {
          id: 'm1',
          totalDuration: 630,
          totalCost: 1250,
          reliabilityScore: 92,
          type: 'recommended',
          co2Saved: 4.8,
          segments: [
            { mode: 'cab', from: 'Home', to: 'Station', duration: 30, cost: 150, departureTime: '08:00', arrivalTime: '08:30', delayRisk: 0.05 },
            { mode: 'train', from: 'Hyderabad', to: 'Bangalore', duration: 600, cost: 1100, departureTime: '09:00', arrivalTime: '19:00', delayRisk: 0.1 }
          ]
        } as TravelRoute
      }
    ];

    setTrips(storedTrips.length > 0 ? storedTrips : mockTrips);
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12 px-4 lg:px-8 container mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">My Trips</h1>
          <p className="text-slate-500 text-sm">Manage your upcoming and past journeys.</p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {trips.map((trip, idx) => (
            <motion.div
              key={trip.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card 
                className="p-6 bg-white border-slate-200 hover:border-primary/30 transition-all group cursor-pointer shadow-sm rounded-3xl"
                onClick={() => setSelectedTrip(trip)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <Calendar className="text-primary w-8 h-8" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold text-slate-900">{trip.source} → {trip.destination}</h3>
                        <Badge variant={trip.status === 'Upcoming' ? 'default' : 'secondary'} className="rounded-full">
                          {trip.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-slate-500">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {trip.date}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 08:30 AM</span>
                        <span className="flex items-center gap-1 font-bold text-primary">{trip.cost}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <button className="p-2 rounded-full hover:bg-slate-50 text-slate-400">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <RouteDetails 
          route={selectedTrip?.fullRoute || null} 
          isOpen={!!selectedTrip} 
          onClose={() => setSelectedTrip(null)} 
          searchedSource={selectedTrip?.source}
          searchedDest={selectedTrip?.destination}
        />
      </main>
    </div>
  );
};

export default MyTrips;