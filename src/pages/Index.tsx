"use client";

import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
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
import { cn } from '@/lib/utils';
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
  }, [loadRoutes]);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex">
      <Sidebar />
      
      <main className="flex-1 ml-20 lg:ml-64 p-8">
        <DashboardHeader />

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Left Column: Search and Main Content */}
          <div className="xl:col-span-8 space-y-8">
            <SearchForm onSearch={handleSearch} isLoading={isLoading} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recommended Routes Section */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-bold">Recommended Routes</h2>
                    <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-1 rounded-md uppercase">
                      {distance[0]} km
                    </span>
                  </div>
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

          {/* Right Column: AI Assistant */}
          <div className="xl:col-span-4">
            <div className="sticky top-8">
              <AIAssistant weather={weather} distance={distance[0]} />
            </div>
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