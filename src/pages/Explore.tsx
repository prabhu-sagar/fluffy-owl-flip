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
import { Search, SlidersHorizontal, ChevronLeft, Sparkles, Trash2, Map as MapIcon, Play } from 'lucide-react';
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
  
  // Trip State
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
    setVisitedPlaceIds(prev => prev.filter(p => prev.includes(id) ? prev.filter(p => p !== id) : prev));
    setSkippedPlaceIds(prev => prev.filter(p => prev.includes(id) ? prev.filter(p => p !== id) : prev));
    showSuccess("Place removed from trip");
  };

  const handleCompleteTrip = () => {
    const source = "Hyderabad";
    const destination = activeDestination?.name || "Destination";
    const selectedPlaces = TOURIST_PLACES.filter(p => selectedPlaceIds.includes(p.id));
    
    const segments: RouteSegment[] = [];
    let currentPoint = source;
    let currentTime = 9;

    if (selectedPlaces.length > 0) {
      selectedPlaces.forEach((place) => {
        segments.push({
          mode: 'cab',
          from: currentPoint,
          to: place.name,
          duration: 45,
          cost: 350,
          departureTime: `${String(currentTime).padStart(2, '0')}:00`,
          arrivalTime: `${String(currentTime).padStart(2, '0')}:45`,
          delayRisk: 0.05,
          attractions: [place.name]
        });
        currentPoint = place.name;
        currentTime += 2;
      });
    }

    segments.push({
      mode: 'cab',
      from: currentPoint,
      to: destination,
      duration: 60,
      cost: 500,
      departureTime: `${String(currentTime).padStart(2, '0')}:00`,
      arrivalTime: `${String(currentTime + 1).padStart(2, '0')}:00`,
      delayRisk: 0.1
    });

    const fullRoute: TravelRoute = {
      id: `opt-${Date.now()}`,
      totalDuration: segments.reduce((acc, s) => acc + s.duration, 0),
      totalCost: segments.reduce((acc, s) => acc + s.cost, 0),
      reliabilityScore: 94,
      type: 'recommended',
      segments,
      co2Saved: 4.2,
      score: 92
    };

    const tripData = {
      id: Date.now().toString(),
      source,
      destination,
      date: new Date().toISOString().split('T')[0],
      cost: `₹${fullRoute.totalCost.toLocaleString()}`,
      mode: 'Optimized Route',
      fullRoute: fullRoute
    };
    
    const existingTrips = JSON.parse(localStorage.getItem('bookedTrips') || '[]');
    localStorage.setItem('bookedTrips', JSON.stringify([tripData, ...existingTrips]));
    showSuccess("Optimized trip saved to My Trips!");
    navigate('/trips');
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
              className="flex-1 flex flex-row h-full overflow-hidden"
            >
              {/* Column 1: 35% Width */}
              <div className="w-[35%] flex flex-col h-full border-r border-slate-200/50 bg-slate-50/30 shrink-0 overflow-hidden">
                {/* Map: 85% Height */}
                <div className="h-[85%] relative p-4 pt-20 overflow-hidden">
                  <div className="absolute top-6 left-6 z-40">
                    <Button 
                      onClick={() => setViewMode('discovery')}
                      variant="secondary" 
                      size="icon"
                      className="rounded-full w-10 h-10 bg-white/90 backdrop-blur-xl shadow-xl border-white/20 hover:bg-primary hover:text-white transition-all"
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
                    source="Hyderabad"
                    destination={activeDestination?.name}
                  />
                </div>

                {/* Trip Summary: 15% Height */}
                <div className="h-[15%] border-t border-slate-200/50 bg-white/50 overflow-hidden">
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

              {/* Column 2: 40% Width (Place Details) */}
              <div className="w-[40%] h-full border-r border-slate-100 overflow-hidden bg-white shrink-0">
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

              {/* Column 3: 25% Width (Your Trip Plan) */}
              <div className="w-[25%] h-full bg-slate-50/50 flex flex-col overflow-hidden shrink-0">
                <div className="p-6 border-b border-slate-100 bg-white flex items-center justify-between shrink-0">
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
                        </motion.div>
                      ))
                    )}
                  </AnimatePresence>
                </div>
                
                <div className="p-4 bg-white border-t border-slate-100 shrink-0">
                  <Button 
                    disabled={addedPlaces.length === 0}
                    onClick={handleCompleteTrip}
                    className="w-full h-12 rounded-2xl font-black gap-2 shadow-xl shadow-primary/20"
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