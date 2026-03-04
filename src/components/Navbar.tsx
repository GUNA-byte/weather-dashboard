import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, CalendarDays, Settings, Info } from 'lucide-react';

export const Navbar = () => {
  const navItems = [
    { path: '/', label: 'Home', icon: <Home size={20} /> },
    { path: '/forecast', label: 'Forecast', icon: <CalendarDays size={20} /> },
    { path: '/settings', label: 'Settings', icon: <Settings size={20} /> },
    { path: '/about', label: 'About', icon: <Info size={20} /> },
  ];

  return (
    <nav className="w-full max-w-3xl mx-auto mb-8 bg-white/20 dark:bg-slate-900/40 backdrop-blur-xl border border-white/30 dark:border-white/10 shadow-lg rounded-2xl p-2 flex justify-between items-center sm:px-4">
      <div className="flex w-full justify-between sm:justify-start sm:gap-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 text-sm sm:text-base font-medium ${
                isActive
                  ? 'bg-white/30 dark:bg-slate-800/60 text-white shadow-md'
                  : 'text-white/80 hover:bg-white/20 dark:hover:bg-slate-800/40 hover:text-white'
              }`
            }
          >
            {item.icon}
            <span className="hidden sm:inline">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
