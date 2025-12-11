import { Lesson, TestFramework } from '../../types';
import {
  UserForm, UserFormCode,
  SimpleList, SimpleListCode,
  RetryButton, RetryButtonCode,
  DashboardWidget, DashboardWidgetCode,
  SearchResults, SearchResultsCode,
  Newsletter, NewsletterCode,
} from '../../components/targets';

export const SECTION3: Lesson[] = [
  // --- SECTION 3: ASYNC & MOCKING ---
  {
    id: '3.1',
    section: '3. Async & Mocking',
    title: { en: 'Callbacks & Mocks', zh: 'Callback 模擬 (jest.fn)' },
    description: { en: 'Create a mock function and verify it was called with correct arguments.', zh: '建立 Mock Function 並驗證它是否被正確呼叫與傳遞參數。' },
    framework: TestFramework.JEST,
    difficulty: 'Intermediate',
    requirements: [ { en: 'Create mock: const mockSubmit = jest.fn()', zh: '建立 Mock: const mockSubmit = jest.fn()' }, { en: 'Pass to component', zh: '傳遞給組件' }, { en: 'Type and Click', zh: '輸入並點擊' }, { en: 'Expect calledWith({name: ...})', zh: '驗證被呼叫參數' } ],
    initialCode: `import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserForm } from './UserForm';

test('submits form data', async () => {
  const user = userEvent.setup();
  // 1. Create mock
  // 2. Render(<UserForm onSubmit={mock} />)
  // 3. Interaction
  // 4. Expect
});`,
    targetComponent: UserForm as any,
    targetCodeDisplay: UserFormCode,
    hint: { 
      en: "const mockSubmit = jest.fn();\nrender(<UserForm onSubmit={mockSubmit} />);\n\nawait user.type(screen.getByLabelText('Name'), 'Alice');\nawait user.click(screen.getByRole('button', { name: /save/i }));\n\nexpect(mockSubmit).toHaveBeenCalledWith({ name: 'Alice' });", 
      zh: "const mockSubmit = jest.fn();\nrender(<UserForm onSubmit={mockSubmit} />);\n\nawait user.type(screen.getByLabelText('Name'), 'Alice');\nawait user.click(screen.getByRole('button', { name: /save/i }));\n\nexpect(mockSubmit).toHaveBeenCalledWith({ name: 'Alice' });"
    },
    validationRules: [
      {
        description: { en: "Create jest.fn()", zh: "建立 jest.fn()" },
        mustMatch: [ /const\s+\w+\s*=\s*jest\.fn\(\)/ ]
      },
      {
        description: { en: "Async Type & Click", zh: "非同步輸入與點擊" },
        mustMatch: [ /await\s+user\.type/, /await\s+user\.click/ ]
      },
      {
        description: { en: "Verify calledWith", zh: "驗證參數 calledWith" },
        mustMatch: [ /expect\(.*\)\.toHaveBeenCalledWith\(\{.*name:.*\}\)/ ]
      }
    ]
  },
  {
    id: '3.2',
    section: '3. Async & Mocking',
    title: { en: 'Mock API (Fetch)', zh: 'API 模擬 (fetch)' },
    description: { en: 'Mock the global fetch function to return fake data.', zh: '模擬全域 fetch 函數以回傳假資料。' },
    framework: TestFramework.JEST,
    difficulty: 'Intermediate',
    requirements: [ { en: 'Spy on global.fetch', zh: '監聽 global.fetch' }, { en: 'Mock json response ["A"]', zh: '模擬 JSON 回應 ["A"]' }, { en: 'Use findByText to wait', zh: '使用 findByText 等待出現' } ],
    initialCode: `import { render, screen } from '@testing-library/react';
import { SimpleList } from './SimpleList';

test('loads items', async () => {
  // jest.spyOn...
  render(<SimpleList />);
  // await screen.findBy...
});`,
    targetComponent: SimpleList,
    targetCodeDisplay: SimpleListCode,
    hint: { 
      en: "jest.spyOn(global, 'fetch').mockResolvedValue({\n  json: async () => ['A']\n} as Response);\n\nrender(<SimpleList />);\nexpect(await screen.findByText('A')).toBeInTheDocument();", 
      zh: "jest.spyOn(global, 'fetch').mockResolvedValue({\n  json: async () => ['A']\n} as Response);\n\nrender(<SimpleList />);\nexpect(await screen.findByText('A')).toBeInTheDocument();"
    },
    validationRules: [
      {
        description: { en: "Spy on fetch", zh: "監聽 fetch" },
        mustMatch: [ /jest\.spyOn\(.*global.*['"]fetch['"].*\)/ ]
      },
      {
        description: { en: "Mock Implementation", zh: "模擬實作" },
        mustMatch: [ /mockResolvedValue/ ]
      },
      {
        description: { en: "Use await findByText", zh: "使用 await findByText" },
        mustMatch: [ /await\s+screen\.findByText/, /\.toBeInTheDocument/ ],
        mustNotMatch: [ { pattern: /getByText/, message: { en: "getByText is synchronous and will fail. Use findByText.", zh: "getByText 是同步的，會失敗。請使用 findByText。" } } ]
      }
    ]
  },
  {
    id: '3.3',
    section: '3. Async & Mocking',
    title: { en: 'API Retry Logic', zh: 'API 重試邏輯' },
    description: { en: 'Mock a failure first, then a success.', zh: '先模擬失敗，再模擬成功。' },
    framework: TestFramework.JEST,
    difficulty: 'Tricky',
    requirements: [ { en: 'Mock fetch: reject then resolve', zh: '模擬 fetch: 先 reject 後 resolve' }, { en: 'Click load using await user.click', zh: '使用 await user.click 點擊載入' }, { en: 'Check Success', zh: '檢查 Success' } ],
    initialCode: `import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RetryButton } from './RetryButton';

test('retries on error', async () => {
  // mockRejectedValueOnce...
  const user = userEvent.setup();
  render(<RetryButton />);
  // await user.click...
});`,
    targetComponent: RetryButton,
    targetCodeDisplay: RetryButtonCode,
    hint: { 
      en: "jest.spyOn(global, 'fetch')\n  .mockRejectedValueOnce(new Error())\n  .mockResolvedValueOnce({ ok: true } as Response);\n\nrender(<RetryButton />);\nconst btn = screen.getByRole('button', { name: /load/i });\n\nawait user.click(btn);\nexpect(await screen.findByText('Error')).toBeInTheDocument();\n\nawait user.click(btn);\nexpect(await screen.findByText('Success')).toBeInTheDocument();", 
      zh: "jest.spyOn(global, 'fetch')\n  .mockRejectedValueOnce(new Error())\n  .mockResolvedValueOnce({ ok: true } as Response);\n\nrender(<RetryButton />);\nconst btn = screen.getByRole('button', { name: /load/i });\n\nawait user.click(btn);\nexpect(await screen.findByText('Error')).toBeInTheDocument();\n\nawait user.click(btn);\nexpect(await screen.findByText('Success')).toBeInTheDocument();"
    },
    validationRules: [
      {
        description: { en: "Chain mocks (Reject then Resolve)", zh: "串聯模擬 (先 Reject 後 Resolve)" },
        mustMatch: [ /mockRejectedValueOnce/, /mockResolvedValueOnce/ ]
      },
      {
        description: { en: "Async Click (await user.click)", zh: "非同步點擊 (await user.click)" },
        mustMatch: [ /await\s+user\.click/ ]
      },
      {
        description: { en: "Check states using findBy", zh: "使用 findBy 檢查狀態" },
        mustMatch: [ /expect\(.*findByText\(.*Error.*\).*\]\.toBeInTheDocument/, /expect\(.*findByText\(.*Success.*\).*\]\.toBeInTheDocument/ ]
      }
    ]
  },
  {
    id: '3.4',
    section: '3. Async & Mocking',
    title: { en: 'Loading Skeleton', zh: '載入骨架屏' },
    description: { en: 'Wait for skeleton to disappear.', zh: '等待骨架屏消失。' },
    framework: TestFramework.RTL,
    difficulty: 'Intermediate',
    requirements: [ { en: 'Use waitForElementToBeRemoved', zh: '使用 waitForElementToBeRemoved' }, { en: 'Wait for skeleton', zh: '等待骨架屏消失' } ],
    initialCode: `import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { DashboardWidget } from './DashboardWidget';

test('removes skeleton', async () => {
  render(<DashboardWidget />);
  // waitForElementToBeRemoved...
});`,
    targetComponent: DashboardWidget,
    targetCodeDisplay: DashboardWidgetCode,
    hint: { 
      en: "await waitForElementToBeRemoved(() => screen.getByTestId('skeleton'));\nexpect(screen.getByText(/sales/i)).toBeInTheDocument();", 
      zh: "await waitForElementToBeRemoved(() => screen.getByTestId('skeleton'));\nexpect(screen.getByText(/sales/i)).toBeInTheDocument();"
    },
    validationRules: [
      {
        description: { en: "Use waitForElementToBeRemoved", zh: "使用 waitForElementToBeRemoved" },
        mustMatch: [ /waitForElementToBeRemoved/ ]
      },
      {
        description: { en: "Target Skeleton", zh: "目標為骨架屏" },
        mustMatch: [ /getByTestId\(.*['"]skeleton['"].*\)/ ]
      }
    ]
  },
  {
    id: '3.5',
    section: '3. Async & Mocking',
    title: { en: 'Empty State', zh: '空狀態' },
    description: { en: 'Test when API returns empty list.', zh: '測試 API 回傳空列表的情況。' },
    framework: TestFramework.RTL,
    difficulty: 'Intermediate',
    requirements: [ { en: 'Click Search', zh: '點擊搜尋' }, { en: 'Assert "No results found"', zh: '確認顯示 "No results found"' } ],
    initialCode: `import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchResults } from './SearchResults';

test('shows empty state', async () => {
  const user = userEvent.setup();
  render(<SearchResults />);
  // Click
  // Check text
});`,
    targetComponent: SearchResults,
    targetCodeDisplay: SearchResultsCode,
    hint: { 
      en: "await user.click(screen.getByRole('button', { name: /search/i }));\nexpect(await screen.findByText(/no results found/i)).toBeInTheDocument();", 
      zh: "await user.click(screen.getByRole('button', { name: /search/i }));\nexpect(await screen.findByText(/no results found/i)).toBeInTheDocument();"
    },
    validationRules: [
      {
        description: { en: "Trigger Search", zh: "觸發搜尋" },
        mustMatch: [ /await\s+user\.click/ ]
      },
      {
        description: { en: "Find Result Text", zh: "找到結果文字" },
        mustMatch: [ /findByText\(.*No results found.*\)/, /\.toBeInTheDocument/ ]
      }
    ]
  },
  {
    id: '3.6',
    section: '3. Async & Mocking',
    title: { en: 'Error Toast', zh: '錯誤提示' },
    description: { en: 'Verify alert role when API fails.', zh: '當 API 失敗時驗證 alert role。' },
    framework: TestFramework.JEST,
    difficulty: 'Intermediate',
    requirements: [ { en: 'Mock API failure', zh: '模擬 API 失敗' }, { en: 'Click Subscribe', zh: '點擊訂閱' }, { en: 'Find element by role "alert"', zh: '透過 role "alert" 找到元素' } ],
    initialCode: `import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Newsletter } from './Newsletter';

test('shows error toast', async () => {
  const user = userEvent.setup();
  jest.spyOn(global, 'fetch').mockRejectedValue(new Error());
  render(<Newsletter />);
  // Click
  // Find alert
});`,
    targetComponent: Newsletter,
    targetCodeDisplay: NewsletterCode,
    hint: { 
      en: "const btn = screen.getByRole('button', { name: /subscribe/i });\nawait user.click(btn);\nexpect(await screen.findByRole('alert')).toBeInTheDocument();", 
      zh: "const btn = screen.getByRole('button', { name: /subscribe/i });\nawait user.click(btn);\nexpect(await screen.findByRole('alert')).toBeInTheDocument();"
    },
    validationRules: [
      {
        description: { en: "Mock Failure", zh: "模擬失敗" },
        mustMatch: [ /mockRejectedValue/ ]
      },
      {
        description: { en: "Click Subscribe", zh: "點擊訂閱" },
        mustMatch: [ /await\s+user\.click/ ]
      },
      {
        description: { en: "Find Alert & Verify", zh: "找到 Alert 並驗證" },
        mustMatch: [ /expect\(.*findByRole\(.*['"]alert['"].*\).*\]\.toBeInTheDocument/ ]
      }
    ]
  },
];