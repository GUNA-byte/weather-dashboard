import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { useWeather } from '../context/WeatherContext';
import { WeatherIcon } from '../components/WeatherIcon';
import { AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';

export const Forecast = () => {
  const { weatherData, convertTemp, unit } = useWeather();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (!weatherData) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center h-64 text-white gap-4 bg-white/10 dark:bg-slate-900/20 backdrop-blur-md rounded-3xl border border-white/20"
      >
        <AlertCircle className="w-12 h-12 text-white/60" />
        <p className="text-lg font-medium text-white/80">Search for a city to view the forecast.</p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-3xl mx-auto space-y-8"
    >
      {/* Hourly Forecast */}
      <div className="bg-gradient-to-br from-white/30 via-white/20 to-white/10 dark:from-slate-900/50 dark:via-slate-900/40 dark:to-slate-900/30 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-2xl rounded-3xl p-6 md:p-8 relative group">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white drop-shadow-sm">Hourly Forecast</h2>
          <div className="flex gap-2">
            <button 
              onClick={() => scroll('left')}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 border border-white/20"
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 border border-white/20"
              aria-label="Scroll right"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div 
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 snap-x scroll-smooth scrollbar-hide"
        >
          {weatherData.hourly.map((hour, i) => (
            <motion.div 
              key={i} 
              whileHover={{ scale: 1.05, y: -5 }}
              className="snap-start shrink-0 w-[100px] bg-gradient-to-b from-white/20 to-white/5 dark:from-slate-800/50 dark:to-slate-800/20 backdrop-blur-md border border-white/30 dark:border-white/10 shadow-md rounded-2xl p-4 flex flex-col items-center gap-3 text-white transition-all duration-500"
            >
              <span className="font-medium text-sm text-white/80">{hour.time}</span>
              <WeatherIcon type={hour.icon} className="w-8 h-8 drop-shadow-md" />
              <span className="text-lg font-bold">{convertTemp(hour.temp)}°{unit}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 5-Day Forecast */}
      <div className="bg-gradient-to-br from-white/30 via-white/20 to-white/10 dark:from-slate-900/50 dark:via-slate-900/40 dark:to-slate-900/30 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-2xl rounded-3xl p-6 md:p-8">
        <h2 className="text-2xl font-bold text-white mb-6 drop-shadow-sm">5-Day Forecast</h2>
        <div className="flex flex-col gap-4">
          {weatherData.forecast.map((day, i) => (
            <motion.div 
              key={i} 
              whileHover={{ x: 10, backgroundColor: "rgba(255, 255, 255, 0.25)" }}
              className="bg-gradient-to-r from-white/20 to-white/5 dark:from-slate-800/50 dark:to-slate-800/20 backdrop-blur-md border border-white/30 dark:border-white/10 shadow-md rounded-2xl p-4 flex items-center justify-between text-white transition-all duration-500"
            >
              <span className="font-semibold text-lg w-16">{day.day}</span>
              <div className="flex items-center gap-4 flex-1 justify-center">
                <WeatherIcon type={day.icon} className="w-8 h-8 drop-shadow-md" />
              </div>
              <div className="flex gap-4 text-base font-semibold w-24 justify-end">
                <span>{convertTemp(day.max)}°</span>
                <span className="text-white/60">{convertTemp(day.min)}°</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
