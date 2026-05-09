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
import { Search, ChevronLeft, Trash2, Map as MapIcon, Play, Sparkles, Compass, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

const Explore = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = React.useState<'discovery' | 'split'>('discovery');
  const [activeDestination, setActiveDestination] = React.useState<Destination | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<DestinationCategory | 'All'>('All');
  
  const [selectedPlaceIds, setSelectedPlaceIds] = React.useState<string[]>([]);
  const [visitedPlaceIds, setVisitedPlaceIds] = React.useState<string[]>([]);
  const [skippedPlaceIds, setSkippedPlaceIds] = React.useState<string[]>([]);
  const [selectedPlace, setSelectedPlace] = React.useState<TouristPlace | null>(null);

  const filteredDestinations = DESTINATIONS.filter(dest => {
    const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || dest.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleExplore = (dest: Destination) => {
    setActiveDestination(dest);
    setViewMode('split');
    const firstPlace = TOURIST_PLACES.find(p => p.locationType === 'destination') || TOURIST_PLACES[0];
    setSelectedPlace(firstPlace);
  };

  const togglePlaceSelection = (id: string) => {
    setSelectedPlaceIds(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
  };

  const toggleVisited = (id: string) => {
    setVisitedPlaceIds(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
    setSkippedPlaceIds(prev => prev.filter(p => p !== id));
  };

  const toggleSkipped = (id: string) => {
    setSkippedPlaceIds(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
    setVisitedPlaceIds(prev => prev.filter(p => p !== id));
  };

  const removePlace = (id: string) => {
    setSelectedPlaceIds(prev => prev.filter(p => p !== id));
    setVisitedPlaceIds(prev => prev.filter(p => p !== id));
    setSkippedPlaceIds(prev => prev.filter(p => p !== id));
  };

  const handleCompleteTrip = () => {
    showSuccess("Optimized trip saved!");
    navigate('/trips');
  };

  const addedPlaces = TOURIST_PLACES.filter(p => selectedPlaceIds.includes(p.id));

  return (
    <div className="h-screen w-full bg-[#fcfdfe] flex flex-col overflow-hidden">
      <Navbar />
      
      <main className="flex-1 pt-16 overflow-hidden">
        <AnimatePresence mode="wait">
          {viewMode === 'discovery' ? (
            <motion.div 
              key="discovery"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="h-full overflow-y-auto custom-scrollbar p-8 lg:p-16"
            >
              <div className="max-w-7xl mx-auto space-y-16">
                {/* Attractive Hero Section */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
                  <div className="space-y-6 max-w-2xl">
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-primary text-xs font-black uppercase tracking-[0.2em]"
                    >
                      <Sparkles size={14} className="animate-pulse" /> 
                      Your Journey Starts Here
                    </motion.div>
                    <h1 className="text-6xl lg:text-8xl font-black tracking-tighter leading-[0.85] text-gradient">
                      Explore <br />
                      <span className="text-primary">Destinations.</span>
                    </h1>
                    <p className="text-slate-500 text-xl font-medium max-w-lg leading-relaxed">
                      Discover hidden gems and iconic landmarks curated by our neural travel engine.
                    </p>
                  </div>

                  <div className="relative w-full lg:w-[450px] group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-400 rounded-[2rem] blur opacity-20 group-focus-within:opacity-40 transition duration-1000"></div>
                    <div className="relative">
                      <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={24} />
                      <Input 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Where to next?"
                        className="pl-16 h-20 rounded-[2rem] border-none bg-white shadow-2xl text-xl font-bold placeholder:text-slate-300 focus-visible:ring-primary/20"
                      />
                    </div>
                  </div>
                </div>

                {/* Categories & Grid */}
                <div className="space-y-10">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-6">
                    <div className="flex items-center gap-3">
                      <div className="bg-slate-900 p-2 rounded-xl">
                        <Compass className="text-white w-5 h-5" />
                      </div>
                      <h2 className="text-3xl font-black tracking-tight">Popular Picks</h2>
                    </div>
                    <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
                      {['All', 'Beach', 'Hill Station', 'City'].map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat as any)}
                          className={cn(
                            "px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                            selectedCategory === cat ? "bg-white text-primary shadow-sm" : "text-slate-400 hover:text-slate-600"
                          )}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredDestinations.map((dest, idx) => (
                      <motion.div
                        key={dest.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        <DestinationCard destination={dest} onExplore={handleExplore} />
                      </motion.div>
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
              className="h-full w-full grid grid-cols-[35%_40%_25%] overflow-hidden"
            >
              {/* COLUMN 1: 35% WIDTH */}
              <div className="grid grid-rows-[85%_15%] border-r border-slate-100 overflow-hidden bg-slate-50/30">
                <div className="relative overflow-hidden border-b border-slate-100">
                  <div className="absolute top-6 left-6 z-50">
                    <Button 
                      onClick={() => setViewMode('discovery')}
                      variant="secondary" 
                      size="icon"
                      className="rounded-2xl w-12 h-12 shadow-2xl bg-white/90 backdrop-blur-xl border-white/20 hover:bg-primary hover:text-white transition-all"
                    >
                      <ChevronLeft size={24} />
                    </Button>
                  </div>
                  <TourismMap 
                    places={TOURIST_PLACES}
                    selectedPlaces={selectedPlaceIds}
                    visitedPlaces={visitedPlaceIds}
                    skippedPlaces={skippedPlaceIds}
                    onPlaceClick={(place) => setSelectedPlace(place)}
                  />
                </div>
                <div className="bg-white/50 overflow-hidden">
                  <TripSummary 
                    selectedCount={selectedPlaceIds.length}
                    distance={620}
                    duration="8h 30m"
                    budget={2500}
                    aiScore={92}
                    onComplete={handleCompleteTrip}
                  />
                </div>
              </div>

              {/* COLUMN 2: 40% WIDTH */}
              <div className="border-r border-slate-100 overflow-hidden bg-white">
                <PlaceDetailsPanel 
                  place={selectedPlace}
                  isSelected={selectedPlace ? selectedPlaceIds.includes(selectedPlace.id) : false}
                  isVisited={selectedPlace ? visitedPlaceIds.includes(selectedPlace.id) : false}
                  isSkipped={selectedPlace ? skippedPlaceIds.includes(selectedPlace.id) : false}
                  onToggleSelect={togglePlaceSelection}
                  onToggleVisited={toggleVisited}
                  onToggleSkipped={toggleSkipped}
                  onSaveTrip={() => {}}
                />
              </div>

              {/* COLUMN 3: 25% WIDTH */}
              <div className="bg-slate-50/50 flex flex-col overflow-hidden">
                <div className="p-8 border-b border-slate-100 bg-white shrink-0">
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2 text-slate-400">
                    <MapIcon size={14} className="text-primary" /> Your Trip Plan
                  </h3>
                </div>
                <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
                  <AnimatePresence mode="popLayout">
                    {addedPlaces.length === 0 ? (
                      <div className="text-center py-20 opacity-20">
                        <MapIcon size={48} className="mx-auto mb-4" />
                        <p className="text-xs font-black uppercase tracking-widest">Empty Itinerary</p>
                      </div>
                    ) : (
                      addedPlaces.map((place) => (
                        <motion.div 
                          key={place.id}
                          layout
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="p-5 bg-white rounded-3xl border border-slate-100 shadow-sm flex justify-between items-center group hover:border-primary/30 transition-all"
                        >
                          <div>
                            <p className="text-sm font-black text-slate-900">{place.name}</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{place.category}</p>
                          </div>
                          <button 
                            onClick={() => removePlace(place.id)} 
                            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all"
                          >
                            <Trash2 size={16} />
                          </button>
                        </motion.div>
                      ))
                    )}
                  </AnimatePresence>
                </div>
                <div className="p-8 bg-white border-t border-slate-100 shrink-0">
                  <Button 
                    disabled={addedPlaces.length === 0}
                    onClick={handleCompleteTrip}
                    className="w-full h-16 rounded-[2rem] font-black text-base gap-3 shadow-2xl shadow-primary/20"
                  >
                    <Play size={20} fill="currentColor" /> Let's Start My Trip
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Explore;