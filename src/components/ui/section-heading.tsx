import { motion } from 'framer-motion';

export const SectionHeading = ({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) => (
  <motion.div
    className="mb-10 max-w-3xl"
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.4 }}
    transition={{ duration: 0.7, ease: 'easeOut' }}
  >
    <p className="mb-3 text-xs uppercase tracking-[0.45em] text-emerald-300/70">{eyebrow}</p>
    <h2 className="font-display text-3xl font-semibold tracking-tight text-white/96 md:text-5xl">{title}</h2>
    {description ? <p className="mt-4 max-w-2xl text-sm leading-7 text-white/62 md:text-base">{description}</p> : null}
  </motion.div>
);
