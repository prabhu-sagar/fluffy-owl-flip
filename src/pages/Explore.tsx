"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import TourismMap from '@/components/tourism/TourismMap';
import RoutePlanner from '@/components/tourism/RoutePlanner';
import PlaceDetailsPanel from '@/components/tourism/PlaceDetailsPanel';
import TripSummary from '@/components/tourism/TripSummary';
import PopularPlacesGrid from '@/components/tourism/PopularPlacesGrid';
import { TOURIST_PLACES, TouristPlace } from '@/lib/tourism-data';
import { showSuccess } from '@/utils/toast';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Sparkles, Map as MapIcon, LayoutGrid } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Explore = () => {
  const [viewMode, setViewMode] = React.useState<'discovery' | 'split'>('discovery');
  const [activePlace, setActivePlace] = React.useState<TouristPlace | null>(null);
  const [selectedPlaceIds, setSelectedPlaceIds] = React.useState<string[]>([]);
  const [searchParams, setSearchParams] = React.useState({ source: 'Hyderabad', dest: 'Bangalore' });
  const [isLoading, setIsLoading] = React.useState(false);

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
      showSuccess(`Optimizing routes to ${dest}...`);
    }, 1000);
  };

  const handleSelectPlaceFromGrid = (place: TouristPlace) => {
    setActivePlace(place);
    setViewMode('split');
  };

  const togglePlaceSelection = (id: string) => {
    setSelectedPlaceIds(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
    const place = TOURIST_PLACES.find(p => p.id === id);
    if (!selectedPlaceIds.includes(id)) {
      showSuccess(`Added ${place?.name} to your trip`);
    }
  };

  return (
    <div className="h-screen bg-[#f8fafc] text-slate-900 flex flex-col overflow-hidden">
      <Navbar />
      
      <main className="flex-1 pt-16 flex flex-col overflow-hidden">
        
        {/* Stage 1: Discovery Hub (Grid View) */}
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
                {/* Hero Search Section */}
                <div className="text-center space-y-6">
                  <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-primary text-xs font-black uppercase tracking-widest">
                    <Sparkles size={14} /> AI-Powered Discovery
                  </div>
                  <h1 className="text-4xl lg:text-6xl font-black tracking-tighter text-slate-900">
                    Where to <span className="text-primary">next?</span>
                  </h1>
                  <div className="max-w-3xl mx-auto">
                    <RoutePlanner onSearch={handleSearch} isLoading={isLoading} />
                  </div>
                </div>

                {/* Top 10 Grid */}
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-black tracking-tight flex items-center gap-2">
                      <LayoutGrid className="text-primary" /> Featured Destinations
                    </h2>
                    <p className="text-sm text-slate-400 font-bold">Showing top 10 spots</p>
                  </div>
                  <PopularPlacesGrid onViewDetails={handleSelectPlaceFromGrid} />
                </div>
              </div>
            </motion.div>
          ) : (
            /* Stage 2: Planning Hub (Split View) */
            <motion.div 
              key="split"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col lg:flex-row overflow-hidden"
            >
              {/* Left Side: Map (2/3) */}
              <div className="flex-1 lg:w-2/3 relative flex flex-col">
                {/* Back Button & Search Overlay */}
                <div className="absolute top-6 left-6 right-6 z-40 flex items-center gap-4">
                  <Button 
                    onClick={() => setViewMode('discovery')}
                    variant="secondary" 
                    className="rounded-2xl h-12 px-6 bg-white/90 backdrop-blur-xl shadow-xl border-white/20 font-black gap-2 hover:bg-primary hover:text-white transition-all"
                  >
                    <ChevronLeft size={20} /> Back to Discovery
                  </Button>
                  <div className="flex-1 hidden md:block">
                    <RoutePlanner onSearch={handleSearch} isLoading={isLoading} />
                  </div>
                </div>

                <div className="flex-1 p-6 pt-24">
                  <TourismMap 
                    places={TOURIST_PLACES}
                    selectedPlaces={selectedPlaceIds}
                    onPlaceClick={setActivePlace}
                    source={searchParams.source}
                    destination={searchParams.dest}
                  />
                </div>
              </div>

              {/* Right Side: Details & Summary (1/3) */}
              <div className="lg:w-1/3 flex flex-col border-l border-slate-200/50 bg-white/40 backdrop-blur-xl shadow-2xl">
                <div className="flex-1 overflow-hidden">
                  <PlaceDetailsPanel 
                    place={activePlace}
                    isSelected={activePlace ? selectedPlaceIds.includes(activePlace.id) : false}
                    onToggleSelect={togglePlaceSelection}
                    onSaveTrip={() => showSuccess("Trip saved!")}
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
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Explore;