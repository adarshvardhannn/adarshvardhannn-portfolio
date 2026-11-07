import { useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { navigationItems } from '@/data/site';
import { cn } from '@/lib/cn';
import { Button } from '@/components/ui/button';
import adarshLogo from '@/assets/adarsh_logo.png';

export const Navbar = ({ activeSection, isScrolled }: { activeSection: string; isScrolled: boolean }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navClassName = useMemo(
    () =>
      cn(
        'fixed left-0 top-0 z-50 w-full transition-all duration-300',
        isScrolled || mobileOpen
          ? 'border-b border-white/10 bg-[#050705]/85 backdrop-blur-2xl shadow-lg shadow-black/30'
          : 'border-b border-transparent bg-transparent',
      ),
    [isScrolled, mobileOpen],
  );

  const scrollTo = (href: string) => {
    setMobileOpen(false);

    // If currently on another page, navigate to home with the hash
    if (location.pathname !== '/') {
      navigate(`/${href}`);
      return;
    }

    const target = document.querySelector(href);
    if (!target) return;

    // Small delay ensures mobile drawer animation starts closing without thrashing scroll target
    setTimeout(() => {
      if (window.lenis) {
        window.lenis.scrollTo(target as HTMLElement, { offset: -80, duration: 1.1 });
      } else {
        const top = target.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }, 120);
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

        {/* Desktop Navigation */}
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

        {/* Mobile Hamburger Toggle Button */}
        <button
          onClick={() => setMobileOpen((current) => !current)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/80 transition-colors duration-300 hover:border-emerald-400/30 hover:text-white md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <HiX size={20} /> : <HiMenuAlt3 size={20} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="overflow-hidden border-t border-white/8 bg-[#050705]/95 backdrop-blur-2xl md:hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-4 sm:px-6">
              {navigationItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  className={cn(
                    'rounded-2xl px-4 py-3 text-left text-sm text-white/70 transition-colors duration-300 active:scale-[0.98] hover:bg-white/[0.05] hover:text-white',
                    activeSection === item.href.slice(1) && 'bg-white/[0.08] text-white font-medium',
                  )}
                >
                  {item.label}
                </button>
              ))}
              <Button
                variant="default"
                size="sm"
                onClick={() => scrollTo('#contact')}
                className="mt-2 w-full justify-center active:scale-[0.98]"
              >
                Let’s talk
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
