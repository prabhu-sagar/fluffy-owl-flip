"use client";

import React from 'react';
import { MapPin, Navigation, Radio } from 'lucide-react';
import { motion } from 'framer-motion';

const InteractiveMap = () => {
  return (
    <div className="glass-card rounded-[2rem] overflow-hidden h-[400px] relative group">
      {/* Mock Map Background */}
      <div className="absolute inset-0 bg-[#0f111a]">
        <svg className="w-full h-full opacity-20" viewBox="0 0 800 400">
          <motion.path 
            d="M150 250 Q 400 100 650 250" 
            fill="none" 
            stroke="#6366f1" 
            strokeWidth="3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          />
          <path d="M0 100 Q 300 300 600 100" fill="none" stroke="#2d2f45" strokeWidth="1" />
          
          {/* Pulse Effect for Source */}
          <circle cx="150" cy="250" r="4" fill="#6366f1" />
          <motion.circle 
            cx="150" cy="250" r="12" 
            stroke="#6366f1" 
            strokeWidth="1" 
            fill="none"
            animate={{ scale: [1, 2], opacity: [0.5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />

          {/* Pulse Effect for Destination */}
          <circle cx="650" cy="250" r="4" fill="#10b981" />
          <motion.circle 
            cx="650" cy="250" r="12" 
            stroke="#10b981" 
            strokeWidth="1" 
            fill="none"
            animate={{ scale: [1, 2], opacity: [0.5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.75 }}
          />
        </svg>
      </div>

      {/* Route Overlay */}
      <div className="absolute inset-0 p-8 flex flex-col justify-between pointer-events-none">
        <div className="flex justify-between items-start">
          <div className="bg-black/60 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-2xl">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Origin</p>
            </div>
            <p className="font-bold text-lg">Hyderabad</p>
          </div>
          <div className="bg-black/60 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-2xl text-right">
            <div className="flex items-center gap-2 justify-end mb-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Destination</p>
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <p className="font-bold text-lg">Bangalore</p>
          </div>
        </div>

        <div className="flex justify-center">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary px-8 py-4 rounded-full shadow-[0_0_30px_rgba(99,102,241,0.4)] flex items-center gap-3 pointer-events-auto cursor-pointer"
          >
            <Radio className="w-5 h-5 animate-pulse" />
            <span className="font-bold">Track Live Location</span>
          </motion.div>
        </div>
      </div>

      {/* Floating Info */}
      <div className="absolute top-1/2 right-8 -translate-y-1/2 glass-card p-5 rounded-2xl w-56 pointer-events-none border-l-4 border-l-amber-400">
        <div className="flex items-center gap-2 mb-3">
          <Radio className="w-4 h-4 text-amber-400" />
          <p className="text-[10px] font-bold text-slate-400 uppercase">Live Traffic Alert</p>
        </div>
        <p className="text-amber-400 font-bold text-sm">Heavy Congestion</p>
        <p className="text-xs text-slate-300 mt-1">+24 mins expected delay near Hebbal Flyover</p>
        <div className="mt-4 h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-amber-400" 
            initial={{ width: 0 }}
            animate={{ width: '85%' }}
            transition={{ duration: 1 }}
          />
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;