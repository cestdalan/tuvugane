import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Project } from '../types';
import { LayoutGrid, Rows, List, ArrowUpRight } from 'lucide-react';
import BlurImage from './BlurImage';

interface WorkSectionProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

type ViewMode = 'grid' | 'editorial' | 'list';

/**
 * Parallax Card for Gallery Grid:
 * Uses scroll-linked progress to gently glide the image vertically inside its container
 */
function ParallaxGridCard({
  project,
  idx,
  onClick,
}: {
  project: Project;
  idx: number;
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  // Light, refined scroll parallax: translates slightly as it moves through viewport
  const y = useTransform(scrollYProgress, [0, 1], [-18, 18]);

  const isTall = project.aspectRatio === 'portrait';

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: (idx % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      data-cursor="VIEW"
      className="group cursor-pointer flex flex-col justify-between overflow-hidden bg-[#0a0a0a] border border-white/10 hover:border-white/30 transition-all duration-500 font-liber"
    >
      {/* Outer Viewport Box with overflow-hidden */}
      <div
        className={`relative w-full overflow-hidden bg-zinc-950 ${
          isTall ? 'aspect-[3/4]' : 'aspect-[16/10]'
        }`}
      >
        {/* Parallax Inner Container: Slightly oversized height to allow vertical glide */}
        <motion.div style={{ y }} className="w-full h-[116%] -top-[8%] relative">
          <BlurImage
            src={project.imageUrl}
            alt={project.title}
            priority={idx < 4}
            className="group-hover:brightness-105 group-hover:scale-102 transition-transform duration-700 ease-out"
          />
        </motion.div>

        {/* Ambient Grain & Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-70 group-hover:opacity-40 transition-opacity pointer-events-none" />
        <div className="absolute inset-0 film-grain pointer-events-none" />

        {/* Corner Metadata */}
        <div className="absolute top-3 left-3 text-[10px] font-liber font-medium text-white/70 uppercase tracking-wider">
          {project.category}
        </div>
        <div className="absolute top-3 right-3 text-[10px] font-liber text-white/50">
          {project.year}
        </div>

        {/* Bottom Hover Icon */}
        <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>

      {/* Minimal Caption Footer */}
      <div className="p-4 md:p-5 flex items-baseline justify-between gap-4 border-t border-white/5">
        <div>
          <h3 className="font-liber font-bold text-lg sm:text-xl text-white group-hover:text-white/80 transition-colors">
            {project.title}
          </h3>
          <p className="text-xs text-white/50 font-light mt-0.5 line-clamp-1">
            {project.summary}
          </p>
        </div>
        <span className="text-[11px] font-liber text-white/40 shrink-0">
          {project.client.split('&')[0]}
        </span>
      </div>
    </motion.div>
  );
}

/**
 * Parallax Card for Editorial Feed
 */
function ParallaxEditorialCard({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-25, 25]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      data-cursor="EXPAND"
      className="group cursor-pointer grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-white/10 pb-16 font-liber"
    >
      {/* Main Large Visual Frame with light parallax */}
      <div className="lg:col-span-8 relative aspect-[16/9] overflow-hidden bg-black border border-white/10 group-hover:border-white/30 transition-all">
        <motion.div style={{ y }} className="w-full h-[116%] -top-[8%] relative">
          <BlurImage
            src={project.imageUrl}
            alt={project.title}
            className="group-hover:scale-102 transition-transform duration-700"
          />
        </motion.div>
        <div className="absolute inset-0 film-grain pointer-events-none" />
      </div>

      {/* Right Side Editorial Notes */}
      <div className="lg:col-span-4 space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-xs font-liber text-white/40 uppercase tracking-wider">
            <span>{project.category}</span>
            <span>·</span>
            <span>{project.year}</span>
          </div>

          <h3 className="font-liber font-bold text-3xl sm:text-4xl text-white group-hover:text-white/80 transition-colors">
            {project.title}
          </h3>

          <p className="text-sm text-white/60 font-light leading-relaxed pt-2">
            {project.summary}
          </p>
        </div>

        {/* Technical Lens & Camera Detail */}
        {project.camera && (
          <div className="text-xs font-liber text-white/40">
            <span className="block text-white/20 uppercase tracking-widest text-[10px]">Capture</span>
            <span>{project.camera}</span>
          </div>
        )}

        {/* Auxiliary Stills Ribbon */}
        {project.galleryImages && project.galleryImages.length > 1 && (
          <div className="pt-2">
            <span className="text-[10px] font-liber text-white/40 uppercase tracking-wider block mb-2">
              Frames Archive
            </span>
            <div className="flex items-center gap-2">
              {project.galleryImages.map((img, iIdx) => (
                <div
                  key={iIdx}
                  className="w-16 h-12 rounded overflow-hidden border border-white/10 bg-black/60 shrink-0"
                >
                  <BlurImage
                    src={img.imageUrl || project.imageUrl}
                    alt={img.title}
                    className="filter brightness-75 hover:brightness-100 transition-all"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="pt-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-liber font-bold uppercase tracking-wider text-white border-b border-white pb-0.5 group-hover:border-white/40 transition-colors">
            <span>View Film &amp; Stills</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function WorkSection({ projects, onSelectProject }: WorkSectionProps) {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  // Pure categories without numbers
  const categories = ['All', 'Film & Documentary', 'Commercials', 'Motion & 3D'];

  const filteredProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  const handleMouseMove = (e: React.MouseEvent) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  return (
    <section
      id="work"
      className="relative w-full py-24 md:py-32 bg-[#050505] text-white border-t border-white/10 overflow-hidden font-liber"
      onMouseMove={handleMouseMove}
    >
      <div className="w-full px-6 md:px-12 lg:px-16 space-y-12">
        {/* Gallery Section Header & Controls in Liber font */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10"
        >
          <div className="space-y-2">
            <span className="text-[11px] font-liber uppercase tracking-[0.2em] text-white/40 block">
              Gallery Works
            </span>
            <h2 className="font-liber font-black text-4xl sm:text-6xl tracking-tight text-white">
              Selected <span className="font-liber font-light text-white/70">Works</span>
            </h2>
          </div>

          {/* Interactive Filters & View Mode Toggles */}
          <div className="flex flex-wrap items-center justify-between md:justify-end gap-4">
            {/* Category Filter (NO numbers) */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => {
                const isActive = activeFilter === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveFilter(cat)}
                    className={`px-3 py-1 text-xs font-liber tracking-wide transition-colors ${
                      isActive
                        ? 'text-white font-bold border-b-2 border-white'
                        : 'text-white/40 hover:text-white/80'
                    }`}
                  >
                    <span>{cat}</span>
                  </button>
                );
              })}
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center gap-1 border-l border-white/10 pl-4">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded transition-colors ${
                  viewMode === 'grid' ? 'text-white bg-white/10' : 'text-white/40 hover:text-white'
                }`}
                title="Gallery Grid"
                aria-label="Grid view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('editorial')}
                className={`p-1.5 rounded transition-colors ${
                  viewMode === 'editorial' ? 'text-white bg-white/10' : 'text-white/40 hover:text-white'
                }`}
                title="Editorial Feed"
                aria-label="Editorial view"
              >
                <Rows className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded transition-colors ${
                  viewMode === 'list' ? 'text-white bg-white/10' : 'text-white/40 hover:text-white'
                }`}
                title="Index List"
                aria-label="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* 1. GALLERY GRID MODE (with scroll parallax and skeleton blur) */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 pt-4">
            {filteredProjects.map((project, idx) => (
              <ParallaxGridCard
                key={project.id}
                project={project}
                idx={idx}
                onClick={() => onSelectProject(project)}
              />
            ))}
          </div>
        )}

        {/* 2. EDITORIAL FEED MODE (with scroll parallax and skeleton blur) */}
        {viewMode === 'editorial' && (
          <div className="space-y-16 md:space-y-24 pt-4">
            {filteredProjects.map((project) => (
              <ParallaxEditorialCard
                key={project.id}
                project={project}
                onClick={() => onSelectProject(project)}
              />
            ))}
          </div>
        )}

        {/* 3. INDEX / LIST MODE (No numbers, clean Liber font) */}
        {viewMode === 'list' && (
          <div className="pt-4 divide-y divide-white/10 border-b border-white/10">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                onMouseEnter={() => setHoveredProject(project)}
                onMouseLeave={() => setHoveredProject(null)}
                data-cursor="VIEW"
                className="group py-6 md:py-8 cursor-pointer grid grid-cols-12 gap-4 items-center hover:bg-white/[0.02] transition-colors px-2"
              >
                <div className="col-span-7 md:col-span-6 font-liber font-bold text-xl sm:text-2xl text-white group-hover:text-white/80 transition-colors">
                  {project.title}
                </div>
                <div className="col-span-5 md:col-span-3 text-xs font-liber text-white/50 truncate">
                  {project.client}
                </div>
                <div className="hidden md:block md:col-span-2 text-xs font-liber text-white/40">
                  {project.category}
                </div>
                <div className="hidden md:flex md:col-span-1 justify-end font-liber text-xs text-white/40">
                  {project.year}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Floating Cursor Preview for List Mode */}
        <AnimatePresence>
          {viewMode === 'list' && hoveredProject && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              style={{
                position: 'fixed',
                left: cursorPos.x + 24,
                top: cursorPos.y - 100,
                pointerEvents: 'none',
                zIndex: 60,
              }}
              className="w-56 h-36 rounded-lg overflow-hidden border border-white/20 shadow-2xl bg-black hidden lg:block"
            >
              <BlurImage
                src={hoveredProject.imageUrl}
                alt={hoveredProject.title}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
