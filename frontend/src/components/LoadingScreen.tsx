"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function LoadingScreen() {
  const loadingRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    // Create timeline for loading animation
    const tl = gsap.timeline({ 
      defaults: { ease: "power2.inOut" },
      onComplete: () => {
        // Dispatch event when loading is complete
        document.dispatchEvent(new Event('loadingComplete'));
      }
    });
    
    // Loading animation sequence
    tl.to(logoRef.current, { 
      opacity: 1, 
      scale: 1.2, 
      duration: 1.5,
      delay: 0.5
    })
    .to(logoRef.current, { 
      scale: 0.9,
      duration: 0.5
    })
    .to(logoRef.current, { 
      scale: 1,
      duration: 0.5
    })
    .to(loadingRef.current, { 
      opacity: 0, 
      duration: 1.5,
      display: "none" 
    }, "+=0.5");
    
    // Prevent scrolling during loading
    document.body.style.overflow = "hidden";
    
    // Enable scrolling after loading
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div 
      ref={loadingRef}
      className="fixed inset-0 bg-black z-50 flex items-center justify-center"
    >
      <div 
        ref={logoRef}
        className="opacity-0"
      >
        <div className="text-4xl font-bold text-white flex items-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500">
            BetDAG
          </span>
          <div className="ml-3 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}