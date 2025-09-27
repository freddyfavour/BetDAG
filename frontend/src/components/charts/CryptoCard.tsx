"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { CryptoData, subscribeToLivePriceUpdates } from '@/services/cryptoService';
import CryptoChart from '@/components/charts/CryptoChart';

interface CryptoCardProps {
  cryptoData: CryptoData;
  size?: 'small' | 'large';
  highlighted?: boolean;
}

const CryptoCard = ({ cryptoData: initialData, size = 'small', highlighted = false }: CryptoCardProps) => {
  const [cryptoData, setCryptoData] = useState<CryptoData>(initialData);
  const [priceFlash, setPriceFlash] = useState<'none' | 'up' | 'down'>('none');
  
  // Subscribe to live price updates
  useEffect(() => {
    const unsubscribe = subscribeToLivePriceUpdates((newData) => {
      if (newData.id !== initialData.id) return;
      
      // Determine if price went up or down for flash animation
      if (newData.price > cryptoData.price) {
        setPriceFlash('up');
      } else if (newData.price < cryptoData.price) {
        setPriceFlash('down');
      }
      
      // Update only price data, not chart data
      setCryptoData(prevData => ({
        ...prevData,
        price: newData.price,
        priceChangePercentage24h: newData.priceChangePercentage24h,
        isPositive: newData.isPositive
      }));
      
      // Reset flash after animation
      setTimeout(() => setPriceFlash('none'), 1000);
    }, initialData.id);
    
    return () => unsubscribe();
  }, [initialData.id, cryptoData.price]);
  
  // Format price with appropriate decimals
  const formatPrice = (price: number) => {
    if (price >= 1000) return price.toLocaleString('en-US', { maximumFractionDigits: 2 });
    if (price >= 1) return price.toLocaleString('en-US', { maximumFractionDigits: 2 });
    return price.toLocaleString('en-US', { maximumFractionDigits: 4 });
  };
  
  // Format percentage with + or - sign
  const formatPercentage = (percentage: number) => {
    return (percentage >= 0 ? '+' : '') + percentage.toFixed(2) + '%';
  };
  
  return (
    <div 
      className={`
        ${size === 'large' ? 'col-span-2' : 'col-span-1'}
        ${highlighted ? 'border-2 border-[#184FC7]/50' : 'border border-gray-800/50'} 
        bg-[#0A1638]/40 rounded-2xl flex flex-col relative overflow-hidden transition-all duration-300
      `}
    >
      {/* Header with crypto info */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 flex-shrink-0 rounded-full overflow-hidden ${highlighted ? 'ring-2 ring-[#184FC7]/50' : ''} bg-gray-800 flex items-center justify-center`}>
            <Image 
              src={cryptoData.logoUrl} 
              alt={cryptoData.name} 
              width={40} 
              height={40}
              className="object-contain"
              onError={(e) => {
                // Fallback if image fails to load
                const target = e.target as HTMLImageElement;
                target.onerror = null; // Prevent infinite loop
                target.src = `/coin-placeholder.svg`; // Fallback image
              }}
            />
          </div>
          <div>
            <h3 className="text-white font-medium">{cryptoData.name}</h3>
            <p className="text-gray-400 text-sm">{cryptoData.symbol}</p>
          </div>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium
          ${cryptoData.isPositive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
          {formatPercentage(cryptoData.priceChangePercentage24h)}
        </div>
      </div>
      
      {/* Price with animation */}
      <div className="px-4 pb-2">
        <div className={`text-xl font-bold transition-colors duration-500
          ${priceFlash === 'up' ? 'text-green-400' : 
            priceFlash === 'down' ? 'text-red-400' : 'text-white'}`}>
          ${formatPrice(cryptoData.price)}
        </div>
      </div>
      
      {/* Chart */}
      <div className="flex-grow px-1">
        <CryptoChart 
          cryptoData={cryptoData} 
          height={size === 'large' ? 180 : 100} 
          showXAxis={false} 
          showYAxis={false}
          showGrid={false}
          showTooltip={true}
        />
      </div>
      
      {/* Special badge for BlockDAG */}
      {highlighted && (
        <div className="absolute top-3 right-3 bg-blue-600 text-xs text-white px-2 py-0.5 rounded">
          Featured
        </div>
      )}
    </div>
  );
};

export default CryptoCard;