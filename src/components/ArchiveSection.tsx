import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ARCHIVE_STILLS } from '../data/portfolioData';
import { ArchiveStill } from '../types';
import { X, Maximize2, ChevronLeft, ChevronRight } from 'lucide-react';
import BlurImage from './BlurImage';

export default function ArchiveSection() {
  const [selectedStillIndex, setSelectedStillIndex] = useState<number | null>(null);
  const [activeAspectFilter, setActiveAspectFilter] = useState<'all' | 'portrait' | 'landscape'>('all');
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev' | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);

  const filteredStills =
    activeAspectFilter === 'all'
      ? ARCHIVE_STILLS
      : ARCHIVE_STILLS.filter((s) => s.aspectRatio === activeAspectFilter);

  const totalItems = ARCHIVE_STILLS.length;

  const openBookLightbox = (still: ArchiveStill) => {
    const idx = ARCHIVE_STILLS.findIndex((s) => s.id === still.id);
    setSelectedStillIndex(idx >= 0 ? idx : 0);
    setFlipDirection(null);
    setIsFlipping(false);
    document.body.style.overflow = 'hidden';
  };

  const closeBookLightbox = () => {
    setSelectedStillIndex(null);
    setFlipDirection(null);
    setIsFlipping(false);
    document.body.style.overflow = '';
  };

  // Safe index calculation
  const currentIndex = selectedStillIndex ?? 0;
  const currentStill = ARCHIVE_STILLS[currentIndex];

  const nextIndex = (currentIndex + 1) % totalItems;
  const prevIndex = (currentIndex - 1 + totalItems) % totalItems;
  const next2Index = (currentIndex + 2) % totalItems;
  const prev2Index = (currentIndex - 2 + totalItems) % totalItems;

  const nextStill = ARCHIVE_STILLS[nextIndex];
  const prevStill = ARCHIVE_STILLS[prevIndex];
  const next2Still = ARCHIVE_STILLS[next2Index];
  const prev2Still = ARCHIVE_STILLS[prev2Index];

  const handleNext = () => {
    if (isFlipping || selectedStillIndex === null) return;
    setFlipDirection('next');
    setIsFlipping(true);
  };

  const handlePrev = () => {
    if (isFlipping || selectedStillIndex === null) return;
    setFlipDirection('prev');
    setIsFlipping(true);
  };

  const onFlipComplete = () => {
    if (flipDirection === 'next') {
      setSelectedStillIndex(nextIndex);
    } else if (flipDirection === 'prev') {
      setSelectedStillIndex(prevIndex);
    }
    setFlipDirection(null);
    setIsFlipping(false);
  };

  // Keyboard navigation when book is open
  useEffect(() => {
    if (selectedStillIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeBookLightbox();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedStillIndex, isFlipping, nextIndex, prevIndex]);

  /**
   * Renders half of the continuous image so that left & right halves
   * together seamlessly form ONE single continuous image across both pages with NO middle line,
   * enhanced with natural concave 3D book gutter shading.
   */
  const renderHalfImage = (still: ArchiveStill, side: 'left' | 'right', isPriority = false) => {
    const isLeft = side === 'left';

    return (
      <div className="relative w-full h-full overflow-hidden bg-black select-none">
        <div
          className="absolute top-0 h-full w-[200%] max-w-none"
          style={{
            left: isLeft ? '0%' : '-100%',
          }}
        >
          <BlurImage
            src={still.imageUrl}
            alt={still.title}
            priority={isPriority}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Natural concave 3D book curve shading into center spine (NO harsh line) */}
        <div
          className={`absolute inset-y-0 ${
            isLeft ? 'right-0 bg-gradient-to-l' : 'left-0 bg-gradient-to-r'
          } from-black/35 via-black/10 to-transparent w-10 sm:w-20 pointer-events-none z-10`}
        />

        {/* Subtle top/bottom page edge shadow */}
        <div className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-black/25 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-black/25 to-transparent pointer-events-none z-10" />
      </div>
    );
  };

  /**
   * Helper to render packed background pages peeking out from underneath
   */
  const renderStackedPeekPage = (still: ArchiveStill) => {
    return (
      <div className="w-full h-full overflow-hidden rounded-2xl bg-black border border-white/10 shadow-2xl relative">
        <BlurImage
          src={still.imageUrl}
          alt={still.title}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-black/40" />
        {/* Layered paper edge highlight */}
        <div className="absolute inset-y-0 right-0 w-1 bg-white/20" />
      </div>
    );
  };

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

          {/* Aspect Ratio Filter */}
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
                onClick={() => openBookLightbox(still)}
                data-cursor="OPEN BOOK"
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

      {/* 3D BOOK FLIPPING LIGHTBOX MODAL */}
      {selectedStillIndex !== null && currentStill && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) closeBookLightbox();
          }}
          className="fixed inset-0 z-50 flex flex-col justify-between items-center bg-black/95 backdrop-blur-2xl text-white animate-in fade-in duration-300 font-liber p-4 sm:p-8 overflow-y-auto"
        >
          {/* Top Bar with Navigation and Close */}
          <div className="w-full max-w-5xl flex items-center justify-between pb-3 sm:pb-5 border-b border-white/10 z-50">
            <div className="flex items-center gap-2 text-xs font-liber text-white/50">
              <span className="uppercase tracking-widest text-[10px]">Visual Archive Book</span>
            </div>

            <button
              type="button"
              onClick={closeBookLightbox}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-black font-liber font-semibold text-xs transition-colors"
              aria-label="Close book view"
            >
              <span>close</span>
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 3D Book Stage Container with Perspective */}
          <div className="my-auto w-full flex flex-col items-center py-4">
            <div
              className="relative w-full max-w-5xl h-[340px] sm:h-[460px] md:h-[540px] lg:h-[600px] flex items-center justify-center select-none"
              style={{
                perspective: '2500px',
              }}
            >
              {/* Soft Ambient Floor Shadow beneath the physical book */}
              <div className="absolute -bottom-10 w-[92%] h-24 bg-black/95 blur-2xl rounded-full pointer-events-none transform scale-y-50" />

              {/* 1. LEFT STACK OF PAGES (Packed underneath on the left in 3D) */}
              <div
                onClick={handlePrev}
                title="Previous page"
                className="absolute left-[-24px] sm:left-[-40px] md:left-[-56px] w-[82%] h-[92%] top-[4%] cursor-pointer z-10 transition-transform duration-500 hover:-translate-x-2"
                style={{
                  transform: 'translateZ(-100px) rotateY(16deg) scale(0.93)',
                  transformOrigin: 'left center',
                }}
              >
                {renderStackedPeekPage(prev2Still)}
              </div>

              <div
                onClick={handlePrev}
                title="Previous page"
                className="absolute left-[-12px] sm:left-[-20px] md:left-[-28px] w-[90%] h-[96%] top-[2%] cursor-pointer z-20 transition-transform duration-500 hover:-translate-x-1"
                style={{
                  transform: 'translateZ(-50px) rotateY(9deg) scale(0.97)',
                  transformOrigin: 'left center',
                }}
              >
                {renderStackedPeekPage(prevStill)}
              </div>

              {/* 2. RIGHT STACK OF PAGES (Packed underneath on the right in 3D) */}
              <div
                onClick={handleNext}
                title="Next page"
                className="absolute right-[-24px] sm:right-[-40px] md:right-[-56px] w-[82%] h-[92%] top-[4%] cursor-pointer z-10 transition-transform duration-500 hover:translate-x-2"
                style={{
                  transform: 'translateZ(-100px) rotateY(-16deg) scale(0.93)',
                  transformOrigin: 'right center',
                }}
              >
                {renderStackedPeekPage(next2Still)}
              </div>

              <div
                onClick={handleNext}
                title="Next page"
                className="absolute right-[-12px] sm:right-[-20px] md:right-[-28px] w-[90%] h-[96%] top-[2%] cursor-pointer z-20 transition-transform duration-500 hover:translate-x-1"
                style={{
                  transform: 'translateZ(-50px) rotateY(-9deg) scale(0.97)',
                  transformOrigin: 'right center',
                }}
              >
                {renderStackedPeekPage(nextStill)}
              </div>

              {/* 3. PHYSICAL 3D BOOK BODY (With realistic book casing & page block thickness) */}
              <div
                className="relative w-full h-full rounded-2xl sm:rounded-3xl p-1 sm:p-1.5 bg-gradient-to-b from-[#1c1c20] via-[#111114] to-[#09090b] border border-white/20 shadow-[0_30px_100px_rgba(0,0,0,0.95),0_10px_30px_rgba(0,0,0,0.85)] flex z-30"
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Authentic bottom page edge block (rim showing paper thickness) */}
                <div className="absolute -bottom-2.5 inset-x-4 h-2.5 bg-gradient-to-b from-[#1f1f25] to-[#0e0e11] rounded-b border-b border-white/10 shadow-lg pointer-events-none" />

                {/* The Two-Page Open Spread */}
                <div
                  className="relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden bg-[#0a0a0c] flex"
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* STATIC BASE LAYER */}
                  {/* Left Half (Underneath / Static) */}
                  <div
                    onClick={handlePrev}
                    data-cursor="PREV"
                    className="w-1/2 h-full relative overflow-hidden cursor-pointer"
                  >
                    {flipDirection === 'prev'
                      ? renderHalfImage(prevStill, 'left')
                      : renderHalfImage(currentStill, 'left', true)}
                  </div>

                  {/* Right Half (Underneath / Static: Unfolds as top page turns left) */}
                  <div
                    onClick={handleNext}
                    data-cursor="NEXT"
                    className="w-1/2 h-full relative overflow-hidden cursor-pointer"
                  >
                    {flipDirection === 'next'
                      ? renderHalfImage(nextStill, 'right')
                      : renderHalfImage(currentStill, 'right', true)}
                  </div>

                  {/* DYNAMIC 3D TURNING PAGE WITH AUTHENTIC CURL & BEND */}
                  {/* FORWARD FLIP: Right page curls, lifts, and bends across the center spine to the left */}
                  {flipDirection === 'next' && (
                    <motion.div
                      initial={{ rotateY: 0, skewY: 0, rotateZ: 0 }}
                      animate={{
                        rotateY: [0, -75, -135, -180],
                        skewY: [0, -4.5, 3.5, 0],
                        rotateZ: [0, 1.8, -1.2, 0],
                      }}
                      transition={{
                        duration: 0.46,
                        times: [0, 0.4, 0.75, 1],
                        ease: [0.25, 1, 0.5, 1],
                      }}
                      onAnimationComplete={onFlipComplete}
                      className="absolute top-0 right-0 w-1/2 h-full z-40"
                      style={{
                        transformOrigin: 'left center',
                        transformStyle: 'preserve-3d',
                      }}
                    >
                      {/* Front Face: Current image right half, curving across to left */}
                      <div
                        className="absolute inset-0 w-full h-full overflow-hidden backface-hidden"
                        style={{
                          backfaceVisibility: 'hidden',
                          WebkitBackfaceVisibility: 'hidden',
                        }}
                      >
                        {renderHalfImage(currentStill, 'right')}
                        {/* Dynamic traveling bend highlight & shadow */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: [0, 0.85, 0.2] }}
                          transition={{ duration: 0.23, times: [0, 0.5, 1] }}
                          className="absolute inset-0 bg-gradient-to-r from-black/90 via-white/10 to-transparent pointer-events-none"
                        />
                      </div>

                      {/* Back Face: Incoming next image left half, unfolding onto left page */}
                      <div
                        className="absolute inset-0 w-full h-full overflow-hidden backface-hidden"
                        style={{
                          transform: 'rotateY(180deg)',
                          backfaceVisibility: 'hidden',
                          WebkitBackfaceVisibility: 'hidden',
                        }}
                      >
                        {renderHalfImage(nextStill, 'left')}
                        {/* Shadow softens as page flattens on the left stack */}
                        <motion.div
                          initial={{ opacity: 0.85 }}
                          animate={{ opacity: 0 }}
                          transition={{ duration: 0.23, delay: 0.23 }}
                          className="absolute inset-0 bg-gradient-to-l from-black/90 via-black/30 to-transparent pointer-events-none"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* BACKWARD FLIP: Left page curls, lifts, and bends across the center spine to the right */}
                  {flipDirection === 'prev' && (
                    <motion.div
                      initial={{ rotateY: 0, skewY: 0, rotateZ: 0 }}
                      animate={{
                        rotateY: [0, 75, 135, 180],
                        skewY: [0, 4.5, -3.5, 0],
                        rotateZ: [0, -1.8, 1.2, 0],
                      }}
                      transition={{
                        duration: 0.46,
                        times: [0, 0.4, 0.75, 1],
                        ease: [0.25, 1, 0.5, 1],
                      }}
                      onAnimationComplete={onFlipComplete}
                      className="absolute top-0 left-0 w-1/2 h-full z-40"
                      style={{
                        transformOrigin: 'right center',
                        transformStyle: 'preserve-3d',
                      }}
                    >
                      {/* Front Face: Current image left half, curving across to right */}
                      <div
                        className="absolute inset-0 w-full h-full overflow-hidden backface-hidden"
                        style={{
                          backfaceVisibility: 'hidden',
                          WebkitBackfaceVisibility: 'hidden',
                        }}
                      >
                        {renderHalfImage(currentStill, 'left')}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: [0, 0.85, 0.2] }}
                          transition={{ duration: 0.23, times: [0, 0.5, 1] }}
                          className="absolute inset-0 bg-gradient-to-l from-black/90 via-white/10 to-transparent pointer-events-none"
                        />
                      </div>

                      {/* Back Face: Incoming prev image right half, unfolding onto right page */}
                      <div
                        className="absolute inset-0 w-full h-full overflow-hidden backface-hidden"
                        style={{
                          transform: 'rotateY(180deg)',
                          backfaceVisibility: 'hidden',
                          WebkitBackfaceVisibility: 'hidden',
                        }}
                      >
                        {renderHalfImage(prevStill, 'right')}
                        <motion.div
                          initial={{ opacity: 0.85 }}
                          animate={{ opacity: 0 }}
                          transition={{ duration: 0.23, delay: 0.23 }}
                          className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/30 to-transparent pointer-events-none"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Description in small words on the left bottom corner with NO background box, highly legible with drop-shadow */}
                  <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-50 max-w-[260px] sm:max-w-xs pointer-events-none text-left space-y-1">
                    <h4 className="font-liber font-bold text-xs sm:text-sm text-white leading-snug drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                      {currentStill.title}
                    </h4>
                    <p className="text-[10px] sm:text-[11px] text-white/85 font-light leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                      {currentStill.description}
                    </p>
                    <div className="pt-0.5 flex flex-wrap items-center gap-1.5 text-[9px] sm:text-[10px] text-white/60 font-mono tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                      <span>{currentStill.camera}</span>
                      <span>·</span>
                      <span>{currentStill.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Minimalist Page Turning Controls */}
            <div className="mt-8 z-30 flex items-center justify-center">
              <div className="flex items-center gap-4 px-5 py-2 rounded-full bg-[#111113]/90 backdrop-blur-xl border border-white/15 shadow-2xl text-white">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={isFlipping}
                  className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors disabled:opacity-40"
                  aria-label="Turn page backward"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="w-[1px] h-4 bg-white/15" />

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={isFlipping}
                  className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors disabled:opacity-40"
                  aria-label="Turn page forward"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
