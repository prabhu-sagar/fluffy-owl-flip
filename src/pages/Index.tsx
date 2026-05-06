"use client";

import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import InteractiveMap from '@/components/travel/InteractiveMap';
import RouteCard from '@/components/travel/RouteCard';
import AIAssistant from '@/components/travel/AIAssistant';
import SearchForm from '@/components/travel/SearchForm';
import AIInsights from '@/components/travel/AIInsights';
import { WeatherWidget, PricePrediction, CO2Comparison } from '@/components/travel/TravelWidgets';
import { generateRoutes } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Settings, ChevronRight, Zap, Shield, Wallet, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

const Index = () => {
  const [travelStyle, setTravelStyle] = React.useState<'balanced' | 'fastest' | 'cheapest'>('balanced');
  const [distance, setDistance] = React.useState([600]);
  
  const routes = React.useMemo(() => {
    return generateRoutes(distance[0], travelStyle);
  }, [distance, travelStyle]);

  return (
    <div className="min-h-screen bg-[#0a0b14] text-white flex">
      <Sidebar />
      
      <main className="flex-1 ml-20 lg:ml-64 p-8">
        <DashboardHeader />

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Left Column: Main Workspace */}
          <div className="xl:col-span-8 space-y-8">
            <SearchForm />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-bold">Recommended Routes</h2>
                    <span className="bg-primary/20 text-primary text-[10px] font-bold px-2 py-1 rounded-md uppercase">
                      {distance[0]} km
                    </span>
                  </div>
                  <div className="flex gap-2">
                    {['All', 'Train', 'Flight'].map((mode) => (
                      <Button key={mode} variant="ghost" size="sm" className="text-xs text-slate-400 hover:text-white">
                        {mode}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  {routes.map((route, idx) => (
                    <RouteCard key={route.id} route={route} index={idx} />
                  ))}
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

          {/* Right Column: AI & Profile */}
          <div className="xl:col-span-4 space-y-8">
            <AIAssistant />
            
            <div className="glass-card p-6 rounded-[2rem] space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-bold">Travel Preferences</h3>
                <Button variant="ghost" size="icon" className="rounded-full text-slate-400">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Simulate Distance</p>
                <Slider 
                  value={distance} 
                  onValueChange={setDistance} 
                  max={1000} 
                  step={10} 
                  className="py-4"
                />
              </div>

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

              <div className="space-y-4 pt-4 border-t border-[#2d2f45]">
                {[
                  { label: 'Preferred Modes', value: 'Train, Bus' },
                  { label: 'Seat Preference', value: 'Window Seat' },
                  { label: 'Budget Range', value: '₹500 - ₹2,000' },
                ].map((pref, i) => (
                  <div key={i} className="flex items-center justify-between py-2">
                    <span className="text-xs text-slate-400 font-medium">{pref.label}</span>
                    <span className="text-xs font-bold flex items-center gap-1">
                      {pref.value} <ChevronRight className="w-3 h-3 text-slate-600" />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;