import { Lesson, TestFramework } from '../../types';
import {
  RegistrationForm, RegistrationFormCode,
  LiveStatus, LiveStatusCode,
  CopyLink, CopyLinkCode
} from '../../components/targets/Section7_Expert';

export const SECTION7: Lesson[] = [
  {
    id: '7.1',
    section: '7. Expert Patterns',
    title: { en: 'Select & Validation', zh: '下拉選單與驗證' },
    description: { en: 'Test a required <select> field. Ensure form is invalid if empty, and valid after selection.', zh: '測試必填的 <select> 欄位。確保未選擇時表單無效，選擇後表單有效。' },
    framework: TestFramework.RTL,
    difficulty: 'Intermediate',
    requirements: [ { en: 'Select "Developer" option', zh: '選擇 "Developer" 選項' }, { en: 'Check validity states', zh: '檢查表單有效性' }, { en: 'Submit form', zh: '送出表單' } ],
    initialCode: `import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RegistrationForm } from './RegistrationForm';

test('validates selection', async () => {
  const user = userEvent.setup();
  render(<RegistrationForm />);
  
  const select = screen.getByRole('combobox');
  // 1. Check invalid initially
  // 2. Select option
  // 3. Check valid
});`,
    targetComponent: RegistrationForm,
    targetCodeDisplay: RegistrationFormCode,
    hint: { 
      en: "expect(screen.getByRole('combobox')).toBeInvalid();\nawait user.selectOptions(screen.getByRole('combobox'), 'dev');\nexpect(screen.getByRole('combobox')).toBeValid();\nawait user.click(screen.getByText('Register'));", 
      zh: "expect(screen.getByRole('combobox')).toBeInvalid();\nawait user.selectOptions(screen.getByRole('combobox'), 'dev');\nexpect(screen.getByRole('combobox')).toBeValid();\nawait user.click(screen.getByText('Register'));" 
    },
    validationRules: [
      {
        description: { en: "Check Invalid State", zh: "檢查無效狀態" },
        mustMatch: [ /\.toBeInvalid\(\)/ ]
      },
      {
        description: { en: "Select Option", zh: "選擇選項" },
        mustMatch: [ /user\.selectOptions/, /['"]dev['"]/ ]
      },
      {
        description: { en: "Check Valid State", zh: "檢查有效狀態" },
        mustMatch: [ /\.toBeValid\(\)/ ]
      }
    ]
  },
  {
    id: '7.2',
    section: '7. Expert Patterns',
    title: { en: 'Interval Polling', zh: '輪詢計時器' },
    description: { en: 'Test a component that updates every second using setInterval. Use jest.advanceTimersByTime.', zh: '測試使用 setInterval 每秒更新的組件。請使用 jest.advanceTimersByTime。' },
    framework: TestFramework.JEST,
    difficulty: 'Tricky',
    requirements: [ { en: 'Use fake timers', zh: '啟用假計時器' }, { en: 'Advance time by 3000ms', zh: '快轉時間 3000ms' }, { en: 'Assert count is 3', zh: '確認計數為 3' } ],
    initialCode: `import { render, screen, act } from '@testing-library/react';
import { LiveStatus } from './LiveStatus';

test('updates over time', () => {
  jest.useFakeTimers();
  render(<LiveStatus />);
  // Advance time
  // Check text
});`,
    targetComponent: LiveStatus,
    targetCodeDisplay: LiveStatusCode,
    hint: { 
      en: "act(() => {\n  jest.advanceTimersByTime(3000);\n});\nexpect(screen.getByText('3')).toBeInTheDocument();", 
      zh: "act(() => {\n  jest.advanceTimersByTime(3000);\n});\nexpect(screen.getByText('3')).toBeInTheDocument();" 
    },
    validationRules: [
      {
        description: { en: "Fake Timers", zh: "假計時器" },
        mustMatch: [ /useFakeTimers/ ]
      },
      {
        description: { en: "Advance Time", zh: "快轉時間" },
        mustMatch: [ /advanceTimersByTime\(3000\)/ ]
      },
      {
        description: { en: "Wrap in act()", zh: "包裹在 act() 中" },
        mustMatch: [ /act\(.*advanceTimersByTime/s ]
      }
    ]
  },
  {
    id: '7.3',
    section: '7. Expert Patterns',
    title: { en: 'Browser API (Clipboard)', zh: '瀏覽器 API (剪貼簿)' },
    description: { en: 'Mock the global navigator.clipboard API to test copy functionality.', zh: '模擬全域 navigator.clipboard API 以測試複製功能。' },
    framework: TestFramework.JEST,
    difficulty: 'Advanced',
    requirements: [ { en: 'Mock writeText', zh: '模擬 writeText' }, { en: 'Click Copy', zh: '點擊複製' }, { en: 'Assert mock called', zh: '驗證模擬函數被呼叫' } ],
    initialCode: `import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CopyLink } from './CopyLink';

test('copies to clipboard', async () => {
  const user = userEvent.setup();
  // Mock navigator.clipboard.writeText
  render(<CopyLink />);
  // Click
});`,
    targetComponent: CopyLink,
    targetCodeDisplay: CopyLinkCode,
    hint: { 
      en: "const mockWrite = jest.fn();\nObject.assign(navigator, { clipboard: { writeText: mockWrite } });\n\nawait user.click(screen.getByText('Copy'));\nexpect(mockWrite).toHaveBeenCalledWith('https://testmaster.dev');", 
      zh: "const mockWrite = jest.fn();\nObject.assign(navigator, { clipboard: { writeText: mockWrite } });\n\nawait user.click(screen.getByText('Copy'));\nexpect(mockWrite).toHaveBeenCalledWith('https://testmaster.dev');" 
    },
    validationRules: [
      {
        description: { en: "Mock Clipboard", zh: "模擬剪貼簿" },
        mustMatch: [ /navigator.*clipboard.*writeText/s, /jest\.fn/ ]
      },
      {
        description: { en: "Verify Call", zh: "驗證呼叫" },
        mustMatch: [ /toHaveBeenCalledWith\(.*testmaster\.dev.*\)/ ]
      }
    ]
  }
];