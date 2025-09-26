import React from "react";
import Logo from "@/components/Logo";
import Link from "next/link";

const tabs = [
  { name: "Predictions", href: "/predictions" },
  { name: "Stats", href: "/stats" },
  { name: "Leaderboard", href: "/leaderboard" },
  { name: "Profile", href: "/profile" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#070E1B]">
      <aside className="w-20 md:w-48 bg-[#0C162B] border-r border-gray-800/50 flex flex-col items-center py-8 space-y-8">
        <Logo />
        <nav className="flex flex-col items-center md:items-start w-full space-y-4 mt-8">
          {tabs.map(tab => (
            <Link
              key={tab.href}
              href={tab.href}
              className="text-gray-300 hover:text-white px-2 py-2 rounded-lg text-sm md:text-base transition-colors w-full text-center md:text-left"
            >
              {tab.name}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-4 md:p-8">
        {children}
      </main>
    </div>
  );
}
