import { Lesson, TestFramework } from '../../types';
import {
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
} from '../../components/targets';

export const SECTION5: Lesson[] = [
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
        mustMatch: [ /page.goto(.*\/cart.*)/ ]
      },
      {
        description: { en: "Click Add", zh: "點擊新增" },
        mustMatch: [ /page.getByTestId(.*add.*).click/ ]
      },
      {
        description: { en: "Assert Text", zh: "驗證文字" },
        mustMatch: [ /expect(.*locator.*text=Cart: 1.*).toBeVisible/ ]
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
        mustMatch: [ /.dragTo\(/ ]
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
        mustMatch: [ /page.on(.*dialog.*accept.*)/ ]
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
        mustMatch: [ /toHaveAttribute(.*href.*example.com.*)/ ]
      },
      {
        description: { en: "Check Target", zh: "檢查 Target" },
        mustMatch: [ /toHaveAttribute(.*target.*_blank.*)/ ]
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
        mustMatch: [ /page.route(.*users.*)/ ]
      },
      {
        description: { en: "Fulfill Request", zh: "回傳假資料" },
        mustMatch: [ /route.fulfill(.*json.*)/ ]
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
        mustMatch: [ /frameLocator(.)/ ]
      },
      {
        description: { en: "Fill Input", zh: "填寫輸入框" },
        mustMatch: [ /fill(.*1234.)/ ]
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
];