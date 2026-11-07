import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { navigationItems } from '@/data/site';
import { cn } from '@/lib/cn';
import { Button } from '@/components/ui/button';
import adarshLogo from '@/assets/adarsh_logo.png';

export const Navbar = ({ activeSection, isScrolled }: { activeSection: string; isScrolled: boolean }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navClassName = useMemo(
    () =>
      cn(
        'absolute left-0 top-0 z-50 w-full border-b border-transparent transition-all duration-500',
        isScrolled && 'border-white/8 bg-[#050705]/72 backdrop-blur-2xl',
      ),
    [isScrolled],
  );

  const scrollTo = (href: string) => {
    const target = document.querySelector(href);
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileOpen(false);
  };

  return (
    <header className={navClassName}>
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <button onClick={() => scrollTo('#hero')} className="group flex items-center gap-3 text-left">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] transition-transform duration-300 group-hover:-rotate-12 group-hover:border-emerald-400/30 overflow-hidden">
            <img src={adarshLogo} alt="Adarsh Logo" className="h-full w-full object-cover" />
          </span>
          <span className="font-display text-xl font-semibold tracking-wide text-white">Adarsh</span>
        </button>

        <nav className="hidden items-center gap-2 md:flex">
          {navigationItems.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollTo(item.href)}
              className={cn(
                'rounded-full px-4 py-2 text-sm text-white/62 transition-all duration-300 hover:text-white',
                activeSection === item.href.slice(1) && 'bg-white/[0.05] text-white ring-1 ring-emerald-400/20',
              )}
            >
              {item.label}
            </button>
          ))}
          <Button variant="secondary" size="sm" onClick={() => scrollTo('#contact')} className="ml-2">
            Let’s talk
          </Button>
        </nav>

        <button
          onClick={() => setMobileOpen((current) => !current)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/80 transition-colors duration-300 hover:border-emerald-400/30 hover:text-white md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <HiX size={20} /> : <HiMenuAlt3 size={20} />}
        </button>
      </div>

      <motion.div
        initial={false}
        animate={{ height: mobileOpen ? 'auto' : 0, opacity: mobileOpen ? 1 : 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="overflow-hidden border-t border-white/8 bg-[#050705]/92 backdrop-blur-2xl md:hidden"
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-4 sm:px-6">
          {navigationItems.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollTo(item.href)}
              className={cn(
                'rounded-2xl px-4 py-3 text-left text-sm text-white/70 transition-colors duration-300 hover:bg-white/[0.05] hover:text-white',
                activeSection === item.href.slice(1) && 'bg-white/[0.05] text-white',
              )}
            >
              {item.label}
            </button>
          ))}
          <Button
            variant="default"
            size="sm"
            onClick={() => scrollTo('#contact')}
            className="mt-2 w-full justify-center"
          >
            Let’s talk
          </Button>
        </div>
      </motion.div>
    </header>
  );
};
