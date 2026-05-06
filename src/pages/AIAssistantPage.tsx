"use client";

import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import AIAssistant from '@/components/travel/AIAssistant';

const AIAssistantPage = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex">
      <Sidebar />
      <main className="flex-1 ml-20 lg:ml-64 p-8 flex flex-col">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">AI Concierge</h1>
          <p className="text-slate-500 text-sm">Your personal travel assistant, powered by neural networks.</p>
        </div>
        <div className="flex-1 max-w-4xl mx-auto w-full">
          <AIAssistant weather="Clear" distance={600} />
        </div>
      </main>
    </div>
  );
};

export default AIAssistantPage;