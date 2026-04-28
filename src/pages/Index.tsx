"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import SearchForm from '@/components/travel/SearchForm';
import RouteCard from '@/components/travel/RouteCard';
import AIInsights from '@/components/travel/AIInsights';
import { MOCK_ROUTES } from '@/lib/mock-data';
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Filter, Map as MapIcon, List } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-foreground selection:bg-primary/10">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-28 pb-12">
        {/* Hero Section */}
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 text-slate-900">
            Intelligent Multi-Modal <br />
            <span className="text-primary">Travel Assistant</span>
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Optimize your journey across flights, trains, and local transit with real-time AI predictions and graph-based route optimization.
          </p>
        </div>

        {/* Search Section */}
        <div className="mb-12">
          <SearchForm />
        </div>

        {/* Results Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Route List */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-bold text-slate-900">Optimized Routes</h2>
                <Tabs defaultValue="list" className="w-[120px]">
                  <TabsList className="grid w-full grid-cols-2 bg-slate-200/50">
                    <TabsTrigger value="list" className="data-[state=active]:bg-white data-[state=active]:shadow-sm"><List className="w-4 h-4" /></TabsTrigger>
                    <TabsTrigger value="map" className="data-[state=active]:bg-white data-[state=active]:shadow-sm"><MapIcon className="w-4 h-4" /></TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <Button variant="outline" size="sm" className="gap-2 bg-white shadow-sm">
                <Filter className="w-4 h-4" /> Filters
              </Button>
            </div>

            <div className="space-y-4">
              {MOCK_ROUTES.map((route, idx) => (
                <RouteCard key={route.id} route={route} index={idx} />
              ))}
            </div>
          </div>

          {/* Right Column: AI Insights & Map Preview */}
          <div className="lg:col-span-4 space-y-6">
            <AIInsights />
            
            <div className="rounded-3xl overflow-hidden border border-slate-200 h-[300px] relative group shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800" 
                alt="Map Preview" 
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <Button className="w-full bg-white/90 backdrop-blur-md border-white/20 hover:bg-white text-slate-900 shadow-lg">
                  Open Interactive Map
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-200 py-8 mt-12 bg-white">
        <MadeWithDyad />
      </footer>
    </div>
  );
};

export default Index;