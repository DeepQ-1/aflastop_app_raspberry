import React from 'react';

interface PageTitleProps {
  children: React.ReactNode;
  subtitle?: string;
}

export const PageTitle: React.FC<PageTitleProps> = ({ children, subtitle }) => {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-900">{children}</h1>
      {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
    </div>
  );
};