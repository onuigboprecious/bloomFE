import React, { useState } from 'react';
import { MoreHorizontal, Calendar as CalendarIcon, Clock } from 'lucide-react';

export const ScheduleWidget = ({ events = [] }) => {
  const [selectedDay, setSelectedDay] = useState('We 17');

  const days = [
    { day: 'Mo', date: '15' },
    { day: 'Tu', date: '16' },
    { day: 'We', date: '17' },
    { day: 'Th', date: '18' },
    { day: 'Fr', date: '19' },
    { day: 'Sa', date: '20' },
    { day: 'Su', date: '14' }
  ];

  const defaultEvents = [
    {
      id: 'evt-1',
      title: 'Kickoff Meeting',
      time: '01:00 PM to 02:30 PM',
      color: 'bg-emerald-500',
      attendees: [
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
      ]
    },
    {
      id: 'evt-2',
      title: 'Create Wordpress website for event Registration',
      time: '04:00 PM to 02:30 PM',
      color: 'bg-blue-600',
      attendees: [
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200'
      ]
    },
    {
      id: 'evt-3',
      title: 'Create User flow for hotel booking',
      time: '05:00 PM to 02:30 PM',
      color: 'bg-amber-500',
      attendees: [
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200'
      ]
    }
  ];

  const displayEvents = events.length > 0 ? events : defaultEvents;

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 space-y-6 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-5 h-5 text-slate-700" />
          <h3 className="text-base font-extrabold text-slate-900">Schedule</h3>
        </div>
        <button type="button" className="text-slate-400 hover:text-slate-600 transition-colors p-1 cursor-pointer">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Days Strip Picker */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2 pb-2 border-b border-slate-100">
        {days.map((item) => {
          const dayKey = `${item.day} ${item.date}`;
          const isSelected = selectedDay === dayKey;
          return (
            <button
              key={dayKey}
              type="button"
              onClick={() => setSelectedDay(dayKey)}
              className={`flex flex-col items-center justify-center py-2 px-1 rounded-2xl transition-all cursor-pointer ${
                isSelected
                  ? 'bg-purple-500 text-white shadow-md shadow-purple-500/20 font-bold'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-semibold'
              }`}
            >
              <span className="text-[11px] uppercase tracking-wider">{item.day}</span>
              <span className="text-sm font-extrabold mt-0.5">{item.date}</span>
            </button>
          );
        })}
      </div>

      {/* Events Timeline */}
      <div className="space-y-4">
        {displayEvents.map((evt) => (
          <div key={evt.id} className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50/80 transition-colors group">
            <div className="flex items-start gap-3 min-w-0 pr-2">
              {/* Left Colored Bar Indicator */}
              <div className={`w-1 h-10 rounded-full ${evt.color || 'bg-blue-600'} shrink-0 mt-0.5`} />
              <div className="space-y-1 min-w-0">
                <h4 className="text-xs font-black text-slate-900 truncate leading-snug">{evt.title}</h4>
                <div className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                  <Clock className="w-3 h-3 text-slate-400 shrink-0" />
                  <span>{evt.time}</span>
                </div>
              </div>
            </div>

            {/* Attendee Avatars & Actions */}
            <div className="flex items-center gap-3 shrink-0">
              {evt.attendees && evt.attendees.length > 0 && (
                <div className="flex -space-x-2 overflow-hidden">
                  {evt.attendees.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt="Attendee"
                      className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
                    />
                  ))}
                </div>
              )}
              <button type="button" className="text-slate-300 group-hover:text-slate-500 p-1 cursor-pointer transition-colors">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleWidget;
