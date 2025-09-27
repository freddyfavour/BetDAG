"use client";

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

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
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Animation for the How It Works section
    const section = sectionRef.current;
    const title = titleRef.current;
    const cards = cardsRef.current;

    if (section && title && cards.length > 0) {
      // Animate the title
      gsap.fromTo(
        title,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
          }
        }
      );

      // Animate each card with stagger
      gsap.fromTo(
        cards,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
          }
        }
      );
    }
  }, []);

  const steps = [
    {
      number: 1,
      title: "Connect your wallet",
      description: "Link your crypto wallet securely to access our prediction platform. We support multiple blockchain networks with BlockDAG technology for maximum security.",
      iconSrc: "/window.svg"
    },
    {
      number: 2,
      title: "Explore AI predictions",
      description: "Access sophisticated AI-powered analytics that forecast cryptocurrency market movements with remarkable accuracy based on comprehensive data analysis.",
      iconSrc: "/globe.svg"
    },
    {
      number: 3,
      title: "Place bets & earn rewards",
      description: "Make your predictions, stake your position, and earn substantial rewards when your market insights prove correct. Compete with others on our leaderboard.",
      iconSrc: "/file.svg"
    }
  ];

  return (
    <section className="py-20 bg-black" id="how-it-works" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6" ref={titleRef}>
            How <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500">It Works</span>
          </h2>
          <p className="text-gray-300 text-xl md:text-2xl max-w-3xl mx-auto">
            Our platform makes it easy to participate in AI-powered crypto predictions. Follow these simple steps to get started and begin earning rewards.
          </p>
        </div>
        
        {/* Glowing orb background effect */}
        <div className="absolute left-1/4 top-1/4 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute right-1/4 bottom-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div 
              key={step.number} 
              ref={el => { cardsRef.current[index] = el; }}
            >
              <Step 
                number={step.number} 
                title={step.title} 
                description={step.description} 
                iconSrc={step.iconSrc}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}