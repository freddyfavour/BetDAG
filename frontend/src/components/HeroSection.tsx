"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ConnectButton from "./ConnectButton";
import { useAccount } from "wagmi";
import Link from "next/link";

export default function HeroSection() {
  const { isConnected } = useAccount();
  const [mounted, setMounted] = useState(false);
  
  // Set mounted state to true after the component mounts
  useEffect(() => {
    setMounted(true);
  }, []);
  
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <Image 
        src="/landing/landingbackground.png"
        alt="BetDAG Hero Background"
        fill
        priority
        className="object-cover z-0"
        quality={100}
      />
      
      <div className="absolute inset-0 bg-black/40 z-0"></div> {/* Overlay to ensure text readability */}
      
      <div className="container mx-auto px-4 z-10 text-center pt-16">
        <div className="flex flex-col items-center max-w-4xl mx-auto">
          {/* User avatars */}
          <div className="flex items-center -space-x-2 mb-3">
            <div className="w-10 h-10 rounded-full bg-blue-500 border-2 border-white overflow-hidden"></div>
            <div className="w-10 h-10 rounded-full bg-purple-500 border-2 border-white overflow-hidden"></div>
            <div className="w-10 h-10 rounded-full bg-green-500 border-2 border-white overflow-hidden"></div>
            <div className="w-10 h-10 rounded-full bg-yellow-500 border-2 border-white overflow-hidden"></div>
          </div>
          
          <div className="text-gray-200 text-sm mb-8">3420+ monthly users</div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white mb-6">
            Predict the market.
            <span className="block"> Powered by <span className="text-white">AI</span></span>
            <span className="block">Secured by BlockDAG</span>
          </h1>
          
          <p className="text-gray-200 text-xl md:text-2xl mb-8 max-w-3xl">
            GoViral is an African AI lab building intelligent tools to manage money, access local
            knowledge, navigate real estate, and engage with sports all powered by localized AI.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="inline-flex items-center px-6 py-3 bg-transparent border border-white text-white rounded-full hover:bg-white/10 transition-colors">
              <span className="mr-2">▶</span> How it works
            </button>
            
            {mounted ? (
              isConnected ? (
                <Link href="/dashboard" 
                  className="px-6 py-3 bg-blue-600 text-white font-medium rounded-full shadow-lg transition-colors hover:bg-blue-700">
                  Go to Dashboard
                </Link>
              ) : (
                <ConnectButton 
                  variant="primary"
                  size="lg"
                  className="rounded-full px-6"
                />
              )
            ) : (
              <div className="px-6 py-3 bg-gray-700 text-transparent rounded-full shadow-lg">
                Loading...
              </div>
            )}
          </div>
          
          <div className="w-full h-[300px] mt-12 relative">
            {/* Blue light arc animation */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-4xl h-[200px]">
              <div className="w-full h-full rounded-t-full bg-gradient-to-t from-blue-500/30 to-transparent blur-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
