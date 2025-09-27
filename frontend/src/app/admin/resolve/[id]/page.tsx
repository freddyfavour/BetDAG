"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAccount, useContractRead, useContractWrite } from "wagmi";
import DashboardLayout from "@/components/DashboardLayout";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { abi } from "@/constants/abi";

// Define the contract address
const CONTRACT_ADDRESS = "0xYourContractAddress"; // Replace with actual address

interface Market {
  id: number;
  question: string;
  imageUrl: string;
  expiry: bigint;
  resolved: boolean;
  outcome: boolean | null;
  totalYes: bigint;
  totalNo: bigint;
}

interface MarketTotals {
  totalYes: bigint;
  totalNo: bigint;
  yesPercent: number;
  noPercent: number;
}

export default function ResolveMarketPage() {
  const { id } = useParams();
  const marketId = typeof id === "string" ? id : Array.isArray(id) ? id[0] : "0";
  
  const { isConnected, address } = useAccount();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { isAdmin, isLoading: isAdminLoading } = useIsAdmin();
  const [outcome, setOutcome] = useState<boolean | null>(null);
  const [aiSuggestion, setAiSuggestion] = useState<boolean | null>(null);
  const [aiConfidence, setAiConfidence] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Contract read for market details
  const { data: marketData } = useContractRead({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi,
    functionName: "getMarket",
    args: [BigInt(marketId)]
  });

  // Contract read for market totals and percentages
  const { data: marketTotalsData } = useContractRead({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi,
    functionName: "getMarketTotalsAndPercents",
    args: [BigInt(marketId)]
  });

  // Contract write for resolving a market
  const contractWrite = useContractWrite();
  
  // Track state manually
  const [isResolving, setIsResolving] = useState(false);
  const [isResolved, setIsResolved] = useState(false);
  
  // Function to handle market resolution
  const resolveMarket = async () => {
    if (outcome === null) return;
    
    try {
      setIsResolving(true);
      await contractWrite.writeContractAsync({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi,
        functionName: "resolveMarket",
        args: [BigInt(marketId), outcome]
      });
      setIsResolved(true);
    } catch (error) {
      console.error('Error resolving market:', error);
    } finally {
      setIsResolving(false);
    }
  };

  // Format market data
  const market: Market | null = marketData ? {
    id: Number(marketId),
    // @ts-ignore - Accessing array elements
    question: marketData[1] as string,
    // @ts-ignore - Accessing array elements
    imageUrl: marketData[2] as string,
    // @ts-ignore - Accessing array elements
    expiry: marketData[3] as bigint,
    // @ts-ignore - Accessing array elements
    resolved: marketData[4] as boolean,
    // @ts-ignore - Accessing array elements
    outcome: marketData[5] as boolean | null,
    // @ts-ignore - Accessing array elements
    totalYes: marketData[6] as bigint,
    // @ts-ignore - Accessing array elements
    totalNo: marketData[7] as bigint,
  } : null;

  // Format market totals
  const marketTotals: MarketTotals | null = marketTotalsData ? {
    // @ts-ignore - Accessing array elements
    totalYes: marketTotalsData[0] as bigint,
    // @ts-ignore - Accessing array elements
    totalNo: marketTotalsData[1] as bigint,
    // @ts-ignore - Accessing array elements
    yesPercent: Number(marketTotalsData[2]),
    // @ts-ignore - Accessing array elements
    noPercent: Number(marketTotalsData[3]),
  } : null;

  // isAdmin is now provided by the useIsAdmin hook

  // Fetch AI suggestion for outcome
  useEffect(() => {
    const fetchAiSuggestion = async () => {
      if (!market) return;
      
      try {
        setIsLoading(true);
        
        // Extract symbol from the question (this is a simple example)
        let symbol = "bitcoin";
        if (market.question.toLowerCase().includes("eth")) symbol = "ethereum";
        if (market.question.toLowerCase().includes("sol")) symbol = "solana";
        if (market.question.toLowerCase().includes("xrp")) symbol = "ripple";
        
        // Fetch AI prediction
        const response = await fetch(`/api/predictions/${symbol}`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch AI suggestion");
        }
        
        const data = await response.json();
        
        // Set AI suggestion based on probability
        setAiSuggestion(data.probability_up > data.probability_down);
        setAiConfidence(Math.max(data.probability_up, data.probability_down));
      } catch (error) {
        console.error("Error fetching AI suggestion:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAiSuggestion();
  }, [market]);

  // Set mounted state to true after the component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  // Redirect to home if wallet not connected or not admin
  useEffect(() => {
    if (mounted && (!isConnected || (isAdmin === false && !isAdminLoading))) {
      router.push('/');
    }
  }, [isConnected, router, mounted, isAdmin, isAdminLoading]);

  // Handle resolving the market
  const handleResolveMarket = () => {
    if (outcome === null) {
      alert("Please select an outcome");
      return;
    }
    
    resolveMarket();
  };

  // Format expiry date
  const formatExpiry = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) * 1000);
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

  // If not admin, don't show the page
  if (!isAdmin) {
    return (
      <DashboardLayout>
        <div className="bg-[#0C162B] rounded-lg p-6 shadow-lg border border-gray-800/50">
          <h1 className="text-2xl font-bold text-white mb-6">Admin Access Required</h1>
          <p className="text-gray-300">You need admin privileges to access this page.</p>
        </div>
      </DashboardLayout>
    );
  }

  // Loading state
  if (!market) {
    return (
      <DashboardLayout>
        <div className="bg-[#0C162B] rounded-lg p-6 shadow-lg border border-gray-800/50">
          <h1 className="text-2xl font-bold text-white mb-6">Loading...</h1>
        </div>
      </DashboardLayout>
    );
  }

  // If market is already resolved, show info
  if (market.resolved) {
    return (
      <DashboardLayout>
        <div className="bg-[#0C162B] rounded-lg p-6 shadow-lg border border-gray-800/50">
          <h1 className="text-2xl font-bold text-white mb-6">Market Already Resolved</h1>
          <p className="text-gray-300">This prediction market has already been resolved.</p>
          <div className="mt-4 bg-[#070E1B] rounded-lg p-4 border border-gray-800/50">
            <h2 className="text-xl text-white">{market.question}</h2>
            <p className="text-gray-400 mt-2">Outcome: <span className={market.outcome ? 'text-green-400' : 'text-red-400'}>{market.outcome ? 'Yes' : 'No'}</span></p>
          </div>
          <div className="mt-6">
            <button
              onClick={() => router.push('/admin')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Back to Admin Dashboard
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="bg-[#0C162B] rounded-lg p-6 shadow-lg border border-gray-800/50">
        <h1 className="text-2xl font-bold text-white mb-6">Resolve Prediction Market</h1>
        
        <div className="bg-[#070E1B] rounded-lg p-4 border border-gray-800/50 mb-6">
          <h2 className="text-xl text-white">{market.question}</h2>
          <p className="text-gray-400 mt-2">Expiry: {formatExpiry(market.expiry)}</p>
          
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#0C162B] p-3 rounded-lg">
              <span className="text-gray-400 block mb-1">Total Yes</span>
              <span className="text-white text-lg font-medium">
                {Number(market.totalYes) / 10**18} ETH ({marketTotals?.yesPercent || 0}%)
              </span>
            </div>
            
            <div className="bg-[#0C162B] p-3 rounded-lg">
              <span className="text-gray-400 block mb-1">Total No</span>
              <span className="text-white text-lg font-medium">
                {Number(market.totalNo) / 10**18} ETH ({marketTotals?.noPercent || 0}%)
              </span>
            </div>
          </div>
        </div>
        
        {/* AI Suggestion */}
        <div className="bg-[#070E1B] rounded-lg p-4 border border-gray-800/50 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">AI Suggestion</h2>
          
          {isLoading ? (
            <div className="animate-pulse">
              <div className="h-5 bg-gray-700 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-700 rounded w-3/4"></div>
            </div>
          ) : (
            <>
              <p className="text-gray-300">
                Based on market data analysis, the AI suggests the outcome should be:
              </p>
              
              <div className="mt-4 p-4 bg-[#0C162B] rounded-lg">
                <div className="flex items-center">
                  <span className={`text-xl font-bold ${aiSuggestion ? 'text-green-400' : 'text-red-400'}`}>
                    {aiSuggestion ? 'YES' : 'NO'}
                  </span>
                  <span className="text-gray-400 ml-2">
                    with {aiConfidence}% confidence
                  </span>
                </div>
                
                <div className="mt-2 w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${aiSuggestion ? 'bg-green-500' : 'bg-red-500'}`}
                    style={{ width: `${aiConfidence}%` }}
                  ></div>
                </div>
              </div>
              
              <p className="text-gray-400 text-sm mt-4">
                This is an AI-generated suggestion. As the admin, you have the final decision on the outcome.
              </p>
            </>
          )}
        </div>
        
        {/* Outcome Selection */}
        <div className="bg-[#070E1B] rounded-lg p-4 border border-gray-800/50 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">Select Outcome</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <button
              onClick={() => setOutcome(true)}
              className={`p-4 rounded-lg font-medium transition-colors ${
                outcome === true 
                  ? 'bg-green-600 text-white' 
                  : 'bg-[#0C162B] text-gray-300 hover:bg-[#0d1933]'
              }`}
            >
              YES
            </button>
            
            <button
              onClick={() => setOutcome(false)}
              className={`p-4 rounded-lg font-medium transition-colors ${
                outcome === false 
                  ? 'bg-red-600 text-white' 
                  : 'bg-[#0C162B] text-gray-300 hover:bg-[#0d1933]'
              }`}
            >
              NO
            </button>
          </div>
          
          <button
            onClick={handleResolveMarket}
            disabled={outcome === null || isResolving}
            className={`w-full py-3 rounded-lg font-medium transition-colors ${
              outcome === null || isResolving
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isResolving ? 'Resolving...' : 'Confirm Resolution'}
          </button>
          
          {isResolved && (
            <div className="mt-4 p-3 bg-green-900/30 border border-green-500/30 rounded-lg">
              <p className="text-green-400">Market resolved successfully!</p>
              <button
                onClick={() => router.push('/admin')}
                className="mt-2 text-blue-400 hover:text-blue-300 transition-colors text-sm"
              >
                Return to Admin Dashboard
              </button>
            </div>
          )}
        </div>
        
        <div className="flex justify-between">
          <button
            onClick={() => router.push('/admin')}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}