"use client";

import React from 'react';
import { Send, Mic, Sparkles, Volume2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { WeatherCondition } from '@/lib/mock-data';

interface AIAssistantProps {
  weather: WeatherCondition;
  distance: number;
}

const AIAssistant = ({ weather, distance }: AIAssistantProps) => {
  const [isListening, setIsListening] = React.useState(false);

  const getAIMessage = () => {
    if (weather === 'Storm') {
      return "Warning: Severe weather detected. I've deprioritized flight options and added a 45-minute buffer to all ground transport. The Shatabdi Express remains your safest bet.";
    }
    if (weather === 'Rain') {
      return "It's raining in Bangalore. Expect minor delays on road routes. I recommend the Metro-to-Train connection to avoid city traffic congestion.";
    }
    if (distance < 50) {
      return "For this short distance, I've optimized for local transit. The Metro + Cab combo will save you 20 minutes compared to a direct cab during peak hours.";
    }
    return `Welcome back, Rohit! I've analyzed your ${distance}km trip. Conditions are clear, making it a great day for the recommended rail route.`;
  };

  return (
    <div className="glass-card rounded-[2rem] flex flex-col h-[500px] overflow-hidden border-primary/20">
      <div className="p-6 border-b border-[#2d2f45] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary/20 p-2 rounded-xl">
            <Sparkles className="text-primary w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold">AI Travel Concierge</h3>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Neural Link Active</p>
            </div>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="rounded-full text-slate-400">
          <Volume2 className="w-5 h-5" />
        </Button>
      </div>

      <div className="flex-1 p-6 space-y-6 overflow-y-auto custom-scrollbar">
        <AnimatePresence mode="wait">
          <motion.div 
            key={weather + distance}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
              <Sparkles className="text-primary w-4 h-4" />
            </div>
            <div className="bg-[#2d2f45]/50 p-4 rounded-2xl rounded-tl-none text-sm max-w-[85%] leading-relaxed border border-white/5">
              {getAIMessage()}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex gap-3 justify-end">
          <div className="bg-primary p-4 rounded-2xl rounded-tr-none text-sm max-w-[85%] text-white shadow-lg shadow-primary/20">
            What's the most eco-friendly way to travel today?
          </div>
        </div>

        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
            <Sparkles className="text-primary w-4 h-4" />
          </div>
          <div className="bg-[#2d2f45]/50 p-4 rounded-2xl rounded-tl-none text-sm max-w-[85%] leading-relaxed border border-white/5">
            The train route saves 85% more CO₂ than a private cab. I've highlighted the 'Eco-Friendly' badge on the best option for you.
          </div>
        </div>
      </div>

      <div className="p-6 bg-[#0a0b14]/60 backdrop-blur-md border-t border-[#2d2f45]">
        {isListening ? (
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="flex items-center gap-1.5 h-12">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1.5 bg-primary rounded-full"
                  animate={{ 
                    height: [10, Math.random() * 40 + 10, 10],
                  }}
                  transition={{ 
                    duration: 0.5, 
                    repeat: Infinity,
                    delay: i * 0.05
                  }}
                />
              ))}
            </div>
            <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] animate-pulse">Listening...</p>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsListening(false)}
              className="rounded-full border-primary/30 text-primary hover:bg-primary/10"
            >
              Stop
            </Button>
          </div>
        ) : (
          <div className="relative group">
            <Input 
              className="bg-[#1a1c2e] border-[#2d2f45] rounded-2xl pr-24 h-14 focus:ring-primary/20 focus:border-primary/50 transition-all" 
              placeholder="Ask about your trip..." 
            />
            <div className="absolute right-2 top-2 bottom-2 flex gap-1">
              <Button 
                size="icon" 
                variant="ghost"
                onClick={() => setIsListening(true)}
                className="rounded-xl w-10 h-10 text-slate-400 hover:text-primary hover:bg-primary/10"
              >
                <Mic className="w-5 h-5" />
              </Button>
              <Button size="icon" className="rounded-xl w-10 h-10 shadow-lg shadow-primary/20">
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAssistant;