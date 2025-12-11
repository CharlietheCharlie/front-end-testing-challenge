import { Lesson, TestFramework } from '../../types';
import {
  HooksPlaceholder,
  useCounterCode, useDebounceCode, useToggleCode, usePreviousCode, 
} from '../../components/targets';

export const SECTION4: Lesson[] = [
  // --- SECTION 4: HOOKS ---
  {
    id: '4.1',
    section: '4. Advanced Hooks',
    title: { en: 'Basic Hook', zh: '基礎 Hook' },
    description: { en: 'Test useCounter increment. Check source to see exposed methods.', zh: '測試 useCounter 增加數值。請查看 Source 確認可用的方法。' },
    framework: TestFramework.RTL,
    difficulty: 'Intermediate',
    requirements: [ { en: 'Render hook', zh: '渲染 Hook' }, { en: 'Call inc() in act()', zh: '在 act() 中呼叫 inc()' } ],
    initialCode: `import { renderHook, act } from '@testing-library/react';
import { useCounter } from './useCounter';

test('inc', () => {
  const { result } = renderHook(() => useCounter());
  // act...
});`,
    targetComponent: HooksPlaceholder,
    targetCodeDisplay: useCounterCode,
    hint: { 
      en: `act(() => {
  result.current.inc();
});
expect(result.current.count).toBe(1);`, 
      zh: `act(() => {
  result.current.inc();
});
expect(result.current.count).toBe(1);` 
    },
    validationRules: [
      {
        description: { en: "Render Hook", zh: "Render Hook" },
        mustMatch: [ /renderHook\(.*useCounter.*\)/ ]
      },
      {
        description: { en: "Update in act()", zh: "在 act() 中更新" },
        mustMatch: [ /act\(.*result\.current\.inc/ ]
      }
    ]
  },
  {
    id: '4.2',
    section: '4. Advanced Hooks',
    title: { en: 'Timers', zh: '計時器 Hook' },
    description: { en: 'Test useDebounce with fake timers.', zh: '使用假計時器測試 useDebounce。' },
    framework: TestFramework.JEST,
    difficulty: 'Tricky',
    requirements: [ { en: 'Use fake timers', zh: '啟用假計時器' }, { en: 'Advance time', zh: '快轉時間' } ],
    initialCode: `import { renderHook, act } from '@testing-library/react';
import { useDebounce } from './useDebounce';

test('debounce', () => {
  jest.useFakeTimers();
  const { result, rerender } = renderHook(({v}) => useDebounce(v, 100), { initialProps: { v: 'A' } });
  // rerender 'B'
  // advance time
});`,
    targetComponent: HooksPlaceholder,
    targetCodeDisplay: useDebounceCode,
    hint: { 
      en: `rerender({ v: 'B' });
act(() => {
  jest.advanceTimersByTime(100);
});
expect(result.current).toBe('B');`, 
      zh: `rerender({ v: 'B' });
act(() => {
  jest.advanceTimersByTime(100);
});
expect(result.current).toBe('B');` 
    },
    validationRules: [
      {
        description: { en: "Enable Fake Timers", zh: "啟用假計時器" },
        mustMatch: [ /jest\.useFakeTimers\(\)/ ]
      },
      {
        description: { en: "Advance Timers in act", zh: "在 act 中快轉時間" },
        mustMatch: [ /act\(.*advanceTimersByTime/ ]
      }
    ]
  },
  {
    id: '4.3',
    section: '4. Advanced Hooks',
    title: { en: 'Toggle Hook', zh: '切換 Hook' },
    description: { en: 'Test useToggle state change.', zh: '測試 useToggle 狀態改變。' },
    framework: TestFramework.RTL,
    difficulty: 'Intermediate',
    requirements: [ { en: 'Check initial false', zh: '確認初始為 false' }, { en: 'Toggle', zh: '切換' }, { en: 'Check true', zh: '確認為 true' } ],
    initialCode: `import { renderHook, act } from '@testing-library/react';
import { useToggle } from './useToggle';

test('toggles', () => {
  const { result } = renderHook(() => useToggle());
  // result.current[1]()
});`,
    targetComponent: HooksPlaceholder,
    targetCodeDisplay: useToggleCode,
    hint: { 
      en: `act(() => {
  result.current[1]();
});
expect(result.current[0]).toBe(true);`, 
      zh: `act(() => {
  result.current[1]();
});
expect(result.current[0]).toBe(true);` 
    },
    validationRules: [
      {
        description: { en: "Call Toggle", zh: "呼叫切換函數" },
        mustMatch: [ /act\(.*result\.current\[1\]\(/ ]
      },
      {
        description: { en: "Assert True", zh: "驗證 True" },
        mustMatch: [ /expect\(result\.current\[0\]\)\.toBe\(true\)/ ]
      }
    ]
  },
  {
    id: '4.4',
    section: '4. Advanced Hooks',
    title: { en: 'Previous Value', zh: '上一個值' },
    description: { en: 'Test usePrevious with useRef.', zh: '測試 usePrevious (使用 useRef)。' },
    framework: TestFramework.RTL,
    difficulty: 'Intermediate',
    requirements: [ { en: 'Render with 0', zh: '初始值 0' }, { en: 'Rerender with 1', zh: '更新為 1' }, { en: 'Check prev is 0', zh: '確認上一個值為 0' } ],
    initialCode: `import { renderHook } from '@testing-library/react';
import { usePrevious } from './usePrevious';

test('stores prev', () => {
  const { result, rerender } = renderHook(({v}) => usePrevious(v), { initialProps: { v: 0 } });
  // rerender({ v: 1 })
});`,
    targetComponent: HooksPlaceholder,
    targetCodeDisplay: usePreviousCode,
    hint: { 
      en: `rerender({ v: 1 });
expect(result.current).toBe(0);`, 
      zh: `rerender({ v: 1 });
expect(result.current).toBe(0);` 
    },
    validationRules: [
      {
        description: { en: "Rerender", zh: "Rerender" },
        mustMatch: [ /rerender\(.*v: 1.*\)/ ]
      },
      {
        description: { en: "Assert Previous", zh: "驗證上一個值" },
        mustMatch: [ /expect\(result\.current\)\.toBe\(0\)/ ]
      }
    ]
  },
];