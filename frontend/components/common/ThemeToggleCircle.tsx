'use client';

import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggleCircle() {
  // 🌟 Default to White Mode (true) by default for all users!
  const [isLightMode, setIsLightMode] = useState<boolean>(true);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('vogue_theme');

    if (savedTheme === 'dark') {
      setIsLightMode(false);
      document.documentElement.classList.remove('light-mode');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      setIsLightMode(true);
      document.documentElement.classList.add('light-mode');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, []);

  const toggleTheme = () => {
    const nextState = !isLightMode;
    setIsLightMode(nextState);

    if (nextState) {
      document.documentElement.classList.add('light-mode');
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('vogue_theme', 'light');
    } else {
      document.documentElement.classList.remove('light-mode');
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('vogue_theme', 'dark');
    }
  };

  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 group">
      {/* Tooltip text */}
      <span className="hidden sm:inline-block px-3 py-1.5 rounded-xl bg-zinc-900 text-white text-[11px] font-mono tracking-wider shadow-xl border border-amber-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        {isLightMode ? 'Switch to Black Mode 🌙' : 'Switch to White Mode ☀️'}
      </span>

      {/* Floating Theme Circle Button */}
      <button
        type="button"
        onClick={toggleTheme}
        aria-label="Toggle Website Theme"
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.5)] border-2 transition-all duration-500 cursor-pointer hover:scale-110 active:scale-95 ${
          isLightMode
            ? 'bg-amber-400 text-black border-amber-500 ring-4 ring-amber-400/30 shadow-[0_0_25px_rgba(245,158,11,0.6)]'
            : 'bg-zinc-900 text-amber-400 border-amber-500/50 ring-4 ring-amber-500/20 hover:border-amber-400'
        }`}
      >
        {isLightMode ? (
          <Moon className="w-6 h-6 animate-pulse" />
        ) : (
          <Sun className="w-6 h-6 animate-spin-slow" />
        )}
      </button>
    </div>
  );
}

export default ThemeToggleCircle;
