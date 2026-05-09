"use client";

import React from 'react';
import { Star, Bookmark, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Destination } from '@/lib/explore-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface DestinationCardProps {
  destination: Destination;
  onExplore: (dest: Destination) => void;
  variant?: 'grid' | 'highlight';
}

const DestinationCard = ({ destination, onExplore, variant = 'grid' }: DestinationCardProps) => {
  const [isSaved, setIsSaved] = React.useState(false);

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className={cn(
        "group relative bg-white rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500",
        variant === 'highlight' ? "w-[300px] shrink-0" : "w-full"
      )}
    >
      {/* Image Section */}
      <div className={cn(
        "relative overflow-hidden",
        variant === 'highlight' ? "h-48" : "aspect-[4/3]"
      )}>
        <img 
          src={destination.image} 
          alt={destination.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {destination.isTrending && (
            <Badge className="bg-primary text-white border-none px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1 shadow-lg">
              <Sparkles size={10} /> Trending Now
            </Badge>
          )}
          {destination.tag && (
            <Badge className="bg-white/20 backdrop-blur-md text-white border-white/30 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
              {destination.tag}
            </Badge>
          )}
        </div>

        {/* Save Button */}
        <button 
          onClick={(e) => { e.stopPropagation(); setIsSaved(!isSaved); }}
          className={cn(
            "absolute top-4 right-4 w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center transition-all border border-white/30",
            isSaved ? "bg-primary text-white border-primary" : "bg-white/20 text-white hover:bg-white/40"
          )}
        >
          <Bookmark size={18} fill={isSaved ? "currentColor" : "none"} />
        </button>
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight">{destination.name}</h3>
            <div className="flex items-center gap-1 mt-1">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span className="text-sm font-black text-slate-700">{destination.rating}</span>
              <span className="text-xs text-slate-400 font-bold ml-1">• {destination.category}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Budget</p>
            <p className="text-xs font-bold text-primary">{destination.budget}</p>
          </div>
        </div>

        {variant === 'grid' && (
          <p className="text-sm text-slate-500 line-clamp-2 font-medium leading-relaxed">
            {destination.description}
          </p>
        )}

        <Button 
          onClick={() => onExplore(destination)}
          className="w-full h-12 rounded-2xl bg-slate-50 hover:bg-primary hover:text-white text-slate-900 font-black text-sm gap-2 transition-all border-none shadow-none group-hover:shadow-lg group-hover:shadow-primary/20"
        >
          Explore <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </motion.div>
  );
};

export default DestinationCard;