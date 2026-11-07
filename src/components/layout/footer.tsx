import { socialLinks } from '@/data/site';
import { HiOutlineArrowUpRight } from 'react-icons/hi2';

const icons = {
  github: 'GitHub',
  linkedin: 'LinkedIn',
  twitter: 'Twitter',
} as const;

export const Footer = () => (
  <footer className="border-t border-white/8 bg-white/[0.02]">
    <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-8 sm:px-6 lg:px-8 md:flex-row md:items-center md:justify-between">
      <p className="text-sm text-white/48">
        Designed & developed by <strong className="font-semibold text-white">Adarsh Vardhan</strong> ❤️
      </p>
      <div className="flex flex-wrap items-center gap-3">
        {socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/72 transition-all duration-300 hover:border-emerald-400/30 hover:bg-white/[0.06] hover:text-white"
          >
            <span>{icons[link.icon]}</span>
            <HiOutlineArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        ))}
      </div>
    </div>
  </footer>
);
