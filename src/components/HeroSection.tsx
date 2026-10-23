import { useState, useRef } from 'react';
import { Play, Volume2, VolumeX, ArrowDown, ArrowUpRight } from 'lucide-react';

interface HeroSectionProps {
  onOpenShowreel: () => void;
  onNavigate: (sectionId: string) => void;
}

export default function HeroSection({ onOpenShowreel, onNavigate }: HeroSectionProps) {
  const [isAudioActive, setIsAudioActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleAmbientAudio = () => {
    if (videoRef.current) {
      if (!isAudioActive) {
        videoRef.current.muted = false;
        videoRef.current.volume = 0.9;
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
      className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-black text-white"
    >
      {/* 1. Cinematic Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster="/assets/aistudio/new_1_2f61cc23.jpg"
          className="w-full h-full object-cover object-center scale-105 opacity-60 transition-opacity duration-1000"
        >
          <source
            src="/assets/aistudio/Discover_Hidden_African_Villages_A_Cinematic_Teaser_5481f979.mp4"
            type="video/mp4"
          />
        </video>

        {/* Ambient Film Grain & Vignette Scrims */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-[#050505]/70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#000000_90%)]" />
        <div className="absolute inset-0 film-grain pointer-events-none" />
      </div>

      {/* Spacer for Top Header */}
      <div className="h-24 md:h-32" />

      {/* 2. Main Editorial Hero Copy: Full-Width Layout without boxed margins */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-16 my-auto py-12 md:py-20">
        <div className="max-w-4xl space-y-6">
          {/* Ultra-Bold Editorial Headline */}
          <h1 className="font-display font-extrabold text-5xl sm:text-7xl lg:text-9xl tracking-tight leading-[0.93] text-white">
            We tell stories.
          </h1>

          {/* Editorial Subtitle */}
          <p className="font-display font-medium text-lg sm:text-2xl text-white/80 tracking-wide">
            Film <span className="text-white/30">·</span> Commercials <span className="text-white/30">·</span> Motion Design
          </p>

          <p className="max-w-xl text-sm sm:text-base text-white/60 leading-relaxed font-sans font-light">
            An elite creative film and motion design studio headquartered in Kigali. Rooted in authentic human truth, crafted with large-format cinema glass and avant-garde kinetic direction.
          </p>

          {/* Dual Action Buttons */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => onNavigate('work')}
              data-cursor="WORK"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-white text-black font-semibold text-sm rounded-full hover:bg-white/90 transition-all duration-200 shadow-[0_4px_25px_rgba(255,255,255,0.25)] hover:scale-102 active:scale-98"
            >
              <span>Explore Work</span>
              <ArrowDown className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => onNavigate('contact')}
              data-cursor="CONTACT"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-white/10 hover:bg-white/15 text-white font-medium text-sm rounded-full border border-white/20 hover:border-white/40 transition-all duration-200 active:scale-98"
            >
              <span>Get In Touch</span>
              <ArrowUpRight className="w-4 h-4 text-white/70" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Hero Bottom Control Bar: Full-Width */}
      <div className="relative z-10 w-full border-t border-white/10 bg-black/40 backdrop-blur-md">
        <div className="w-full px-6 md:px-12 lg:px-16 py-4 flex items-center justify-between">
          {/* Audio Toggle with pure white equalizer bars */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleAmbientAudio}
              data-cursor="SOUND"
              className="group flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono transition-colors"
              aria-label={isAudioActive ? 'Mute ambient sound' : 'Enable ambient sound'}
            >
              {isAudioActive ? (
                <Volume2 className="w-3.5 h-3.5 text-white" />
              ) : (
                <VolumeX className="w-3.5 h-3.5 text-white/40" />
              )}
              <span className="text-white/70 group-hover:text-white">
                {isAudioActive ? 'Sound On' : 'Sound Off'}
              </span>

              {/* Animated sound wave bars in crisp pure white */}
              {isAudioActive && (
                <div className="flex items-center gap-0.5 ml-1">
                  <span className="w-0.5 h-2.5 bg-white animate-pulse" />
                  <span className="w-0.5 h-3.5 bg-white animate-pulse delay-75" />
                  <span className="w-0.5 h-1.5 bg-white animate-pulse delay-150" />
                </div>
              )}
            </button>
          </div>

          {/* Animated vertical scroll indicator */}
          <button
            type="button"
            onClick={() => onNavigate('work')}
            data-cursor="SCROLL"
            className="hidden sm:flex flex-col items-center gap-1.5 text-[11px] font-mono tracking-widest text-white/50 hover:text-white transition-colors"
          >
            <span>SCROLL</span>
            <div className="w-px h-6 bg-gradient-to-b from-white/70 via-white/20 to-transparent relative overflow-hidden">
              <span className="absolute top-0 left-0 w-full h-2 bg-white animate-bounce" />
            </div>
          </button>

          {/* Showreel Button triggering in-page video player modal */}
          <div className="flex items-center">
            <button
              type="button"
              onClick={onOpenShowreel}
              data-cursor="PLAY"
              className="group flex items-center gap-2.5 px-4 py-2 bg-white/10 hover:bg-white text-white hover:text-black rounded-full border border-white/20 hover:border-white transition-all duration-200"
            >
              <div className="w-4 h-4 rounded-full bg-white group-hover:bg-black text-black group-hover:text-white flex items-center justify-center transition-colors">
                <Play className="w-2.5 h-2.5 fill-current translate-x-0.2" />
              </div>
              <span className="text-xs font-semibold tracking-wider uppercase">
                Showreel (2:04)
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
