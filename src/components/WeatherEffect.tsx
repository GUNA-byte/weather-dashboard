import React from 'react';
import { motion } from 'motion/react';

interface WeatherEffectProps {
  type: string;
}

export const WeatherEffect = ({ type }: WeatherEffectProps) => {
  if (type === 'cloud-rain' || type === 'cloud-lightning') {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -20, x: Math.random() * 100 + '%' }}
            animate={{ y: '110vh' }}
            transition={{
              duration: Math.random() * 1 + 0.5,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 2
            }}
            className="absolute w-[1px] h-8 bg-blue-200/40"
          />
        ))}
      </div>
    );
  }

  if (type === 'cloud-snow') {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -20, x: Math.random() * 100 + '%' }}
            animate={{ 
              y: '110vh',
              x: (Math.random() * 100) + (Math.sin(i) * 5) + '%'
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5
            }}
            className="absolute w-2 h-2 bg-white/60 rounded-full blur-[1px]"
          />
        ))}
      </div>
    );
  }

  return null;
};
