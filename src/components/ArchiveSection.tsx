import { useState } from 'react';
import { ARCHIVE_STILLS } from '../data/portfolioData';
import { ArchiveStill } from '../types';
import { X, Camera, MapPin, Maximize2, ArrowLeft, ArrowRight } from 'lucide-react';

export default function ArchiveSection() {
  const [selectedStill, setSelectedStill] = useState<ArchiveStill | null>(null);

  const openLightbox = (still: ArchiveStill) => {
    setSelectedStill(still);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedStill(null);
    document.body.style.overflow = '';
  };

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

  return (
    <section id="archive" className="relative w-full py-28 md:py-36 bg-[#080808] text-white border-t border-white/10">
      <div className="w-full px-6 md:px-12 lg:px-16 space-y-16">
        {/* Section Header: Full Screen Width */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div className="space-y-3">
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-7xl tracking-tight text-white">
              Stills from the Field
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-white/60 font-light leading-relaxed">
            Raw frames, optical experiments, and behind-the-lens documentation captured across Rwanda's landscapes and international film sets.
          </p>
        </div>

        {/* Stills Grid: Full Screen Width */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ARCHIVE_STILLS.map((still) => (
            <div
              key={still.id}
              onClick={() => openLightbox(still)}
              data-cursor="EXPAND"
              className="group cursor-pointer flex flex-col rounded-xl overflow-hidden bg-[#0e0e0e] border border-white/10 hover:border-white/30 transition-all duration-300"
            >
              {/* Still Photo Container */}
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-black">
                <img
                  src={still.imageUrl}
                  alt={still.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center filter brightness-80 group-hover:brightness-95 group-hover:scale-105 transition-all duration-700 ease-out"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />
                <div className="absolute inset-0 film-grain pointer-events-none" />

                {/* Top Location Pill */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-white/80">
                  <span className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded border border-white/10">
                    <MapPin className="w-3 h-3 text-white" />
                    <span className="truncate max-w-[160px]">{still.location}</span>
                  </span>
                  <span className="bg-black/60 backdrop-blur-md px-2 py-1 rounded border border-white/10">
                    {still.year}
                  </span>
                </div>

                {/* Bottom Overlay Title */}
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between z-10">
                  <div className="space-y-0.5 max-w-[80%]">
                    <span className="text-[10px] font-mono text-white/60 uppercase block">
                      {still.project}
                    </span>
                    <h4 className="font-display font-bold text-base text-white group-hover:text-white/90 truncate">
                      {still.title}
                    </h4>
                  </div>
                  <div className="p-2 rounded-full bg-white/10 text-white group-hover:bg-white group-hover:text-black transition-colors">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              {/* Technical EXIF Strip */}
              <div className="px-5 py-3 bg-[#0a0a0a] border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-white/40">
                <div className="flex items-center gap-2 truncate">
                  <Camera className="w-3 h-3 shrink-0 text-white/30" />
                  <span className="truncate">{still.camera} · {still.lens}</span>
                </div>
                <span className="shrink-0 text-white/60 ml-2">{still.exif}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedStill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/98 backdrop-blur-2xl p-4 md:p-8 animate-in fade-in duration-200">
          <div className="relative w-full max-w-5xl bg-[#0a0a0a] border border-white/15 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0d0d0d]">
              <div className="space-y-0.5">
                <span className="text-xs font-mono text-white/50 uppercase">
                  {selectedStill.project} · {selectedStill.year}
                </span>
                <h3 className="font-display font-bold text-lg text-white">
                  {selectedStill.title}
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 bg-white/5 rounded-lg p-0.5 border border-white/10">
                  <button
                    type="button"
                    onClick={navigatePrev}
                    className="p-1.5 rounded text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                    aria-label="Previous still"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <span className="px-2 font-mono text-xs text-white/40 tabular-nums">
                    {currentIndex + 1} / {ARCHIVE_STILLS.length}
                  </span>
                  <button
                    type="button"
                    onClick={navigateNext}
                    className="p-1.5 rounded text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                    aria-label="Next still"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={closeLightbox}
                  className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                  aria-label="Close lightbox"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="relative w-full aspect-[16/10] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={selectedStill.imageUrl}
                alt={selectedStill.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
              <div className="absolute inset-0 film-grain pointer-events-none" />
            </div>

            <div className="p-6 bg-[#0c0c0c] border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
              <div>
                <span className="text-white/40 block">CAMERA SYSTEM</span>
                <span className="text-white font-medium">{selectedStill.camera}</span>
              </div>
              <div>
                <span className="text-white/40 block">OPTICS &amp; LENS</span>
                <span className="text-white font-medium">{selectedStill.lens}</span>
              </div>
              <div>
                <span className="text-white/40 block">EXPOSURE &amp; FILTRATION</span>
                <span className="text-white font-medium">{selectedStill.exif}</span>
              </div>
              <div>
                <span className="text-white/40 block">LOCATION</span>
                <span className="text-white font-medium truncate block">{selectedStill.location}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
