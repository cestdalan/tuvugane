import { useState, useEffect, useCallback } from 'react';
import { PROJECTS } from './data/portfolioData';
import { Project } from './types';
import CustomCursor from './components/CustomCursor';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import WorkSection from './components/WorkSection';
import ArchiveSection from './components/ArchiveSection';
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

  // Bulletproof smooth scroll using absolute document coordinates
  const scrollToSection = useCallback((sectionId: string, updateHistory = true) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const targetTop = element.getBoundingClientRect().top + window.scrollY - 80;
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
        const validSections = ['hero', 'what-we-do', 'work', 'archive', 'about', 'contact', 'inquire'];
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

  // Robust ScrollSpy Engine tracking sections including #inquire at the bottom
  useEffect(() => {
    const sectionIds = ['hero', 'what-we-do', 'work', 'archive', 'about', 'contact', 'inquire'];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 120;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      // If user reaches near the very bottom, highlight #inquire
      if (window.scrollY + windowHeight >= fullHeight - 150) {
        setActiveSection('inquire');
        return;
      }

      // Check sections from bottom to top
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

  // Inquiry selection from Services
  const handleSelectServiceForInquiry = (serviceTitle: string) => {
    setPreselectedService(serviceTitle);
    scrollToSection('inquire');
  };

  return (
    <div className="relative min-h-screen w-full bg-[#050505] text-[#ededed] antialiased selection:bg-white selection:text-black">
      {/* 1. Custom Spring-Physics Cursor */}
      <CustomCursor />

      {/* 2. Top Bar & Navigation Architecture */}
      <Navigation activeSection={activeSection} onNavigate={scrollToSection} />

      {/* 3. Main Page Sections */}
      <main className="w-full">
        {/* Hero Section (#hero) */}
        <HeroSection
          onOpenShowreel={() => setIsShowreelOpen(true)}
          onNavigate={scrollToSection}
        />

        {/* Services / What We Do Section (#what-we-do) */}
        <ServicesSection onSelectServiceForInquiry={handleSelectServiceForInquiry} />

        {/* Featured Work Portfolio (#work) */}
        <WorkSection
          projects={PROJECTS}
          onSelectProject={handleSelectProject}
        />

        {/* Visual Archive (#archive) */}
        <ArchiveSection />

        {/* About Manifesto (#about) */}
        <AboutSection onNavigate={scrollToSection} />

        {/* Contact Desk & Inquire Form (#contact & #inquire) */}
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
