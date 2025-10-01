"use client";

import { useState, useEffect, useRef, useLayoutEffect } from "react";
import Image from "next/image";
import ConnectButton from "./ConnectButton";
import { useAccount } from "wagmi";
import Link from "next/link";
import { gsap } from "gsap";
import LoadingScreen from "./LoadingScreen";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function HeroSection() {
  const { isConnected } = useAccount();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const fallbackTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasAnimatedRef = useRef(false);
  
  // Refs for animated elements
  const taglineRef = useRef<HTMLHeadingElement>(null);
  const avatarsRef = useRef<HTMLDivElement>(null);
  const usersTextRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLDivElement>(null);

  // Split text into words for animation
  const splitTextIntoSpans = (text: string) => {
    return text.split(' ').map((word, i) => (
      <span key={i} className="inline-block opacity-0">
        {word}&nbsp;
      </span>
    ));
  };

  useIsomorphicLayoutEffect(() => {
    if (!taglineRef.current) return;

    const ctx = gsap.context(() => {
      const taglineWords = taglineRef.current?.querySelectorAll("span");

      if (avatarsRef.current) {
        gsap.set(avatarsRef.current, { scale: 0, opacity: 0 });
      }

      if (usersTextRef.current) {
        gsap.set(usersTextRef.current, { y: -20, opacity: 0 });
      }

      if (taglineWords && taglineWords.length) {
        gsap.set(taglineWords, { y: 40, opacity: 0 });
      }

      if (paragraphRef.current) {
        gsap.set(paragraphRef.current, { y: 30, opacity: 0 });
      }

      if (buttonsRef.current) {
        gsap.set(buttonsRef.current, { y: 30, opacity: 0 });
      }

      if (glowRef.current) {
        gsap.set(glowRef.current, { opacity: 0 });
      }
    }, heroSectionRef);

    return () => {
      ctx.revert();
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
    };
  }, []);

  // Set mounted state to true after the component mounts
  useEffect(() => {
    setMounted(true);
    
    const startAnimation = () => {
      if (hasAnimatedRef.current) return;

      hasAnimatedRef.current = true;
      if (fallbackTimeoutRef.current) {
        clearTimeout(fallbackTimeoutRef.current);
        fallbackTimeoutRef.current = null;
      }

      animateHeroElements();
      setLoading(false);
    };

    // Listen for loading complete event
    const handleLoadingComplete = () => {
      startAnimation();
    };
    
    document.addEventListener('loadingComplete', handleLoadingComplete);
    
    // For testing purposes - auto-close loader after 5 seconds if event doesn't fire
    fallbackTimeoutRef.current = setTimeout(() => {
      startAnimation();
    }, 5000);
    
    return () => {
      document.removeEventListener('loadingComplete', handleLoadingComplete);
      if (fallbackTimeoutRef.current) {
        clearTimeout(fallbackTimeoutRef.current);
        fallbackTimeoutRef.current = null;
      }
    };
  }, []);
  
  // Animation function
  const animateHeroElements = () => {
    if (!taglineRef.current) return;
    
    if (timelineRef.current) {
      timelineRef.current.kill();
      timelineRef.current = null;
    }

    document.dispatchEvent(new Event("heroAnimationStart"));

  const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
  timelineRef.current = timeline;
    
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
        
        <div className="container mx-auto px-4 z-10 text-center pt-20">
          <div ref={heroSectionRef} className="h-[100vh] flex flex-col items-center align-center justify-center max-w-4xl mx-auto">
            {/* User avatars - replaced with landing images */}
            <div className="flex items-center mb-8" ref={avatarsRef}>
              <div className="relative w-[80px] h-[40px]">
                <Image
                  src="/landing/user1.png"
                  alt="User 1"
                  width={40}
                  height={40}
                  className="absolute left-0 top-0 rounded-full border-2 border-white object-cover bg-white z-10"
                  style={{ zIndex: 10 }}
                />
                <Image
                  src="/landing/user2.png"
                  alt="User 2"
                  width={40}
                  height={40}
                  className="absolute left-[20px] top-0 rounded-full border-2 border-white object-cover bg-white z-20"
                  style={{ zIndex: 20 }}
                />
                <Image
                  src="/landing/user3.png"
                  alt="User 3"
                  width={40}
                  height={40}
                  className="absolute left-[40px] top-0 rounded-full border-2 border-white object-cover bg-white z-30"
                  style={{ zIndex: 30 }}
                />
                <Image
                  src="/landing/user4.png"
                  alt="User 4"
                  width={40}
                  height={40}
                  className="absolute left-[60px] top-0 rounded-full border-2 border-white object-cover bg-white z-40"
                  style={{ zIndex: 40 }}
                />
              </div>
              <div className="text-gray-200 text-sm font-inter ml-8" ref={usersTextRef}>3420+ monthly users</div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold font-inria-sans leading-tight text-white mb-6" ref={taglineRef}>
              {splitTextIntoSpans("Predict the market. Powered by AI")}
              <span className="block text-white mt-3">
                {splitTextIntoSpans("Secured by BlockDAG")}
              </span>
            </h1>
            
            <p className="text-gray-200 font-inter text-xl md:text-2xl mb-8 max-w-3xl" ref={paragraphRef}>
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
                  className="rounded-full border-blue-600 px-6 min-h-[55px]"
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
