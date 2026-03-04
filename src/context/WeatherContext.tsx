import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Unit = 'C' | 'F';

export interface WeatherData {
  city: string;
  date: string;
  temp: number;
  description: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
  feelsLike: number;
  icon: string;
  forecast: { day: string; min: number; max: number; icon: string }[];
  hourly: { time: string; temp: number; icon: string }[];
}

interface WeatherContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  unit: Unit;
  toggleUnit: () => void;
  weatherData: WeatherData | null;
  setWeatherData: React.Dispatch<React.SetStateAction<WeatherData | null>>;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  validationError: string;
  setValidationError: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: (e?: React.FormEvent) => void;
  convertTemp: (temp: number) => number;
}

const mapWeatherCodeToIcon = (code: number, isDay: number = 1) => {
  if (code === 0) return isDay ? 'sun' : 'moon';
  if (code === 1 || code === 2) return isDay ? 'partly-cloudy' : 'cloud';
  if (code === 3) return 'cloud';
  if ([45, 48].includes(code)) return 'cloud';
  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return 'cloud-rain';
  if ([71, 73, 75, 77, 85, 86].includes(code)) return 'cloud-snow';
  if ([95, 96, 99].includes(code)) return 'cloud-lightning';
  return 'sun';
};

const mapWeatherCodeToDescription = (code: number) => {
  if (code === 0) return 'Clear sky';
  if (code === 1) return 'Mainly clear';
  if (code === 2) return 'Partly cloudy';
  if (code === 3) return 'Overcast';
  if ([45, 48].includes(code)) return 'Fog';
  if ([51, 53, 55, 56, 57].includes(code)) return 'Drizzle';
  if ([61, 63, 65, 66, 67].includes(code)) return 'Rain';
  if ([71, 73, 75, 77, 85, 86].includes(code)) return 'Snow';
  if ([80, 81, 82].includes(code)) return 'Showers';
  if ([95, 96, 99].includes(code)) return 'Thunderstorm';
  return 'Unknown';
};

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [unit, setUnit] = useState<Unit>('C');
  const [query, setQuery] = useState('San Francisco');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [validationError, setValidationError] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
    // Initial fetch
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);
  const toggleUnit = () => setUnit(prev => prev === 'C' ? 'F' : 'C');

  const convertTemp = (temp: number) => {
    if (unit === 'F') {
      return Math.round((temp * 9/5) + 32);
    }
    return temp;
  };

  const validateInput = (input: string) => {
    if (!input.trim()) return "City name cannot be empty.";
    if (input.length > 40) return "City name must be 40 characters or less.";
    if (/^\d+$/.test(input)) return "City name cannot be numbers only.";
    if (!/^[a-zA-Z\s\-]+$/.test(input)) return "Only letters, spaces, and hyphens are allowed.";
    return "";
  };

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    // Use the current query state, trimming whitespace
    const trimmedQuery = query.trim();
    
    const valError = validateInput(trimmedQuery);
    if (valError) {
      setValidationError(valError);
      return;
    }
    
    setValidationError('');
    setLoading(true);
    setError('');
    setWeatherData(null);
    
    try {
      // 1. Geocoding API
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(trimmedQuery)}&count=1&language=en&format=json`);
      if (!geoRes.ok) throw new Error('Network response was not ok');
      const geoData = await geoRes.json();
      
      if (!geoData.results || geoData.results.length === 0) {
        setError('City not found. Please enter a valid city.');
        setLoading(false);
        return;
      }
      
      const city = geoData.results[0];
      
      // 2. Weather API
      const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,pressure_msl,wind_speed_10m&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`);
      if (!weatherRes.ok) throw new Error('Network response was not ok');
      const data = await weatherRes.json();
      
      const current = data.current;
      const daily = data.daily;
      const hourly = data.hourly;
      
      const date = new Date(current.time || new Date()).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
      
      const forecast = [];
      for (let i = 1; i < 6; i++) {
        if (daily.time[i]) {
          const dayDate = new Date(daily.time[i]);
          forecast.push({
            day: dayDate.toLocaleDateString('en-US', { weekday: 'short' }),
            min: Math.round(daily.temperature_2m_min[i]),
            max: Math.round(daily.temperature_2m_max[i]),
            icon: mapWeatherCodeToIcon(daily.weather_code[i], 1)
          });
        }
      }
      
      const currentHourIndex = hourly.time.findIndex((t: string) => new Date(t).getTime() > new Date().getTime()) || 0;
      const nextHourly = [];
      for (let i = currentHourIndex; i < currentHourIndex + 24; i += 3) {
        if (hourly.time[i]) {
          const hourDate = new Date(hourly.time[i]);
          nextHourly.push({
            time: hourDate.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }),
            temp: Math.round(hourly.temperature_2m[i]),
            icon: mapWeatherCodeToIcon(hourly.weather_code[i], 1)
          });
        }
      }
      
      // Format city name nicely
      const locationParts = [city.name];
      if (city.admin1 && city.admin1 !== city.name) locationParts.push(city.admin1);
      if (city.country) locationParts.push(city.country);
      
      setWeatherData({
        city: locationParts.join(', '),
        date,
        temp: Math.round(current.temperature_2m),
        description: mapWeatherCodeToDescription(current.weather_code),
        humidity: current.relative_humidity_2m,
        windSpeed: current.wind_speed_10m,
        pressure: current.pressure_msl,
        feelsLike: Math.round(current.apparent_temperature),
        icon: mapWeatherCodeToIcon(current.weather_code, current.is_day),
        forecast,
        hourly: nextHourly
      });
      
    } catch (err) {
      setError('Failed to fetch weather data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <WeatherContext.Provider value={{
      isDarkMode, toggleDarkMode,
      unit, toggleUnit,
      weatherData, setWeatherData,
      query, setQuery,
      loading, setLoading,
      error, setError,
      validationError, setValidationError,
      handleSearch,
      convertTemp
    }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};
