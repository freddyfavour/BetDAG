"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface PredictionCardProps {
  marketId: string | number;
  title: string; // e.g., "BTC in next 24h"
  yesPercent: number;
  noPercent: number;
  aiCommentary: string;
  symbol?: string; // crypto symbol like 'bitcoin', 'ethereum'
  imageUrl?: string;
}

export default function PredictionCard({
  marketId,
  title,
  yesPercent,
  noPercent,
  aiCommentary,
  symbol,
  imageUrl
}: PredictionCardProps) {
  const router = useRouter();
  
  const handleCardClick = () => {
    router.push(`/predictions/${marketId}`);
  };
  
  // Get crypto logo based on symbol
  const getCryptoLogo = () => {
    if (!symbol) return null;
    
    try {
      // Use next/image to display the crypto logo
      const logoMap: {[key: string]: string} = {
        bitcoin: '/btc.svg',
        ethereum: '/eth.svg',
        solana: '/sol.svg',
        ripple: '/xrp.svg',
      };
      
      const logoPath = logoMap[symbol.toLowerCase()] || '/coin-placeholder.svg';
      
      return (
        <div className="absolute left-4 top-4 w-8 h-8">
          <Image src={logoPath} alt={symbol} width={32} height={32} />
        </div>
      );
    } catch (error) {
      return null;
    }
  };
  
  return (
    <div 
      onClick={handleCardClick}
      className="bg-[#0C162B] rounded-lg overflow-hidden border border-gray-800/50 shadow-lg hover:border-blue-500/50 transition-all cursor-pointer relative"
    >
      <div className="p-5 flex flex-col h-full">
        {symbol && getCryptoLogo()}
        
        <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
        
        <div className="flex justify-between mb-3">
          <div className="text-gray-400">Up</div>
          <div className="text-gray-400">Down</div>
        </div>
        
        <div className="flex justify-between mb-5">
          <div className="text-blue-400 text-2xl font-bold">{yesPercent}%</div>
          <div className="text-blue-400 text-2xl font-bold">{noPercent}%</div>
        </div>
        
        <div className="mt-auto">
          <h4 className="text-gray-400 mb-2">AI commentary</h4>
          <p className="text-white text-sm line-clamp-2">{aiCommentary}</p>
        </div>
        
        <div className="mt-4">
          <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}