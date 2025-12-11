import React, { createContext, useContext, useState, useReducer } from 'react';
import { createPortal } from 'react-dom';

// 6.1 Context Provider
const ThemeContext = createContext('light');

export const ThemeDisplay: React.FC = () => {
  const theme = useContext(ThemeContext);
  return (
    <div className={`p-4 border rounded transition-colors ${theme === 'dark' ? 'bg-black text-white border-slate-600' : 'bg-white text-black border-slate-200'}`}>
      <span className="font-bold uppercase text-xs">Current Theme:</span> {theme}
    </div>
  );
};
export const ThemeDisplayCode = `const ThemeContext = createContext('light');

export const ThemeDisplay = () => {
  const theme = useContext(ThemeContext);
  
  return (
    <div className={theme === 'dark' ? 'bg-black' : 'bg-white'}>
      Current Theme: {theme}
    </div>
  );
};`;

// 6.2 Redux/Store Simulation
const initialState = { count: 0 };
function reducer(state: any, action: any) {
  if (action.type === 'inc') return { count: state.count + 1 };
  return state;
}

export const ReduxCounter: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div className="p-4 bg-dark-800 border border-dark-700 rounded flex gap-4 items-center">
      <div className="text-slate-400 text-xs uppercase font-bold">Store Value</div>
      <span data-testid="count-value" className="text-2xl font-mono text-white">{state.count}</span>
      <button onClick={() => dispatch({ type: 'inc' })} className="ml-auto px-3 py-1 bg-primary-700 hover:bg-primary-600 text-white rounded text-sm font-bold">+</button>
    </div>
  );
};
export const ReduxCounterCode = `const initialState = { count: 0 };

function reducer(state, action) {
  if (action.type === 'inc') return { count: state.count + 1 };
  return state;
}

export const ReduxCounter = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <div>
      <span data-testid="count-value">{state.count}</span>
      <button onClick={() => dispatch({ type: 'inc' })}>+</button>
    </div>
  );
};`;

// 6.3 Portal (Modal)
export const ModalComponent: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="p-4 bg-dark-800 border border-dark-700 rounded">
      <button onClick={() => setOpen(true)} className="bg-slate-700 text-white text-xs px-3 py-2 rounded hover:bg-slate-600">Open Modal</button>
      {open && createPortal(
        <div role="dialog" className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-dark-900 p-6 rounded-lg border border-dark-600 shadow-2xl max-w-sm w-full">
            <h3 className="text-lg font-bold text-white mb-2">Terms of Service</h3>
            <p className="text-slate-400 text-sm mb-4">You agree to test code properly.</p>
            <button onClick={() => setOpen(false)} className="w-full bg-primary-600 text-white py-2 rounded hover:bg-primary-500">Close</button>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};
export const ModalComponentCode = `export const ModalComponent = () => {
  const [open, setOpen] = useState(false);
  
  return (
    <div>
      <button onClick={() => setOpen(true)}>Open Modal</button>
      
      {open && createPortal(
        <div role="dialog">
          <h3>Terms of Service</h3>
          <button onClick={() => setOpen(false)}>Close</button>
        </div>,
        document.body
      )}
    </div>
  );
};`;

// 6.4 Error Boundary
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) return (
      <div role="alert" className="p-4 bg-red-950 border border-red-900 text-red-400 rounded">
        <h4 className="font-bold">Something went wrong</h4>
      </div>
    );
    return this.props.children;
  }
}
export const Bomb: React.FC<{ shouldThrow?: boolean }> = ({ shouldThrow }) => {
  if (shouldThrow) throw new Error('Boom');
  return <div className="text-green-400">System Safe</div>;
};
export const ErrorBoundaryDemo: React.FC = () => (
  <div className="p-4 bg-dark-800 border border-dark-700 rounded">
    <ErrorBoundary>
      <Bomb shouldThrow={false} />
    </ErrorBoundary>
  </div>
);
export const ErrorBoundaryCode = `class ErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  
  render() {
    if (this.state.hasError) {
      return <div role="alert">Something went wrong</div>;
    }
    return this.props.children;
  }
}

export const Bomb = ({ shouldThrow }) => {
  if (shouldThrow) throw new Error('Boom');
  return <div>System Safe</div>;
};`;

// 6.5 Custom Hook Integration
export const useWindowWidth = () => {
  const [width] = useState(1024);
  // mock implementation
  return width;
};
export const ResponsiveComponent: React.FC = () => {
  const width = useWindowWidth();
  return (
    <div className="p-4 bg-dark-800 border border-dark-700 rounded text-center">
      <span className={`font-bold px-3 py-1 rounded ${width > 768 ? 'bg-blue-900/30 text-blue-400' : 'bg-purple-900/30 text-purple-400'}`}>
        {width > 768 ? 'Desktop View' : 'Mobile View'}
      </span>
    </div>
  );
};
export const ResponsiveComponentCode = `// hooks.ts
export const useWindowWidth = () => {
  const [width, setWidth] = useState(1024);
  return width;
};

// Component.tsx
export const ResponsiveComponent = () => {
  const width = useWindowWidth();
  
  return (
    <div>
      {width > 768 ? 'Desktop View' : 'Mobile View'}
    </div>
  );
};`;