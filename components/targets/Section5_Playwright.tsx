import React, { useState, useEffect } from 'react';

// 5.1 Basic Interaction
export const Cart: React.FC = () => {
  const [n, setN] = useState(0);
  return (
    <div className="p-3 bg-dark-800 border border-dark-700 rounded flex justify-between items-center">
      <button data-testid="add" onClick={() => setN(n + 1)} className="text-primary-400 border border-primary-400 px-3 py-1 rounded text-xs hover:bg-primary-900/20">Add</button>
      <span className="text-white font-bold text-sm">Cart: {n}</span>
    </div>
  );
};
export const CartFlowCode = `export const Cart = () => {
  const [n, setN] = useState(0);
  
  return (
    <div>
      <button data-testid="add" onClick={() => setN(n + 1)}>
        Add
      </button>
      <span>Cart: {n}</span>
    </div>
  );
};`;

// 5.2 Drag and Drop
export const KanbanBoard: React.FC = () => (
  <div className="flex gap-4 p-4 bg-dark-800 rounded border border-dark-700">
    <div className="w-24 h-24 bg-dark-900 border border-dark-600 rounded p-2">
      <div className="text-[10px] text-slate-500 mb-2 uppercase font-bold tracking-wider">TODO</div>
      <div draggable className="bg-primary-700 text-white p-2 rounded text-xs cursor-move shadow-sm">Task 1</div>
    </div>
    <div className="w-24 h-24 bg-dark-900 border border-dark-600 rounded p-2">
      <div className="text-[10px] text-slate-500 mb-2 uppercase font-bold tracking-wider">DONE</div>
    </div>
  </div>
);

// 5.3 Dialog Handling
export const DeleteAction: React.FC = () => {
  const [deleted, setDeleted] = useState(false);
  const handleDelete = () => {
    if (window.confirm('Sure?')) setDeleted(true);
  };
  return (
    <div className="p-4 bg-dark-800 rounded border border-dark-700 text-center">
      <button 
        onClick={handleDelete} 
        className={`px-3 py-1 rounded text-xs border ${deleted ? 'border-red-900 text-red-500 bg-red-900/10' : 'border-red-500 text-red-400 hover:bg-red-900/20'}`}
      >
        {deleted ? 'Deleted' : 'Delete Item'}
      </button>
    </div>
  );
};

// 5.4 External Link
export const ExternalLink: React.FC = () => (
  <div className="p-4 bg-dark-800 rounded border border-dark-700">
    <a 
      href="https://example.com" 
      target="_blank" 
      rel="noreferrer" 
      className="text-blue-400 underline hover:text-blue-300 text-sm"
    >
      External Resource
    </a>
  </div>
);

// 5.5 Network Mocking
export const UserListNetwork: React.FC = () => {
  const [users, setUsers] = useState<string[]>([]);
  useEffect(() => {
    fetch('/api/users')
      .then(r => r.json())
      .then(setUsers)
      .catch(() => {});
  }, []);
  
  return (
    <div className="p-4 bg-dark-800 rounded border border-dark-700 min-h-[100px]">
      <h3 className="text-xs font-bold text-slate-500 uppercase mb-2">User List</h3>
      <ul className="text-slate-300 list-disc pl-5 text-sm">
        {users.length ? users.map(u => <li key={u}>{u}</li>) : <li className="text-slate-500 italic">Loading...</li>}
      </ul>
    </div>
  );
};

// 5.6 Iframe Handling
export const PaymentIframe: React.FC = () => (
  <div className="border border-dark-700 p-4 bg-dark-800 rounded">
    <div className="text-xs text-slate-500 mb-2 font-bold uppercase">Checkout Page (Parent)</div>
    <iframe 
      title="Secure Payment"
      srcDoc={`
        <html>
          <body style="background: #1e293b; color: #e2e8f0; font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0;">
            <input data-testid="cc-input" placeholder="Credit Card Number" style="background: #0f172a; border: 1px solid #334155; color: white; padding: 8px; border-radius: 4px; width: 90%; font-size: 12px;" />
          </body>
        </html>
      `} 
      className="w-full h-24 border border-dark-600 rounded bg-dark-900" 
    />
  </div>
);

// 5.7 File Upload
export const AvatarUpload: React.FC = () => {
  const [file, setFile] = useState<string>('');
  return (
    <div className="p-4 bg-dark-800 rounded border border-dark-700">
      <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Upload Avatar</label>
      <input 
        type="file" 
        data-testid="file-input"
        onChange={e => setFile(e.target.files?.[0]?.name || '')} 
        className="block w-full text-xs text-slate-400
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-xs file:font-semibold
          file:bg-primary-900 file:text-primary-300
          hover:file:bg-primary-800"
      />
      {file && <div className="text-green-400 text-xs mt-3 flex items-center gap-2">✓ Selected: {file}</div>}
    </div>
  );
};

// 5.8 Storage/Auth
export const AuthGreeting: React.FC = () => {
  const token = localStorage.getItem('auth_token');
  
  if (!token) return (
    <div className="p-4 bg-red-900/10 border border-red-900/50 rounded text-center">
      <div className="text-red-400 font-bold text-sm">Please Log In</div>
    </div>
  );
  
  return (
    <div className="p-4 bg-green-900/10 border border-green-900/50 rounded text-center">
      <div className="text-green-400 font-bold text-sm">Welcome back, User!</div>
    </div>
  );
};

// 5.9 Mobile Viewport
export const ResponsiveMenu: React.FC = () => (
  <div className="p-4 bg-dark-800 border border-dark-700 rounded">
    <div className="hidden md:block text-blue-400 font-bold text-center border border-dashed border-blue-900 p-2 rounded bg-blue-900/10">
      Desktop Menu (Visible &gt; 768px)
    </div>
    <div className="md:hidden text-green-400 font-bold flex items-center justify-center gap-2 border border-dashed border-green-900 p-2 rounded bg-green-900/10">
      <span className="p-1 border border-green-700 rounded">☰</span> Mobile Menu (Visible &lt; 768px)
    </div>
  </div>
);

// 5.10 New Tab/Popup
export const PopupTrigger: React.FC = () => (
  <div className="p-4 bg-dark-800 rounded border border-dark-700 text-center">
    <button 
      onClick={() => window.open('/help', '_blank')}
      className="bg-primary-900 text-primary-200 px-4 py-2 rounded text-xs font-bold hover:bg-primary-800 transition-colors"
    >
      Open Help (New Tab)
    </button>
  </div>
);