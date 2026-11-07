import { motion } from 'framer-motion';
import { skillGroups } from '@/data/site';
import { Badge } from '@/components/ui/badge';
import { SectionHeading } from '@/components/ui/section-heading';

export const SkillsSection = () => (
  <section id="skills" className="px-5 py-24 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-7xl">
      <SectionHeading
        eyebrow="Skills"
        title="The tools I use to build and secure."
        description="A mix of development, cybersecurity, digital forensics, and systems tools I use across projects and experiments."
      />

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {skillGroups.map((group, index) => (
          <motion.div
            key={group.title}
            className="glass-panel rounded-[1.6rem] p-6"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75, delay: index * 0.06, ease: 'easeOut' }}
          >
            <p className="text-xs uppercase tracking-[0.35em] text-emerald-300/70">{group.title}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <Badge key={item} className="transition-transform duration-300 hover:-translate-y-0.5 hover:border-emerald-400/30 hover:text-white">
                  {item}
                </Badge>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
