import React, { useState } from 'react';
import { FileText, CheckCircle2, Circle } from 'lucide-react';

export const NotesChecklistWidget = () => {
  const [items, setItems] = useState([
    {
      id: 'note-1',
      title: 'Landing Page For Website',
      description: 'To get started on a landing page, could you provide a bit more detail about its purpose?',
      completed: false
    },
    {
      id: 'note-2',
      title: 'Fixing icons with dark backgrounds',
      description: 'Use icons that are easily recognizable and straightforward. Avoid overly complex designs that might confuse users.',
      completed: false
    },
    {
      id: 'note-3',
      title: 'Discussion regarding userflow-improvement',
      description: "What's the main goal of the landing page? (e.g., lead generation, product promotion)",
      completed: true
    }
  ]);

  const toggleItem = (id) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 space-y-6 shadow-xs h-full flex flex-col justify-between">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-slate-700" />
          <h3 className="text-base font-extrabold text-slate-900">Notes</h3>
        </div>

        {/* Checklist */}
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className="p-3.5 rounded-2xl hover:bg-slate-50/80 transition-all cursor-pointer flex items-start gap-3 border border-transparent hover:border-slate-100 group"
            >
              <button
                type="button"
                className="mt-0.5 text-slate-300 group-hover:text-purple-500 transition-colors shrink-0"
              >
                {item.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-purple-600 fill-purple-100" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-300" />
                )}
              </button>

              <div className="space-y-1 min-w-0 flex-1">
                <h4
                  className={`text-xs font-black text-slate-900 leading-snug transition-all ${
                    item.completed ? 'line-through text-slate-400 font-semibold' : ''
                  }`}
                >
                  {item.title}
                </h4>
                <p className="text-[11px] text-slate-500 leading-relaxed font-medium line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 text-right">
        <span className="text-[11px] font-extrabold text-purple-600 hover:text-purple-700 cursor-pointer">
          + Add New Quick Note
        </span>
      </div>
    </div>
  );
};

export default NotesChecklistWidget;
