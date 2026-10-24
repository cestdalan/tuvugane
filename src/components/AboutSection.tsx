import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, ChevronLeft, ChevronRight, Play, Pause, BookOpen, Volume2, VolumeX, Maximize2, Sparkles } from 'lucide-react';
import BlurImage from './BlurImage';

interface AboutSectionProps {
  onNavigate: (sectionId: string) => void;
}

interface BookPage {
  id: string;
  chapter: string;
  title: string;
  type: 'video' | 'photo' | 'dual';
  mediaUrl: string;
  secondaryMediaUrl?: string;
  quote: string;
  location: string;
  technical: string;
  notes: string;
  directorNotes: string;
}

const STUDIO_PAGES: BookPage[] = [
  {
    id: 'b1',
    chapter: 'Ch. 01 — Cinematic Overture',
    title: 'Hidden African Villages',
    type: 'video',
    mediaUrl: '/assets/aistudio/Discover_Hidden_African_Villages_A_Cinematic_Teaser_5481f979.mp4',
    secondaryMediaUrl: '/assets/aistudio/new_1_2f61cc23.webp',
    quote: 'Cinema is the preservation of ancestral breath across light and shadow.',
    location: 'Northern Province & Nyabarongo, Rwanda',
    technical: 'Arri Alexa Mini LF · Cooke Anamorphic 40mm · 24fps',
    notes: 'A quiet observational odyssey documenting the mist-shrouded valley hills at dawn.',
    directorNotes: 'We waited three mornings for the fog to settle precisely along the water canal.',
  },
  {
    id: 'b2',
    chapter: 'Ch. 02 — The Collective',
    title: 'Studio Crew in Field',
    type: 'photo',
    mediaUrl: '/assets/aistudio/trn_staff3_3_5b9708db.webp',
    secondaryMediaUrl: '/assets/aistudio/MSG01932_1_d0a10631.webp',
    quote: 'Every frame is built on shared trust and silent synchronization.',
    location: 'Kigali Studio & Production Base',
    technical: 'Red V-Raptor 8K · 35mm Prime · Natural Daylight',
    notes: 'The core cinematography and grip team during principal production in Kacyiru.',
    directorNotes: 'The energy of a Rwandan set is communal. Stories belong to everyone in the circle.',
  },
  {
    id: 'b3',
    chapter: 'Ch. 03 — First Light',
    title: 'The Dawn Crossing',
    type: 'photo',
    mediaUrl: '/assets/aistudio/1_The_Dawn_Crossing_b4f87c17.webp',
    quote: 'Water carries voices further than dry land ever could.',
    location: 'Nyabarongo River Basin',
    technical: 'Arri Alexa Mini LF · 50mm T1.5 · 1/48s 800 ISO',
    notes: 'Hand-carved wooden canoes navigating river bends at 05:40 AM.',
    directorNotes: 'No artificial reflectors used. The sky gradient did all the sculpting.',
  },
  {
    id: 'b4',
    chapter: 'Ch. 04 — Modern Monuments',
    title: 'Pillars of Tomorrow',
    type: 'photo',
    mediaUrl: '/assets/aistudio/5_The_Pillars_of_Tomorrow_3f536592.webp',
    quote: 'Concrete and sun forming sculptural geometry across the skyline.',
    location: 'Kigali Financial District',
    technical: 'Sony FX9 · 24-70mm G Master · Circular Polarizer',
    notes: 'Architectural kinetic direction exploring urban transformation in contemporary Africa.',
    directorNotes: 'High-contrast monochrome framing emphasizing vertical aspiration.',
  },
  {
    id: 'b5',
    chapter: 'Ch. 05 — Human Intimacy',
    title: 'Chiaroscuro Study: Anitha',
    type: 'photo',
    mediaUrl: '/assets/aistudio/ASP_ANITHA_70_51cb7ec8.webp',
    quote: 'The human face is the most demanding landscape in cinematography.',
    location: 'Studio Stage 1, Kigali',
    technical: 'Hasselblad H6D-100c · 100mm f/2.2 · Single Key Light',
    notes: 'Exploring sculptural shadows on African skin tones with true color fidelity.',
    directorNotes: 'Captured with zero diffusion filters to preserve textural realism.',
  },
  {
    id: 'b6',
    chapter: 'Ch. 06 — Living Heritage',
    title: 'Agaseke Geometric Weave',
    type: 'photo',
    mediaUrl: '/assets/aistudio/INK08776_806fd592.webp',
    quote: 'Patterns passed down through four hundred years of mathematical intuition.',
    location: 'Nyanza Royal Heritage Center',
    technical: 'Arri Amira · Zeiss Supreme Prime 65mm',
    notes: 'Close-up macro cinematography celebrating the spiral architecture of traditional basketry.',
    directorNotes: 'The rhythm of weaving mirrors the pacing of a cinematic sequence.',
  },
  {
    id: 'b7',
    chapter: 'Ch. 07 — The High Lands',
    title: 'Dukunde Kawa Harvest',
    type: 'photo',
    mediaUrl: '/assets/aistudio/dukunde_kawa_17_9888532a.webp',
    quote: 'High altitude volcanic soil yields the purest red cherries on the continent.',
    location: 'Gakenke District, Northern Province',
    technical: 'Canon C500 Mk II · Canon Cinema Prime 24mm',
    notes: 'Agricultural documentary chronicling fair-trade coffee washing stations at 2,000 meters.',
    directorNotes: 'Filming in highland mist requires continuous lens temperature acclimation.',
  },
  {
    id: 'b8',
    chapter: 'Ch. 08 — Spatial Presence',
    title: 'Impakanizi Monoliths',
    type: 'photo',
    mediaUrl: '/assets/aistudio/iMpakanizi_66_b411b2d2.webp',
    quote: 'Form and silence speaking directly to the sky.',
    location: 'Eastern Savanna Outskirts',
    technical: 'Red Monstro 8K VV · Leica Summilux-C 35mm',
    notes: 'Experimental spatial motion study commissioned for the Venice Biennale pavilion.',
    directorNotes: 'We matched the camera tracking speed to the exact shadow movement across the stone.',
  },
  {
    id: 'b9',
    chapter: 'Ch. 09 — The Pact',
    title: 'The Handshake at the Canal',
    type: 'photo',
    mediaUrl: '/assets/aistudio/MSG01940_1_783cf665.webp',
    quote: 'Agreements sealed not in ink, but in shared labor under the sun.',
    location: 'Nyabarongo Irrigation Works',
    technical: 'Arri Alexa Mini LF · Cooke Anamorphic 85mm',
    notes: 'Narrative still from our award-winning dramatic short film on rural cooperatives.',
    directorNotes: 'A gesture repeated a thousand times, elevated into myth through framing.',
  },
  {
    id: 'b10',
    chapter: 'Ch. 10 — The Procession',
    title: 'Morning Shift with Tools',
    type: 'photo',
    mediaUrl: '/assets/aistudio/MSG01932_1_d0a10631.webp',
    quote: 'Work as choreography. Tools as extensions of memory.',
    location: 'Bugesera Plains',
    technical: 'Cooke Speed Panchro 50mm · T2.3 · 500T Kodak Stock',
    notes: 'Procession study analyzing group cadence and naturalistic motion blur.',
    directorNotes: 'Tracking shot executed on an unpaved ridge with an improvised rickshaw rig.',
  },
  {
    id: 'b11',
    chapter: 'Ch. 11 — The Horizon',
    title: 'Valley March',
    type: 'photo',
    mediaUrl: '/assets/aistudio/new_1_2f61cc23.webp',
    quote: 'Looking forward into the boundless African morning.',
    location: 'Akagera Basin Valley',
    technical: 'Arri Alexa 65 · Hasselblad Prime 28mm',
    notes: 'The concluding panorama of our monograph, capturing endless undulating hills.',
    directorNotes: 'Rwanda is called the Land of a Thousand Hills for this exact unending vista.',
  },
];

export default function AboutSection({ onNavigate }: AboutSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlayingVideo, setIsPlayingVideo] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isAutoPlayPages, setIsAutoPlayPages] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const totalPages = STUDIO_PAGES.length;
  const currentSpread = STUDIO_PAGES[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Optional auto-slideshow
  useEffect(() => {
    if (!isAutoPlayPages) return;
    const interval = setInterval(() => {
      handleNext();
    }, 5500);
    return () => clearInterval(interval);
  }, [isAutoPlayPages]);

  // Video playback synchronization when active page changes
  useEffect(() => {
    if (currentSpread.type === 'video' && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [currentIndex, currentSpread.type]);

  const specs = [
    { label: 'Origin', value: 'Kigali, Rwanda' },
    { label: 'Est.', value: '2017' },
    { label: 'Pipeline', value: '8K LF & 35mm' },
    { label: 'Festival Laurels', value: '24+' },
  ];

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

        {/* 3D BOOK EFFECT MONOGRAPH CAROUSEL (Matched from video) */}
        <div className="relative w-full flex flex-col items-center">
          {/* Book Header Title & Page Counter matching video */}
          <div className="text-center space-y-2 pb-8 sm:pb-12 z-20">
            <div className="flex items-center justify-center gap-2 text-xs font-liber uppercase tracking-[0.25em] text-white/40">
              <BookOpen className="w-3.5 h-3.5 text-white/60" />
              <span>Studio Monograph</span>
            </div>
            <h3 className="font-liber font-black text-2xl sm:text-4xl text-white tracking-tight">
              Production Journal
            </h3>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/60 font-mono">
              <Sparkles className="w-3 h-3 text-white/70" />
              <span>{totalPages} Chapters · Films &amp; Stills</span>
            </div>
          </div>

          {/* 3D Curved Perspective Carousel Stage */}
          <div
            ref={carouselRef}
            className="relative w-full h-[460px] sm:h-[540px] md:h-[620px] flex items-center justify-center overflow-visible"
            style={{
              perspective: '1400px',
              perspectiveOrigin: 'center center',
            }}
          >
            {/* Ambient Deep Floor Shadow beneath the active book */}
            <div className="absolute bottom-6 w-[80%] max-w-2xl h-16 bg-black/80 blur-3xl rounded-full pointer-events-none transform scale-y-50" />

            {STUDIO_PAGES.map((page, idx) => {
              // Calculate relative offset from center
              let offset = idx - currentIndex;
              // Wrap around for seamless infinite carousel
              if (offset > totalPages / 2) offset -= totalPages;
              if (offset < -totalPages / 2) offset += totalPages;

              const isCenter = offset === 0;
              const isVisible = Math.abs(offset) <= 3;

              if (!isVisible) return null;

              // 3D positioning on cylindrical arc (like in the video)
              const translateX = offset * 48; // percentage translate
              const translateZ = -Math.abs(offset) * 150; // push backwards
              const rotateY = -offset * 32; // rotate toward center
              const scale = Math.max(0.65, 1 - Math.abs(offset) * 0.12);
              const opacity = Math.max(0.2, 1 - Math.abs(offset) * 0.28);
              const zIndex = 30 - Math.abs(offset);

              return (
                <div
                  key={page.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`absolute w-[92%] sm:w-[82%] md:w-[72%] max-w-3xl h-[400px] sm:h-[480px] md:h-[540px] cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] select-none ${
                    isCenter ? 'pointer-events-auto' : 'pointer-events-auto hover:brightness-125'
                  }`}
                  style={{
                    transform: `translateX(${translateX}%) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                    zIndex,
                    opacity,
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* The Physical Open Book Spread */}
                  <div
                    className={`w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden bg-[#121214] border border-white/15 relative flex shadow-[0_30px_70px_rgba(0,0,0,0.85)] ${
                      isCenter ? 'ring-1 ring-white/20' : ''
                    }`}
                  >
                    {/* Authentic Center Spine Crease / Fold Shadow */}
                    <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-8 sm:w-12 bg-gradient-to-r from-black/40 via-black/80 to-black/40 z-30 pointer-events-none" />
                    <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1px] bg-white/10 z-30 pointer-events-none" />

                    {/* Paper Texture & Grain */}
                    <div className="absolute inset-0 film-grain opacity-40 pointer-events-none z-20" />

                    {/* LEFT PAGE OF THE SPREAD: Main Visual (Video or High-Res Photo) */}
                    <div className="w-1/2 h-full relative overflow-hidden bg-black flex flex-col justify-between border-r border-white/5">
                      {page.type === 'video' ? (
                        <div className="relative w-full h-full overflow-hidden bg-black">
                          <video
                            ref={isCenter ? videoRef : undefined}
                            src={page.mediaUrl}
                            autoPlay={isCenter}
                            muted={isMuted}
                            loop
                            playsInline
                            className="w-full h-full object-cover"
                          />
                          {/* Video Play/Audio badges on book page */}
                          <div className="absolute top-3 left-3 z-30 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 text-[10px] font-liber text-white">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                            <span>Motion Reel</span>
                          </div>

                          {isCenter && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsMuted(!isMuted);
                              }}
                              className="absolute bottom-3 left-3 z-30 p-2 rounded-full bg-black/70 hover:bg-white text-white hover:text-black border border-white/20 transition-colors"
                              title={isMuted ? 'Unmute video' : 'Mute video'}
                              aria-label="Toggle audio"
                            >
                              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                            </button>
                          )}
                        </div>
                      ) : (
                        <div className="relative w-full h-full overflow-hidden bg-black">
                          <BlurImage
                            src={page.mediaUrl}
                            alt={page.title}
                            priority={isCenter}
                            className="w-full h-full object-cover"
                          />
                          {/* Photo Corner Tag */}
                          <div className="absolute top-3 left-3 z-20 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-liber font-medium text-white/80 border border-white/10">
                            Frame 0{idx + 1}
                          </div>
                        </div>
                      )}

                      {/* Subtle Vignette on Left Page edge */}
                      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/40 pointer-events-none z-10" />
                    </div>

                    {/* RIGHT PAGE OF THE SPREAD: Journal Notes, Diary, Quotes & Tech Details */}
                    <div className="w-1/2 h-full bg-[#161619] p-4 sm:p-6 md:p-8 flex flex-col justify-between text-white relative z-10 overflow-y-auto">
                      {/* Top Header of Page */}
                      <div className="space-y-2 border-b border-white/10 pb-3">
                        <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-white/40 uppercase tracking-widest">
                          <span>{page.chapter}</span>
                          <span>p. {String((idx + 1) * 2 - 1).padStart(2, '0')}-{String((idx + 1) * 2).padStart(2, '0')}</span>
                        </div>
                        <h4 className="font-liber font-extrabold text-base sm:text-xl md:text-2xl text-white tracking-tight leading-tight">
                          {page.title}
                        </h4>
                      </div>

                      {/* Journal Quote in elegant Liber serif italic style */}
                      <div className="my-auto py-2 sm:py-3 space-y-2">
                        <blockquote className="text-xs sm:text-sm md:text-base font-serif italic text-white/90 leading-relaxed border-l-2 border-white/40 pl-3">
                          "{page.quote}"
                        </blockquote>

                        <p className="text-[11px] sm:text-xs text-white/60 font-light leading-relaxed hidden sm:block">
                          {page.notes}
                        </p>
                      </div>

                      {/* Technical & Director's Log Footer */}
                      <div className="pt-3 border-t border-white/10 space-y-2 text-[10px] sm:text-xs font-liber">
                        <div className="space-y-0.5">
                          <span className="text-white/30 text-[9px] uppercase tracking-wider block">Location</span>
                          <span className="text-white/80 truncate block">{page.location}</span>
                        </div>

                        <div className="space-y-0.5 hidden sm:block">
                          <span className="text-white/30 text-[9px] uppercase tracking-wider block">Capture Pipeline</span>
                          <span className="text-white/60 font-mono text-[10px] truncate block">{page.technical}</span>
                        </div>
                      </div>

                      {/* Subtle Page Corner Turn Cue */}
                      <div className="absolute bottom-2 right-2 text-[9px] font-mono text-white/20">
                        tuvugane · vol. i
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Floating Pill Controls matching the exact dock in the video */}
          <div className="mt-8 z-30 flex items-center justify-center">
            <div className="flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-2.5 rounded-full bg-[#111113]/90 backdrop-blur-xl border border-white/15 shadow-2xl text-white font-liber">
              {/* Previous page arrow */}
              <button
                type="button"
                onClick={handlePrev}
                className="p-1.5 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                aria-label="Previous Page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Page Number indicator */}
              <div className="text-xs font-mono font-semibold tracking-wider text-white px-2">
                <span>{String(currentIndex + 1).padStart(2, '0')}</span>
                <span className="text-white/30 mx-1.5">/</span>
                <span className="text-white/40">{String(totalPages).padStart(2, '0')}</span>
              </div>

              {/* Next page arrow */}
              <button
                type="button"
                onClick={handleNext}
                className="p-1.5 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                aria-label="Next Page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              <div className="w-[1px] h-4 bg-white/15 mx-0.5" />

              {/* Auto Slideshow toggle */}
              <button
                type="button"
                onClick={() => setIsAutoPlayPages(!isAutoPlayPages)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs transition-colors ${
                  isAutoPlayPages ? 'bg-white text-black font-semibold' : 'text-white/60 hover:text-white'
                }`}
                title={isAutoPlayPages ? 'Pause slideshow' : 'Auto-flip pages'}
              >
                {isAutoPlayPages ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 fill-current" />}
                <span className="hidden sm:inline text-[11px]">Auto</span>
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
