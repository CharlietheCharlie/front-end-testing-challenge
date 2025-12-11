import React, { useState } from 'react';
import { Lesson, TestResult } from '../types';
import { CheckCircle2, XCircle, Terminal, Play, Loader2, Cpu, Bug, AlertTriangle } from 'lucide-react';

interface TestRunnerProps {
  lesson: Lesson;
  code: string;
  onResultChange: (passed: boolean) => void;
  lang: 'en' | 'zh';
}

interface LogEntry {
  type: 'info' | 'success' | 'error' | 'warning' | 'debug';
  message: string;
}

// Common RTL/Jest Anti-patterns
const ANTI_PATTERNS = [
  {
    pattern: /const\s+\{.*\}\s+=\s+render\(/,
    message: { en: "Prefer using 'screen' object instead of destructuring render.", zh: "建議使用 'screen' 物件，而不是從 render 解構。" }
  },
  {
    pattern: /container\.querySelector/,
    message: { en: "Avoid querying the DOM directly. Use semantic queries (getByRole, etc).", zh: "避免直接查詢 DOM (querySelector)。請使用語意化查詢 (getByRole 等)。" }
  },
  {
    pattern: /fireEvent\./,
    message: { en: "Prefer 'userEvent' over 'fireEvent' for more realistic interactions.", zh: "建議使用 'userEvent' 取代 'fireEvent' 以模擬更真實的使用者行為。" }
  },
  {
    pattern: /await\s+act\(/,
    message: { en: "RTL helpers (render, userEvent) are wrapped in act() automatically. You rarely need it manually.", zh: "RTL 的工具通常已包含 act()。通常不需要手動呼叫它。" }
  },
  {
    pattern: /waitFor\(\s*\(\)\s*=>\s*\{\},/,
    message: { en: "Empty waitFor callbacks can be flaky.", zh: "空的 waitFor callback 可能導致測試不穩定。" }
  }
];

export const TestRunner: React.FC<TestRunnerProps> = ({ lesson, code, onResultChange, lang }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<TestResult | null>(null);
  const [displayLogs, setDisplayLogs] = useState<LogEntry[]>([]);

  // Simulate screen.debug() behavior
  const handleDebug = () => {
    const debugLogs: LogEntry[] = [];
    debugLogs.push({ type: 'info', message: `> screen.debug()` });
    debugLogs.push({ 
      type: 'debug', 
      message: `
<body>
  <div>
${lesson.targetCodeDisplay.split('\n').map(line => `    ${line}`).join('\n')}
  </div>
</body>` 
    });
    setDisplayLogs(prev => [...prev, ...debugLogs]);
  };

  const runTests = () => {
    setIsRunning(true);
    setResult(null);
    setDisplayLogs([]); // Clear previous run logs

    setTimeout(() => {
      const logs: LogEntry[] = [];
      let passed = true;
      let passedRules = 0;
      
      logs.push({ type: 'info', message: `> ${lesson.framework.toLowerCase()} test --verbose` });
      logs.push({ type: 'info', message: `Running: ${lesson.title.en}` });

      const cleanCode = code
        .replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '')
        .replace(/\s+/g, ' ');

      if (!cleanCode.trim()) {
        logs.push({ type: 'error', message: `FAIL  No code detected.` });
        passed = false;
      } else {
        // 1. Static Analysis (Linter)
        // Check for "Test Smell" / Anti-patterns even if logic is correct
        ANTI_PATTERNS.forEach(ap => {
          if (ap.pattern.test(code)) {
            logs.push({ 
              type: 'warning', 
              message: `WARN: ${ap.message[lang]}` 
            });
          }
        });
        
        // Also warn about overuse of getByTestId if getByRole is viable (Simple heuristic)
        if (cleanCode.includes('getByTestId') && !cleanCode.includes('getByRole')) {
           logs.push({
             type: 'warning',
             message: lang === 'en' 
               ? "TIP: Try using 'getByRole' instead of 'getByTestId' for better accessibility coverage."
               : "提示: 試著使用 'getByRole' 取代 'getByTestId' 以提升無障礙覆蓋率。"
           });
        }

        // 2. Logic Verification
        lesson.validationRules.forEach(rule => {
          let rulePassed = true;
          const failureReasons: string[] = [];

          if (rule.mustNotMatch) {
            rule.mustNotMatch.forEach(forbidden => {
              if (forbidden.pattern.test(cleanCode)) {
                rulePassed = false;
                failureReasons.push(`⛔ ${forbidden.message[lang]}`);
              }
            });
          }

          if (rulePassed) {
            rule.mustMatch.forEach(pattern => {
              if (!pattern.test(cleanCode)) {
                rulePassed = false;
              }
            });
          }

          if (rulePassed) {
            logs.push({ type: 'success', message: `✓ ${rule.description[lang]}` });
            passedRules++;
          } else {
            logs.push({ type: 'error', message: `✕ ${rule.description[lang]}` });
            failureReasons.forEach(reason => logs.push({ type: 'error', message: `   ${reason}` }));
            passed = false;
          }
        });
      }

      const totalRules = lesson.validationRules.length;
      const coverage = totalRules > 0 ? Math.round((passedRules / totalRules) * 100) : 0;

      if (passed) {
        logs.push({ type: 'info', message: '' });
        logs.push({ type: 'success', message: `Tests Completed: ${passedRules}/${totalRules} passed.` });
      } else {
         logs.push({ type: 'info', message: '' });
         logs.push({ type: 'error', message: `Tests Failed.` });
      }

      setResult({ passed, logs: logs.map(l => l.message), coverage });
      setDisplayLogs(logs);
      onResultChange(passed);
      setIsRunning(false);
    }, 600);
  };

  return (
    <div className="flex flex-col h-full bg-dark-900 border-t border-dark-700 font-mono text-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-dark-800 border-b border-dark-700">
        <div className="flex items-center gap-2 text-slate-400">
          <Terminal size={14} />
          <span className="text-xs font-semibold uppercase">Terminal</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleDebug}
            disabled={isRunning}
            className="flex items-center gap-2 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider bg-dark-700 text-slate-300 hover:bg-dark-600 hover:text-white transition-all border border-dark-600"
            title="Print component DOM structure"
          >
            <Bug size={12} />
            Debug
          </button>
          <button
            onClick={runTests}
            disabled={isRunning}
            className={`flex items-center gap-2 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider transition-all ${
              isRunning 
                ? 'bg-dark-700 text-slate-500 cursor-not-allowed' 
                : 'bg-primary-700 text-white hover:bg-primary-600'
            }`}
          >
            {isRunning ? <Loader2 size={12} className="animate-spin" /> : <Play size={12} />}
            {isRunning ? 'Running...' : 'Run Tests'}
          </button>
        </div>
      </div>

      {/* Output Area */}
      <div className="flex-1 p-4 overflow-y-auto scrollbar-hide bg-black/20">
        {!result && displayLogs.length === 0 && !isRunning && (
          <div className="text-slate-600 flex flex-col items-center justify-center h-full gap-2 opacity-50">
            <Cpu size={32} />
            <span>Ready for execution</span>
          </div>
        )}
        
        {isRunning && (
          <div className="space-y-1 text-slate-400 animate-pulse">
             <div> Initializing environment...</div>
             <div> Parsing test suite...</div>
          </div>
        )}

        <div className="space-y-1">
          {displayLogs.map((log, idx) => {
            let colorClass = 'text-slate-400';
            let Icon = null;

            switch(log.type) {
              case 'success': colorClass = 'text-green-400'; break;
              case 'error': colorClass = 'text-red-400'; break;
              case 'warning': 
                colorClass = 'text-amber-400 italic bg-amber-900/10 px-1 rounded w-fit border border-amber-900/30'; 
                Icon = <AlertTriangle size={12} className="inline mr-2 -mt-0.5" />;
                break;
              case 'debug': colorClass = 'text-blue-300 font-normal bg-blue-900/10 p-2 rounded border border-blue-900/30 text-xs'; break;
              default: colorClass = 'text-slate-400';
            }
            
            return (
              <div key={idx} className={`${colorClass} whitespace-pre-wrap break-all leading-relaxed`}>
                {Icon}
                {log.message}
              </div>
            );
          })}
          
          {result && (
            <div className="mt-4 pt-4 border-t border-dark-700 flex gap-6 animate-in slide-in-from-bottom-2 fade-in">
               <div className="flex flex-col">
                  <span className="text-slate-500 text-[10px] uppercase">Status</span>
                  <span className={`text-lg font-bold flex items-center gap-2 ${result.passed ? 'text-green-400' : 'text-red-400'}`}>
                    {result.passed ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
                    {result.passed ? 'PASSED' : 'FAILED'}
                  </span>
               </div>
               {result.coverage > 0 && (
                 <div className="flex flex-col">
                    <span className="text-slate-500 text-[10px] uppercase">Coverage</span>
                    <span className="text-lg font-bold text-primary-400">{result.coverage}%</span>
                 </div>
               )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};