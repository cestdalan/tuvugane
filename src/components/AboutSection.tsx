import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react';
import BlurImage from './BlurImage';

interface AboutSectionProps {
  onNavigate: (sectionId: string) => void;
}

interface PageMedia {
  id: string;
  type: 'video' | 'photo';
  url: string;
  alt: string;
}

interface BookSpread {
  id: string;
  left: PageMedia;
  right: PageMedia;
}

const BOOK_SPREADS: BookSpread[] = [
  {
    id: 'spread-1',
    left: {
      id: 'm1',
      type: 'video',
      url: '/assets/aistudio/Discover_Hidden_African_Villages_A_Cinematic_Teaser_5481f979.mp4',
      alt: 'Cinematic Teaser Reel',
    },
    right: {
      id: 'm2',
      type: 'photo',
      url: '/assets/aistudio/trn_staff3_3_5b9708db.webp',
      alt: 'Production Crew on Set',
    },
  },
  {
    id: 'spread-2',
    left: {
      id: 'm3',
      type: 'photo',
      url: '/assets/aistudio/1_The_Dawn_Crossing_b4f87c17.webp',
      alt: 'The Dawn Crossing',
    },
    right: {
      id: 'm4',
      type: 'photo',
      url: '/assets/aistudio/5_The_Pillars_of_Tomorrow_3f536592.webp',
      alt: 'Pillars of Tomorrow',
    },
  },
  {
    id: 'spread-3',
    left: {
      id: 'm5',
      type: 'photo',
      url: '/assets/aistudio/ASP_ANITHA_70_51cb7ec8.webp',
      alt: 'Portrait of Anitha',
    },
    right: {
      id: 'm6',
      type: 'photo',
      url: '/assets/aistudio/INK08776_806fd592.webp',
      alt: 'Agaseke Weave Study',
    },
  },
  {
    id: 'spread-4',
    left: {
      id: 'm7',
      type: 'photo',
      url: '/assets/aistudio/dukunde_kawa_17_9888532a.webp',
      alt: 'Dukunde Kawa Harvest',
    },
    right: {
      id: 'm8',
      type: 'photo',
      url: '/assets/aistudio/iMpakanizi_66_b411b2d2.webp',
      alt: 'Impakanizi Monoliths',
    },
  },
  {
    id: 'spread-5',
    left: {
      id: 'm9',
      type: 'photo',
      url: '/assets/aistudio/MSG01940_1_783cf665.webp',
      alt: 'The Handshake at the Canal',
    },
    right: {
      id: 'm10',
      type: 'photo',
      url: '/assets/aistudio/MSG01932_1_d0a10631.webp',
      alt: 'Morning Shift with Tools',
    },
  },
  {
    id: 'spread-6',
    left: {
      id: 'm11',
      type: 'photo',
      url: '/assets/aistudio/new_1_2f61cc23.webp',
      alt: 'Valley March',
    },
    right: {
      id: 'm12',
      type: 'video',
      url: '/assets/aistudio/Discover_Hidden_African_Villages_A_Cinematic_Teaser_5481f979.mp4',
      alt: 'Cinematic Motion Sequence',
    },
  },
];

export default function AboutSection({ onNavigate }: AboutSectionProps) {
  const [currentSpreadIndex, setCurrentSpreadIndex] = useState(0);
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev' | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const totalSpreads = BOOK_SPREADS.length;
  const currentSpread = BOOK_SPREADS[currentSpreadIndex];

  const nextIndex = (currentSpreadIndex + 1) % totalSpreads;
  const prevIndex = (currentSpreadIndex - 1 + totalSpreads) % totalSpreads;

  const nextSpread = BOOK_SPREADS[nextIndex];
  const prevSpread = BOOK_SPREADS[prevIndex];

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
      setCurrentSpreadIndex(nextIndex);
    } else if (flipDirection === 'prev') {
      setCurrentSpreadIndex(prevIndex);
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
  }, [isFlipping, currentSpreadIndex]);

  const specs = [
    { label: 'Origin', value: 'Kigali, Rwanda' },
    { label: 'Est.', value: '2017' },
    { label: 'Pipeline', value: '8K LF & 35mm' },
    { label: 'Festival Laurels', value: '24+' },
  ];

  const renderMedia = (media: PageMedia, isPriority = false) => {
    if (media.type === 'video') {
      return (
        <div className="relative w-full h-full overflow-hidden bg-black">
          <video
            src={media.url}
            autoPlay
            muted={isMuted}
            loop
            playsInline
            className="w-full h-full object-cover"
          />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsMuted(!isMuted);
            }}
            className="absolute bottom-4 left-4 z-20 p-2 rounded-full bg-black/70 hover:bg-white text-white hover:text-black border border-white/20 transition-colors"
            title={isMuted ? 'Unmute' : 'Mute'}
            aria-label="Toggle mute"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      );
    }

    return (
      <div className="relative w-full h-full overflow-hidden bg-black">
        <BlurImage
          src={media.url}
          alt={media.alt}
          priority={isPriority}
          className="w-full h-full object-cover"
        />
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

        {/* 3D BOOK WITH REALISTIC PAGE-TURNING FLIP ANIMATION */}
        <div className="relative w-full flex flex-col items-center">
          {/* Main Book Stage Container with Perspective */}
          <div
            className="relative w-full max-w-5xl h-[340px] sm:h-[460px] md:h-[540px] lg:h-[600px] flex items-center justify-center select-none"
            style={{
              perspective: '2000px',
            }}
          >
            {/* Soft Ambient Shadow on Floor beneath the Open Book */}
            <div className="absolute -bottom-6 w-[86%] h-16 bg-black/90 blur-2xl rounded-full pointer-events-none transform scale-y-50" />

            {/* The Open Book Body (Two Pages: Left Half & Right Half) */}
            <div
              className="relative w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden bg-[#0d0d10] border border-white/15 shadow-[0_30px_90px_rgba(0,0,0,0.95)] flex"
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              {/* STATIC BASE LAYER */}
              {/* 1. Left Page (Underneath / Static) */}
              <div
                onClick={handlePrev}
                data-cursor="PREV PAGE"
                className="w-1/2 h-full relative overflow-hidden border-r border-black/40 cursor-pointer"
              >
                {flipDirection === 'prev'
                  ? renderMedia(prevSpread.left)
                  : renderMedia(currentSpread.left, true)}

                {/* Left Page Book Crease Shading */}
                <div className="absolute inset-y-0 right-0 w-8 sm:w-16 bg-gradient-to-l from-black/60 to-transparent pointer-events-none z-10" />
                <div className="absolute inset-0 bg-black/10 pointer-events-none z-10" />
              </div>

              {/* 2. Right Page (Underneath / Static: Unfolds as top page flips away) */}
              <div
                onClick={handleNext}
                data-cursor="NEXT PAGE"
                className="w-1/2 h-full relative overflow-hidden border-l border-black/40 cursor-pointer"
              >
                {flipDirection === 'next'
                  ? renderMedia(nextSpread.right)
                  : renderMedia(currentSpread.right, true)}

                {/* Right Page Book Crease Shading */}
                <div className="absolute inset-y-0 left-0 w-8 sm:w-16 bg-gradient-to-r from-black/60 to-transparent pointer-events-none z-10" />
                <div className="absolute inset-0 bg-black/10 pointer-events-none z-10" />
              </div>

              {/* Center Spine Crease Line */}
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-8 sm:w-12 bg-gradient-to-r from-black/50 via-black/90 to-black/50 z-20 pointer-events-none" />
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1px] bg-white/20 z-20 pointer-events-none" />

              {/* DYNAMIC TURNING LEAF (Bends and flips like an authentic book page) */}
              {/* FORWARD FLIP: Right Page bends in half along center spine and turns left */}
              {flipDirection === 'next' && (
                <motion.div
                  initial={{ rotateY: 0 }}
                  animate={{ rotateY: -180 }}
                  transition={{
                    duration: 0.85,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  onAnimationComplete={onFlipComplete}
                  className="absolute top-0 right-0 w-1/2 h-full z-30"
                  style={{
                    transformOrigin: 'left center',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Front of Turning Page (Current Right Page, folding toward left) */}
                  <div
                    className="absolute inset-0 w-full h-full overflow-hidden backface-hidden"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                    }}
                  >
                    {renderMedia(currentSpread.right)}
                    {/* Dynamic bending shadow that deepens as page curves */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.7 }}
                      transition={{ duration: 0.42 }}
                      className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent pointer-events-none"
                    />
                  </div>

                  {/* Back of Turning Page (Incoming Next Left Page, unfolding flat to left) */}
                  <div
                    className="absolute inset-0 w-full h-full overflow-hidden backface-hidden"
                    style={{
                      transform: 'rotateY(180deg)',
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                    }}
                  >
                    {renderMedia(nextSpread.left)}
                    {/* Shadow fades out as it unfolds flat onto left page */}
                    <motion.div
                      initial={{ opacity: 0.7 }}
                      animate={{ opacity: 0 }}
                      transition={{ duration: 0.43, delay: 0.42 }}
                      className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/30 to-transparent pointer-events-none"
                    />
                  </div>
                </motion.div>
              )}

              {/* BACKWARD FLIP: Left Page bends in half along center spine and turns right */}
              {flipDirection === 'prev' && (
                <motion.div
                  initial={{ rotateY: 0 }}
                  animate={{ rotateY: 180 }}
                  transition={{
                    duration: 0.85,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  onAnimationComplete={onFlipComplete}
                  className="absolute top-0 left-0 w-1/2 h-full z-30"
                  style={{
                    transformOrigin: 'right center',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Front of Turning Page (Current Left Page, folding toward right) */}
                  <div
                    className="absolute inset-0 w-full h-full overflow-hidden backface-hidden"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                    }}
                  >
                    {renderMedia(currentSpread.left)}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.7 }}
                      transition={{ duration: 0.42 }}
                      className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/40 to-transparent pointer-events-none"
                    />
                  </div>

                  {/* Back of Turning Page (Incoming Prev Right Page, unfolding flat to right) */}
                  <div
                    className="absolute inset-0 w-full h-full overflow-hidden backface-hidden"
                    style={{
                      transform: 'rotateY(180deg)',
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                    }}
                  >
                    {renderMedia(prevSpread.right)}
                    <motion.div
                      initial={{ opacity: 0.7 }}
                      animate={{ opacity: 0 }}
                      transition={{ duration: 0.43, delay: 0.42 }}
                      className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent pointer-events-none"
                    />
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Minimalist Floating Controls: Page Flipping Buttons Only (No text metadata, no image count) */}
          <div className="mt-8 z-30 flex items-center justify-center">
            <div className="flex items-center gap-4 px-5 py-2 rounded-full bg-[#111113]/90 backdrop-blur-xl border border-white/15 shadow-2xl text-white">
              <button
                type="button"
                onClick={handlePrev}
                disabled={isFlipping}
                className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors disabled:opacity-40"
                aria-label="Turn page left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="w-[1px] h-4 bg-white/15" />

              <button
                type="button"
                onClick={handleNext}
                disabled={isFlipping}
                className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors disabled:opacity-40"
                aria-label="Turn page right"
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
