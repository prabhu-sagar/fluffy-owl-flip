"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, Clock, Wallet, Calendar, MapPin, Navigation, 
  Plus, Check, ShieldCheck, Sparkles, Utensils, Hotel,
  CloudSun, Info, Save
} from 'lucide-react';
import { TouristPlace, CATEGORY_COLORS } from '@/lib/tourism-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface PlaceDetailsPanelProps {
  place: TouristPlace | null;
  onToggleSelect: (id: string) => void;
  isSelected: boolean;
  onSaveTrip: () => void;
}

const PlaceDetailsPanel = ({ place, onToggleSelect, isSelected, onSaveTrip }: PlaceDetailsPanelProps) => {
  if (!place) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center space-y-4 bg-white/40 backdrop-blur-xl">
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
      className="h-full flex flex-col bg-white/60 backdrop-blur-2xl border-l border-slate-200/50 overflow-hidden"
    >
      {/* Header Image */}
      <div className="h-64 relative shrink-0">
        <img src={place.image} className="w-full h-full object-cover" alt={place.name} />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <Badge className={cn("mb-2 border-none text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest", CATEGORY_COLORS[place.category])}>
            {place.category}
          </Badge>
          <h2 className="text-3xl font-black text-white tracking-tighter">{place.name}</h2>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-100">
              <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
              <span className="text-base font-black text-slate-900">{place.rating}</span>
            </div>
            <span className="text-xs text-slate-400 font-bold">({place.reviews.toLocaleString()} reviews)</span>
          </div>
          <div className="flex items-center gap-2 text-blue-600 bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-100">
            <CloudSun size={16} />
            <span className="text-[10px] font-black uppercase tracking-wider">24°C Clear</span>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
            <Info size={16} className="text-primary" /> Overview
          </h3>
          <p className="text-slate-500 text-sm leading-relaxed font-medium">
            {place.description}
          </p>
        </div>

        {/* Logistics Grid */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: Clock, label: 'Duration', value: place.duration },
            { icon: Wallet, label: 'Entry Fee', value: place.entryFee },
            { icon: Calendar, label: 'Best Time', value: place.bestTime },
            { icon: Navigation, label: 'Distance', value: '12.4 km off-route' }
          ].map((item, i) => (
            <div key={i} className="bg-white/50 p-4 rounded-2xl border border-slate-100 space-y-1 shadow-sm">
              <item.icon className="w-4 h-4 text-primary mb-1" />
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{item.label}</p>
              <p className="text-xs font-bold text-slate-900">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Nearby Services */}
        <div className="space-y-4">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Nearby Services</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-3 p-3 bg-white/50 border border-slate-100 rounded-xl">
              <div className="bg-rose-50 p-2 rounded-lg">
                <Utensils className="text-rose-500 w-4 h-4" />
              </div>
              <p className="text-[10px] font-bold text-slate-700">8 Restaurants</p>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white/50 border border-slate-100 rounded-xl">
              <div className="bg-indigo-50 p-2 rounded-lg">
                <Hotel className="text-indigo-500 w-4 h-4" />
              </div>
              <p className="text-[10px] font-bold text-slate-700">12 Hotels</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-4">
          <Button 
            onClick={() => onToggleSelect(place.id)}
            className={cn(
              "h-14 rounded-2xl font-black gap-2 shadow-xl transition-all",
              isSelected ? "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-100" : "bg-primary hover:bg-primary/90 shadow-primary/20"
            )}
          >
            {isSelected ? <Check size={20} /> : <Plus size={20} />}
            {isSelected ? 'Added' : 'Add Place'}
          </Button>
          <Button variant="outline" className="h-14 rounded-2xl font-bold border-slate-200 gap-2">
            <Navigation size={20} /> Navigate
          </Button>
        </div>
        
        <Button 
          onClick={onSaveTrip}
          variant="secondary" 
          className="w-full h-12 rounded-2xl font-bold gap-2 bg-slate-100 hover:bg-slate-200"
        >
          <Save size={18} /> Save Trip Plan
        </Button>
      </div>
    </motion.div>
  );
};

export default PlaceDetailsPanel;