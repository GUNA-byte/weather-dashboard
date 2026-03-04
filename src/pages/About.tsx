import React from 'react';
import { motion } from 'motion/react';
import { CloudSun, Code2, Layout, Zap } from 'lucide-react';

export const About = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-3xl mx-auto"
    >
      <div className="bg-white/20 dark:bg-slate-900/40 backdrop-blur-xl border border-white/30 dark:border-white/10 shadow-xl rounded-3xl p-6 md:p-8 text-white">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-4 bg-white/20 dark:bg-black/20 rounded-2xl">
            <CloudSun size={40} className="text-yellow-300" />
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">About Weather App</h2>
            <p className="text-white/80 text-lg">Version 1.0.0</p>
          </div>
        </div>

        <div className="space-y-8">
          <section>
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Layout size={20} />
              Description
            </h3>
            <p className="text-white/80 leading-relaxed bg-white/10 dark:bg-slate-800/40 p-4 rounded-2xl border border-white/10">
              A clean, modern, and responsive Weather Dashboard UI built with React. 
              It features a beautiful glassmorphism design, smooth animations, and a seamless 
              user experience. The app provides current weather conditions, hourly forecasts, 
              and a 5-day outlook.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Code2 size={20} />
              Tech Stack
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {['React 19', 'TypeScript', 'Tailwind CSS', 'React Router', 'Lucide Icons', 'Motion'].map((tech) => (
                <div key={tech} className="bg-white/10 dark:bg-slate-800/40 p-3 rounded-xl border border-white/10 text-center font-medium">
                  {tech}
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Zap size={20} />
              Features
            </h3>
            <ul className="list-disc list-inside space-y-2 text-white/80 bg-white/10 dark:bg-slate-800/40 p-4 rounded-2xl border border-white/10">
              <li>Real-time weather data simulation</li>
              <li>Dark and Light mode support</li>
              <li>Celsius and Fahrenheit toggle</li>
              <li>Responsive design for all devices</li>
              <li>Smooth page transitions</li>
            </ul>
          </section>
        </div>
      </div>
    </motion.div>
  );
};
