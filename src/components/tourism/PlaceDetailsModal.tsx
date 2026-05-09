"use client";

import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { TouristPlace, CATEGORY_COLORS } from '@/lib/tourism-data';
import { Star, Clock, Wallet, Calendar, MapPin, Navigation, Plus, Check, Info, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface PlaceDetailsModalProps {
  place: TouristPlace | null;
  isOpen: boolean;
  onClose: () => void;
  onToggleSelect: (id: string) => void;
  isSelected: boolean;
}

const PlaceDetailsModal = ({ place, isOpen, onClose, onToggleSelect, isSelected }: PlaceDetailsModalProps) => {
  if (!place) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl bg-white border-slate-200 rounded-[2.5rem] p-0 overflow-hidden flex flex-col md:flex-row h-[90vh] md:h-[550px]">
        <div className="md:w-1/2 h-[250px] md:h-auto relative shrink-0">
          <img src={place.image} className="w-full h-full object-cover" alt={place.name} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <Badge className={cn("mb-2 border-none text-white", CATEGORY_COLORS[place.category])}>
              {place.category}
            </Badge>
            <h2 className="text-3xl font-black text-white tracking-tight">{place.name}</h2>
          </div>
        </div>

        <div className="md:w-1/2 flex flex-col overflow-hidden bg-white">
          <div className="p-8 space-y-6 overflow-y-auto custom-scrollbar flex-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                <span className="text-lg font-black text-slate-900">{place.rating}</span>
                <span className="text-sm text-slate-400 font-medium">({place.reviews.toLocaleString()} reviews)</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                <ShieldCheck size={14} />
                <span className="text-[10px] font-black uppercase tracking-wider">Verified Spot</span>
              </div>
            </div>

            <p className="text-slate-500 text-sm leading-relaxed">
              {place.description}
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <Clock className="w-3.5 h-3.5" /> Timings
                </div>
                <p className="text-xs font-bold text-slate-900">{place.timings}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <Wallet className="w-3.5 h-3.5" /> Entry Fee
                </div>
                <p className="text-xs font-bold text-slate-900">{place.entryFee}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <Calendar className="w-3.5 h-3.5" /> Best Time
                </div>
                <p className="text-xs font-bold text-slate-900">{place.bestTime}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <MapPin className="w-3.5 h-3.5" /> Duration
                </div>
                <p className="text-xs font-bold text-slate-900">{place.duration}</p>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-3">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nearby Services</h4>
              <div className="flex gap-4">
                <div className="flex-1 text-center">
                  <p className="text-[10px] font-bold text-slate-900">12 Hotels</p>
                  <p className="text-[8px] text-slate-400 uppercase">Within 2km</p>
                </div>
                <div className="w-px h-8 bg-slate-200" />
                <div className="flex-1 text-center">
                  <p className="text-[10px] font-bold text-slate-900">8 Restaurants</p>
                  <p className="text-[8px] text-slate-400 uppercase">Top Rated</p>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="p-8 border-t border-slate-100 bg-white shrink-0 flex flex-row gap-3">
            <Button variant="outline" className="flex-1 rounded-2xl h-12 font-bold border-slate-200 gap-2">
              <Navigation size={18} /> Navigate
            </Button>
            <Button 
              onClick={() => onToggleSelect(place.id)}
              className={cn(
                "flex-1 rounded-2xl h-12 font-black gap-2 shadow-lg transition-all",
                isSelected ? "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-200" : "bg-primary hover:bg-primary/90 shadow-primary/20"
              )}
            >
              {isSelected ? <Check size={18} /> : <Plus size={18} />}
              {isSelected ? 'Added to Trip' : 'Add to Trip'}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PlaceDetailsModal;