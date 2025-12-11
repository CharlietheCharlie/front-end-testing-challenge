import { Lesson, TestFramework } from '../../types';
import {
  LoginForm,
  LoginFormCode,
  SecretMessage,
  SecretMessageCode,
  UserRoleList,
  UserRoleListCode,
  TabSwitcher,
  TabSwitcherCode,
  DoubleForm,
  DoubleFormCode,
} from '../../components/targets';

export const SECTION1: Lesson[] = [
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
];
