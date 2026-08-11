'use client';

import React, { forwardRef } from 'react';
import { AlertCircle } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, leftIcon, rightIcon, className = '', id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs uppercase tracking-widest font-semibold text-zinc-300"
          >
            {label} {props.required && <span className="text-amber-400">*</span>}
          </label>
        )}

        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 text-zinc-400 pointer-events-none flex items-center justify-center">
              {leftIcon}
            </div>
          )}

          <input
            id={inputId}
            ref={ref}
            className={`
              w-full
              border
              bg-zinc-950/90
              text-white
              placeholder:text-zinc-600
              px-4
              py-3.5
              rounded-xl
              text-sm
              transition-all
              duration-200
              focus:outline-none
              ${leftIcon ? 'pl-11' : ''}
              ${rightIcon ? 'pr-11' : ''}
              ${
                error
                  ? 'border-red-500 focus:border-red-400 focus:ring-1 focus:ring-red-500'
                  : 'border-zinc-800 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 hover:border-zinc-700'
              }
              ${className}
            `}
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-3.5 text-zinc-400 flex items-center justify-center">
              {rightIcon}
            </div>
          )}
        </div>

        {error && (
          <div className="flex items-center gap-1.5 text-xs text-red-400 mt-1">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {helperText && !error && (
          <p className="text-xs text-zinc-400">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
