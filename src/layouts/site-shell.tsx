import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { Background } from '@/components/layout/background';
import { CursorGlow } from '@/components/layout/cursor-glow';
import { LoadingScreen } from '@/components/layout/loading-screen';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { useLenis } from '@/hooks/use-lenis';

export const SiteShell = ({
  children,
  activeSection = '',
  hideNavAndFooter = false,
}: {
  children: ReactNode;
  activeSection?: string;
  hideNavAndFooter?: boolean;
}) => {
  useLenis();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLoader, setShowLoader] = useState(() => {
    if (typeof window === 'undefined') return true;
    if (window.location.pathname.startsWith('/terminal')) {
      return false;
    }
    const hasLoaded = sessionStorage.getItem('portfolio_loaded');
    return !hasLoaded;
  });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    let timer: number;
    if (showLoader) {
      timer = window.setTimeout(() => {
        setShowLoader(false);
        sessionStorage.setItem('portfolio_loaded', 'true');
      }, 900);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timer) window.clearTimeout(timer);
    };
  }, [showLoader]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050705] text-white">
      <Background />
      <CursorGlow />
      <LoadingScreen show={showLoader} />
      {!hideNavAndFooter && <Navbar activeSection={activeSection} isScrolled={isScrolled} />}
      <main className="relative z-10">{children}</main>
      {!hideNavAndFooter && <Footer />}
    </div>
  );
};
