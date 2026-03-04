import React from 'react';
import { motion } from 'motion/react';
import { useWeather } from '../context/WeatherContext';
import { WeatherIcon } from '../components/WeatherIcon';
import { AlertCircle } from 'lucide-react';

export const Forecast = () => {
  const { weatherData, convertTemp, unit } = useWeather();

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
      <div className="bg-white/20 dark:bg-slate-900/40 backdrop-blur-xl border border-white/30 dark:border-white/10 shadow-xl rounded-3xl p-6 md:p-8">
        <h2 className="text-2xl font-bold text-white mb-6 tracking-tight">Hourly Forecast</h2>
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x scrollbar-hide">
          {weatherData.hourly.map((hour, i) => (
            <div key={i} className="snap-start shrink-0 w-[100px] bg-white/10 dark:bg-slate-800/40 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-md rounded-2xl p-4 flex flex-col items-center gap-3 text-white transition-all duration-300 hover:bg-white/20 dark:hover:bg-slate-800/60 hover:-translate-y-1">
              <span className="font-medium text-sm text-white/80">{hour.time}</span>
              <WeatherIcon type={hour.icon} className="w-8 h-8 drop-shadow-md" />
              <span className="text-lg font-bold">{convertTemp(hour.temp)}°{unit}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 5-Day Forecast */}
      <div className="bg-white/20 dark:bg-slate-900/40 backdrop-blur-xl border border-white/30 dark:border-white/10 shadow-xl rounded-3xl p-6 md:p-8">
        <h2 className="text-2xl font-bold text-white mb-6 tracking-tight">5-Day Forecast</h2>
        <div className="flex flex-col gap-4">
          {weatherData.forecast.map((day, i) => (
            <div key={i} className="bg-white/10 dark:bg-slate-800/40 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-md rounded-2xl p-4 flex items-center justify-between text-white transition-all duration-300 hover:bg-white/20 dark:hover:bg-slate-800/60">
              <span className="font-semibold text-lg w-16">{day.day}</span>
              <div className="flex items-center gap-4 flex-1 justify-center">
                <WeatherIcon type={day.icon} className="w-8 h-8 drop-shadow-md" />
              </div>
              <div className="flex gap-4 text-base font-semibold w-24 justify-end">
                <span>{convertTemp(day.max)}°</span>
                <span className="text-white/60">{convertTemp(day.min)}°</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
