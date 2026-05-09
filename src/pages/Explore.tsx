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
import { Search, ChevronLeft, Trash2, Map as MapIcon, Play } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { TravelRoute, RouteSegment } from '@/lib/mock-data';

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
    <div className="h-screen w-full bg-white flex flex-col overflow-hidden">
      <Navbar />
      
      <main className="flex-1 pt-16 overflow-hidden">
        <AnimatePresence mode="wait">
          {viewMode === 'discovery' ? (
            <motion.div 
              key="discovery"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full overflow-y-auto p-8"
            >
              <div className="max-w-7xl mx-auto space-y-8">
                <div className="flex justify-between items-end">
                  <h1 className="text-4xl font-black">Explore Destinations</h1>
                  <div className="relative w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <Input 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search..."
                      className="pl-12 h-12 rounded-xl"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-6">
                  {filteredDestinations.map((dest) => (
                    <DestinationCard key={dest.id} destination={dest} onExplore={handleExplore} />
                  ))}
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
              <div className="grid grid-rows-[85%_15%] border-r border-slate-200 overflow-hidden">
                {/* MAP SECTION (85%) */}
                <div className="relative overflow-hidden border-b border-slate-200">
                  <div className="absolute top-4 left-4 z-50">
                    <Button 
                      onClick={() => setViewMode('discovery')}
                      variant="secondary" 
                      size="icon"
                      className="rounded-full shadow-lg"
                    >
                      <ChevronLeft size={20} />
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
                {/* SUMMARY SECTION (15%) */}
                <div className="bg-slate-50 overflow-hidden">
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

              {/* COLUMN 2: 40% WIDTH (PLACE DETAILS) */}
              <div className="border-r border-slate-200 overflow-hidden bg-white">
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

              {/* COLUMN 3: 25% WIDTH (YOUR TRIP PLAN) */}
              <div className="bg-slate-50 flex flex-col overflow-hidden">
                <div className="p-6 border-b border-slate-200 bg-white shrink-0">
                  <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                    <MapIcon size={16} className="text-primary" /> Your Trip Plan
                  </h3>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {addedPlaces.map((place) => (
                    <div key={place.id} className="p-4 bg-white rounded-xl border border-slate-200 flex justify-between items-center">
                      <div>
                        <p className="text-sm font-bold">{place.name}</p>
                        <p className="text-[10px] text-slate-400 uppercase">{place.category}</p>
                      </div>
                      <button onClick={() => removePlace(place.id)} className="text-slate-300 hover:text-red-500">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="p-4 bg-white border-t border-slate-200 shrink-0">
                  <Button 
                    disabled={addedPlaces.length === 0}
                    onClick={handleCompleteTrip}
                    className="w-full h-12 rounded-xl font-black gap-2"
                  >
                    <Play size={16} fill="currentColor" /> Let's Start My Trip
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