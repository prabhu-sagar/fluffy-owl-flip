"use client";

import React from 'react';
import { BrainCircuit, TrendingUp, AlertCircle, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const AIInsights = () => {
  return (
    <Card className="p-6 bg-primary/5 border-primary/20 overflow-hidden relative">
      <div className="absolute -right-8 -top-8 opacity-10">
        <BrainCircuit size={160} className="text-primary" />
      </div>
      
      <div className="relative z-10 space-y-6">
        <div className="flex items-center gap-2">
          <div className="bg-primary/20 p-2 rounded-lg">
            <Zap className="text-primary w-5 h-5" />
          </div>
          <h3 className="font-bold text-lg">AI Travel Insights</h3>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Route Reliability Score</span>
              <span className="font-bold text-green-400">94%</span>
            </div>
            <Progress value={94} className="h-1.5 bg-white/5" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <TrendingUp className="w-3 h-3" /> Delay Prob.
              </div>
              <p className="text-lg font-bold">12%</p>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <AlertCircle className="w-3 h-3" /> Alt. Routes
              </div>
              <p className="text-lg font-bold">4 Found</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
            <p className="text-xs leading-relaxed text-primary-foreground/80">
              <span className="font-bold text-primary">Smart Tip:</span> Booking the 08:30 train instead of the 09:00 increases connection reliability by 15% due to historical terminal congestion.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AIInsights;