"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Star, MapPin, Navigation, 
  Plus, Check, Info, CheckCircle2, XCircle,
  Users, CloudSun, Sparkles, ArrowRight
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

  // Mock distance calculation
  const mockDistance = (Math.random() * 15 + 2).toFixed(1);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="h-full flex flex-col bg-white overflow-hidden"
    >
      {/* Hero Image Section */}
      <div className="h-64 relative shrink-0">
        <img src={place.image} className="w-full h-full object-cover" alt={place.name} />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
        <div className="absolute bottom-6 left-8 right-8">
          <Badge className={cn("mb-3 border-none text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg", CATEGORY_COLORS[place.category])}>
            {place.category}
          </Badge>
          <h2 className="text-4xl font-black text-white tracking-tighter leading-none">{place.name}</h2>
          <div className="flex items-center gap-2 mt-3 text-white/80">
            <MapPin size={14} className="text-primary" />
            <span className="text-xs font-bold">{mockDistance} km from your location</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
        {/* Header Stats */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-amber-50 px-4 py-2 rounded-2xl border border-amber-100">
              <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
              <span className="text-lg font-black text-slate-900">{place.rating}</span>
            </div>
            <span className="text-xs text-slate-400 font-bold">({place.reviews.toLocaleString()} reviews)</span>
          </div>
          
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant={isVisited ? "default" : "outline"}
              onClick={() => onToggleVisited(place.id)}
              className={cn("rounded-xl h-10 gap-2 text-[10px] font-black uppercase tracking-wider", isVisited && "bg-emerald-500 hover:bg-emerald-600 border-none shadow-lg shadow-emerald-100")}
            >
              <CheckCircle2 size={14} /> {isVisited ? 'Visited' : 'Mark Visited'}
            </Button>
            <Button 
              size="sm" 
              variant={isSkipped ? "destructive" : "outline"}
              onClick={() => onToggleSkipped(place.id)}
              className={cn("rounded-xl h-10 gap-2 text-[10px] font-black uppercase tracking-wider", isSkipped && "bg-red-500 hover:bg-red-600 border-none shadow-lg shadow-red-100")}
            >
              <XCircle size={14} /> {isSkipped ? 'Skipped' : 'Skip'}
            </Button>
          </div>
        </div>

        {/* AI Insights Section (New Feature) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-50 p-5 rounded-[2rem] border border-slate-100 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Users size={14} className="text-primary" /> Live Crowd
              </h4>
              <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-100 text-[9px] font-black">LOW</Badge>
            </div>
            <p className="text-sm font-bold text-slate-700">Best time to visit is now. 15% less busy than usual.</p>
          </div>

          <div className="bg-slate-50 p-5 rounded-[2rem] border border-slate-100 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <CloudSun size={14} className="text-amber-500" /> Weather
              </h4>
              <span className="text-xs font-black text-slate-900">24°C</span>
            </div>
            <p className="text-sm font-bold text-slate-700">Clear skies. Perfect for outdoor photography.</p>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-3">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
            <Info size={16} className="text-primary" /> About this place
          </h3>
          <p className="text-slate-500 text-sm leading-relaxed font-medium">
            {place.description} This iconic landmark offers a unique blend of history and culture. Visitors typically spend around {place.duration} exploring the grounds.
          </p>
        </div>

        {/* AI Tip */}
        <div className="bg-primary/5 p-6 rounded-[2.5rem] border border-primary/10 relative overflow-hidden">
          <div className="absolute -right-4 -top-4 opacity-10">
            <Sparkles size={80} className="text-primary" />
          </div>
          <div className="relative z-10 space-y-2">
            <h4 className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-2">
              <Sparkles size={14} /> AI Travel Tip
            </h4>
            <p className="text-sm text-slate-600 font-medium leading-relaxed">
              We recommend visiting during the "{place.bestTime}" for the most pleasant experience. Don't forget to check out the local food stalls nearby!
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
          <Button 
            onClick={() => onToggleSelect(place.id)}
            className={cn(
              "h-14 rounded-2xl font-black gap-3 shadow-xl transition-all text-base",
              isSelected ? "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-100" : "bg-primary hover:bg-primary/90 shadow-primary/20"
            )}
          >
            {isSelected ? <Check size={20} /> : <Plus size={20} />}
            {isSelected ? 'Added to Trip' : 'Add to Trip'}
          </Button>
          <Button variant="outline" className="h-14 rounded-2xl font-bold border-slate-200 gap-3 text-base hover:bg-slate-50">
            <Navigation size={20} className="text-primary" /> Get Directions <ArrowRight size={16} className="ml-auto opacity-30" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default PlaceDetailsPanel;