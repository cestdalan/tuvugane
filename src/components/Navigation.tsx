import { useState, useEffect } from 'react';
import { Home, Film, Compass, Mail, Send, ArrowUpRight } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export default function Navigation({ activeSection, onNavigate }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (id: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    onNavigate(id);
  };

  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'work', label: 'Work' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <>
      {/* Desktop & Mobile Navbar: Full screen width with nav links grouped close to Inquire button */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 w-full ${
          isScrolled
            ? 'bg-[#050505]/90 backdrop-blur-xl border-b border-white/10 py-4 shadow-2xl'
            : 'bg-gradient-to-b from-black/80 via-black/30 to-transparent py-6'
        }`}
      >
        <div className="w-full px-6 md:px-12 lg:px-16 flex items-center justify-between">
          {/* Brand Wordmark with Cinema Shutter Emblem on the Left */}
          <a
            href="#hero"
            onClick={(e) => handleLinkClick('hero', e)}
            data-cursor="HOME"
            className="group flex items-center gap-3 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
          >
            <div className="w-8 h-8 rounded-sm bg-white/5 border border-white/20 flex items-center justify-center transition-transform group-hover:scale-105 group-hover:border-white">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
                <path d="M12 3v6M12 15v6M3 12h6M15 12h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="12" cy="12" r="3" fill="currentColor" />
              </svg>
            </div>
            <span className="font-display font-extrabold tracking-tight text-xl text-white group-hover:text-white/90">
              TUVUGANE
            </span>
          </a>

          {/* Desktop Nav Links clustered close to Inquire button (Hidden on mobile: only logo remains) */}
          <div className="hidden lg:flex items-center gap-6 lg:gap-8 shrink-0">
            <nav className="flex items-center gap-6 xl:gap-8 text-sm font-medium">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={(e) => handleLinkClick(link.id, e)}
                    data-cursor={link.label.toUpperCase()}
                    className={`relative py-1 whitespace-nowrap shrink-0 transition-colors duration-200 ${
                      isActive ? 'text-white font-semibold' : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Inquire Pill Button */}
            <a
              href="#inquire"
              onClick={(e) => handleLinkClick('inquire', e)}
              data-cursor="INQUIRE"
              className={`inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold tracking-wide rounded-full border transition-all duration-200 ${
                activeSection === 'inquire'
                  ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.4)]'
                  : 'bg-white/10 hover:bg-white text-white hover:text-black border-white/20 hover:border-white'
              }`}
            >
              <span>Inquire</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </header>

      {/* Mobile Dynamic Island Dock */}
      <div className="md:hidden fixed bottom-[max(1.2rem,env(safe-area-inset-bottom))] left-0 right-0 z-40 flex justify-center pointer-events-none px-4">
        <nav
          className="pointer-events-auto flex items-center gap-1 p-1.5 bg-[#0e0e0e]/90 backdrop-blur-2xl border border-white/15 rounded-full shadow-[0_12px_40px_rgba(0,0,0,0.8)]"
          aria-label="Mobile quick dock"
        >
          {[
            { id: 'hero', icon: Home, label: 'Home' },
            { id: 'work', icon: Film, label: 'Work' },
            { id: 'about', icon: Compass, label: 'About' },
            { id: 'contact', icon: Mail, label: 'Contact' },
            { id: 'inquire', icon: Send, label: 'Inquire' },
          ].map((item) => {
            const isActive = activeSection === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={(e) => handleLinkClick(item.id, e)}
                className={`relative p-2.5 rounded-full transition-all duration-200 active:scale-90 flex items-center justify-center ${
                  isActive
                    ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.4)]'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
                aria-label={item.label}
              >
                <Icon className="w-4 h-4" />
                {isActive && (
                  <span className="absolute -top-1 w-1 h-1 bg-white rounded-full" />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
}
