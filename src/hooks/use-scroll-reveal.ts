import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const useScrollReveal = (selector: string) => {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const elements = gsap.utils.toArray<HTMLElement>(selector);
    const animations = elements.map((element) =>
      gsap.fromTo(
        element,
        { y: 36, opacity: 0, filter: 'blur(8px)' },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 82%',
          },
        },
      ),
    );

    return () => {
      animations.forEach((animation) => animation.kill());
    };
  }, [selector]);
};
