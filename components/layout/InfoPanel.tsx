import React, { useState } from 'react';
import { BookOpen, Layout, Lightbulb } from 'lucide-react';
import { Lesson, Language } from '../../types';
import { LessonPreview } from '../LessonPreview';

interface InfoPanelProps {
  lesson: Lesson;
  lang: Language;
  showHint: boolean;
}

export const InfoPanel: React.FC<InfoPanelProps> = ({ lesson, lang, showHint }) => {
  const [activeTab, setActiveTab] = useState<'app' | 'target'>('app');

  return (
    <div className="w-5/12 flex flex-col border-r border-dark-700 bg-dark-900">
      <div className="flex border-b border-dark-700 bg-dark-800/50">
        <button onClick={() => setActiveTab('app')} className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider border-b-2 ${activeTab === 'app' ? 'border-primary-500 text-white' : 'border-transparent text-slate-500'}`}>Target</button>
        <button onClick={() => setActiveTab('target')} className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider border-b-2 ${activeTab === 'target' ? 'border-primary-500 text-white' : 'border-transparent text-slate-500'}`}>Source</button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {activeTab === 'app' ? (
          <>
            <section>
              <div className="flex items-center gap-2 mb-2 text-primary-400">
                <BookOpen size={16} />
                <h3 className="text-xs font-bold uppercase">Brief</h3>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed pl-6 border-l-2 border-dark-700">
                {lesson.description[lang]}
              </p>
              <ul className="space-y-2 mt-4 pl-6">
                {lesson.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                    <span className="mt-1.5 w-1 h-1 bg-primary-500 rounded-full" />
                    {req[lang]}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-2 text-primary-400">
                <Layout size={16} />
                <h3 className="text-xs font-bold uppercase">Preview</h3>
              </div>
              <div className="p-6 bg-black/20 rounded border border-dark-700 flex justify-center items-center min-h-[160px]">
                <LessonPreview lesson={lesson} />
              </div>
            </section>

            {showHint && (
              <div className="p-4 bg-amber-900/10 border border-amber-900/30 rounded animate-in fade-in slide-in-from-top-2">
                 <h4 className="text-xs font-bold text-amber-500 uppercase mb-1 flex items-center gap-2">
                   <Lightbulb size={12} /> Hint
                 </h4>
                 <code className="text-xs text-amber-200/80 font-mono block bg-black/20 p-2 rounded whitespace-pre-wrap">
                   {lesson.hint[lang]}
                 </code>
              </div>
            )}
          </>
        ) : (
          <div className="relative">
            <div className="absolute top-2 right-2 text-[10px] text-slate-600 font-mono uppercase">Read Only</div>
            <pre className="font-mono text-xs text-slate-400 p-4 bg-black/20 rounded border border-dark-700 overflow-x-auto">
              {lesson.targetCodeDisplay}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};