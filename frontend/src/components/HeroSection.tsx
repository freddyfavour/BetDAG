"use client";

import ConnectButton from "./ConnectButton";
import { Brain, Chart, Blockchain } from "./Icons";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#070E1B] to-[#0C162B] z-0"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/3 left-1/4 opacity-20 animate-float-slow">
          <Brain className="w-64 h-64 text-blue-500/20" />
        </div>
        <div className="absolute bottom-1/4 right-1/3 opacity-10 animate-float">
          <Chart className="w-72 h-72 text-teal-500/20" />
        </div>
        <div className="absolute top-2/3 right-1/4 opacity-15 animate-float-slow">
          <Blockchain className="w-56 h-56 text-purple-500/20" />
        </div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiMxMTJBNDUiIG9wYWNpdHk9IjAuMiIgZD0iTTAgMGg2MHY2MEgweiIvPjxwYXRoIGQ9Ik0yLjQyOCAyLjQyOGg1NS4xNDR2NTUuMTQ0SDIuNDI4eiIgc3Ryb2tlPSIjMjA0NTdFIiBzdHJva2Utb3BhY2l0eT0iMC4xIiBzdHJva2Utd2lkdGg9Ii44NTciLz48L2c+PC9zdmc+')] opacity-40"></div>
      </div>
      
      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <div className="w-full md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
              Predict the markets.
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400"> Powered by AI.</span>
              <span className="block mt-2">Secured by BlockDAG.</span>
            </h1>
            
            <p className="text-gray-300 text-xl md:text-2xl">
              Make smarter crypto predictions with our advanced AI platform
            </p>
            
            <div className="pt-4">
              <ConnectButton 
                variant="primary"
                size="lg"
                className="rounded-lg shadow-lg shadow-blue-500/20"
              />
            </div>
          </div>
          
          <div className="w-full md:w-1/2 relative">
            <div className="relative w-full aspect-square max-w-md mx-auto">
              {/* Futuristic circular graphic element */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[80%] h-[80%] rounded-full border-2 border-blue-500/30 animate-spin-slow"></div>
                <div className="absolute w-[90%] h-[90%] rounded-full border border-teal-400/20 animate-reverse-spin"></div>
                <div className="absolute w-[60%] h-[60%] rounded-full border border-purple-500/30 animate-spin-slow"></div>
                <div className="absolute w-[40%] h-[40%] rounded-full bg-gradient-to-br from-blue-600/20 to-teal-400/20 backdrop-blur-sm"></div>
                
                {/* Bitcoin coin stylized */}
                <div className="absolute w-28 h-28 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 flex items-center justify-center shadow-lg shadow-orange-500/30 animate-float">
                  <span className="text-4xl font-bold text-white">₿</span>
                </div>
                
                {/* Graph line */}
                <svg className="absolute w-[70%] h-[70%] animate-pulse-slow" viewBox="0 0 100 100">
                  <path
                    d="M0,50 Q10,40 20,60 T40,40 T60,50 T80,30 T100,40"
                    fill="none"
                    stroke="url(#graph-gradient)"
                    strokeWidth="3"
                    className="animate-draw"
                    strokeDasharray="200"
                    strokeDashoffset="200"
                  />
                  <defs>
                    <linearGradient id="graph-gradient" x1="0" y1="0" x2="100%" y2="0">
                      <stop offset="0%" stopColor="#4F46E5" />
                      <stop offset="100%" stopColor="#0EA5E9" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}