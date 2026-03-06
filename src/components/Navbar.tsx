import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, CalendarDays, Settings, Info } from 'lucide-react';

export const Navbar = () => {
  const navItems = [
    { path: '/', label: 'Home', icon: <Home size={18} /> },
    { path: '/forecast', label: 'Forecast', icon: <CalendarDays size={18} /> },
    { path: '/settings', label: 'Settings', icon: <Settings size={18} /> },
    { path: '/about', label: 'About', icon: <Info size={18} /> },
  ];

  return (
    <nav className="w-full max-w-3xl mx-auto mb-8 bg-white/15 dark:bg-slate-950/40 backdrop-blur-2xl border border-white/20 dark:border-white/5 shadow-2xl rounded-2xl p-1.5 flex justify-between items-center sm:px-3">
      <div className="flex w-full justify-between sm:justify-start sm:gap-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 sm:px-5 py-2.5 rounded-xl transition-all duration-500 text-sm sm:text-base font-semibold ${
                isActive
                  ? 'bg-gradient-to-r from-white/30 to-white/10 dark:from-white/20 dark:to-white/5 text-white shadow-lg ring-1 ring-white/30'
                  : 'text-white/70 hover:bg-white/10 dark:hover:bg-white/5 hover:text-white'
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
