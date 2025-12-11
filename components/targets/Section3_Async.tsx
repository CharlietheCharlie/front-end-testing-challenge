import React, { useState, useEffect } from 'react';

// 3.1 Fetch List
export const SimpleList: React.FC = () => {
  const [items, setItems] = useState<string[]>([]);
  useEffect(() => {
    fetch('/api/items').then(r => r.json()).then(setItems);
  }, []);
  return <ul className="list-disc pl-5 text-slate-300">{items.map(i => <li key={i}>{i}</li>)}</ul>;
};
export const SimpleListCode = `useEffect(() => {
  fetch('/api/items').then(r => r.json()).then(setItems);
}, []);`;

// 3.2 Retry Logic
export const RetryButton: React.FC = () => {
  const [msg, setMsg] = useState('');
  const load = async () => {
    try {
      await fetch('/api/data');
      setMsg('Success');
    } catch {
      setMsg('Error');
    }
  };
  return (
    <div>
      <div className="text-white mb-2">{msg}</div>
      <button onClick={load} className="bg-primary-700 px-3 py-1 rounded text-white">Load</button>
    </div>
  );
};
export const RetryButtonCode = `const load = async () => {
  try {
    await fetch('/api/data');
    setMsg('Success');
  } catch {
    setMsg('Error');
  }
};`;

// 3.3 Loading State (Skeleton)
export const DashboardWidget: React.FC = () => {
  const [data, setData] = useState<string | null>(null);
  useEffect(() => {
    setTimeout(() => setData('Sales: $500'), 1500);
  }, []);
  
  if (!data) return <div data-testid="skeleton" className="animate-pulse h-6 w-32 bg-dark-700 rounded"></div>;
  return <div className="text-green-400 font-bold">{data}</div>;
};
export const DashboardWidgetCode = `if (!data) return <div data-testid="skeleton" ... />;
return <div>{data}</div>;`;

// 3.4 Empty State
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
export const SearchResultsCode = `{searched && results.length === 0 && <div>No results found</div>}`;

// 3.5 API Error Toast
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
    <div>
      <button onClick={sub} className="bg-primary-600 text-white px-3 py-1 rounded">Subscribe</button>
      {error && <div role="alert" className="mt-2 text-red-400 text-sm border border-red-900 bg-red-900/20 p-2 rounded">{error}</div>}
    </div>
  );
};
export const NewsletterCode = `{error && <div role="alert">{error}</div>}`;
