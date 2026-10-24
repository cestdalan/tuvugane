import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Volume2, VolumeX, ArrowDown, Play } from 'lucide-react';

interface HeroSectionProps {
  onOpenShowreel: () => void;
  onNavigate: (sectionId: string) => void;
}

export default function HeroSection({ onOpenShowreel, onNavigate }: HeroSectionProps) {
  const [isAudioActive, setIsAudioActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Guarantee seamless silent looping autoplay across all browsers
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {
        // Handled silently by browser policy
      });
    }
  }, []);

  const toggleAmbientAudio = () => {
    if (videoRef.current) {
      if (!isAudioActive) {
        videoRef.current.muted = false;
        videoRef.current.volume = 0.85;
        setIsAudioActive(true);
      } else {
        videoRef.current.muted = true;
        setIsAudioActive(false);
      }
    } else {
      setIsAudioActive(!isAudioActive);
    }
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-black text-white font-liber"
    >
      {/* 1. Subtle, Looping Silent Cinematic Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
          preload="auto"
          poster="/assets/aistudio/new_1_2f61cc23.webp"
          className="w-full h-full object-cover object-center scale-105 opacity-50 transition-opacity duration-1000"
        >
          <source
            src="/assets/aistudio/Discover_Hidden_African_Villages_A_Cinematic_Teaser_5481f979.mp4"
            type="video/mp4"
          />
        </video>

        {/* Ambient Film Grain & Vignette Scrims */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/45 to-[#050505]/75" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#000000_90%)]" />
        <div className="absolute inset-0 film-grain pointer-events-none" />
      </div>

      {/* Spacer for Top Header */}
      <div className="h-28 md:h-36" />

      {/* Hero Bottom Editorial Title & Meta in Pure Liber Font */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-16 pb-12 pt-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.12, delayChildren: 0.1 },
            },
          }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-white/10 pb-8"
        >
          <div className="space-y-4">
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
              }}
              className="text-xs font-liber font-semibold uppercase tracking-[0.25em] text-white/50"
            >
              Film &amp; Visual Studio
            </motion.p>

            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
              }}
              className="font-liber font-black text-5xl sm:text-7xl lg:text-8xl xl:text-9xl tracking-tight leading-[0.92] text-white"
            >
              We tell <br />
              <span className="font-liber font-light text-white/80">stories.</span>
            </motion.h1>
          </div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
            }}
            className="flex items-center text-xs font-liber text-white/60"
          >
            <button
              type="button"
              onClick={() => onNavigate('work')}
              data-cursor="GALLERY"
              className="inline-flex items-center gap-2 text-xs font-liber font-bold uppercase tracking-wider text-white hover:text-white/70 transition-colors"
            >
              <span>Explore Gallery</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        </motion.div>

        {/* 4. Controls Strip: Sound */}
        <div className="pt-4 flex items-center justify-between text-xs font-liber text-white/50">
          <button
            type="button"
            onClick={toggleAmbientAudio}
            data-cursor="SOUND"
            className="group flex items-center gap-2.5 py-1 text-xs hover:text-white transition-colors"
            aria-label={isAudioActive ? 'Mute ambient sound' : 'Enable ambient sound'}
          >
            {isAudioActive ? (
              <Volume2 className="w-3.5 h-3.5 text-white" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-white/40" />
            )}
            <span className="text-white/60 group-hover:text-white font-semibold">
              {isAudioActive ? 'Sound On' : 'Sound Off'}
            </span>

            {isAudioActive && (
              <div className="flex items-center gap-0.5 ml-1">
                <span className="w-0.5 h-3 bg-white animate-pulse" />
                <span className="w-0.5 h-4 bg-white animate-pulse [animation-delay:150ms]" />
                <span className="w-0.5 h-2 bg-white animate-pulse [animation-delay:300ms]" />
              </div>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
