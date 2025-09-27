"use client";

import React, { useEffect, useState } from "react";
import Logo from "@/components/Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  DashboardIcon, 
  PredictIcon, 
  StatsIcon, 
  LeaderboardIcon, 
  WalletIcon, 
  ProfileIcon,
  SettingsIcon,
  LogoutIcon,
  SearchIcon,
  NotificationIcon,
  AdminIcon
} from "@/components/SidebarIcons";
import { useRouter } from "next/navigation";
import { useDisconnect } from "wagmi";
import Image from "next/image";
import { useIsAdmin } from "@/hooks/useIsAdmin";

const defaultTabs = [
  { name: "Dashboard", href: "/dashboard", icon: DashboardIcon },
  { name: "Predict", href: "/predictions", icon: PredictIcon },
  { name: "Stats", href: "/stats", icon: StatsIcon },
  { name: "Leaderboard", href: "/leaderboard", icon: LeaderboardIcon, badge: 1 },
  { name: "Wallet", href: "/wallet", icon: WalletIcon },
  { name: "My Account", href: "/profile", icon: ProfileIcon, badge: 2 },
];

interface TabProps {
  name: string;
  href: string;
  icon: React.ComponentType<{className?: string}>;
  badge?: number;
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { disconnect } = useDisconnect();
  const { isAdmin } = useIsAdmin();
  
  // Create tabs based on user role
  const tabs: TabProps[] = [
    ...defaultTabs,
    // Add Admin tab only for admin users
    ...(isAdmin ? [{ name: "Admin", href: "/admin", icon: AdminIcon }] : [])
  ];
  
  const handleLogout = () => {
    disconnect();
    router.push('/');
  };

  return (
    <div className="flex min-h-screen bg-[#0A0A0A]">
      {/* Sidebar */}
      <aside className="w-[200px] bg-[#0A1638] flex flex-col justify-between">
        {/* Top part of sidebar with logo */}
        <div>
          <div className="flex justify-center items-center h-16 border-b border-gray-800/50">
            <Logo />
          </div>
          
          {/* Navigation links */}
          <nav className="flex flex-col w-full mt-5">
            {tabs.map((tab: TabProps) => {
              const isActive = pathname === tab.href || (tab.href !== '/dashboard' && pathname.startsWith(tab.href));
              const Icon = tab.icon;
              
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={`flex items-center px-6 py-2.5 mx-2 my-0.5 rounded-lg ${
                    isActive 
                    ? "text-white bg-blue-600/20" 
                    : "text-gray-400 hover:text-white hover:bg-[#1A2A4A]/30"
                  } transition-colors text-sm`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="ml-3">{tab.name}</span>
                  {tab.badge && (
                    <div className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {tab.badge}
                    </div>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
        
        {/* Bottom part with settings and logout */}
        <div className="mb-4">
          <Link
            href="/settings"
            className="flex items-center px-6 py-2.5 mx-2 my-0.5 rounded-lg text-gray-400 hover:text-white hover:bg-[#1A2A4A]/30 transition-colors text-sm"
          >
            <SettingsIcon className="w-5 h-5" />
            <span className="ml-3">Settings</span>
          </Link>
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-6 py-2.5 mx-2 my-0.5 rounded-lg text-gray-400 hover:text-white hover:bg-[#1A2A4A]/30 transition-colors text-sm"
          >
            <LogoutIcon className="w-5 h-5" />
            <span className="ml-3">Log Out</span>
          </button>
        </div>
      </aside>
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Top navbar */}
        <header className="h-16 border-b border-gray-800/50 bg-[#0A1638]/90 backdrop-blur-sm flex items-center justify-between px-6">
          {/* Search bar */}
          <div className="relative ml-2">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="w-4 h-4 text-gray-500" />
            </div>
            <input 
              type="text" 
              placeholder="Search for anything" 
              className="bg-[#1A1A1A]/60 border border-gray-800/50 text-sm text-gray-300 pl-10 pr-4 py-2 rounded-full w-64 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          
          {/* Right side items */}
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-400 hover:text-white rounded-full hover:bg-[#1A2A4A]/30">
              <NotificationIcon className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            <div className="flex items-center space-x-3 border-l border-gray-800/50 pl-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 overflow-hidden">
                {/* User avatar */}
                <Image 
                  width={32} 
                  height={32} 
                  src="/vercel.svg" 
                  alt="User" 
                  className="object-cover" 
                />
              </div>
              <div>
                <p className="text-sm text-white font-medium">Bitkun Gredle</p>
                <p className="text-xs text-gray-400">Student</p>
              </div>
            </div>
          </div>
        </header>
        
        {/* Main content */}
        <main className="flex-1 p-6 overflow-auto bg-[#0A0A0A]">
          {children}
        </main>
      </div>
    </div>
  );
}
