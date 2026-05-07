"use client";

import React from 'react';
import { MapPinOff } from 'lucide-react';
import { motion } from 'framer-motion';

const InteractiveMap = ({ source, destination, segments, isSatellite }) => {
  if (!segments || segments.length === 0) {
    return (
      <div className="glass-card rounded-[2rem] overflow-hidden h-full relative flex flex-col items-center justify-center bg-slate-50 border-slate-200 text-slate-400">
        <MapPinOff className="w-12 h-12 mb-4 opacity-20" />
        <p className="font-bold text-sm">No route path available</p>
      </div>
    );
  }

  const getModeColor = (mode) => {
    if (isSatellite) return "#ffffff";
    switch (mode) {
      case 'flight': return "#3b82f6";
      case 'train': return "#6366f1";
      case 'cab': return "#10b981";
      case 'bus': return "#f59e0b";
      default: return "#94a3b8";
    }
  };

  const getSegmentPath = (index, total) => {
    const startX = 100 + (index * (600 / total));
    const endX = 100 + ((index + 1) * (600 / total));
    const midX = (startX + endX) / 2;
    return `M${startX} 200 Q ${midX} 100 ${endX} 200`;
  };

  return (
    <div className="w-full h-full relative group overflow-hidden bg-slate-100">
      {isSatellite && (
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80" 
            className="w-full h-full object-cover brightness-50"
            alt="Satellite View"
          />
          <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay" />
        </div>
      )}

      <div className="absolute inset-0 z-10">
        <svg className="w-full h-full" viewBox="0 0 800 400">
          {!isSatellite && (
            <path d="M0 100 Q 300 300 600 100" fill="none" stroke="#e2e8f0" strokeWidth="1" />
          )}

          {segments.map((seg, i) => (
            <g key={i}>
              <motion.path 
                d={getSegmentPath(i, segments.length)} 
                fill="none" 
                stroke={getModeColor(seg.mode)} 
                strokeWidth={isSatellite ? "3" : "4"}
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: i * 0.5 }}
              />
              <circle cx={100 + (i * (600 / segments.length))} cy="200" r="4" fill="white" stroke={getModeColor(seg.mode)} strokeWidth="2" />
            </g>
          ))}
          
          <circle cx="700" cy="200" r="6" fill="#10b981" stroke="white" strokeWidth="2" />
          
          {isSatellite && (
            <motion.g
              animate={{ x: [0, 600] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <circle cx="100" cy="200" r="4" fill="#3b82f6" />
              <motion.circle 
                cx="100" cy="200" r="12" 
                stroke="#3b82f6" strokeWidth="1" fill="none"
                animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.g>
          )}
        </svg>
      </div>

      <div className="absolute inset-0 p-8 flex flex-col justify-between pointer-events-none z-20">
        <div className="flex justify-between items-start">
          <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-slate-200 shadow-lg">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Origin</p>
            <p className="font-bold text-slate-900">{source || "Source"}</p>
          </div>
          
          <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-slate-200 shadow-lg text-right">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Destination</p>
            <p className="font-bold text-slate-900">{destination || "Destination"}</p>
          </div>
        </div>

        {isSatellite && (
          <div className="flex justify-center">
            <div className="bg-black/60 backdrop-blur-md px-6 py-2 rounded-full border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.2em]">
              Live Satellite Tracking Active
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractiveMap;