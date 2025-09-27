"use client";

import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="py-16 bg-black" id="about">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left Content - Text */}
          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              About BetDAG
            </h2>
            
            <div className="space-y-6 text-gray-300">
              <p className="text-lg md:text-xl">
                We're building the next generation of prediction markets where AI
                meets blockchain. Our mission is simple: empower users to make
                smarter, data-driven crypto predictions in a transparent and rewarding
                way.
              </p>
              
              <p className="text-lg md:text-xl">
                By combining advanced AI models with the security of BlockDAG, we
                deliver accurate insights, seamless wallet integration, and fair
                outcomes—all powered by decentralized technology.
              </p>
              
              <p className="text-lg md:text-xl">
                Whether you're here to test your market instincts, compete on the
                leaderboard, or simply explore AI-driven forecasts, our platform is
                designed to make crypto predictions accessible, engaging, and
                trustworthy.
              </p>
              
              <p className="text-lg md:text-xl">
                We believe the future of finance is open, intelligent, and community-
                driven, and we're here to lead that movement.
              </p>
            </div>
          </div>
          
          {/* Right Content - Robot Arm Image with Tags */}
          <div className="w-full md:w-2/5 mt-8 md:mt-0">
            <div className="relative w-full h-[400px] md:h-[500px]">
              <Image
                src="/landing/about.png"
                alt="AI Robot Hand"
                fill
                className="object-contain"
                priority
              />
              
              {/* AI-powered Tag */}
              <div className="absolute top-[15%] left-[15%] bg-purple-500 text-white px-4 py-1 rounded-full text-sm md:text-base">
                AI-powered
              </div>
              
              {/* Blockchain Tag */}
              <div className="absolute top-[60%] right-[10%] bg-blue-500 text-white px-4 py-1 rounded-full text-sm md:text-base">
                Blockchain
              </div>
              
              {/* Transparency Tag */}
              <div className="absolute bottom-[25%] left-[10%] bg-yellow-400 text-black px-4 py-1 rounded-full text-sm md:text-base">
                Transparency
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}