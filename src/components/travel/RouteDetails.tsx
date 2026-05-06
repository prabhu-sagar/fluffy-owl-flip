"use client";

import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { TravelRoute, TransportMode } from '@/lib/mock-data';
import { Plane, Train, Bus, Car, MapPin, Clock, Wallet, CheckCircle2, CreditCard, CalendarX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { showSuccess } from '@/utils/toast';
import InteractiveMap from './InteractiveMap';

interface RouteDetailsProps {
  route: TravelRoute | null;
  isOpen: boolean;
  onClose: () => void;
  searchedSource?: string;
  searchedDest?: string;
  searchedDate?: string;
}

const ModeIcon = ({ mode }: { mode: TransportMode }) => {
  switch (mode) {
    case 'flight': return <Plane className="w-5 h-5" />;
    case 'train': return <Train className="w-5 h-5" />;
    case 'bus': return <Bus className="w-5 h-5" />;
    case 'cab': return <Car className="w-5 h-5" />;
    default: return <MapPin className="w-5 h-5" />;
  }
};

const RouteDetails = ({ route, isOpen, onClose, searchedSource, searchedDest, searchedDate }: RouteDetailsProps) => {
  if (!route) return null;

  const isPastDate = searchedDate ? new Date(searchedDate) < new Date(new Date().setHours(0,0,0,0)) : false;

  const handleBook = () => {
    const existingTrips = JSON.parse(localStorage.getItem('bookedTrips') || '[]');
    const newTrip = {
      id: Date.now().toString(),
      destination: searchedDest || route.segments[route.segments.length - 1].to,
      source: searchedSource || route.segments[0].from,
      date: searchedDate || new Date().toISOString().split('T')[0],
      status: 'Upcoming',
      mode: route.segments[0].mode.charAt(0).toUpperCase() + route.segments[0].mode.slice(1),
      cost: `₹${route.totalCost.toLocaleString()}`,
      fullRoute: route
    };
    
    localStorage.setItem('bookedTrips', JSON.stringify([newTrip, ...existingTrips]));
    showSuccess("Trip booked successfully!");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl bg-[#1a1c2e] border-[#2d2f45] text-white rounded-[2.5rem] p-0 overflow-hidden flex flex-col lg:flex-row h-[85vh] lg:h-auto lg:max-h-[90vh]">
        {/* Left Side: Map */}
        <div className="lg:w-1/2 h-[300px] lg:h-auto relative shrink-0 border-b lg:border-b-0 lg:border-r border-white/10">
          <InteractiveMap 
            source={searchedSource || route.segments[0].from} 
            destination={searchedDest || route.segments[route.segments.length - 1].to} 
            segments={route.segments}
          />
        </div>

        {/* Right Side: Details */}
        <div className="lg:w-1/2 flex flex-col overflow-hidden">
          <div className="p-8 space-y-6 overflow-y-auto custom-scrollbar flex-1">
            <DialogHeader>
              <div className="flex items-center justify-between mb-2">
                <DialogTitle className="text-3xl font-black tracking-tight">Journey Breakdown</DialogTitle>
                <span className="text-[10px] font-black bg-primary/20 text-primary px-4 py-1.5 rounded-full uppercase tracking-[0.2em]">
                  {route.type}
                </span>
              </div>
              <DialogDescription className="text-slate-400 text-base">
                Optimized itinerary from <span className="text-white font-bold">{searchedSource || route.segments[0].from}</span> to <span className="text-white font-bold">{searchedDest || route.segments[route.segments.length - 1].to}</span>.
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/5 p-5 rounded-3xl border border-white/5 text-center">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Total Time</p>
                <p className="text-xl font-black">{Math.floor(route.totalDuration / 60)}h {Math.round(route.totalDuration % 60)}m</p>
              </div>
              <div className="bg-white/5 p-5 rounded-3xl border border-white/5 text-center">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Total Cost</p>
                <p className="text-xl font-black text-primary">₹{route.totalCost.toLocaleString()}</p>
              </div>
              <div className="bg-white/5 p-5 rounded-3xl border border-white/5 text-center">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">CO₂ Saved</p>
                <p className="text-xl font-black text-emerald-400">{route.co2Saved} kg</p>
              </div>
            </div>

            <div className="relative space-y-6 before:absolute before:left-[23px] before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-primary before:to-emerald-400">
              {route.segments.map((segment, idx) => (
                <div key={idx} className="relative pl-14 group">
                  <div className="absolute left-0 top-0 w-12 h-12 rounded-2xl bg-[#1a1c2e] border-2 border-primary flex items-center justify-center z-10 group-last:border-emerald-400 shadow-lg shadow-primary/20">
                    <ModeIcon mode={segment.mode} />
                  </div>
                  
                  <div className="bg-white/5 p-6 rounded-[2rem] border border-white/5 hover:border-primary/30 transition-all">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-black text-lg capitalize tracking-tight">{segment.mode} Journey</h4>
                        <p className="text-sm text-slate-400">{segment.from} → {segment.to}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-black text-xl text-primary">₹{segment.cost}</p>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{segment.duration} mins</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.15em]">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary" /> {segment.departureTime} - {segment.arrivalTime}
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" /> On Time
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <DialogFooter className="p-8 border-t border-white/10 bg-[#1a1c2e]/50 backdrop-blur-md shrink-0">
            <Button variant="ghost" onClick={onClose} className="rounded-2xl text-slate-400 hover:text-white hover:bg-white/5 font-bold px-6">
              Close
            </Button>
            {isPastDate ? (
              <div className="flex items-center gap-3 text-amber-400 bg-amber-400/10 px-6 py-3 rounded-2xl border border-amber-400/20">
                <CalendarX className="w-5 h-5" />
                <span className="text-sm font-black uppercase tracking-widest">Past Date: Booking Disabled</span>
              </div>
            ) : (
              <Button onClick={handleBook} className="rounded-2xl px-10 h-14 gap-3 shadow-xl shadow-primary/30 font-black text-base hover:scale-[1.02] transition-transform">
                <CreditCard className="w-5 h-5" /> Book This Route
              </Button>
            )}
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RouteDetails;