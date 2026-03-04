import React, { useEffect } from 'react';
import { Search, Loader2, AlertCircle, Droplets, Wind, Gauge, Thermometer } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useWeather } from '../context/WeatherContext';
import { WeatherIcon } from '../components/WeatherIcon';
import { DetailCard } from '../components/DetailCard';

export const Home = () => {
  const { 
    query, setQuery, loading, error, validationError, handleSearch, weatherData, convertTemp, unit 
  } = useWeather();

  // Load initial data if empty
  useEffect(() => {
    if (!weatherData && !loading && !error && !query) {
      setQuery('San Francisco');
    }
  }, [weatherData, loading, error, query, setQuery]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-3xl mx-auto"
    >
      {/* Search Section */}
      <form onSubmit={handleSearch} className="relative mb-2 group">
        <input 
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          maxLength={40}
          className={`w-full py-4 pl-6 pr-14 rounded-2xl bg-white/20 dark:bg-slate-900/40 backdrop-blur-xl border ${validationError ? 'border-red-400 dark:border-red-500/50' : 'border-white/30 dark:border-white/10'} text-white placeholder:text-white/70 outline-none focus:ring-2 focus:ring-white/50 transition-all shadow-lg text-lg`}
          placeholder="Enter city name..."
        />
        <button 
          type="submit" 
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 text-white bg-white/10 hover:bg-white/30 dark:bg-slate-800/50 dark:hover:bg-slate-800/80 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? <Loader2 size={20} className="animate-spin" /> : <Search size={20} />}
        </button>
      </form>
      
      <div className="h-6 mb-4">
        <AnimatePresence>
          {validationError && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-red-200 dark:text-red-400 text-sm font-medium px-2"
            >
              {validationError}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Main Content Area */}
      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center justify-center h-64 text-white gap-4 bg-white/10 dark:bg-slate-900/20 backdrop-blur-md rounded-3xl border border-white/20"
            >
              <Loader2 className="w-12 h-12 animate-spin text-white/80" />
              <p className="text-lg font-medium animate-pulse">Fetching weather data...</p>
            </motion.div>
          ) : error ? (
            <motion.div 
              key="error"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center h-64 text-white gap-4 bg-red-500/20 dark:bg-red-900/30 backdrop-blur-md rounded-3xl border border-red-500/30 p-8 text-center shadow-lg"
            >
              <AlertCircle className="w-16 h-16 text-red-200" />
              <p className="text-xl font-medium text-red-100">{error}</p>
            </motion.div>
          ) : weatherData ? (
            <motion.div 
              key="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* Main Weather Card */}
              <div className="bg-white/20 dark:bg-slate-900/40 backdrop-blur-xl border border-white/30 dark:border-white/10 shadow-xl rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between text-white transition-all duration-300 hover:bg-white/25 dark:hover:bg-slate-900/50 gap-8">
                <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1 min-w-0 w-full">
                  <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-2 break-words w-full line-clamp-2" title={weatherData.city}>{weatherData.city}</h2>
                  <p className="text-white/80 font-medium text-lg">{weatherData.date}</p>
                </div>
                
                <div className="flex items-center gap-6 shrink-0">
                  <WeatherIcon type={weatherData.icon} className="w-20 h-20 md:w-24 md:h-24 text-yellow-300 drop-shadow-lg" />
                  <div className="flex flex-col">
                    <span className="text-7xl md:text-8xl font-black tracking-tighter drop-shadow-md">{convertTemp(weatherData.temp)}°{unit}</span>
                    <span className="text-xl md:text-2xl font-medium text-white/90 mt-1">{weatherData.description}</span>
                  </div>
                </div>
              </div>
              
              {/* Weather Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <DetailCard icon={<Droplets className="text-blue-200"/>} label="Humidity" value={`${weatherData.humidity}%`} />
                <DetailCard icon={<Wind className="text-teal-200"/>} label="Wind Speed" value={`${weatherData.windSpeed} km/h`} />
                <DetailCard icon={<Gauge className="text-purple-200"/>} label="Pressure" value={`${weatherData.pressure} hPa`} />
                <DetailCard icon={<Thermometer className="text-red-200"/>} label="Feels Like" value={`${convertTemp(weatherData.feelsLike)}°${unit}`} />
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
