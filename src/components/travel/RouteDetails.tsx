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
import { Plane, Train, Bus, Car, MapPin, Clock, Wallet, AlertTriangle, CheckCircle2, CreditCard, CalendarX } from 'lucide-react';
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
      <DialogContent className="max-w-3xl bg-[#1a1c2e] border-[#2d2f45] text-white rounded-[2rem] p-0 overflow-hidden flex flex-col max-h-[90vh]">
        <div className="h-[250px] w-full relative shrink-0">
          <InteractiveMap 
            source={searchedSource || route.segments[0].from} 
            destination={searchedDest || route.segments[route.segments.length - 1].to} 
            segments={route.segments}
          />
        </div>

        <div className="p-8 space-y-6 overflow-y-auto custom-scrollbar">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-3">
              Journey Breakdown
              <span className="text-xs bg-primary/20 text-primary px-3 py-1 rounded-full uppercase tracking-wider">
                {route.type}
              </span>
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              AI-optimized itinerary from {searchedSource || route.segments[0].from} to {searchedDest || route.segments[route.segments.length - 1].to}.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Total Time</p>
                <p className="text-lg font-bold">{Math.floor(route.totalDuration / 60)}h {Math.round(route.totalDuration % 60)}m</p>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Total Cost</p>
                <p className="text-lg font-bold text-primary">₹{route.totalCost.toLocaleString()}</p>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">CO₂ Saved</p>
                <p className="text-lg font-bold text-emerald-400">{route.co2Saved} kg</p>
              </div>
            </div>

            <div className="relative space-y-6 before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-primary before:to-emerald-400">
              {route.segments.map((segment, idx) => (
                <div key={idx} className="relative pl-12 group">
                  <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-[#1a1c2e] border-2 border-primary flex items-center justify-center z-10 group-last:border-emerald-400">
                    <ModeIcon mode={segment.mode} />
                  </div>
                  
                  <div className="bg-white/5 p-5 rounded-2xl border border-white/5 hover:border-primary/30 transition-all">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-bold text-lg capitalize">{segment.mode} Journey</h4>
                        <p className="text-xs text-slate-400">{segment.from} → {segment.to}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary">₹{segment.cost}</p>
                        <p className="text-[10px] text-slate-500">{segment.duration} mins</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {segment.departureTime} - {segment.arrivalTime}
                      </div>
                      <div className="flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" /> On Time
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="p-6 border-t border-white/10 shrink-0 bg-[#1a1c2e]">
          <Button variant="ghost" onClick={onClose} className="rounded-xl text-slate-400 hover:text-white hover:bg-white/5">
            Close
          </Button>
          {isPastDate ? (
            <div className="flex items-center gap-2 text-amber-400 bg-amber-400/10 px-4 py-2 rounded-xl border border-amber-400/20">
              <CalendarX className="w-4 h-4" />
              <span className="text-xs font-bold">Past Date: Booking Disabled</span>
            </div>
          ) : (
            <Button onClick={handleBook} className="rounded-xl px-8 gap-2 shadow-lg shadow-primary/20">
              <CreditCard className="w-4 h-4" /> Book This Route
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RouteDetails;