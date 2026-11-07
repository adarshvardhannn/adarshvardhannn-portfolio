import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { aboutFacts } from '@/data/site';
import { Badge } from '@/components/ui/badge';
import TerminalCard from '@/components/terminal/TerminalCard';

export const AboutSection = () => {
  const navigate = useNavigate();
  return (
    <section id="about" className="px-5 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <motion.div
            className="glass-panel ring-glow rounded-[2rem] p-6 sm:p-8"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-emerald-300/65">about.ts</p>
                <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white md:text-4xl">Security research, full-stack craft, and focused execution.</h2>
              </div>
            </div>

            <TerminalCard onOpen={() => navigate('/terminal')} />
          </motion.div>

        <motion.div
          className="grid gap-4"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            initial: {},
            animate: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {aboutFacts.map((fact) => (
            <motion.div
              key={fact.label}
              className="glass-panel rounded-[1.6rem] border border-white/10 p-5"
              variants={{
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <p className="text-xs uppercase tracking-[0.32em] text-white/38">{fact.label}</p>
              <p className="mt-3 text-lg font-medium text-white">{fact.value}</p>
            </motion.div>
          ))}

          <motion.div
            className="glass-panel rounded-[1.8rem] p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
          >
            <p className="text-sm leading-7 text-white/68">
              I build with React, Node.js, Python, APIs, and modern web technologies while exploring digital forensics, mobile security, SOC operations, and threat analysis. I enjoy building practical security tools and intelligent systems that combine software development with cybersecurity.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {['MERN Stack', 'Digital Forensics', 'Security Research', 'Full Stack', 'System Thinking'].map((item) => (
                <Badge key={item}>{item}</Badge>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  </section>
  );
};
