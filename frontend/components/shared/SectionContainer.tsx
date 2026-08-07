import React from 'react';

interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function SectionContainer({ children, className = '', id }: SectionContainerProps) {
  return (
    <section id={id} className={`max-w-7xl mx-auto px-6 md:px-12 ${className}`}>
      {children}
    </section>
  );
}
