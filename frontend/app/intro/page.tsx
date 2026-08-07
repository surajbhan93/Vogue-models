'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { EliteIntro } from '@/components/intro/EliteIntro';

export default function IntroPage() {
  const router = useRouter();

  const handleComplete = () => {
    sessionStorage.setItem('introPlayed', 'true');
    router.push('/');
  };

  return <EliteIntro onComplete={handleComplete} />;
}
