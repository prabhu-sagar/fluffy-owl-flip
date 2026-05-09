"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, Layers, ZoomIn, ZoomOut, Compass, Info } from 'lucide-react';
import { TouristPlace, CATEGORY_COLORS } from '@/lib/tourism-data';
import { cn } from '@/lib/utils';

interface TourismMapProps {
  places: TouristPlace[];
  selectedPlaces: string[];
  onPlaceClick: (place: TouristPlace) => void;
  source?: string;
  destination?: string;
}

const TourismMap = ({ places, selectedPlaces, onPlaceClick, source, destination }: TourismMapProps) => {
  const [isSatellite, setIsSatellite] = React.useState(false);
  const [zoom, setZoom] = React.useState(1);

  return (
    <div className="relative w-full h-full bg-slate-100 overflow-hidden rounded-[2.5rem] shadow-inner border border-slate-200">
      {/* Map Background */}
      <div className="absolute inset-0 transition-all duration-700">
        {isSatellite ? (
          <img 
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80" 
            className="w-full h-full object-cover brightness-50 scale-110"
            alt="Satellite View"
          />
        ) : (
          <div className="w-full h-full bg-[#f1f5f9] relative">
            {/* Grid Pattern for Map Feel */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          </div>
        )}
      </div>

      {/* Route Visualization */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 800 600">
        <defs>
          <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Main Route Path */}
        <motion.path
          d="M 100 150 Q 400 300 750 450"
          fill="none"
          stroke="url(#routeGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="10,10"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          filter="url(#glow)"
        />

        {/* Connection lines to selected places */}
        {places.filter(p => selectedPlaces.includes(p.id)).map((p, i) => (
          <motion.line
            key={i}
            x1={p.lat} y1={p.lng}
            x2={p.lat + 20} y2={p.lng + 20}
            stroke="#6366f1"
            strokeWidth="1"
            strokeDasharray="4,4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
          />
        ))}
      </svg>

      {/* Markers */}
      <div className="absolute inset-0 z-20">
        {places.map((place) => {
          const isSelected = selectedPlaces.includes(place.id);
          return (
            <motion.div
              key={place.id}
              className="absolute cursor-pointer group"
              style={{ left: `${(place.lat / 800) * 100}%`, top: `${(place.lng / 600) * 100}%` }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.2, zIndex: 50 }}
              onClick={() => onPlaceClick(place)}
            >
              <div className="relative flex flex-col items-center">
                <AnimatePresence>
                  {isSelected && (
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-2 -right-2 w-4 h-4 bg-primary rounded-full border-2 border-white z-10 flex items-center justify-center"
                    >
                      <div className="w-1.5 h-1.5 bg-white rounded-full" />
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <div className={cn(
                  "w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg transition-all border-2 border-white",
                  CATEGORY_COLORS[place.category],
                  isSelected ? "ring-4 ring-primary/30 scale-110" : "group-hover:ring-4 group-hover:ring-white/50"
                )}>
                  <MapPin className="text-white w-5 h-5" />
                </div>
                
                <div className="mt-2 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-slate-200 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <p className="text-[10px] font-black whitespace-nowrap text-slate-900">{place.name}</p>
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Source & Destination Labels */}
        <div className="absolute left-[10%] top-[20%] bg-white p-3 rounded-2xl shadow-xl border border-slate-100">
          <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Source</p>
          <p className="text-xs font-bold">{source || 'Hyderabad'}</p>
        </div>
        <div className="absolute right-[10%] bottom-[20%] bg-white p-3 rounded-2xl shadow-xl border border-slate-100">
          <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Destination</p>
          <p className="text-xs font-bold">{destination || 'Bangalore'}</p>
        </div>
      </div>

      {/* Map Controls */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-30">
        <div className="bg-white/80 backdrop-blur-xl p-2 rounded-2xl shadow-2xl border border-white/20 flex flex-col gap-2">
          <button onClick={() => setZoom(z => Math.min(z + 0.2, 2))} className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-600"><ZoomIn size={20} /></button>
          <div className="h-px bg-slate-200 mx-2" />
          <button onClick={() => setZoom(z => Math.max(z - 0.2, 0.5))} className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-600"><ZoomOut size={20} /></button>
        </div>
        <button 
          onClick={() => setIsSatellite(!isSatellite)}
          className={cn(
            "p-3 rounded-2xl shadow-2xl border transition-all",
            isSatellite ? "bg-primary text-white border-primary" : "bg-white/80 backdrop-blur-xl text-slate-600 border-white/20"
          )}
        >
          <Layers size={20} />
        </button>
      </div>

      {/* Bottom Info Bar */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-xl px-6 py-3 rounded-full shadow-2xl border border-white/20 flex items-center gap-6 z-30">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Live Route Active</span>
        </div>
        <div className="h-4 w-px bg-slate-200" />
        <div className="flex items-center gap-2">
          <Navigation className="w-4 h-4 text-primary" />
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">620 KM Total</span>
        </div>
      </div>
    </div>
  );
};

export default TourismMap;