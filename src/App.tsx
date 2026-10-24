import { useState, useEffect, useCallback } from 'react';
import { PROJECTS } from './data/portfolioData';
import { Project } from './types';
import CustomCursor from './components/CustomCursor';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import WorkSection from './components/WorkSection';
import ArchiveSection from './components/ArchiveSection';
import ServicesSection from './components/ServicesSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ShowreelModal from './components/ShowreelModal';
import ProjectModal from './components/ProjectModal';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isShowreelOpen, setIsShowreelOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [preselectedService, setPreselectedService] = useState<string>('');

  // Smooth scroll using absolute document coordinates
  const scrollToSection = useCallback((sectionId: string, updateHistory = true) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const targetTop = element.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({
        top: Math.max(0, targetTop),
        behavior: 'smooth',
      });
      if (updateHistory) {
        window.history.pushState(null, '', `#${sectionId}`);
      }
      setActiveSection(sectionId);
    }
  }, []);

  // Handle URL hash on initial load and hash change
  useEffect(() => {
    const handleHashRouting = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash) return;

      if (hash.startsWith('project-')) {
        const slug = hash.replace('project-', '');
        const matched = PROJECTS.find((p) => p.slug === slug);
        if (matched) {
          setSelectedProject(matched);
        }
      } else {
        const validSections = ['hero', 'work', 'archive', 'what-we-do', 'about', 'contact'];
        if (validSections.includes(hash)) {
          setTimeout(() => {
            scrollToSection(hash, false);
          }, 150);
        }
      }
    };

    handleHashRouting();
    window.addEventListener('hashchange', handleHashRouting);
    return () => window.removeEventListener('hashchange', handleHashRouting);
  }, [scrollToSection]);

  // ScrollSpy tracking sections
  useEffect(() => {
    const sectionIds = ['hero', 'work', 'archive', 'what-we-do', 'about', 'contact'];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 140;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (scrollPos >= top) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Project Modal Handlers
  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    window.history.pushState(null, '', `#project-${project.slug}`);
  };

  const handleCloseProject = () => {
    setSelectedProject(null);
    window.history.pushState(null, '', '#work');
  };

  const handleSelectServiceForInquiry = (serviceTitle: string) => {
    setPreselectedService(serviceTitle);
    scrollToSection('contact');
  };

  return (
    <div className="relative min-h-screen w-full bg-[#050505] text-[#ededed] antialiased selection:bg-white selection:text-black font-liber">
      {/* 1. Custom Gallery Cursor */}
      <CustomCursor />

      {/* 2. Minimalist Header Navigation */}
      <Navigation activeSection={activeSection} onNavigate={scrollToSection} />

      {/* 3. Main Gallery Web Page */}
      <main className="w-full">
        {/* Hero Section (#hero) */}
        <HeroSection
          onOpenShowreel={() => setIsShowreelOpen(true)}
          onNavigate={scrollToSection}
        />

        {/* Selected Works Gallery (#work) - placed right after hero for pure gallery primacy */}
        <WorkSection
          projects={PROJECTS}
          onSelectProject={handleSelectProject}
        />

        {/* Visual Archive & Optical Monograph (#archive) */}
        <ArchiveSection />

        {/* Practice / Disciplines (#what-we-do) */}
        <ServicesSection onSelectServiceForInquiry={handleSelectServiceForInquiry} />

        {/* Studio & Crew (#about) */}
        <AboutSection onNavigate={scrollToSection} />

        {/* Dialogue Desk (#contact) */}
        <ContactSection preselectedService={preselectedService} />
      </main>

      {/* 4. Minimalist Footer */}
      <Footer onNavigate={scrollToSection} />

      {/* 5. Modals */}
      <ShowreelModal
        isOpen={isShowreelOpen}
        onClose={() => setIsShowreelOpen(false)}
      />

      <ProjectModal
        project={selectedProject}
        projects={PROJECTS}
        isOpen={!!selectedProject}
        onClose={handleCloseProject}
        onSelectProject={handleSelectProject}
      />
    </div>
  );
}
