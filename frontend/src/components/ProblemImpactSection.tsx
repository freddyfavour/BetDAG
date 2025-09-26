"use client";

import Image from 'next/image';

interface ProblemCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

function ProblemCard({ title, description, icon }: ProblemCardProps) {
  return (
    <div className="bg-gray-800/40 rounded-xl border border-gray-700/50 p-6 backdrop-blur-sm hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
      <div className="text-blue-400 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
}

export default function ProblemImpactSection() {
  const problemCards = [
    {
      title: "Market Uncertainty",
      description: "Crypto markets are volatile and unpredictable, making it difficult for traders to make informed decisions based on reliable data.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Centralized Prediction Markets",
      description: "Traditional prediction platforms suffer from centralization issues, lack of transparency, and high fees that reduce user profits.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      title: "Limited AI Integration",
      description: "Most crypto platforms lack sophisticated AI tools to help users make data-driven predictions based on market analysis.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      title: "Scalability Constraints",
      description: "Traditional blockchain networks suffer from slow transaction speeds and high gas fees during periods of network congestion.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-16 bg-[#0A1223]" id="problem-impact">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start justify-between gap-12">
          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Real <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-400">Problem</span>,
              <br />
              Real <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-400">Impact</span>
            </h2>
            
            <p className="text-xl text-gray-300">
              BetDAG addresses critical challenges in the crypto prediction space through innovative technology and user-centric design.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
              {problemCards.map((card, index) => (
                <ProblemCard
                  key={index}
                  title={card.title}
                  description={card.description}
                  icon={card.icon}
                />
              ))}
            </div>
          </div>
          
          <div className="w-full md:w-2/5 mt-8 md:mt-0">
            <div className="relative">
              {/* Background glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 to-teal-400/20 rounded-full blur-3xl"></div>
              
              {/* Blockchain/DAG network illustration */}
              <div className="relative bg-gray-800/50 rounded-2xl border border-gray-700/50 overflow-hidden aspect-square">
                {/* Nodes and connections visual */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
                  {/* Background grid */}
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1E293B" strokeWidth="1"/>
                    </pattern>
                  </defs>
                  <rect width="400" height="400" fill="url(#grid)" />
                  
                  {/* Connection lines */}
                  <line x1="80" y1="100" x2="180" y2="140" stroke="#3B82F6" strokeWidth="2" strokeOpacity="0.5" />
                  <line x1="180" y1="140" x2="270" y2="90" stroke="#3B82F6" strokeWidth="2" strokeOpacity="0.5" />
                  <line x1="180" y1="140" x2="130" y2="220" stroke="#3B82F6" strokeWidth="2" strokeOpacity="0.5" />
                  <line x1="130" y1="220" x2="230" y2="260" stroke="#3B82F6" strokeWidth="2" strokeOpacity="0.5" />
                  <line x1="230" y1="260" x2="320" y2="210" stroke="#3B82F6" strokeWidth="2" strokeOpacity="0.5" />
                  <line x1="270" y1="90" x2="320" y2="210" stroke="#3B82F6" strokeWidth="2" strokeOpacity="0.5" />
                  <line x1="180" y1="140" x2="230" y2="260" stroke="#3B82F6" strokeWidth="2" strokeOpacity="0.5" />
                  
                  {/* Nodes */}
                  <circle cx="80" cy="100" r="15" fill="#0EA5E9" />
                  <circle cx="180" cy="140" r="20" fill="#4F46E5" />
                  <circle cx="270" cy="90" r="15" fill="#0EA5E9" />
                  <circle cx="130" cy="220" r="15" fill="#0EA5E9" />
                  <circle cx="230" cy="260" r="20" fill="#4F46E5" />
                  <circle cx="320" cy="210" r="15" fill="#0EA5E9" />
                  
                  {/* Animated pulse */}
                  <circle cx="180" cy="140" r="30" fill="none" stroke="#4F46E5" strokeWidth="2">
                    <animate attributeName="r" from="20" to="40" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.8" to="0" dur="2s" repeatCount="indefinite" />
                  </circle>
                </svg>
              </div>
              
              <div className="mt-4 text-center text-sm text-gray-400">
                BlockDAG's Directed Acyclic Graph structure enables faster transactions and better scalability
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}