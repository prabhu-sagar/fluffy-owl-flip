"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import InteractiveMap from '@/components/travel/InteractiveMap';
import RouteCard from '@/components/travel/RouteCard';
import AIAssistant from '@/components/travel/AIAssistant';
import SearchForm from '@/components/travel/SearchForm';
import AIInsights from '@/components/travel/AIInsights';
import RouteDetails from '@/components/travel/RouteDetails';
import { WeatherWidget, PricePrediction } from '@/components/travel/TravelWidgets';
import { WeatherCondition, TravelRoute } from '@/lib/mock-data';
import { fetchTravelPlan } from '@/lib/api';
import { showError, showSuccess } from '@/utils/toast';

const Index = () => {
  const [travelStyle] = React.useState<'balanced' | 'fastest' | 'cheapest'>('balanced');
  const [distance] = React.useState([600]);
  const [weather] = React.useState<WeatherCondition>('Clear');
  const [routes, setRoutes] = React.useState<TravelRoute[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [selectedRoute, setSelectedRoute] = React.useState<TravelRoute | null>(null);
  const [cities, setCities] = React.useState({ source: 'Hyderabad', dest: 'Bangalore' });

  const loadRoutes = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchTravelPlan({
        source: cities.source,
        destination: cities.dest,
        distance: distance[0],
        style: travelStyle,
        weather: weather
      });
      setRoutes(data);
    } catch (err) {
      showError("Failed to fetch travel plans");
    } finally {
      setIsLoading(false);
    }
  }, [distance, travelStyle, weather, cities]);

  const handleSearch = (source: string, dest: string) => {
    setCities({ source, dest });
    showSuccess(`Searching routes from ${source} to ${dest}`);
  };

  React.useEffect(() => {
    loadRoutes();
  }, [cities, loadRoutes]);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12 px-4 lg:px-8 container mx-auto max-w-7xl">
        <DashboardHeader />

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          {/* Left Column: Main Content Area (8/12) */}
          <div className="xl:col-span-8 space-y-8">
            <SearchForm onSearch={handleSearch} isLoading={isLoading} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recommended Routes Section */}
              <div className="space-y-6">
                <div className="flex items-center justify-between px-2">
                  <h2 className="text-xl font-bold">Recommended Routes</h2>
                  <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-1 rounded-md uppercase">
                    {distance[0]} km
                  </span>
                </div>

                <div className="space-y-4">
                  {isLoading ? (
                    <div className="space-y-4">
                      {[1, 2].map(i => (
                        <div key={i} className="h-48 glass-card rounded-[2rem] animate-pulse" />
                      ))}
                    </div>
                  ) : (
                    routes.map((route, idx) => (
                      <RouteCard 
                        key={route.id} 
                        route={route} 
                        index={idx} 
                        onViewDetails={(r) => setSelectedRoute(r)}
                      />
                    ))
                  )}
                </div>
              </div>

              {/* Map and Insights Section */}
              <div className="space-y-8">
                <InteractiveMap source={cities.source} destination={cities.dest} />
                <AIInsights />
              </div>
            </div>

            {/* Bottom Widgets Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <WeatherWidget />
              <PricePrediction />
            </div>
          </div>

          {/* Right Column: AI Assistant (4/12) */}
          <div className="xl:col-span-4 sticky top-24">
            <AIAssistant weather={weather} distance={distance[0]} />
          </div>
        </div>

        <RouteDetails 
          route={selectedRoute} 
          isOpen={!!selectedRoute} 
          onClose={() => setSelectedRoute(null)} 
        />
      </main>
    </div>
  );
};

export default Index;