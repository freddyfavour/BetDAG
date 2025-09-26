"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import DashboardLayout from "@/components/DashboardLayout";

export default function StatsPage() {
  const { isConnected } = useAccount();
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

  return (
    <DashboardLayout>
      <div className="bg-[#0C162B] rounded-lg p-6 shadow-lg border border-gray-800/50">
        <h1 className="text-2xl font-bold text-white mb-6">Statistics</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Stats Cards */}
          <div className="bg-[#070E1B] p-4 rounded-lg border border-gray-800/50">
            <div className="text-gray-400 text-sm">Total Predictions</div>
            <div className="text-2xl font-bold text-white mt-1">124</div>
            <div className="text-green-500 text-xs mt-1">+12% from last month</div>
          </div>
          
          <div className="bg-[#070E1B] p-4 rounded-lg border border-gray-800/50">
            <div className="text-gray-400 text-sm">Accuracy Rate</div>
            <div className="text-2xl font-bold text-white mt-1">72.4%</div>
            <div className="text-green-500 text-xs mt-1">+3.2% from last month</div>
          </div>
          
          <div className="bg-[#070E1B] p-4 rounded-lg border border-gray-800/50">
            <div className="text-gray-400 text-sm">Average Return</div>
            <div className="text-2xl font-bold text-white mt-1">+5.8%</div>
            <div className="text-red-500 text-xs mt-1">-0.7% from last month</div>
          </div>
          
          <div className="bg-[#070E1B] p-4 rounded-lg border border-gray-800/50">
            <div className="text-gray-400 text-sm">Leaderboard Rank</div>
            <div className="text-2xl font-bold text-white mt-1">18</div>
            <div className="text-green-500 text-xs mt-1">+5 from last month</div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Accuracy Chart */}
          <div className="bg-[#070E1B] p-4 rounded-lg border border-gray-800/50">
            <h2 className="text-lg font-semibold text-white mb-4">Prediction Accuracy</h2>
            <div className="h-60 flex items-center justify-center">
              <div className="text-gray-400 text-sm">Chart Placeholder - Accuracy over time</div>
            </div>
          </div>
          
          {/* Assets Distribution */}
          <div className="bg-[#070E1B] p-4 rounded-lg border border-gray-800/50">
            <h2 className="text-lg font-semibold text-white mb-4">Prediction Distribution</h2>
            <div className="h-60 flex items-center justify-center">
              <div className="text-gray-400 text-sm">Chart Placeholder - Distribution by asset</div>
            </div>
          </div>
          
          {/* Prediction History */}
          <div className="bg-[#070E1B] p-4 rounded-lg border border-gray-800/50 col-span-1 lg:col-span-2">
            <h2 className="text-lg font-semibold text-white mb-4">Recent Activity</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b border-gray-800">
                    <th className="pb-3 text-gray-400">Date</th>
                    <th className="pb-3 text-gray-400">Asset</th>
                    <th className="pb-3 text-gray-400">Direction</th>
                    <th className="pb-3 text-gray-400">Predicted</th>
                    <th className="pb-3 text-gray-400">Actual</th>
                    <th className="pb-3 text-gray-400">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { date: "2025-09-23", asset: "BTC", dir: "Up", pred: "$67,450", actual: "$68,120", success: true },
                    { date: "2025-09-21", asset: "ETH", dir: "Down", pred: "$3,210", actual: "$3,450", success: false },
                    { date: "2025-09-18", asset: "SOL", dir: "Up", pred: "$127.50", actual: "$135.20", success: true }
                  ].map((item, index) => (
                    <tr key={index} className="border-b border-gray-800/50">
                      <td className="py-3 text-gray-300">{item.date}</td>
                      <td className="py-3 text-white font-medium">{item.asset}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded ${item.dir === 'Up' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                          {item.dir}
                        </span>
                      </td>
                      <td className="py-3 text-gray-300">{item.pred}</td>
                      <td className="py-3 text-gray-300">{item.actual}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded ${item.success ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                          {item.success ? 'Correct' : 'Incorrect'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}