import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendPositive = true,
  colorScheme = 'sky',
  onClick
}) => {
  const colorMap = {
    sky: {
      bg: 'bg-sky-50',
      text: 'text-sky-600',
      border: 'border-sky-100',
      gradient: 'from-sky-500 to-blue-600'
    },
    teal: {
      bg: 'bg-teal-50',
      text: 'text-teal-600',
      border: 'border-teal-100',
      gradient: 'from-teal-500 to-emerald-600'
    },
    amber: {
      bg: 'bg-amber-50',
      text: 'text-amber-600',
      border: 'border-amber-100',
      gradient: 'from-amber-500 to-orange-600'
    },
    rose: {
      bg: 'bg-rose-50',
      text: 'text-rose-600',
      border: 'border-rose-100',
      gradient: 'from-rose-500 to-pink-600'
    },
    violet: {
      bg: 'bg-violet-50',
      text: 'text-violet-600',
      border: 'border-violet-100',
      gradient: 'from-violet-500 to-purple-600'
    },
    emerald: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-600',
      border: 'border-emerald-100',
      gradient: 'from-emerald-500 to-teal-600'
    }
  };

  const scheme = colorMap[colorScheme] || colorMap.sky;

  return (
    <div
      onClick={onClick}
      className={`bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 relative overflow-hidden group ${
        onClick ? 'cursor-pointer hover:border-sky-300' : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500 tracking-wider uppercase">
            {title}
          </p>
          <h3 className="text-2xl font-extrabold text-slate-900 mt-1 tracking-tight">
            {value}
          </h3>
        </div>

        <div
          className={`h-11 w-11 rounded-xl ${scheme.bg} ${scheme.border} border flex items-center justify-center ${scheme.text} shadow-xs group-hover:scale-110 transition-transform duration-200`}
        >
          {Icon && <Icon size={22} />}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-slate-100">
        <span className="text-slate-500 truncate max-w-[170px]">{subtitle}</span>
        {trend && (
          <span
            className={`inline-flex items-center gap-0.5 font-bold ${
              trendPositive ? 'text-emerald-600' : 'text-rose-600'
            }`}
          >
            {trendPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            {trend}
          </span>
        )}
      </div>

      {/* Subtle bottom decorative bar */}
      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${scheme.gradient} opacity-0 group-hover:opacity-100 transition-opacity`}></div>
    </div>
  );
};
