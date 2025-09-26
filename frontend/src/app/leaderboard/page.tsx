"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import DashboardLayout from "@/components/DashboardLayout";

export default function LeaderboardPage() {
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
        <h1 className="text-2xl font-bold text-white mb-6">Leaderboard</h1>
        
        <div className="mb-8 bg-[#070E1B] p-4 rounded-lg border border-gray-800/50">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
            <h2 className="text-lg font-semibold text-white">Global Rankings</h2>
            
            <div className="mt-2 sm:mt-0 flex space-x-2">
              <select className="bg-[#0C162B] border border-gray-700 rounded-lg px-3 py-1 text-white text-sm">
                <option value="alltime">All Time</option>
                <option value="month">This Month</option>
                <option value="week">This Week</option>
              </select>
              
              <select className="bg-[#0C162B] border border-gray-700 rounded-lg px-3 py-1 text-white text-sm">
                <option value="accuracy">Accuracy</option>
                <option value="volume">Prediction Volume</option>
                <option value="return">Return</option>
              </select>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-800">
                  <th className="pb-3 text-gray-400 text-sm">Rank</th>
                  <th className="pb-3 text-gray-400 text-sm">User</th>
                  <th className="pb-3 text-gray-400 text-sm">Predictions</th>
                  <th className="pb-3 text-gray-400 text-sm">Accuracy</th>
                  <th className="pb-3 text-gray-400 text-sm">Avg. Return</th>
                  <th className="pb-3 text-gray-400 text-sm">Score</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { rank: 1, user: "0x8a...4f3b", predictions: 342, accuracy: "89.7%", return: "+12.4%", score: 9840 },
                  { rank: 2, user: "0x3c...1e9a", predictions: 287, accuracy: "84.2%", return: "+10.8%", score: 9215 },
                  { rank: 3, user: "0x5d...7b2c", predictions: 421, accuracy: "78.9%", return: "+15.2%", score: 8930 },
                  { rank: 4, user: "0x2f...6a9d", predictions: 156, accuracy: "90.1%", return: "+8.7%", score: 8845 },
                  { rank: 5, user: "0x9e...3c8f", predictions: 273, accuracy: "82.6%", return: "+9.3%", score: 8712 },
                  { rank: 6, user: "0x1a...5e7d", predictions: 184, accuracy: "85.3%", return: "+7.9%", score: 8690 },
                  { rank: 7, user: "0x7b...2d4e", predictions: 329, accuracy: "79.4%", return: "+11.2%", score: 8574 },
                  { rank: 8, user: "0x4e...8c3a", predictions: 246, accuracy: "83.1%", return: "+8.5%", score: 8532 },
                  { rank: 9, user: "0x6f...9d2b", predictions: 192, accuracy: "86.7%", return: "+6.9%", score: 8475 },
                  { rank: 10, user: "0xc1...7a4f", predictions: 305, accuracy: "80.2%", return: "+9.8%", score: 8420 },
                ].map((item, idx) => (
                  <tr key={idx} className={`border-b border-gray-800/50 ${item.rank === 1 ? 'bg-gradient-to-r from-yellow-500/10 to-transparent' : ''}`}>
                    <td className="py-4 font-bold text-white">{item.rank}</td>
                    <td>
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${getGradientByRank(item.rank)} flex items-center justify-center mr-2`}>
                          {item.rank <= 3 ? (
                            <span className="text-white font-bold">{item.rank}</span>
                          ) : null}
                        </div>
                        <span className="text-gray-300">{item.user}</span>
                      </div>
                    </td>
                    <td className="text-gray-300">{item.predictions}</td>
                    <td className="text-green-400">{item.accuracy}</td>
                    <td className="text-green-400">{item.return}</td>
                    <td className="font-semibold text-white">{item.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 flex justify-center">
            <div className="inline-flex rounded-md">
              <button className="px-3 py-1 rounded-l-lg bg-blue-600 text-white">1</button>
              <button className="px-3 py-1 bg-[#0C162B] text-gray-300 hover:bg-blue-600/20 hover:text-white">2</button>
              <button className="px-3 py-1 bg-[#0C162B] text-gray-300 hover:bg-blue-600/20 hover:text-white">3</button>
              <button className="px-3 py-1 bg-[#0C162B] text-gray-300 hover:bg-blue-600/20 hover:text-white">...</button>
              <button className="px-3 py-1 rounded-r-lg bg-[#0C162B] text-gray-300 hover:bg-blue-600/20 hover:text-white">10</button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#070E1B] p-4 rounded-lg border border-gray-800/50">
            <h2 className="text-lg font-semibold text-white mb-4">Top Performers This Week</h2>
            <div className="space-y-4">
              {[
                { user: "0x8a...4f3b", change: "+12 ranks", accuracy: "94.2%" },
                { user: "0x3c...1e9a", change: "+8 ranks", accuracy: "91.7%" },
                { user: "0x5d...7b2c", change: "+5 ranks", accuracy: "89.3%" }
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 bg-[#0C162B] rounded-lg">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center mr-2">
                      <span className="text-white font-bold">{idx + 1}</span>
                    </div>
                    <span className="text-gray-300">{item.user}</span>
                  </div>
                  <div>
                    <span className="text-green-400 text-sm">{item.change}</span>
                    <span className="text-gray-400 text-sm ml-2">({item.accuracy})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-[#070E1B] p-4 rounded-lg border border-gray-800/50">
            <h2 className="text-lg font-semibold text-white mb-4">Your Position</h2>
            <div className="p-4 bg-[#0C162B] rounded-lg">
              <div className="flex justify-between mb-3">
                <span className="text-gray-400">Current Rank</span>
                <span className="text-white font-bold">#18</span>
              </div>
              <div className="flex justify-between mb-3">
                <span className="text-gray-400">Points to Next Rank</span>
                <span className="text-white">42 pts</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Monthly Change</span>
                <span className="text-green-400">+5 ranks</span>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-800">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Progress to next rank</span>
                  <span className="text-blue-400">78%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-1.5">
                  <div className="bg-blue-500 h-1.5 rounded-full" style={{width: "78%"}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function getGradientByRank(rank: number) {
  if (rank === 1) return 'from-yellow-500 to-amber-600';
  if (rank === 2) return 'from-gray-300 to-gray-400';
  if (rank === 3) return 'from-amber-700 to-amber-800';
  return 'from-blue-600 to-blue-700';
}