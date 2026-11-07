import { ProjectsSection } from '@/sections/projects';
import { SiteShell } from '@/layouts/site-shell';

export const ProjectsPage = () => (
  <SiteShell>
    <div className="pt-24">
      <ProjectsSection />
    </div>
  </SiteShell>
);
