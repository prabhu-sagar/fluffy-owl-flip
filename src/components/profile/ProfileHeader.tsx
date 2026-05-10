"use client";

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Edit3, CheckCircle2, Camera } from 'lucide-react';

interface ProfileHeaderProps {
  name: string;
  email: string;
}

const ProfileHeader = ({ name, email }: ProfileHeaderProps) => {
  return (
    <Card className="p-8 bg-white border-slate-100 rounded-[2.5rem] shadow-sm overflow-hidden relative">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="relative group">
          <div className="w-32 h-32 rounded-full bg-slate-100 border-4 border-white shadow-xl overflow-hidden">
            <img 
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`} 
              alt="Avatar" 
              className="w-full h-full object-cover"
            />
          </div>
          <button className="absolute bottom-1 right-1 bg-white p-2 rounded-full shadow-lg border border-slate-100 text-slate-400 hover:text-primary transition-colors">
            <Camera size={16} />
          </button>
        </div>

        <div className="flex-1 text-center md:text-left space-y-4">
          <div className="space-y-1">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <h2 className="text-3xl font-black text-slate-900">{name}</h2>
              <CheckCircle2 className="text-primary w-6 h-6 fill-primary/10" />
            </div>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-slate-500 font-medium">
              <span className="flex items-center gap-1.5"><Mail size={14} className="text-slate-400" /> {email}</span>
              <span className="flex items-center gap-1.5"><Phone size={14} className="text-slate-400" /> +91 98765 43210</span>
              <span className="flex items-center gap-1.5"><MapPin size={14} className="text-slate-400" /> Mumbai, Maharashtra, India</span>
            </div>
          </div>
          <Button variant="outline" className="rounded-xl border-slate-200 font-bold gap-2 h-10 px-6">
            <Edit3 size={16} /> Edit Profile
          </Button>
        </div>

        <div className="flex gap-4 lg:gap-8 border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0 md:pl-8 w-full md:w-auto justify-center">
          <div className="text-center space-y-1">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto">
              <div className="w-6 h-6 bg-blue-500 rounded-lg" />
            </div>
            <p className="text-xl font-black text-slate-900">12</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Trips Planned</p>
          </div>
          <div className="text-center space-y-1">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto">
              <div className="w-6 h-6 bg-emerald-500 rounded-lg" />
            </div>
            <p className="text-xl font-black text-slate-900">8</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Trips Completed</p>
          </div>
          <div className="text-center space-y-1">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center mx-auto">
              <div className="w-6 h-6 bg-amber-500 rounded-lg" />
            </div>
            <p className="text-xl font-black text-slate-900">4.7</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Avg. Rating</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProfileHeader;