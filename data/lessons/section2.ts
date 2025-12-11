import { Lesson, TestFramework } from '../../types';
import {
  TweetComposer, TweetComposerCode,
  PaymentButton, PaymentButtonCode,
  TagInput, TagInputCode,
  TooltipDemo, TooltipDemoCode,
  PreferenceForm, PreferenceFormCode,
} from '../../components/targets';

export const SECTION2: Lesson[] = [
  // --- SECTION 2: EVENTS ---
  {
    id: '2.1',
    section: '2. Events & Interactions',
    title: { en: 'Typing & Disabled', zh: '輸入與禁用狀態' },
    description: { en: 'Type text using await user.type and check button disabled state.', zh: '使用 await user.type 輸入文字並檢查按鈕是否禁用。' },
    framework: TestFramework.RTL,
    difficulty: 'Beginner',
    requirements: [ { en: 'Type 21 chars using await user.type', zh: '使用 await user.type 輸入 21 個字' }, { en: 'Assert button is disabled', zh: '確認按鈕被禁用' } ],
    initialCode: `import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TweetComposer } from './TweetComposer';

test('validates length', async () => {
  const user = userEvent.setup();
  render(<TweetComposer />);
  // await user.type(...)
});`,
    targetComponent: TweetComposer,
    targetCodeDisplay: TweetComposerCode,
    hint: { 
      en: "await user.type(screen.getByRole('textbox'), 'This text is definitely longer than twenty characters');\nexpect(screen.getByRole('button', { name: /tweet/i })).toBeDisabled();", 
      zh: "await user.type(screen.getByRole('textbox'), 'This text is definitely longer than twenty characters');\nexpect(screen.getByRole('button', { name: /tweet/i })).toBeDisabled();"
    },
    validationRules: [
      {
        description: { en: "Async Type (await user.type)", zh: "非同步輸入 (await user.type)" },
        mustMatch: [ /await\s+user\.type/, /value: ['"].{21,}['"]|['"].{21,}['"]/ ],
        mustNotMatch: [ { pattern: /fireEvent/, message: { en: "Use userEvent instead of fireEvent", zh: "請使用 userEvent 取代 fireEvent" } } ]
      },
      {
        description: { en: "Check Disabled", zh: "檢查禁用" },
        mustMatch: [ /expect\(.*getByRole.*['"]button['"].*name: \/tweet\/i.*\)\.toBeDisabled\(\)/]
      }
    ]
  },
  {
    id: '2.2',
    section: '2. Events & Interactions',
    title: { en: 'Prevent Double Click', zh: '防止重複點擊' },
    description: { en: 'Ensure button logic only fires once using userEvent.', zh: '使用 userEvent 確保按鈕邏輯只觸發一次。' },
    framework: TestFramework.RTL,
    difficulty: 'Intermediate',
    requirements: [ { en: 'Click button twice (await)', zh: '點擊兩次 (await)' }, { en: 'Check status is "Processing..."', zh: '確認狀態為 Processing...' } ],
    initialCode: `import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PaymentButton } from './PaymentButton';

test('prevents double', async () => {
  const user = userEvent.setup();
  render(<PaymentButton />);
  // await user.click...
  // await user.click...
});`,
    targetComponent: PaymentButton,
    targetCodeDisplay: PaymentButtonCode,
    hint: { 
      en: "const button = screen.getByRole('button', { name: /pay/i });\nawait user.click(button);\nawait user.click(button);\nexpect(button).toHaveTextContent('Processing...');", 
      zh: "const button = screen.getByRole('button', { name: /pay/i });\nawait user.click(button);\nawait user.click(button);\nexpect(button).toHaveTextContent('Processing...');"
    },
    validationRules: [
      {
        description: { en: "Select using getByRole", zh: "使用 getByRole 選取" },
        mustMatch: [ /getByRole\(.*['"]button['"].*\)/ ]
      },
      {
        description: { en: "Async Double Click", zh: "非同步點擊兩次" },
        mustMatch: [ /await\s+user\.click.*await\s+user\.click/s ],
        mustNotMatch: [ { pattern: /fireEvent/, message: { en: "Use userEvent instead of fireEvent", zh: "請使用 userEvent 取代 fireEvent" } } ]
      },
      {
        description: { en: "Check status text", zh: "檢查狀態文字" },
        mustMatch: [ /toHaveTextContent\(.*Processing.*|toHaveText\(.*Processing.*\)/ ]
      }
    ]
  },
  {
    id: '2.3',
    section: '2. Events & Interactions',
    title: { en: 'Keyboard Events', zh: '鍵盤事件' },
    description: { en: 'Simulate pressing Enter key using userEvent.', zh: '使用 userEvent 模擬按下 Enter 鍵。' },
    framework: TestFramework.RTL,
    difficulty: 'Intermediate',
    requirements: [ { en: 'Type "React"', zh: '輸入 "React"' }, { en: 'Press Enter using {enter}', zh: '使用 {enter} 模擬按鍵' }, { en: 'Check tag "#React" exists', zh: '確認 "#React" 存在' } ],
    initialCode: `import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TagInput } from './TagInput';

test('adds tag on enter', async () => {
  const user = userEvent.setup();
  render(<TagInput />);
  // await user.type...
});`,
    targetComponent: TagInput,
    targetCodeDisplay: TagInputCode,
    hint: { 
      en: "const input = screen.getByPlaceholderText(/type tag/i);\nawait user.type(input, 'React{enter}');\nexpect(screen.getByText('#React')).toBeInTheDocument();", 
      zh: "const input = screen.getByPlaceholderText(/type tag/i);\nawait user.type(input, 'React{enter}');\nexpect(screen.getByText('#React')).toBeInTheDocument();"
    },
    validationRules: [
      {
        description: { en: "Async Type with Enter", zh: "非同步輸入並按 Enter" },
        mustMatch: [ /await\s+user\.type\(.*['"]React\{enter\}['"]\)|await\s+user\.keyboard\(.*\{enter\}\)/ ],
        mustNotMatch: [ { pattern: /fireEvent/, message: { en: "Use userEvent instead of fireEvent", zh: "請使用 userEvent 取代 fireEvent" } } ]
      },
      {
        description: { en: "Verify Tag", zh: "驗證 Tag" },
        mustMatch: [ /expect\(.*getByText\(.*#React.*\).*\]\.toBeInTheDocument/ ]
      }
    ]
  },
  {
    id: '2.4',
    section: '2. Events & Interactions',
    title: { en: 'Hover State', zh: 'Hover 狀態' },
    description: { en: 'Simulate mouse enter to show tooltip using userEvent.', zh: '使用 userEvent 模擬滑鼠移入以顯示 Tooltip。' },
    framework: TestFramework.RTL,
    difficulty: 'Intermediate',
    requirements: [ { en: 'Hover over text using await user.hover', zh: '使用 await user.hover 滑鼠移入文字' }, { en: 'Assert tooltip visible', zh: '確認 Tooltip 顯示' } ],
    initialCode: `import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TooltipDemo } from './TooltipDemo';

test('shows tooltip', async () => {
  const user = userEvent.setup();
  render(<TooltipDemo />);
  // await user.hover...
});`,
    targetComponent: TooltipDemo,
    targetCodeDisplay: TooltipDemoCode,
    hint: { 
      en: "const target = screen.getByText(/hover me/i);\nawait user.hover(target);\nexpect(screen.getByRole('tooltip')).toBeVisible();", 
      zh: "const target = screen.getByText(/hover me/i);\nawait user.hover(target);\nexpect(screen.getByRole('tooltip')).toBeVisible();"
    },
    validationRules: [
      {
        description: { en: "Async Hover (await user.hover)", zh: "非同步 Hover (await user.hover)" },
        mustMatch: [ /await\s+user\.hover/ ],
        mustNotMatch: [ { pattern: /fireEvent/, message: { en: "Use userEvent instead of fireEvent", zh: "請使用 userEvent 取代 fireEvent" } } ]
      },
      {
        description: { en: "Find Tooltip & Check Visibility", zh: "找到 Tooltip 並檢查可見性" },
        mustMatch: [ /expect\(.*(getByRole|queryByRole).*['"]tooltip['"].*\)\.toBeVisible/ ]
      }
    ]
  },
  {
    id: '2.5',
    section: '2. Events & Interactions',
    title: { en: 'Checkbox State', zh: '核取方塊' },
    description: { en: 'Check and uncheck using userEvent.', zh: '使用 userEvent 勾選與取消勾選。' },
    framework: TestFramework.RTL,
    difficulty: 'Beginner',
    requirements: [ { en: 'Check "Email" using await user.click', zh: '使用 await user.click 勾選 Email' }, { en: 'Assert checkbox is checked', zh: '確認 Checkbox 已被勾選' } ],
    initialCode: `import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PreferenceForm } from './PreferenceForm';

test('toggles preference', async () => {
  const user = userEvent.setup();
  render(<PreferenceForm />);
  // await user.click...
});`,
    targetComponent: PreferenceForm,
    targetCodeDisplay: PreferenceFormCode,
    hint: { 
      en: "const checkbox = screen.getByLabelText('Email');\nawait user.click(checkbox);\nexpect(checkbox).toBeChecked();", 
      zh: "const checkbox = screen.getByLabelText('Email');\nawait user.click(checkbox);\nexpect(checkbox).toBeChecked();"
    },
    validationRules: [
      {
        description: { en: "Async Click Checkbox", zh: "非同步點擊核取方塊" },
        mustMatch: [ /await\s+user\.click/, /getByLabelText\(.*Email.*\)/ ]
      },
      {
        description: { en: "Verify Checked State", zh: "驗證勾選狀態" },
        mustMatch: [ /expect\(.*getByLabelText\(.*Email.*\).*\]\.toBeChecked/ ]
      }
    ]
  },
];
