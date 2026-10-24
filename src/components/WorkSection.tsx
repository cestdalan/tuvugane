import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../types';
import { LayoutGrid, Rows, List, ArrowUpRight } from 'lucide-react';
import BlurImage from './BlurImage';

interface WorkSectionProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

type ViewMode = 'grid' | 'editorial' | 'list';

/**
 * Mosaic Cell component that fits inside the Big Perfect Square
 */
function SquareMosaicCard({
  project,
  spanClass,
  isLarge,
  onClick,
}: {
  project: Project;
  spanClass: string;
  isLarge: boolean;
  onClick: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      data-cursor="VIEW"
      className={`group cursor-pointer relative overflow-hidden bg-[#0c0c0c] border border-white/10 hover:border-white/40 transition-all duration-500 rounded-sm font-liber ${spanClass}`}
    >
      {/* Photo fills the entire cell */}
      <BlurImage
        src={project.imageUrl}
        alt={project.title}
        priority={isLarge}
        className="w-full h-full object-cover group-hover:scale-105 group-hover:brightness-105 transition-all duration-700 ease-out"
      />

      <div className="absolute inset-0 film-grain pointer-events-none" />

      {/* Dark gradient overlay on hover and bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent opacity-65 group-hover:opacity-90 transition-opacity pointer-events-none" />

      {/* Top category label for large blocks */}
      {isLarge && (
        <div className="absolute top-3 left-3 pointer-events-none z-10">
          <span className="text-[9px] sm:text-[10px] font-liber font-semibold text-white/90 uppercase tracking-widest bg-black/60 backdrop-blur-md px-2 py-0.5 rounded">
            {project.category}
          </span>
        </div>
      )}

      {/* Bottom details overlay */}
      <div className="absolute inset-x-0 bottom-0 p-2.5 sm:p-4 z-10 pointer-events-none flex items-end justify-between gap-2">
        <div className="space-y-0.5 overflow-hidden">
          <span className="text-[9px] sm:text-[10px] font-liber text-white/60 block truncate">
            {project.client.split('&')[0]}
          </span>
          <h3
            className={`font-liber font-bold text-white group-hover:text-white/90 transition-colors truncate ${
              isLarge ? 'text-sm sm:text-lg md:text-xl' : 'text-xs sm:text-sm'
            }`}
          >
            {project.title}
          </h3>
        </div>

        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 shrink-0">
          <ArrowUpRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Parallax Card for Editorial Feed
 */
function EditorialFeedCard({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      data-cursor="EXPAND"
      className="group cursor-pointer grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-white/10 pb-16 font-liber"
    >
      <div className="lg:col-span-8 relative aspect-[16/9] overflow-hidden bg-black border border-white/10 group-hover:border-white/30 transition-all rounded">
        <BlurImage
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
        />
        <div className="absolute inset-0 film-grain pointer-events-none" />
      </div>

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

        {project.camera && (
          <div className="text-xs font-liber text-white/40">
            <span className="block text-white/20 uppercase tracking-widest text-[10px]">Capture</span>
            <span>{project.camera}</span>
          </div>
        )}

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

  const categories = ['All', 'Film & Documentary', 'Commercials', 'Motion & 3D'];

  const filteredProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  const handleMouseMove = (e: React.MouseEvent) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  /**
   * Calculates the exact grid tessellation so that the items form a BIG PERFECT SQUARE
   */
  const getSquareLayout = (itemsCount: number) => {
    if (itemsCount === 10) {
      // 4x4 Grid = 16 cells (2x2 + 8 1x1 + 2x2 = 16 cells). Complete big perfect square!
      return {
        gridClass: 'grid-cols-4 grid-rows-4',
        spans: [
          { span: 'col-span-2 row-span-2', isLarge: true },
          { span: 'col-span-1 row-span-1', isLarge: false },
          { span: 'col-span-1 row-span-1', isLarge: false },
          { span: 'col-span-1 row-span-1', isLarge: false },
          { span: 'col-span-1 row-span-1', isLarge: false },
          { span: 'col-span-1 row-span-1', isLarge: false },
          { span: 'col-span-1 row-span-1', isLarge: false },
          { span: 'col-span-1 row-span-1', isLarge: false },
          { span: 'col-span-1 row-span-1', isLarge: false },
          { span: 'col-span-2 row-span-2', isLarge: true },
        ],
      };
    }
    if (itemsCount === 4) {
      // 2x2 Grid = 4 cells = Big Perfect Square
      return {
        gridClass: 'grid-cols-2 grid-rows-2',
        spans: [
          { span: 'col-span-1 row-span-1', isLarge: true },
          { span: 'col-span-1 row-span-1', isLarge: true },
          { span: 'col-span-1 row-span-1', isLarge: true },
          { span: 'col-span-1 row-span-1', isLarge: true },
        ],
      };
    }
    if (itemsCount === 3) {
      // 2x2 Grid with 1 top hero and 2 bottom squares = Big Perfect Square
      return {
        gridClass: 'grid-cols-2 grid-rows-2',
        spans: [
          { span: 'col-span-2 row-span-1', isLarge: true },
          { span: 'col-span-1 row-span-1', isLarge: false },
          { span: 'col-span-1 row-span-1', isLarge: false },
        ],
      };
    }
    return {
      gridClass: 'grid-cols-3 grid-rows-3',
      spans: Array.from({ length: itemsCount }, () => ({
        span: 'col-span-1 row-span-1',
        isLarge: false,
      })),
    };
  };

  const squareConfig = getSquareLayout(filteredProjects.length);

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
            {/* Category Filter */}
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
                title="Big Perfect Square Gallery"
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

        {/* 1. BIG PERFECT SQUARE GALLERY MODE */}
        {viewMode === 'grid' && (
          <div className="w-full flex items-center justify-center pt-2">
            <div className="w-full max-w-[min(92vw,920px)] aspect-square relative">
              <div
                className={`grid ${squareConfig.gridClass} gap-2 sm:gap-3 w-full h-full aspect-square`}
              >
                {filteredProjects.map((project, idx) => {
                  const conf = squareConfig.spans[idx] || {
                    span: 'col-span-1 row-span-1',
                    isLarge: false,
                  };
                  return (
                    <SquareMosaicCard
                      key={project.id}
                      project={project}
                      spanClass={conf.span}
                      isLarge={conf.isLarge}
                      onClick={() => onSelectProject(project)}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* 2. EDITORIAL FEED MODE */}
        {viewMode === 'editorial' && (
          <div className="space-y-16 md:space-y-24 pt-4">
            {filteredProjects.map((project) => (
              <EditorialFeedCard
                key={project.id}
                project={project}
                onClick={() => onSelectProject(project)}
              />
            ))}
          </div>
        )}

        {/* 3. INDEX / LIST MODE */}
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
