"use client";

import Image from 'next/image';

interface ProblemCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

function ProblemCard({ title, description, icon }: ProblemCardProps) {
  return (
    <div className="bg-gray-800/40 rounded-xl border border-gray-700/50 p-6 backdrop-blur-sm hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 flex flex-col items-start justify-center h-full">
      <div className="text-blue-400 mb-4 flex items-center">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-white text-left">{title}</h3>
      <p className="text-gray-300 text-left">{description}</p>
    </div>
  );
}

export default function ProblemImpactSection() {
  const problemCards = [
    {
      title: "Uncertainty in Crypto Markets",
      description: "Prices move fast, and most traders rely on guesswork or hype instead of data.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Lack of Transparency",
      description: "Many prediction tools are centralized, making users question fairness and outcomes.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      title: "Barrier to Entry",
      description: "Traditional trading platforms can feel complex and intimidating for newcomers.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      )
    },
    {
      title: "No Engagement Layer",
      description: "Most platforms are purely transactional, lacking community, fun, or competition.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-16 bg-[#0A1223]" id="problem-impact">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Real Problems, Real Impact.
          </h2>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200">
            Connect Wallet to Get Started
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {/* First column - first two cards */}
          <div className="flex flex-col gap-6 h-full">
            <div className="flex-1 flex">
              <ProblemCard
                title={problemCards[0].title}
                description={problemCards[0].description}
                icon={problemCards[0].icon}
              />
            </div>
            <div className="flex-1 flex">
              <ProblemCard
                title={problemCards[2].title}
                description={problemCards[2].description}
                icon={problemCards[2].icon}
              />
            </div>
          </div>
          {/* Second column - next two cards */}
          <div className="flex flex-col gap-6 h-full">
            <div className="flex-1 flex">
              <ProblemCard
                title={problemCards[1].title}
                description={problemCards[1].description}
                icon={problemCards[1].icon}
              />
            </div>
            <div className="flex-1 flex">
              <ProblemCard
                title={problemCards[3].title}
                description={problemCards[3].description}
                icon={problemCards[3].icon}
              />
            </div>
          </div>
          {/* Third column - Image */}
          <div className="flex h-full">
            <div className="relative rounded-2xl overflow-hidden flex-1 flex items-stretch w-full">
              <Image
                src="/landing/impact.png"
                alt="Wind turbines at sunset"
                width={454}
                height={576}
                priority
                style={{ width: '100%', height: '100%', objectFit: 'contain', background: 'transparent' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}