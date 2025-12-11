import React from 'react';
import { X, Search } from 'lucide-react';
import { Language } from '../types';

interface RoleReferenceModalProps {
  onClose: () => void;
  lang: Language;
}

const ROLE_DATA = [
  {
    element: '<button>',
    role: 'button',
    usage: "screen.getByRole('button', { name: /submit/i })",
    desc: { en: 'Clickable actions', zh: '點擊觸發動作' }
  },
  {
    element: '<a href="...">',
    role: 'link',
    usage: "screen.getByRole('link', { name: /home/i })",
    desc: { en: 'Navigation links', zh: '頁面導航連結' }
  },
  {
    element: '<input type="text">',
    role: 'textbox',
    usage: "screen.getByRole('textbox', { name: /email/i })",
    desc: { en: 'Text input fields', zh: '文字輸入欄位' }
  },
  {
    element: '<input type="checkbox">',
    role: 'checkbox',
    usage: "screen.getByRole('checkbox', { name: /agree/i })",
    desc: { en: 'Toggle options', zh: '切換選項' }
  },
  {
    element: '<input type="radio">',
    role: 'radio',
    usage: "screen.getByRole('radio', { name: /option/i })",
    desc: { en: 'Single selection', zh: '單選項目' }
  },
  {
    element: '<h1> to <h6>',
    role: 'heading',
    usage: "screen.getByRole('heading', { level: 1 })",
    desc: { en: 'Section titles', zh: '區塊標題' }
  },
  {
    element: '<img alt="...">',
    role: 'img',
    usage: "screen.getByRole('img', { name: /logo/i })",
    desc: { en: 'Images with alt text', zh: '包含替代文字的圖片' }
  },
  {
    element: '<ul> / <ol>',
    role: 'list',
    usage: "screen.getByRole('list')",
    desc: { en: 'List container', zh: '列表容器' }
  },
  {
    element: '<li>',
    role: 'listitem',
    usage: "screen.getAllByRole('listitem')",
    desc: { en: 'List item', zh: '列表項目' }
  },
  {
    element: '<div role="alert">',
    role: 'alert',
    usage: "screen.getByRole('alert')",
    desc: { en: 'Important messages', zh: '重要訊息/錯誤提示' }
  },
  {
    element: '<form aria-label="...">',
    role: 'form',
    usage: "screen.getByRole('form', { name: /login/i })",
    desc: { en: 'Form container (requires name)', zh: '表單容器 (需有名稱)' }
  }
];

export const RoleReferenceModal: React.FC<RoleReferenceModalProps> = ({ onClose, lang }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-dark-900 border border-dark-700 rounded-lg shadow-2xl w-full max-w-4xl flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-dark-700 bg-dark-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-900/30 rounded text-primary-400">
              <Search size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">RTL Query Cheatsheet</h2>
              <p className="text-xs text-slate-400">Common HTML elements and their implicit ARIA roles</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white hover:bg-dark-700 p-2 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Table Content */}
        <div className="flex-1 overflow-auto p-0">
          <table className="w-full text-left text-sm border-collapse">
            <thead className="bg-dark-950 sticky top-0 z-10 shadow-sm">
              <tr>
                <th className="p-4 font-semibold text-slate-400 border-b border-dark-700 w-1/5">HTML Element</th>
                <th className="p-4 font-semibold text-primary-400 border-b border-dark-700 w-1/6">Implicit Role</th>
                <th className="p-4 font-semibold text-slate-400 border-b border-dark-700 w-1/3">Example Query</th>
                <th className="p-4 font-semibold text-slate-400 border-b border-dark-700">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-800">
              {ROLE_DATA.map((row, i) => (
                <tr key={i} className="hover:bg-dark-800/50 transition-colors group">
                  <td className="p-4 font-mono text-purple-300 bg-dark-900/30">{row.element}</td>
                  <td className="p-4 font-bold text-primary-300">{row.role}</td>
                  <td className="p-4 font-mono text-xs text-slate-300">
                    <span className="bg-black/30 px-2 py-1 rounded border border-dark-700 block w-fit">
                      {row.usage}
                    </span>
                  </td>
                  <td className="p-4 text-slate-400">{row.desc[lang]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-dark-700 bg-dark-950 text-xs text-slate-500 flex justify-between items-center">
          <span>Pro Tip: Always prefer <code>getByRole</code> over <code>getByTestId</code> for better accessibility testing.</span>
          <button onClick={onClose} className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-white rounded border border-dark-600">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};