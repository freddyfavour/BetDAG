"use client";

import { useEffect } from "react";
import { useAccount } from "wagmi";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import HowItWorks from "@/components/HowItWorks";
import PreviewCard from "@/components/PreviewCard";
import ProblemImpactSection from "@/components/ProblemImpactSection";
import TeamSection from "@/components/TeamSection";
import Footer from "@/components/Footer";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const { isConnected } = useAccount();
  
  useEffect(() => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e: Event) {
        e.preventDefault();
        const targetId = (e.currentTarget as HTMLAnchorElement).getAttribute('href');
        if (targetId && targetId !== '#') {
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            window.scrollTo({
              top: targetElement.getBoundingClientRect().top + window.scrollY - 100,
              behavior: 'smooth'
            });
          }
        }
      });
    });
    
    return () => {
      // Clean up ScrollTrigger instances on unmount
      if (ScrollTrigger) ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black pt-16">
        {/* Hero Section with Wallet Connect */}
        <HeroSection />
        
        {/* About BetDAG section */}
        <AboutSection />
        
        {/* How It Works - 3 Step Process */}
        <HowItWorks />
        
        {/* AI Prediction Preview Card */}
        {/* <PreviewCard /> */}
        
        {/* Real Problem, Real Impact section */}
        <ProblemImpactSection />
        
        {/* Meet Our Team section */}
        {/* <TeamSection /> */}
        
        {/* Comprehensive footer */}
        <Footer />
      </main>
    </>
  );
}
