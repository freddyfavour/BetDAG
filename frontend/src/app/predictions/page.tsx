"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import DashboardLayout from "@/components/DashboardLayout";

export default function PredictionsPage() {
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
        <h1 className="text-2xl font-bold text-white mb-6">Predictions</h1>
        
        <div className="space-y-6">
          <div className="bg-[#070E1B] rounded-lg p-4 border border-gray-800/50">
            <h2 className="text-xl font-semibold text-white mb-4">Latest AI Predictions</h2>
            
            {/* Prediction Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-[#0C162B] rounded-lg p-4 border border-gray-800/50">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-blue-400">BTC/USD</span>
                    <span className="text-green-400">+2.4%</span>
                  </div>
                  <div className="text-white font-medium">$68,420</div>
                  <div className="text-gray-400 text-sm mt-2">Predicted in 24h</div>
                  <div className="mt-4 flex justify-between">
                    <span className="text-gray-400 text-sm">Confidence</span>
                    <span className="text-white text-sm">87%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-1.5 mt-1">
                    <div className="bg-green-500 h-1.5 rounded-full" style={{width: "87%"}}></div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 text-center">
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors">
                View All Predictions
              </button>
            </div>
          </div>
          
          <div className="bg-[#070E1B] rounded-lg p-4 border border-gray-800/50">
            <h2 className="text-xl font-semibold text-white mb-4">Create Prediction</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-1 text-sm">Asset</label>
                <select className="w-full bg-[#0C162B] border border-gray-700 rounded-lg px-3 py-2 text-white">
                  <option value="btc">Bitcoin (BTC)</option>
                  <option value="eth">Ethereum (ETH)</option>
                  <option value="sol">Solana (SOL)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-300 mb-1 text-sm">Time Frame</label>
                <select className="w-full bg-[#0C162B] border border-gray-700 rounded-lg px-3 py-2 text-white">
                  <option value="24h">24 Hours</option>
                  <option value="7d">7 Days</option>
                  <option value="30d">30 Days</option>
                </select>
              </div>
              
              <button className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-teal-400 hover:opacity-90 text-white rounded-lg font-medium transition-colors">
                Generate AI Prediction
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}