import * as React from 'react';
import { cn } from '@/lib/cn';

type ButtonVariant = 'default' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'default' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantClasses: Record<ButtonVariant, string> = {
  default: 'bg-emerald-400 text-black shadow-soft hover:-translate-y-0.5 hover:bg-emerald-300',
  secondary: 'border border-white/10 bg-white/[0.03] text-white hover:border-emerald-400/40 hover:bg-white/[0.06]',
  ghost: 'text-white/80 hover:bg-white/[0.05] hover:text-white',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-xs',
  default: 'h-11 px-5',
  lg: 'h-12 px-6 text-base',
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant = 'default', size = 'default', ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50',
      variantClasses[variant],
      sizeClasses[size],
      className,
    )}
    {...props}
  />
));

Button.displayName = 'Button';

export { Button };
