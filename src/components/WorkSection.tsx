import { useState } from 'react';
import { Project } from '../types';
import { ArrowUpRight, Play } from 'lucide-react';

interface WorkSectionProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export default function WorkSection({ projects, onSelectProject }: WorkSectionProps) {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const categories = ['All', 'Film & Documentary', 'Motion & 3D', 'Commercials'];

  const filteredProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="work" className="relative w-full py-28 md:py-36 bg-[#050505] text-white border-t border-white/10">
      <div className="w-full px-6 md:px-12 lg:px-16 space-y-12">
        {/* Section Header: Full Screen Width */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-white/10">
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-white/50">
              Selected Portfolio · 2023–2025
            </span>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-7xl tracking-tight text-white">
              Featured Work
            </h2>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white/5 rounded-full border border-white/10">
            {categories.map((cat) => {
              const isActive = activeFilter === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveFilter(cat)}
                  className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'bg-white text-black font-semibold shadow-sm'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bento Grid: Full Screen Width Presence */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 pt-4">
          {filteredProjects.map((project, idx) => {
            const isWide = idx === 0 || idx === 3;
            return (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                data-cursor="VIEW"
                className={`group cursor-pointer flex flex-col justify-between overflow-hidden rounded-2xl bg-[#0c0c0c] border border-white/10 hover:border-white/30 transition-all duration-500 ${
                  isWide ? 'md:col-span-8' : 'md:col-span-4'
                }`}
              >
                {/* Visual Media Container */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-zinc-950">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center filter brightness-80 group-hover:brightness-95 group-hover:scale-105 transition-all duration-700 ease-out"
                  />

                  {/* Scrim overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-black/30 to-transparent opacity-85 group-hover:opacity-65 transition-opacity" />
                  <div className="absolute inset-0 film-grain pointer-events-none" />

                  {/* Category Pill / Duration badge */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="text-[11px] font-mono tracking-wider uppercase text-white/70 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded border border-white/10">
                      {project.category}
                    </span>
                    <span className="text-[11px] font-mono text-white/70 bg-black/60 backdrop-blur-md px-2 py-1 rounded border border-white/10 flex items-center gap-1">
                      <Play className="w-2.5 h-2.5 fill-current" />
                      {project.videoDuration}
                    </span>
                  </div>

                  {/* Hover expansion button */}
                  <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-lg">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>

                {/* Card Editorial Footer */}
                <div className="p-6 md:p-8 space-y-3">
                  <div className="flex items-center justify-between text-xs text-white/40 font-mono">
                    <span>{project.client}</span>
                    <span>{project.year}</span>
                  </div>

                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-white group-hover:text-white/90 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-white/60 line-clamp-2 font-light leading-relaxed">
                    {project.summary}
                  </p>

                  <div className="pt-2 flex items-center gap-2 text-xs font-mono text-white/40">
                    <span>Role:</span>
                    <span className="text-white/70">{project.role}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
