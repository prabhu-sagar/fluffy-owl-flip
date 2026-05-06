"use client";

import React from 'react';
import { Send, Mic, Sparkles, Volume2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const AIAssistant = () => {
  const [isListening, setIsListening] = React.useState(false);

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
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
            <Sparkles className="text-primary w-4 h-4" />
          </div>
          <div className="bg-[#2d2f45]/50 p-4 rounded-2xl rounded-tl-none text-sm max-w-[85%] leading-relaxed">
            Welcome back, Rohit! I've analyzed your upcoming trip. Based on current weather in Bangalore, I recommend the 09:00 Shatabdi Express for maximum reliability.
          </div>
        </div>

        <div className="flex gap-3 justify-end">
          <div className="bg-primary p-4 rounded-2xl rounded-tr-none text-sm max-w-[85%] text-white shadow-lg shadow-primary/20">
            What's the cheapest way to get there if I leave after 6 PM?
          </div>
        </div>

        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
            <Sparkles className="text-primary w-4 h-4" />
          </div>
          <div className="bg-[#2d2f45]/50 p-4 rounded-2xl rounded-tl-none text-sm max-w-[85%] leading-relaxed">
            Searching evening routes... The KSRTC Ambaari Dream Class bus at 21:30 is your best bet at ₹1,150. It has a 92% on-time rating for night journeys.
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
            <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] animate-pulse">Listening to your request...</p>
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
              placeholder="Ask me anything about your trip..." 
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