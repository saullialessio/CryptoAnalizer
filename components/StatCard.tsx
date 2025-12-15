import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string;
  trend?: number;
  icon?: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, trend, icon }) => {
  const isUp = trend && trend >= 0;

  return (
    <div className="bg-slate-800 p-5 rounded-lg border border-slate-700 shadow-sm hover:border-slate-600 transition-colors">
      <div className="flex justify-between items-start mb-2">
        <span className="text-slate-400 text-sm font-medium">{label}</span>
        {icon && <span className="text-slate-500 bg-slate-700/50 p-1.5 rounded-md">{icon}</span>}
      </div>
      <div className="flex items-baseline space-x-2">
        <h3 className="text-2xl font-bold text-white tracking-tight">{value}</h3>
      </div>
      {trend !== undefined && (
        <div className={`flex items-center mt-2 text-xs font-medium ${isUp ? 'text-emerald-400' : 'text-red-400'}`}>
          {isUp ? <ArrowUpRight size={14} className="mr-1" /> : <ArrowDownRight size={14} className="mr-1" />}
          <span>{Math.abs(trend)}%</span>
          <span className="text-slate-500 ml-1 font-normal">vs last 24h</span>
        </div>
      )}
    </div>
  );
};

export default StatCard;
