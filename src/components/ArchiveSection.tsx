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

        {/* Gallery Masonry Wall with Skeleton Blur Load */}
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
                className="break-inside-avoid group cursor-pointer relative overflow-hidden bg-black border border-white/10 hover:border-white/30 transition-all duration-300"
              >
                <div className={`relative w-full ${isTall ? 'aspect-[3/4]' : 'aspect-[16/10]'}`}>
                  <BlurImage
                    src={still.imageUrl}
                    alt={still.title}
                    priority={idx < 4}
                    className="group-hover:brightness-105 group-hover:scale-103 transition-all duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity pointer-events-none" />
                  <div className="absolute inset-0 film-grain pointer-events-none" />

                  {/* Corner Year Pill */}
                  <div className="absolute top-2.5 right-2.5 text-[10px] font-liber text-white/60 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded">
                    {still.year}
                  </div>

                  {/* Bottom Hover Caption */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between z-10">
                    <div className="space-y-0.5 max-w-[85%]">
                      <span className="text-[10px] font-liber text-white/50 block">
                        {still.camera}
                      </span>
                      <h4 className="font-liber font-semibold text-sm text-white truncate">
                        {still.title}
                      </h4>
                    </div>
                    <div className="p-1.5 rounded-full bg-white/10 text-white group-hover:bg-white group-hover:text-black transition-colors">
                      <Maximize2 className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Full-Screen Pure Minimal Lightbox Modal with Skeleton Blur Load */}
      {selectedStill && (
        <div
          ref={modalScrollRef}
          className="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 backdrop-blur-2xl text-white animate-in fade-in duration-300 font-liber"
        >
          {/* Top Bar */}
          <div className="w-full px-6 md:px-12 py-5 flex items-center justify-between border-b border-white/10 bg-black/60 backdrop-blur-md">
            <div className="flex items-center gap-4 text-xs font-liber">
              <span className="text-white/40 uppercase">Visual Archive</span>
              <span className="text-white/20">/</span>
              <span className="text-white font-medium">
                {selectedStill.title}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-white/5 rounded p-1 border border-white/10">
                <button
                  type="button"
                  onClick={navigatePrev}
                  className="p-1 text-white/60 hover:text-white transition-colors"
                  aria-label="Previous image"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={navigateNext}
                  className="p-1 text-white/60 hover:text-white transition-colors"
                  aria-label="Next image"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={closeLightbox}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-black transition-colors"
                aria-label="Close lightbox"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Center Stage: Photo in Full Magnificence with Blur Load */}
          <div className="flex-1 flex items-center justify-center p-4 sm:p-8 max-h-[75vh]">
            <BlurImage
              src={selectedStill.imageUrl}
              alt={selectedStill.title}
              priority={true}
              wrapperClassName="max-h-full max-w-full rounded shadow-2xl bg-transparent"
              className="max-h-full max-w-full object-contain"
            />
          </div>

          {/* Bottom Bar: Quiet Exif Details */}
          <div className="w-full px-6 md:px-12 py-5 border-t border-white/10 bg-black/60 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
            <div>
              <h3 className="font-liber font-semibold text-base text-white">
                {selectedStill.title}
              </h3>
              <p className="text-white/50 font-light mt-0.5">
                {selectedStill.description}
              </p>
            </div>

            <div className="flex items-center gap-6 text-[11px] font-liber text-white/60 shrink-0">
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
      )}
    </section>
  );
}
