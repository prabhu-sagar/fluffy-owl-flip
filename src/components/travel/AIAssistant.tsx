"use client";

import React from 'react';
import { Send, Mic, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const AIAssistant = () => {
  return (
    <div className="glass-card rounded-[2rem] flex flex-col h-[500px] overflow-hidden">
      <div className="p-6 border-b border-[#2d2f45] flex items-center gap-3">
        <div className="bg-primary/20 p-2 rounded-xl">
          <Sparkles className="text-primary w-5 h-5" />
        </div>
        <div>
          <h3 className="font-bold">AI Assistant</h3>
          <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Online</p>
        </div>
      </div>

      <div className="flex-1 p-6 space-y-4 overflow-y-auto">
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
            <Sparkles className="text-primary w-4 h-4" />
          </div>
          <div className="bg-[#2d2f45]/50 p-3 rounded-2xl rounded-tl-none text-sm max-w-[80%]">
            Hi! I'm your AI travel assistant. How can I help you today?
          </div>
        </div>

        <div className="flex gap-3 justify-end">
          <div className="bg-primary p-3 rounded-2xl rounded-tr-none text-sm max-w-[80%] text-white">
            Plan a trip from Hyderabad to Bangalore tomorrow.
          </div>
        </div>

        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
            <Sparkles className="text-primary w-4 h-4" />
          </div>
          <div className="bg-[#2d2f45]/50 p-3 rounded-2xl rounded-tl-none text-sm max-w-[80%]">
            Sure! Here are the best route options for you.
          </div>
        </div>
      </div>

      <div className="p-6 bg-[#0a0b14]/40 space-y-4">
        <div className="flex items-center justify-center gap-4 py-2">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className="w-1 bg-primary/40 rounded-full animate-pulse" style={{ height: `${Math.random() * 20 + 5}px`, animationDelay: `${i * 0.1}s` }} />
            ))}
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tap to speak</p>
        </div>
        
        <div className="relative">
          <Input 
            className="bg-[#1a1c2e] border-[#2d2f45] rounded-2xl pr-12 h-12 focus:ring-primary/20" 
            placeholder="Type your message..." 
          />
          <Button size="icon" className="absolute right-1 top-1 bottom-1 rounded-xl w-10 h-10">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;