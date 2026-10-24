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
 * The card is the exact size of the image, with the photo filling the entire card.
 * Minimal overlay for title & category; no years, no separate footer block.
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

  // Light, refined scroll parallax
  const y = useTransform(scrollYProgress, [0, 1], [-16, 16]);
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
      className={`group cursor-pointer relative overflow-hidden bg-[#0a0a0a] border border-white/10 hover:border-white/30 transition-all duration-500 font-liber w-full ${
        isTall ? 'aspect-[3/4]' : 'aspect-[16/10]'
      }`}
    >
      {/* 1. Full-Bleed Image Filling the Entire Card with Parallax */}
      <motion.div style={{ y }} className="w-full h-[116%] -top-[8%] relative">
        <BlurImage
          src={project.imageUrl}
          alt={project.title}
          priority={idx < 4}
          className="group-hover:brightness-105 group-hover:scale-102 transition-transform duration-700 ease-out"
        />
      </motion.div>

      {/* 2. Ambient Film Grain */}
      <div className="absolute inset-0 film-grain pointer-events-none" />

      {/* 3. Top Category Label (No year) */}
      <div className="absolute top-3.5 left-3.5 z-10 pointer-events-none">
        <span className="text-[10px] font-liber font-semibold text-white/80 uppercase tracking-widest bg-black/40 backdrop-blur-md px-2.5 py-1 rounded">
          {project.category}
        </span>
      </div>

      {/* 4. Integrated Bottom Caption Overlay Inside the Card */}
      <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-end justify-between gap-4 z-10 pointer-events-none">
        <div className="space-y-1">
          <span className="text-[11px] font-liber text-white/60 block">
            {project.client}
          </span>
          <h3 className="font-liber font-bold text-lg sm:text-xl text-white group-hover:text-white/80 transition-colors">
            {project.title}
          </h3>
        </div>

        <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 shrink-0">
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Parallax Card for Editorial Feed (No years)
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
      {/* Main Large Visual Frame */}
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

      {/* Right Side Editorial Notes (No year) */}
      <div className="lg:col-span-4 space-y-6">
        <div className="space-y-2">
          <div className="text-xs font-liber text-white/50 uppercase tracking-wider font-semibold">
            {project.category}
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

        {/* 1. GALLERY GRID MODE (Cards ARE the size of the images, no years) */}
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

        {/* 2. EDITORIAL FEED MODE */}
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

        {/* 3. INDEX / LIST MODE (No numbers, no years) */}
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
                <div className="col-span-7 md:col-span-8 font-liber font-bold text-xl sm:text-2xl text-white group-hover:text-white/80 transition-colors">
                  {project.title}
                </div>
                <div className="col-span-5 md:col-span-4 text-xs font-liber text-white/50 text-right md:text-left truncate">
                  {project.client} · {project.category}
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
