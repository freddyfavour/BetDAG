"use client";

import Link from 'next/link';
import Logo from './Logo';

interface FooterLinkProps {
  href: string;
  label: string;
  isExternal?: boolean;
}

function FooterLink({ href, label, isExternal = false }: FooterLinkProps) {
  if (isExternal) {
    return (
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-gray-400 hover:text-white transition-colors duration-200"
      >
        {label}
      </a>
    );
  }
  
  return (
    <Link 
      href={href}
      className="text-gray-400 hover:text-white transition-colors duration-200"
    >
      {label}
    </Link>
  );
}

interface FooterSectionProps {
  title: string;
  links: Array<{
    label: string;
    href: string;
    isExternal?: boolean;
  }>;
}

function FooterSection({ title, links }: FooterSectionProps) {
  return (
    <div>
      <h3 className="text-white font-semibold mb-4">{title}</h3>
      <ul className="space-y-2">
        {links.map((link, index) => (
          <li key={index}>
            <FooterLink
              href={link.href}
              label={link.label}
              isExternal={link.isExternal}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const resources = [
    { label: "Documentation", href: "#", isExternal: true },
    { label: "Whitepaper", href: "#", isExternal: true },
    { label: "API", href: "#", isExternal: true },
    { label: "Status", href: "#", isExternal: true },
  ];
  
  const company = [
    { label: "About", href: "#about" },
    { label: "Team", href: "#team" },
    { label: "Careers", href: "#", isExternal: true },
    { label: "Press", href: "#", isExternal: true },
  ];
  
  const legal = [
    { label: "Privacy Policy", href: "#", isExternal: true },
    { label: "Terms of Service", href: "#", isExternal: true },
    { label: "Cookie Policy", href: "#", isExternal: true },
  ];
  
  const blockDAG = [
    { label: "Official Website", href: "https://blockdag.network", isExternal: true },
    { label: "Technical Docs", href: "https://docs.blockdag.network", isExternal: true },
    { label: "Ecosystem", href: "https://blockdag.network/ecosystem", isExternal: true },
  ];
  
  const articles = [
    { label: "Introducing BetDAG", href: "#", isExternal: true },
    { label: "The Future of Prediction Markets", href: "#", isExternal: true },
    { label: "AI in Crypto Forecasting", href: "#", isExternal: true },
    { label: "BlockDAG vs Traditional Blockchains", href: "#", isExternal: true },
  ];

  return (
    <footer className="bg-[#0A1223] border-t border-gray-800/50 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          {/* Logo and description */}
          <div className="lg:col-span-2">
            <Logo className="mb-4" />
            <p className="text-gray-400 mb-6 max-w-md">
              BetDAG is the first AI-powered prediction marketplace built on BlockDAG's 
              innovative technology, allowing users to make smarter crypto predictions.
            </p>
            
            {/* Social media links */}
            <div className="flex space-x-4">
              <SocialIcon href="https://twitter.com/blockdagnetwork" type="twitter" />
              <SocialIcon href="https://t.me/blockdagnetwork" type="telegram" />
              <SocialIcon href="https://github.com/blockdagnetwork" type="github" />
              <SocialIcon href="https://discord.gg/blockdag" type="discord" />
            </div>
          </div>
          
          {/* Navigation links */}
          <FooterSection title="Resources" links={resources} />
          <FooterSection title="Company" links={company} />
          <FooterSection title="Legal" links={legal} />
        </div>
        
        {/* BlockDAG section */}
        <div className="border-t border-gray-800/50 pt-8 mt-8">
          <div className="flex flex-col lg:flex-row justify-between gap-8">
            <div className="lg:w-1/3">
              <h3 className="text-white font-semibold mb-4">BlockDAG Network</h3>
              <p className="text-gray-400 mb-4">
                Built on BlockDAG's innovative directed acyclic graph technology, offering 
                high throughput, low fees, and exceptional security.
              </p>
              <ul className="space-y-2">
                {blockDAG.map((link, index) => (
                  <li key={index}>
                    <FooterLink
                      href={link.href}
                      label={link.label}
                      isExternal={link.isExternal}
                    />
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="lg:w-1/3">
              <h3 className="text-white font-semibold mb-4">Latest Articles</h3>
              <ul className="space-y-4">
                {articles.map((article, index) => (
                  <li key={index} className="border-l-2 border-blue-500 pl-4">
                    <FooterLink
                      href={article.href}
                      label={article.label}
                      isExternal={article.isExternal}
                    />
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="lg:w-1/3">
              <h3 className="text-white font-semibold mb-4">Newsletter</h3>
              <p className="text-gray-400 mb-4">
                Subscribe to our newsletter for the latest updates on features, predictions, and market analysis.
              </p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-gray-800/50 text-white px-4 py-2 rounded-l-lg border border-gray-700 focus:outline-none focus:border-blue-500 w-full"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-teal-400 text-white px-4 py-2 rounded-r-lg font-medium hover:opacity-90 transition-opacity duration-200"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-800/50 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {currentYear} BetDAG. All rights reserved. Powered by{' '}
            <a 
              href="https://blockdag.network" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-400 hover:text-blue-300"
            >
              BlockDAG Network
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ href, type }: { href: string; type: 'twitter' | 'telegram' | 'discord' | 'github' }) {
  const iconClass = "w-5 h-5";
  
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="bg-gray-800 p-3 rounded-full hover:bg-blue-600 transition-colors duration-200"
    >
      {type === 'twitter' && (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      )}
      
      {type === 'telegram' && (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161l-1.688 8.024c-.125.586-.453.721-.921.447l-2.532-1.9-1.224 1.194c-.135.136-.248.25-.506.25l.18-2.594 4.656-4.281c.202-.18-.045-.283-.31-.105l-5.758 3.694-2.48-.78c-.539-.17-.548-.539.11-.8l9.688-3.794c.452-.166.847.106.72.695z" />
        </svg>
      )}
      
      {type === 'discord' && (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
        </svg>
      )}
      
      {type === 'github' && (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
        </svg>
      )}
    </a>
  );
}