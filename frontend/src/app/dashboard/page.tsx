"use client";

import React, { useState, useEffect, useCallback } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import Image from 'next/image';
import { getCryptoData, CryptoData, getCryptoChartData } from '@/services/cryptoService';
import CryptoChart from '@/components/charts/CryptoChart';
import CryptoCard from '@/components/charts/CryptoCard';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function DashboardContent() {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoData | null>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'1D' | '1W' | '1M'>('1D');
  
  // Initially fetch all crypto data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsLoading(true);
        const data = await getCryptoData('1D'); // Always start with 1D data
        setCryptoData(data);
        
        // Set BlockDAG as the default selected crypto
        const blockDAG = data.find(crypto => crypto.id === 'blockdag');
        if (blockDAG) {
          setSelectedCrypto(blockDAG);
        }
      } catch (error) {
        console.error("Error fetching crypto data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchInitialData();
    
    // Set up an interval to refresh data every 30 seconds
    const interval = setInterval(async () => {
      try {
        const data = await getCryptoData('1D');
        setCryptoData(data);
        
        // Update selected crypto if any
        if (selectedCrypto) {
          const updatedSelected = data.find(crypto => crypto.id === selectedCrypto.id);
          if (updatedSelected) {
            setSelectedCrypto(prev => ({
              ...prev!,
              price: updatedSelected.price,
              priceChange24h: updatedSelected.priceChange24h,
              priceChangePercentage24h: updatedSelected.priceChangePercentage24h,
              isPositive: updatedSelected.isPositive
            }));
          }
        }
      } catch (error) {
        console.error("Error refreshing data:", error);
      }
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Fetch chart data when timeframe changes (only for the selected crypto)
  useEffect(() => {
    if (!selectedCrypto) return;
    
    const fetchChartData = async () => {
      try {
        // Fetch data for the selected timeframe
        const data = await getCryptoData(selectedTimeframe);
        const updatedCrypto = data.find(crypto => crypto.id === selectedCrypto.id);
        
        if (updatedCrypto) {
          // Only update the chart data, keeping all other properties unchanged
          setSelectedCrypto(prev => {
            if (!prev) return null;
            return {
              ...prev,
              chartData: updatedCrypto.chartData
            };
          });
        }
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };
    
    fetchChartData();
  }, [selectedTimeframe, selectedCrypto?.id]);
  
  // Function to format market cap and volume
  const formatLargeNumber = (num: number) => {
    if (num >= 1_000_000_000) {
      return `$${(num / 1_000_000_000).toFixed(2)}B`;
    } else if (num >= 1_000_000) {
      return `$${(num / 1_000_000).toFixed(2)}M`;
    } else if (num >= 1_000) {
      return `$${(num / 1_000).toFixed(2)}K`;
    }
    return `$${num}`;
  };
  
  // Get BlockDAG data for the hero section
  const blockDAG = cryptoData.find(crypto => crypto.id === 'blockdag');
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <div className="space-y-8">
      {/* BlockDAG Hero Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* BlockDAG Feature Card */}
        <div className="lg:col-span-1 bg-gradient-to-br from-[#0A1638] to-[#184FC7]/30 rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden border border-[#184FC7]/30">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#184FC7]/10 rounded-full blur-3xl -mr-24 -mt-24"></div>
          
          <div className="relative z-10">
            <div className="flex items-center mb-4">
              {blockDAG && (
                <div className="w-10 h-10 mr-3 rounded-full bg-blue-600/20 flex items-center justify-center overflow-hidden">
                  <Image 
                    src="/blockdag.svg" 
                    alt="BlockDAG" 
                    width={40} 
                    height={40}
                    onError={(e) => {
                      // Fallback if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.onerror = null; // Prevent infinite loop
                      target.src = `/coin-placeholder.svg`; // Fallback image
                    }}
                  />
                </div>
              )}
              <div>
                <h2 className="text-2xl font-bold text-white">BlockDAG</h2>
                <p className="text-blue-300 text-sm">BDAG</p>
              </div>
            </div>
            
            {blockDAG && (
              <>
                <div className="flex items-baseline mb-6">
                  <span className="text-3xl font-bold text-white">${blockDAG.price.toLocaleString()}</span>
                  <span className={`ml-2 text-sm font-medium ${blockDAG.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                    {blockDAG.isPositive ? '+' : ''}{blockDAG.priceChangePercentage24h.toFixed(2)}%
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-gray-400 text-xs">Market Cap</p>
                    <p className="text-white font-medium">{formatLargeNumber(blockDAG.marketCap)}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs">24h Volume</p>
                    <p className="text-white font-medium">{formatLargeNumber(blockDAG.volume24h)}</p>
                  </div>
                </div>
                
                <button className="w-full text-center text-white bg-[#184FC7] hover:bg-[#1040B0] px-6 py-2.5 rounded-lg text-sm font-medium transition-colors">
                  Trade BlockDAG
                </button>
              </>
            )}
          </div>
        </div>

        {/* Main Chart */}
        <div className="lg:col-span-2 bg-[#0A1638]/40 rounded-2xl p-6 border border-gray-800/30">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="flex space-x-2">
                {cryptoData.slice(0, 5).map(crypto => (
                  <button 
                    key={crypto.id}
                    onClick={() => setSelectedCrypto(crypto)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      selectedCrypto?.id === crypto.id 
                        ? 'bg-[#184FC7]/20 text-white' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {crypto.symbol}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex space-x-2 bg-[#0A0A0A]/30 rounded-lg p-1">
              {(['1D', '1W', '1M'] as const).map(timeframe => (
                <button 
                  key={timeframe}
                  onClick={() => {
                    setSelectedTimeframe(timeframe);
                    // No need to refetch all data - the useEffect will handle updating the chart
                  }}
                  className={`px-3 py-1 text-xs font-medium rounded ${
                    selectedTimeframe === timeframe 
                      ? 'bg-[#184FC7] text-white' 
                      : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  {timeframe}
                </button>
              ))}
            </div>
          </div>
          
          {selectedCrypto && (
            <>
              <div className="mb-4 flex justify-between items-baseline">
                <div>
                  <span className="text-lg font-bold text-white">${selectedCrypto.price.toLocaleString()}</span>
                  <span className={`ml-2 text-sm font-medium ${selectedCrypto.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                    {selectedCrypto.isPositive ? '+' : ''}{selectedCrypto.priceChangePercentage24h.toFixed(2)}%
                  </span>
                </div>
                <div className="text-sm text-gray-400">{new Date().toLocaleDateString()}</div>
              </div>
              <CryptoChart 
                cryptoData={selectedCrypto} 
                timeframe={selectedTimeframe}
                height={240} 
              />
            </>
          )}
        </div>
      </div>

      {/* Market Overview Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">Market Overview</h2>
          <button className="text-blue-400 text-sm hover:text-blue-300 transition-colors">
            View All Markets
          </button>
        </div>
        
        {/* Crypto Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cryptoData.map(crypto => (
            <CryptoCard 
              key={crypto.id} 
              cryptoData={crypto} 
              highlighted={crypto.id === 'blockdag'} 
            />
          ))}
        </div>
      </div>
      
      {/* News & Updates Section */}
      <div className="bg-[#0A1638]/40 rounded-2xl p-6 border border-gray-800/30">
        <h2 className="text-xl font-bold text-white mb-4">Latest BlockDAG Updates</h2>
        <div className="space-y-4">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v10m2 2v-6a2 2 0 00-2-2h-6m0 0H9a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2" />
              </svg>
            </div>
            <div>
              <h3 className="text-white font-medium">BlockDAG Mainnet Launch</h3>
              <p className="text-gray-400 text-sm">BlockDAG is announcing their mainnet launch next month with improved scalability features.</p>
              <p className="text-xs text-blue-400 mt-1">3 hours ago</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-12 h-12 bg-green-600/20 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div>
              <h3 className="text-white font-medium">BlockDAG Price Surge</h3>
              <p className="text-gray-400 text-sm">BlockDAG has seen a 15% increase in price following partnership announcements.</p>
              <p className="text-xs text-blue-400 mt-1">Yesterday</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-12 h-12 bg-purple-600/20 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-white font-medium">New Strategic Partnership</h3>
              <p className="text-gray-400 text-sm">BlockDAG announces integration with major DeFi platforms to expand ecosystem.</p>
              <p className="text-xs text-blue-400 mt-1">2 days ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <DashboardLayout>
        <DashboardContent />
      </DashboardLayout>
    </QueryClientProvider>
  );
}