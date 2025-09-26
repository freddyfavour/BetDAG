"use client";

import { useAccount } from "wagmi";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import HowItWorks from "@/components/HowItWorks";
import PreviewCard from "@/components/PreviewCard";
import ProblemImpactSection from "@/components/ProblemImpactSection";
import TeamSection from "@/components/TeamSection";
import Footer from "@/components/Footer";

export default function Home() {
  const { isConnected } = useAccount();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#070E1B] pt-16">
        {/* Hero Section with Wallet Connect */}
        <HeroSection />
        
        {/* About BetDAG section */}
        <AboutSection />
        
        {/* How It Works - 3 Step Process */}
        <HowItWorks />
        
        {/* AI Prediction Preview Card */}
        <PreviewCard />
        
        {/* Real Problem, Real Impact section */}
        <ProblemImpactSection />
        
        {/* Meet Our Team section */}
        <TeamSection />
        
        {/* Comprehensive footer */}
        <Footer />
      </main>
    </>
  );
}
