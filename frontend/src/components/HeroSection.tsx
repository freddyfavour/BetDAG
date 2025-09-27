"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import ConnectButton from "./ConnectButton";
import { useAccount } from "wagmi";
import Link from "next/link";
import { gsap } from "gsap";
import LoadingScreen from "./LoadingScreen";

export default function HeroSection() {
  const { isConnected } = useAccount();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Refs for animated elements
  const taglineRef = useRef<HTMLHeadingElement>(null);
  const avatarsRef = useRef<HTMLDivElement>(null);
  const usersTextRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // Split text into words for animation
  const splitTextIntoSpans = (text: string) => {
    return text.split(' ').map((word, i) => (
      <span key={i} className="inline-block opacity-0">
        {word}&nbsp;
      </span>
    ));
  };

  // Set mounted state to true after the component mounts
  useEffect(() => {
    setMounted(true);
    
    // Listen for loading complete event
    const handleLoadingComplete = () => {
      setTimeout(() => {
        setLoading(false);
        animateHeroElements();
      }, 500);
    };
    
    document.addEventListener('loadingComplete', handleLoadingComplete);
    
    // For testing purposes - auto-close loader after 5 seconds if event doesn't fire
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);
    
    return () => {
      document.removeEventListener('loadingComplete', handleLoadingComplete);
      clearTimeout(timer);
    };
  }, []);
  
  // Animation function
  const animateHeroElements = () => {
    if (!taglineRef.current) return;
    
    const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    // Animate all spans inside the heading
    const taglineWords = taglineRef.current.querySelectorAll('span');
    
    // Avatar animation
    if (avatarsRef.current) {
      timeline.fromTo(
        avatarsRef.current, 
        { scale: 0, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 1 }
      );
    }
    
    // Users count animation
    if (usersTextRef.current) {
      timeline.fromTo(
        usersTextRef.current, 
        { y: -20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.5"
      );
    }
    
    // Tagline words animation
    timeline.fromTo(
      taglineWords,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.4 },
      "-=0.3"
    );
    
    // Paragraph animation
    if (paragraphRef.current) {
      timeline.fromTo(
        paragraphRef.current, 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1 },
        "-=0.5"
      );
    }
    
    // Buttons animation
    if (buttonsRef.current) {
      timeline.fromTo(
        buttonsRef.current, 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.7"
      );
    }
    
    // Glow animation
    if (glowRef.current) {
      timeline.fromTo(
        glowRef.current, 
        { opacity: 0 }, 
        { opacity: 1, duration: 1.5 },
        "-=0.5"
      );
    }
  };  
  
  return (
    <>
      {loading && <LoadingScreen />}
      
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
            <div className="flex items-center -space-x-2 mb-3" ref={avatarsRef}>
              <div className="w-10 h-10 rounded-full bg-blue-500 border-2 border-white overflow-hidden"></div>
              <div className="w-10 h-10 rounded-full bg-purple-500 border-2 border-white overflow-hidden"></div>
              <div className="w-10 h-10 rounded-full bg-green-500 border-2 border-white overflow-hidden"></div>
              <div className="w-10 h-10 rounded-full bg-yellow-500 border-2 border-white overflow-hidden"></div>
            </div>
            
            <div className="text-gray-200 text-sm mb-8" ref={usersTextRef}>3420+ monthly users</div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white mb-6" ref={taglineRef}>
              {splitTextIntoSpans("Predict the market.")}
              <span className="block">
                {splitTextIntoSpans("Powered by AI")}
              </span>
              <span className="block text-white">
                {splitTextIntoSpans("Secured by BlockDAG")}
              </span>
            </h1>
            
            <p className="text-gray-200 text-xl md:text-2xl mb-8 max-w-3xl" ref={paragraphRef}>
              BetDAG is an innovative AI-powered prediction market platform built on BlockDAG technology that allows users to make and bet on cryptocurrency price predictions. Predict the future and win prizes.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center" ref={buttonsRef}>
              <a href="#how-it-works" className="inline-flex items-center px-6 py-3 bg-transparent border border-white text-white rounded-full hover:bg-white/10 transition-colors">
                <span className="mr-2">▶</span> How it works
              </a>
            
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
            <div 
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-4xl h-[200px]"
              ref={glowRef}
            >
              <div className="w-full h-full rounded-t-full bg-gradient-to-t from-blue-500/30 to-transparent blur-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
