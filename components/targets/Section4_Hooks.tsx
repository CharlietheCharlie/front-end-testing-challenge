import React, { useState, useEffect, useRef } from 'react';

// 4.1 useCounter
export const useCounter = (initial = 0) => {
  const [count, setCount] = useState(initial);
  return { count, inc: () => setCount(c => c + 1) };
};

// 4.2 useDebounce
export const useDebounce = (value: string, delay: number) => {
  const [d, setD] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setD(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return d;
};

// 4.3 useToggle
export const useToggle = (initial = false) => {
  const [state, setState] = useState(initial);
  const toggle = () => setState(s => !s);
  return [state, toggle] as const;
};

// 4.4 usePrevious
export const usePrevious = (value: number) => {
  const ref = useRef<number | undefined>(undefined);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

// 4.5 useLocalStorage (Mock)
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

export const HooksPlaceholder: React.FC = () => (
  <div className="text-slate-500 italic text-center p-4">No UI for Hook Logic Tests</div>
);
