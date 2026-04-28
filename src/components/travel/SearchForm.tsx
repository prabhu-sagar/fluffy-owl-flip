"use client";

import React from 'react';
import { MapPin, Calendar, Search, ArrowRightLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';

const SearchForm = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-6 bg-card/50 backdrop-blur-xl border-white/10 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          <div className="md:col-span-4 space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground ml-1">From</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
              <Input className="pl-10 bg-background/50 border-white/10 h-12 rounded-xl" placeholder="Enter source city..." />
            </div>
          </div>

          <div className="md:col-span-1 flex justify-center pb-2">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10">
              <ArrowRightLeft className="w-4 h-4 text-muted-foreground" />
            </Button>
          </div>

          <div className="md:col-span-4 space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground ml-1">To</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
              <Input className="pl-10 bg-background/50 border-white/10 h-12 rounded-xl" placeholder="Enter destination..." />
            </div>
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground ml-1">Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
              <Input type="date" className="pl-10 bg-background/50 border-white/10 h-12 rounded-xl" />
            </div>
          </div>

          <div className="md:col-span-1">
            <Button className="w-full h-12 rounded-xl shadow-lg shadow-primary/20">
              <Search className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default SearchForm;