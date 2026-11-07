import { motion } from 'framer-motion';
import { experienceItems } from '@/data/site';
import { Badge } from '@/components/ui/badge';
import { SectionHeading } from '@/components/ui/section-heading';

export const ExperienceSection = () => (
  <section id="experience" className="px-5 py-24 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-7xl">
      <SectionHeading
        eyebrow="Experience"
        title="Where I’ve learned, built, and contributed."
        description="Internships, community roles, and hands-on experience across cybersecurity, digital forensics, and technology."
      />

      <div className="relative pl-6">
        <div className="absolute left-2 top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-emerald-400/60 via-white/18 to-transparent" />
        <div className="space-y-5">
          {experienceItems.map((item, index) => (
            <motion.article
              key={`${item.role}-${item.period}`}
              className="relative glass-panel rounded-[1.6rem] border border-white/10 p-6 sm:p-7"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, delay: index * 0.08, ease: 'easeOut' }}
            >
              <span className="absolute -left-[1.45rem] top-8 h-4 w-4 rounded-full border border-emerald-400/40 bg-[#050705] shadow-[0_0_18px_rgba(68,255,153,0.45)]" />
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="font-display text-xl font-semibold text-white">{item.role}</p>
                  <p className="mt-1 text-sm tracking-[0.3em] text-emerald-300/70">{item.company}</p>
                </div>
                <p className="text-sm text-white/42">{item.period}</p>
              </div>
              <p className="mt-5 max-w-4xl text-sm leading-7 text-white/68 md:text-base">{item.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  </section>
);
