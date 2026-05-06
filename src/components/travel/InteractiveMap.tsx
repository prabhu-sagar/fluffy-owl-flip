"use client";

import React from 'react';
import { MapPin, Navigation } from 'lucide-react';

const InteractiveMap = () => {
  return (
    <div className="glass-card rounded-[2rem] overflow-hidden h-[400px] relative group">
      {/* Mock Map Background */}
      <div className="absolute inset-0 bg-[#0f111a]">
        <svg className="w-full h-full opacity-20" viewBox="0 0 800 400">
          <path d="M0 200 Q 200 100 400 200 T 800 200" fill="none" stroke="#6366f1" strokeWidth="2" />
          <path d="M0 100 Q 300 300 600 100" fill="none" stroke="#2d2f45" strokeWidth="1" />
          <circle cx="200" cy="150" r="4" fill="#6366f1" />
          <circle cx="500" cy="250" r="4" fill="#10b981" />
        </svg>
      </div>

      {/* Route Overlay */}
      <div className="absolute inset-0 p-8 flex flex-col justify-between pointer-events-none">
        <div className="flex justify-between items-start">
          <div className="bg-black/40 backdrop-blur-md p-3 rounded-2xl border border-white/5">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Source</p>
            <p className="font-bold">Hyderabad</p>
          </div>
          <div className="bg-black/40 backdrop-blur-md p-3 rounded-2xl border border-white/5 text-right">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Destination</p>
            <p className="font-bold">Bangalore</p>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="bg-primary/90 backdrop-blur-md px-6 py-3 rounded-full shadow-2xl shadow-primary/40 flex items-center gap-3 pointer-events-auto cursor-pointer hover:scale-105 transition-transform">
            <Navigation className="w-4 h-4" />
            <span className="font-bold text-sm">View Live Route</span>
          </div>
        </div>
      </div>

      {/* Floating Info */}
      <div className="absolute top-1/2 right-8 -translate-y-1/2 glass-card p-4 rounded-2xl w-48 pointer-events-none">
        <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Delay Prediction</p>
        <p className="text-amber-400 font-bold text-sm">Moderate Delay</p>
        <p className="text-xs text-slate-300 mt-1">30 min probability</p>
        <div className="mt-3 h-1 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-amber-400 w-2/3" />
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;