"use client";

import React from 'react';
import { MapPin, Navigation, Radio, Car, Plane, Train, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface InteractiveMapProps {
  source?: string;
  destination?: string;
}

const InteractiveMap = ({ source = "Hyderabad", destination = "Bangalore" }: InteractiveMapProps) => {
  const [isTracking, setIsTracking] = React.useState(false);

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
          
          {/* Live Tracking Vehicle */}
          <AnimatePresence>
            {isTracking && (
              <motion.g
                initial={{ offsetDistance: "0%" }}
                animate={{ offsetDistance: "100%" }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                style={{ offsetPath: "path('M150 250 Q 400 100 650 250')" }}
              >
                <circle r="12" fill="#6366f1" fillOpacity="0.2" />
                <circle r="4" fill="#6366f1" />
                <motion.circle 
                  r="16" 
                  stroke="#6366f1" 
                  strokeWidth="1" 
                  fill="none"
                  animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </motion.g>
            )}
          </AnimatePresence>

          <path d="M0 100 Q 300 300 600 100" fill="none" stroke="#2d2f45" strokeWidth="1" />
          
          <circle cx="150" cy="250" r="4" fill="#6366f1" />
          <circle cx="650" cy="250" r="4" fill="#10b981" />
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
            <p className="font-bold text-lg">{source}</p>
          </div>
          <div className="bg-black/60 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-2xl text-right">
            <div className="flex items-center gap-2 justify-end mb-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Destination</p>
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <p className="font-bold text-lg">{destination}</p>
          </div>
        </div>

        <div className="flex justify-center">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsTracking(!isTracking)}
            className={cn(
              "px-8 py-4 rounded-full shadow-2xl flex items-center gap-3 pointer-events-auto cursor-pointer transition-all",
              isTracking ? "bg-emerald-500 shadow-emerald-500/20" : "bg-primary shadow-primary/20"
            )}
          >
            {isTracking ? (
              <>
                <Navigation className="w-5 h-5 animate-bounce" />
                <span className="font-bold">Tracking Live...</span>
              </>
            ) : (
              <>
                <Radio className="w-5 h-5 animate-pulse" />
                <span className="font-bold">Track Live Location</span>
              </>
            )}
          </motion.div>
        </div>
      </div>

      {/* Live Status Card */}
      <AnimatePresence>
        {isTracking && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="absolute top-1/2 right-8 -translate-y-1/2 glass-card p-5 rounded-2xl w-64 pointer-events-none border-l-4 border-l-primary"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <p className="text-[10px] font-bold text-slate-400 uppercase">Live Status</p>
              </div>
              <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded-full font-bold">ON TIME</span>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Current Speed</span>
                <span className="text-xs font-bold">84 km/h</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Next Stop</span>
                <span className="text-xs font-bold">Anantapur</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">ETA</span>
                <span className="text-xs font-bold text-emerald-400">14:30 PM</span>
              </div>
            </div>

            <div className="mt-4 h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-primary" 
                initial={{ width: 0 }}
                animate={{ width: '45%' }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

import { cn } from '@/lib/utils';
export default InteractiveMap;