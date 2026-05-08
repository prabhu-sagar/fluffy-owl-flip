"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User, Mail, Shield, Bell, CreditCard, LogOut, Phone, Key } from 'lucide-react';
import { showSuccess } from '@/utils/toast';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Profile = () => {
  const navigate = useNavigate();
  const [apiKey, setApiKey] = React.useState(localStorage.getItem('VITE_GEMINI_API_KEY') || '');

  const handleSignOut = () => {
    showSuccess("Signed out successfully");
    navigate('/login');
  };

  const saveApiKey = () => {
    localStorage.setItem('VITE_GEMINI_API_KEY', apiKey);
    showSuccess("API Key saved to local storage!");
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12 px-4 lg:px-8 container mx-auto">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold">Account Settings</h1>
            <p className="text-slate-500 text-sm">Manage your profile and travel preferences.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1 space-y-6">
              <Card className="p-6 bg-white border-slate-200 text-center shadow-sm rounded-3xl">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-blue-400 mx-auto mb-4 border-4 border-white shadow-xl" />
                <h3 className="font-bold text-xl">Rohit Verma</h3>
                <p className="text-sm text-primary font-bold uppercase tracking-wider mb-6">Premium Member</p>
                <Button variant="outline" className="w-full rounded-xl border-slate-200 hover:bg-slate-50">
                  Change Avatar
                </Button>
              </Card>

              <nav className="space-y-2">
                {[
                  { icon: User, label: 'Personal Info', active: true },
                  { icon: Shield, label: 'Security' },
                  { icon: Key, label: 'API Configuration' },
                  { icon: Bell, label: 'Notifications' },
                ].map((item, i) => (
                  <button 
                    key={i}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
                      item.active ? "bg-primary/10 text-primary" : "text-slate-500 hover:bg-slate-50"
                    )}
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="font-medium text-sm">{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            <div className="md:col-span-2 space-y-6">
              <Card className="p-8 bg-white border-slate-200 space-y-6 shadow-sm rounded-3xl">
                <div className="space-y-6">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" /> Personal Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase">Full Name</label>
                      <Input defaultValue="Rohit Verma" className="bg-slate-50 border-slate-200 rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase">Email Address</label>
                      <Input defaultValue="rohit.v@example.com" className="bg-slate-50 border-slate-200 rounded-xl" />
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 space-y-6">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <Key className="w-5 h-5 text-primary" /> AI Configuration
                  </h3>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase">Gemini API Key</label>
                    <div className="flex gap-2">
                      <Input 
                        type="password"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="Enter your Gemini API Key" 
                        className="bg-slate-50 border-slate-200 rounded-xl flex-1" 
                      />
                      <Button onClick={saveApiKey} className="rounded-xl">Save Key</Button>
                    </div>
                    <p className="text-[10px] text-slate-400">Your key is stored locally in your browser and never sent to our servers.</p>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
                  <Button 
                    variant="ghost" 
                    onClick={handleSignOut}
                    className="text-red-500 hover:text-red-600 hover:bg-red-50 gap-2"
                  >
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

export default Profile;