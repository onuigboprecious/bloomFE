import React from 'react';
import { Eye, TrendingUp, Users, Smartphone, Clock, ArrowUpRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { mockAnalyticsHourly } from '../../data/mockData';

export const AnalyticsTab = () => {
  const { profile, leads } = useApp();

  const maxTaps = Math.max(...mockAnalyticsHourly.map(d => d.taps));

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">Real-time NFC Tap Analytics</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Track profile views, unique phone scans, lead conversions, and peak networking hours.
        </p>
      </div>

      {/* Analytics KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-50 dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Total NFC Taps</span>
            <Smartphone className="w-4 h-4 text-cyan-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
            {profile.stats.totalTaps.toLocaleString()}
          </div>
          <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-0.5">
            <TrendingUp className="w-3 h-3" /> +18.4% this month
          </span>
        </div>

        <div className="bg-slate-50 dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Unique Devices</span>
            <Users className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
            {profile.stats.uniqueVisitors.toLocaleString()}
          </div>
          <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-0.5">
            <TrendingUp className="w-3 h-3" /> 82% unique tap rate
          </span>
        </div>

        <div className="bg-slate-50 dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Leads Captured</span>
            <Eye className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
            {profile.stats.leadsCaptured.toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-500">Saved contact details</span>
        </div>

        <div className="bg-slate-50 dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Conversion Rate</span>
            <TrendingUp className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
            {profile.stats.conversionRate}%
          </div>
          <span className="text-[11px] text-emerald-600 font-bold">Top 5% networking efficiency</span>
        </div>
      </div>

      {/* Time-of-Day Bar Chart */}
      <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#00BCFF]" />
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Time-of-Day Tap Distribution</h4>
          </div>
          <span className="text-xs text-slate-400">Peak hours: 02:00 PM - 04:00 PM</span>
        </div>

        {/* CSS Bar Chart */}
        <div className="pt-6 pb-2 grid grid-cols-7 gap-3 items-end h-48 border-b border-slate-200 dark:border-slate-800">
          {mockAnalyticsHourly.map((item) => {
            const heightPercent = Math.round((item.taps / maxTaps) * 100);
            return (
              <div key={item.hour} className="flex flex-col items-center gap-2 group h-full justify-end">
                <div className="text-[10px] font-bold font-mono text-cyan-600 dark:text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.taps}
                </div>
                <div
                  style={{ height: `${heightPercent}%` }}
                  className="w-full bg-cyan-500 rounded-t-xl group-hover:brightness-110 transition-all min-h-[12px]"
                />
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 truncate">
                  {item.hour}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Captured Leads Table */}
      <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-4">
        <h4 className="text-sm font-bold text-slate-900 dark:text-white">Recently Captured Contact Leads</h4>
        <div className="divide-y divide-slate-200 dark:divide-slate-800">
          {leads.map((lead) => (
            <div key={lead.id} className="py-3 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">{lead.name}</span>
                <span className="text-slate-500 dark:text-slate-400">{lead.role} • {lead.email}</span>
              </div>
              <div className="text-right">
                <span className="bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 font-bold px-2 py-0.5 rounded-full text-[10px]">
                  {lead.method}
                </span>
                <span className="text-slate-400 block text-[10px] mt-0.5">{lead.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsTab;
