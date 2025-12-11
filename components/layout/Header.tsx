import React from 'react';
import { Lightbulb, Globe, Accessibility } from 'lucide-react';
import { Lesson, Language } from '../../types';

interface HeaderProps {
  lesson: Lesson;
  showHint: boolean;
  onToggleHint: () => void;
  lang: Language;
  onToggleLang: () => void;
  onToggleA11y: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  lesson, 
  showHint, 
  onToggleHint, 
  lang, 
  onToggleLang,
  onToggleA11y
}) => {
  return (
    <header className="h-14 border-b border-dark-700 flex items-center justify-between px-6 bg-dark-900 shrink-0">
      <div className="flex items-center gap-4">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider">{lesson.title[lang]}</h2>
        <div className="flex gap-2">
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-dark-800 text-slate-400 border border-dark-700">{lesson.framework}</span>
          <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
            lesson.difficulty === 'Tricky' ? 'border-amber-900 text-amber-500 bg-amber-900/20' :
            lesson.difficulty === 'Advanced' ? 'border-purple-900 text-purple-400 bg-purple-900/20' :
            'border-green-900 text-green-500 bg-green-900/20'
          }`}>
            {lesson.difficulty}
          </span>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        {/* A11y Roles Table */}
        <button
          onClick={onToggleA11y}
          className="flex items-center gap-2 px-3 py-1.5 rounded text-xs font-bold bg-primary-900/20 text-primary-400 border border-primary-900/50 hover:bg-primary-900/40 hover:text-primary-300 transition-colors"
          title="View A11y Roles Cheatsheet"
        >
          <Accessibility size={14} />
          Roles
        </button>

         {/* Hint Toggle */}
         <button 
          onClick={onToggleHint}
          className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-bold transition-all ${
            showHint ? 'bg-amber-900/30 text-amber-400 border border-amber-800' : 'bg-dark-800 text-slate-400 border border-dark-700 hover:bg-dark-700'
          }`}
        >
          <Lightbulb size={14} />
          {showHint ? 'Hide Hint' : 'Hint'}
        </button>

         {/* Language Switch */}
        <button 
          onClick={onToggleLang}
          className="flex items-center gap-2 px-3 py-1.5 rounded text-xs font-bold bg-dark-800 text-slate-400 border border-dark-700 hover:text-white"
        >
          <Globe size={14} />
          {lang.toUpperCase()}
        </button>
      </div>
    </header>
  );
};