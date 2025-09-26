"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import DashboardLayout from "@/components/DashboardLayout";

export default function ProfilePage() {
  const { isConnected, address } = useAccount();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  
  // Set mounted state to true after the component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  // Redirect to home if wallet not connected (only after mounting)
  useEffect(() => {
    if (mounted && !isConnected) {
      router.push('/');
    }
  }, [isConnected, router, mounted]);

  // Don't render the dashboard until after client-side hydration
  if (!mounted) {
    return null;
  }

  // After hydration, check if connected
  if (!isConnected) {
    return null; // Don't render anything while redirecting
  }

  // Format address for display
  const shortenedAddress = address 
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : "";

  return (
    <DashboardLayout>
      <div className="bg-[#0C162B] rounded-lg p-6 shadow-lg border border-gray-800/50">
        <h1 className="text-2xl font-bold text-white mb-6">User Profile</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Overview */}
          <div className="bg-[#070E1B] rounded-lg p-6 border border-gray-800/50">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-teal-400 flex items-center justify-center text-white text-2xl font-bold">
                {address ? address.slice(2, 4).toUpperCase() : ""}
              </div>
              
              <div className="mt-4 text-center">
                <div className="bg-[#0C162B] px-3 py-1 rounded-lg text-white font-mono">
                  {shortenedAddress}
                </div>
                
                <div className="mt-4">
                  <span className="text-gray-400 text-sm">Joined</span>
                  <h3 className="text-white font-medium">September 2025</h3>
                </div>
                
                <div className="mt-3">
                  <span className="text-gray-400 text-sm">Rank</span>
                  <h3 className="text-white font-medium">#18</h3>
                </div>
                
                <div className="mt-3">
                  <span className="text-gray-400 text-sm">Accuracy Rate</span>
                  <h3 className="text-green-400 font-medium">72.4%</h3>
                </div>
              </div>
              
              <div className="mt-6 w-full">
                <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors">
                  Copy Address
                </button>
              </div>
            </div>
          </div>
          
          {/* Stats and Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Stats */}
            <div className="bg-[#070E1B] rounded-lg p-6 border border-gray-800/50">
              <h2 className="text-lg font-semibold text-white mb-4">Profile Stats</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-3 bg-[#0C162B] rounded-lg">
                  <div className="text-gray-400 text-xs">Total Predictions</div>
                  <div className="text-white text-xl font-semibold mt-1">124</div>
                </div>
                
                <div className="p-3 bg-[#0C162B] rounded-lg">
                  <div className="text-gray-400 text-xs">Correct Predictions</div>
                  <div className="text-white text-xl font-semibold mt-1">89</div>
                </div>
                
                <div className="p-3 bg-[#0C162B] rounded-lg">
                  <div className="text-gray-400 text-xs">Prediction Streak</div>
                  <div className="text-white text-xl font-semibold mt-1">7 days</div>
                </div>
                
                <div className="p-3 bg-[#0C162B] rounded-lg">
                  <div className="text-gray-400 text-xs">Best Asset</div>
                  <div className="text-white text-xl font-semibold mt-1">ETH</div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-white font-medium mb-2">Accuracy Trend</h3>
                <div className="h-40 flex items-center justify-center">
                  <div className="text-gray-400 text-sm">Chart Placeholder - Accuracy over time</div>
                </div>
              </div>
            </div>
            
            {/* Settings */}
            <div className="bg-[#070E1B] rounded-lg p-6 border border-gray-800/50">
              <h2 className="text-lg font-semibold text-white mb-4">Settings</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="flex items-center justify-between">
                    <span className="text-gray-300">Email Notifications</span>
                    <div className="relative inline-block w-12 h-6 rounded-full bg-gray-700">
                      <input type="checkbox" className="sr-only" />
                      <div className="block h-6 w-6 rounded-full bg-white absolute left-0"></div>
                    </div>
                  </label>
                </div>
                
                <div>
                  <label className="flex items-center justify-between">
                    <span className="text-gray-300">Public Profile</span>
                    <div className="relative inline-block w-12 h-6 rounded-full bg-blue-600">
                      <input type="checkbox" className="sr-only" checked readOnly />
                      <div className="block h-6 w-6 rounded-full bg-white absolute right-0"></div>
                    </div>
                  </label>
                </div>
                
                <div>
                  <label className="flex items-center justify-between">
                    <span className="text-gray-300">Dashboard Insights</span>
                    <div className="relative inline-block w-12 h-6 rounded-full bg-blue-600">
                      <input type="checkbox" className="sr-only" checked readOnly />
                      <div className="block h-6 w-6 rounded-full bg-white absolute right-0"></div>
                    </div>
                  </label>
                </div>
                
                <div className="pt-4">
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Recent Activity */}
          <div className="lg:col-span-3 bg-[#070E1B] rounded-lg p-6 border border-gray-800/50">
            <h2 className="text-lg font-semibold text-white mb-4">Recent Activity</h2>
            
            <div className="space-y-3">
              {[
                { type: "prediction", asset: "BTC", time: "2 hours ago", details: "Created new BTC price prediction for 24h" },
                { type: "reward", asset: "", time: "1 day ago", details: "Received prediction accuracy reward" },
                { type: "correct", asset: "ETH", time: "3 days ago", details: "ETH price prediction was correct (+8.2%)" },
                { type: "wrong", asset: "SOL", time: "5 days ago", details: "SOL price prediction was incorrect (-2.7%)" },
                { type: "milestone", asset: "", time: "1 week ago", details: "Achieved 100 predictions milestone" }
              ].map((activity, idx) => (
                <div key={idx} className="p-3 bg-[#0C162B] rounded-lg flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${getActivityBg(activity.type)}`}>
                    {getActivityIcon(activity.type)}
                  </div>
                  
                  <div className="flex-grow">
                    <div className="text-white">{activity.details}</div>
                    <div className="text-gray-400 text-sm">{activity.time}</div>
                  </div>
                  
                  {activity.asset && (
                    <div className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs">
                      {activity.asset}
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-4 text-center">
              <button className="px-4 py-2 bg-[#0C162B] hover:bg-blue-600/20 text-gray-300 hover:text-white rounded-lg text-sm transition-colors">
                View All Activity
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function getActivityBg(type: string) {
  switch (type) {
    case "prediction": return "bg-blue-500/20 text-blue-400";
    case "reward": return "bg-yellow-500/20 text-yellow-400";
    case "correct": return "bg-green-500/20 text-green-400";
    case "wrong": return "bg-red-500/20 text-red-400";
    case "milestone": return "bg-purple-500/20 text-purple-400";
    default: return "bg-gray-500/20 text-gray-400";
  }
}

function getActivityIcon(type: string) {
  switch (type) {
    case "prediction": return "📈";
    case "reward": return "🏆";
    case "correct": return "✅";
    case "wrong": return "❌";
    case "milestone": return "🎯";
    default: return "📝";
  }
}