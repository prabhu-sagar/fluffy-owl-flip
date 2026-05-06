"use client";

import React from 'react';
import { 
  LayoutDashboard, 
  Map as MapIcon, 
  Compass, 
  Bookmark, 
  MessageSquare, 
  Bell, 
  User, 
  Settings,
  Plane
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: true },
    { icon: MapIcon, label: 'Plan Trip' },
    { icon: Compass, label: 'Explore' },
    { icon: Bookmark, label: 'Bookings' },
    { icon: MessageSquare, label: 'AI Assistant' },
    { icon: Bell, label: 'Alerts' },
  ];

  const bottomItems = [
    { icon: User, label: 'Profile' },
    { icon: Settings, label: 'Settings' },
  ];

  return (
    <aside className="w-20 lg:w-64 h-screen fixed left-0 top-0 bg-[#1a1c2e]/40 border-r border-[#2d2f45] flex flex-col py-8 z-50">
      <div className="px-6 mb-10 flex items-center gap-3">
        <div className="bg-primary p-2 rounded-xl shadow-lg shadow-primary/20">
          <Plane className="text-white w-6 h-6" />
        </div>
        <span className="font-bold text-lg hidden lg:block tracking-tight">
          AI <span className="text-primary">Travel</span>
        </span>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item, idx) => (
          <button
            key={idx}
            className={cn(
              "w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all group",
              item.active ? "bg-primary/10 text-primary" : "text-slate-400 hover:bg-white/5 hover:text-white"
            )}
          >
            <item.icon className={cn("w-5 h-5", item.active ? "text-primary" : "group-hover:scale-110 transition-transform")} />
            <span className="font-medium hidden lg:block">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="px-4 space-y-2">
        {bottomItems.map((item, idx) => (
          <button
            key={idx}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-slate-400 hover:bg-white/5 hover:text-white transition-all"
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium hidden lg:block">{item.label}</span>
          </button>
        ))}
        
        <div className="mt-6 pt-6 border-t border-[#2d2f45] hidden lg:block">
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 border-2 border-white/10" />
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold truncate">Rohit Verma</p>
              <p className="text-[10px] text-primary font-bold uppercase tracking-wider">Premium Member</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;