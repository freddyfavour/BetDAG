"use client";

import { useState, useEffect, useLayoutEffect, useRef } from "react";
import Logo from "@/components/Logo";
import ConnectButton from "@/components/ConnectButton";
import { useAccount } from "wagmi";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { gsap } from "gsap";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function Navbar() {
  const { isConnected } = useAccount();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const hasAnimatedRef = useRef(false);
  const fallbackTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const ctxRef = useRef<gsap.Context | null>(null);

  useIsomorphicLayoutEffect(() => {
    if (!headerRef.current) return;

    ctxRef.current = gsap.context(() => {
      gsap.set(headerRef.current, { y: -80, opacity: 0 });
    }, headerRef);

    return () => {
      if (ctxRef.current) {
        ctxRef.current.revert();
        ctxRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!headerRef.current) return;

    const animateIn = () => {
      if (hasAnimatedRef.current || !headerRef.current) return;
      hasAnimatedRef.current = true;
      gsap.to(headerRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      });
    };

    if (pathname !== "/") {
      animateIn();
      return;
    }

    const handleHeroStart = () => {
      animateIn();
    };

    document.addEventListener("heroAnimationStart", handleHeroStart);

    fallbackTimeoutRef.current = setTimeout(() => {
      animateIn();
    }, 4000);

    return () => {
      document.removeEventListener("heroAnimationStart", handleHeroStart);
      if (fallbackTimeoutRef.current) {
        clearTimeout(fallbackTimeoutRef.current);
        fallbackTimeoutRef.current = null;
      }
    };
  }, [pathname]);
  
  // Set mounted state to true after the component mounts
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Only show nav tabs on dashboard routes
  const isDashboard = ["/predictions", "/stats", "/leaderboard", "/profile"].some((route) => pathname.startsWith(route));

  return (
    <header ref={headerRef} className="fixed top-0 left-0 right-0 z-50 bg-[#070E1B]/80 backdrop-blur-lg border-b border-gray-800/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Logo />
          {isDashboard && (
            <nav className="hidden md:flex items-center space-x-8">
              <NavItem href="/predictions">Predictions</NavItem>
              <NavItem href="/stats">Stats</NavItem>
              <NavItem href="/leaderboard">Leaderboard</NavItem>
              <NavItem href="/profile">Profile</NavItem>
            </nav>
          )}
          <div>
            {mounted ? (
              isConnected ? (
                <Link href="/dashboard" className="text-gray-300 hover:text-white px-4 py-2 rounded-lg transition-colors">
                  Go to Dashboard
                </Link>
              ) : (
                <ConnectButton 
                  variant="default" 
                  className="bg-transparent hover:bg-gray-800 text-white px-4 py-2 rounded-lg" 
                />
              )
            ) : (
              <div className="text-gray-700 px-4 py-2 rounded-lg">
                Loading...
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

function NavItem({ href, children }: { href: string, children: React.ReactNode }) {
  return (
    <Link 
      href={href} 
      className="text-gray-300 hover:text-white transition-colors duration-200"
    >
      {children}
    </Link>
  );
}