import React from 'react';
import GreyLogo from '../assets/logo-grey.svg';

export const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-2 pt-2 pb-4 pl-2">
      <img src={GreyLogo} alt="AFLASTOP" className="h-18" />
    </div>
  );
}