import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const base = 'inline-flex items-center justify-center font-medium transition-all duration-300 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none cursor-pointer';
    const variants = {
      primary: 'bg-amber-500 hover:bg-amber-600 text-black font-extrabold shadow-md shadow-amber-500/20 uppercase tracking-wider',
      secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-300 font-bold',
      outline: 'border border-amber-500/60 text-slate-900 bg-white hover:bg-amber-50 font-bold uppercase tracking-wider shadow-sm',
      ghost: 'text-slate-700 hover:text-slate-900 hover:bg-slate-100',
      danger: 'bg-rose-600 hover:bg-rose-500 text-white font-bold',
    };
    const sizes = {
      sm: 'px-3 py-1.5 text-xs',
      md: 'px-5 py-2.5 text-sm',
      lg: 'px-7 py-3.5 text-xs font-bold uppercase tracking-wider',
    };

    return (
      <button ref={ref} className={cn(base, variants[variant], sizes[size], className)} {...props}>
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
