import { motion } from 'framer-motion';
import { useState } from 'react';
import { HiArrowUpRight } from 'react-icons/hi2';
import { projects } from '@/data/site';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/ui/section-heading';

const ProjectCard = ({ project, index }: { project: (typeof projects)[number]; index: number }) => {
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0 });

  return (
    <motion.article
      className="group relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/[0.03] p-5 shadow-soft backdrop-blur-xl"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.75, delay: index * 0.07, ease: 'easeOut' }}
      onMouseMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        setSpotlight({
          x: event.clientX - bounds.left,
          y: event.clientY - bounds.top,
        });
      }}
      onMouseLeave={() => {
        setSpotlight({ x: 0, y: 0 });
      }}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(320px circle at ${spotlight.x}px ${spotlight.y}px, rgba(68,255,153,0.15), transparent 45%)`,
        }}
      />
      <div className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-70`} />
      <div className="relative z-10">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/38">Featured Project</p>
            <h3 className="mt-3 font-display text-2xl font-semibold text-white">{project.name}</h3>
          </div>
          <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs tracking-[0.3em] text-white/48">0{index + 1}</span>
        </div>

        {'image' in project && project.image ? (
          <div className="relative mb-5 aspect-[3/1] w-full overflow-hidden rounded-[1.4rem] border border-white/10 bg-[#060a06]">
            <img
              src={project.image}
              alt={`${project.name} banner`}
              className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </div>
        ) : (
          <div className="relative mb-5 overflow-hidden rounded-[1.4rem] border border-white/10 bg-[#0b0f0b] p-4">
            <div className="absolute inset-0 opacity-40 blur-3xl">
              <div className="absolute left-5 top-4 h-24 w-24 rounded-full bg-emerald-400/30 blur-3xl animate-float" />
              <div className="absolute right-5 bottom-4 h-28 w-28 rounded-full bg-white/8 blur-3xl" />
            </div>
            <div className="relative grid h-40 place-items-center rounded-[1.1rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01))]">
              <div className="grid w-full max-w-[12rem] gap-3">
                <div className="h-4 w-2/3 rounded-full bg-white/14" />
                <div className="h-4 w-full rounded-full bg-white/10" />
                <div className="h-4 w-5/6 rounded-full bg-emerald-400/28" />
                <div className="mt-2 h-16 rounded-2xl border border-white/10 bg-black/35" />
              </div>
            </div>
          </div>
        )}

        <p className="text-sm leading-7 text-white/66">{project.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {Boolean(project.demo) && (
            <Button variant="default" size="sm" onClick={() => window.open(project.demo, '_blank', 'noreferrer')}>
              Demo <HiArrowUpRight />
            </Button>
          )}
          {Boolean(project.github) && (
            <Button
              variant={project.demo ? 'secondary' : 'default'}
              size="sm"
              onClick={() => window.open(project.github, '_blank', 'noreferrer')}
            >
              GitHub <HiArrowUpRight />
            </Button>
          )}
        </div>
      </div>
    </motion.article>
  );
};

export const ProjectsSection = () => (
  <section id="projects" className="px-5 py-24 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-7xl">
      <SectionHeading
        eyebrow="Projects"
        title="Code with purpose. Security by design."
        description="A showcase of my work in cybersecurity, digital forensics, and AI turning complex challenges into practical solutions."
      />

      <div className="grid gap-5 lg:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={project.name} project={project} index={index} />
        ))}
      </div>
    </div>
  </section>
);
