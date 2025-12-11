import { Lesson, TestFramework } from '../types';
import {
  LoginForm, LoginFormCode,
  SecretMessage, SecretMessageCode,
  UserRoleList, UserRoleListCode,
  TabSwitcher, TabSwitcherCode,
  DoubleForm, DoubleFormCode,
  TweetComposer, TweetComposerCode,
  PaymentButton, PaymentButtonCode,
  TagInput, TagInputCode,
  TooltipDemo, TooltipDemoCode,
  PreferenceForm, PreferenceFormCode,
  UserForm, UserFormCode,
  SimpleList, SimpleListCode,
  RetryButton, RetryButtonCode,
  DashboardWidget, DashboardWidgetCode,
  SearchResults, SearchResultsCode,
  Newsletter, NewsletterCode,
  HooksPlaceholder,
  Cart, CartFlowCode,
  KanbanBoard,
  DeleteAction,
  ExternalLink,
  UserListNetwork,
  PaymentIframe,
  AvatarUpload,
  AuthGreeting,
  ResponsiveMenu,
  PopupTrigger,
  ThemeDisplay, ThemeDisplayCode,
  ReduxCounter, ReduxCounterCode,
  ModalComponent, ModalComponentCode,
  ErrorBoundaryDemo, ErrorBoundaryCode,
  ResponsiveComponent, ResponsiveComponentCode
} from '../components/targets';

export const LESSONS: Lesson[] = [
  // --- SECTION 1: DOM ---
  {
    id: '1.1',
    section: '1. DOM & Accessibility',
    title: { en: 'Basic Selection', zh: '基礎元素選取' },
    description: { en: 'Select inputs by label and buttons by role, then assert they exist.', zh: '使用 Label 選取輸入框，使用 Role 選取按鈕，並驗證它們存在。' },
    framework: TestFramework.RTL,
    difficulty: 'Beginner',
    requirements: [ { en: 'Find input by label "Email"', zh: '找到 Email 輸入框' }, { en: 'Find button "Sign In"', zh: '找到 Sign In 按鈕' }, { en: 'Assert both are in the document', zh: '確認兩者皆存在於文件中' } ],
    initialCode: `import { render, screen } from '@testing-library/react';
import { LoginForm } from './LoginForm';

test('renders form', () => {
  render(<LoginForm />);
  // Use expect(...).toBeInTheDocument()
});`,
    targetComponent: LoginForm,
    targetCodeDisplay: LoginFormCode,
    hint: { 
      en: "expect(screen.getByLabelText('Email')).toBeInTheDocument();\nexpect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();", 
      zh: "expect(screen.getByLabelText('Email')).toBeInTheDocument();\nexpect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();" 
    },
    validationRules: [
      {
        description: { en: "Select Email Input", zh: "選取 Email 輸入框" },
        mustMatch: [ /screen\.getByLabelText\(/, /['"]Email['"]/ ]
      },
      {
        description: { en: "Select Sign In Button", zh: "選取 Sign In 按鈕" },
        mustMatch: [ /screen\.getByRole\(/, /['"]button['"]/, /name: \/sign in\/i/ ]
      },
      {
        description: { en: "Use jest-dom matcher", zh: "使用 jest-dom matcher" },
        mustMatch: [ /\.toBeInTheDocument\(\)/ ]
      }
    ]
  },
  {
    id: '1.2',
    section: '1. DOM & Accessibility',
    title: { en: 'Hidden Elements', zh: '隱藏元素 (QueryBy)' },
    description: { en: 'Use queryBy for elements that might not exist.', zh: '使用 queryBy 來測試可能不存在的元素。' },
    framework: TestFramework.RTL,
    difficulty: 'Intermediate',
    requirements: [ { en: 'Assert "secret" is missing initially', zh: '確認一開始 secret 不存在' }, { en: 'Click button using await user.click', zh: '使用 await user.click 點擊按鈕' }, { en: 'Assert "secret" exists', zh: '確認 secret 出現' } ],
    initialCode: `import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SecretMessage } from './SecretMessage';

test('toggles visibility', async () => {
  const user = userEvent.setup();
  render(<SecretMessage />);
  // 1. Assert NOT in document (queryBy...)
  // 2. await user.click...
  // 3. Assert IN document
});`,
    targetComponent: SecretMessage,
    targetCodeDisplay: SecretMessageCode,
    hint: { 
      en: "expect(screen.queryByTestId('secret')).not.toBeInTheDocument();\nawait user.click(screen.getByRole('button', { name: /show/i }));\nexpect(screen.getByTestId('secret')).toBeInTheDocument();", 
      zh: "expect(screen.queryByTestId('secret')).not.toBeInTheDocument();\nawait user.click(screen.getByRole('button', { name: /show/i }));\nexpect(screen.getByTestId('secret')).toBeInTheDocument();" 
    },
    validationRules: [
      {
        description: { en: "Verify absence (queryBy)", zh: "驗證不存在 (queryBy)" },
        mustMatch: [ /expect\(.*queryByTestId.*['"]secret['"].*\)\.not\.toBeInTheDocument/ ]
      },
      {
        description: { en: "Async Click (await user.click)", zh: "非同步點擊 (await user.click)" },
        mustMatch: [ /await\s+user\.click/, /text=['"]Show['"]|name: \/show\/i/ ],
        mustNotMatch: [ { pattern: /fireEvent/, message: { en: "Use userEvent instead of fireEvent", zh: "請使用 userEvent 取代 fireEvent" } } ]
      },
      {
        description: { en: "Verify presence", zh: "驗證存在" },
        mustMatch: [ /expect\(.*getByTestId.*['"]secret['"].*\)\.toBeInTheDocument/ ]
      }
    ]
  },
  {
    id: '1.3',
    section: '1. DOM & Accessibility',
    title: { en: 'Lists & Roles', zh: '列表與 Roles' },
    description: { en: 'Select list items using getByRole("listitem").', zh: '使用 getByRole("listitem") 選取列表項目。' },
    framework: TestFramework.RTL,
    difficulty: 'Beginner',
    requirements: [ { en: 'Find all list items', zh: '找到所有列表項目' }, { en: 'Assert there are 3 items', zh: '確認有 3 個項目' } ],
    initialCode: `import { render, screen } from '@testing-library/react';
import { UserRoleList } from './UserRoleList';

test('counts items', () => {
  render(<UserRoleList />);
  // const items = screen.getAllByRole(...)
});`,
    targetComponent: UserRoleList,
    targetCodeDisplay: UserRoleListCode,
    hint: { 
      en: "const items = screen.getAllByRole('listitem');\nexpect(items).toHaveLength(3);", 
      zh: "const items = screen.getAllByRole('listitem');\nexpect(items).toHaveLength(3);" 
    },
    validationRules: [
      {
        description: { en: "Select all list items", zh: "選取所有列表項目" },
        mustMatch: [ /screen\.getAllByRole\(/, /['"]listitem['"]/ ]
      },
      {
        description: { en: "Assert length is 3", zh: "驗證長度為 3" },
        mustMatch: [ /toHaveLength\(3\)|toBe\(3\)/ ]
      }
    ]
  },
  {
    id: '1.4',
    section: '1. DOM & Accessibility',
    title: { en: 'Dynamic Classes', zh: '動態樣式' },
    description: { en: 'Check if an element has a specific class.', zh: '檢查元素是否包含特定 class。' },
    framework: TestFramework.RTL,
    difficulty: 'Intermediate',
    requirements: [ { en: 'Find "Home" button', zh: '找到 Home 按鈕' }, { en: 'Assert it has class "bg-primary-600"', zh: '確認它有 "bg-primary-600" class' } ],
    initialCode: `import { render, screen } from '@testing-library/react';
import { TabSwitcher } from './TabSwitcher';

test('active tab styling', () => {
  render(<TabSwitcher />);
  // Check class of 'Home' button
});`,
    targetComponent: TabSwitcher,
    targetCodeDisplay: TabSwitcherCode,
    hint: { 
      en: "const btn = screen.getByRole('button', { name: /home/i });\nexpect(btn).toHaveClass('bg-primary-600');", 
      zh: "const btn = screen.getByRole('button', { name: /home/i });\nexpect(btn).toHaveClass('bg-primary-600');" 
    },
    validationRules: [
      {
        description: { en: "Select Home Button", zh: "選取 Home 按鈕" },
        mustMatch: [ /getByRole/, /name: \/home\/i/ ]
      },
      {
        description: { en: "Check Class", zh: "檢查 Class" },
        mustMatch: [ /toHaveClass/, /['"]bg-primary-600['"]/ ]
      }
    ]
  },
  {
    id: '1.5',
    section: '1. DOM & Accessibility',
    title: { en: 'Scoped Selection', zh: '範圍選取 (Within)' },
    description: { en: 'Use `within` to narrow down search to a specific section.', zh: '使用 `within` 將搜尋範圍縮小到特定區塊。' },
    framework: TestFramework.RTL,
    difficulty: 'Advanced',
    requirements: [ { en: 'Get "Shipping" section', zh: '取得 Shipping 區塊' }, { en: 'Find "Name" input INSIDE shipping', zh: '在 Shipping 內找 Name 輸入框' }, { en: 'Assert it is in document', zh: '確認它存在' } ],
    initialCode: `import { render, screen, within } from '@testing-library/react';
import { DoubleForm } from './DoubleForm';

test('shipping name', () => {
  render(<DoubleForm />);
  // const shipping = screen.getByRole('region', { name: /shipping/i });
  // const input = within(shipping).getByPlaceholderText...
});`,
    targetComponent: DoubleForm,
    targetCodeDisplay: DoubleFormCode,
    hint: { 
      en: "const shipping = screen.getByRole('region', { name: /shipping/i });\nconst input = within(shipping).getByPlaceholderText('Name');\nexpect(input).toBeInTheDocument();", 
      zh: "const shipping = screen.getByRole('region', { name: /shipping/i });\nconst input = within(shipping).getByPlaceholderText('Name');\nexpect(input).toBeInTheDocument();" 
    },
    validationRules: [
      {
        description: { en: "Select Shipping Region", zh: "選取 Shipping 區域" },
        mustMatch: [ /screen\.getByRole\(/, /['"]region['"]/, /name: \/shipping\/i/ ]
      },
      {
        description: { en: "Scoped lookup using within()", zh: "使用 within() 範圍搜尋" },
        mustMatch: [ /within\(.*shipping.*\)\.getByPlaceholderText/ ]
      },
      {
        description: { en: "Use jest-dom assertion", zh: "使用 jest-dom 驗證" },
        mustMatch: [ /\.toBeInTheDocument\(\)/ ]
      }
    ]
  },

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
        mustMatch: [ /expect\(.*getByText\(.*#React.*\).*\)\.toBeInTheDocument/ ]
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
        mustMatch: [ /expect\(.*getByLabelText\(.*Email.*\).*\)\.toBeChecked/ ]
      }
    ]
  },

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
    targetComponent: UserForm,
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
        mustMatch: [ /expect\(.*findByText\(.*Error.*\).*\)\.toBeInTheDocument/, /expect\(.*findByText\(.*Success.*\).*\)\.toBeInTheDocument/ ]
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
        mustMatch: [ /expect\(.*findByRole\(.*['"]alert['"].*\).*\)\.toBeInTheDocument/ ]
      }
    ]
  },

  // --- SECTION 4: HOOKS ---
  {
    id: '4.1',
    section: '4. Advanced Hooks',
    title: { en: 'Basic Hook', zh: '基礎 Hook' },
    description: { en: 'Test useCounter increment.', zh: '測試 useCounter 增加數值。' },
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
    targetCodeDisplay: `const [count, setCount] = useState(initial);`,
    hint: { 
      en: "act(() => {\n  result.current.inc();\n});\nexpect(result.current.count).toBe(1);", 
      zh: "act(() => {\n  result.current.inc();\n});\nexpect(result.current.count).toBe(1);" 
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
    targetCodeDisplay: `setTimeout(() => setD(value), delay);`,
    hint: { 
      en: "rerender({ v: 'B' });\nact(() => {\n  jest.advanceTimersByTime(100);\n});\nexpect(result.current).toBe('B');", 
      zh: "rerender({ v: 'B' });\nact(() => {\n  jest.advanceTimersByTime(100);\n});\nexpect(result.current).toBe('B');" 
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
    targetCodeDisplay: `const toggle = () => setState(s => !s);`,
    hint: { 
      en: "act(() => {\n  result.current[1]();\n});\nexpect(result.current[0]).toBe(true);", 
      zh: "act(() => {\n  result.current[1]();\n});\nexpect(result.current[0]).toBe(true);" 
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
    targetCodeDisplay: `ref`,
    hint: { 
      en: "rerender({ v: 1 });\nexpect(result.current).toBe(0);", 
      zh: "rerender({ v: 1 });\nexpect(result.current).toBe(0);" 
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

  // --- SECTION 5: PLAYWRIGHT ---
  {
    id: '5.1',
    section: '5. Playwright',
    title: { en: 'Basic Interaction', zh: '基礎互動' },
    description: { en: 'Click button and check text using Playwright syntax.', zh: '使用 Playwright 語法點擊按鈕並檢查文字。' },
    framework: TestFramework.PLAYWRIGHT,
    difficulty: 'Beginner',
    requirements: [ { en: 'Navigate to cart', zh: '前往購物車頁面' }, { en: 'Click add button', zh: '點擊新增按鈕' }, { en: 'Assert count is 1', zh: '確認數量為 1' } ],
    initialCode: `import { test, expect } from '@playwright/test';

test('cart interaction', async ({ page }) => {
  await page.goto('/cart');
  // Click add
  // Assert text
});`,
    targetComponent: Cart,
    targetCodeDisplay: CartFlowCode,
    hint: { 
      en: "await page.goto('/cart');\nawait page.getByTestId('add').click();\nawait expect(page.locator('text=Cart: 1')).toBeVisible();", 
      zh: "await page.goto('/cart');\nawait page.getByTestId('add').click();\nawait expect(page.locator('text=Cart: 1')).toBeVisible();" 
    },
    validationRules: [
      {
        description: { en: "Navigate", zh: "導航" },
        mustMatch: [ /page\.goto\(.*\/cart.*\)/ ]
      },
      {
        description: { en: "Click Add", zh: "點擊新增" },
        mustMatch: [ /page\.getByTestId\(.*add.*\)\.click/ ]
      },
      {
        description: { en: "Assert Text", zh: "驗證文字" },
        mustMatch: [ /expect\(.*locator.*text=Cart: 1.*\)\.toBeVisible/ ]
      }
    ]
  },
  {
    id: '5.2',
    section: '5. Playwright',
    title: { en: 'Drag and Drop', zh: '拖放操作' },
    description: { en: 'Simulate dragging a task to done column.', zh: '模擬將任務拖曳至完成欄位。' },
    framework: TestFramework.PLAYWRIGHT,
    difficulty: 'Intermediate',
    requirements: [ { en: 'Drag "Task 1"', zh: '拖曳 "Task 1"' }, { en: 'Drop in "DONE"', zh: '放置於 "DONE"' } ],
    initialCode: `import { test, expect } from '@playwright/test';

test('drag drop', async ({ page }) => {
  await page.goto('/board');
  const source = page.getByText('Task 1');
  const target = page.getByText('DONE');
  // Drag and drop
});`,
    targetComponent: KanbanBoard,
    targetCodeDisplay: `// HTML Drag and Drop API`,
    hint: { 
      en: "const source = page.getByText('Task 1');\nconst target = page.getByText('DONE');\nawait source.dragTo(target);", 
      zh: "const source = page.getByText('Task 1');\nconst target = page.getByText('DONE');\nawait source.dragTo(target);" 
    },
    validationRules: [
      {
        description: { en: "Drag To", zh: "拖曳至" },
        mustMatch: [ /\.dragTo\(/ ]
      }
    ]
  },
  {
    id: '5.3',
    section: '5. Playwright',
    title: { en: 'Dialog Handling', zh: '對話框處理' },
    description: { en: 'Handle native confirm dialogs.', zh: '處理原生的確認對話框。' },
    framework: TestFramework.PLAYWRIGHT,
    difficulty: 'Advanced',
    requirements: [ { en: 'Setup dialog handler', zh: '設定對話框處理器' }, { en: 'Accept dialog', zh: '接受對話框' }, { en: 'Trigger delete', zh: '觸發刪除' } ],
    initialCode: `import { test, expect } from '@playwright/test';

test('confirm delete', async ({ page }) => {
  await page.goto('/delete');
  // page.on('dialog', ...)
  // Click delete
});`,
    targetComponent: DeleteAction,
    targetCodeDisplay: `window.confirm('Sure?')`,
    hint: { 
      en: "page.on('dialog', dialog => dialog.accept());\nawait page.getByRole('button', { name: /delete/i }).click();", 
      zh: "page.on('dialog', dialog => dialog.accept());\nawait page.getByRole('button', { name: /delete/i }).click();" 
    },
    validationRules: [
      {
        description: { en: "Handle Dialog", zh: "處理對話框" },
        mustMatch: [ /page\.on\(.*dialog.*accept.*\)/ ]
      },
      {
        description: { en: "Click Delete", zh: "點擊刪除" },
        mustMatch: [ /click\(/ ]
      }
    ]
  },
  {
    id: '5.4',
    section: '5. Playwright',
    title: { en: 'External Links', zh: '外部連結' },
    description: { en: 'Verify link attributes and popup behavior.', zh: '驗證連結屬性與彈出視窗行為。' },
    framework: TestFramework.PLAYWRIGHT,
    difficulty: 'Beginner',
    requirements: [ { en: 'Find link', zh: '找到連結' }, { en: 'Check href is example.com', zh: '確認 href 為 example.com' }, { en: 'Check opens in blank', zh: '確認在新視窗開啟' } ],
    initialCode: `import { test, expect } from '@playwright/test';

test('external link', async ({ page }) => {
  await page.goto('/links');
  const link = page.getByText('External');
  // Check attributes
});`,
    targetComponent: ExternalLink,
    targetCodeDisplay: `<a href="..." target="_blank">`,
    hint: { 
      en: "await expect(link).toHaveAttribute('href', 'https://example.com');\nawait expect(link).toHaveAttribute('target', '_blank');", 
      zh: "await expect(link).toHaveAttribute('href', 'https://example.com');\nawait expect(link).toHaveAttribute('target', '_blank');" 
    },
    validationRules: [
      {
        description: { en: "Check Href", zh: "檢查 Href" },
        mustMatch: [ /toHaveAttribute\(.*href.*example\.com.*\)/ ]
      },
      {
        description: { en: "Check Target", zh: "檢查 Target" },
        mustMatch: [ /toHaveAttribute\(.*target.*_blank.*\)/ ]
      }
    ]
  },
  {
    id: '5.5',
    section: '5. Playwright',
    title: { en: 'Network Interception', zh: '網路攔截 (Mocking)' },
    description: { en: 'Use page.route to mock API responses.', zh: '使用 page.route 模擬 API 回應。' },
    framework: TestFramework.PLAYWRIGHT,
    difficulty: 'Advanced',
    requirements: [ { en: 'Intercept /api/users', zh: '攔截 /api/users' }, { en: 'Fulfill with JSON', zh: '回傳 JSON 資料' }, { en: 'Assert data visible', zh: '確認資料顯示' } ],
    initialCode: `import { test, expect } from '@playwright/test';

test('mocks api', async ({ page }) => {
  // await page.route(...)
  await page.goto('/users');
});`,
    targetComponent: UserListNetwork,
    targetCodeDisplay: `fetch('/api/users')`,
    hint: { 
      en: "await page.route('**/api/users', route => route.fulfill({ json: ['Alice', 'Bob'] }));\nawait page.goto('/users');\nawait expect(page.getByText('Alice')).toBeVisible();", 
      zh: "await page.route('**/api/users', route => route.fulfill({ json: ['Alice', 'Bob'] }));\nawait page.goto('/users');\nawait expect(page.getByText('Alice')).toBeVisible();" 
    },
    validationRules: [
      {
        description: { en: "Route API", zh: "設定 Route" },
        mustMatch: [ /page\.route\(.*users.*\)/ ]
      },
      {
        description: { en: "Fulfill Request", zh: "回傳假資料" },
        mustMatch: [ /route\.fulfill\(.*json.*\)/ ]
      }
    ]
  },
  {
    id: '5.6',
    section: '5. Playwright',
    title: { en: 'Iframe Handling', zh: 'Iframe 處理' },
    description: { en: 'Access elements inside an iframe using frameLocator.', zh: '使用 frameLocator 存取 iframe 內部元素。' },
    framework: TestFramework.PLAYWRIGHT,
    difficulty: 'Intermediate',
    requirements: [ { en: 'Locate iframe', zh: '定位 iframe' }, { en: 'Find input inside frame', zh: '找到 frame 內的輸入框' }, { en: 'Type card number', zh: '輸入卡號' } ],
    initialCode: `import { test, expect } from '@playwright/test';

test('payment iframe', async ({ page }) => {
  await page.goto('/pay');
  // const frame = page.frameLocator(...)
});`,
    targetComponent: PaymentIframe,
    targetCodeDisplay: `<iframe>`,
    hint: { 
      en: "const frame = page.frameLocator('iframe[title=\"Secure Payment\"]');\nawait frame.getByTestId('cc-input').fill('1234');", 
      zh: "const frame = page.frameLocator('iframe[title=\"Secure Payment\"]');\nawait frame.getByTestId('cc-input').fill('1234');" 
    },
    validationRules: [
      {
        description: { en: "Use FrameLocator", zh: "使用 FrameLocator" },
        mustMatch: [ /frameLocator\(.*\)/ ]
      },
      {
        description: { en: "Fill Input", zh: "填寫輸入框" },
        mustMatch: [ /fill\(.*1234.*\)/ ]
      }
    ]
  },
  {
    id: '5.7',
    section: '5. Playwright',
    title: { en: 'File Upload', zh: '檔案上傳' },
    description: { en: 'Simulate file selection using setInputFiles.', zh: '使用 setInputFiles 模擬檔案選擇。' },
    framework: TestFramework.PLAYWRIGHT,
    difficulty: 'Intermediate',
    requirements: [ { en: 'Select file input', zh: '選取檔案輸入框' }, { en: 'Set files', zh: '設定檔案' }, { en: 'Assert filename', zh: '驗證檔名顯示' } ],
    initialCode: `import { test, expect } from '@playwright/test';

test('upload file', async ({ page }) => {
  await page.goto('/upload');
  // setInputFiles
});`,
    targetComponent: AvatarUpload,
    targetCodeDisplay: `<input type="file" />`,
    hint: { 
      en: "await page.getByTestId('file-input').setInputFiles({ name: 'avatar.png', mimeType: 'image/png', buffer: Buffer.from('') });\nawait expect(page.locator('text=avatar.png')).toBeVisible();", 
      zh: "await page.getByTestId('file-input').setInputFiles({ name: 'avatar.png', mimeType: 'image/png', buffer: Buffer.from('') });\nawait expect(page.locator('text=avatar.png')).toBeVisible();" 
    },
    validationRules: [
      {
        description: { en: "Set Input Files", zh: "設定上傳檔案" },
        mustMatch: [ /setInputFiles/ ]
      }
    ]
  },
  {
    id: '5.8',
    section: '5. Playwright',
    title: { en: 'Storage State (Auth)', zh: '狀態保存 (登入)' },
    description: { en: 'Inject local storage to simulate logged-in state.', zh: '注入 localStorage 以模擬登入狀態。' },
    framework: TestFramework.PLAYWRIGHT,
    difficulty: 'Advanced',
    requirements: [ { en: 'Add auth_token to localStorage', zh: '新增 auth_token 到 localStorage' }, { en: 'Reload page', zh: '重新整理頁面' }, { en: 'Assert welcome message', zh: '驗證歡迎訊息' } ],
    initialCode: `import { test, expect } from '@playwright/test';

test('authenticated view', async ({ page }) => {
  await page.goto('/dashboard');
  // page.evaluate or addInitScript
});`,
    targetComponent: AuthGreeting,
    targetCodeDisplay: `localStorage.getItem('auth_token')`,
    hint: { 
      en: "await page.addInitScript(() => localStorage.setItem('auth_token', '123'));\nawait page.reload();\nawait expect(page.getByText('Welcome')).toBeVisible();", 
      zh: "await page.addInitScript(() => localStorage.setItem('auth_token', '123'));\nawait page.reload();\nawait expect(page.getByText('Welcome')).toBeVisible();" 
    },
    validationRules: [
      {
        description: { en: "Inject Storage", zh: "注入 Storage" },
        mustMatch: [ /addInitScript|evaluate/ ]
      },
      {
        description: { en: "Reload/Goto", zh: "重新整理/導航" },
        mustMatch: [ /reload\(\)|goto\(/ ]
      }
    ]
  },
  {
    id: '5.9',
    section: '5. Playwright',
    title: { en: 'Mobile Viewport', zh: '行動裝置視圖' },
    description: { en: 'Resize viewport to test responsive design.', zh: '調整視窗大小以測試響應式設計。' },
    framework: TestFramework.PLAYWRIGHT,
    difficulty: 'Beginner',
    requirements: [ { en: 'Set viewport to { width: 375, height: 667 }', zh: '設定視窗大小為 375x667' }, { en: 'Assert mobile menu visible', zh: '確認行動選單顯示' } ],
    initialCode: `import { test, expect } from '@playwright/test';

test('mobile layout', async ({ page }) => {
  // setViewportSize
  await page.goto('/home');
});`,
    targetComponent: ResponsiveMenu,
    targetCodeDisplay: `className="md:hidden"`,
    hint: { 
      en: "await page.setViewportSize({ width: 375, height: 667 });\nawait expect(page.getByText('Mobile Menu')).toBeVisible();", 
      zh: "await page.setViewportSize({ width: 375, height: 667 });\nawait expect(page.getByText('Mobile Menu')).toBeVisible();" 
    },
    validationRules: [
      {
        description: { en: "Set Viewport", zh: "設定視窗大小" },
        mustMatch: [ /setViewportSize/ ]
      }
    ]
  },
  {
    id: '5.10',
    section: '5. Playwright',
    title: { en: 'Multiple Tabs', zh: '多頁籤處理' },
    description: { en: 'Handle new pages/tabs opened by target="_blank".', zh: '處理 target="_blank" 開啟的新頁籤。' },
    framework: TestFramework.PLAYWRIGHT,
    difficulty: 'Advanced',
    requirements: [ { en: 'Wait for event "popup"', zh: '等待 popup 事件' }, { en: 'Click trigger button', zh: '點擊觸發按鈕' }, { en: 'Assert popup url', zh: '驗證新視窗 URL' } ],
    initialCode: `import { test, expect } from '@playwright/test';

test('opens help', async ({ page }) => {
  await page.goto('/app');
  // const popupPromise = page.waitForEvent('popup');
  // Click
  // const popup = await popupPromise;
});`,
    targetComponent: PopupTrigger,
    targetCodeDisplay: `window.open(...)`,
    hint: { 
      en: "const popupPromise = page.waitForEvent('popup');\nawait page.getByText('Open Help').click();\nconst popup = await popupPromise;\nawait expect(popup).toHaveURL(/help/);", 
      zh: "const popupPromise = page.waitForEvent('popup');\nawait page.getByText('Open Help').click();\nconst popup = await popupPromise;\nawait expect(popup).toHaveURL(/help/);" 
    },
    validationRules: [
      {
        description: { en: "Wait for Popup", zh: "等待 Popup" },
        mustMatch: [ /waitForEvent\(['"]popup['"]\)/ ]
      },
      {
        description: { en: "Await Promise", zh: "等待 Promise" },
        mustMatch: [ /await popupPromise/ ]
      }
    ]
  },

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
      en: "render(\n  <ThemeContext.Provider value=\"dark\">\n    <ThemeDisplay />\n  </ThemeContext.Provider>\n);\nexpect(screen.getByText(/dark/i)).toBeInTheDocument();", 
      zh: "render(\n  <ThemeContext.Provider value=\"dark\">\n    <ThemeDisplay />\n  </ThemeContext.Provider>\n);\nexpect(screen.getByText(/dark/i)).toBeInTheDocument();" 
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
      en: "await user.click(screen.getByText('+'));\nexpect(screen.getByTestId('count-value')).toHaveTextContent('1');", 
      zh: "await user.click(screen.getByText('+'));\nexpect(screen.getByTestId('count-value')).toHaveTextContent('1');" 
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
      en: "await user.click(screen.getByText(/open/i));\nconst dialog = screen.getByRole('dialog');\nexpect(within(dialog).getByText('Terms')).toBeVisible();", 
      zh: "await user.click(screen.getByText(/open/i));\nconst dialog = screen.getByRole('dialog');\nexpect(within(dialog).getByText('Terms')).toBeVisible();" 
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
      en: "render(<ErrorBoundary><Bomb shouldThrow={true} /></ErrorBoundary>);\nexpect(screen.getByRole('alert')).toHaveTextContent(/wrong/i);", 
      zh: "render(<ErrorBoundary><Bomb shouldThrow={true} /></ErrorBoundary>);\nexpect(screen.getByRole('alert')).toHaveTextContent(/wrong/i);" 
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
      en: "jest.spyOn(require('./hooks'), 'useWindowWidth').mockReturnValue(500);\nrender(<ResponsiveComponent />);\nexpect(screen.getByText('Mobile')).toBeInTheDocument();", 
      zh: "jest.spyOn(require('./hooks'), 'useWindowWidth').mockReturnValue(500);\nrender(<ResponsiveComponent />);\nexpect(screen.getByText('Mobile')).toBeInTheDocument();" 
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