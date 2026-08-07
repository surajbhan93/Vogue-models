'use client';

import { useState, useEffect, useCallback } from 'react';

export function useEliteIntro() {
  const [isPlaying, setIsPlaying] = useState<boolean | null>(null);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [activeCityIndex, setActiveCityIndex] = useState<number>(0);

  useEffect(() => {
    // 1. Accessibility Check: reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 2. Session Storage Check
    const introPlayed = sessionStorage.getItem('introPlayed');

    if (prefersReducedMotion || introPlayed === 'true') {
      setIsPlaying(false);
      setIsCompleted(true);
    } else {
      setIsPlaying(true);
    }
  }, []);

  const finishIntro = useCallback(() => {
    sessionStorage.setItem('introPlayed', 'true');
    setIsPlaying(false);
    setIsCompleted(true);
  }, []);

  const skipIntro = useCallback(() => {
    finishIntro();
  }, [finishIntro]);

  return {
    isPlaying,
    isCompleted,
    activeCityIndex,
    setActiveCityIndex,
    finishIntro,
    skipIntro,
  };
}
