import React, { useState, useEffect } from 'react';

// 5.1 Nav (Login) - Reuse Login
// 5.2 Cart
export const Cart: React.FC = () => {
  const [n, setN] = useState(0);
  return (
    <div className="p-3 bg-dark-800 border border-dark-700 rounded flex justify-between">
      <button data-testid="add" onClick={() => setN(n + 1)} className="text-primary-400 border border-primary-400 px-2 rounded text-xs">Add</button>
      <span className="text-white font-bold">Cart: {n}</span>
    </div>
  );
};
export const CartFlowCode = `export const Cart = () => {
  const [n, setN] = useState(0);
  return (
    <div>
      <button data-testid="add" onClick={() => setN(n + 1)}>Add</button>
      <span>Cart: {n}</span>
    </div>
  );
};`;

// 5.3 Drag Drop (Simulated UI)
export const KanbanBoard: React.FC = () => (
  <div className="flex gap-4">
    <div className="w-24 h-24 bg-dark-800 border border-dark-700 rounded p-2">
      <div className="text-xs text-slate-500 mb-2">TODO</div>
      <div draggable className="bg-primary-900 p-1 rounded text-xs cursor-move">Task 1</div>
    </div>
    <div className="w-24 h-24 bg-dark-800 border border-dark-700 rounded p-2">
      <div className="text-xs text-slate-500 mb-2">DONE</div>
    </div>
  </div>
);

// 5.4 Dialogs
export const DeleteAction: React.FC = () => {
  const [deleted, setDeleted] = useState(false);
  const handleDelete = () => {
    if (window.confirm('Sure?')) setDeleted(true);
  };
  return (
    <button onClick={handleDelete} className="text-red-400 border border-red-900 px-2 py-1 rounded text-xs">
      {deleted ? 'Deleted' : 'Delete'}
    </button>
  );
};

// 5.5 External Link
export const ExternalLink: React.FC = () => (
  <a href="https://example.com" target="_blank" rel="noreferrer" className="text-blue-400 underline">External</a>
);

// 5.5 Network Mocking
export const UserListNetwork: React.FC = () => {
  const [users, setUsers] = useState<string[]>([]);
  useEffect(() => {
    fetch('/api/users').then(r => r.json()).then(setUsers).catch(() => {});
  }, []);
  return (
    <ul className="text-slate-300 list-disc pl-5">
      {users.length ? users.map(u => <li key={u}>{u}</li>) : <li>Loading...</li>}
    </ul>
  );
};

// 5.6 Iframe Handling
export const PaymentIframe: React.FC = () => (
  <div className="border border-dark-700 p-2 bg-white/5 rounded">
    <div className="text-xs text-slate-500 mb-1">Main Page</div>
    <iframe 
      title="Secure Payment"
      srcDoc={`
        <html>
          <body style="background: #111; color: white; font-family: sans-serif;">
            <input data-testid="cc-input" placeholder="Card Number" style="background: #333; border: 1px solid #555; color: white; padding: 4px;" />
          </body>
        </html>
      `} 
      className="w-full h-20 border-0" 
    />
  </div>
);

// 5.7 File Upload
export const AvatarUpload: React.FC = () => {
  const [file, setFile] = useState<string>('');
  return (
    <div className="p-3">
      <input 
        type="file" 
        data-testid="file-input"
        onChange={e => setFile(e.target.files?.[0]?.name || '')} 
        className="text-xs text-slate-400"
      />
      {file && <div className="text-green-400 text-xs mt-2">Selected: {file}</div>}
    </div>
  );
};

// 5.8 Storage/Auth
export const AuthGreeting: React.FC = () => {
  const token = localStorage.getItem('auth_token');
  if (!token) return <div className="text-red-400">Please Log In</div>;
  return <div className="text-green-400">Welcome back, User!</div>;
};

// 5.9 Mobile Viewport
export const ResponsiveMenu: React.FC = () => (
  <div className="p-2 border border-dark-700 rounded">
    <div className="hidden md:block text-blue-400">Desktop Menu</div>
    <div className="md:hidden text-green-400 flex items-center gap-2">
      <span className="p-1 border rounded">☰</span> Mobile Menu
    </div>
  </div>
);

// 5.10 New Tab/Popup
export const PopupTrigger: React.FC = () => (
  <button 
    onClick={() => window.open('/help', '_blank')}
    className="bg-primary-900 text-primary-200 px-3 py-1 rounded text-xs"
  >
    Open Help
  </button>
);
