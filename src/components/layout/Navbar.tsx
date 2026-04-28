"use client";

import React from 'react';
import { Plane, User, Bell, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-primary p-2 rounded-xl">
            <Plane className="text-primary-foreground w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight hidden sm:block">
            AI <span className="text-primary">Travel</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">Dashboard</a>
          <a href="#" className="hover:text-foreground transition-colors">My Trips</a>
          <a href="#" className="hover:text-foreground transition-colors">Analytics</a>
          <a href="#" className="hover:text-foreground transition-colors">Support</a>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <User className="w-5 h-5" />
          </Button>
          <Button className="hidden sm:flex rounded-full px-6">
            Sign In
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;