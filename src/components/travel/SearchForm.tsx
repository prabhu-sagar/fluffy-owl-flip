"use client";

import React from 'react';
import { MapPin, Calendar, Search, ArrowRightLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';

interface SearchFormProps {
  onSearch: (source: string, dest: string) => void;
  isLoading?: boolean;
}

const SearchForm = ({ onSearch, isLoading }: SearchFormProps) => {
  const [source, setSource] = React.useState('Hyderabad');
  const [dest, setDest] = React.useState('Bangalore');

  const handleSwap = () => {
    setSource(dest);
    setDest(source);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(source, dest);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-6 bg-white border-slate-200 shadow-xl shadow-slate-200/50 rounded-[2rem]">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          <div className="md:col-span-4 space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">From</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
              <Input 
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="pl-10 bg-slate-50 border-slate-200 h-12 rounded-2xl focus:bg-white transition-all" 
                placeholder="Enter source city..." 
              />
            </div>
          </div>

          <div className="md:col-span-1 flex justify-center pb-2">
            <Button 
              type="button"
              onClick={handleSwap}
              variant="ghost" 
              size="icon" 
              className="rounded-full hover:bg-primary/5 text-slate-400"
            >
              <ArrowRightLeft className="w-4 h-4" />
            </Button>
          </div>

          <div className="md:col-span-4 space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">To</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
              <Input 
                value={dest}
                onChange={(e) => setDest(e.target.value)}
                className="pl-10 bg-slate-50 border-slate-200 h-12 rounded-2xl focus:bg-white transition-all" 
                placeholder="Enter destination..." 
              />
            </div>
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
              <Input type="date" className="pl-10 bg-slate-50 border-slate-200 h-12 rounded-2xl focus:bg-white transition-all" />
            </div>
          </div>

          <div className="md:col-span-1">
            <Button 
              disabled={isLoading}
              className="w-full h-12 rounded-2xl shadow-lg shadow-primary/30 hover:scale-[1.02] transition-transform"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
            </Button>
          </div>
        </form>
      </Card>
    </motion.div>
  );
};

export default SearchForm;