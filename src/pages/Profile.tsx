"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import ProfileHeader from '@/components/profile/ProfileHeader';
import TravelPreferences from '@/components/profile/TravelPreferences';
import QuickActions from '@/components/profile/QuickActions';
import RecentTrips from '@/components/profile/RecentTrips';
import SavedPlacesList from '@/components/profile/SavedPlacesList';
import AccountSettingsList from '@/components/profile/AccountSettingsList';
import { Bell, User as UserIcon } from 'lucide-react';

const Profile = () => {
  // Dynamic user data from localStorage
  const userName = localStorage.getItem('user_name') || 'Rohan Verma';
  const userEmail = localStorage.getItem('user_email') || 'rohanverma@example.com';

  return (
    <div className="min-h-screen bg-[#fcfdfe] text-slate-900 flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12 px-4 lg:px-8 container mx-auto max-w-6xl space-y-8">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black tracking-tight">My Profile</h1>
            <p className="text-slate-500 text-sm font-medium">Manage your account, preferences and travel information</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2.5 rounded-2xl bg-white border border-slate-100 shadow-sm text-slate-400 hover:text-primary transition-all relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-white shadow-sm overflow-hidden">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`} alt="User" />
            </div>
          </div>
        </div>

        {/* Main Profile Card */}
        <ProfileHeader name={userName} email={userEmail} />

        {/* Preferences and Actions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7">
            <TravelPreferences />
          </div>
          <div className="lg:col-span-5">
            <QuickActions />
          </div>
        </div>

        {/* Recent Trips Section */}
        <RecentTrips />

        {/* Bottom Grid: Saved Places and Settings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SavedPlacesList />
          <AccountSettingsList />
        </div>

        {/* Footer Copyright */}
        <div className="text-center pt-8">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            © 2024 AI Travel Planner. All rights reserved.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Profile;