import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navigation } from './Navigation';
import { Toaster } from 'sonner';

export const Layout: React.FC = () => {
  return (
    <>
      <Navigation />
      <main className="app-content p-4">
        <Outlet />
      </main>
      <Toaster 
        position="bottom-center" 
        toastOptions={{
          style: {
            bottom: '60px',
          },
        }}
      />
    </>
  );
};