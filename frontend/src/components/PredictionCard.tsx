"use client";

import { useState, useEffect } from "react";
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
  totalYes?: number; 
  totalNo?: number;
}

export default function PredictionCard({
  marketId,
  title,
  yesPercent,
  noPercent,
  aiCommentary,
  symbol,
  imageUrl,
  totalYes = 0,
  totalNo = 0
}: PredictionCardProps) {
  const router = useRouter();
  const [staticCommentary, setStaticCommentary] = useState<string>("");

  // We don't calculate percentages here anymore
  // We use the exact yesPercent and noPercent provided from the parent component
  // This ensures the values are identical to those on the detail page

  useEffect(() => {
    // We only set the static AI commentary based on symbol
    // No percentage calculation is done here
    
    // Set static AI commentary based on symbol
    if (symbol) {
      const commentaries: {[key: string]: string} = {
        "bitcoin": "Bitcoin shows strong momentum with increasing volume. Technical indicators and on-chain metrics suggest continued upward movement in the next 24 hours.",
        "ethereum": "Ethereum upgrades and DeFi activity signal positive sentiment. Chart patterns and volume analysis indicate likely upward trend continuation.",
        "solana": "Solana ecosystem growth driving strong fundamentals. Developer activity and transaction volume suggest bullish momentum.",
        "ripple": "XRP legal clarity improving market confidence. Technical patterns show potential breakout from consolidation pattern."
      };
      
      setStaticCommentary(commentaries[symbol.toLowerCase()] || aiCommentary);
    } else {
      setStaticCommentary(aiCommentary);
    }
  }, [symbol, aiCommentary, yesPercent, noPercent, totalYes, totalNo]);
  
  const handleCardClick = () => {
    router.push(`/predictions/${marketId}`);
  };
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
        
        <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
        
        <div className="flex justify-between mb-3">
          <div className="text-gray-400">Up</div>
          <div className="text-gray-400">Down</div>
        </div>
        
        <div className="flex justify-between mb-5">
          <div className="text-green-500 text-2xl font-bold">{yesPercent}%</div>
          <div className="text-red-500 text-2xl font-bold">{noPercent}%</div>
        </div>
        
        {/* Percentage bars */}
        <div className="mb-5">
          <div className="flex items-center mb-2">
            <div className="flex-grow h-2 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-500" 
                style={{ width: `${yesPercent}%` }}
              ></div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex-grow h-2 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-red-500" 
                style={{ width: `${noPercent}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="mt-auto">
          <h4 className="text-gray-400 mb-2">AI commentary</h4>
          <p className="text-white text-sm line-clamp-2">{staticCommentary || aiCommentary}</p>
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