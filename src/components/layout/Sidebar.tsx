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
import { useNavigate, useLocation } from 'react-router-dom';
import { showSuccess } from '@/utils/toast';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Bookmark, label: 'My Trips', path: '/trips' },
    { icon: Compass, label: 'Explore', path: '/explore' },
    { icon: MessageSquare, label: 'AI Assistant', path: '/assistant' },
    { icon: Bell, label: 'Alerts', path: '/alerts' },
  ];

  const bottomItems = [
    { icon: User, label: 'Profile', path: '/profile' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  const handleNavigation = (path: string, label: string) => {
    if (path.startsWith('/') && !['/explore', '/assistant', '/alerts', '/settings'].includes(path)) {
      navigate(path);
    } else {
      showSuccess(`${label} feature coming soon!`);
    }
  };

  return (
    <aside className="w-20 lg:w-64 h-screen fixed left-0 top-0 bg-white border-r border-slate-200 flex flex-col py-8 z-50">
      <div className="px-6 mb-10 flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
        <div className="bg-primary p-2 rounded-xl shadow-lg shadow-primary/20">
          <Plane className="text-white w-6 h-6" />
        </div>
        <span className="font-bold text-xl hidden lg:block tracking-tight text-slate-900">
          AI <span className="text-primary">Travel</span>
        </span>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item, idx) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={idx}
              onClick={() => handleNavigation(item.path, item.label)}
              className={cn(
                "w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all group",
                isActive ? "bg-primary/10 text-primary" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive ? "text-primary" : "group-hover:scale-110 transition-transform")} />
              <span className="font-bold hidden lg:block">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="px-4 space-y-1">
        {bottomItems.map((item, idx) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={idx}
              onClick={() => handleNavigation(item.path, item.label)}
              className={cn(
                "w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all group",
                isActive ? "bg-primary/10 text-primary" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive ? "text-primary" : "group-hover:scale-110 transition-transform")} />
              <span className="font-bold hidden lg:block">{item.label}</span>
            </button>
          );
        })}
        
        <div className="mt-6 pt-6 border-t border-slate-100 hidden lg:block">
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-white shadow-sm overflow-hidden">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Rohit" alt="User" />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold truncate text-slate-900">Rohit Verma</p>
              <p className="text-[10px] text-primary font-bold uppercase tracking-wider">Premium Member</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;