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
import { Plane, Train, Bus, Car, MapPin, Clock, AlertTriangle, CheckCircle2, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { showSuccess } from '@/utils/toast';

interface RouteDetailsProps {
  route: TravelRoute | null;
  isOpen: boolean;
  onClose: () => void;
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

const RouteDetails = ({ route, isOpen, onClose }: RouteDetailsProps) => {
  if (!route) return null;

  const handleBook = () => {
    showSuccess("Trip booked successfully! Check 'My Trips' for details.");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-white border-slate-200 text-slate-900 rounded-[2rem] shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-3 text-slate-900">
            Journey Breakdown
            <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full uppercase tracking-wider">
              {route.type}
            </span>
          </DialogTitle>
          <DialogDescription className="text-slate-500">
            AI-optimized itinerary for your trip.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-8 py-4 max-h-[60vh] overflow-y-auto custom-scrollbar pr-2">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Total Time</p>
              <p className="text-lg font-bold text-slate-900">{Math.floor(route.totalDuration / 60)}h {Math.round(route.totalDuration % 60)}m</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Total Cost</p>
              <p className="text-lg font-bold text-primary">₹{route.totalCost.toLocaleString()}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">CO₂ Saved</p>
              <p className="text-lg font-bold text-emerald-600">{route.co2Saved} kg</p>
            </div>
          </div>

          <div className="relative space-y-6 before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-primary before:to-emerald-500">
            {route.segments.map((segment, idx) => (
              <div key={idx} className="relative pl-12 group">
                <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-white border-2 border-primary flex items-center justify-center z-10 group-last:border-emerald-500">
                  <ModeIcon mode={segment.mode} />
                </div>
                
                <div className="glass-card p-5 rounded-2xl border-slate-100 hover:border-primary/30 transition-all shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-bold text-lg capitalize text-slate-900">{segment.mode} Journey</h4>
                      <p className="text-xs text-slate-500">{segment.from} → {segment.to}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">₹{segment.cost}</p>
                      <p className="text-[10px] text-slate-400">{segment.duration} mins</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 pt-3 border-t border-slate-50">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span className="text-xs font-medium text-slate-600">{segment.departureTime} - {segment.arrivalTime}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {segment.delayRisk > 0.2 ? (
                        <>
                          <AlertTriangle className="w-3 h-3 text-amber-500" />
                          <span className="text-xs font-medium text-amber-600">High Delay Risk</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                          <span className="text-xs font-medium text-emerald-600">On Time</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <DialogFooter className="pt-4 border-t border-slate-100">
          <Button variant="ghost" onClick={onClose} className="rounded-xl text-slate-500">
            Cancel
          </Button>
          <Button onClick={handleBook} className="rounded-xl px-8 gap-2 shadow-lg shadow-primary/20">
            <CreditCard className="w-4 h-4" /> Book This Route
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RouteDetails;