import React, { useState, useEffect, useRef } from 'react';

// 4.1 useCounter
export const useCounter = (initial = 0) => {
  const [count, setCount] = useState(initial);
  return { count, inc: () => setCount(c => c + 1) };
};
export const useCounterCode = `export const useCounter = (initial = 0) => {
  const [count, setCount] = useState(initial);
  
  const inc = () => setCount(c => c + 1);
  
  // Return object: { count, inc }
  return { count, inc };
};`;

// 4.2 useDebounce
export const useDebounce = (value: string, delay: number) => {
  const [d, setD] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setD(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return d;
};
export const useDebounceCode = `export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Update value after delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup if value changes before delay
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};`;

// 4.3 useToggle
export const useToggle = (initial = false) => {
  const [state, setState] = useState(initial);
  const toggle = () => setState(s => !s);
  return [state, toggle] as const;
};
export const useToggleCode = `export const useToggle = (initial = false) => {
  const [state, setState] = useState(initial);
  
  const toggle = () => setState(prev => !prev);
  
  // Returns tuple: [value, toggleFunction]
  return [state, toggle];
};`;

// 4.4 usePrevious
export const usePrevious = (value: number) => {
  const ref = useRef<number | undefined>(undefined);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
export const usePreviousCode = `export const usePrevious = (value) => {
  const ref = useRef();
  
  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  });
  
  // Return the *previous* value (ref updates after render)
  return ref.current;
};`;

// 4.5 useLocalStorage (Mock) - for future lessons
export const useLocalStorage = (key: string, initial: string) => {
  const [val, setVal] = useState(() => {
    return localStorage.getItem(key) || initial;
  });
  const update = (v: string) => {
    setVal(v);
    localStorage.setItem(key, v);
  };
  return [val, update] as const;
};

// Placeholder UI
export const HooksPlaceholder: React.FC = () => (
  <div className="flex items-center justify-center h-full flex-col text-slate-400 p-8 text-center border border-dashed border-dark-700 rounded-lg bg-dark-800/50">
    <div className="text-4xl mb-4">⚓️</div>
    <h3 className="text-lg font-bold text-white mb-2">Headless Hook Testing</h3>
    <p className="max-w-md mx-auto mb-4">
      Hooks don't have a visual UI. They are logic units.
    </p>
    <div className="text-xs bg-black/40 p-3 rounded border border-dark-700 text-left inline-block">
      <p className="text-primary-400 font-bold mb-1">How to inspect:</p>
      <p>1. Switch to the <span className="text-white border border-dark-600 px-1 rounded">Source</span> tab to see the Hook's code.</p>
      <p>2. Check the return values (Object? Array?) and method names.</p>
    </div>
  </div>
);