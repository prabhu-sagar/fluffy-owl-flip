"use client";

import React from 'react';
import { Map, Navigation, Wallet, Clock, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface TripSummaryProps {
  selectedCount: number;
  distance: number;
  duration: string;
  budget: number;
  aiScore: number;
}

const TripSummary = ({ selectedCount, distance, duration, budget, aiScore }: TripSummaryProps) => {
  return (
    <div className="p-6 bg-white/80 backdrop-blur-xl border-t border-slate-200/50">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
          <Map className="text-primary w-4 h-4" /> Trip Summary
        </h3>
        <div className="flex items-center gap-1.5 bg-primary/10 px-3 py-1 rounded-full">
          <Sparkles className="w-3 h-3 text-primary" />
          <span className="text-[10px] font-black text-primary uppercase tracking-widest">AI Score: {aiScore}%</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest">
            <Navigation className="w-3 h-3" /> Distance
          </div>
          <p className="text-lg font-black text-slate-900">{distance} km</p>
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest">
            <Clock className="w-3 h-3" /> Duration
          </div>
          <p className="text-lg font-black text-slate-900">{duration}</p>
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest">
            <Wallet className="w-3 h-3" /> Est. Budget
          </div>
          <p className="text-lg font-black text-primary">₹{budget.toLocaleString()}</p>
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest">
            <Map className="w-3 h-3" /> Stops
          </div>
          <p className="text-lg font-black text-slate-900">{selectedCount} Places</p>
        </div>
      </div>
    </div>
  );
};

export default TripSummary;