import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound: React.FC = () => {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-4">404 - Page Not Found</h1>
      <Link to="/" className="text-blue-500 hover:underline">
        Return to Home
      </Link>
    </div>
  );
};