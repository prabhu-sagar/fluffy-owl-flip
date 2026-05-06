"use client";

import React from 'react';
import { Search, Mic, Bell, TrendingUp, Leaf, Clock, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { showSuccess } from '@/utils/toast';

const StatCard = ({ icon: Icon, label, value, subValue, color }: any) => (
  <div className="glass-card p-4 rounded-2xl flex items-center gap-4 flex-1 min-w-[200px]">
    <div className={`p-3 rounded-xl bg-${color}/10`}>
      <Icon className={`w-5 h-5 text-${color}`} />
    </div>
    <div>
      <p className="text-xs text-slate-400 font-medium">{label}</p>
      <div className="flex items-baseline gap-2">
        <h4 className="text-xl font-bold">{value}</h4>
        <span className="text-[10px] text-slate-500">{subValue}</span>
      </div>
    </div>
  </div>
);

const DashboardHeader = () => {
  return (
    <div className="space-y-8 mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-slate-400 text-sm">Plan smarter. Travel better.</p>
        </div>
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => showSuccess("Voice search activated...")}
            className="rounded-full bg-primary/10 border-primary/20 text-primary gap-2 hover:bg-primary/20"
          >
            <Mic className="w-4 h-4" /> Voice Search
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => showSuccess("No new notifications")}
            className="rounded-full text-slate-400"
          >
            <Bell className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          icon={Calendar} 
          label="Upcoming Trips" 
          value="3" 
          subValue="Details" 
          color="indigo-400" 
        />
        <StatCard 
          icon={TrendingUp} 
          label="Predicted Savings" 
          value="₹2,450" 
          subValue="This Month" 
          color="emerald-400" 
        />
        <StatCard 
          icon={Leaf} 
          label="CO₂ Saved" 
          value="12.5 kg" 
          subValue="This Month" 
          color="green-400" 
        />
        <StatCard 
          icon={Clock} 
          label="Travel Time Saved" 
          value="6.3 hrs" 
          subValue="This Month" 
          color="blue-400" 
        />
      </div>
    </div>
  );
};

export default DashboardHeader;