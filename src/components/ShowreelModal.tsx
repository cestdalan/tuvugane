import { useState, useRef, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize2, RotateCcw } from 'lucide-react';

interface ShowreelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ShowreelModal({ isOpen, onClose }: ShowreelModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(124); // default 2:04
  const [aspectRatio, setAspectRatio] = useState<'2.39' | '16:9' | '4:3'>('2.39');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === ' ') {
        e.preventDefault();
        togglePlay();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    } else {
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      if (videoRef.current.duration) {
        setDuration(videoRef.current.duration);
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const formatTimecode = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const frames = Math.floor((seconds % 1) * 24);
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}:${String(frames).padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 md:p-8 animate-in fade-in duration-300">
      {/* Container with cinematic framing */}
      <div className="relative w-full max-w-6xl flex flex-col bg-[#0a0a0a] border border-white/15 rounded-xl overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.9)]">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0d0d0d]">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="font-display font-bold text-sm tracking-wider uppercase text-white">
              TUVUGANE · STUDIO SHOWREEL
            </span>
            <span className="hidden sm:inline text-xs text-white/40 font-mono">
              [ 4K DCI · 24FPS · PRORES 4444 XQ ]
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Aspect Ratio Switcher */}
            <div className="hidden sm:flex items-center gap-1 bg-white/5 rounded-lg p-0.5 border border-white/10 text-xs">
              <button
                type="button"
                onClick={() => setAspectRatio('2.39')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  aspectRatio === '2.39' ? 'bg-white text-black font-semibold' : 'text-white/60 hover:text-white'
                }`}
              >
                2.39:1
              </button>
              <button
                type="button"
                onClick={() => setAspectRatio('16:9')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  aspectRatio === '16:9' ? 'bg-white text-black font-semibold' : 'text-white/60 hover:text-white'
                }`}
              >
                16:9
              </button>
              <button
                type="button"
                onClick={() => setAspectRatio('4:3')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  aspectRatio === '4:3' ? 'bg-white text-black font-semibold' : 'text-white/60 hover:text-white'
                }`}
              >
                4:3
              </button>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Close showreel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Canvas Stage */}
        <div className="relative w-full bg-black flex items-center justify-center overflow-hidden min-h-[300px] md:min-h-[500px]">
          <div
            className={`w-full transition-all duration-300 relative flex items-center justify-center ${
              aspectRatio === '2.39' ? 'aspect-[2.39/1]' : aspectRatio === '16:9' ? 'aspect-video' : 'aspect-[4/3] max-w-3xl'
            }`}
          >
            <video
              ref={videoRef}
              src="/assets/aistudio/Discover_Hidden_African_Villages_A_Cinematic_Teaser_5481f979.mp4"
              autoPlay
              playsInline
              loop
              onTimeUpdate={handleTimeUpdate}
              className="w-full h-full object-cover"
            />

            {/* Vignette & Anamorphic Letterbox mask */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/50 via-transparent to-black/30" />
            <div className="absolute inset-0 pointer-events-none film-grain" />

            {/* On-screen quick play overlay */}
            <button
              type="button"
              onClick={togglePlay}
              className="absolute inset-0 flex items-center justify-center cursor-pointer bg-transparent group"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {!isPlaying && (
                <div className="w-20 h-20 rounded-full bg-white/90 text-black flex items-center justify-center shadow-2xl transition-transform transform scale-100 group-hover:scale-110">
                  <Play className="w-8 h-8 fill-current translate-x-0.5" />
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Playback Controls & Timecode Bar */}
        <div className="px-6 py-4 bg-[#0d0d0d] border-t border-white/10 flex flex-col gap-3">
          {/* Progress scrubber */}
          <div className="relative w-full flex items-center">
            <input
              type="range"
              min={0}
              max={duration || 100}
              step={0.1}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white hover:bg-white/30 transition-colors"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={togglePlay}
                className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
              </button>
              <button
                type="button"
                onClick={toggleMute}
                className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <div className="font-mono text-xs text-white/80 tabular-nums">
                <span>{formatTimecode(currentTime)}</span>
                <span className="text-white/40"> / </span>
                <span className="text-white/50">{formatTimecode(duration)}</span>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-6 text-xs text-white/50">
              <span>DP: Aimé Mugisha</span>
              <span>·</span>
              <span>Motion: Kalisa Tuvugane</span>
              <span>·</span>
              <span>Grade: DaVinci HDR</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
