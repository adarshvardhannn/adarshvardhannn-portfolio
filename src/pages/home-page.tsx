import { useRef, useEffect } from 'react';
import { HeroSection } from '@/sections/hero';
import { AboutSection } from '@/sections/about';
import { ExperienceSection } from '@/sections/experience';
import { ProjectsSection } from '@/sections/projects';
import { SkillsSection } from '@/sections/skills';
import { ContactSection } from '@/sections/contact';
import { SiteShell } from '@/layouts/site-shell';
import { useActiveSection } from '@/hooks/use-active-section';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

export const HomePage = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  useScrollReveal('section');
  const activeSection = useActiveSection(['hero', 'about', 'experience', 'projects', 'skills', 'contact']);

  useEffect(() => {
    if (window.location.hash) {
      const hash = window.location.hash;
      const timer = setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          if (window.lenis) {
            window.lenis.scrollTo(el as HTMLElement, { offset: -80, duration: 1.1 });
          } else {
            const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
            window.scrollTo({ top, behavior: 'smooth' });
          }
        }
      }, 350);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <SiteShell activeSection={activeSection}>
      <div ref={rootRef}>
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </div>
    </SiteShell>
  );
};

export default HomePage;
