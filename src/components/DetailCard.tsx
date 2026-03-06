import React from 'react';

export const DetailCard = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
  <div className="bg-gradient-to-br from-white/25 to-white/5 dark:from-slate-900/50 dark:to-slate-900/20 backdrop-blur-xl border border-white/30 dark:border-white/10 shadow-lg rounded-2xl p-4 flex items-center gap-4 text-white transition-all duration-500 hover:shadow-white/5 dark:hover:shadow-black/20 hover:-translate-y-1 group">
    <div className="p-3 bg-white/10 dark:bg-black/20 rounded-full text-white transition-transform duration-500 group-hover:scale-110">
      {icon}
    </div>
    <div className="flex flex-col">
      <span className="text-sm text-white/80 font-medium">{label}</span>
      <span className="text-lg font-bold">{value}</span>
    </div>
  </div>
);
