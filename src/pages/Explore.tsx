"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import TourismMap from '@/components/tourism/TourismMap';
import PlaceDetailsPanel from '@/components/tourism/PlaceDetailsPanel';
import TripSummary from '@/components/tourism/TripSummary';
import DestinationCard from '@/components/explore/DestinationCard';
import { DESTINATIONS, Destination, DestinationCategory } from '@/lib/explore-data';
import { TOURIST_PLACES, TouristPlace } from '@/lib/tourism-data';
import { showSuccess } from '@/utils/toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, ChevronLeft, Sparkles, Trash2, CheckCircle2, XCircle, Map as MapIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Explore = () => {
  const [viewMode, setViewMode] = React.useState<'discovery' | 'split'>('discovery');
  const [activeDestination, setActiveDestination] = React.useState<Destination | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<DestinationCategory | 'All'>('All');
  const [sortBy, setSortBy] = React.useState('popularity');
  
  // Trip State
  const [selectedPlaceIds, setSelectedPlaceIds] = React.useState<string[]>([]);
  const [visitedPlaceIds, setVisitedPlaceIds] = React.useState<string[]>([]);
  const [skippedPlaceIds, setSkippedPlaceIds] = React.useState<string[]>([]);
  const [selectedPlace, setSelectedPlace] = React.useState<TouristPlace | null>(null);

  const filteredDestinations = DESTINATIONS.filter(dest => {
    const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || dest.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'popularity') return b.popularity - a.popularity;
    return 0;
  });

  const handleExplore = (dest: Destination) => {
    setActiveDestination(dest);
    setViewMode('split');
    const firstPlace = TOURIST_PLACES.find(p => p.locationType === 'destination') || TOURIST_PLACES[0];
    setSelectedPlace(firstPlace);
    showSuccess(`Exploring ${dest.name}...`);
  };

  const togglePlaceSelection = (id: string) => {
    setSelectedPlaceIds(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const toggleVisited = (id: string) => {
    setVisitedPlaceIds(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
    setSkippedPlaceIds(prev => prev.filter(p => p !== id));
  };

  const toggleSkipped = (id: string) => {
    setSkippedPlaceIds(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
    setVisitedPlaceIds(prev => prev.filter(p => p !== id));
  };

  const removePlace = (id: string) => {
    setSelectedPlaceIds(prev => prev.filter(p => p !== id));
    setVisitedPlaceIds(prev => prev.filter(p => p !== id));
    setSkippedPlaceIds(prev => prev.filter(p => p !== id));
    showSuccess("Place removed from trip");
  };

  const addedPlaces = TOURIST_PLACES.filter(p => selectedPlaceIds.includes(p.id));

  return (
    <div className="h-screen bg-[#f8fafc] text-slate-900 flex flex-col overflow-hidden">
      <Navbar />
      
      <main className="flex-1 pt-16 flex flex-col overflow-hidden">
        <AnimatePresence mode="wait">
          {viewMode === 'discovery' ? (
            <motion.div 
              key="discovery"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1 overflow-y-auto custom-scrollbar p-6 lg:p-12"
            >
              <div className="max-w-7xl mx-auto space-y-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div className="space-y-3 text-left">
                    <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-1.5 rounded-full text-primary text-[10px] font-black uppercase tracking-widest">
                      <Sparkles size={12} /> Discover Your Next Adventure
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-black tracking-tighter text-slate-900 leading-none">
                      Explore <span className="text-primary">Destinations</span>
                    </h1>
                  </div>
                  
                  <div className="relative group w-full md:w-80 lg:w-96">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
                    <Input 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search destinations..."
                      className="h-14 pl-14 pr-6 rounded-2xl border-slate-200 bg-white shadow-xl shadow-slate-200/30 text-base font-bold focus:ring-primary/20 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                      <h2 className="text-2xl font-black tracking-tight text-slate-900">All Destinations</h2>
                      <p className="text-slate-500 text-sm font-medium">Browse our curated list of travel gems.</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
                        {['All', 'Beach', 'Hill Station', 'City', 'Adventure'].map((cat) => (
                          <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat as any)}
                            className={cn(
                              "px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                              selectedCategory === cat ? "bg-primary text-white shadow-md shadow-primary/20" : "text-slate-400 hover:bg-slate-50"
                            )}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                      
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-[140px] h-10 rounded-xl border-slate-200 bg-white font-bold text-xs">
                          <div className="flex items-center gap-2">
                            <SlidersHorizontal size={14} className="text-slate-400" />
                            <SelectValue placeholder="Sort by" />
                          </div>
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          <SelectItem value="popularity">Popularity</SelectItem>
                          <SelectItem value="rating">Top Rated</SelectItem>
                          <SelectItem value="budget">Budget</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredDestinations.map((dest) => (
                      <DestinationCard key={dest.id} destination={dest} onExplore={handleExplore} />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="split"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col lg:flex-row overflow-hidden"
            >
              {/* Left Part: Map (50%) */}
              <div className="flex-1 lg:w-1/2 relative flex flex-col border-r border-slate-200/50">
                <div className="absolute top-6 left-6 z-40">
                  <Button 
                    onClick={() => setViewMode('discovery')}
                    variant="secondary" 
                    className="rounded-2xl h-12 px-6 bg-white/90 backdrop-blur-xl shadow-xl border-white/20 font-black gap-2 hover:bg-primary hover:text-white transition-all"
                  >
                    <ChevronLeft size={20} /> Back to Discovery
                  </Button>
                </div>

                <div className="flex-1 p-4 pt-20">
                  <TourismMap 
                    places={TOURIST_PLACES}
                    selectedPlaces={selectedPlaceIds}
                    visitedPlaces={visitedPlaceIds}
                    skippedPlaces={skippedPlaceIds}
                    onPlaceClick={(place) => setSelectedPlace(place)}
                    source="Hyderabad"
                    destination={activeDestination?.name}
                  />
                </div>
              </div>

              {/* Right Part: Info & Trip Plan (50%) */}
              <div className="lg:w-1/2 flex flex-col bg-white overflow-hidden">
                <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
                  {/* Place Details (Left half of right panel) */}
                  <div className="flex-1 border-r border-slate-100 overflow-hidden">
                    <PlaceDetailsPanel 
                      place={selectedPlace}
                      isSelected={selectedPlace ? selectedPlaceIds.includes(selectedPlace.id) : false}
                      isVisited={selectedPlace ? visitedPlaceIds.includes(selectedPlace.id) : false}
                      isSkipped={selectedPlace ? skippedPlaceIds.includes(selectedPlace.id) : false}
                      onToggleSelect={togglePlaceSelection}
                      onToggleVisited={toggleVisited}
                      onToggleSkipped={toggleSkipped}
                      onSaveTrip={() => showSuccess("Trip saved!")}
                    />
                  </div>

                  {/* Added Places List (Right half of right panel) */}
                  <div className="w-full lg:w-64 bg-slate-50/50 flex flex-col overflow-hidden">
                    <div className="p-6 border-b border-slate-100 bg-white">
                      <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                        <MapIcon size={16} className="text-primary" /> Your Trip Plan
                      </h3>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                      <AnimatePresence mode="popLayout">
                        {addedPlaces.length === 0 ? (
                          <div className="text-center py-12 px-4">
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">No places added yet</p>
                          </div>
                        ) : (
                          addedPlaces.map((place) => (
                            <motion.div
                              key={place.id}
                              layout
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              className={cn(
                                "p-3 rounded-2xl border bg-white shadow-sm group transition-all",
                                visitedPlaceIds.includes(place.id) ? "border-emerald-200 bg-emerald-50/30" : 
                                skippedPlaceIds.includes(place.id) ? "border-red-200 bg-red-50/30" : "border-slate-100"
                              )}
                            >
                              <div className="flex items-center justify-between gap-2">
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-black text-slate-900 truncate">{place.name}</p>
                                  <p className="text-[9px] text-slate-400 font-bold uppercase">{place.category}</p>
                                </div>
                                <button 
                                  onClick={() => removePlace(place.id)}
                                  className="p-1.5 rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                              <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-50">
                                <button 
                                  onClick={() => toggleVisited(place.id)}
                                  className={cn(
                                    "flex-1 py-1 rounded-md text-[8px] font-black uppercase tracking-wider transition-all",
                                    visitedPlaceIds.includes(place.id) ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-400 hover:bg-emerald-50 hover:text-emerald-600"
                                  )}
                                >
                                  Visited
                                </button>
                                <button 
                                  onClick={() => toggleSkipped(place.id)}
                                  className={cn(
                                    "flex-1 py-1 rounded-md text-[8px] font-black uppercase tracking-wider transition-all",
                                    skippedPlaceIds.includes(place.id) ? "bg-red-500 text-white" : "bg-slate-100 text-slate-400 hover:bg-red-50 hover:text-red-600"
                                  )}
                                >
                                  Skip
                                </button>
                              </div>
                            </motion.div>
                          ))
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
                <TripSummary 
                  selectedCount={selectedPlaceIds.length}
                  distance={620}
                  duration="8h 30m"
                  budget={2500}
                  aiScore={92}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Explore;