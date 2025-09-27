"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccount, useContractRead } from "wagmi";
import DashboardLayout from "@/components/DashboardLayout";
import PredictionCard from "@/components/PredictionCard";
import { abi } from "@/constants/abi";

// Define the contract address
const CONTRACT_ADDRESS = "xB52531995fC4a25DA26a0Ca64C4D27b696feb3AE"; // Replace with actual address

// Define types for Market data
interface Market {
  id: number;
  question: string;
  imageUrl?: string;
  expiry?: number;
  resolved?: boolean;
  outcome?: boolean | null;
  totalYes?: number;
  totalNo?: number;
  yesPercent: number;
  noPercent: number;
  aiCommentary: string;
  symbol?: string;
}

// Define AI prediction response type
interface AIPrediction {
  symbol: string;
  timestamp: string;
  probability_up: number;
  probability_down: number;
  commentary: string;
  source_data: {
    symbol: string;
    coin_id: string;
    price_usd: number;
    "24h_change_pct": number;
    volume_24h: number;
    market_cap: number;
    last_updated: string;
    analysis_timestamp: string;
  };
}

// Map crypto symbols to human-readable titles
const symbolToTitle: {[key: string]: string} = {
  bitcoin: "BTC in next 24h",
  ethereum: "ETH in next 24h",
  solana: "SOL in next 24h",
  ripple: "XRP in next 24h"
};

export default function PredictionsPage() {
  const { isConnected } = useAccount();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [markets, setMarkets] = useState<Market[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Fetch AI predictions
  const fetchAIPredictions = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/predictions');
      
      if (!response.ok) {
        throw new Error('Failed to fetch predictions');
      }
      
      const predictions: AIPrediction[] = await response.json();
      
      // Map AI predictions to market format
      const mappedMarkets: Market[] = predictions.map((prediction, index) => {
        // Get the market ID (1-based since array is 0-based)
        const id = index + 1;
        
        // Use the EXACT same mock values as in the detail page for matching IDs
        let totalYes, totalNo;
        
        if (id === 1) { // Bitcoin
          totalYes = 3.5 * 10**18;
          totalNo = 1.8 * 10**18;
        } else if (id === 2) { // Ethereum
          totalYes = 2.2 * 10**18;
          totalNo = 1.8 * 10**18;
        } else if (id === 3) { // Solana
          totalYes = 5.5 * 10**18;
          totalNo = 1.8 * 10**18;
        } else if (id === 4) { // XRP/Ripple
          totalYes = 1.5 * 10**18;
          totalNo = 3.8 * 10**18;
        } else {
          // Fallback using the prediction probabilities
          totalYes = prediction.probability_up * 10**18;
          totalNo = prediction.probability_down * 10**18;
        }
        
        // Calculate percentages EXACTLY as in the detail page
        const totalPool = totalYes + totalNo;
        const yesPercent = totalPool > 0 ? Math.round((totalYes / totalPool) * 100) : 50;
        const noPercent = totalPool > 0 ? Math.round((totalNo / totalPool) * 100) : 50;
        
        return {
          id: index + 1,
          question: prediction.symbol && symbolToTitle[prediction.symbol] ? 
                    symbolToTitle[prediction.symbol] : 
                    `${prediction.symbol ? prediction.symbol.toUpperCase() : 'Crypto'} prediction`,
          yesPercent: yesPercent, // Using the calculated percentages
          noPercent: noPercent,
          aiCommentary: prediction.commentary,
          symbol: prediction.symbol,
          // These would come from the smart contract in production
          expiry: Math.floor(Date.now() / 1000) + 86400, // 24 hours from now
          resolved: false,
          outcome: null,
          totalYes: totalYes,
          totalNo: totalNo
        };
      });
      
      setMarkets(mappedMarkets);
    } catch (error) {
      console.error("Error fetching AI predictions:", error);
            // Fallback to default predictions
      // Define mock data exactly as in the detail page
      const btcYes = 3.5 * 10**18; // Use exact same values as in detail page (mockMarkets)
      const btcNo = 1.8 * 10**18;
      const ethYes = 2.2 * 10**18;
      const ethNo = 1.8 * 10**18;
      const solYes = 5.5 * 10**18;
      const solNo = 1.8 * 10**18;
      
      // Calculate percentages exactly as in detail page
      const btcTotal = btcYes + btcNo;
      const btcYesPercent = btcTotal > 0 ? Math.round((btcYes / btcTotal) * 100) : 50;
      const btcNoPercent = btcTotal > 0 ? Math.round((btcNo / btcTotal) * 100) : 50;
      
      const ethTotal = ethYes + ethNo;
      const ethYesPercent = ethTotal > 0 ? Math.round((ethYes / ethTotal) * 100) : 50;
      const ethNoPercent = ethTotal > 0 ? Math.round((ethNo / ethTotal) * 100) : 50;
      
      const solTotal = solYes + solNo;
      const solYesPercent = solTotal > 0 ? Math.round((solYes / solTotal) * 100) : 50;
      const solNoPercent = solTotal > 0 ? Math.round((solNo / solTotal) * 100) : 50;
      
      setMarkets([
        {
          id: 1,
          question: "BTC in next 24h",
          yesPercent: btcYesPercent,
          noPercent: btcNoPercent,
          aiCommentary: "ETF rumors spark optimism in BTC.",
          symbol: "bitcoin",
          totalYes: btcYes,
          totalNo: btcNo
        },
        {
          id: 2,
          question: "ETH in next 24h",
          yesPercent: ethYesPercent,
          noPercent: ethNoPercent,
          aiCommentary: "Ethereum upgrades gaining momentum but facing resistance.",
          symbol: "ethereum",
          totalYes: ethYes,
          totalNo: ethNo
        },
        {
          id: 3,
          question: "SOL in next 24h",
          yesPercent: solYesPercent,
          noPercent: solNoPercent,
          aiCommentary: "Strong ecosystem growth driving Solana price expectations.",
          symbol: "solana",
          totalYes: solYes,
          totalNo: solNo
        }
      ]);
    } finally {
      setLoading(false);
    }
  };
  
  // Set mounted state to true after the component mounts and fetch data
  useEffect(() => {
    setMounted(true);
    
    if (mounted && isConnected) {
      fetchAIPredictions();
    }
  }, [mounted, isConnected]);

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
              {loading ? (
                // Loading states
                Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="bg-[#0C162B] rounded-lg p-6 border border-gray-800/50 animate-pulse">
                    <div className="h-6 bg-gray-700 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-700 rounded w-1/2 mb-3"></div>
                    <div className="h-8 bg-gray-700 rounded w-1/4 mb-5"></div>
                    <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                  </div>
                ))
              ) : (
                // Display actual prediction cards
                markets.map((market) => (
                  <PredictionCard
                    key={market.id}
                    marketId={market.id}
                    title={market.question}
                    yesPercent={market.yesPercent}
                    noPercent={market.noPercent}
                    aiCommentary={market.aiCommentary}
                    symbol={market.symbol}
                    totalYes={market.totalYes}
                    totalNo={market.totalNo}
                  />
                ))
              )}
            </div>
            
            <div className="mt-6 text-center">
              <button 
                onClick={() => console.log("View all predictions clicked")}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors"
              >
                View All Predictions
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}