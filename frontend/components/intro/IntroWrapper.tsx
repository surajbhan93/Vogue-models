// 'use client';

// import React, { useState, useEffect } from 'react';
// import { EliteIntro } from './EliteIntro';

// interface IntroWrapperProps {
//   children: React.ReactNode;
// }

// export function IntroWrapper({ children }: IntroWrapperProps) {
//   const [showIntro, setShowIntro] = useState<boolean | null>(null);

//   useEffect(() => {
//     const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
//     const introPlayed = sessionStorage.getItem('introPlayed');

//     if (reducedMotion || introPlayed === 'true') {
//       setShowIntro(false);
//     } else {
//       setShowIntro(true);
//     }
//   }, []);

//   const handleComplete = () => {
//     sessionStorage.setItem('introPlayed', 'true');
//     setShowIntro(false);
//   };

//   if (showIntro === null) {
//     // Avoid hydration layout shift
//     return <div className="min-h-screen bg-obsidian-950">{children}</div>;
//   }

//   return (
//     <>
//       {showIntro && <EliteIntro onComplete={handleComplete} />}
//       <div className={`transition-opacity duration-700 ${showIntro ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
//         {children}
//       </div>
//     </>
//   );
// }

'use client';

import React, { useState, useEffect } from 'react';
import { EliteIntro } from './EliteIntro';

interface IntroWrapperProps {
  children: React.ReactNode;
}

export function IntroWrapper({ children }: IntroWrapperProps) {
  const [showIntro, setShowIntro] = useState<boolean | null>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const introPlayed = sessionStorage.getItem('introPlayed');

    if (reducedMotion || introPlayed === 'true') {
      setShowIntro(false);
    } else {
      setShowIntro(true);
    }
  }, []);

  const handleComplete = () => {
    sessionStorage.setItem('introPlayed', 'true');
    setShowIntro(false);
  };

  if (showIntro === null) {
    return <div className="min-h-screen bg-[#07090e] text-slate-100">{children}</div>;
  }

  return (
    <>
      {showIntro && <EliteIntro onComplete={handleComplete} />}
      <div
        className={`transition-opacity duration-700 ${
          showIntro ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'
        }`}
      >
        {children}
      </div>
    </>
  );
}