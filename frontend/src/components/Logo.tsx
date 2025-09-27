"use client";

import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "" }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center ${className}`}>
      <div className="flex items-center">
        <Image
          src="/BetDAG logo.png"
          alt="BetDAG Logo"
          width={120}
          height={30}
          className="h-auto"
          priority
        />
      </div>
    </Link>
  );
}