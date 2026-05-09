"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import TourismMap from '@/components/tourism/TourismMap';
import RoutePlanner from '@/components/tourism/RoutePlanner';
import PlaceDetailsPanel from '@/components/tourism/PlaceDetailsPanel';
import TripSummary from '@/components/tourism/TripSummary';
import PopularPlacesGrid from '@/components/tourism/PopularPlacesGrid';
import { TOURIST_PLACES, TouristPlace } from '@/lib/tourism-data';
import { showSuccess, showError } from '@/utils/toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Map as MapIcon, LayoutGrid, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Explore = () => {
  const [selectedPlaceIds, setSelectedPlaceIds] = React.useState<string[]>([]);
  const [activePlace, setActivePlace] = React.useState<TouristPlace | null>(null);
  const [searchParams, setSearchParams] = React.useState({ source: 'Hyderabad', dest: 'Bangalore' });
  const [isLoading, setIsLoading] = React.useState(false);
  const [viewMode, setViewMode] = React.useState<'map' | 'grid'>('map');

  // Trip Stats Calculation
  const selectedPlaces = TOURIST_PLACES.filter(p => selectedPlaceIds.includes(p.id));
  const totalBudget = selectedPlaces.reduce((acc, p) => acc + (parseInt(p.entryFee.replace(/[^0-9]/g, '')) || 0), 1200);
  const totalDistance = 620 + (selectedPlaces.length * 15);
  const totalDuration = `${8 + Math.floor(selectedPlaces.length * 1.5)}h ${30}m`;
  const aiScore = 85 + (selectedPlaces.length * 2);

  const handleSearch = (source: string, dest: string) => {
    setIsLoading(true);
    setSearchParams({ source, dest });
    setTimeout(() => {
      setIsLoading(false);
      showSuccess(`Route optimized from ${source} to ${dest}`);
    }, 1500);
  };

  const togglePlaceSelection = (id: string) => {
    setSelectedPlaceIds(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
    const place = TOURIST_PLACES.find(p => p.id === id);
    if (!selectedPlaceIds.includes(id)) {
      showSuccess(`Added ${place?.name} to your optimized route`);
    }
  };

  const handleSaveTrip = () => {
    showSuccess("Trip plan saved to your profile!");
  };

  return (
    <div className="h-screen bg-[#f8fafc] text-slate-900 flex flex-col overflow-hidden">
      <Navbar />
      
      <main className="flex-1 pt-16 flex relative overflow-hidden">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          
          {/* Left Side: Map Section (2/3) */}
          <div className="flex-1 lg:w-2/3 relative flex flex-col">
            {/* Floating Search Bar */}
            <div className="absolute top-6 left-6 right-6 z-40">
              <RoutePlanner onSearch={handleSearch} isLoading={isLoading} />
            </div>

            {/* View Toggle */}
            <div className="absolute top-24 left-1/2 -translate-x-1/2 z-40">
              <div className="bg-white/80 backdrop-blur-xl p-1 rounded-2xl border border-white/20 shadow-xl flex gap-1">
                <Button 
                  variant={viewMode === 'map' ? 'default' : 'ghost'} 
                  onClick={() => setViewMode('map')}
                  className="rounded-xl h-10 gap-2 font-bold"
                >
                  <MapIcon size={16} /> Map View
                </Button>
                <Button 
                  variant={viewMode === 'grid' ? 'default' : 'ghost'} 
                  onClick={() => setViewMode('grid')}
                  className="rounded-xl h-10 gap-2 font-bold"
                >
                  <LayoutGrid size={16} /> Discover
                </Button>
              </div>
            </div>

            {/* Map/Grid Content */}
            <div className="flex-1 p-6 pt-36 relative overflow-hidden">
              <AnimatePresence mode="wait">
                {viewMode === 'map' ? (
                  <motion.div 
                    key="map"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full"
                  >
                    <TourismMap 
                      places={TOURIST_PLACES}
                      selectedPlaces={selectedPlaceIds}
                      onPlaceClick={setActivePlace}
                      source={searchParams.source}
                      destination={searchParams.dest}
                    />
                  </motion.div>
                ) : (
                  <motion.div 
                    key="grid"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="w-full h-full overflow-y-auto custom-scrollbar pb-12"
                  >
                    <PopularPlacesGrid onViewDetails={(p) => { setActivePlace(p); setViewMode('map'); }} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Smart Filters Overlay */}
            {viewMode === 'map' && (
              <div className="absolute bottom-12 left-12 z-30 flex gap-2">
                {['Historical', 'Nature', 'Food'].map((cat) => (
                  <Button key={cat} variant="secondary" className="rounded-full bg-white/80 backdrop-blur-md border-white/20 shadow-lg text-[10px] font-black uppercase tracking-widest h-10 px-6 hover:bg-primary hover:text-white transition-all">
                    {cat}
                  </Button>
                ))}
                <Button variant="secondary" className="rounded-full bg-white/80 backdrop-blur-md border-white/20 shadow-lg h-10 w-10 p-0">
                  <Filter size={16} />
                </Button>
              </div>
            )}
          </div>

          {/* Right Side: Details & Summary (1/3) */}
          <div className="hidden lg:flex lg:w-1/3 flex-col border-l border-slate-200/50 bg-white/40 backdrop-blur-xl">
            <div className="flex-1 overflow-hidden">
              <PlaceDetailsPanel 
                place={activePlace}
                isSelected={activePlace ? selectedPlaceIds.includes(activePlace.id) : false}
                onToggleSelect={togglePlaceSelection}
                onSaveTrip={handleSaveTrip}
              />
            </div>
            <TripSummary 
              selectedCount={selectedPlaceIds.length}
              distance={totalDistance}
              duration={totalDuration}
              budget={totalBudget}
              aiScore={aiScore}
            />
          </div>

        </div>
      </main>
    </div>
  );
};

export default Explore;