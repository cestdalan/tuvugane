import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  title: 'Hidden African Villages: Cinema Reel',
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

// Fan geometry parameters matching reference video
// 8 leaves on left and 8 leaves on right
const FAN_ANGLES = [28, 36, 43, 49, 54, 59, 64, 68];
const FAN_OFFSETS_DESKTOP = [36, 70, 100, 126, 148, 167, 183, 196]; // px from center edge
const FAN_OFFSETS_MOBILE = [18, 34, 48, 60]; // px for mobile

export default function ArchiveSection() {
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);
  const [activeAspectFilter, setActiveAspectFilter] = useState<'all' | 'portrait' | 'landscape'>('all');
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev' | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const pendingTurnRef = useRef<'next' | 'prev' | null>(null);

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
    pendingTurnRef.current = null;
    document.body.style.overflow = 'hidden';
  };

  const closeBookLightbox = () => {
    setSelectedItemIndex(null);
    setFlipDirection(null);
    setIsFlipping(false);
    pendingTurnRef.current = null;
    document.body.style.overflow = '';
  };

  // Safe index calculation
  const currentIndex = selectedItemIndex ?? 0;
  const currentItem = ALL_ARCHIVE_ITEMS[currentIndex];

  const nextIndex = (currentIndex + 1) % totalItems;
  const prevIndex = (currentIndex - 1 + totalItems) % totalItems;

  const nextItem = ALL_ARCHIVE_ITEMS[nextIndex];
  const prevItem = ALL_ARCHIVE_ITEMS[prevIndex];

  const handleNext = useCallback(() => {
    if (selectedItemIndex === null) return;
    if (isFlipping) {
      pendingTurnRef.current = 'next';
      return;
    }
    setFlipDirection('next');
    setIsFlipping(true);
  }, [isFlipping, selectedItemIndex]);

  const handlePrev = useCallback(() => {
    if (selectedItemIndex === null) return;
    if (isFlipping) {
      pendingTurnRef.current = 'prev';
      return;
    }
    setFlipDirection('prev');
    setIsFlipping(true);
  }, [isFlipping, selectedItemIndex]);

  const onFlipComplete = () => {
    let newIndex = currentIndex;
    if (flipDirection === 'next') {
      newIndex = nextIndex;
      setSelectedItemIndex(nextIndex);
    } else if (flipDirection === 'prev') {
      newIndex = prevIndex;
      setSelectedItemIndex(prevIndex);
    }
    setFlipDirection(null);
    setIsFlipping(false);

    // If rapid turn was queued, trigger it smoothly
    if (pendingTurnRef.current) {
      const nextTurn = pendingTurnRef.current;
      pendingTurnRef.current = null;
      setTimeout(() => {
        if (nextTurn === 'next') handleNext();
        else if (nextTurn === 'prev') handlePrev();
      }, 30);
    }
  };

  // Turn to specific page clicked from fan
  const turnToPage = (targetIndex: number) => {
    if (isFlipping || targetIndex === currentIndex) return;
    if (targetIndex > currentIndex || (currentIndex === totalItems - 1 && targetIndex === 0)) {
      handleNext();
    } else {
      handlePrev();
    }
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
  }, [selectedItemIndex, handleNext, handlePrev]);

  // Touch Swipe gesture support
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - touchStartX;
    if (diff < -40) handleNext();
    else if (diff > 40) handlePrev();
    setTouchStartX(null);
  };

  /**
   * Renders half of the continuous image/video so that left & right halves
   * together seamlessly form ONE single continuous image across both pages with NO middle line.
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
              className="w-full h-full object-cover"
            />
          </div>

          {/* Subtle natural spine gradient */}
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
            className="w-full h-full object-cover"
          />
        </div>

        {/* Subtle natural spine gradient */}
        <div
          className={`absolute inset-y-0 ${
            isLeft ? 'right-0 bg-gradient-to-l' : 'left-0 bg-gradient-to-r'
          } from-black/25 via-black/5 to-transparent w-8 sm:w-16 pointer-events-none z-10`}
        />
      </div>
    );
  };

  /**
   * Renders a single fanned book leaf for the left or right 3D fan
   */
  const renderFannedLeaf = (item: ArchiveBookItem, side: 'left' | 'right', step: number) => {
    const isLeft = side === 'left';
    const angleIndex = Math.min(step, FAN_ANGLES.length - 1);
    const angle = FAN_ANGLES[angleIndex];
    const rotateY = isLeft ? angle : -angle;
    const brightness = Math.max(0.6, 1 - step * 0.05);
    const zIndex = 20 - step;

    return (
      <div
        key={`${side}-leaf-${step}-${item.id}`}
        onClick={() => turnToPage(ALL_ARCHIVE_ITEMS.findIndex((it) => it.id === item.id))}
        className="absolute top-0 w-1/2 h-full cursor-pointer select-none transition-transform duration-500 ease-out hover:brightness-110"
        style={{
          [isLeft ? 'left' : 'right']: 0,
          transformOrigin: isLeft ? 'right center' : 'left center',
          transform: `translateX(${isLeft ? -FAN_OFFSETS_DESKTOP[angleIndex] : FAN_OFFSETS_DESKTOP[angleIndex]}px) translateZ(${-step * 25}px) rotateY(${rotateY}deg) scale(${1 - step * 0.015})`,
          zIndex,
          filter: `brightness(${brightness})`,
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
      >
        <div
          className={`w-full h-full overflow-hidden rounded-[12px] bg-black shadow-2xl relative ${
            isLeft ? 'border-l border-[#f5efe4]/30' : 'border-r border-[#f5efe4]/30'
          }`}
        >
          <BlurImage
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 pointer-events-none" />
          {/* Paper edge glow */}
          <div
            className={`absolute inset-y-0 ${
              isLeft ? 'left-0' : 'right-0'
            } w-[2px] bg-gradient-to-b from-white/40 via-white/10 to-transparent pointer-events-none`}
          />
        </div>
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

        {/* Gallery Masonry Wall */}
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
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[9px] font-liber text-white uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                        <span>Cinema Reel</span>
                      </div>
                    </div>
                  ) : (
                    <BlurImage
                      src={item.imageUrl}
                      alt={item.title}
                      priority={idx < 4}
                      className="group-hover:brightness-105 group-hover:scale-103 transition-all duration-500 ease-out"
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity pointer-events-none" />
                  <div className="absolute inset-0 film-grain pointer-events-none" />

                  {/* Bottom Caption Overlay */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-end justify-between z-10 pointer-events-none">
                    <div className="space-y-0.5 max-w-[85%]">
                      <span className="text-[10px] font-liber font-medium text-white/60 block">
                        {item.camera}
                      </span>
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

      {/* 3D FANNED BOOK MODAL (MATCHING REFERENCE VIDEO) */}
      {selectedItemIndex !== null && currentItem && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) closeBookLightbox();
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="fixed inset-0 z-50 flex flex-col justify-between items-center bg-black/95 backdrop-blur-2xl text-white animate-in fade-in duration-300 font-liber p-4 sm:p-8 overflow-hidden select-none"
        >
          {/* Top Bar with Close Button */}
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

          {/* 1. STAGE: 3D Perspective ~1400px with center origin */}
          <div className="my-auto w-full flex flex-col items-center py-4 relative">
            <div
              className="relative w-full max-w-5xl h-[340px] sm:h-[460px] md:h-[540px] lg:h-[600px] flex items-center justify-center"
              style={{
                perspective: '1400px',
                perspectiveOrigin: 'center center',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Soft elliptical blurred shadow on the floor under the book (~35% opacity, blur ~30px) */}
              <div
                className="absolute -bottom-10 w-[110%] max-w-5xl h-24 rounded-[100%] bg-black/35 blur-[30px] pointer-events-none transform scale-y-50"
              />

              {/* 3. SIDE FANS: ~8 leaves on left and ~8 leaves on right */}
              {/* LEFT SIDE FAN (Already turned leaves) */}
              <div
                className="absolute inset-0 pointer-events-auto"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {Array.from({ length: 8 }).map((_, step) => {
                  const targetIdx = (currentIndex - (step + 1) + totalItems) % totalItems;
                  const item = ALL_ARCHIVE_ITEMS[targetIdx];
                  return renderFannedLeaf(item, 'left', step);
                })}
              </div>

              {/* RIGHT SIDE FAN (Not yet turned leaves) */}
              <div
                className="absolute inset-0 pointer-events-auto"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {Array.from({ length: 8 }).map((_, step) => {
                  const targetIdx = (currentIndex + (step + 1)) % totalItems;
                  const item = ALL_ARCHIVE_ITEMS[targetIdx];
                  return renderFannedLeaf(item, 'right', step);
                })}
              </div>

              {/* 2. CENTER SPREAD: Two pages side by side facing the viewer */}
              <div
                className="relative w-full h-full rounded-[12px] overflow-hidden bg-[#0d0d10] border border-white/15 shadow-[0_30px_90px_rgba(0,0,0,0.95)] flex z-30"
                style={{
                  transformStyle: 'preserve-3d',
                  willChange: 'transform',
                }}
              >
                {/* Thin cream page-edge visible on outer sides */}
                <div className="absolute inset-y-0 left-0 w-[2px] bg-[#f4efe6]/25 z-20 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-[2px] bg-[#f4efe6]/25 z-20 pointer-events-none" />

                {/* Subtly bowed spine: faint vertical gradient shadow at center fold */}
                <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-8 sm:w-16 bg-gradient-to-r from-black/20 via-black/45 to-black/20 z-20 pointer-events-none" />

                {/* WHEN STATIC & ITEM IS VIDEO: ONE UNBROKEN SINGLE VIDEO ACROSS BOTH PAGES */}
                {!isFlipping && currentItem.type === 'video' && currentItem.videoUrl ? (
                  <div className="absolute inset-0 w-full h-full overflow-hidden select-none z-10">
                    <video
                      src={currentItem.videoUrl}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover"
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
                  /* STATIC BASE LAYER (Left page & Right page) */
                  <>
                    {/* Left Page: slightly curved toward spine */}
                    <div
                      onClick={handlePrev}
                      data-cursor="PREV"
                      className="w-1/2 h-full relative overflow-hidden cursor-pointer"
                      style={{
                        transform: 'rotateY(2deg)',
                        transformOrigin: 'right center',
                      }}
                    >
                      {flipDirection === 'prev'
                        ? renderHalfMedia(prevItem, 'left')
                        : renderHalfMedia(currentItem, 'left', true)}
                    </div>

                    {/* Right Page: slightly curved toward spine */}
                    <div
                      onClick={handleNext}
                      data-cursor="NEXT"
                      className="w-1/2 h-full relative overflow-hidden cursor-pointer"
                      style={{
                        transform: 'rotateY(-2deg)',
                        transformOrigin: 'left center',
                      }}
                    >
                      {flipDirection === 'next'
                        ? renderHalfMedia(nextItem, 'right')
                        : renderHalfMedia(currentItem, 'right', true)}
                    </div>
                  </>
                )}

                {/* 4. PAGE-TURN ANIMATION: 600ms, cubic-bezier(0.45, 0.05, 0.25, 1) */}
                {/* FORWARD TURN: Right page lifts from spine and rotates around spine (Y axis, origin at spine) to -180 deg */}
                {flipDirection === 'next' && (
                  <motion.div
                    initial={{ rotateY: 0, skewY: 0, rotateZ: 0 }}
                    animate={{
                      rotateY: [0, -70, -135, -180],
                      skewY: [0, -3.5, 2.5, 0],
                      rotateZ: [0, 1.2, -0.8, 0],
                    }}
                    transition={{
                      duration: 0.6,
                      times: [0, 0.38, 0.72, 1],
                      ease: [0.45, 0.05, 0.25, 1],
                    }}
                    onAnimationComplete={onFlipComplete}
                    className="absolute top-0 right-0 w-1/2 h-full z-40"
                    style={{
                      transformOrigin: 'left center',
                      transformStyle: 'preserve-3d',
                      willChange: 'transform',
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
                      {/* Moving gradient shadow on turning leaf, darkest at midpoint */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.8, 0.15] }}
                        transition={{ duration: 0.3, times: [0, 0.5, 1] }}
                        className="absolute inset-0 bg-gradient-to-r from-black/90 via-white/10 to-transparent pointer-events-none"
                      />
                    </div>

                    {/* Back Face: Incoming next left page */}
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
                        initial={{ opacity: 0.8 }}
                        animate={{ opacity: 0 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                        className="absolute inset-0 bg-gradient-to-l from-black/90 via-black/30 to-transparent pointer-events-none"
                      />
                    </div>
                  </motion.div>
                )}

                {/* BACKWARD TURN: Left page lifts from spine and rotates around spine (Y axis, origin at spine) to +180 deg */}
                {flipDirection === 'prev' && (
                  <motion.div
                    initial={{ rotateY: 0, skewY: 0, rotateZ: 0 }}
                    animate={{
                      rotateY: [0, 70, 135, 180],
                      skewY: [0, 3.5, -2.5, 0],
                      rotateZ: [0, -1.2, 0.8, 0],
                    }}
                    transition={{
                      duration: 0.6,
                      times: [0, 0.38, 0.72, 1],
                      ease: [0.45, 0.05, 0.25, 1],
                    }}
                    onAnimationComplete={onFlipComplete}
                    className="absolute top-0 left-0 w-1/2 h-full z-40"
                    style={{
                      transformOrigin: 'right center',
                      transformStyle: 'preserve-3d',
                      willChange: 'transform',
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
                        animate={{ opacity: [0, 0.8, 0.15] }}
                        transition={{ duration: 0.3, times: [0, 0.5, 1] }}
                        className="absolute inset-0 bg-gradient-to-l from-black/90 via-white/10 to-transparent pointer-events-none"
                      />
                    </div>

                    {/* Back Face: Incoming prev right page */}
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
                        initial={{ opacity: 0.8 }}
                        animate={{ opacity: 0 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                        className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/30 to-transparent pointer-events-none"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Description written down in small words on the left bottom corner with NO background box */}
                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-50 max-w-[260px] sm:max-w-xs pointer-events-none text-left space-y-1">
                  <h4 className="font-liber font-bold text-xs sm:text-sm text-white leading-snug drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                    {currentItem.title}
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-white/85 font-light leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                    {currentItem.description}
                  </p>
                  <div className="pt-0.5 flex flex-wrap items-center gap-1.5 text-[9px] sm:text-[10px] text-white/60 font-mono tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                    <span>{currentItem.camera}</span>
                    <span>·</span>
                    <span>{currentItem.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Existing Controls (Arrow buttons) */}
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
