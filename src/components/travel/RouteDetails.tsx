"use client";

import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { TravelRoute, TransportMode } from '@/lib/mock-data';
import { Plane, Train, Bus, Car, MapPin, Clock, Wallet, AlertTriangle, CheckCircle2, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface RouteDetailsProps {
  route: TravelRoute | null;
  isOpen: boolean;
  onClose: () => void;
  onStartJourney: (route: TravelRoute) => void;
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

const RouteDetails = ({ route, isOpen, onClose, onStartJourney }: RouteDetailsProps) => {
  if (!route) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-[#1a1c2e] border-[#2d2f45] text-white rounded-[2rem]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center justify-between">
            <div className="flex items-center gap-3">
              Journey Breakdown
              <span className="text-xs bg-primary/20 text-primary px-3 py-1 rounded-full uppercase tracking-wider">
                {route.type}
              </span>
            </div>
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            AI-optimized itinerary for your trip.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-8 py-4">
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
                
                <div className="glass-card p-5 rounded-2xl border-white/5 hover:border-primary/30 transition-all">
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

                  <div className="flex items-center gap-4 pt-3 border-t border-white/5">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-slate-500" />
                      <span className="text-xs font-medium">{segment.departureTime} - {segment.arrivalTime}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {segment.delayRisk > 0.2 ? (
                        <>
                          <AlertTriangle className="w-3 h-3 text-amber-400" />
                          <span className="text-xs font-medium text-amber-400">High Delay Risk</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          <span className="text-xs font-medium text-emerald-400">On Time</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4">
            <Button 
              onClick={() => onStartJourney(route)}
              className="w-full h-14 rounded-2xl text-lg font-bold gap-3 shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform"
            >
              <Play className="w-5 h-5 fill-current" /> Start Journey Now
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RouteDetails;