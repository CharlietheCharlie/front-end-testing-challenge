import React from 'react';
import { Code2 } from 'lucide-react';
import { Lesson, Language } from '../../types';
import { CodeEditor } from '../CodeEditor';
import { TestRunner } from '../TestRunner';

interface EditorPanelProps {
  lesson: Lesson;
  code: string;
  onCodeChange: (value: string) => void;
  onTestPass: (passed: boolean) => void;
  lang: Language;
}

export const EditorPanel: React.FC<EditorPanelProps> = ({ 
  lesson, 
  code, 
  onCodeChange, 
  onTestPass, 
  lang 
}) => {
  return (
    <div className="w-7/12 flex flex-col bg-dark-950">
      <div className="h-9 border-b border-dark-700 flex items-center px-4 bg-dark-900 gap-2">
        <Code2 size={14} className="text-primary-500" />
        <span className="text-xs font-mono text-slate-400">test_suite.spec.ts</span>
      </div>

      <div className="flex-1 relative">
        <CodeEditor code={code} onChange={onCodeChange} />
      </div>

      <div className="h-1/3 min-h-[180px] border-t border-dark-700">
        <TestRunner 
          lesson={lesson} 
          code={code} 
          onResultChange={onTestPass} 
          lang={lang} 
        />
      </div>
    </div>
  );
};