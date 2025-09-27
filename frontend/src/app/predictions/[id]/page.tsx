"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import DashboardLayout from "@/components/DashboardLayout";

// Define types for Market data
interface Market {
  id: number;
  question: string;
  imageUrl: string;
  expiry: number;
  resolved: boolean;
  outcome: boolean | null;
  totalYes: number;
  totalNo: number;
}

// Define types for market totals
interface MarketTotals {
  totalYes: number;
  totalNo: number;
  yesPercent: number;
  noPercent: number;
}

// Map IDs to symbols for the API
const idToSymbol: { [key: string]: string } = {
  "1": "bitcoin",
  "2": "ethereum",
  "3": "solana",
  "4": "ripple"
};

// Mock data for demonstration
const mockMarkets: { [key: string]: Market } = {
  "1": {
    id: 1,
    question: "BTC in next 24h",
    imageUrl: "",
    expiry: Date.now() / 1000 + 86400,
    resolved: false,
    outcome: null,
    totalYes: 3.5 * 10**18,
    totalNo: 1.8 * 10**18
  },
  "2": {
    id: 2,
    question: "ETH in next 24h",
    imageUrl: "",
    expiry: Date.now() / 1000 + 172800,
    resolved: false,
    outcome: null,
    totalYes: 2.2 * 10**18,
    totalNo: 1.8 * 10**18
  },
  "3": {
    id: 3,
    question: "SOL in next 24h",
    imageUrl: "",
    expiry: Date.now() / 1000 + 259200,
    resolved: false,
    outcome: null,
    totalYes: 5.5 * 10**18,
    totalNo: 1.8 * 10**18
  },
  "4": {
    id: 4,
    question: "XRP in next 24h",
    imageUrl: "",
    expiry: Date.now() / 1000 + 259200,
    resolved: false,
    outcome: null,
    totalYes: 1.5 * 10**18,
    totalNo: 3.8 * 10**18
  }
};

// Define AI prediction type
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

export default function PredictionDetailPage() {
  const { id } = useParams();
  const marketId = typeof id === "string" ? id : Array.isArray(id) ? id[0] : "1";
  
  const { isConnected } = useAccount();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  
  // State for betting modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [betChoice, setBetChoice] = useState<boolean | null>(null);
  const [betAmount, setBetAmount] = useState("");
  const [hasBet, setHasBet] = useState(false);
  const [isBetting, setIsBetting] = useState(false);
  
  // State for AI commentary
  const [aiCommentary, setAiCommentary] = useState<string>("");
  const [aiLoading, setAiLoading] = useState(false);
  
  // Get mock market data
  const market = mockMarkets[marketId] || mockMarkets["1"];
  
  // Calculate market totals
  const totalPool = market.totalYes + market.totalNo;
  const yesPercent = totalPool > 0 ? Math.round((market.totalYes / totalPool) * 100) : 50;
  const noPercent = totalPool > 0 ? Math.round((market.totalNo / totalPool) * 100) : 50;
  
  const marketTotals: MarketTotals = {
    totalYes: market.totalYes,
    totalNo: market.totalNo,
    yesPercent,
    noPercent
  };
  
  // Fetch AI commentary for the market
  const fetchAICommentary = async () => {
    try {
      setAiLoading(true);
      
      // Get symbol from market ID
      const symbol = idToSymbol[marketId] || "bitcoin";
      
      // Fetch AI prediction for this symbol
      const response = await fetch(`/api/predictions/${symbol}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch AI prediction');
      }
      
      const prediction: AIPrediction = await response.json();
      
      // Set the AI commentary
      setAiCommentary(prediction.commentary);
    } catch (error) {
      console.error("Error fetching AI commentary:", error);
      // Fallback commentary based on market ID
      const fallbackCommentaries: {[key: string]: string} = {
        "1": "ETF rumors spark optimism in BTC.",
        "2": "Ethereum upgrades gaining momentum but facing resistance.",
        "3": "Strong ecosystem growth driving Solana price expectations.",
        "4": "XRP showing signs of recovery amid legal clarity."
      };
      
      setAiCommentary(fallbackCommentaries[marketId] || fallbackCommentaries["1"]);
    } finally {
      setAiLoading(false);
    }
  };

  // Set mounted state to true after the component mounts
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Fetch AI commentary when the page loads
  useEffect(() => {
    if (mounted && isConnected) {
      fetchAICommentary();
    }
  }, [mounted, isConnected, marketId]);

  // Redirect to home if wallet not connected (only after mounting)
  useEffect(() => {
    if (mounted && !isConnected) {
      router.push('/');
    }
  }, [isConnected, router, mounted]);

  // Handle placing a bet
  const handlePlaceBet = async () => {
    if (!betChoice || !betAmount) return;
    
    try {
      setIsBetting(true);
      // Simulate a blockchain transaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      setHasBet(true);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error placing bet:", error);
    } finally {
      setIsBetting(false);
    }
  };

  // Format expiry date
  const formatExpiry = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString();
  };

  // Don't render until after client-side hydration
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
        <h1 className="text-2xl font-bold text-white mb-6">{market.question}</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main prediction info */}
          <div className="lg:col-span-2 bg-[#070E1B] rounded-lg p-6 border border-gray-800/50">
            {market.imageUrl && (
              <div className="mb-6 w-full h-48 relative rounded-lg overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={market.imageUrl} 
                  alt={market.question}
                  className="w-full h-full object-cover" 
                />
              </div>
            )}
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-white mb-2">Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#0C162B] p-4 rounded-lg">
                  <span className="text-gray-400 block mb-1">Expiry Date</span>
                  <span className="text-white">{formatExpiry(market.expiry)}</span>
                </div>
                <div className="bg-[#0C162B] p-4 rounded-lg">
                  <span className="text-gray-400 block mb-1">Status</span>
                  <span className={`font-medium ${market.resolved ? 'text-blue-400' : 'text-green-400'}`}>
                    {market.resolved ? 'Resolved' : 'Active'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-white mb-4">Current Votes</h2>
              <div className="flex items-center mb-2">
                <span className="text-gray-400 w-16">Yes</span>
                <div className="flex-grow h-4 bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500" 
                    style={{ width: `${marketTotals?.yesPercent || 0}%` }}
                  ></div>
                </div>
                <span className="ml-4 text-white">{marketTotals?.yesPercent || 0}%</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-400 w-16">No</span>
                <div className="flex-grow h-4 bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-red-500" 
                    style={{ width: `${marketTotals?.noPercent || 0}%` }}
                  ></div>
                </div>
                <span className="ml-4 text-white">{marketTotals?.noPercent || 0}%</span>
              </div>
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-white mb-2">AI Commentary</h2>
              <div className="bg-[#0C162B] p-4 rounded-lg">
                {aiLoading ? (
                  <div className="animate-pulse">
                    <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                  </div>
                ) : (
                  <p className="text-gray-300">
                    {aiCommentary || "AI analysis loading..."}
                  </p>
                )}
              </div>
            </div>
            
            {!market.resolved && !hasBet && (
              <div className="mt-6">
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-teal-400 hover:opacity-90 text-white rounded-lg font-medium transition-colors"
                >
                  Place Bet
                </button>
              </div>
            )}
            
            {hasBet && (
              <div className="mt-6 bg-green-900/30 border border-green-500/30 rounded-lg p-4">
                <p className="text-green-400 font-medium">Your bet has been placed successfully!</p>
                <p className="text-white mt-2">You can check your bets in the profile section.</p>
              </div>
            )}
          </div>
          
          {/* Side panel with additional info */}
          <div className="bg-[#070E1B] rounded-lg p-6 border border-gray-800/50">
            <h2 className="text-xl font-semibold text-white mb-4">Market Stats</h2>
            <div className="space-y-4">
              <div>
                <span className="text-gray-400 block mb-1">Total Yes Amount</span>
                <span className="text-white text-lg font-medium">
                  {(market.totalYes / 10**18).toFixed(4)} ETH
                </span>
              </div>
              <div>
                <span className="text-gray-400 block mb-1">Total No Amount</span>
                <span className="text-white text-lg font-medium">
                  {(market.totalNo / 10**18).toFixed(4)} ETH
                </span>
              </div>
              <div>
                <span className="text-gray-400 block mb-1">Total Pool</span>
                <span className="text-white text-lg font-medium">
                  {((market.totalYes + market.totalNo) / 10**18).toFixed(4)} ETH
                </span>
              </div>
            </div>
            
            {market.resolved && (
              <div className="mt-6 p-4 bg-blue-900/30 border border-blue-500/30 rounded-lg">
                <h3 className="text-white font-medium mb-2">Outcome</h3>
                <span className={`text-lg font-bold ${market.outcome ? 'text-green-400' : 'text-red-400'}`}>
                  {market.outcome ? 'Yes' : 'No'}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Betting Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#0C162B] rounded-lg p-6 max-w-md w-full border border-gray-700/50 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-4">Place Your Bet</h2>
            
            <div className="mb-6">
              <label className="block text-gray-300 mb-2">Choose your position:</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setBetChoice(true)}
                  className={`py-3 rounded-lg font-medium transition-colors ${
                    betChoice === true 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  Yes
                </button>
                <button
                  onClick={() => setBetChoice(false)}
                  className={`py-3 rounded-lg font-medium transition-colors ${
                    betChoice === false 
                      ? 'bg-red-500 text-white' 
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  No
                </button>
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-300 mb-2">Bet amount (ETH):</label>
              <input
                type="number"
                value={betAmount}
                onChange={(e) => setBetAmount(e.target.value)}
                placeholder="0.01"
                min="0.001"
                step="0.001"
                className="w-full bg-[#070E1B] border border-gray-700 rounded-lg px-4 py-3 text-white"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handlePlaceBet}
                disabled={!betChoice || !betAmount || isBetting}
                className={`py-3 rounded-lg font-medium transition-colors ${
                  !betChoice || !betAmount
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isBetting ? 'Placing Bet...' : 'Confirm Bet'}
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}