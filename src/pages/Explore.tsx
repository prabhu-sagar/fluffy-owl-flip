"use client";

import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const Explore = () => {
  const destinations = [
    { name: 'Goa', type: 'Beach', rating: 4.8, price: '₹4,500', img: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=400&q=80' },
    { name: 'Manali', type: 'Mountains', rating: 4.9, price: '₹3,200', img: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=400&q=80' },
    { name: 'Jaipur', type: 'Heritage', rating: 4.7, price: '₹2,800', img: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=400&q=80' },
    { name: 'Kerala', type: 'Backwaters', rating: 4.9, price: '₹5,500', img: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=400&q=80' },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex">
      <Sidebar />
      <main className="flex-1 ml-20 lg:ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Explore Destinations</h1>
          <p className="text-slate-500 text-sm">Discover trending places optimized for your travel style.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((dest, idx) => (
            <motion.div
              key={dest.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="overflow-hidden rounded-3xl border-slate-200 shadow-sm hover:shadow-md transition-all group cursor-pointer">
                <div className="h-48 overflow-hidden relative">
                  <img src={dest.img} alt={dest.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <Badge className="absolute top-4 right-4 bg-white/90 text-slate-900 backdrop-blur-md border-none">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400 mr-1" /> {dest.rating}
                  </Badge>
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg">{dest.name}</h3>
                      <p className="text-xs text-slate-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {dest.type}
                      </p>
                    </div>
                    <p className="font-bold text-primary">{dest.price}</p>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-500 uppercase tracking-wider">
                    <TrendingUp className="w-3 h-3" /> High Demand
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Explore;