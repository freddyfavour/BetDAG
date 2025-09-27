"use client";

import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <div className="bg-[#0A1638]/40 rounded-lg p-6 text-gray-300">
          <p>Your settings will appear here.</p>
        </div>
      </div>
    </DashboardLayout>
  );
}