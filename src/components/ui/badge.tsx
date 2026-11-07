import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export const Badge = ({ className, children }: { className?: string; children: ReactNode }) => (
  <span
    className={cn(
      'inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium tracking-wide text-white/72 backdrop-blur-sm',
      className,
    )}
  >
    {children}
  </span>
);
