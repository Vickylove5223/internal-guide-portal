
import React from 'react';

interface BaseLayoutProps {
  children: React.ReactNode;
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-light">
      {children}
    </div>
  );
};

export default BaseLayout;
