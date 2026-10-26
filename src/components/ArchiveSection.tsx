import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ARCHIVE_STILLS } from '../data/portfolioData';
import { X, Maximize2, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import BlurImage from './BlurImage';

interface ArchiveBookItem {
  id: string;
  title: string;
  location: string;
  camera: string;
  lens?: string;
  imageUrl: string;
  videoUrl?: string;
  type: 'video' | 'photo';
  aspectRatio: 'landscape' | 'portrait' | 'square' | 'wide';
  description: string;
}

const CINEMA_REEL_ITEM: ArchiveBookItem = {
  id: 'film-villages-reel',
  title: 'Hidden African Villages',
  location: 'Northern Province & Nyabarongo',
  camera: 'Arri Alexa Mini LF',
  lens: 'Cooke Anamorphic 40mm',
  videoUrl: '/assets/aistudio/Discover_Hidden_African_Villages_A_Cinematic_Teaser_5481f979.mp4',
  imageUrl: '/assets/aistudio/new_1_2f61cc23.webp',
  type: 'video',
  aspectRatio: 'landscape',
  description: 'Observational cinematic journey across Rwandan hills, morning mist, and river valleys at dawn.',
};

const ALL_ARCHIVE_ITEMS: ArchiveBookItem[] = [
  CINEMA_REEL_ITEM,
  ...ARCHIVE_STILLS.map((still) => ({
    ...still,
    type: 'photo' as const,
  })),
];

export default function ArchiveSection() {
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);
  const [activeAspectFilter, setActiveAspectFilter] = useState<'all' | 'portrait' | 'landscape'>('all');
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev' | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);

  const filteredItems =
    activeAspectFilter === 'all'
      ? ALL_ARCHIVE_ITEMS
      : ALL_ARCHIVE_ITEMS.filter((s) => s.aspectRatio === activeAspectFilter);

  const totalItems = ALL_ARCHIVE_ITEMS.length;

  const openBookLightbox = (item: ArchiveBookItem) => {
    const idx = ALL_ARCHIVE_ITEMS.findIndex((s) => s.id === item.id);
    setSelectedItemIndex(idx >= 0 ? idx : 0);
    setFlipDirection(null);
    setIsFlipping(false);
    document.body.style.overflow = 'hidden';
  };

  const closeBookLightbox = () => {
    setSelectedItemIndex(null);
    setFlipDirection(null);
    setIsFlipping(false);
    document.body.style.overflow = '';
  };

  // Safe index calculation
  const currentIndex = selectedItemIndex ?? 0;
  const currentItem = ALL_ARCHIVE_ITEMS[currentIndex];

  const nextIndex = (currentIndex + 1) % totalItems;
  const prevIndex = (currentIndex - 1 + totalItems) % totalItems;
  const next2Index = (currentIndex + 2) % totalItems;
  const prev2Index = (currentIndex - 2 + totalItems) % totalItems;

  const nextItem = ALL_ARCHIVE_ITEMS[nextIndex];
  const prevItem = ALL_ARCHIVE_ITEMS[prevIndex];
  const next2Item = ALL_ARCHIVE_ITEMS[next2Index];
  const prev2Item = ALL_ARCHIVE_ITEMS[prev2Index];

  const handleNext = () => {
    if (isFlipping || selectedItemIndex === null) return;
    setFlipDirection('next');
    setIsFlipping(true);
  };

  const handlePrev = () => {
    if (isFlipping || selectedItemIndex === null) return;
    setFlipDirection('prev');
    setIsFlipping(true);
  };

  const onFlipComplete = () => {
    if (flipDirection === 'next') {
      setSelectedItemIndex(nextIndex);
    } else if (flipDirection === 'prev') {
      setSelectedItemIndex(prevIndex);
    }
    setFlipDirection(null);
    setIsFlipping(false);
  };

  // Keyboard navigation when book is open
  useEffect(() => {
    if (selectedItemIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeBookLightbox();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedItemIndex, isFlipping, nextIndex, prevIndex]);

  /**
   * Renders half of the continuous image/video for the flip animation
   */
  const renderHalfMedia = (item: ArchiveBookItem, side: 'left' | 'right', isPriority = false) => {
    const isLeft = side === 'left';

    if (item.type === 'video' && item.videoUrl) {
      return (
        <div className="relative w-full h-full overflow-hidden bg-black select-none">
          <div
            className="absolute top-0 h-full w-[200%] max-w-none"
            style={{
              left: isLeft ? '0%' : '-100%',
            }}
          >
            <video
              src={item.videoUrl}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-out"
            />
          </div>

          <div
            className={`absolute inset-y-0 ${
              isLeft ? 'right-0 bg-gradient-to-l' : 'left-0 bg-gradient-to-r'
            } from-black/25 via-black/5 to-transparent w-8 sm:w-16 pointer-events-none z-10`}
          />
        </div>
      );
    }

    return (
      <div className="relative w-full h-full overflow-hidden bg-black select-none">
        <div
          className="absolute top-0 h-full w-[200%] max-w-none"
          style={{
            left: isLeft ? '0%' : '-100%',
          }}
        >
          <BlurImage
            src={item.imageUrl}
            alt={item.title}
            priority={isPriority}
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-out"
          />
        </div>

        <div
          className={`absolute inset-y-0 ${
            isLeft ? 'right-0 bg-gradient-to-l' : 'left-0 bg-gradient-to-r'
          } from-black/25 via-black/5 to-transparent w-8 sm:w-16 pointer-events-none z-10`}
        />
      </div>
    );
  };

  /**
   * Helper to render packed background pages peeking out from underneath
   */
  const renderStackedPeekPage = (item: ArchiveBookItem) => {
    return (
      <div className="w-full h-full overflow-hidden rounded-2xl bg-black border border-white/10 shadow-xl relative group">
        <BlurImage
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-full object-cover opacity-65 grayscale group-hover:grayscale-0 group-hover:opacity-90 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors pointer-events-none" />
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
              All Items
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

        {/* Gallery Masonry Wall: Images & Video Fill Entire Card, No Years */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6 pt-4">
          {filteredItems.map((item, idx) => {
            const isTall = item.aspectRatio === 'portrait';
            const isVideo = item.type === 'video';

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: (idx % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => openBookLightbox(item)}
                data-cursor={isVideo ? 'PLAY FILM' : 'OPEN BOOK'}
                className="break-inside-avoid group cursor-pointer relative overflow-hidden bg-black border border-white/10 hover:border-white/30 transition-all duration-300 rounded"
              >
                <div className={`relative w-full ${isTall ? 'aspect-[3/4]' : 'aspect-[16/10]'}`}>
                  {isVideo && item.videoUrl ? (
                    <div className="relative w-full h-full overflow-hidden bg-black">
                      <video
                        src={item.videoUrl}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-103 transition-all duration-700 ease-out"
                      />
                    </div>
                  ) : (
                    <BlurImage
                      src={item.imageUrl}
                      alt={item.title}
                      priority={idx < 4}
                      className="grayscale group-hover:grayscale-0 group-hover:brightness-105 group-hover:scale-103 transition-all duration-700 ease-out"
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity pointer-events-none" />
                  <div className="absolute inset-0 film-grain pointer-events-none" />

                  {/* Bottom Caption Overlay */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-end justify-between z-10 pointer-events-none">
                    <div className="space-y-0.5 max-w-[85%]">
                      <h4 className="font-liber font-bold text-sm sm:text-base text-white truncate">
                        {item.title}
                      </h4>
                    </div>
                    <div className="p-1.5 rounded-full bg-white/15 text-white group-hover:bg-white group-hover:text-black transition-colors shrink-0">
                      {isVideo ? <Play className="w-3.5 h-3.5 fill-current" /> : <Maximize2 className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* BOOK LIGHTBOX MODAL */}
      {selectedItemIndex !== null && currentItem && (
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

          {/* Book Stage Container with Perspective */}
          <div className="my-auto w-full flex flex-col items-center py-4">
            <div
              className="relative w-full max-w-5xl h-[340px] sm:h-[460px] md:h-[540px] lg:h-[600px] flex items-center justify-center select-none"
              style={{
                perspective: '2200px',
              }}
            >
              {/* Soft Ambient Floor Shadow beneath the book */}
              <div className="absolute -bottom-8 w-[88%] h-20 bg-black/95 blur-2xl rounded-full pointer-events-none transform scale-y-50" />

              {/* 1. LEFT STACK OF PAGES (Packed underneath on the left) */}
              <div
                onClick={handlePrev}
                title="Previous page"
                className="absolute left-[-22px] sm:left-[-38px] md:left-[-52px] w-[82%] h-[92%] top-[4%] cursor-pointer z-10 transition-transform duration-500 hover:-translate-x-2"
                style={{
                  transform: 'translateZ(-90px) rotateY(18deg) scale(0.93)',
                  transformOrigin: 'left center',
                }}
              >
                {renderStackedPeekPage(prev2Item)}
              </div>

              <div
                onClick={handlePrev}
                title="Previous page"
                className="absolute left-[-12px] sm:left-[-20px] md:left-[-28px] w-[90%] h-[96%] top-[2%] cursor-pointer z-20 transition-transform duration-500 hover:-translate-x-1"
                style={{
                  transform: 'translateZ(-45px) rotateY(10deg) scale(0.97)',
                  transformOrigin: 'left center',
                }}
              >
                {renderStackedPeekPage(prevItem)}
              </div>

              {/* 2. RIGHT STACK OF PAGES (Packed underneath on the right) */}
              <div
                onClick={handleNext}
                title="Next page"
                className="absolute right-[-22px] sm:right-[-38px] md:right-[-52px] w-[82%] h-[92%] top-[4%] cursor-pointer z-10 transition-transform duration-500 hover:translate-x-2"
                style={{
                  transform: 'translateZ(-90px) rotateY(-18deg) scale(0.93)',
                  transformOrigin: 'right center',
                }}
              >
                {renderStackedPeekPage(next2Item)}
              </div>

              <div
                onClick={handleNext}
                title="Next page"
                className="absolute right-[-12px] sm:right-[-20px] md:right-[-28px] w-[90%] h-[96%] top-[2%] cursor-pointer z-20 transition-transform duration-500 hover:translate-x-1"
                style={{
                  transform: 'translateZ(-45px) rotateY(-10deg) scale(0.97)',
                  transformOrigin: 'right center',
                }}
              >
                {renderStackedPeekPage(nextItem)}
              </div>

              {/* 3. THE BOOK SPREAD (Single image or video across two pages, NO middle line) */}
              <div
                className="relative w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden bg-[#0a0a0c] border border-white/15 shadow-[0_30px_90px_rgba(0,0,0,0.95)] flex z-30"
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* WHEN STATIC & ITEM IS VIDEO: ONE SINGLE UNBROKEN FULL VIDEO WITH NO MIDDLE LINE */}
                {!isFlipping && currentItem.type === 'video' && currentItem.videoUrl ? (
                  <div className="absolute inset-0 w-full h-full overflow-hidden select-none z-10">
                    <video
                      src={currentItem.videoUrl}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-out"
                    />
                    {/* Left and Right click targets to turn pages */}
                    <div
                      onClick={handlePrev}
                      data-cursor="PREV"
                      className="absolute inset-y-0 left-0 w-1/2 cursor-pointer z-20"
                    />
                    <div
                      onClick={handleNext}
                      data-cursor="NEXT"
                      className="absolute inset-y-0 right-0 w-1/2 cursor-pointer z-20"
                    />
                  </div>
                ) : (
                  /* STATIC BASE LAYER (When flipping or viewing photos) */
                  <>
                    {/* Left Half (Underneath / Static) */}
                    <div
                      onClick={handlePrev}
                      data-cursor="PREV"
                      className="w-1/2 h-full relative overflow-hidden cursor-pointer"
                    >
                      {flipDirection === 'prev'
                        ? renderHalfMedia(prevItem, 'left')
                        : renderHalfMedia(currentItem, 'left', true)}
                    </div>

                    {/* Right Half (Underneath / Static: Unfolds as top page turns left) */}
                    <div
                      onClick={handleNext}
                      data-cursor="NEXT"
                      className="w-1/2 h-full relative overflow-hidden cursor-pointer"
                    >
                      {flipDirection === 'next'
                        ? renderHalfMedia(nextItem, 'right')
                        : renderHalfMedia(currentItem, 'right', true)}
                    </div>
                  </>
                )}

                {/* FAST 3D TURNING PAGE (0.22s) */}
                {/* FORWARD FLIP: Right page rotates 180° to the left */}
                {flipDirection === 'next' && (
                  <motion.div
                    initial={{ rotateY: 0 }}
                    animate={{ rotateY: -180 }}
                    transition={{
                      duration: 0.22,
                      ease: [0.16, 1, 0.3, 1],
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
                      {renderHalfMedia(currentItem, 'right')}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.7 }}
                        transition={{ duration: 0.11 }}
                        className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent pointer-events-none"
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
                      {renderHalfMedia(nextItem, 'left')}
                      <motion.div
                        initial={{ opacity: 0.7 }}
                        animate={{ opacity: 0 }}
                        transition={{ duration: 0.11, delay: 0.11 }}
                        className="absolute inset-0 bg-gradient-to-l from-black/85 via-black/30 to-transparent pointer-events-none"
                      />
                    </div>
                  </motion.div>
                )}

                {/* BACKWARD FLIP: Left page rotates 180° to the right */}
                {flipDirection === 'prev' && (
                  <motion.div
                    initial={{ rotateY: 0 }}
                    animate={{ rotateY: 180 }}
                    transition={{
                      duration: 0.22,
                      ease: [0.16, 1, 0.3, 1],
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
                      {renderHalfMedia(currentItem, 'left')}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.7 }}
                        transition={{ duration: 0.11 }}
                        className="absolute inset-0 bg-gradient-to-l from-black/85 via-black/40 to-transparent pointer-events-none"
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
                      {renderHalfMedia(prevItem, 'right')}
                      <motion.div
                        initial={{ opacity: 0.7 }}
                        animate={{ opacity: 0 }}
                        transition={{ duration: 0.11, delay: 0.11 }}
                        className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/30 to-transparent pointer-events-none"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Description in small words on the left bottom corner with NO background box, highly legible with drop-shadow */}
                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-50 max-w-[260px] sm:max-w-xs pointer-events-none text-left space-y-1">
                  <h4 className="font-liber font-bold text-xs sm:text-sm text-white leading-snug drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                    {currentItem.title}
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-white/85 font-light leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                    {currentItem.description}
                  </p>
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
