import React from 'react';
import { motion } from 'motion/react';
import { useWeather } from '../context/WeatherContext';
import { Moon, SunMedium, Thermometer } from 'lucide-react';

export const Settings = () => {
  const { isDarkMode, toggleDarkMode, unit, toggleUnit } = useWeather();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-3xl mx-auto"
    >
      <div className="bg-gradient-to-br from-white/30 via-white/20 to-white/10 dark:from-slate-900/50 dark:via-slate-900/40 dark:to-slate-900/30 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-2xl rounded-3xl p-6 md:p-8 text-white">
        <h2 className="text-3xl font-bold mb-8 drop-shadow-sm">Settings</h2>
        
        <div className="space-y-6">
          {/* Theme Toggle */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-white/20 to-white/5 dark:from-slate-800/50 dark:to-slate-800/20 rounded-2xl border border-white/30 dark:border-white/10">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 dark:bg-black/20 rounded-full">
                {isDarkMode ? <Moon size={24} /> : <SunMedium size={24} />}
              </div>
              <div>
                <h3 className="text-lg font-semibold">Theme</h3>
                <p className="text-sm text-white/70">Toggle between Light and Dark mode</p>
              </div>
            </div>
            <button 
              onClick={toggleDarkMode}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent ${isDarkMode ? 'bg-indigo-500' : 'bg-white/30'}`}
            >
              <span className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${isDarkMode ? 'translate-x-7' : 'translate-x-1'}`} />
            </button>
          </div>

          {/* Unit Toggle */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-white/20 to-white/5 dark:from-slate-800/50 dark:to-slate-800/20 rounded-2xl border border-white/30 dark:border-white/10">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 dark:bg-black/20 rounded-full">
                <Thermometer size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Temperature Unit</h3>
                <p className="text-sm text-white/70">Switch between Celsius and Fahrenheit</p>
              </div>
            </div>
            <div className="flex bg-white/20 dark:bg-slate-800/60 rounded-xl p-1">
              <button 
                onClick={() => unit !== 'C' && toggleUnit()}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${unit === 'C' ? 'bg-white text-indigo-600 shadow-sm' : 'text-white hover:bg-white/10'}`}
              >
                °C
              </button>
              <button 
                onClick={() => unit !== 'F' && toggleUnit()}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${unit === 'F' ? 'bg-white text-indigo-600 shadow-sm' : 'text-white hover:bg-white/10'}`}
              >
                °F
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
