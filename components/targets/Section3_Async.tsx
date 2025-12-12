import React, { useState, useEffect } from 'react';

// 3.1 Mock Functions (Callbacks)
export const UserForm: React.FC<{ onSubmit: (data: { name: string }) => void }> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  return (
    <div className="p-4 bg-dark-800 border border-dark-700 rounded">
      <input 
        aria-label="Name"
        value={name} 
        onChange={e => setName(e.target.value)}
        className="block w-full mb-2 p-2 bg-dark-900 border border-dark-700 rounded text-white"
        placeholder="Enter name"
      />
      <button 
        onClick={() => onSubmit({ name })}
        className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-500"
      >
        Save
      </button>
    </div>
  );
};
export const UserFormCode = `export const UserForm = ({ onSubmit }) => {
  const [name, setName] = useState('');

  return (
    <div>
      <input 
        aria-label="Name"
        value={name} 
        onChange={e => setName(e.target.value)}
      />
      <button onClick={() => onSubmit({ name })}>
        Save
      </button>
    </div>
  );
};`;

// 3.2 Fetch List
export const SimpleList: React.FC = () => {
  const [items, setItems] = useState<string[]>([]);
  useEffect(() => {
    fetch('/api/items')
      .then(r => r.json())
      .then(setItems)
      .catch(console.error);
  }, []);
  return <ul className="list-disc pl-5 text-slate-300">{items.map(i => <li key={i}>{i}</li>)}</ul>;
};
export const SimpleListCode = `export const SimpleList = () => {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    fetch('/api/items')
      .then(r => r.json())
      .then(setItems);
  }, []);

  return (
    <ul>
      {items.map(i => <li key={i}>{i}</li>)}
    </ul>
  );
};`;

// 3.3 Retry Logic
export const RetryButton: React.FC = () => {
  const [msg, setMsg] = useState('');
  const load = async () => {
    try {
      await fetch('/api/data');
      setMsg('Success');
    } catch {
      try {
        await fetch('/api/data');
        setMsg('Success');
      } catch {
        setMsg('Error');
      }
    }
  };
  return (
    <div className="p-3 bg-dark-800 border border-dark-700 rounded">
      <div className="text-white mb-2 h-6">{msg}</div>
      <button onClick={load} className="bg-primary-700 px-3 py-1 rounded text-white text-sm">Load</button>
    </div>
  );
};
export const RetryButtonCode = `export const RetryButton = () => {
  const [msg, setMsg] = useState('');

  const load = async () => {
    try {
      await fetch('/api/data');
      setMsg('Success');
    } catch {
      try {
        await fetch('/api/data');
        setMsg('Success');
      } catch {
        setMsg('Error');
      }
    }
  };

  return (
    <div>
      <div>{msg}</div>
      <button onClick={load}>Load</button>
    </div>
  );
};`;

// 3.4 Loading State (Skeleton)
export const DashboardWidget: React.FC = () => {
  const [data, setData] = useState<string | null>(null);
  useEffect(() => {
    setTimeout(() => setData('Sales: $500'), 1500);
  }, []);
  
  if (!data) return <div data-testid="skeleton" className="animate-pulse h-6 w-32 bg-dark-700 rounded"></div>;
  return <div className="text-green-400 font-bold">{data}</div>;
};
export const DashboardWidgetCode = `export const DashboardWidget = () => {
  const [data, setData] = useState<string | null>(null);

  useEffect(() => {
    setTimeout(() => setData('Sales: $500'), 1500);
  }, []);
  
  if (!data) return <div data-testid="skeleton" />;
  return <div>{data}</div>;
};`;

// 3.5 Empty State
export const SearchResults: React.FC = () => {
  const [results, setResults] = useState<string[]>([]);
  const [searched, setSearched] = useState(false);
  
  const search = async () => {
    setSearched(true);
    setResults([]); // Mock empty
  };

  return (
    <div className="p-3 bg-dark-800 border border-dark-700 rounded">
      <button onClick={search} className="bg-primary-600 text-white px-3 py-1 rounded text-xs mb-2">Search</button>
      {searched && results.length === 0 && <div className="text-slate-500 italic">No results found</div>}
    </div>
  );
};
export const SearchResultsCode = `export const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  
  const search = async () => {
    setSearched(true);
    setResults([]); 
  };

  return (
    <div>
      <button onClick={search}>Search</button>
      {searched && results.length === 0 && (
        <div>No results found</div>
      )}
    </div>
  );
};`;

// 3.6 API Error Toast
export const Newsletter: React.FC = () => {
  const [error, setError] = useState('');
  const sub = async () => {
    try {
      await fetch('/api/sub', { method: 'POST' });
    } catch {
      setError('Server Error 500');
    }
  };
  return (
    <div className="p-3 bg-dark-800 border border-dark-700 rounded">
      <button onClick={sub} className="bg-primary-600 text-white px-3 py-1 rounded text-xs">Subscribe</button>
      {error && <div role="alert" className="mt-2 text-red-400 text-sm border border-red-900 bg-red-900/20 p-2 rounded flex items-center gap-2">⚠️ {error}</div>}
    </div>
  );
};
export const NewsletterCode = `export const Newsletter = () => {
  const [error, setError] = useState('');

  const sub = async () => {
    try {
      await fetch('/api/sub', { method: 'POST' });
    } catch {
      setError('Server Error 500');
    }
  };

  return (
    <div>
      <button onClick={sub}>Subscribe</button>
      {error && <div role="alert">⚠️ {error}</div>}
    </div>
  );
};`;