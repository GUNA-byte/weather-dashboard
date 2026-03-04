import React from 'react';

export const DetailCard = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
  <div className="bg-white/20 dark:bg-slate-900/40 backdrop-blur-xl border border-white/30 dark:border-white/10 shadow-lg rounded-2xl p-4 flex items-center gap-4 text-white transition-all duration-300 hover:bg-white/30 dark:hover:bg-slate-900/50 hover:-translate-y-1">
    <div className="p-3 bg-white/10 dark:bg-black/20 rounded-full text-white">
      {icon}
    </div>
    <div className="flex flex-col">
      <span className="text-sm text-white/80 font-medium">{label}</span>
      <span className="text-lg font-bold">{value}</span>
    </div>
  </div>
);
