"use client";

import { ArrowRight } from './Icons';

export default function PreviewCard() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-lg rounded-xl overflow-hidden border border-gray-700/50 shadow-xl">
          <div className="p-6">
            <h3 className="text-xl font-semibold text-white mb-4">AI Prediction Preview</h3>
            
            <div className="mb-6 bg-gray-800/60 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                    <span className="font-bold text-white">₿</span>
                  </div>
                  <span className="text-white font-medium">Bitcoin (BTC)</span>
                </div>
                <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium">
                  65% Bullish
                </div>
              </div>
              
              <div className="flex items-center mb-4">
                <div className="flex-grow">
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-green-500 to-teal-400" style={{ width: '65%' }}></div>
                  </div>
                </div>
                <span className="ml-4 text-gray-400 text-sm">24h forecast</span>
              </div>
              
              <div className="bg-gray-900/60 p-3 rounded-lg">
                <p className="text-gray-300 text-sm italic">
                  "BTC is showing strong momentum with increasing volume. Technical indicators and on-chain metrics suggest a 65% probability of upward movement in the next 24 hours."
                </p>
                <p className="text-gray-400 text-xs mt-2">
                  AI Analysis • Updated 2 hours ago
                </p>
              </div>
            </div>
            
            <button className="w-full py-3 bg-gray-800 hover:bg-gray-700 transition-colors duration-200 rounded-lg text-white font-medium flex items-center justify-center">
              <span>See all predictions</span>
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}