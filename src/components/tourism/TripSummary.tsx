"use client";

import React from 'react';
import { Map, Navigation, Wallet, Clock, Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { showSuccess } from '@/utils/toast';

interface TripSummaryProps {
  selectedCount: number;
  distance: number;
  duration: string;
  budget: number;
  aiScore: number;
  onComplete?: () => void;
}

const TripSummary = ({ selectedCount, distance, duration, budget, aiScore, onComplete }: TripSummaryProps) => {
  const navigate = useNavigate();

  const handleComplete = () => {
    if (onComplete) {
      onComplete();
    } else {
      showSuccess("Trip completed and saved!");
      navigate('/trips');
    }
  };

  return (
    <div className="p-6 bg-white/80 backdrop-blur-xl border-t border-slate-200/50 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
          <Map className="text-primary w-4 h-4" /> Trip Summary
        </h3>
        <div className="flex items-center gap-1.5 bg-primary/10 px-3 py-1 rounded-full">
          <Sparkles className="w-3 h-3 text-primary" />
          <span className="text-[10px] font-black text-primary uppercase tracking-widest">AI Score: {aiScore}%</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest">
            <Navigation className="w-3 h-3" /> Distance
          </div>
          <p className="text-lg font-black text-slate-900">{distance} km</p>
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest">
            <Wallet className="w-3 h-3" /> Est. Budget
          </div>
          <p className="text-lg font-black text-primary">₹{budget.toLocaleString()}</p>
        </div>
      </div>

      <Button 
        disabled={selectedCount === 0}
        onClick={handleComplete}
        className="w-full h-12 rounded-2xl font-black gap-2 shadow-xl shadow-primary/20"
      >
        <CheckCircle2 size={18} /> Complete & Save Trip
      </Button>
    </div>
  );
};

export default TripSummary;