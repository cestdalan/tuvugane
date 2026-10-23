import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ARCHIVE_STILLS } from '../data/portfolioData';
import { ArchiveStill } from '../types';
import { X, Camera, MapPin, Maximize2, ArrowLeft, ArrowRight, Film, Sliders } from 'lucide-react';

export default function ArchiveSection() {
  const [selectedStill, setSelectedStill] = useState<ArchiveStill | null>(null);
  const modalScrollRef = useRef<HTMLDivElement>(null);

  const openLightbox = (still: ArchiveStill) => {
    setSelectedStill(still);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedStill(null);
    document.body.style.overflow = '';
  };

  const currentIndex = selectedStill
    ? ARCHIVE_STILLS.findIndex((s) => s.id === selectedStill.id)
    : -1;

  const nextIndex = currentIndex >= 0 ? (currentIndex + 1) % ARCHIVE_STILLS.length : 0;
  const prevIndex = currentIndex >= 0 ? (currentIndex - 1 + ARCHIVE_STILLS.length) % ARCHIVE_STILLS.length : 0;

  const nextStill = ARCHIVE_STILLS[nextIndex];
  const prevStill = ARCHIVE_STILLS[prevIndex];

  const navigateToStill = (still: ArchiveStill) => {
    setSelectedStill(still);
    if (modalScrollRef.current) {
      modalScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navigateNext = () => {
    if (currentIndex >= 0) {
      navigateToStill(nextStill);
    }
  };

  const navigatePrev = () => {
    if (currentIndex >= 0) {
      navigateToStill(prevStill);
    }
  };

  // Keyboard navigation for full view
  useEffect(() => {
    if (!selectedStill) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        navigateNext();
      } else if (e.key === 'ArrowLeft') {
        navigatePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedStill, currentIndex]);

  return (
    <section id="archive" className="relative w-full py-28 md:py-36 bg-[#080808] text-white border-t border-white/10 overflow-hidden">
      <div className="w-full px-6 md:px-12 lg:px-16 space-y-16">
        {/* Section Header: Full Screen Width with scroll flow animation */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10"
        >
          <div className="space-y-3">
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-7xl tracking-tight text-white">
              Stills of Today
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-white/60 font-light leading-relaxed">
            Raw frames, optical experiments, and behind-the-lens documentation captured across Rwanda's landscapes and international film sets.
          </p>
        </motion.div>

        {/* Stills Grid: Cards flowing in smoothly on scroll */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ARCHIVE_STILLS.map((still, idx) => (
            <motion.div
              key={still.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: (idx % 3) * 0.12, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => openLightbox(still)}
              data-cursor="EXPAND"
              className="group cursor-pointer flex flex-col rounded-xl overflow-hidden bg-[#0e0e0e] border border-white/10 hover:border-white/30 transition-all duration-300"
            >
              {/* Still Photo Container */}
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-black">
                <img
                  src={still.imageUrl}
                  alt={still.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center filter brightness-80 group-hover:brightness-95 group-hover:scale-105 transition-all duration-700 ease-out"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />
                <div className="absolute inset-0 film-grain pointer-events-none" />

                {/* Top Location Pill */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-white/80">
                  <span className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded border border-white/10">
                    <MapPin className="w-3 h-3 text-white" />
                    <span className="truncate max-w-[160px]">{still.location}</span>
                  </span>
                  <span className="bg-black/60 backdrop-blur-md px-2 py-1 rounded border border-white/10">
                    {still.year}
                  </span>
                </div>

                {/* Bottom Overlay Title */}
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between z-10">
                  <div className="space-y-0.5 max-w-[80%]">
                    <span className="text-[10px] font-mono text-white/60 uppercase block">
                      {still.project}
                    </span>
                    <h4 className="font-display font-bold text-base text-white group-hover:text-white/90 truncate">
                      {still.title}
                    </h4>
                  </div>
                  <div className="p-2 rounded-full bg-white/10 text-white group-hover:bg-white group-hover:text-black transition-colors">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              {/* Technical EXIF Strip */}
              <div className="px-5 py-3 bg-[#0a0a0a] border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-white/40">
                <div className="flex items-center gap-2 truncate">
                  <Camera className="w-3 h-3 shrink-0 text-white/30" />
                  <span className="truncate">{still.camera} · {still.lens}</span>
                </div>
                <span className="shrink-0 text-white/60 ml-2">{still.exif}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Full View Lightbox Modal */}
      {selectedStill && (
        <div
          ref={modalScrollRef}
          className="fixed inset-0 z-50 overflow-y-auto bg-black/95 backdrop-blur-2xl text-white animate-in fade-in duration-300"
        >
          {/* Sticky Full View Top Navigation Bar */}
          <div className="sticky top-0 z-30 w-full bg-[#080808]/90 backdrop-blur-xl border-b border-white/10 px-6 md:px-12 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs uppercase tracking-widest text-white/40 hidden sm:inline-block">
                Stills of Today
              </span>
              <span className="text-white/20 hidden sm:inline-block">/</span>
              <span className="font-mono text-xs text-white/80 tabular-nums">
                {String(currentIndex + 1).padStart(2, '0')} of {String(ARCHIVE_STILLS.length).padStart(2, '0')}
              </span>
            </div>

            {/* Middle Quick Info */}
            <div className="hidden md:flex items-center gap-2 text-xs font-mono text-white/60 truncate max-w-md">
              <span className="text-white font-medium truncate">{selectedStill.title}</span>
              <span>·</span>
              <span className="text-white/40 truncate">{selectedStill.project}</span>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-white/5 rounded-lg p-0.5 border border-white/10">
                <button
                  type="button"
                  onClick={navigatePrev}
                  className="p-1.5 rounded text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Previous still"
                  title="Previous Still (Left Arrow)"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={navigateNext}
                  className="p-1.5 rounded text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Next still"
                  title="Next Still (Right Arrow)"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={closeLightbox}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white text-white hover:text-black text-xs font-mono uppercase tracking-wider transition-all duration-200"
                aria-label="Close full view"
              >
                <span>Close</span>
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Full View Content Container */}
          <div className="w-full max-w-6xl mx-auto px-6 md:px-12 py-10 space-y-12">
            {/* 1. Large Cinematic Image Frame */}
            <div className="relative w-full rounded-2xl overflow-hidden bg-black border border-white/15 shadow-2xl">
              <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] flex items-center justify-center bg-zinc-950">
                <img
                  src={selectedStill.imageUrl}
                  alt={selectedStill.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain select-none"
                />
                <div className="absolute inset-0 film-grain pointer-events-none" />
              </div>

              {/* Sub-strip on image: location & year */}
              <div className="p-4 bg-[#0a0a0a] border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-white/60">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-white" />
                  <span className="text-white">{selectedStill.location}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-white/40">PROJECT: <strong className="text-white font-normal">{selectedStill.project}</strong></span>
                  <span className="text-white/40">YEAR: <strong className="text-white font-normal">{selectedStill.year}</strong></span>
                </div>
              </div>
            </div>

            {/* 2. Title, Project & Full Description */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">
              <div className="lg:col-span-5 space-y-3">
                <span className="text-xs font-mono uppercase tracking-widest text-white/40 block">
                  {selectedStill.project}
                </span>
                <h3 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
                  {selectedStill.title}
                </h3>
              </div>

              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-3">
                  <span className="text-xs font-mono uppercase tracking-wider text-white/40 block flex items-center gap-2">
                    <Film className="w-3.5 h-3.5 text-white" />
                    <span>Visual Narrative &amp; Context</span>
                  </span>
                  <p className="text-base sm:text-lg text-white/80 leading-relaxed font-light">
                    {selectedStill.description}
                  </p>
                </div>

                {selectedStill.backstory && (
                  <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-white/50 block">
                      Behind The Lens · Production Notes
                    </span>
                    <p className="text-xs sm:text-sm text-white/60 font-light leading-relaxed italic">
                      "{selectedStill.backstory}"
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* 3. Technical EXIF & Camera Rig Strip */}
            <div className="p-6 md:p-8 rounded-2xl bg-[#0c0c0c] border border-white/10 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-white/40 uppercase tracking-wider">
                <Sliders className="w-3.5 h-3.5 text-white" />
                <span>Optical &amp; Sensor Specifications</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-xs font-mono">
                <div className="space-y-1">
                  <span className="text-white/40 block">CAMERA SYSTEM</span>
                  <span className="text-white font-medium text-sm">{selectedStill.camera}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-white/40 block">OPTICS &amp; LENS</span>
                  <span className="text-white font-medium text-sm">{selectedStill.lens}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-white/40 block">EXPOSURE &amp; SHUTTER</span>
                  <span className="text-white font-medium text-sm">{selectedStill.exif}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-white/40 block">LOCATION</span>
                  <span className="text-white font-medium text-sm truncate block">{selectedStill.location}</span>
                </div>
              </div>
            </div>

            {/* 4. Bottom Link To The Next Still Card (In Full View) */}
            <div className="pt-12 pb-16 border-t border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-widest text-white/40">
                  Next Still in Stills of Today
                </span>
                <span className="text-xs font-mono text-white/40">
                  {String(nextIndex + 1).padStart(2, '0')} / {String(ARCHIVE_STILLS.length).padStart(2, '0')}
                </span>
              </div>

              {/* Clickable Card Linking to Next Still in Full View */}
              <button
                type="button"
                onClick={() => navigateToStill(nextStill)}
                data-cursor="NEXT"
                className="group w-full p-6 md:p-8 rounded-2xl bg-[#0e0e0e] hover:bg-[#141414] border border-white/10 hover:border-white/30 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6 text-left"
              >
                <div className="flex items-center gap-6">
                  {/* Thumbnail of Next Card */}
                  <div className="relative w-28 h-20 md:w-36 md:h-24 rounded-xl overflow-hidden shrink-0 border border-white/10 bg-black">
                    <img
                      src={nextStill.imageUrl}
                      alt={nextStill.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors" />
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-xs font-mono text-white/50 uppercase block">
                      {nextStill.project} · {nextStill.year}
                    </span>
                    <h4 className="font-display font-bold text-xl md:text-2xl lg:text-3xl text-white group-hover:text-white/90 transition-colors">
                      {nextStill.title}
                    </h4>
                    <p className="text-xs font-mono text-white/40 flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 text-white/30" />
                      <span>{nextStill.location}</span>
                    </p>
                  </div>
                </div>

                {/* Arrow Pointing Right Showing Next */}
                <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                  <span className="text-xs font-mono uppercase tracking-wider text-white/60 group-hover:text-white transition-colors">
                    View Next Still
                  </span>
                  <div className="w-12 h-12 rounded-full bg-white/5 group-hover:bg-white text-white group-hover:text-black border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:translate-x-1.5 shadow-lg">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

