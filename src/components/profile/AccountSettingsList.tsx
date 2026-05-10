"use client";

import React from 'react';
import { Card } from '@/components/ui/card';
import { User, Lock, Bell, Shield, Trash2, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const AccountSettingsList = () => {
  const settings = [
    { icon: User, label: 'Personal Information', color: 'text-slate-400' },
    { icon: Lock, label: 'Change Password', color: 'text-slate-400' },
    { icon: Bell, label: 'Notification Settings', color: 'text-slate-400' },
    { icon: Shield, label: 'Privacy & Security', color: 'text-slate-400' },
    { icon: Trash2, label: 'Delete Account', color: 'text-red-500', isDanger: true },
  ];

  return (
    <Card className="p-6 bg-white border-slate-100 rounded-[2rem] shadow-sm h-full">
      <h3 className="text-lg font-black text-slate-900 mb-6">Account Settings</h3>
      <div className="space-y-1">
        {settings.map((item, i) => (
          <button
            key={i}
            className={cn(
              "w-full flex items-center justify-between p-3 rounded-xl transition-all hover:bg-slate-50 group",
              item.isDanger && "hover:bg-red-50"
            )}
          >
            <div className="flex items-center gap-3">
              <item.icon className={cn("w-4 h-4", item.color)} />
              <span className={cn("text-sm font-bold", item.isDanger ? "text-red-500" : "text-slate-600")}>
                {item.label}
              </span>
            </div>
            <ChevronRight size={16} className="text-slate-300 group-hover:text-slate-400 transition-colors" />
          </button>
        ))}
      </div>
    </Card>
  );
};

export default AccountSettingsList;