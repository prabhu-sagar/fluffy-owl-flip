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
import { WeatherWidget, PricePrediction, CO2Comparison } from '@/components/travel/TravelWidgets';
import { WeatherCondition, TravelRoute } from '@/lib/mock-data';
import { fetchTravelPlan } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Settings, Zap, Shield, Wallet, Cloud, Sun, CloudLightning } from 'lucide-react';
import { cn } from '@/lib/utils';
import { showError, showSuccess } from '@/utils/toast';

const Index = () => {
  const [travelStyle, setTravelStyle] = React.useState<'balanced' | 'fastest' | 'cheapest'>('balanced');
  const [distance, setDistance] = React.useState([600]);
  const [weather, setWeather] = React.useState<WeatherCondition>('Clear');
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
          <div className="xl:col-span-8 space-y-8">
            <SearchForm onSearch={handleSearch} isLoading={isLoading} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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

              <div className="space-y-8">
                <InteractiveMap source={cities.source} destination={cities.dest} />
                <AIInsights />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <WeatherWidget />
              <PricePrediction />
              <CO2Comparison />
            </div>
          </div>

          <div className="xl:col-span-4 space-y-8">
            <AIAssistant weather={weather} distance={distance[0]} />
            
            <div className="glass-card p-6 rounded-[2rem] space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-bold">Simulation Controls</h3>
                <Button variant="ghost" size="icon" className="rounded-full text-slate-400">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Distance (km)</p>
                <Slider 
                  value={distance} 
                  onValueChange={setDistance} 
                  max={1000} 
                  step={10} 
                  className="py-4"
                />
              </div>

              <div className="space-y-4">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Weather Condition</p>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'Clear', icon: Sun, label: 'Clear' },
                    { id: 'Rain', icon: Cloud, label: 'Rain' },
                    { id: 'Storm', icon: CloudLightning, label: 'Storm' },
                  ].map((w) => (
                    <button
                      key={w.id}
                      onClick={() => setWeather(w.id as WeatherCondition)}
                      className={cn(
                        "flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all",
                        weather === w.id 
                          ? "bg-primary/10 border-primary text-primary" 
                          : "bg-slate-50 border-slate-100 text-slate-400 hover:bg-slate-100"
                      )}
                    >
                      <w.icon className="w-4 h-4" />
                      <span className="text-[10px] font-bold uppercase">{w.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Travel Style</p>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'fastest', icon: Zap, label: 'Fastest' },
                    { id: 'balanced', icon: Shield, label: 'Balanced' },
                    { id: 'cheapest', icon: Wallet, label: 'Cheapest' },
                  ].map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setTravelStyle(style.id as any)}
                      className={cn(
                        "flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all",
                        travelStyle === style.id 
                          ? "bg-primary/10 border-primary text-primary" 
                          : "bg-slate-50 border-slate-100 text-slate-400 hover:bg-slate-100"
                      )}
                    >
                      <style.icon className="w-4 h-4" />
                      <span className="text-[10px] font-bold uppercase">{style.label}</span>
                    </button>
                  ))}
                </div>
              </div>
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