import { ArrowUpRight } from 'lucide-react';

interface AboutSectionProps {
  onNavigate: (sectionId: string) => void;
}

export default function AboutSection({ onNavigate }: AboutSectionProps) {
  const pillars = [
    {
      num: '01',
      title: 'Truth in Storytelling',
      text: 'Cinema is not merely aesthetic ornamentation; it is the radical preservation of human truth. We embed deeply into communities and landscapes to uncover stories that resonate with authentic weight rather than manufactured tropes.'
    },
    {
      num: '02',
      title: 'Film & Motion Parity',
      text: 'We dismantle the arbitrary boundary between organic live-action filmmaking and digital motion design. By uniting large-format cinema sensors with procedural 3D simulations and kinetic typography, we craft singular visual ecosystems.'
    },
    {
      num: '03',
      title: 'African Roots, Global Lens',
      text: 'Operating from our studio in Kacyiru, Kigali, we bring the rhythm, architectural ambition, and narrative brilliance of modern Africa to prestigious international stages, broadcasting across festivals, museum projections, and global commercial campaigns.'
    }
  ];

  const studioStats = [
    { label: 'International Festival Laurels', value: '24+' },
    { label: 'Commercial & Narrative Films', value: '120+' },
    { label: 'Camera Pipeline Resolution', value: '8K HDR' },
    { label: 'Global Client Origin', value: '60%' }
  ];

  return (
    <section id="about" className="relative w-full py-28 md:py-36 bg-[#050505] text-white border-t border-white/10">
      <div className="w-full px-6 md:px-12 lg:px-16 space-y-24">
        {/* Section Header & Manifesto Intro: Full Screen Width */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-white/50">
              Studio Manifesto
            </span>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-7xl tracking-tight leading-[1.02] text-white">
              We capture what cannot be fabricated.
            </h2>
          </div>

          <div className="lg:col-span-7 space-y-6 lg:pt-4">
            <p className="text-lg sm:text-2xl text-white/80 font-light leading-relaxed">
              Founded in Kigali, <strong className="text-white font-medium">Tuvugane</strong> was built on a singular conviction: that modern cinema from Africa deserves the most uncompromising technical craft on earth.
            </p>
            <p className="text-sm sm:text-base text-white/60 font-light leading-relaxed">
              "Tuvugane" is a Kinyarwanda word meaning <em>"Let us speak together."</em> We approach every commission—whether a conservation documentary in the cloud forests of the Virunga Massif, a commercial campaign for international mobility, or an avant-garde runway film—as an intimate conversation between creator, subject, and audience.
            </p>

            {/* Direct jump to contact */}
            <div className="pt-4">
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                data-cursor="CONTACT"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white border-b border-white pb-1 hover:text-white/70 hover:border-white/70 transition-colors"
              >
                <span>Initiate a dialogue with our directors</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 3 Pillars Grid: Full Screen Width */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-white/10">
          {pillars.map((pillar) => (
            <div key={pillar.num} className="space-y-4 p-8 md:p-10 rounded-2xl bg-[#0a0a0a] border border-white/10 hover:border-white/20 transition-all">
              <span className="font-mono text-sm text-white/40 block">{pillar.num}</span>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-white">{pillar.title}</h3>
              <p className="text-sm text-white/60 font-light leading-relaxed">
                {pillar.text}
              </p>
            </div>
          ))}
        </div>

        {/* Studio Stats Strip: Full Screen Width */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 p-8 md:p-10 rounded-2xl bg-[#0a0a0a] border border-white/10">
          {studioStats.map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-wider text-white/40 block">
                {stat.label}
              </span>
              <span className="font-display font-extrabold text-3xl sm:text-5xl text-white tabular-nums">
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
