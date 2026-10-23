import { useState } from 'react';
import { SERVICES } from '../data/portfolioData';
import { ArrowUpRight, Check } from 'lucide-react';

interface ServicesSectionProps {
  onSelectServiceForInquiry?: (serviceTitle: string) => void;
}

export default function ServicesSection({ onSelectServiceForInquiry }: ServicesSectionProps) {
  const [activeServiceId, setActiveServiceId] = useState<string>(SERVICES[0].id);

  return (
    <section id="what-we-do" className="relative w-full py-28 md:py-36 bg-[#080808] text-white border-t border-white/10">
      <div className="w-full px-6 md:px-12 lg:px-16 space-y-16">
        {/* Section Header: Full Width */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-white/50">
              Capabilities &amp; Craft
            </span>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-7xl tracking-tight text-white">
              What We Do
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-white/60 font-light leading-relaxed">
            From remote wilderness expeditions in the Great Lakes region to high-concept kinetic 3D commercial campaigns, we orchestrate the entire creative continuum.
          </p>
        </div>

        {/* Services List: Full-Width Row Items */}
        <div className="divide-y divide-white/10">
          {SERVICES.map((service) => {
            const isExpanded = activeServiceId === service.id;
            return (
              <div
                key={service.id}
                onMouseEnter={() => setActiveServiceId(service.id)}
                className={`group py-10 md:py-14 transition-all duration-300 ${
                  isExpanded ? 'bg-white/[0.02]' : ''
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column: Number + Title */}
                  <div className="lg:col-span-5 flex items-baseline gap-6">
                    <span className="font-mono text-sm md:text-base text-white/40 tracking-wider">
                      {service.number}
                    </span>
                    <div>
                      <h3 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl tracking-tight text-white group-hover:text-white/90 transition-colors">
                        {service.title}
                      </h3>
                      <p className="mt-2 text-sm text-white/50 font-light max-w-sm">
                        {service.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Middle Column: Detailed Description & Deliverables */}
                  <div className="lg:col-span-5 space-y-5">
                    <p className="text-sm md:text-base text-white/70 leading-relaxed font-light">
                      {service.description}
                    </p>

                    {/* Deliverables List */}
                    <div className="space-y-2 pt-2">
                      <span className="text-xs font-mono text-white/40 tracking-wider uppercase block">
                        Core Deliverables
                      </span>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-white/80">
                        {service.deliverables.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <Check className="w-3.5 h-3.5 text-white shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Hardware & Software Tools */}
                    <div className="pt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/40 font-mono">
                      <span>Toolkit:</span>
                      {service.tools.map((tool, idx) => (
                        <span key={idx} className="text-white/60">
                          {tool}{idx < service.tools.length - 1 ? ' ·' : ''}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Inquiry Action */}
                  <div className="lg:col-span-2 flex lg:justify-end items-center">
                    <button
                      type="button"
                      onClick={() => onSelectServiceForInquiry?.(service.title)}
                      data-cursor="BRIEF"
                      className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white/60 hover:text-white group/btn transition-colors"
                    >
                      <span>Inquire</span>
                      <ArrowUpRight className="w-4 h-4 text-white/40 group-hover/btn:text-white group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
