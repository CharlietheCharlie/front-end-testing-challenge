import React from 'react';
import { Zap, Check } from 'lucide-react';
import { Lesson, Language } from '../../types';

interface SidebarProps {
  lessons: Lesson[];
  activeLessonId: string;
  completedLessons: string[];
  onSelectLesson: (id: string) => void;
  lang: Language;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  lessons, 
  activeLessonId, 
  completedLessons, 
  onSelectLesson, 
  lang 
}) => {
  // Group lessons by section
  const sections = Array.from(new Set(lessons.map(l => l.section)));

  return (
    <aside className="w-64 bg-dark-900 border-r border-dark-700 flex flex-col hidden md:flex">
      <div className="p-4 border-b border-dark-700">
        <h1 className="text-xl font-bold flex items-center gap-2 text-white tracking-tight">
          <Zap className="text-primary-500 fill-primary-500" size={20} />
          Front-end Testing Chanllenge
        </h1>
        <p className="text-xs text-slate-500 mt-1 pl-7">v1.0</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2 space-y-6">
        {sections.map(section => (
          <div key={section} className="px-2">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 pl-2">{section}</h3>
            <div className="space-y-0.5">
              {lessons.filter(l => l.section === section).map((lesson) => (
                <button
                  key={lesson.id}
                  onClick={() => onSelectLesson(lesson.id)}
                  className={`w-full text-left px-3 py-2 rounded text-xs font-medium transition-all flex items-center gap-3 ${
                    activeLessonId === lesson.id 
                      ? 'bg-primary-900/50 text-primary-200 border border-primary-800/50' 
                      : 'text-slate-400 hover:bg-dark-800 hover:text-slate-200'
                  }`}
                >
                  <span className={`w-4 h-4 rounded flex items-center justify-center text-[9px] font-bold border ${
                       completedLessons.includes(lesson.id) 
                       ? 'border-green-600 bg-green-900/30 text-green-500' 
                       : 'border-slate-700 text-slate-600'
                    }`}>
                      {completedLessons.includes(lesson.id) ? <Check size={10} /> : lesson.id.split('.')[1]}
                  </span>
                  <span className="truncate">{lesson.title[lang]}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-dark-700 bg-dark-800/50">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] uppercase text-slate-500 font-bold">Progress</span>
          <span className="text-xs font-bold text-primary-400">{Math.round((completedLessons.length / lessons.length) * 100)}%</span>
        </div>
        <div className="w-full bg-dark-700 h-1.5 rounded-full overflow-hidden">
           <div className="bg-primary-500 h-full transition-all duration-500" style={{ width: `${(completedLessons.length / lessons.length) * 100}%` }} />
        </div>
      </div>
    </aside>
  );
};