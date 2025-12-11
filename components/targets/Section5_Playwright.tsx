import React, { useState } from 'react';

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
