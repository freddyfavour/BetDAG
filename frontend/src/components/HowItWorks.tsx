"use client";

import Image from 'next/image';

interface StepProps {
  number: number;
  title: string;
  description: string;
  iconSrc?: string;
}

function Step({ number, title, description, iconSrc }: StepProps) {
  return (
    <div className="bg-gray-900/50 rounded-xl border border-gray-800/40 p-8 backdrop-blur-sm hover:bg-gray-800/60 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 relative overflow-hidden group">
      <div className="absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br from-blue-600/10 to-purple-500/10 rounded-full blur-3xl group-hover:from-blue-600/20 group-hover:to-purple-500/20 transition-all duration-500"></div>
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-purple-500 mb-6 relative z-10 shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/30 transition-all duration-300">
        {iconSrc ? (
          <Image 
            src={iconSrc} 
            alt={title} 
            width={36} 
            height={36} 
            className="group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <span className="text-2xl font-bold text-white">{number}</span>
        )}
      </div>
      <h3 className="text-2xl font-bold mb-3 text-white relative z-10">{title}</h3>
      <p className="text-gray-300 relative z-10 text-lg">{description}</p>
    </div>
  );
}

export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: "Connect your wallet",
      description: "Link your crypto wallet to get started with our secure prediction platform. We support multiple blockchain networks including BlockDAG.",
      iconSrc: "/window.svg"
    },
    {
      number: 2,
      title: "Check AI crypto predictions",
      description: "Access advanced AI-powered analytics for cryptocurrency market trends. Our machine learning models analyze vast amounts of market data.",
      iconSrc: "/globe.svg"
    },
    {
      number: 3,
      title: "Place a bet & earn rewards",
      description: "Stake on predictions and earn rewards when your forecasts come true. Participate in prediction pools with other users.",
      iconSrc: "/file.svg"
    }
  ];

  return (
    <section className="py-16 bg-[#070E1B]" id="how-it-works">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start justify-between gap-12">
          <div className="w-full md:w-1/3">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-400">It Works</span>
            </h2>
            <p className="text-gray-300 mb-6">
              Our platform makes it easy to participate in AI-powered crypto predictions. Follow these simple steps to get started and begin earning rewards.
            </p>
          </div>
          
          <div className="w-full md:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step) => (
              <Step 
                key={step.number} 
                number={step.number} 
                title={step.title} 
                description={step.description} 
                iconSrc={step.iconSrc}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}