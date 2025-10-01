"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  // Split text into words for animation
  const splitTextIntoWords = (text: string) => {
    return text.split(' ').map((word, i) => (
      <span key={i} className="inline-block">
        <span className="word-mask">{word}</span>
        <span className="px-[0.25em]"></span>
      </span>
    ));
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    // Create ScrollTrigger for the section
    gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=100%", 
        pin: true,
        pinSpacing: true,
        scrub: 1,
      }
    });

    // Animate heading
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          }
        }
      );
    }

    // Animate the combined paragraph with word-by-word color transition
    const para = paragraphRef.current;
    if (para) {
      const words = para.querySelectorAll('.word-mask');
      
      gsap.to(words, {
        color: 'white',
        stagger: 0.02, // Slightly faster stagger since there are more words now
        duration: 0.4,
        scrollTrigger: {
          trigger: para,
          start: "top 80%",
          toggleActions: "play none none reset"
        }
      });
    }

    // Animate image and tags
    if (imageContainerRef.current) {
      gsap.fromTo(
        imageContainerRef.current,
        { scale: 0.9, opacity: 0 },
        { 
          scale: 1, 
          opacity: 1, 
          duration: 1,
          delay: 0.5,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          }
        }
      );
    }

    tagsRef.current.forEach((tag, index) => {
      if (!tag) return;
      
      gsap.fromTo(
        tag,
        { scale: 0, opacity: 0 },
        { 
          scale: 1, 
          opacity: 1, 
          duration: 0.6,
          delay: 1 + (index * 0.2),
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          }
        }
      );
    });

    return () => {
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section className="min-h-screen py-16 bg-black" id="about" ref={sectionRef}>
      <div className="container mx-auto px-4 h-full flex items-center">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left Content - Text */}
          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white" ref={headingRef}>
              About BetDAG
            </h2>
            
            <div>
              <p 
                className="text-lg md:text-xl text-gray-500/50" 
                ref={paragraphRef}
              >
                {splitTextIntoWords("We're building the next generation of prediction markets where AI meets blockchain. Our mission is simple: empower users to make smarter, data-driven crypto predictions in a transparent and rewarding way. By combining advanced AI models with the security of BlockDAG, we deliver accurate insights, seamless wallet integration, and fair outcomes—all powered by decentralized technology. Whether you're here to test your market instincts, compete on the leaderboard, or simply explore AI-driven forecasts, our platform is designed to make crypto predictions accessible, engaging, and trustworthy. We believe the future of finance is open, intelligent, and community-driven, and we're here to lead that movement.")}
              </p>
            </div>
          </div>
          
          {/* Right Content - Robot Arm Image with Tags */}
          <div className="w-full md:w-2/5 mt-8 md:mt-0">
            <div className="relative w-full h-[400px] md:h-[500px]" ref={imageContainerRef}>
              <Image
                src="/landing/about.png"
                alt="AI Robot Hand"
                fill
                className="object-contain"
                priority
              />
          
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}