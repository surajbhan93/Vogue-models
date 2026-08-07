import React from 'react';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function PageContainer({ children, className = '' }: PageContainerProps) {
  return (
    <div className={`max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 space-y-16 ${className}`}>
      {children}
    </div>
  );
}
