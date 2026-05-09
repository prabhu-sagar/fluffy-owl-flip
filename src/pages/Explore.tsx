"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import TourismMap from '@/components/tourism/TourismMap';
import RoutePlanner from '@/components/tourism/RoutePlanner';
import SelectedPlacesSidebar from '@/components/tourism/SelectedPlacesSidebar';
import PlaceDetailsModal from '@/components/tourism/PlaceDetailsModal';
import { TOURIST_PLACES, TouristPlace } from '@/lib/tourism-data';
import { showSuccess, showError } from '@/utils/toast';
import { processChatQuery } from '@/services/aiService';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Filter, Map as MapIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Explore = () => {
  const [selectedPlaceIds, setSelectedPlaceIds] = React.useState<string[]>([]);
  const [activePlace, setActivePlace] = React.useState<TouristPlace | null>(null);
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [aiItinerary, setAiItinerary] = React.useState<string | null>(null);
  const [searchParams, setSearchParams] = React.useState({ source: 'Hyderabad', dest: 'Bangalore' });
  const [isLoading, setIsLoading] = React.useState(false);

  const selectedPlaces = TOURIST_PLACES.filter(p => selectedPlaceIds.includes(p.id));

  const handleSearch = (source: string, dest: string) => {
    setIsLoading(true);
    setSearchParams({ source, dest });
    setTimeout(() => {
      setIsLoading(false);
      showSuccess(`Found 6 attractions along the route to ${dest}`);
    }, 1500);
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

  const generateItinerary = async () => {
    if (selectedPlaces.length === 0) return;
    setIsGenerating(true);
    try {
      const prompt = `Create a detailed day-wise travel itinerary for a trip from ${searchParams.source} to ${searchParams.dest} visiting these places: ${selectedPlaces.map(p => p.name).join(', ')}. Include travel times and budget tips.`;
      const response = await processChatQuery(prompt);
      setAiItinerary(response);
    } catch (err) {
      showError("Failed to generate AI itinerary");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="h-screen bg-[#f8fafc] text-slate-900 flex flex-col overflow-hidden">
      <Navbar />
      
      <main className="flex-1 pt-16 flex relative overflow-hidden">
        {/* Left Sidebar: Trip Summary */}
        <div className="hidden lg:block w-80 shrink-0 h-full">
          <SelectedPlacesSidebar 
            selectedPlaces={selectedPlaces}
            onRemove={togglePlaceSelection}
            onGenerateItinerary={generateItinerary}
            isGenerating={isGenerating}
          />
        </div>

        {/* Center: Map & Search */}
        <div className="flex-1 relative flex flex-col">
          {/* Floating Search Bar */}
          <div className="absolute top-6 left-6 right-6 z-40">
            <RoutePlanner onSearch={handleSearch} isLoading={isLoading} />
          </div>

          {/* Map Container */}
          <div className="flex-1 p-6 pt-24">
            <TourismMap 
              places={TOURIST_PLACES}
              selectedPlaces={selectedPlaceIds}
              onPlaceClick={setActivePlace}
              source={searchParams.source}
              destination={searchParams.dest}
            />
          </div>

          {/* Smart Filters Overlay */}
          <div className="absolute bottom-12 left-12 z-30 flex gap-2">
            {['Historical', 'Nature', 'Food', 'Adventure'].map((cat) => (
              <Button key={cat} variant="secondary" className="rounded-full bg-white/80 backdrop-blur-md border-white/20 shadow-lg text-[10px] font-black uppercase tracking-widest h-10 px-6 hover:bg-primary hover:text-white transition-all">
                {cat}
              </Button>
            ))}
            <Button variant="secondary" className="rounded-full bg-white/80 backdrop-blur-md border-white/20 shadow-lg h-10 w-10 p-0">
              <Filter size={16} />
            </Button>
          </div>
        </div>

        {/* AI Itinerary Overlay */}
        <AnimatePresence>
          {aiItinerary && (
            <motion.div 
              initial={{ opacity: 0, x: 400 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 400 }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 border-l border-slate-200 flex flex-col"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-primary text-white">
                <div className="flex items-center gap-2">
                  <Sparkles size={20} />
                  <h3 className="font-black text-lg">AI Smart Itinerary</h3>
                </div>
                <button onClick={() => setAiItinerary(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-8 prose prose-slate prose-sm max-w-none custom-scrollbar">
                <div className="whitespace-pre-wrap font-medium leading-relaxed">
                  {aiItinerary}
                </div>
              </div>
              <div className="p-6 border-t border-slate-100 bg-slate-50 flex gap-3">
                <Button className="flex-1 rounded-xl h-12 font-bold">Save to My Trips</Button>
                <Button variant="outline" className="flex-1 rounded-xl h-12 font-bold border-slate-200">Export PDF</Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <PlaceDetailsModal 
        place={activePlace}
        isOpen={!!activePlace}
        onClose={() => setActivePlace(null)}
        onToggleSelect={togglePlaceSelection}
        isSelected={activePlace ? selectedPlaceIds.includes(activePlace.id) : false}
      />
    </div>
  );
};

export default Explore;