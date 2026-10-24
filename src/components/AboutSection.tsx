import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import BlurImage from './BlurImage';

interface AboutSectionProps {
  onNavigate: (sectionId: string) => void;
}

export default function AboutSection({ onNavigate }: AboutSectionProps) {
  const specs = [
    { label: 'Origin', value: 'Kigali, Rwanda' },
    { label: 'Est.', value: '2017' },
    { label: 'Pipeline', value: '8K LF & 35mm' },
    { label: 'Festival Laurels', value: '24+' },
  ];

  return (
    <section
      id="about"
      className="relative w-full py-24 md:py-32 bg-[#050505] text-white border-t border-white/10 overflow-hidden font-liber"
    >
      <div className="w-full px-6 md:px-12 lg:px-16 space-y-16">
        {/* Editorial Headline & Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-baseline border-b border-white/10 pb-12"
        >
          <div className="lg:col-span-6 space-y-2">
            <span className="text-[11px] font-liber uppercase tracking-[0.2em] text-white/40 block">
              The Studio
            </span>
            <h2 className="font-liber font-black text-4xl sm:text-6xl tracking-tight text-white leading-tight">
              Rooted in Africa. <br />
              <span className="font-liber font-light text-white/70">Made for the world.</span>
            </h2>
          </div>

          <div className="lg:col-span-6 space-y-6 lg:pl-6">
            <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed">
              <strong className="text-white font-medium">Tuvugane</strong> is a creative film and motion design studio headquartered in Kigali. We craft cinematic documentary, commercial narratives, and avant-garde kinetic direction.
            </p>

            <button
              type="button"
              onClick={() => onNavigate('contact')}
              data-cursor="DIALOGUE"
              className="inline-flex items-center gap-2 text-xs font-liber font-semibold uppercase tracking-wider text-white border-b border-white pb-1 hover:text-white/60 hover:border-white/60 transition-colors"
            >
              <span>Initiate a dialogue</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>

        {/* Visual Studio Photo Triptych with Skeleton Blur Load */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {/* Main Photo: Crew on Set */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-7 relative aspect-[16/10] overflow-hidden rounded bg-black border border-white/10 group"
          >
            <BlurImage
              src="/assets/aistudio/trn_staff3_3_5b9708db.JPG"
              alt="Tuvugane production crew on set"
              className="group-hover:scale-102 transition-transform duration-700"
            />
            <div className="absolute inset-0 film-grain pointer-events-none" />
            <div className="absolute bottom-3 left-3 text-[10px] font-liber text-white/60 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded pointer-events-none">
              Production Crew · On Set in Rwanda
            </div>
          </motion.div>

          {/* Secondary Photo: Portraiture */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-5 relative aspect-[16/10] md:aspect-auto overflow-hidden rounded bg-black border border-white/10 group"
          >
            <BlurImage
              src="/assets/aistudio/ASP_ANITHA_70_51cb7ec8.JPG"
              alt="Studio portraiture"
              className="group-hover:scale-102 transition-transform duration-700"
            />
            <div className="absolute inset-0 film-grain pointer-events-none" />
            <div className="absolute bottom-3 left-3 text-[10px] font-liber text-white/60 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded pointer-events-none">
              Studio Portraiture · Chiaroscuro Study
            </div>
          </motion.div>
        </div>

        {/* Minimal Specs Bar in Liber font */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-white/10 text-xs font-liber">
          {specs.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <span className="text-white/40 uppercase tracking-widest text-[10px] block">
                {item.label}
              </span>
              <span className="text-white text-sm font-semibold tracking-wide">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
