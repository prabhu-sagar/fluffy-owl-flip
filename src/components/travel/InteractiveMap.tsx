"use client";

import React from 'react';
import { Navigation, Radio, MapPinOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { RouteSegment, TransportMode } from '@/lib/mock-data';

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

  const getModeColor = (mode: TransportMode) => {
    switch (mode) {
      case 'flight': return "#3b82f6"; // Blue
      case 'train': return "#6366f1"; // Indigo
      case 'cab': return "#10b981"; // Emerald
      case 'bus': return "#f59e0b"; // Amber
      default: return "#94a3b8";
    }
  };

  const getSegmentPath = (index: number, total: number, mode: TransportMode) => {
    const startX = 150 + (index * (500 / total));
    const endX = 150 + ((index + 1) * (500 / total));
    const midX = (startX + endX) / 2;
    
    let y = 250;
    let controlY = 250;

    if (mode === 'flight') controlY = 50;
    else if (mode === 'train') controlY = 180;
    else if (mode === 'bus') controlY = 230;

    return `M${startX} 250 Q ${midX} ${controlY} ${endX} 250`;
  };

  return (
    <div className="glass-card rounded-[2rem] overflow-hidden h-[400px] relative group bg-slate-50 border-slate-200">
      {/* Mock Map Background */}
      <div className="absolute inset-0">
        <svg className="w-full h-full opacity-60" viewBox="0 0 800 400">
          {/* Background Grid/Lines */}
          <path d="M0 100 Q 300 300 600 100" fill="none" stroke="#e2e8f0" strokeWidth="1" />
          <path d="M100 0 Q 400 400 700 0" fill="none" stroke="#e2e8f0" strokeWidth="1" />

          {/* Multi-mode Route Paths */}
          {segments.map((seg, i) => (
            <g key={i}>
              <motion.path 
                d={getSegmentPath(i, segments.length, seg.mode)} 
                fill="none" 
                stroke={getModeColor(seg.mode)} 
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={seg.mode === 'cab' || seg.mode === 'bus' ? "8 8" : "0"}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: i * 0.5 }}
              />
              {/* Segment Connection Points */}
              <circle cx={150 + (i * (500 / segments.length))} cy="250" r="4" fill="white" stroke={getModeColor(seg.mode)} strokeWidth="2" />
            </g>
          ))}
          
          {/* Final Destination Point */}
          <circle cx="650" cy="250" r="6" fill="#10b981" stroke="white" strokeWidth="2" />

          {/* Live Tracking Vehicle */}
          <AnimatePresence>
            {isTracking && (
              <motion.g
                initial={{ offsetDistance: "0%" }}
                animate={{ offsetDistance: "100%" }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                style={{ offsetPath: `path('${getSegmentPath(0, 1, segments[0].mode)}')` }} // Simplified tracking for demo
              >
                <circle r="12" fill={getModeColor(segments[0].mode)} fillOpacity="0.1" />
                <circle r="4" fill={getModeColor(segments[0].mode)} />
                <motion.circle 
                  r="16" 
                  stroke={getModeColor(segments[0].mode)} 
                  strokeWidth="1" 
                  fill="none"
                  animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </motion.g>
            )}
          </AnimatePresence>
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
          
          {/* Legend */}
          <div className="bg-white/90 backdrop-blur-md p-3 rounded-2xl border border-slate-200 shadow-lg flex flex-col gap-2">
            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Route Legend</p>
            <div className="flex items-center gap-2">
              <div className="w-3 h-1 rounded-full bg-[#3b82f6]" /> <span className="text-[10px] font-bold">Flight</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-1 rounded-full bg-[#6366f1]" /> <span className="text-[10px] font-bold">Train</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-1 rounded-full bg-[#10b981] border-dashed border-t-2" /> <span className="text-[10px] font-bold">Cab</span>
            </div>
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
    </div>
  );
};

export default InteractiveMap;