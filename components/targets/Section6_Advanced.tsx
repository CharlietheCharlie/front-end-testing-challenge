import React, { createContext, useContext, useState, useReducer } from 'react';
import { createPortal } from 'react-dom';

// 6.1 Context Provider
const ThemeContext = createContext('light');
export const ThemeDisplay: React.FC = () => {
  const theme = useContext(ThemeContext);
  return <div className="p-2 border rounded">Current Theme: {theme}</div>;
};
export const ThemeDisplayCode = `const theme = useContext(ThemeContext);
return <div>Current Theme: {theme}</div>;`;

// 6.2 Redux/Store Simulation
const initialState = { count: 0 };
function reducer(state: any, action: any) {
  if (action.type === 'inc') return { count: state.count + 1 };
  return state;
}
export const ReduxCounter: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div className="flex gap-2 items-center">
      <span data-testid="count-value">{state.count}</span>
      <button onClick={() => dispatch({ type: 'inc' })} className="px-2 bg-primary-700 rounded text-xs">+</button>
    </div>
  );
};
export const ReduxCounterCode = `const [state, dispatch] = useReducer(reducer, initialState);
// Tests should likely render with a custom Store wrapper`;

// 6.3 Portal (Modal)
export const ModalComponent: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setOpen(true)} className="text-xs border px-2 rounded">Open Modal</button>
      {open && createPortal(
        <div role="dialog" className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-dark-800 p-4 rounded border border-dark-700">
            <h3>Terms</h3>
            <button onClick={() => setOpen(false)}>Close</button>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};
export const ModalComponentCode = `{open && createPortal(
  <div role="dialog">...</div>,
  document.body
)}`;

// 6.4 Error Boundary
class ErrorBoundary extends React.Component<any, any> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) return <div role="alert">Something went wrong</div>;
    return this.props.children;
  }
}
export const Bomb: React.FC<{ shouldThrow?: boolean }> = ({ shouldThrow }) => {
  if (shouldThrow) throw new Error('Boom');
  return <div>Safe</div>;
};
export const ErrorBoundaryDemo: React.FC = () => (
  <ErrorBoundary>
    <Bomb shouldThrow={false} />
  </ErrorBoundary>
);
export const ErrorBoundaryCode = `// Test that ErrorBoundary catches the error
<ErrorBoundary>
  <Bomb shouldThrow={true} />
</ErrorBoundary>`;

// 6.5 Custom Hook Integration
export const useWindowWidth = () => {
  const [width] = useState(1024);
  // mock implementation
  return width;
};
export const ResponsiveComponent: React.FC = () => {
  const width = useWindowWidth();
  return <span>{width > 768 ? 'Desktop' : 'Mobile'}</span>;
};
export const ResponsiveComponentCode = `const width = useWindowWidth();
return <span>{width > 768 ? 'Desktop' : 'Mobile'}</span>;`;