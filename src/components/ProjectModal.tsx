import { useEffect } from 'react';
import { Project } from '../types';
import { X, ArrowLeft, ArrowRight, Play, Check, UserCheck } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl overflow-y-auto p-4 md:p-8 animate-in fade-in duration-300">
      <div className="relative w-full max-w-6xl my-auto bg-[#0a0a0a] border border-white/15 rounded-2xl overflow-hidden shadow-[0_20px_70px_rgba(0,0,0,0.9)] flex flex-col">
        {/* Modal Top Control Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-white/50 uppercase tracking-wider">
              {project.category}
            </span>
            <span className="text-white/20">/</span>
            <span className="font-display font-bold text-sm sm:text-base tracking-wide text-white truncate max-w-xs md:max-w-md">
              {project.title}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Next / Prev pagination */}
            <div className="flex items-center gap-1 bg-white/5 rounded-lg p-0.5 border border-white/10">
              <button
                type="button"
                onClick={navigatePrev}
                className="p-1.5 rounded text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Previous project"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <span className="px-2 font-mono text-xs text-white/40 tabular-nums">
                {currentIndex + 1} / {projects.length}
              </span>
              <button
                type="button"
                onClick={navigateNext}
                className="p-1.5 rounded text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Next project"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Close project modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content Scrollable Area */}
        <div className="p-6 md:p-10 space-y-12 overflow-y-auto max-h-[82vh]">
          {/* Main Visual Stage */}
          <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black border border-white/10 group">
            {project.videoUrl ? (
              <video
                src={project.videoUrl}
                autoPlay
                muted
                loop
                playsInline
                poster={project.imageUrl}
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={project.imageUrl}
                alt={project.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

            {/* Bottom Title Overlay */}
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between pointer-events-none">
              <div>
                <p className="text-xs font-mono uppercase tracking-widest text-white/70">
                  {project.client} · {project.year}
                </p>
                <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
                  {project.title}
                </h2>
              </div>
              <div className="hidden sm:flex items-center gap-2 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-mono text-white/80">
                <Play className="w-3 h-3 fill-current text-white" />
                <span>{project.videoDuration}</span>
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-6 bg-white/[0.02] border border-white/10 rounded-xl">
            {project.metrics.map((metric, idx) => (
              <div key={idx} className="space-y-1">
                <span className="text-[11px] font-mono text-white/40 uppercase tracking-wider block">
                  {metric.label}
                </span>
                <span className="font-display font-bold text-2xl text-white tabular-nums">
                  {metric.value}
                </span>
              </div>
            ))}
          </div>

          {/* Narrative & Details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <h3 className="font-display font-bold text-xl text-white">Narrative Brief</h3>
                <p className="text-base text-white/80 leading-relaxed font-light">
                  {project.narrative}
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-white/10">
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-white/90">The Technical Challenge</h4>
                  <p className="text-sm text-white/60 leading-relaxed font-light">
                    {project.challenge}
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-white/90">Our Cinematic Solution</h4>
                  <p className="text-sm text-white/60 leading-relaxed font-light">
                    {project.solution}
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-8">
              {/* Deliverables Suite */}
              <div className="space-y-3 p-6 bg-white/[0.02] border border-white/10 rounded-xl">
                <h4 className="text-xs font-mono uppercase tracking-widest text-white/70 flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>Deliverables Suite</span>
                </h4>
                <ul className="space-y-2 text-xs text-white/80">
                  {project.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-white/30">―</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Credits */}
              <div className="space-y-3 p-6 bg-white/[0.02] border border-white/10 rounded-xl">
                <h4 className="text-xs font-mono uppercase tracking-widest text-white/70 flex items-center gap-2">
                  <UserCheck className="w-3.5 h-3.5 text-white" />
                  <span>Production Credits</span>
                </h4>
                <div className="divide-y divide-white/5 text-xs">
                  {project.credits.map((credit, idx) => (
                    <div key={idx} className="py-2 flex items-center justify-between">
                      <span className="text-white/50">{credit.role}</span>
                      <span className="text-white font-medium">{credit.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Stills Breakdown Gallery */}
          <div className="space-y-4 pt-6 border-t border-white/10">
            <h3 className="font-display font-bold text-lg text-white">Film Stills &amp; Frame Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {project.galleryImages.map((img, idx) => (
                <div key={idx} className="space-y-2 group">
                  <div className="aspect-video rounded-lg overflow-hidden border border-white/10 relative bg-black">
                    {img.imageUrl ? (
                      <img
                        src={img.imageUrl}
                        alt={img.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center filter brightness-85 group-hover:brightness-100 transition-all duration-500"
                      />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${img.gradient}`} />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                    <span className="absolute bottom-2 left-3 right-3 text-xs font-medium text-white truncate">
                      {img.title}
                    </span>
                  </div>
                  <p className="text-[11px] font-mono text-white/50 leading-tight">
                    {img.caption}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Next/Prev */}
          <div className="pt-6 border-t border-white/10 flex items-center justify-between">
            <button
              type="button"
              onClick={navigatePrev}
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white/60 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous Project</span>
            </button>
            <button
              type="button"
              onClick={navigateNext}
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white/60 hover:text-white transition-colors"
            >
              <span>Next Project</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
