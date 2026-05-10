"use client";

import React from 'react';
import { Card } from '@/components/ui/card';
import { User, Lock, Bell, Shield, Trash2, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { showSuccess, showError } from '@/utils/toast';

const AccountSettingsList = () => {
  const [settingsState, setSettingsState] = React.useState({
    notifications: true,
    privacy: 'Public'
  });

  const handleSettingClick = (label: string) => {
    switch (label) {
      case 'Personal Information':
        showSuccess("Redirecting to detailed personal info editor...");
        break;
      case 'Change Password':
        showSuccess("A password reset link has been sent to your email.");
        break;
      case 'Notification Settings':
        const newNotif = !settingsState.notifications;
        setSettingsState(prev => ({ ...prev, notifications: newNotif }));
        showSuccess(`Notifications ${newNotif ? 'enabled' : 'disabled'}`);
        break;
      case 'Privacy & Security':
        const newPrivacy = settingsState.privacy === 'Public' ? 'Private' : 'Public';
        setSettingsState(prev => ({ ...prev, privacy: newPrivacy }));
        showSuccess(`Profile visibility set to ${newPrivacy}`);
        break;
      case 'Delete Account':
        showError("Critical: Please contact support to initiate account deletion.");
        break;
      default:
        showSuccess(`Opening ${label}...`);
    }
  };

  const settings = [
    { icon: User, label: 'Personal Information', color: 'text-slate-400' },
    { icon: Lock, label: 'Change Password', color: 'text-slate-400' },
    { 
      icon: Bell, 
      label: 'Notification Settings', 
      color: 'text-slate-400', 
      sub: settingsState.notifications ? 'On' : 'Off' 
    },
    { 
      icon: Shield, 
      label: 'Privacy & Security', 
      color: 'text-slate-400', 
      sub: settingsState.privacy 
    },
    { icon: Trash2, label: 'Delete Account', color: 'text-red-500', isDanger: true },
  ];

  return (
    <Card className="p-6 bg-white border-slate-100 rounded-[2rem] shadow-sm h-full">
      <h3 className="text-lg font-black text-slate-900 mb-6">Account Settings</h3>
      <div className="space-y-1">
        {settings.map((item, i) => (
          <button
            key={i}
            onClick={() => handleSettingClick(item.label)}
            className={cn(
              "w-full flex items-center justify-between p-3 rounded-xl transition-all hover:bg-slate-50 group",
              item.isDanger && "hover:bg-red-50"
            )}
          >
            <div className="flex items-center gap-3">
              <item.icon className={cn("w-4 h-4", item.color)} />
              <div className="text-left">
                <p className={cn("text-sm font-bold", item.isDanger ? "text-red-500" : "text-slate-600")}>
                  {item.label}
                </p>
                {item.sub && <p className="text-[10px] text-slate-400 font-medium">{item.sub}</p>}
              </div>
            </div>
            <ChevronRight size={16} className="text-slate-300 group-hover:text-slate-400 transition-colors" />
          </button>
        ))}
      </div>
    </Card>
  );
};

export default AccountSettingsList;