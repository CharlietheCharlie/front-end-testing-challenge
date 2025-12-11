import React from 'react';

interface CodeEditorProps {
  code: string;
  onChange: (value: string) => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ code, onChange }) => {
  return (
    <div className="relative w-full h-full font-mono text-sm bg-dark-950 overflow-hidden">
      {/* Line Numbers */}
      <div className="absolute top-0 left-0 w-10 h-full bg-dark-900 border-r border-dark-700 flex flex-col items-center pt-4 text-slate-600 select-none z-10 overflow-hidden">
        {Array.from({ length: 99 }).map((_, i) => (
          <div key={i} className="h-6 text-[10px] leading-6">{i + 1}</div>
        ))}
      </div>
      
      {/* Subtle Top Gradient */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-900/20 via-primary-500/10 to-transparent opacity-50 pointer-events-none z-20"></div>

      <textarea
        value={code}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
        className="w-full h-full pl-12 p-4 bg-transparent text-slate-300 caret-primary-500 outline-none resize-none leading-6 font-mono focus:bg-white/[0.02] transition-colors selection:bg-primary-900/50 selection:text-primary-200"
        placeholder="// Test Suite ready. Start typing..."
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          tabSize: 2
        }}
        onKeyDown={(e) => {
          if (e.key === 'Tab') {
            e.preventDefault();
            const start = e.currentTarget.selectionStart;
            const end = e.currentTarget.selectionEnd;
            const newValue = code.substring(0, start) + "  " + code.substring(end);
            onChange(newValue);
            setTimeout(() => {
              e.currentTarget.selectionStart = e.currentTarget.selectionEnd = start + 2;
            }, 0);
          }
        }}
      />
    </div>
  );
};