import React from 'react';
import { motion } from 'framer-motion';

export const TerminalCard: React.FC<{ onOpen?: () => void }> = ({ onOpen }) => {
  return (
    <motion.div whileHover={{ scale: 1.005 }} className="w-full max-w-3xl">
      <div className="rounded-[1.2rem] overflow-hidden border border-zinc-700/60 bg-[#1e2024] shadow-2xl">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3 bg-[#1e2024]">
          {/* Left Controls */}
          <div className="flex items-center gap-3">
            {/* macOS Window Controls */}
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
              <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
              <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
            </div>
            {/* File name */}
            <span className="ml-2 font-sans text-sm font-medium text-white/95">about.ts</span>
          </div>

          {/* Right Shell prompt & Interactive Button */}
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline font-sans text-sm text-zinc-400/85">
              adarsh@MacBook-Air: ~/projects
            </span>
            <button
              type="button"
              onClick={onOpen}
              className="flex items-center gap-1.5 rounded-md bg-[#22c55e] hover:bg-[#16a34a] px-3.5 py-1.5 font-sans text-xs font-semibold text-white transition-all duration-300 shadow-[0_2px_8px_rgba(34,197,94,0.3)] hover:shadow-[0_4px_16px_rgba(34,197,94,0.5)] hover:scale-[1.02] active:scale-[0.98]"
              aria-label="Interactive terminal"
            >
              <span className="font-mono">&gt;_</span>
              <span>Interactive</span>
            </button>
          </div>
        </div>

        {/* Code Content Body */}
        <div className="px-6 md:px-8 pb-8 pt-3 bg-[#1e2024]">
          <pre className="text-[#4ade80] font-mono text-xs md:text-sm leading-6 md:leading-7 whitespace-pre-wrap">
{`const adarsh = {
  skills: ['MERN Stack', 'Digital Forensics', 'Mobile Forensics', 'SOC Operations', 'Threat Analysis', 'Python', 'Linux'],
  passion: 'Cybersecurity & Building',
  achievement: 'FACT 2026 Qualified',
  location: 'India',
  connect: () => {
    console.log("Let's build something secure!");
  }
};

adarsh.connect();

$ `}
            <button
              type="button"
              onClick={onOpen}
              className="inline-flex items-center text-white hover:text-white/80 transition-colors focus:outline-none focus-visible:underline font-mono font-bold text-xs md:text-sm"
              aria-label="Open terminal page"
            >
              explore_interactive_terminal
              <span className="ml-1 inline-block h-4 w-[0.72ch] bg-white align-text-bottom terminal-block-cursor" />
            </button>
          </pre>
        </div>
      </div>
    </motion.div>
  );
};

export default TerminalCard;
