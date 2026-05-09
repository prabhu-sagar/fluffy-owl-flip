"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Star, Clock, Wallet, Calendar, MapPin, Navigation, 
  Plus, Check, Info, Save, CheckCircle2, XCircle
} from 'lucide-react';
import { TouristPlace, CATEGORY_COLORS } from '@/lib/tourism-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface PlaceDetailsPanelProps {
  place: TouristPlace | null;
  onToggleSelect: (id: string) => void;
  onToggleVisited: (id: string) => void;
  onToggleSkipped: (id: string) => void;
  isSelected: boolean;
  isVisited: boolean;
  isSkipped: boolean;
  onSaveTrip: () => void;
}

const PlaceDetailsPanel = ({ 
  place, 
  onToggleSelect, 
  onToggleVisited, 
  onToggleSkipped, 
  isSelected, 
  isVisited, 
  isSkipped, 
  onSaveTrip 
}: PlaceDetailsPanelProps) => {
  if (!place) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center space-y-4 bg-white">
        <div className="w-20 h-20 rounded-full bg-primary/5 flex items-center justify-center">
          <MapPin className="w-10 h-10 text-primary/20" />
        </div>
        <div>
          <h3 className="text-lg font-black text-slate-900">Select a Destination</h3>
          <p className="text-sm text-slate-500">Click on any marker on the map to view full details and plan your route.</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="h-full flex flex-col bg-white overflow-hidden"
    >
      <div className="h-48 relative shrink-0">
        <img src={place.image} className="w-full h-full object-cover" alt={place.name} />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-6 right-6">
          <Badge className={cn("mb-2 border-none text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest", CATEGORY_COLORS[place.category])}>
            {place.category}
          </Badge>
          <h2 className="text-2xl font-black text-white tracking-tighter">{place.name}</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-100">
              <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
              <span className="text-base font-black text-slate-900">{place.rating}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant={isVisited ? "default" : "outline"}
              onClick={() => onToggleVisited(place.id)}
              className={cn("rounded-xl h-9 gap-2 text-[10px] font-black uppercase", isVisited && "bg-emerald-500 hover:bg-emerald-600 border-none")}
            >
              <CheckCircle2 size={14} /> {isVisited ? 'Visited' : 'Mark Visited'}
            </Button>
            <Button 
              size="sm" 
              variant={isSkipped ? "destructive" : "outline"}
              onClick={() => onToggleSkipped(place.id)}
              className={cn("rounded-xl h-9 gap-2 text-[10px] font-black uppercase", isSkipped && "bg-red-500 hover:bg-red-600 border-none")}
            >
              <XCircle size={14} /> {isSkipped ? 'Skipped' : 'Skip'}
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
            <Info size={14} className="text-primary" /> Overview
          </h3>
          <p className="text-slate-500 text-xs leading-relaxed font-medium">
            {place.description}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: Clock, label: 'Duration', value: place.duration },
            { icon: Wallet, label: 'Entry Fee', value: place.entryFee },
            { icon: Calendar, label: 'Best Time', value: place.bestTime },
            { icon: Navigation, label: 'Distance', value: '12.4 km' }
          ].map((item, i) => (
            <div key={i} className="bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-1">
              <item.icon className="w-3 h-3 text-primary mb-1" />
              <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{item.label}</p>
              <p className="text-[10px] font-bold text-slate-900">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-3 pt-2">
          <Button 
            onClick={() => onToggleSelect(place.id)}
            className={cn(
              "h-12 rounded-2xl font-black gap-2 shadow-lg transition-all",
              isSelected ? "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-100" : "bg-primary hover:bg-primary/90 shadow-primary/20"
            )}
          >
            {isSelected ? <Check size={18} /> : <Plus size={18} />}
            {isSelected ? 'Added to Trip' : 'Add to Trip'}
          </Button>
          <Button variant="outline" className="h-12 rounded-2xl font-bold border-slate-200 gap-2">
            <Navigation size={18} /> Get Directions
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default PlaceDetailsPanel;