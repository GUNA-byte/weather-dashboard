/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WeatherProvider, useWeather } from './context/WeatherContext';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Forecast } from './pages/Forecast';
import { Settings } from './pages/Settings';
import { About } from './pages/About';

const AppContent = () => {
  const { isDarkMode } = useWeather();

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDarkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 dark:from-slate-900 dark:via-indigo-950 dark:to-slate-900 p-4 md:p-8 flex flex-col items-center font-sans">
        <header className="w-full max-w-3xl mb-4 text-center sm:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight drop-shadow-md">Weather Dashboard</h1>
        </header>
        
        <Navbar />
        
        <main className="w-full flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/forecast" element={<Forecast />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
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
