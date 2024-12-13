import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Settings, LayoutDashboard } from 'lucide-react';

export const Navigation: React.FC = () => {
  return (
    <nav className="h-16 bg-white border-b flex items-center px-4">
      <div className="flex items-center gap-6">
        <span className="font-semibold text-gray-900">MyApp</span>
        <div className="flex items-center gap-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive 
                  ? 'bg-gray-100 text-gray-900' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`
            }
          >
            <span className="flex items-center gap-2">
              <Home size={16} />
              Home
            </span>
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive 
                  ? 'bg-gray-100 text-gray-900' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`
            }
          >
            <span className="flex items-center gap-2">
              <LayoutDashboard size={16} />
              Dashboard
            </span>
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive 
                  ? 'bg-gray-100 text-gray-900' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`
            }
          >
            <span className="flex items-center gap-2">
              <Settings size={16} />
              Settings
            </span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};