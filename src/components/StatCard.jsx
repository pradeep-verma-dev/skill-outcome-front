import React from 'react';

const StatCard = ({ title, value, subtitle, icon: Icon, color = 'blue', trend }) => {
  const colorMap = {
    blue: 'border-l-blue-700 text-blue-700 bg-blue-50/50',
    emerald: 'border-l-emerald-600 text-emerald-700 bg-emerald-50/50',
    amber: 'border-l-amber-600 text-amber-700 bg-amber-50/50',
    slate: 'border-l-slate-700 text-slate-700 bg-slate-50/50',
    indigo: 'border-l-indigo-700 text-indigo-700 bg-indigo-50/50',
    crimson: 'border-l-rose-700 text-rose-700 bg-rose-50/50'
  };

  const borderClass = colorMap[color] || colorMap.blue;

  return (
    <div className={`bg-white border border-slate-200 border-l-4 rounded shadow-sm p-4 ${borderClass}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{title}</p>
          <p className="mt-1 text-2xl font-bold text-slate-900 tracking-tight">{value}</p>
          {subtitle && <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p>}
        </div>
        {Icon && (
          <div className="p-2 rounded bg-white border border-slate-200 text-slate-700 shadow-xs">
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
      {trend && (
        <div className="mt-2 text-xs font-medium text-slate-600 flex items-center gap-1 border-t border-slate-100 pt-1.5">
          {trend}
        </div>
      )}
    </div>
  );
};

export default StatCard;
