import * as React from 'react';
import { cn } from '@/lib/cn';

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, type = 'text', ...props }, ref) => (
  <input
    type={type}
    ref={ref}
    className={cn(
      'flex h-12 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-white/28 focus:border-emerald-400/50 focus:ring-2 focus:ring-emerald-400/20',
      className,
    )}
    {...props}
  />
));
Input.displayName = 'Input';

export { Input };
