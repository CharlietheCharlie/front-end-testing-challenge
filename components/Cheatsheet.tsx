import React, { useState } from 'react';
import { Language } from '../types';
import { Search, MousePointer2, Eye, Globe, Terminal, Clock, BoxSelect, Network } from 'lucide-react';

interface CheatsheetProps {
  lang: Language;
}

export const Cheatsheet: React.FC<CheatsheetProps> = ({ lang }) => {
  const [activeTab, setActiveTab] = useState<'queries' | 'matchers' | 'events' | 'mocks' | 'hooks' | 'playwright'>('queries');

  const tabs = [
    { id: 'queries', label: 'Queries', icon: Search },
    { id: 'matchers', label: 'Expect', icon: Eye },
    { id: 'events', label: 'Events', icon: MousePointer2 },
    { id: 'mocks', label: 'Mocks', icon: Clock },
    { id: 'hooks', label: 'Hooks', icon: BoxSelect },
    { id: 'playwright', label: 'E2E', icon: Globe },
  ] as const;

  return (
    <div className="h-full flex flex-col bg-dark-950 text-slate-300 font-sans overflow-hidden">
      {/* Intro Header */}
      <div className="p-8 pb-4 border-b border-dark-700 bg-gradient-to-r from-dark-900 to-dark-950">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <Terminal className="text-primary-500" />
          {lang === 'en' ? 'Testing Cheatsheet' : '全方位測試速查表'}
        </h1>
        <p className="text-slate-400 max-w-2xl">
          {lang === 'en' 
            ? 'The complete guide to React Testing Library, Jest mocks, Hooks, and Playwright automation.' 
            : 'React Testing Library、Jest 模擬、Hooks 測試與 Playwright 自動化的完整指南。'}
        </p>
      </div>

      {/* Tabs - Scrollable for mobile */}
      <div className="flex border-b border-dark-700 bg-dark-900 px-6 gap-2 pt-4 overflow-x-auto no-scrollbar">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-bold rounded-t-lg transition-colors whitespace-nowrap ${
              activeTab === tab.id 
                ? 'bg-dark-800 text-primary-400 border-x border-t border-dark-700' 
                : 'text-slate-500 hover:text-slate-300 hover:bg-dark-800/50'
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-8 bg-dark-950">
        <div className="max-w-5xl mx-auto space-y-8 pb-20">
          
          {/* 1. RTL QUERIES */}
          {activeTab === 'queries' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              <SectionHeader 
                title={lang === 'en' ? 'Finding Elements (RTL)' : '尋找元素 (RTL)'} 
                desc={lang === 'en' ? 'Priority order for selecting elements. Always prefer accessibility-first queries.' : '選取元素的優先順序建議。請總是優先使用具備無障礙意義的查詢方式。'}
              />
              
              <Table 
                headers={[lang === 'en' ? 'Method' : '方法', lang === 'en' ? 'Description' : '說明', 'Code Example']}
                rows={[
                  { 
                    col1: 'getByRole', 
                    col2: lang === 'en' ? 'Best for a11y. Buttons, headings, inputs.' : '最佳選擇 (無障礙)。用於按鈕、標題、輸入框。', 
                    code: "screen.getByRole('button', { name: /save/i })" 
                  },
                  { 
                    col1: 'getByLabelText', 
                    col2: lang === 'en' ? 'Good for form inputs.' : '適合表單輸入框。', 
                    code: "screen.getByLabelText('Email Address')" 
                  },
                  { 
                    col1: 'getByPlaceholderText', 
                    col2: lang === 'en' ? 'Fallback if no label exists.' : '若無 Label 時的備案。', 
                    code: "screen.getByPlaceholderText('Search...')" 
                  },
                  { 
                    col1: 'getByText', 
                    col2: lang === 'en' ? 'For non-interactive text (div, span).' : '用於非互動文字 (div, span)。', 
                    code: "screen.getByText(/welcome back/i)" 
                  },
                  { 
                    col1: 'getByTestId', 
                    col2: lang === 'en' ? 'Last resort. Requires data-testid.' : '最後手段。需要 data-testid 屬性。', 
                    code: "screen.getByTestId('custom-widget')" 
                  },
                  { 
                    col1: 'within(elem)', 
                    col2: lang === 'en' ? 'Scope queries inside a parent element.' : '在父元素範圍內進行搜尋。', 
                    code: "within(modal).getByRole('button')" 
                  },
                ]}
              />

              <div className="mt-8 p-4 bg-amber-900/10 border border-amber-900/30 rounded">
                <h3 className="text-amber-500 font-bold text-sm mb-2 uppercase">Async & Missing Elements Strategy</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <code className="text-primary-300 font-bold text-lg">getBy...</code>
                    <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                      {lang === 'en' ? 'Standard. Throws error if element is not found immediately.' : '標準用法。若元素未立即找到，會直接拋出錯誤並中斷測試。'}
                    </p>
                  </div>
                  <div>
                    <code className="text-purple-300 font-bold text-lg">queryBy...</code>
                    <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                      {lang === 'en' ? 'Returns null. Use ONLY when asserting an element should NOT exist.' : '回傳 null。**僅** 用於驗證元素「不應該存在」時使用。'}
                    </p>
                  </div>
                  <div>
                    <code className="text-green-300 font-bold text-lg">await findBy...</code>
                    <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                      {lang === 'en' ? 'Async. Waits up to 1000ms. Use for elements that appear after fetch/render.' : '非同步。等待最多 1000ms。用於測試 API 回傳或狀態改變後才出現的元素。'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. JEST MATCHERS */}
          {activeTab === 'matchers' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
               <SectionHeader 
                title={lang === 'en' ? 'Assertions (jest-dom)' : '斷言驗證 (jest-dom)'} 
                desc={lang === 'en' ? 'Verifying the state of the DOM and elements.' : '驗證 DOM 狀態與元素屬性。'}
              />
              <Table 
                headers={[lang === 'en' ? 'Matcher' : '比對器', lang === 'en' ? 'Usage Scenario' : '使用情境', 'Example']}
                rows={[
                  { col1: 'toBeInTheDocument()', col2: lang === 'en' ? 'Check existence in DOM.' : '檢查元素是否存在於 DOM 中。', code: "expect(el).toBeInTheDocument()" },
                  { col1: 'toBeVisible()', col2: lang === 'en' ? 'Check visibility (not hidden).' : '檢查使用者是否可見 (非 hidden)。', code: "expect(el).toBeVisible()" },
                  { col1: 'toBeDisabled()', col2: lang === 'en' ? 'Check disabled attribute.' : '檢查是否被禁用。', code: "expect(btn).toBeDisabled()" },
                  { col1: 'toBeEnabled()', col2: lang === 'en' ? 'Check not disabled.' : '檢查是否啟用。', code: "expect(input).toBeEnabled()" },
                  { col1: 'toHaveValue(val)', col2: lang === 'en' ? 'Check form input value.' : '檢查 input/select 的值。', code: "expect(input).toHaveValue('Hello')" },
                  { col1: 'toHaveTextContent(txt)', col2: lang === 'en' ? 'Check text content.' : '檢查元素的文字內容。', code: "expect(div).toHaveTextContent(/error/i)" },
                  { col1: 'toHaveClass(cls)', col2: lang === 'en' ? 'Check CSS class.' : '檢查 CSS Class。', code: "expect(div).toHaveClass('active')" },
                  { col1: 'toBeChecked()', col2: lang === 'en' ? 'Check checkbox state.' : '檢查 Checkbox 勾選狀態。', code: "expect(checkbox).toBeChecked()" },
                  { col1: 'toBeInvalid()', col2: lang === 'en' ? 'Check form validation.' : '檢查表單驗證無效狀態。', code: "expect(input).toBeInvalid()" },
                ]}
              />
            </div>
          )}

          {/* 3. USER EVENTS */}
          {activeTab === 'events' && (
             <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
             <SectionHeader 
              title={lang === 'en' ? 'User Interactions' : '使用者互動'} 
              desc={lang === 'en' ? 'Simulating real user behavior with user-event library.' : '使用 user-event 函式庫模擬真實使用者行為。'}
            />
            <div className="mb-4 text-sm text-slate-400 bg-dark-800 p-3 rounded border-l-4 border-primary-500 flex items-center gap-3">
              <span className="text-xl">💡</span>
              <div>
                {lang === 'en' ? 'Always setup userEvent before rendering:' : '請總是在 render 之前初始化 userEvent：'}
                <br />
                <code className="text-white text-xs bg-black/30 px-1 py-0.5 rounded">const user = userEvent.setup();</code>
              </div>
            </div>
            <Table 
              headers={[lang === 'en' ? 'Interaction' : '互動', lang === 'en' ? 'Description' : '說明', 'Code Example']}
              rows={[
                { 
                  col1: 'click', 
                  col2: lang === 'en' ? 'Left click.' : '滑鼠左鍵點擊。', 
                  code: "await user.click(btn)" 
                },
                { 
                  col1: 'dblClick', 
                  col2: lang === 'en' ? 'Double click.' : '滑鼠左鍵雙擊。', 
                  code: "await user.dblClick(element)" 
                },
                { 
                  col1: 'type', 
                  col2: lang === 'en' ? 'Type text.' : '輸入文字。', 
                  code: "await user.type(input, 'Hello')" 
                },
                { 
                  col1: 'clear', 
                  col2: lang === 'en' ? 'Clear input.' : '清空輸入框。', 
                  code: "await user.clear(input)" 
                },
                { 
                  col1: 'selectOptions', 
                  col2: lang === 'en' ? 'Select from dropdown.' : '選擇下拉選單項目。', 
                  code: "await user.selectOptions(select, 'opt1')" 
                },
                { 
                  col1: 'hover', 
                  col2: lang === 'en' ? 'Mouse hover.' : '滑鼠懸停。', 
                  code: "await user.hover(tooltip)" 
                },
                { 
                  col1: 'keyboard', 
                  col2: lang === 'en' ? 'Press keys.' : '按下按鍵 (Enter, Esc)。', 
                  code: "await user.keyboard('{Enter}')" 
                },
                { 
                  col1: 'upload', 
                  col2: lang === 'en' ? 'Upload file.' : '上傳檔案。', 
                  code: "await user.upload(input, file)" 
                },
                { 
                  col1: 'paste', 
                  col2: lang === 'en' ? 'Paste clipboard text.' : '貼上剪貼簿內容。', 
                  code: "await user.paste('text')" 
                },
              ]}
            />
          </div>
          )}

          {/* 4. MOCKS & TIMERS (NEW) */}
          {activeTab === 'mocks' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
               <SectionHeader 
                title={lang === 'en' ? 'Mocks & Timers (Jest)' : '模擬與計時器 (Jest)'} 
                desc={lang === 'en' ? 'Isolating code and controlling time.' : '隔離程式碼依賴並控制時間流動。'}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-dark-900 border border-dark-700 rounded-lg p-5">
                  <h3 className="text-primary-400 font-bold mb-3 flex items-center gap-2">
                    <Network size={16} /> API Mocking
                  </h3>
                  <div className="space-y-4 text-sm">
                    <div>
                      <div className="text-slate-400 text-xs uppercase font-bold mb-1">Create Spy</div>
                      <code className="block bg-black/30 p-2 rounded text-green-300 border border-dark-700">jest.spyOn(global, 'fetch')</code>
                    </div>
                    <div>
                      <div className="text-slate-400 text-xs uppercase font-bold mb-1">Success Response</div>
                      <code className="block bg-black/30 p-2 rounded text-green-300 border border-dark-700">.mockResolvedValue(&#123; ok: true &#125;)</code>
                    </div>
                    <div>
                      <div className="text-slate-400 text-xs uppercase font-bold mb-1">Error Response</div>
                      <code className="block bg-black/30 p-2 rounded text-green-300 border border-dark-700">.mockRejectedValue(new Error())</code>
                    </div>
                  </div>
                </div>

                <div className="bg-dark-900 border border-dark-700 rounded-lg p-5">
                  <h3 className="text-amber-400 font-bold mb-3 flex items-center gap-2">
                    <Clock size={16} /> Fake Timers
                  </h3>
                  <div className="space-y-4 text-sm">
                    <div>
                      <div className="text-slate-400 text-xs uppercase font-bold mb-1">Setup</div>
                      <code className="block bg-black/30 p-2 rounded text-green-300 border border-dark-700">jest.useFakeTimers()</code>
                    </div>
                    <div>
                      <div className="text-slate-400 text-xs uppercase font-bold mb-1">Fast Forward</div>
                      <code className="block bg-black/30 p-2 rounded text-green-300 border border-dark-700">jest.advanceTimersByTime(3000)</code>
                    </div>
                    <div>
                      <div className="text-slate-400 text-xs uppercase font-bold mb-1">Run All</div>
                      <code className="block bg-black/30 p-2 rounded text-green-300 border border-dark-700">jest.runAllTimers()</code>
                    </div>
                  </div>
                </div>
              </div>

              <Table 
                headers={[lang === 'en' ? 'Function' : '函數', lang === 'en' ? 'Purpose' : '用途', 'Syntax']}
                rows={[
                  { col1: 'jest.fn()', col2: lang === 'en' ? 'Create a simple mock function.' : '建立一個簡單的模擬函數 (如 callback)。', code: "const onClick = jest.fn()" },
                  { col1: 'jest.spyOn()', col2: lang === 'en' ? 'Mock existing object method.' : '模擬現有物件的方法 (如 window.alert)。', code: "jest.spyOn(window, 'alert')" },
                  { col1: 'mockReturnValue', col2: lang === 'en' ? 'Return static value.' : '設定回傳固定值。', code: "mock.mockReturnValue(5)" },
                  { col1: 'mockImplementation', col2: lang === 'en' ? 'Custom logic.' : '自定義模擬邏輯。', code: "mock.mockImplementation(x => x * 2)" },
                  { col1: 'toHaveBeenCalled', col2: lang === 'en' ? 'Assert called.' : '驗證被呼叫過。', code: "expect(fn).toHaveBeenCalled()" },
                  { col1: 'toHaveBeenCalledWith', col2: lang === 'en' ? 'Assert arguments.' : '驗證呼叫參數。', code: "expect(fn).toHaveBeenCalledWith('arg')" },
                ]}
              />
            </div>
          )}

          {/* 5. HOOKS (NEW) */}
          {activeTab === 'hooks' && (
             <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
             <SectionHeader 
              title={lang === 'en' ? 'Testing Hooks' : '測試 Hooks'} 
              desc={lang === 'en' ? 'Testing custom hooks without components using renderHook.' : '使用 renderHook 測試不帶組件的自定義 Hooks。'}
            />
             <div className="bg-dark-900 border border-dark-700 rounded-lg p-6 mb-6 font-mono text-sm">
                <div className="text-slate-500 mb-2">// 1. Render the hook</div>
                <div className="text-purple-300">const &#123; result &#125; = renderHook(() =&gt; useCounter());</div>
                <br />
                <div className="text-slate-500 mb-2">// 2. Check initial state</div>
                <div className="text-green-300">expect(result.current.count).toBe(0);</div>
                <br />
                <div className="text-slate-500 mb-2">// 3. Update state (Must wrap in act)</div>
                <div className="text-blue-300">act(() =&gt; &#123;</div>
                <div className="text-blue-300 pl-4">result.current.increment();</div>
                <div className="text-blue-300">&#125;);</div>
             </div>

             <Table 
              headers={[lang === 'en' ? 'Utility' : '工具', lang === 'en' ? 'Description' : '說明', 'Usage']}
              rows={[
                { col1: 'renderHook', col2: lang === 'en' ? 'Render a hook in test environment.' : '在測試環境中渲染 Hook。', code: "renderHook(() => useHook())" },
                { col1: 'result.current', col2: lang === 'en' ? 'Access latest return value.' : '取得 Hook 最新的回傳值。', code: "result.current.value" },
                { col1: 'act', col2: lang === 'en' ? 'Wrap state updates.' : '包裹所有會改變 State 的操作。', code: "act(() => update())" },
                { col1: 'rerender', col2: lang === 'en' ? 'Update hook props.' : '更新 Hook 的 Props。', code: "rerender({ newVal: 10 })" },
                { col1: 'unmount', col2: lang === 'en' ? 'Simulate component unmount.' : '模擬組件卸載 (測試 cleanup)。', code: "unmount()" },
              ]}
            />
          </div>
          )}

          {/* 6. PLAYWRIGHT (EXPANDED) */}
          {activeTab === 'playwright' && (
             <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
             <SectionHeader 
              title="Playwright E2E" 
              desc={lang === 'en' ? 'Browser automation syntax for complex scenarios.' : '用於複雜場景的瀏覽器自動化語法。'}
            />
            
            <div className="space-y-8">
              <div>
                <h3 className="text-white font-bold mb-3 border-l-4 border-green-500 pl-3">Locators & Actions</h3>
                <Table 
                  headers={[lang === 'en' ? 'Action' : '動作', lang === 'en' ? 'Syntax' : '語法', 'Example']}
                  rows={[
                    { col1: 'Navigate', col2: 'page.goto(url)', code: "await page.goto('/login')" },
                    { col1: 'Get by Text', col2: 'page.getByText(text)', code: "await page.getByText('Hello')" },
                    { col1: 'Get by Role', col2: 'page.getByRole(role)', code: "await page.getByRole('button')" },
                    { col1: 'Click', col2: 'locator.click()', code: "await locator.click()" },
                    { col1: 'Fill', col2: 'locator.fill(txt)', code: "await locator.fill('John')" },
                    { col1: 'Check', col2: 'locator.check()', code: "await locator.check()" },
                    { col1: 'Drag', col2: 'dragTo(target)', code: "await src.dragTo(dest)" },
                  ]}
                />
              </div>

              <div>
                <h3 className="text-white font-bold mb-3 border-l-4 border-purple-500 pl-3">Advanced Scenarios</h3>
                <Table 
                  headers={[lang === 'en' ? 'Topic' : '主題', lang === 'en' ? 'Method' : '方法', 'Code Snippet']}
                  rows={[
                    { col1: 'Network Mock', col2: 'page.route', code: "await page.route('**/api/user', route => route.fulfill({ json: { id: 1 } }))" },
                    { col1: 'iFrame', col2: 'frameLocator', code: "page.frameLocator('#pay').getByText('Card')" },
                    { col1: 'New Tab', col2: 'waitForEvent', code: "const popup = await page.waitForEvent('popup')" },
                    { col1: 'Dialog', col2: 'page.on("dialog")', code: "page.on('dialog', d => d.accept())" },
                    { col1: 'Mobile View', col2: 'setViewportSize', code: "await page.setViewportSize({ width: 375, height: 667 })" },
                    { col1: 'Storage', col2: 'addInitScript', code: "await page.addInitScript(() => localStorage.setItem('token', '123'))" },
                    { col1: 'Evaluate', col2: 'page.evaluate', code: "await page.evaluate(() => document.title)" },
                  ]}
                />
              </div>
            </div>
          </div>
          )}

        </div>
      </div>
    </div>
  );
};

const SectionHeader: React.FC<{title: string, desc: string}> = ({ title, desc }) => (
  <div className="mb-6">
    <h2 className="text-xl font-bold text-white mb-1">{title}</h2>
    <p className="text-slate-500 text-sm">{desc}</p>
  </div>
);

const Table: React.FC<{ headers: string[], rows: {col1: string, col2: string, code: string}[] }> = ({ headers, rows }) => (
  <div className="border border-dark-700 rounded-lg overflow-hidden bg-dark-900 shadow-sm">
    <table className="w-full text-left text-sm">
      <thead className="bg-dark-800 text-slate-400 font-semibold border-b border-dark-700">
        <tr>
          {headers.map((h, i) => <th key={i} className="p-4">{h}</th>)}
        </tr>
      </thead>
      <tbody className="divide-y divide-dark-800">
        {rows.map((row, i) => (
          <tr key={i} className="hover:bg-dark-800/50 transition-colors">
            <td className="p-4 font-mono text-primary-400 font-bold whitespace-nowrap">{row.col1}</td>
            <td className="p-4 text-slate-400">{row.col2}</td>
            <td className="p-4">
              <code className="px-2 py-1 bg-black/40 border border-dark-700 rounded text-xs text-green-400 font-mono break-all block w-fit">
                {row.code}
              </code>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);