"use client";

import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import InteractiveMap from '@/components/travel/InteractiveMap';
import RouteCard from '@/components/travel/RouteCard';
import AIAssistant from '@/components/travel/AIAssistant';
import { WeatherWidget, PricePrediction, CO2Comparison } from '@/components/travel/TravelWidgets';
import { MOCK_ROUTES } from '@/lib/mock-data';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Filter, Map as MapIcon, List, User, Settings, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="min-h-screen bg-[#0a0b14] text-white flex">
      <Sidebar />
      
      <main className="flex-1 ml-20 lg:ml-64 p-8">
        <DashboardHeader />

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Left Column: Main Workspace */}
          <div className="xl:col-span-8 space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">Hyderabad → Bangalore</h2>
                  <span className="text-xs text-slate-400">Tomorrow, 10 May • 2 Adults</span>
                </div>
                
                <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                  {['All Modes', 'Bus', 'Train', 'Flight', 'Metro'].map((mode, i) => (
                    <Button 
                      key={mode} 
                      variant={i === 0 ? 'default' : 'outline'} 
                      size="sm" 
                      className="rounded-full px-6 border-[#2d2f45] bg-[#1a1c2e]/40"
                    >
                      {mode}
                    </Button>
                  ))}
                </div>

                <div className="space-y-4">
                  {MOCK_ROUTES.map((route, idx) => (
                    <RouteCard key={route.id} route={route} index={idx} />
                  ))}
                </div>
              </div>

              <InteractiveMap />
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
                <h3 className="font-bold">Profile & Preferences</h3>
                <Button variant="ghost" size="icon" className="rounded-full text-slate-400">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500" />
                <div>
                  <p className="font-bold">Rohit Verma</p>
                  <p className="text-xs text-slate-400">rohit.verma@example.com</p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { label: 'Preferred Modes', value: 'Train, Bus' },
                  { label: 'Seat Preference', value: 'Window Seat' },
                  { label: 'Budget Range', value: '₹500 - ₹2,000' },
                  { label: 'Travel Style', value: 'Balanced' },
                ].map((pref, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-[#2d2f45] last:border-0">
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