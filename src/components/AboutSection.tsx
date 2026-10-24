import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react';
import BlurImage from './BlurImage';

interface AboutSectionProps {
  onNavigate: (sectionId: string) => void;
}

interface BookMedia {
  id: string;
  type: 'video' | 'photo';
  url: string;
  alt: string;
}

const BOOK_ITEMS: BookMedia[] = [
  {
    id: 'p1',
    type: 'video',
    url: '/assets/aistudio/Discover_Hidden_African_Villages_A_Cinematic_Teaser_5481f979.mp4',
    alt: 'Cinema Reel: Hidden African Villages',
  },
  {
    id: 'p2',
    type: 'photo',
    url: '/assets/aistudio/new_1_2f61cc23.webp',
    alt: 'Valley March',
  },
  {
    id: 'p3',
    type: 'photo',
    url: '/assets/aistudio/1_The_Dawn_Crossing_b4f87c17.webp',
    alt: 'The Dawn Crossing',
  },
  {
    id: 'p4',
    type: 'photo',
    url: '/assets/aistudio/5_The_Pillars_of_Tomorrow_3f536592.webp',
    alt: 'Pillars of Tomorrow',
  },
  {
    id: 'p5',
    type: 'photo',
    url: '/assets/aistudio/ASP_ANITHA_70_51cb7ec8.webp',
    alt: 'Portrait of Anitha',
  },
  {
    id: 'p6',
    type: 'photo',
    url: '/assets/aistudio/trn_staff3_3_5b9708db.webp',
    alt: 'Studio Crew in Field',
  },
  {
    id: 'p7',
    type: 'photo',
    url: '/assets/aistudio/INK08776_806fd592.webp',
    alt: 'Agaseke Weave',
  },
  {
    id: 'p8',
    type: 'photo',
    url: '/assets/aistudio/dukunde_kawa_17_9888532a.webp',
    alt: 'Dukunde Kawa Harvest',
  },
  {
    id: 'p9',
    type: 'photo',
    url: '/assets/aistudio/iMpakanizi_66_b411b2d2.webp',
    alt: 'Impakanizi Monoliths',
  },
  {
    id: 'p10',
    type: 'photo',
    url: '/assets/aistudio/MSG01940_1_783cf665.webp',
    alt: 'The Handshake at the Canal',
  },
  {
    id: 'p11',
    type: 'photo',
    url: '/assets/aistudio/MSG01932_1_d0a10631.webp',
    alt: 'Morning Shift with Tools',
  },
];

export default function AboutSection({ onNavigate }: AboutSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev' | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const totalItems = BOOK_ITEMS.length;
  const currentMedia = BOOK_ITEMS[currentIndex];

  const nextIndex = (currentIndex + 1) % totalItems;
  const prevIndex = (currentIndex - 1 + totalItems) % totalItems;
  const next2Index = (currentIndex + 2) % totalItems;
  const prev2Index = (currentIndex - 2 + totalItems) % totalItems;

  const nextMedia = BOOK_ITEMS[nextIndex];
  const prevMedia = BOOK_ITEMS[prevIndex];
  const next2Media = BOOK_ITEMS[next2Index];
  const prev2Media = BOOK_ITEMS[prev2Index];

  const handleNext = () => {
    if (isFlipping) return;
    setFlipDirection('next');
    setIsFlipping(true);
  };

  const handlePrev = () => {
    if (isFlipping) return;
    setFlipDirection('prev');
    setIsFlipping(true);
  };

  const onFlipComplete = () => {
    if (flipDirection === 'next') {
      setCurrentIndex(nextIndex);
    } else if (flipDirection === 'prev') {
      setCurrentIndex(prevIndex);
    }
    setFlipDirection(null);
    setIsFlipping(false);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFlipping, currentIndex]);

  const specs = [
    { label: 'Origin', value: 'Kigali, Rwanda' },
    { label: 'Est.', value: '2017' },
    { label: 'Pipeline', value: '8K LF & 35mm' },
    { label: 'Festival Laurels', value: '24+' },
  ];

  /**
   * Renders half of the continuous image/video so that left & right halves
   * together seamlessly form ONE single continuous image across both pages with NO middle line.
   */
  const renderHalfMedia = (media: BookMedia, side: 'left' | 'right', isPriority = false) => {
    const isLeft = side === 'left';

    if (media.type === 'video') {
      return (
        <div className="relative w-full h-full overflow-hidden bg-black select-none">
          <div
            className="absolute top-0 h-full w-[200%] max-w-none"
            style={{
              left: isLeft ? '0%' : '-100%',
            }}
          >
            <video
              src={media.url}
              autoPlay
              muted={isMuted}
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          </div>

          {/* Mute button on video (left side only) */}
          {isLeft && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsMuted(!isMuted);
              }}
              className="absolute bottom-4 left-4 z-30 p-2 rounded-full bg-black/70 hover:bg-white text-white hover:text-black border border-white/20 transition-colors"
              title={isMuted ? 'Unmute' : 'Mute'}
              aria-label="Toggle mute"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
          )}

          {/* Subtle soft paper fold gradient (NO visible line, only gentle natural curvature shadow) */}
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
            src={media.url}
            alt={media.alt}
            priority={isPriority}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Subtle soft paper fold gradient (NO visible line, only gentle natural curvature shadow) */}
        <div
          className={`absolute inset-y-0 ${
            isLeft ? 'right-0 bg-gradient-to-l' : 'left-0 bg-gradient-to-r'
          } from-black/25 via-black/5 to-transparent w-8 sm:w-16 pointer-events-none z-10`}
        />
      </div>
    );
  };

  /**
   * Helper to render packed background book pages peeking out from underneath
   */
  const renderStackedPeekPage = (media: BookMedia, side: 'left' | 'right') => {
    return (
      <div className="w-full h-full overflow-hidden rounded-2xl bg-black border border-white/10 shadow-xl relative">
        <BlurImage
          src={media.type === 'video' ? '/assets/aistudio/new_1_2f61cc23.webp' : media.url}
          alt={media.alt}
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>
    );
  };

  return (
    <section
      id="about"
      className="relative w-full py-24 md:py-32 bg-[#060607] text-white border-t border-white/10 overflow-hidden font-liber"
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

        {/* 3D BOOK WITH REALISTIC PAGE FLIP & PACKED UNDERNEATH SPREADS */}
        <div className="relative w-full flex flex-col items-center">
          {/* Main Book Stage Container with 3D Perspective */}
          <div
            className="relative w-full max-w-5xl h-[340px] sm:h-[460px] md:h-[540px] lg:h-[600px] flex items-center justify-center select-none"
            style={{
              perspective: '2200px',
            }}
          >
            {/* Ambient Deep Shadow beneath the book */}
            <div className="absolute -bottom-8 w-[88%] h-20 bg-black/95 blur-2xl rounded-full pointer-events-none transform scale-y-50" />

            {/* 1. LEFT STACK OF PAGES (Packed underneath on the left) */}
            <div
              onClick={handlePrev}
              title="Previous spread"
              className="absolute left-[-22px] sm:left-[-38px] md:left-[-52px] w-[82%] h-[92%] top-[4%] cursor-pointer z-10 transition-transform duration-500 hover:-translate-x-2"
              style={{
                transform: 'translateZ(-90px) rotateY(18deg) scale(0.93)',
                transformOrigin: 'left center',
              }}
            >
              {renderStackedPeekPage(prev2Media, 'left')}
            </div>

            <div
              onClick={handlePrev}
              title="Previous spread"
              className="absolute left-[-12px] sm:left-[-20px] md:left-[-28px] w-[90%] h-[96%] top-[2%] cursor-pointer z-20 transition-transform duration-500 hover:-translate-x-1"
              style={{
                transform: 'translateZ(-45px) rotateY(10deg) scale(0.97)',
                transformOrigin: 'left center',
              }}
            >
              {renderStackedPeekPage(prevMedia, 'left')}
            </div>

            {/* 2. RIGHT STACK OF PAGES (Packed underneath on the right) */}
            <div
              onClick={handleNext}
              title="Next spread"
              className="absolute right-[-22px] sm:right-[-38px] md:right-[-52px] w-[82%] h-[92%] top-[4%] cursor-pointer z-10 transition-transform duration-500 hover:translate-x-2"
              style={{
                transform: 'translateZ(-90px) rotateY(-18deg) scale(0.93)',
                transformOrigin: 'right center',
              }}
            >
              {renderStackedPeekPage(next2Media, 'right')}
            </div>

            <div
              onClick={handleNext}
              title="Next spread"
              className="absolute right-[-12px] sm:right-[-20px] md:right-[-28px] w-[90%] h-[96%] top-[2%] cursor-pointer z-20 transition-transform duration-500 hover:translate-x-1"
              style={{
                transform: 'translateZ(-45px) rotateY(-10deg) scale(0.97)',
                transformOrigin: 'right center',
              }}
            >
              {renderStackedPeekPage(nextMedia, 'right')}
            </div>

            {/* 3. THE TOP CURRENT BOOK SPREAD (Single image taking over both pages, NO middle line) */}
            <div
              className="relative w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden bg-[#0a0a0c] border border-white/15 shadow-[0_30px_90px_rgba(0,0,0,0.95)] flex z-30"
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
                  ? renderHalfMedia(prevMedia, 'left')
                  : renderHalfMedia(currentMedia, 'left', true)}
              </div>

              {/* Right Half (Underneath / Static: Unfolds into center view as top page turns left) */}
              <div
                onClick={handleNext}
                data-cursor="NEXT"
                className="w-1/2 h-full relative overflow-hidden cursor-pointer"
              >
                {flipDirection === 'next'
                  ? renderHalfMedia(nextMedia, 'right')
                  : renderHalfMedia(currentMedia, 'right', true)}
              </div>

              {/* DYNAMIC TURNING LEAF */}
              {/* FORWARD FLIP: Right half of current image bends along center spine and flips 180° to the left */}
              {flipDirection === 'next' && (
                <motion.div
                  initial={{ rotateY: 0 }}
                  animate={{ rotateY: -180 }}
                  transition={{
                    duration: 0.85,
                    ease: [0.4, 0, 0.2, 1],
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
                    {renderHalfMedia(currentMedia, 'right')}
                    {/* Natural curvature shadow that darkens as paper bends */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.75 }}
                      transition={{ duration: 0.42 }}
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
                    {renderHalfMedia(nextMedia, 'left')}
                    {/* Shadow fades as page lays flat on left side */}
                    <motion.div
                      initial={{ opacity: 0.75 }}
                      animate={{ opacity: 0 }}
                      transition={{ duration: 0.43, delay: 0.42 }}
                      className="absolute inset-0 bg-gradient-to-l from-black/85 via-black/30 to-transparent pointer-events-none"
                    />
                  </div>
                </motion.div>
              )}

              {/* BACKWARD FLIP: Left half of current image bends along center spine and flips 180° to the right */}
              {flipDirection === 'prev' && (
                <motion.div
                  initial={{ rotateY: 0 }}
                  animate={{ rotateY: 180 }}
                  transition={{
                    duration: 0.85,
                    ease: [0.4, 0, 0.2, 1],
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
                    {renderHalfMedia(currentMedia, 'left')}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.75 }}
                      transition={{ duration: 0.42 }}
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
                    {renderHalfMedia(prevMedia, 'right')}
                    <motion.div
                      initial={{ opacity: 0.75 }}
                      animate={{ opacity: 0 }}
                      transition={{ duration: 0.43, delay: 0.42 }}
                      className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/30 to-transparent pointer-events-none"
                    />
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Minimalist Page Turning Controls (Discreet flip buttons, no metadata, no numbers) */}
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
