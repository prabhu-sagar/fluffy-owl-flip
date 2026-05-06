"use client";

import React from 'react';
import { Send, Mic, Sparkles, Volume2, MicOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { WeatherCondition } from '@/lib/mock-data';
import { processChatQuery } from '@/services/aiService';
import { showSuccess, showError } from '@/utils/toast';

interface AIAssistantProps {
  weather: WeatherCondition;
  distance: number;
}

const AIAssistant = ({ weather, distance }: AIAssistantProps) => {
  const [isListening, setIsListening] = React.useState(false);
  const [input, setInput] = React.useState('');
  const [messages, setMessages] = React.useState([
    { role: 'ai', content: `Welcome back! I've analyzed your ${distance}km trip. Conditions are ${weather.toLowerCase()}, making it a great day for travel.` }
  ]);
  const [isTyping, setIsTyping] = React.useState(false);

  const handleSend = async (text: string = input) => {
    if (!text.trim()) return;
    
    const userMsg = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await processChatQuery(text);
      setMessages(prev => [...prev, { role: 'ai', content: response }]);
    } catch (err) {
      showError("AI is currently unavailable");
    } finally {
      setIsTyping(false);
    }
  };

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      showError("Speech recognition not supported in this browser");
      return;
    }

    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = 'en-US';
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      handleSend(transcript);
    };

    recognition.start();
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
        {messages.map((msg, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: msg.role === 'ai' ? -10 : 10 }}
            animate={{ opacity: 1, x: 0 }}
            className={cn("flex gap-3", msg.role === 'user' && "justify-end")}
          >
            {msg.role === 'ai' && (
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <Sparkles className="text-primary w-4 h-4" />
              </div>
            )}
            <div className={cn(
              "p-4 rounded-2xl text-sm max-w-[85%] leading-relaxed border",
              msg.role === 'ai' 
                ? "bg-[#2d2f45]/50 rounded-tl-none border-white/5" 
                : "bg-primary text-white rounded-tr-none border-primary/20 shadow-lg shadow-primary/10"
            )}>
              {msg.content}
            </div>
          </motion.div>
        ))}
        {isTyping && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
              <Sparkles className="text-primary w-4 h-4" />
            </div>
            <div className="bg-[#2d2f45]/50 p-4 rounded-2xl rounded-tl-none flex gap-1">
              <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" />
              <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
      </div>

      <div className="p-6 bg-[#0a0b14]/60 backdrop-blur-md border-t border-[#2d2f45]">
        {isListening ? (
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="flex items-center gap-1.5 h-12">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1.5 bg-primary rounded-full"
                  animate={{ height: [10, 30, 10] }}
                  transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.05 }}
                />
              ))}
            </div>
            <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] animate-pulse">Listening...</p>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="relative group">
            <Input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="bg-[#1a1c2e] border-[#2d2f45] rounded-2xl pr-24 h-14 focus:ring-primary/20 focus:border-primary/50 transition-all" 
              placeholder="Ask about your trip..." 
            />
            <div className="absolute right-2 top-2 bottom-2 flex gap-1">
              <Button 
                type="button"
                size="icon" 
                variant="ghost"
                onClick={startListening}
                className="rounded-xl w-10 h-10 text-slate-400 hover:text-primary hover:bg-primary/10"
              >
                <Mic className="w-5 h-5" />
              </Button>
              <Button type="submit" size="icon" className="rounded-xl w-10 h-10 shadow-lg shadow-primary/20">
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

import { cn } from '@/lib/utils';
export default AIAssistant;