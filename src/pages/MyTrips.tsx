"use client";

import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Clock, ChevronRight, MoreVertical } from 'lucide-react';
import { motion } from 'framer-motion';

const MyTrips = () => {
  const trips = [
    {
      id: '1',
      destination: 'Bangalore',
      source: 'Hyderabad',
      date: '15 May 2025',
      status: 'Upcoming',
      mode: 'Train',
      cost: '₹1,250'
    },
    {
      id: '2',
      destination: 'Mumbai',
      source: 'Pune',
      date: '10 May 2025',
      status: 'Completed',
      mode: 'Cab',
      cost: '₹2,400'
    },
    {
      id: '3',
      destination: 'Delhi',
      source: 'Jaipur',
      date: '02 May 2025',
      status: 'Completed',
      mode: 'Flight',
      cost: '₹4,800'
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex">
      <Sidebar />
      
      <main className="flex-1 ml-20 lg:ml-64 p-8">
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
              <Card className="p-6 bg-white border-slate-200 hover:border-primary/30 transition-all group cursor-pointer shadow-sm">
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
      </main>
    </div>
  );
};

export default MyTrips;