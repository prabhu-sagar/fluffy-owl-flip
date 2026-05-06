"use client";

import React from 'react';
import { Navigation, Radio, MapPinOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { RouteSegment } from '@/lib/mock-data';

interface InteractiveMapProps {
  source?: string;
  destination?: string;
  segments?: RouteSegment[];
}

const InteractiveMap = ({ source, destination, segments }: InteractiveMapProps) => {
  const [isTracking, setIsTracking] = React.useState(false);

  if (!segments || segments.length === 0) {
    return (
      <div className="glass-card rounded-[2rem] overflow-hidden h-[400px] relative flex flex-col items-center justify-center bg-slate-50 border-slate-200 text-slate-400">
        <MapPinOff className="w-12 h-12 mb-4 opacity-20" />
        <p className="font-bold text-sm">No route path available</p>
        <p className="text-xs">Select a route to view the map visualization</p>
      </div>
    );
  }

  // Determine path style based on primary mode
  const primaryMode = segments.find(s => s.mode === 'flight') ? 'flight' : 
                  segments.find(s => s.mode === 'train') ? 'train' : 'cab';

  const getPathD = () => {
    if (primaryMode === 'flight') return "M150 250 Q 400 50 650 250"; // High arc
    if (primaryMode === 'train') return "M150 250 Q 400 200 650 250"; // Low arc
    return "M150 250 L 650 250"; // Straight line for road
  };

  const getStrokeColor = () => {
    if (primaryMode === 'flight') return "#3b82f6"; // Blue
    if (primaryMode === 'train') return "#6366f1"; // Indigo
    return "#10b981"; // Emerald
  };

  return (
    <div className="glass-card rounded-[2rem] overflow-hidden h-[400px] relative group bg-slate-50 border-slate-200">
      {/* Mock Map Background */}
      <div className="absolute inset-0">
        <svg className="w-full h-full opacity-40" viewBox="0 0 800 400">
          <motion.path 
            d={getPathD()} 
            fill="none" 
            stroke={getStrokeColor()} 
            strokeWidth="3"
            strokeDasharray={primaryMode === 'cab' ? "8 8" : "0"}
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
                style={{ offsetPath: `path('${getPathD()}')` }}
              >
                <circle r="12" fill={getStrokeColor()} fillOpacity="0.1" />
                <circle r="4" fill={getStrokeColor()} />
                <motion.circle 
                  r="16" 
                  stroke={getStrokeColor()} 
                  strokeWidth="1" 
                  fill="none"
                  animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </motion.g>
            )}
          </AnimatePresence>

          <path d="M0 100 Q 300 300 600 100" fill="none" stroke="#e2e8f0" strokeWidth="1" />
          
          <circle cx="150" cy="250" r="5" fill={getStrokeColor()} />
          <circle cx="650" cy="250" r="5" fill="#10b981" />
        </svg>
      </div>

      {/* Route Overlay */}
      <div className="absolute inset-0 p-8 flex flex-col justify-between pointer-events-none">
        <div className="flex justify-between items-start">
          <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-slate-200 shadow-lg">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Origin</p>
            </div>
            <p className="font-bold text-lg text-slate-900">{source || "Source"}</p>
          </div>
          <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-slate-200 shadow-lg text-right">
            <div className="flex items-center gap-2 justify-end mb-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Destination</p>
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <p className="font-bold text-lg text-slate-900">{destination || "Destination"}</p>
          </div>
        </div>

        <div className="flex justify-center">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsTracking(!isTracking)}
            className={cn(
              "px-8 py-4 rounded-full shadow-xl flex items-center gap-3 pointer-events-auto cursor-pointer transition-all",
              isTracking ? "bg-emerald-500 text-white shadow-emerald-500/20" : "bg-primary text-white shadow-primary/20"
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
            className="absolute top-1/2 right-8 -translate-y-1/2 bg-white/95 backdrop-blur-md p-5 rounded-2xl w-64 pointer-events-none border border-slate-200 shadow-xl border-l-4 border-l-primary"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <p className="text-[10px] font-bold text-slate-400 uppercase">Live Status</p>
              </div>
              <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">ON TIME</span>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">Current Speed</span>
                <span className="text-xs font-bold text-slate-900">
                  {primaryMode === 'flight' ? '840 km/h' : primaryMode === 'train' ? '110 km/h' : '65 km/h'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">Mode</span>
                <span className="text-xs font-bold text-slate-900 capitalize">{primaryMode}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">ETA</span>
                <span className="text-xs font-bold text-emerald-600">On Schedule</span>
              </div>
            </div>

            <div className="mt-4 h-1.5 bg-slate-100 rounded-full overflow-hidden">
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

export default InteractiveMap;