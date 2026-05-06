"use client";

import React from 'react';
import { TravelRoute, TransportMode } from '@/lib/mock-data';
import { Plane, Train, Bus, Car, ChevronRight, Clock, Wallet, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface RouteCardProps {
  route: TravelRoute;
  index: number;
  onViewDetails: (route: TravelRoute) => void;
}

const ModeIcon = ({ mode }: { mode: TransportMode }) => {
  switch (mode) {
    case 'flight': return <Plane className="w-4 h-4" />;
    case 'train': return <Train className="w-4 h-4" />;
    case 'bus': return <Bus className="w-4 h-4" />;
    case 'cab': return <Car className="w-4 h-4" />;
    default: return <ChevronRight className="w-4 h-4" />;
  }
};

const RouteCard = ({ route, index, onViewDetails }: RouteCardProps) => {
  const formatDuration = (mins: number) => {
    const h = Math.floor(mins / 60);
    const m = Math.round(mins % 60);
    return `${h}h ${m}m`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={() => onViewDetails(route)}
      className="glass-card p-6 rounded-[2rem] hover:border-primary/50 transition-all cursor-pointer group relative overflow-hidden bg-white"
    >
      {route.type === 'recommended' && (
        <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold px-4 py-1.5 rounded-bl-2xl uppercase tracking-wider">
          Recommended
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex-1 space-y-6">
          <div className="flex items-center gap-3">
            {route.segments.map((seg, i) => (
              <React.Fragment key={i}>
                <div className="flex items-center gap-2 bg-slate-100 px-3 py-2 rounded-xl border border-slate-200 text-slate-700">
                  <ModeIcon mode={seg.mode} />
                </div>
                {i < route.segments.length - 1 && (
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="flex items-center gap-8">
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest flex items-center gap-1">
                <Clock className="w-3 h-3" /> Duration
              </p>
              <p className="text-lg font-black text-slate-900">{formatDuration(route.totalDuration)}</p>
              <p className="text-[10px] text-slate-500 font-bold">Arrival {route.segments[route.segments.length-1].arrivalTime}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest flex items-center gap-1">
                <Wallet className="w-3 h-3" /> Total Cost
              </p>
              <p className="text-lg font-black text-primary">₹{Math.round(route.totalCost).toLocaleString()}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Reliability
              </p>
              <p className={cn(
                "text-lg font-black",
                route.reliabilityScore > 90 ? "text-emerald-600" : "text-amber-600"
              )}>{Math.round(route.reliabilityScore)}%</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-4">
          <button className="bg-primary/10 text-primary border border-primary/20 px-6 py-2 rounded-xl font-bold text-sm group-hover:bg-primary group-hover:text-white transition-all">
            View Route
          </button>
          <p className="text-[10px] text-slate-500 font-bold">Compare All Routes →</p>
        </div>
      </div>
    </motion.div>
  );
};

export default RouteCard;