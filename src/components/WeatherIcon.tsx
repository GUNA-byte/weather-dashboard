import React from 'react';
import { Sun, Cloud, CloudRain, CloudLightning, CloudSun, CloudSnow, Moon } from 'lucide-react';

export const WeatherIcon = ({ type, className }: { type: string, className?: string }) => {
  switch (type) {
    case 'sun': return <Sun className={className} />;
    case 'moon': return <Moon className={className} />;
    case 'cloud': return <Cloud className={className} />;
    case 'cloud-rain': return <CloudRain className={className} />;
    case 'cloud-snow': return <CloudSnow className={className} />;
    case 'cloud-lightning': return <CloudLightning className={className} />;
    case 'partly-cloudy': return <CloudSun className={className} />;
    default: return <Sun className={className} />;
  }
};
