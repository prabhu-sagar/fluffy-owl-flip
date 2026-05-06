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
import { Settings, ChevronRight, Zap, Shield, Wallet, Cloud, Sun, CloudLightning, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { showSuccess, showError } from '@/utils/toast';

const Index = () => {
  const [travelStyle, setTravelStyle] = React.useState<'balanced' | 'fastest' | 'cheapest'>('balanced');
  const [distance, setDistance] = React.useState([600]);
  const [weather, setWeather] = React.useState<WeatherCondition>('Clear');
  const [routes, setRoutes] = React.useState<TravelRoute[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [selectedRoute, setSelectedRoute] = React.useState<TravelRoute | null>(null);
  const [activeTrip, setActiveTrip] = React.useState<TravelRoute | null>(null);
  const [searchParams, setSearchParams] = React.useState({
    source: 'Hyderabad',
    destination: 'Bangalore'
  });

  const loadRoutes = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchTravelPlan({
        source: searchParams.source,
        destination: searchParams.destination,
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
  }, [distance, travelStyle, weather, searchParams]);

  React.useEffect(() => {
    loadRoutes();
  }, [loadRoutes]);

  const handleSearch = (params: { source: string; destination: string }) => {
    setSearchParams(params);
    showSuccess(`Searching routes from ${params.source} to ${params.destination}`);
  };

  const handleStartJourney = (route: TravelRoute) => {
    setActiveTrip(route);
    setSelectedRoute(null);
    showSuccess("Journey started! Live tracking is now active.");
  };

  return (
    <div className="min-h-screen bg-[#0a0b14] text-white flex">
      <Sidebar />
      
      <main className="flex-1 ml-20 lg:ml-64 p-8">
        <DashboardHeader />

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          <div className="xl:col-span-8 space-y-8">
            <SearchForm onSearch={handleSearch} isLoading={isLoading} />

            {activeTrip && (
              <div className="bg-primary/10 border border-primary/20 p-6 rounded-[2rem] flex items-center justify-between animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="flex items-center gap-4">
                  <div className="bg-primary p-3 rounded-2xl">
                    <MapPin className="text-white w-6 h-6 animate-bounce" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Active Journey: {searchParams.source} → {searchParams.destination}</h3>
                    <p className="text-sm text-slate-400">Currently in {activeTrip.segments[0].mode} segment • Arriving in {activeTrip.totalDuration} mins</p>
                  </div>
                </div>
                <Button variant="outline" onClick={() => setActiveTrip(null)} className="rounded-xl border-white/10 hover:bg-white/5">
                  End Trip
                </Button>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-bold">Recommended Routes</h2>
                    <span className="bg-primary/20 text-primary text-[10px] font-bold px-2 py-1 rounded-md uppercase">
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
                <InteractiveMap />
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
                          ? "bg-blue-500/20 border-blue-500 text-blue-400" 
                          : "bg-white/5 border-white/5 text-slate-400 hover:bg-white/10"
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
                          ? "bg-primary/20 border-primary text-primary" 
                          : "bg-white/5 border-white/5 text-slate-400 hover:bg-white/10"
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
          onStartJourney={handleStartJourney}
        />
      </main>
    </div>
  );
};

export default Index;