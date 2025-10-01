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

  // BlockDAG and regular footer links
  const resourcesLinks = [
    { label: "Official Website", href: "https://blockdag.network", isExternal: true },
    { label: "Documentation", href: "https://docs.blockdag.network", isExternal: true },
    { label: "API", href: "https://blockdag.network/api", isExternal: true },
    { label: "Ecosystem", href: "https://blockdag.network/ecosystem", isExternal: true },
  ];
  const legalLinks = [
    { label: "Privacy Policy", href: "https://blockdag.network/privacy", isExternal: true },
    { label: "Terms of Service", href: "https://blockdag.network/terms", isExternal: true },
    { label: "Cookie Policy", href: "https://blockdag.network/cookies", isExternal: true },
  ];

  return (
  <footer className="bg-[#121114] py-8 px-4 border-t border-[#232226]">
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-start gap-8">
        {/* Logo and copyright */}
        <div className="min-w-[200px] flex flex-col gap-2">
          <Logo className="mb-2" />
          <p className="text-xs text-gray-400 mt-2">© Copyright {currentYear} BetDAG<br />All rights reserved.</p>
        </div>

        {/* Resources links */}
        <div className="min-w-[160px]">
          <h3 className="text-sm font-semibold text-white mb-3">Resources</h3>
          <ul className="space-y-2">
            {resourcesLinks.map((link, i) => (
              <li key={i}>
                <FooterLink {...link} />
              </li>
            ))}
          </ul>
        </div>

        {/* Legal links */}
        <div className="min-w-[160px]">
          <h3 className="text-sm font-semibold text-white mb-3">Legal</h3>
          <ul className="space-y-2">
            {legalLinks.map((link, i) => (
              <li key={i}>
                <FooterLink {...link} />
              </li>
            ))}
          </ul>
        </div>

        {/* Social icons */}
        <div className="min-w-[160px]">
          <h3 className="text-sm font-semibold text-white mb-3">Follow us</h3>
          <div className="flex flex-row items-center gap-3 mt-1">
            <SocialIcon href="https://facebook.com/blockdagnetwork" type="facebook" />
            <SocialIcon href="https://twitter.com/blockdagnetwork" type="twitter" />
            <SocialIcon href="https://instagram.com/blockdagnetwork" type="instagram" />
            <SocialIcon href="https://github.com/blockdagnetwork" type="github" />
            <SocialIcon href="https://linkedin.com/company/blockdagnetwork" type="linkedin" />
          </div>
        </div>
      </div>
    </footer>
  );
}

// Extended SocialIcon to support more types
function SocialIcon({ href, type }: { href: string; type: string }) {
  const iconClass = "w-5 h-5 text-gray-400 hover:text-white transition-colors duration-200";
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center bg-[#232226] rounded-full p-2 hover:bg-[#232226]/80"
      aria-label={type}
    >
      {type === 'facebook' && (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>
      )}
      {type === 'twitter' && (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/></svg>
      )}
      {type === 'instagram' && (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.241-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.771.131 4.659.425 3.678 1.406c-.98.98-1.274 2.092-1.333 3.374C2.013 5.668 2 6.077 2 12c0 5.923.013 6.332.072 7.612.059 1.282.353 2.394 1.333 3.374.98.98 2.092 1.274 3.374 1.333C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.282-.059 2.394-.353 3.374-1.333.98-.98 1.274-2.092 1.333-3.374.059-1.28.072-1.689.072-7.612 0-5.923-.013-6.332-.072-7.612-.059-1.282-.353-2.394-1.333-3.374-.98-.98-2.092-1.274-3.374-1.333C15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"/></svg>
      )}
      {type === 'github' && (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/></svg>
      )}
      {type === 'linkedin' && (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11.75 20h-3v-10h3v10zm-1.5-11.25c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.25 11.25h-3v-5.604c0-1.337-.025-3.063-1.867-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v5.595z"/></svg>
      )}
      {type === 'telegram' && (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161l-1.688 8.024c-.125.586-.453.721-.921.447l-2.532-1.9-1.224 1.194c-.135.136-.248.25-.506.25l.18-2.594 4.656-4.281c.202-.18-.045-.283-.31-.105l-5.758 3.694-2.48-.78c-.539-.17-.548-.539.11-.8l9.688-3.794c.452-.166.847.106.72.695z"/></svg>
      )}
      {type === 'discord' && (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
      )}
    </a>
  );
}