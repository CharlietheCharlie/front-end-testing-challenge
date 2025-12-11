import { Lesson, TestFramework } from '../../types';
import {
  ThemeDisplay, ThemeDisplayCode,
  ReduxCounter, ReduxCounterCode,
  ModalComponent, ModalComponentCode,
  ErrorBoundaryDemo, ErrorBoundaryCode,
  ResponsiveComponent, ResponsiveComponentCode,
} from '../../components/targets';

export const SECTION6: Lesson[] = [
  // --- SECTION 6: ADVANCED INTEGRATION ---
  {
    id: '6.1',
    section: '6. Advanced Integration',
    title: { en: 'Context Providers', zh: 'Context Provider 整合' },
    description: { en: 'Test a component that relies on React Context by wrapping it.', zh: '透過 Wrapper 測試依賴 React Context 的組件。' },
    framework: TestFramework.RTL,
    difficulty: 'Intermediate',
    requirements: [ { en: 'Create ThemeContext.Provider', zh: '建立 ThemeContext.Provider' }, { en: 'Pass value="dark"', zh: '傳遞 value="dark"' }, { en: 'Assert theme is dark', zh: '確認顯示 dark' } ],
    initialCode: `import { render, screen } from '@testing-library/react';
import { ThemeDisplay, ThemeContext } from './ThemeDisplay';

test('shows dark theme', () => {
  // render with wrapper
});`,
    targetComponent: ThemeDisplay,
    targetCodeDisplay: ThemeDisplayCode,
    hint: { 
      en: `render(
  <ThemeContext.Provider value="dark">
    <ThemeDisplay />
  </ThemeContext.Provider>
);
expect(screen.getByText(/dark/i)).toBeInTheDocument();`, 
      zh: `render(
  <ThemeContext.Provider value="dark">
    <ThemeDisplay />
  </ThemeContext.Provider>
);
expect(screen.getByText(/dark/i)).toBeInTheDocument();` 
    },
    validationRules: [
      {
        description: { en: "Wrap with Provider", zh: "使用 Provider 包裹" },
        mustMatch: [ /ThemeContext\.Provider/, /value=["']dark["']/ ]
      },
      {
        description: { en: "Verify Text", zh: "驗證文字" },
        mustMatch: [ /getByText.*dark/i ]
      }
    ]
  },
  {
    id: '6.2',
    section: '6. Advanced Integration',
    title: { en: 'State Stores (Redux)', zh: '狀態管理 (模擬 Redux)' },
    description: { en: 'Interact with a global store-like reducer pattern.', zh: '測試類似全域狀態管理的 Reducer 模式。' },
    framework: TestFramework.RTL,
    difficulty: 'Intermediate',
    requirements: [ { en: 'Click increment button', zh: '點擊增加按鈕' }, { en: 'Assert count becomes 1', zh: '確認數字變為 1' } ],
    initialCode: `import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReduxCounter } from './ReduxCounter';

test('increments store', async () => {
  const user = userEvent.setup();
  render(<ReduxCounter />);
  // Click +
});`,
    targetComponent: ReduxCounter,
    targetCodeDisplay: ReduxCounterCode,
    hint: { 
      en: `await user.click(screen.getByText('+'));
expect(screen.getByTestId('count-value')).toHaveTextContent('1');`, 
      zh: `await user.click(screen.getByText('+'));
expect(screen.getByTestId('count-value')).toHaveTextContent('1');` 
    },
    validationRules: [
      {
        description: { en: "Click Increment", zh: "點擊增加" },
        mustMatch: [ /user\.click/ ]
      },
      {
        description: { en: "Check Store Value", zh: "檢查 Store 數值" },
        mustMatch: [ /toHaveTextContent\(['"]1['"]\)/ ]
      }
    ]
  },
  {
    id: '6.3',
    section: '6. Advanced Integration',
    title: { en: 'Portals (Modals)', zh: 'Portals (跳窗)' },
    description: { en: 'Test elements rendered outside the root using Portals.', zh: '測試透過 Portal 渲染在 Root 外部的元素。' },
    framework: TestFramework.RTL,
    difficulty: 'Intermediate',
    requirements: [ { en: 'Click open button', zh: '點擊開啟按鈕' }, { en: 'Find dialog using getByRole', zh: '使用 getByRole 找到對話框' }, { en: 'Assert "Terms" is visible', zh: '確認 "Terms" 可見' } ],
    initialCode: `import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ModalComponent } from './ModalComponent';

test('opens modal', async () => {
  const user = userEvent.setup();
  render(<ModalComponent />);
  // Click
  // Check dialog
});`,
    targetComponent: ModalComponent,
    targetCodeDisplay: ModalComponentCode,
    hint: { 
      en: `await user.click(screen.getByText(/open/i));
const dialog = screen.getByRole('dialog');
expect(within(dialog).getByText('Terms')).toBeVisible();`, 
      zh: `await user.click(screen.getByText(/open/i));
const dialog = screen.getByRole('dialog');
expect(within(dialog).getByText('Terms')).toBeVisible();` 
    },
    validationRules: [
      {
        description: { en: "Find Dialog Role", zh: "找到 Dialog Role" },
        mustMatch: [ /getByRole\(['"]dialog['"]\)/ ]
      },
      {
        description: { en: "Check Content in Portal", zh: "檢查 Portal 內容" },
        mustMatch: [ /within\(.*dialog.*\)/ ]
      }
    ]
  },
  {
    id: '6.4',
    section: '6. Advanced Integration',
    title: { en: 'Error Boundaries', zh: '錯誤邊界' },
    description: { en: 'Verify that the app catches crashes gracefully.', zh: '驗證應用程式能優雅地捕捉崩潰。' },
    framework: TestFramework.RTL,
    difficulty: 'Tricky',
    requirements: [ { en: 'Silence console.error', zh: '隱藏 console.error' }, { en: 'Render <Bomb shouldThrow />', zh: '渲染 <Bomb shouldThrow />' }, { en: 'Find alert role', zh: '找到 alert role' } ],
    initialCode: `import { render, screen } from '@testing-library/react';
import { ErrorBoundary, Bomb } from './ErrorBoundaryDemo';

test('catches error', () => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
  // render(<ErrorBoundary>...</ErrorBoundary>)
});`,
    targetComponent: ErrorBoundaryDemo,
    targetCodeDisplay: ErrorBoundaryCode,
    hint: { 
      en: `render(<ErrorBoundary><Bomb shouldThrow={true} /></ErrorBoundary>);
expect(screen.getByRole('alert')).toHaveTextContent(/wrong/i);`, 
      zh: `render(<ErrorBoundary><Bomb shouldThrow={true} /></ErrorBoundary>);
expect(screen.getByRole('alert')).toHaveTextContent(/wrong/i);` 
    },
    validationRules: [
      {
        description: { en: "Render Wrapper", zh: "渲染 Wrapper" },
        mustMatch: [ /<ErrorBoundary>/ ]
      },
      {
        description: { en: "Catch Error UI", zh: "捕捉錯誤 UI" },
        mustMatch: [ /getByRole\(['"]alert['"]\)/ ]
      }
    ]
  },
  {
    id: '6.5',
    section: '6. Advanced Integration',
    title: { en: 'Custom Hook Logic', zh: '自定義 Hook 邏輯' },
    description: { en: 'Test component behavior driven by a complex custom hook.', zh: '測試由複雜自定義 Hook 驅動的組件行為。' },
    framework: TestFramework.RTL,
    difficulty: 'Intermediate',
    requirements: [ { en: 'Mock useWindowWidth to return 500', zh: '模擬 useWindowWidth 回傳 500' }, { en: 'Assert "Mobile" is rendered', zh: '確認渲染 "Mobile"' } ],
    initialCode: `import { render, screen } from '@testing-library/react';
import { ResponsiveComponent } from './ResponsiveComponent';
import * as hooks from './hooks'; // Imaginary import

test('mobile view', () => {
  // jest.spyOn(hooks, 'useWindowWidth')...
  render(<ResponsiveComponent />);
});`,
    targetComponent: ResponsiveComponent,
    targetCodeDisplay: ResponsiveComponentCode,
    hint: { 
      en: `jest.spyOn(require('./hooks'), 'useWindowWidth').mockReturnValue(500);
render(<ResponsiveComponent />);
expect(screen.getByText('Mobile')).toBeInTheDocument();`, 
      zh: `jest.spyOn(require('./hooks'), 'useWindowWidth').mockReturnValue(500);
render(<ResponsiveComponent />);
expect(screen.getByText('Mobile')).toBeInTheDocument();` 
    },
    validationRules: [
      {
        description: { en: "Mock Hook", zh: "模擬 Hook" },
        mustMatch: [ /spyOn/, /mockReturnValue/ ]
      },
      {
        description: { en: "Verify Mobile", zh: "驗證 Mobile" },
        mustMatch: [ /getByText\(['"]Mobile['"]\)/ ]
      }
    ]
  }
];