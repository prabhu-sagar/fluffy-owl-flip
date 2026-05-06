"use client";

import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User, Mail, Shield, Bell, CreditCard, LogOut } from 'lucide-react';
import { showSuccess } from '@/utils/toast';

const Profile = () => {
  return (
    <div className="min-h-screen bg-[#0a0b14] text-white flex">
      <Sidebar />
      
      <main className="flex-1 ml-20 lg:ml-64 p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold">Account Settings</h1>
            <p className="text-slate-400 text-sm">Manage your profile and travel preferences.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1 space-y-6">
              <Card className="p-6 bg-[#1a1c2e]/60 border-[#2d2f45] text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-purple-500 mx-auto mb-4 border-4 border-white/5 shadow-xl" />
                <h3 className="font-bold text-xl">Rohit Verma</h3>
                <p className="text-sm text-primary font-bold uppercase tracking-wider mb-6">Premium Member</p>
                <Button variant="outline" className="w-full rounded-xl border-white/10 hover:bg-white/5">
                  Change Avatar
                </Button>
              </Card>

              <nav className="space-y-2">
                {[
                  { icon: User, label: 'Personal Info', active: true },
                  { icon: Shield, label: 'Security' },
                  { icon: Bell, label: 'Notifications' },
                  { icon: CreditCard, label: 'Payments' },
                ].map((item, i) => (
                  <button 
                    key={i}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
                      item.active ? "bg-primary/10 text-primary" : "text-slate-400 hover:bg-white/5"
                    )}
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="font-medium text-sm">{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            <div className="md:col-span-2 space-y-6">
              <Card className="p-8 bg-[#1a1c2e]/60 border-[#2d2f45] space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Full Name</label>
                    <Input defaultValue="Rohit Verma" className="bg-white/5 border-white/10 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Email Address</label>
                    <Input defaultValue="rohit.v@example.com" className="bg-white/5 border-white/10 rounded-xl" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Travel Preference</label>
                  <div className="grid grid-cols-3 gap-3">
                    {['Eco-Friendly', 'Fastest', 'Budget'].map(pref => (
                      <button key={pref} className="p-3 rounded-xl border border-white/10 text-xs font-bold hover:border-primary/50 transition-all">
                        {pref}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5 flex justify-between items-center">
                  <Button variant="ghost" className="text-red-400 hover:text-red-300 hover:bg-red-400/10 gap-2">
                    <LogOut className="w-4 h-4" /> Sign Out
                  </Button>
                  <Button onClick={() => showSuccess("Profile updated!")} className="rounded-xl px-8 shadow-lg shadow-primary/20">
                    Save Changes
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

import { cn } from '@/lib/utils';
export default Profile;