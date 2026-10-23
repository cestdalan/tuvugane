import { ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'what-we-do', label: 'Services' },
    { id: 'work', label: 'Featured Work' },
    { id: 'archive', label: 'Visual Archive' },
    { id: 'about', label: 'About Studio' },
    { id: 'contact', label: 'Contact Desk' },
    { id: 'inquire', label: 'Commission Brief' },
  ];

  return (
    <footer className="relative w-full bg-[#040404] text-white border-t border-white/10 py-16 px-6 md:px-12 lg:px-16">
      <div className="w-full space-y-12">
        {/* Top Tier: Logo & Smooth Top Button */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-white/5">
          <div className="space-y-1">
            <span className="font-display font-black tracking-tight text-2xl text-white">
              TUVUGANE
            </span>
            <p className="text-xs text-white/50 font-light">
              Creative Film &amp; Motion Design Studio · Kigali, Rwanda
            </p>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            data-cursor="TOP"
            className="group inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white/60 hover:text-white transition-colors"
          >
            <span>Back to Top</span>
            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
              <ArrowUp className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>

        {/* Middle Tier: Complete Site Links */}
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-xs font-mono text-white/60">
          {footerLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => onNavigate(link.id)}
              className="hover:text-white transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Bottom Tier: Copyright & Location Marker */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8 border-t border-white/5 text-[11px] font-mono text-white/40">
          <p>© {new Date().getFullYear()} TUVUGANE STUDIO LTD. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-4">
            <span>KG 563 St, Kacyiru, Kigali</span>
            <span>·</span>
            <span>4K / 8K Cinema &amp; 3D Motion</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
