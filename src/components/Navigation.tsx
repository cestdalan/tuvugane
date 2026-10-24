import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

interface NavigationProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export default function Navigation({ activeSection, onNavigate }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleLinkClick = (id: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setIsMobileMenuOpen(false);
    onNavigate(id);
  };

  const navLinks = [
    { id: 'work', label: 'works' },
    { id: 'archive', label: 'archive' },
    { id: 'what-we-do', label: 'practice' },
    { id: 'about', label: 'studio' },
    { id: 'contact', label: 'contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-in-out w-full ${
          isScrolled
            ? 'bg-[#050505]/95 backdrop-blur-xl border-b border-white/10 py-4 shadow-2xl'
            : 'bg-gradient-to-b from-black/90 via-black/40 to-transparent py-5 sm:py-6'
        }`}
      >
        <div className="w-full px-5 sm:px-8 md:px-12 lg:px-16 flex items-center justify-between">
          {/* Brand Wordmark */}
          <a
            href="#hero"
            onClick={(e) => handleLinkClick('hero', e)}
            data-cursor="tuvugane"
            className="group flex items-center whitespace-nowrap focus-visible:outline-none z-50"
          >
            <span className="font-liber font-black tracking-tight text-xl sm:text-2xl text-white group-hover:text-white/80 transition-colors">
              TUVUGANE
            </span>
          </a>

          {/* Desktop Nav Links: Lowercase Liber Font */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 font-liber font-semibold text-sm tracking-wider lowercase">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleLinkClick(link.id, e)}
                  data-cursor={link.label}
                  className={`relative py-1 transition-colors duration-200 lowercase ${
                    isActive ? 'text-white font-bold' : 'text-white/60 hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-white rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Mobile Menu Button: Lowercase "menu" / "close" in Liber Font */}
          <div className="flex md:hidden items-center z-50">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white font-liber font-bold text-xs tracking-wider lowercase transition-all"
              aria-label={isMobileMenuOpen ? 'close navigation' : 'open navigation'}
            >
              <span>{isMobileMenuOpen ? 'close' : 'menu'}</span>
              {isMobileMenuOpen ? <X className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Overlay Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 md:hidden bg-[#050505]/98 backdrop-blur-3xl flex flex-col justify-between px-6 pt-28 pb-10 font-liber text-white"
          >
            {/* Top Eyebrow */}
            <div className="text-[11px] font-liber uppercase tracking-[0.25em] text-white/40 border-b border-white/10 pb-4">
              Navigation
            </div>

            {/* Large Bold Lowercase Mobile Links */}
            <div className="flex flex-col gap-6 my-auto">
              {navLinks.map((link, idx) => {
                const isActive = activeSection === link.id;
                return (
                  <motion.a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={(e) => handleLinkClick(link.id, e)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * idx, duration: 0.3 }}
                    className={`flex items-baseline justify-between py-2 text-3xl font-liber font-extrabold tracking-tight lowercase transition-colors ${
                      isActive ? 'text-white pl-3 border-l-2 border-white' : 'text-white/60 hover:text-white'
                    }`}
                  >
                    <span>{link.label}</span>
                    <span className="text-xs font-mono text-white/30 font-normal">
                      0{idx + 1}
                    </span>
                  </motion.a>
                );
              })}
            </div>

            {/* Mobile Footer Info */}
            <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs font-liber text-white/40 lowercase">
              <span>tuvugane studio · rwanda</span>
              <a
                href="mailto:hello@tuvugane.com"
                className="text-white hover:underline"
              >
                hello@tuvugane.com
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
