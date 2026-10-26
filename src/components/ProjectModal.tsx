import { useState, useEffect } from 'react';
import { Project } from '../types';
import { X, ArrowLeft, ArrowRight } from 'lucide-react';
import BlurImage from './BlurImage';

interface ProjectModalProps {
  project: Project | null;
  projects: Project[];
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (project: Project) => void;
}

export default function ProjectModal({
  project,
  projects,
  isOpen,
  onClose,
  onSelectProject,
}: ProjectModalProps) {
  const [activeMediaUrl, setActiveMediaUrl] = useState<string>('');

  useEffect(() => {
    if (project) {
      setActiveMediaUrl(project.imageUrl);
    }
  }, [project]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && project) navigateNext();
      if (e.key === 'ArrowLeft' && project) navigatePrev();
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, project]);

  if (!isOpen || !project) return null;

  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const navigateNext = () => {
    const nextIdx = (currentIndex + 1) % projects.length;
    onSelectProject(projects[nextIdx]);
  };
  const navigatePrev = () => {
    const prevIdx = (currentIndex - 1 + projects.length) % projects.length;
    onSelectProject(projects[prevIdx]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl p-2 sm:p-6 md:p-10 animate-in fade-in duration-300 font-liber">
      <div className="relative w-full max-w-5xl max-h-[92vh] flex flex-col bg-[#0c0c0c] border border-white/15 rounded-xl overflow-hidden shadow-2xl">
        {/* Top Minimal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/50 backdrop-blur-md">
          <div className="flex items-center gap-3 text-xs font-liber">
            <span className="text-white/40 uppercase">{project.category}</span>
            <span className="text-white/20">/</span>
            <span className="text-white font-semibold">{project.title}</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-white/5 rounded p-1 border border-white/10">
              <button
                type="button"
                onClick={navigatePrev}
                className="p-1 text-white/60 hover:text-white transition-colors"
                aria-label="Previous project"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={navigateNext}
                className="p-1 text-white/60 hover:text-white transition-colors"
                aria-label="Next project"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-black transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Gallery Content */}
        <div className="overflow-y-auto flex-1 p-6 md:p-8 space-y-6">
          {/* Main Visual Stage with Blur Load */}
          <div className="relative w-full aspect-video rounded overflow-hidden bg-black border border-white/10 group">
            {project.videoUrl && activeMediaUrl === project.imageUrl ? (
              <video
                src={project.videoUrl}
                autoPlay
                muted
                loop
                playsInline
                poster={project.imageUrl}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out"
              />
            ) : (
              <BlurImage
                src={activeMediaUrl || project.imageUrl}
                alt={project.title}
                priority={true}
                className="grayscale group-hover:grayscale-0 transition-all duration-700 ease-out"
              />
            )}
            <div className="absolute inset-0 film-grain pointer-events-none" />
          </div>

          {/* Auxiliary Gallery Stills Ribbon with Skeleton Blur Load */}
          {project.galleryImages && project.galleryImages.length > 0 && (
            <div className="space-y-2">
              <span className="text-[10px] font-liber uppercase tracking-wider text-white/40 block">
                Stills Archive
              </span>
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {/* Default main photo */}
                <button
                  type="button"
                  onClick={() => setActiveMediaUrl(project.imageUrl)}
                  className={`w-24 aspect-[16/10] rounded overflow-hidden border shrink-0 transition-all group ${
                    activeMediaUrl === project.imageUrl
                      ? 'border-white ring-1 ring-white'
                      : 'border-white/20 opacity-60 hover:opacity-100'
                  }`}
                >
                  <BlurImage
                    src={project.imageUrl}
                    alt="Main still"
                    className="grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </button>

                {/* Additional gallery stills */}
                {project.galleryImages.map((img, idx) => {
                  const imgUrl = img.imageUrl || project.imageUrl;
                  const isCurrent = activeMediaUrl === imgUrl;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveMediaUrl(imgUrl)}
                      className={`w-24 aspect-[16/10] rounded overflow-hidden border shrink-0 transition-all group ${
                        isCurrent
                          ? 'border-white ring-1 ring-white'
                          : 'border-white/20 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <BlurImage
                        src={imgUrl}
                        alt={img.title}
                        className="grayscale group-hover:grayscale-0 transition-all duration-300"
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Minimal 2-Column Metadata & Context */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4 border-t border-white/10">
            <div className="md:col-span-8 space-y-3">
              <h3 className="font-liber font-bold text-2xl sm:text-3xl text-white">
                {project.title}
              </h3>
              <p className="text-sm text-white/70 font-light leading-relaxed">
                {project.summary}
              </p>
            </div>

            <div className="md:col-span-4 space-y-4 text-xs font-liber">
              <div className="space-y-1">
                <span className="text-white/40 uppercase text-[10px] block">Client / Context</span>
                <span className="text-white">{project.client}</span>
              </div>

              {project.credits && project.credits.length > 0 && (
                <div className="space-y-1">
                  <span className="text-white/40 uppercase text-[10px] block">Credits</span>
                  <div className="space-y-0.5 text-white/70">
                    {project.credits.map((c, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="text-white/40">{c.role}:</span>
                        <span>{c.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
