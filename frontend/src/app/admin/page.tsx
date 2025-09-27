"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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

export default function AdminPage() {
  const { isConnected, address } = useAccount();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { isAdmin, isLoading: isAdminLoading } = useIsAdmin();
  const [markets, setMarkets] = useState<Market[]>([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [question, setQuestion] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [expiry, setExpiry] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [expiryTime, setExpiryTime] = useState("");

  // Contract read for market count
  const { data: countsData } = useContractRead({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi,
    functionName: "getCounts"
  });

  // Calculate expiry timestamp from date and time
  useEffect(() => {
    if (expiryDate && expiryTime) {
      const dateObj = new Date(`${expiryDate}T${expiryTime}`);
      setExpiry(Math.floor(dateObj.getTime() / 1000).toString());
    }
  }, [expiryDate, expiryTime]);

  // Contract write for creating a market
  const contractWrite = useContractWrite();
  
  // Track state manually
  const [isCreating, setIsCreating] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  
  // Function to handle market creation
  const createMarket = async () => {
    if (!question || !imageUrl || !expiry) return;
    
    try {
      setIsCreating(true);
      await contractWrite.writeContractAsync({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi,
        functionName: "createMarket",
        args: [question, imageUrl, BigInt(expiry)]
      });
      setIsCreated(true);
    } catch (error) {
      console.error('Error creating market:', error);
    } finally {
      setIsCreating(false);
    }
  };

  // Set mounted state to true after the component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch markets after component mounts
  useEffect(() => {
    const fetchMarkets = async () => {
      if (!countsData || !mounted || !isConnected || !isAdmin) return;
      
      try {
        setLoading(true);
        
        // @ts-ignore - Assuming countData[0] is marketCount
        const marketCount = Number(countsData[0] || 0);
        const marketsData: Market[] = [];
        
        // Fetch all markets
        for (let i = 0; i < marketCount; i++) {
          try {
            const market = await fetch(`/api/markets/${i}`).then(res => res.json());
            marketsData.push(market);
          } catch (error) {
            console.error(`Error fetching market ${i}:`, error);
          }
        }
        
        setMarkets(marketsData);
      } catch (error) {
        console.error("Error fetching markets:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMarkets();
  }, [countsData, mounted, isConnected, isAdmin, isCreated]);

  // Handle form submission
  const handleCreateMarket = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!question || !imageUrl || !expiry) {
      alert("Please fill all fields");
      return;
    }
    
    createMarket();
  };

  // Redirect to home if wallet not connected or not admin
  useEffect(() => {
    if (mounted && (!isConnected || (isAdmin === false && !isAdminLoading))) {
      router.push('/');
    }
  }, [isConnected, router, mounted, isAdmin, isAdminLoading]);

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

  return (
    <DashboardLayout>
      <div className="bg-[#0C162B] rounded-lg p-6 shadow-lg border border-gray-800/50">
        <h1 className="text-2xl font-bold text-white mb-6">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Create Market Form */}
          <div className="lg:col-span-1 bg-[#070E1B] rounded-lg p-4 border border-gray-800/50">
            <h2 className="text-xl font-semibold text-white mb-4">Create Prediction Market</h2>
            
            <form onSubmit={handleCreateMarket} className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-1 text-sm">Question</label>
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="e.g., Will BTC be above $70k by Oct 1?"
                  className="w-full bg-[#0C162B] border border-gray-700 rounded-lg px-3 py-2 text-white"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-300 mb-1 text-sm">Image URL</label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="w-full bg-[#0C162B] border border-gray-700 rounded-lg px-3 py-2 text-white"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 mb-1 text-sm">Expiry Date</label>
                <input
                  type="date"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className="w-full bg-[#0C162B] border border-gray-700 rounded-lg px-3 py-2 text-white"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-300 mb-1 text-sm">Expiry Time</label>
                <input
                  type="time"
                  value={expiryTime}
                  onChange={(e) => setExpiryTime(e.target.value)}
                  className="w-full bg-[#0C162B] border border-gray-700 rounded-lg px-3 py-2 text-white"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-300 mb-1 text-sm">Expiry Timestamp</label>
                <input
                  type="text"
                  value={expiry}
                  readOnly
                  className="w-full bg-[#0C162B] border border-gray-700 rounded-lg px-3 py-2 text-gray-500"
                />
                <p className="text-xs text-gray-500 mt-1">Unix timestamp calculated from date and time above</p>
              </div>
              
              <button
                type="submit"
                disabled={!createMarket || isCreating}
                className={`w-full px-4 py-3 rounded-lg font-medium transition-colors ${
                  !createMarket || isCreating
                    ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-teal-400 hover:opacity-90 text-white"
                }`}
              >
                {isCreating ? "Creating..." : "Create Market"}
              </button>
              
              {isCreated && (
                <div className="mt-4 p-3 bg-green-900/30 border border-green-500/30 rounded-lg">
                  <p className="text-green-400 text-sm">Market created successfully!</p>
                </div>
              )}
            </form>
          </div>
          
          {/* Markets List */}
          <div className="lg:col-span-2 bg-[#070E1B] rounded-lg p-4 border border-gray-800/50">
            <h2 className="text-xl font-semibold text-white mb-4">All Prediction Markets</h2>
            
            {loading ? (
              <div className="animate-pulse space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="bg-[#0C162B] p-4 rounded-lg">
                    <div className="h-5 bg-gray-700 rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-gray-700 rounded w-1/4 mb-2"></div>
                    <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : markets.length === 0 ? (
              <div className="bg-[#0C162B] p-4 rounded-lg text-gray-400">
                No markets found. Create your first prediction market.
              </div>
            ) : (
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {markets.map((market) => (
                  <div key={market.id} className="bg-[#0C162B] p-4 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-white font-medium">{market.question}</h3>
                        <p className="text-gray-400 text-sm mt-1">
                          Expires: {new Date(Number(market.expiry) * 1000).toLocaleString()}
                        </p>
                        <div className="flex items-center mt-2">
                          <span className="text-xs px-2 py-1 rounded-full mr-2 bg-blue-900/50 text-blue-300">
                            Yes: {Number(market.totalYes) / 10**18} ETH
                          </span>
                          <span className="text-xs px-2 py-1 rounded-full bg-red-900/50 text-red-300">
                            No: {Number(market.totalNo) / 10**18} ETH
                          </span>
                        </div>
                      </div>
                      <div className="flex">
                        <button
                          onClick={() => router.push(`/predictions/${market.id}`)}
                          className="text-sm px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                        >
                          View
                        </button>
                        {!market.resolved && (
                          <button
                            onClick={() => router.push(`/admin/resolve/${market.id}`)}
                            className="text-sm px-3 py-1 ml-2 bg-teal-600 hover:bg-teal-700 text-white rounded-md transition-colors"
                          >
                            Resolve
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}