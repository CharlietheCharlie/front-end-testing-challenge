import React from 'react';
import { Zap, Check, Copyright, Book } from 'lucide-react';
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
  // Group lessons by section for better navigation structure
  const sections = Array.from(new Set(lessons.map(l => l.section)));
  
  // Calculate progress percentage
  const progress = Math.round((completedLessons.length / lessons.length) * 100);
  const currentYear = new Date().getFullYear();

  return (
    <aside className="w-64 bg-dark-900 border-r border-dark-700 flex flex-col hidden md:flex font-sans">
      {/* App Logo / Header */}
      <div className="p-4 border-b border-dark-700">
        <h1 className="text-xl font-bold flex items-center gap-2 text-white tracking-tight">
          <Zap className="text-primary-500 fill-primary-500" size={20} />
          Front-end Testing Challenge
        </h1>
        <p className="text-xs text-slate-500 mt-1 pl-7">Dev Lab v2.1</p>
      </div>
      
      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-6">
        
        {/* Intro / Cheatsheet Button */}
        <div className="px-2 mt-2">
          <button
            onClick={() => onSelectLesson('INTRO')}
            className={`w-full text-left px-3 py-2.5 rounded text-xs font-bold uppercase tracking-wide transition-all flex items-center gap-3 ${
              activeLessonId === 'INTRO' 
                ? 'bg-purple-900/30 text-purple-200 border border-purple-800/50' 
                : 'bg-dark-800 text-slate-400 hover:bg-dark-700 hover:text-slate-200 border border-dark-700'
            }`}
          >
            <Book size={14} className={activeLessonId === 'INTRO' ? 'text-purple-400' : 'text-slate-500'} />
            {lang === 'en' ? 'Guide / Cheatsheet' : '導覽 / 速查表'}
          </button>
        </div>

        {sections.map(section => (
          <div key={section} className="px-2">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 pl-2">
              {section}
            </h3>
            <div className="space-y-0.5">
              {lessons.filter(l => l.section === section).map((lesson) => {
                const isCompleted = completedLessons.includes(lesson.id);
                const isActive = activeLessonId === lesson.id;
                
                return (
                  <button
                    key={lesson.id}
                    onClick={() => onSelectLesson(lesson.id)}
                    className={`w-full text-left px-3 py-2 rounded text-xs font-medium transition-all flex items-center gap-3 ${
                      isActive 
                        ? 'bg-primary-900/50 text-primary-200 border border-primary-800/50' 
                        : 'text-slate-400 hover:bg-dark-800 hover:text-slate-200'
                    }`}
                  >
                    {/* Status Indicator (Checkmark or Lesson Number) */}
                    <span className={`w-4 h-4 rounded flex items-center justify-center text-[9px] font-bold border ${
                         isCompleted
                         ? 'border-green-600 bg-green-900/30 text-green-500' 
                         : 'border-slate-700 text-slate-600'
                      }`}>
                        {isCompleted ? <Check size={10} /> : lesson.id.split('.')[1]}
                    </span>
                    <span className="truncate">{lesson.title[lang]}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Area: Progress & Copyright */}
      <div className="p-4 border-t border-dark-700 bg-dark-800/50">
        {/* Progress Bar */}
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] uppercase text-slate-500 font-bold">Progress</span>
          <span className="text-xs font-bold text-primary-400">{progress}%</span>
        </div>
        <div className="w-full bg-dark-700 h-1.5 rounded-full overflow-hidden mb-4">
           <div 
             className="bg-primary-500 h-full transition-all duration-500 ease-out" 
             style={{ width: `${progress}%` }} 
           />
        </div>

        <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-600 border-t border-dark-700/50 pt-3">
          <Copyright size={10} />
          <span>{currentYear} CharlietheCharlie</span>
        </div>
      </div>
    </aside>
  );
};