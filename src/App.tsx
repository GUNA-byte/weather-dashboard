/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WeatherProvider, useWeather, WeatherData } from './context/WeatherContext';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Forecast } from './pages/Forecast';
import { Settings } from './pages/Settings';
import { About } from './pages/About';
import { motion, AnimatePresence } from 'motion/react';
import { WeatherEffect } from './components/WeatherEffect';

const AppContent = () => {
  const { isDarkMode, weatherData } = useWeather();

  const backgroundClass = useMemo(() => {
    if (!weatherData) {
      return isDarkMode 
        ? 'from-slate-900 via-indigo-950 to-slate-900' 
        : 'from-blue-400 via-indigo-500 to-purple-600';
    }

    const { icon, isDay } = weatherData;

    if (isDarkMode) {
      // Dynamic Dark Mode
      if (!isDay) return 'from-slate-950 via-slate-900 to-indigo-950'; // Clear Night
      if (icon === 'cloud-rain' || icon === 'cloud-lightning') return 'from-slate-950 via-slate-900 to-blue-950'; // Rainy Night
      if (icon === 'cloud-snow') return 'from-slate-900 via-blue-900 to-slate-800'; // Snowy Night
      if (icon === 'cloud' || icon === 'partly-cloudy') return 'from-slate-900 via-slate-800 to-indigo-950'; // Cloudy Night
      return 'from-slate-900 via-indigo-950 to-slate-900'; // Default Dark
    } else {
      // Dynamic Light Mode
      if (!isDay) return 'from-indigo-900 via-purple-900 to-slate-900'; // Night time in Light Mode
      if (icon === 'sun') return 'from-amber-200 via-yellow-400 to-orange-500';
      if (icon === 'partly-cloudy' || icon === 'cloud') return 'from-sky-300 via-blue-400 to-indigo-400';
      if (icon === 'cloud-rain' || icon === 'cloud-lightning') return 'from-blue-600 via-indigo-700 to-slate-800';
      if (icon === 'cloud-snow') return 'from-blue-50 via-sky-100 to-indigo-200';
      return 'from-fuchsia-500 via-purple-600 to-indigo-700';
    }
  }, [isDarkMode, weatherData]);

  return (
    <div className={`min-h-screen transition-colors duration-700 ${isDarkMode ? 'dark' : ''}`}>
      <motion.div 
        animate={{ 
          backgroundSize: ["100% 100%", "120% 120%", "100% 100%"],
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className={`min-h-screen bg-gradient-to-br ${backgroundClass} p-4 md:p-8 flex flex-col items-center font-sans transition-all duration-1000 ease-in-out relative overflow-hidden`}
      >
        {/* Dynamic Weather Effects */}
        {weatherData && <WeatherEffect type={weatherData.icon} />}

        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div 
            animate={{ 
              x: [0, 100, 0], 
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-20 -left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          />
          <motion.div 
            animate={{ 
              x: [0, -80, 0], 
              y: [0, 100, 0],
              scale: [1, 1.1, 1],
              opacity: [0.05, 0.15, 0.05]
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 -right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
          />
          <motion.div 
            animate={{ 
              x: [0, 50, 0], 
              y: [0, -100, 0],
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-20 left-1/3 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"
          />
        </div>

        <header className="w-full max-w-3xl mb-4 text-center sm:text-left relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-md">Weather Dashboard</h1>
        </header>
        
        <div className="relative z-10 w-full flex flex-col items-center">
          <Navbar />
          
          <main className="w-full flex-1">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/forecast" element={<Forecast />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </AnimatePresence>
          </main>
        </div>
      </motion.div>
    </div>
  );
};

export default function App() {
  return (
    <WeatherProvider>
      <Router>
        <AppContent />
      </Router>
    </WeatherProvider>
  );
}
