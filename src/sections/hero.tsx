import { motion } from 'framer-motion';
import { HiArrowDownRight } from 'react-icons/hi2';
import { Button } from '@/components/ui/button';

const reveal = {
  initial: { opacity: 0, y: 28, filter: 'blur(10px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
};

export const HeroSection = () => (
  <section id="hero" className="relative min-h-screen overflow-hidden pt-28 sm:pt-32 lg:pt-36">
    <div className="pointer-events-none absolute inset-0 bg-hero-radial opacity-70" />
    <div className="relative z-10 mx-auto flex min-h-[calc(100vh-7rem)] max-w-7xl flex-col justify-center px-5 pb-16 sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl">
        <motion.p
          className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs uppercase tracking-[0.22em] sm:tracking-[0.38em] text-white/60 backdrop-blur-xl"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(68,255,153,0.8)]" />
          <span className="truncate sm:overflow-visible">Security Enthusiast & MERN Stack Developer</span>
        </motion.p>

        <motion.h1
          className="font-display sm:whitespace-nowrap text-[clamp(2.5rem,8vw,5.5rem)] font-bold leading-[0.98] tracking-[-0.04em] sm:tracking-[-0.05em] text-white"
          initial="initial"
          animate="animate"
          transition={{ staggerChildren: 0.055, delayChildren: 0.05 }}
        >
          <motion.span className="inline-block" variants={reveal} transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}>
            Adarsh Vardhan
          </motion.span>
        </motion.h1>

        <motion.p
          className="mt-4 sm:mt-6 text-xl sm:text-2xl font-medium tracking-[-0.02em] text-white/42 sm:text-[2rem]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          - 22y/o Tech Enthusiast, India
        </motion.p>

        <div className="mt-10 sm:mt-12 max-w-4xl space-y-5 sm:space-y-6 text-base leading-7 sm:leading-8 text-white/74 sm:text-lg">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Hi! I&apos;m Adarsh, a Cyber Security postgraduate student at{' '}
            <a
              href="https://www.nfsu.ac.in/"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-emerald-400 transition-colors duration-300 hover:text-emerald-300"
            >
              National Forensic Sciences University (NFSU), Bhopal
            </a>
            , passionate about Digital Forensics, Mobile Security, SOC Operations, and Security Research.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
          >
            With a background in <span className="font-semibold text-white">MERN stack</span> development, I&apos;ve
            transitioned towards cybersecurity and hands-on digital investigations. I qualified FACT 2026 (Digital
            Forensics) and have worked on projects like{' '}
            <a
              href="https://github.com/adarshvardhannn/DarkEye"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-emerald-400 transition-colors duration-300 hover:text-emerald-300"
            >
              DarkEye
            </a>{' '}
            (OSINT &amp; Reverse Image Search) and{' '}
            <a
              href="https://github.com/adarshvardhannn/MobileSentinel"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-emerald-400 transition-colors duration-300 hover:text-emerald-300"
            >
              MobileSentinel
            </a>{' '}
            (Android Security &amp; Forensics). Currently, I&apos;m developing{' '}
            <span className="font-semibold text-white">MARC</span>, a Memory Forensics project.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            Beyond academics, I&apos;ve served as a{' '}
            <a
              href="https://www.geeksforgeeks.org/profile/adarshvardhannn"
              target="_blank"
              rel="noreferrer"
              className="text-emerald-400 transition-colors duration-300 hover:text-emerald-300"
            >
              GeeksforGeeks Campus Mantri
            </a>{' '}
            and a Google Student Ambassador (GSA) – Batch 1, 2026.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85 }}
          >
            I believe in continuous learning, practical exploration, and building solutions that make the digital world
            safer.
          </motion.p>
        </div>

        <motion.div
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.95 }}
        >
          <Button
            onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
            size="lg"
            className="w-full sm:w-auto justify-center"
          >
            View projects
            <HiArrowDownRight />
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full sm:w-auto justify-center"
          >
            Contact me
          </Button>
        </motion.div>
      </div>

      <motion.div
        className="mt-12 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.1 }}
      >
        <button
          onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
          className="group inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-sm text-white/72 backdrop-blur-xl transition-all duration-300 hover:border-emerald-400/30 hover:bg-white/[0.06] hover:text-white"
        >
          Scroll down
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/30 transition-transform duration-300 group-hover:translate-y-0.5">
            <HiArrowDownRight />
          </span>
        </button>
      </motion.div>
    </div>
  </section>
);
