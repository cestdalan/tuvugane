import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ARCHIVE_STILLS } from '../data/portfolioData';
import { ArchiveStill } from '../types';
import { X, Maximize2, ArrowLeft, ArrowRight, Camera } from 'lucide-react';
import BlurImage from './BlurImage';

export default function ArchiveSection() {
  const [selectedStill, setSelectedStill] = useState<ArchiveStill | null>(null);
  const [activeAspectFilter, setActiveAspectFilter] = useState<'all' | 'portrait' | 'landscape'>('all');
  const modalScrollRef = useRef<HTMLDivElement>(null);

  const openLightbox = (still: ArchiveStill) => {
    setSelectedStill(still);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedStill(null);
    document.body.style.overflow = '';
  };

  const filteredStills =
    activeAspectFilter === 'all'
      ? ARCHIVE_STILLS
      : ARCHIVE_STILLS.filter((s) => s.aspectRatio === activeAspectFilter);

  const currentIndex = selectedStill
    ? ARCHIVE_STILLS.findIndex((s) => s.id === selectedStill.id)
    : -1;

  const navigateNext = () => {
    if (currentIndex >= 0) {
      const nextIdx = (currentIndex + 1) % ARCHIVE_STILLS.length;
      setSelectedStill(ARCHIVE_STILLS[nextIdx]);
    }
  };

  const navigatePrev = () => {
    if (currentIndex >= 0) {
      const prevIdx = (currentIndex - 1 + ARCHIVE_STILLS.length) % ARCHIVE_STILLS.length;
      setSelectedStill(ARCHIVE_STILLS[prevIdx]);
    }
  };

  useEffect(() => {
    if (!selectedStill) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') navigateNext();
      if (e.key === 'ArrowLeft') navigatePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedStill, currentIndex]);

  return (
    <section
      id="archive"
      className="relative w-full py-24 md:py-32 bg-[#080808] text-white border-t border-white/10 overflow-hidden font-liber"
    >
      <div className="w-full px-6 md:px-12 lg:px-16 space-y-12">
        {/* Minimal Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10"
        >
          <div className="space-y-2">
            <span className="text-[11px] font-liber uppercase tracking-[0.2em] text-white/40 block">
              Optical Monograph
            </span>
            <h2 className="font-liber font-black text-4xl sm:text-6xl tracking-tight text-white">
              Visual <span className="font-liber font-light text-white/70">Archive</span>
            </h2>
          </div>

          {/* Aspect Ratio Filter (Clean text in Liber font) */}
          <div className="flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/10">
            <button
              type="button"
              onClick={() => setActiveAspectFilter('all')}
              className={`px-3 py-1 text-xs font-liber rounded-full transition-colors ${
                activeAspectFilter === 'all'
                  ? 'bg-white text-black font-semibold'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              All Stills
            </button>
            <button
              type="button"
              onClick={() => setActiveAspectFilter('landscape')}
              className={`px-3 py-1 text-xs font-liber rounded-full transition-colors ${
                activeAspectFilter === 'landscape'
                  ? 'bg-white text-black font-semibold'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              Landscape
            </button>
            <button
              type="button"
              onClick={() => setActiveAspectFilter('portrait')}
              className={`px-3 py-1 text-xs font-liber rounded-full transition-colors ${
                activeAspectFilter === 'portrait'
                  ? 'bg-white text-black font-semibold'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              Portrait
            </button>
          </div>
        </motion.div>

        {/* Gallery Masonry Wall: Images Fill Entire Card, No Years */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6 pt-4">
          {filteredStills.map((still, idx) => {
            const isTall = still.aspectRatio === 'portrait';
            return (
              <motion.div
                key={still.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: (idx % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => openLightbox(still)}
                data-cursor="EXPAND"
                className="break-inside-avoid group cursor-pointer relative overflow-hidden bg-black border border-white/10 hover:border-white/30 transition-all duration-300 rounded"
              >
                <div className={`relative w-full ${isTall ? 'aspect-[3/4]' : 'aspect-[16/10]'}`}>
                  <BlurImage
                    src={still.imageUrl}
                    alt={still.title}
                    priority={idx < 4}
                    className="group-hover:brightness-105 group-hover:scale-103 transition-all duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity pointer-events-none" />
                  <div className="absolute inset-0 film-grain pointer-events-none" />

                  {/* Bottom Caption Overlay: Title and Camera (NO year) */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-end justify-between z-10 pointer-events-none">
                    <div className="space-y-0.5 max-w-[85%]">
                      <span className="text-[10px] font-liber font-medium text-white/60 block">
                        {still.camera}
                      </span>
                      <h4 className="font-liber font-bold text-sm sm:text-base text-white truncate">
                        {still.title}
                      </h4>
                    </div>
                    <div className="p-1.5 rounded-full bg-white/15 text-white group-hover:bg-white group-hover:text-black transition-colors shrink-0">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Uncropped, Full-Fidelity Lightbox Modal on PC View with Description Below */}
      {selectedStill && (
        <div
          ref={modalScrollRef}
          onClick={(e) => {
            // Close when clicking the outer backdrop
            if (e.target === e.currentTarget) closeLightbox();
          }}
          className="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 backdrop-blur-2xl text-white animate-in fade-in duration-300 font-liber overflow-y-auto"
        >
          {/* Top Bar */}
          <div className="w-full px-6 md:px-12 py-4 flex items-center justify-between border-b border-white/10 bg-black/80 backdrop-blur-md shrink-0">
            <div className="flex items-center gap-3 text-xs font-liber">
              <span className="text-white/40 uppercase tracking-widest text-[10px]">Visual Archive</span>
              <span className="text-white/20">/</span>
              <span className="text-white font-medium">
                {String(currentIndex + 1).padStart(2, '0')} of {String(ARCHIVE_STILLS.length).padStart(2, '0')}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/10">
                <button
                  type="button"
                  onClick={navigatePrev}
                  className="p-1.5 text-white/60 hover:text-white transition-colors rounded-full"
                  aria-label="Previous image"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={navigateNext}
                  className="p-1.5 text-white/60 hover:text-white transition-colors rounded-full"
                  aria-label="Next image"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={closeLightbox}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-black font-liber font-semibold text-xs transition-colors"
                aria-label="Close lightbox"
              >
                <span>close</span>
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Center Stage: Photo Displayed In Full (Never cut in half, uncropped) */}
          <div
            onClick={(e) => {
              if (e.target === e.currentTarget) closeLightbox();
            }}
            className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 min-h-0"
          >
            <div className="relative flex items-center justify-center max-h-[66vh] sm:max-h-[70vh]">
              <picture>
                {selectedStill.imageUrl.match(/\.(jpg|jpeg)$/i) && (
                  <source
                    srcSet={selectedStill.imageUrl.replace(/\.(jpg|jpeg)$/i, '.webp')}
                    type="image/webp"
                  />
                )}
                <img
                  src={selectedStill.imageUrl}
                  alt={selectedStill.title}
                  className="max-h-[64vh] sm:max-h-[68vh] max-w-[90vw] w-auto h-auto object-contain rounded shadow-2xl transition-all"
                />
              </picture>
            </div>

            {/* Clear Description Block Directly Underneath The Image (Never cut off) */}
            <div className="mt-4 max-w-2xl text-center space-y-1.5 px-4 pb-2">
              <h3 className="font-liber font-bold text-lg sm:text-2xl text-white">
                {selectedStill.title}
              </h3>
              <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed max-w-xl mx-auto">
                {selectedStill.description}
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[11px] font-liber text-white/50">
                <div className="flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5 text-white/40" />
                  <span>{selectedStill.camera}</span>
                </div>
                <span>·</span>
                <span>{selectedStill.lens}</span>
                <span>·</span>
                <span>{selectedStill.location}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
