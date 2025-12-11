import React, { useState, useEffect } from 'react';

// 7.1 Complex Form (Select & Validation)
export const RegistrationForm: React.FC = () => {
  const [role, setRole] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-dark-800 border border-dark-700 rounded flex flex-col gap-3">
      <div>
        <label htmlFor="role-select" className="block text-xs font-bold text-slate-400 mb-1">Select Role</label>
        <select 
          id="role-select" 
          required 
          value={role} 
          onChange={e => setRole(e.target.value)}
          className="w-full bg-dark-900 border border-dark-600 text-white p-2 rounded text-sm"
        >
          <option value="">-- Choose --</option>
          <option value="dev">Developer</option>
          <option value="design">Designer</option>
        </select>
      </div>
      <button className="bg-primary-600 text-white py-2 rounded text-xs font-bold hover:bg-primary-500">
        Register
      </button>
      {submitted && <div className="text-green-400 text-xs">Registered as {role}</div>}
    </form>
  );
};
export const RegistrationFormCode = `export const RegistrationForm = () => {
  const [role, setRole] = useState('');
  
  return (
    <form onSubmit={...}>
      <label htmlFor="role-select">Select Role</label>
      <select 
        id="role-select" 
        required 
        value={role} 
        onChange={e => setRole(e.target.value)}
      >
        <option value="">-- Choose --</option>
        <option value="dev">Developer</option>
        <option value="design">Designer</option>
      </select>
      <button>Register</button>
    </form>
  );
};`;

// 7.2 Interval Polling (setInterval)
export const LiveStatus: React.FC = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="p-4 bg-dark-800 border border-dark-700 rounded flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span className="text-slate-400 text-xs uppercase font-bold">Live Updates</span>
      </div>
      <span className="text-2xl font-mono text-white">{count}</span>
    </div>
  );
};
export const LiveStatusCode = `export const LiveStatus = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Polls every 1000ms
    const id = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
    
    // Cleanup is crucial
    return () => clearInterval(id);
  }, []);

  return <div>{count}</div>;
};`;

// 7.3 Clipboard API
export const CopyLink: React.FC = () => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("https://testmaster.dev");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  return (
    <div className="p-4 bg-dark-800 border border-dark-700 rounded flex gap-2">
      <input readOnly value="https://testmaster.dev" className="flex-1 bg-dark-900 border border-dark-600 rounded px-2 text-xs text-slate-400" />
      <button 
        onClick={handleCopy}
        className="bg-dark-700 hover:bg-dark-600 text-white px-3 py-1 rounded text-xs border border-dark-600"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
};
export const CopyLinkCode = `export const CopyLink = () => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = async () => {
    await navigator.clipboard.writeText("https://testmaster.dev");
    setCopied(true);
  };

  return (
    <button onClick={handleCopy}>
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
};`;