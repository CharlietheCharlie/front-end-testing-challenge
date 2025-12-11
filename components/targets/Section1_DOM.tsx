import React, { useState } from 'react';

// 1.1 Login (Standard)
export const LoginForm: React.FC = () => (
  <form className="p-4 bg-dark-800 rounded border border-dark-700 w-full max-w-sm" onSubmit={e => e.preventDefault()}>
    <h3 className="text-lg font-bold mb-4 text-white">Login</h3>
    <div className="mb-3">
      <label htmlFor="email" className="block text-sm mb-1 text-slate-400">Email</label>
      <input id="email" type="email" className="w-full p-2 rounded bg-dark-900 border border-dark-700 text-white" />
    </div>
    <button className="bg-primary-600 text-white px-4 py-2 rounded w-full hover:bg-primary-500">Sign In</button>
  </form>
);
export const LoginFormCode = `export const LoginForm = () => (
  <form onSubmit={e => e.preventDefault()}>
    <h3>Login</h3>
    <label htmlFor="email">Email</label>
    <input id="email" type="email" />
    <button>Sign In</button>
  </form>
);`;

// 1.2 Secret Message (QueryBy)
export const SecretMessage: React.FC = () => {
  const [show, setShow] = useState(false);
  return (
    <div className="p-4 bg-dark-800 rounded border border-dark-700">
      <button onClick={() => setShow(!show)} className="text-primary-400 mb-2 border border-primary-400 px-2 py-1 rounded text-xs">
        {show ? 'Hide' : 'Show'}
      </button>
      {show && <div data-testid="secret">The eagle has landed.</div>}
    </div>
  );
};
export const SecretMessageCode = `export const SecretMessage = () => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <button onClick={() => setShow(!show)}>{show ? 'Hide' : 'Show'}</button>
      {show && <div data-testid="secret">The eagle has landed.</div>}
    </div>
  );
};`;

// 1.3 Semantic List (ByRole)
export const UserRoleList: React.FC = () => (
  <div className="p-4 bg-dark-800 rounded border border-dark-700">
    <h3 className="font-bold text-white mb-2">Team Members</h3>
    <ul className="list-disc pl-5 text-slate-300">
      <li>Admin</li>
      <li>Developer</li>
      <li>Designer</li>
    </ul>
  </div>
);
export const UserRoleListCode = `export const UserRoleList = () => (
  <div>
    <h3>Team Members</h3>
    <ul>
      <li>Admin</li>
      <li>Developer</li>
      <li>Designer</li>
    </ul>
  </div>
);`;

// 1.4 Dynamic Classes (toHaveClass)
export const TabSwitcher: React.FC = () => {
  const [active, setActive] = useState('home');
  return (
    <div className="flex gap-2 p-2 bg-dark-800 rounded">
      {['home', 'settings'].map(tab => (
        <button
          key={tab}
          onClick={() => setActive(tab)}
          className={`px-3 py-1 rounded capitalize ${active === tab ? 'bg-primary-600 text-white' : 'text-slate-400'}`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};
export const TabSwitcherCode = `export const TabSwitcher = () => {
  const [active, setActive] = useState('home');
  return (
    <div>
      <button 
        className={active === 'home' ? 'active' : ''} 
        onClick={() => setActive('home')}>
        Home
      </button>
      {/* ... */}
    </div>
  );
};`;

// 1.5 Scoping (Within)
export const DoubleForm: React.FC = () => (
  <div className="space-y-4">
    <section aria-label="Shipping" className="p-3 bg-dark-800 border border-dark-700 rounded">
      <h4 className="text-xs uppercase text-slate-500 mb-2">Shipping</h4>
      <input placeholder="Name" className="w-full p-1 bg-dark-900 border border-dark-700 rounded" />
    </section>
    <section aria-label="Billing" className="p-3 bg-dark-800 border border-dark-700 rounded">
      <h4 className="text-xs uppercase text-slate-500 mb-2">Billing</h4>
      <input placeholder="Name" className="w-full p-1 bg-dark-900 border border-dark-700 rounded" />
    </section>
  </div>
);
export const DoubleFormCode = `export const DoubleForm = () => (
  <div>
    <section aria-label="Shipping">
      <input placeholder="Name" />
    </section>
    <section aria-label="Billing">
      <input placeholder="Name" />
    </section>
  </div>
);`;
