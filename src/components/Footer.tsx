import { ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = [
    { id: 'hero', label: 'home' },
    { id: 'work', label: 'works' },
    { id: 'archive', label: 'archive' },
    { id: 'contact', label: 'contact' },
  ];

  return (
    <footer className="w-full bg-[#040404] text-white border-t border-white/10 py-12 px-6 md:px-12 lg:px-16 font-liber">
      <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <span className="font-liber font-black tracking-tight text-lg text-white">
            TUVUGANE
          </span>
          <span className="text-white/30 text-xs">/</span>
          <span className="text-xs font-liber text-white/50">
            © {new Date().getFullYear()} Tuvugane Studio · Rwanda
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-xs font-liber text-white/50 lowercase">
          {footerLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => onNavigate(link.id)}
              className="hover:text-white font-medium transition-colors lowercase"
            >
              {link.label}
            </button>
          ))}

          <button
            type="button"
            onClick={scrollToTop}
            data-cursor="top"
            className="flex items-center gap-1.5 text-white/70 hover:text-white font-bold transition-colors ml-2 lowercase"
          >
            <span>top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
