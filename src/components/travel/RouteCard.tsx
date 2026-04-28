"use client";

import React from 'react';
import { TravelRoute, TransportMode } from '@/lib/mock-data';
import { Plane, Train, Bus, Info, Clock, DollarSign, ShieldCheck, AlertTriangle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const ModeIcon = ({ mode }: { mode: TransportMode }) => {
  switch (mode) {
    case 'flight': return <Plane className="w-4 h-4" />;
    case 'train': return <Train className="w-4 h-4" />;
    case 'bus': return <Bus className="w-4 h-4" />;
    case 'metro': return <Train className="w-4 h-4 rotate-90" />;
    default: return <Info className="w-4 h-4" />;
  }
};

const RouteCard = ({ route, index }: { route: TravelRoute, index: number }) => {
  const formatDuration = (mins: number) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${h}h ${m}m`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="group relative overflow-hidden p-5 bg-card/40 hover:bg-card/60 border-white/10 transition-all cursor-pointer">
        {route.type === 'recommended' && (
          <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-tighter">
            AI Recommended
          </div>
        )}

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-2">
              {route.segments.map((seg, i) => (
                <React.Fragment key={i}>
                  <div className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-md border border-white/5">
                    <ModeIcon mode={seg.mode} />
                    <span className="text-[10px] font-medium uppercase opacity-70">{seg.mode}</span>
                  </div>
                  {i < route.segments.length - 1 && (
                    <div className="w-4 h-[1px] bg-white/10" />
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="flex items-center gap-8">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Duration
                </p>
                <p className="font-semibold">{formatDuration(route.totalDuration)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <DollarSign className="w-3 h-3" /> Est. Cost
                </p>
                <p className="font-semibold text-primary">${route.totalCost}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Reliability
                </p>
                <p className={cn(
                  "font-semibold",
                  route.reliabilityScore > 90 ? "text-green-400" : "text-yellow-400"
                )}>{route.reliabilityScore}%</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            {route.reliabilityScore < 90 && (
              <Badge variant="outline" className="text-yellow-400 border-yellow-400/30 bg-yellow-400/5 gap-1">
                <AlertTriangle className="w-3 h-3" /> Potential Delays
              </Badge>
            )}
            <div className="text-right">
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Arrives</p>
              <p className="text-lg font-bold">{route.segments[route.segments.length - 1].arrivalTime}</p>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default RouteCard;