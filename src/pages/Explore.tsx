"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import TourismMap from '@/components/tourism/TourismMap';
import PlaceDetailsPanel from '@/components/tourism/PlaceDetailsPanel';
import TripSummary from '@/components/tourism/TripSummary';
import DestinationCard from '@/components/explore/DestinationCard';
import { DESTINATIONS, Destination, DestinationCategory } from '@/lib/explore-data';
import { TOURIST_PLACES, TouristPlace } from '@/lib/tourism-data';
import { showSuccess, showError } from '@/utils/toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronLeft, Trash2, Map as MapIcon, Play, Sparkles, Compass, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

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
  const [isSaving, setIsSaving] = React.useState(false);

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

  const addedPlaces = TOURIST_PLACES.filter(p => selectedPlaceIds.includes(p.id));

  const handleCompleteTrip = async () => {
    if (selectedPlaceIds.length === 0) return;
    
    setIsSaving(true);
    const totalCost = addedPlaces.reduce((acc, p) => acc + (parseInt(p.entryFee.replace(/[^0-9]/g, '')) || 0), 0) + 500;

    const tripData = {
      destination: activeDestination?.name || 'Custom Route',
      source: 'Current Location',
      date: new Date().toISOString().split('T')[0],
      status: 'Ongoing',
      mode: 'Multi-modal',
      cost: `₹${totalCost.toLocaleString()}`,
      full_route: {
        id: `tour-${Date.now()}`,
        totalDuration: addedPlaces.length * 120,
        totalCost: totalCost,
        reliabilityScore: 98,
        type: 'recommended',
        segments: addedPlaces.map((p, i) => ({
          mode: 'cab',
          from: i === 0 ? 'Start' : addedPlaces[i-1].name,
          to: p.name,
          duration: 60,
          cost: 150,
          departureTime: `${10 + i}:00`,
          arrivalTime: `${11 + i}:00`,
          delayRisk: 0.02,
          attractions: [p.name]
        }))
      }
    };

    try {
      const { error } = await supabase.from('trips').insert([tripData]);
      if (error) throw error;
      showSuccess("Journey started! Your route is now active.");
    } catch (err: any) {
      // Fallback to local storage
      const existingTrips = JSON.parse(localStorage.getItem('bookedTrips') || '[]');
      localStorage.setItem('bookedTrips', JSON.stringify([{ ...tripData, id: Date.now().toString() }, ...existingTrips]));
      showSuccess("Journey started (Saved locally)!");
    } finally {
      setIsSaving(false);
      navigate('/trips');
    }
  };

  return (
    <div className="h-screen w-full bg-[#fcfdfe] flex flex-col overflow-hidden">
      <Navbar />
      
      <main className="flex-1 pt-16 overflow-hidden">
        <AnimatePresence mode="wait">
          {viewMode === 'discovery' ? (
            <motion.div 
              key="discovery"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="h-full overflow-y-auto custom-scrollbar p-8 lg:p-12"
            >
              <div className="max-w-6xl mx-auto space-y-12">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1 rounded-full text-primary text-[10px] font-black uppercase tracking-widest">
                      <Sparkles size={12} /> Your Journey Starts Here
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-black tracking-tighter leading-tight text-gradient">
                      Explore <span className="text-primary">Destinations.</span>
                    </h1>
                    <p className="text-slate-500 text-base font-medium max-w-md">
                      Discover hidden gems and iconic landmarks curated by our neural travel engine.
                    </p>
                  </div>

                  <div className="relative w-full lg:w-80 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <Input 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Where to next?"
                      className="pl-12 h-14 rounded-2xl border-slate-200 bg-white shadow-lg text-sm font-bold"
                    />
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-2">
                      <Compass className="text-primary w-5 h-5" />
                      <h2 className="text-xl font-black">Popular Picks</h2>
                    </div>
                    <div className="flex gap-1 bg-slate-50 p-1 rounded-xl border border-slate-100">
                      {['All', 'Beach', 'Hill Station', 'City'].map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat as any)}
                          className={cn(
                            "px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                            selectedCategory === cat ? "bg-white text-primary shadow-sm" : "text-slate-400 hover:text-slate-600"
                          )}
                        >
                          {cat}
                        </button>
                      ))}
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
              className="h-full w-full grid grid-cols-[35%_40%_25%] overflow-hidden"
            >
              {/* COLUMN 1: 35% WIDTH (MAP ONLY) */}
              <div className="relative overflow-hidden border-r border-slate-100 bg-slate-50/30">
                <div className="absolute top-4 left-4 z-50">
                  <Button 
                    onClick={() => setViewMode('discovery')}
                    variant="secondary" 
                    size="icon"
                    className="rounded-xl w-10 h-10 shadow-xl bg-white/90 backdrop-blur-xl"
                  >
                    <ChevronLeft size={18} />
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

              {/* COLUMN 2: 40% WIDTH (DETAILS) */}
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

              {/* COLUMN 3: 25% WIDTH (SUMMARY + PLAN) */}
              <div className="bg-slate-50/50 flex flex-col overflow-hidden">
                {/* Trip Summary at the Top */}
                <div className="shrink-0 border-b border-slate-100 bg-white">
                  <TripSummary 
                    selectedCount={selectedPlaceIds.length}
                    distance={620}
                    duration="8h 30m"
                    budget={addedPlaces.reduce((acc, p) => acc + (parseInt(p.entryFee.replace(/[^0-9]/g, '')) || 0), 0) + 500}
                    aiScore={92}
                    onComplete={handleCompleteTrip}
                  />
                </div>

                {/* Trip Plan Header */}
                <div className="p-4 border-b border-slate-100 bg-white/50 shrink-0">
                  <h3 className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 text-slate-400">
                    <MapIcon size={14} className="text-primary" /> Your Trip Plan
                  </h3>
                </div>

                {/* Added Places List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                  <AnimatePresence mode="popLayout">
                    {addedPlaces.length === 0 ? (
                      <div className="text-center py-10 opacity-20">
                        <MapIcon size={32} className="mx-auto mb-2" />
                        <p className="text-[8px] font-black uppercase tracking-widest">No places added</p>
                      </div>
                    ) : (
                      addedPlaces.map((place) => (
                        <motion.div 
                          key={place.id}
                          layout
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm flex justify-between items-center"
                        >
                          <div>
                            <p className="text-xs font-black text-slate-900">{place.name}</p>
                            <p className="text-[9px] text-slate-400 font-bold uppercase">{place.category}</p>
                          </div>
                          <button onClick={() => removePlace(place.id)} className="text-slate-300 hover:text-red-500 transition-colors">
                            <Trash2 size={14} />
                          </button>
                        </motion.div>
                      ))
                    )}
                  </AnimatePresence>
                </div>

                {/* Bottom Action Button */}
                <div className="p-6 bg-white border-t border-slate-100 shrink-0">
                  <Button 
                    disabled={addedPlaces.length === 0 || isSaving}
                    onClick={handleCompleteTrip}
                    className="w-full h-12 rounded-2xl font-black text-sm gap-2 shadow-xl shadow-primary/20"
                  >
                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play size={16} fill="currentColor" />}
                    {isSaving ? 'Starting...' : "Let's Start My Trip"}
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