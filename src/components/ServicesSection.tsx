import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICES } from '../data/portfolioData';
import { ArrowUpRight } from 'lucide-react';
import BlurImage from './BlurImage';

interface ServicesSectionProps {
  onSelectServiceForInquiry?: (serviceTitle: string) => void;
}

export default function ServicesSection({ onSelectServiceForInquiry }: ServicesSectionProps) {
  const [activeService, setActiveService] = useState(SERVICES[0]);

  return (
    <section
      id="what-we-do"
      className="relative w-full py-24 md:py-32 bg-[#060606] text-white border-t border-white/10 overflow-hidden font-liber"
    >
      <div className="w-full px-6 md:px-12 lg:px-16 space-y-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10"
        >
          <div className="space-y-2">
            <span className="text-[11px] font-liber uppercase tracking-[0.2em] text-white/40 block">
              Disciplines
            </span>
            <h2 className="font-liber font-black text-4xl sm:text-6xl tracking-tight text-white">
              Our <span className="font-liber font-light text-white/70">Craft</span>
            </h2>
          </div>
          <p className="text-xs font-liber text-white/40 max-w-xs">
            From remote wilderness expeditions in Rwanda to high-concept kinetic 3D commercial campaigns.
          </p>
        </motion.div>

        {/* Split Layout: Interactive Disciplines List + Dynamic Visual Preview Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-4">
          {/* Left Column: Clean Minimal Row Items in Liber font */}
          <div className="lg:col-span-7 divide-y divide-white/10">
            {SERVICES.map((service) => {
              const isActive = activeService.id === service.id;
              return (
                <div
                  key={service.id}
                  onMouseEnter={() => setActiveService(service)}
                  onClick={() => onSelectServiceForInquiry?.(service.title)}
                  className={`group py-7 cursor-pointer flex items-baseline justify-between gap-6 transition-all duration-300 ${
                    isActive ? 'pl-3 border-l-2 border-white' : 'opacity-60 hover:opacity-100 hover:pl-2'
                  }`}
                >
                  <div className="flex items-baseline gap-6">
                    <span className="font-liber text-xs text-white/40">
                      {service.number}
                    </span>
                    <div>
                      <h3 className="font-liber font-bold text-2xl sm:text-3xl text-white group-hover:text-white/90">
                        {service.title}
                      </h3>
                      <p className="text-xs text-white/50 font-light mt-1">
                        {service.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    <span className="text-[10px] font-liber uppercase tracking-wider text-white/40 opacity-0 group-hover:opacity-100 transition-opacity">
                      Inquire
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Visual Preview Card with Skeleton Blur Load */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-black border border-white/15 shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService.id}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="absolute inset-0"
                >
                  {activeService.imageUrl && (
                    <BlurImage
                      src={activeService.imageUrl}
                      alt={activeService.title}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute inset-0 film-grain pointer-events-none" />

                  {/* Corner Label */}
                  <div className="absolute bottom-4 left-4 right-4 text-left pointer-events-none z-10">
                    <span className="text-[10px] font-liber uppercase tracking-wider text-white/60 block">
                      {activeService.number} / {activeService.title}
                    </span>
                    <p className="text-xs text-white/80 font-light mt-0.5 line-clamp-1">
                      {activeService.description}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
