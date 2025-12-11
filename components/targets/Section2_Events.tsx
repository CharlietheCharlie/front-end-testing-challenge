import React, { useState } from 'react';

// 2.1 Text Limiter
export const TweetComposer: React.FC = () => {
  const [text, setText] = useState('');
  return (
    <div className="p-3 bg-dark-800 border border-dark-700 rounded">
      <textarea 
        value={text} 
        onChange={e => setText(e.target.value)} 
        className="w-full bg-dark-900 text-white p-2 rounded border border-dark-700" 
      />
      <div className="text-right text-xs mt-1 text-slate-400">{text.length}/20</div>
      <button disabled={!text || text.length > 20} className="mt-2 bg-primary-600 disabled:opacity-50 text-white px-3 py-1 rounded text-xs">Tweet</button>
    </div>
  );
};
export const TweetComposerCode = `// Simplified logic
const [text, setText] = useState('');
return (
  <>
    <textarea value={text} onChange={e => setText(e.target.value)} />
    <div>{text.length}/20</div>
    <button disabled={!text || text.length > 20}>Tweet</button>
  </>
);`;

// 2.2 Payment (Double Click)
export const PaymentButton: React.FC = () => {
  const [status, setStatus] = useState('Pay');
  const handleClick = () => {
    if (status === 'Processing...') return;
    setStatus('Processing...');
    setTimeout(() => setStatus('Done'), 1000);
  };
  return <button onClick={handleClick} className="bg-green-600 text-white px-4 py-2 rounded">{status}</button>;
};
export const PaymentButtonCode = `const handleClick = () => {
  if (status === 'Processing...') return;
  setStatus('Processing...');
  setTimeout(() => setStatus('Done'), 1000);
};`;

// 2.3 Keyboard Enter
export const TagInput: React.FC = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [val, setVal] = useState('');
  return (
    <div className="p-3 bg-dark-800 border border-dark-700 rounded">
      <div className="flex gap-1 mb-2">{tags.map(t => <span key={t} className="bg-primary-900 text-primary-200 px-1 rounded text-xs">#{t}</span>)}</div>
      <input 
        value={val} 
        onChange={e => setVal(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter' && val) {
            setTags([...tags, val]);
            setVal('');
          }
        }}
        placeholder="Type tag & hit Enter"
        className="w-full p-2 bg-dark-900 border border-dark-700 rounded text-white"
      />
    </div>
  );
};
export const TagInputCode = `<input 
  onKeyDown={e => {
    if (e.key === 'Enter' && val) addTag(val);
  }} 
/>`;

// 2.4 Hover Tooltip
export const TooltipDemo: React.FC = () => {
  const [show, setShow] = useState(false);
  return (
    <div className="relative inline-block mt-4 ml-4">
      <span 
        onMouseEnter={() => setShow(true)} 
        onMouseLeave={() => setShow(false)}
        className="cursor-help text-slate-300 border-b border-dashed border-slate-500"
      >
        Hover Me
      </span>
      {show && <div role="tooltip" className="absolute bottom-full left-0 mb-2 p-2 bg-black text-white text-xs rounded">Help info</div>}
    </div>
  );
};
export const TooltipDemoCode = `<span 
  onMouseEnter={() => setShow(true)} 
  onMouseLeave={() => setShow(false)}
>
  Hover Me
</span>
{show && <div role="tooltip">Help info</div>}`;

// 2.5 Checkbox Group
export const PreferenceForm: React.FC = () => {
  const [prefs, setPrefs] = useState({ email: false, sms: false });
  return (
    <div className="p-3 bg-dark-800 border border-dark-700 rounded flex flex-col gap-2">
      <label className="flex items-center gap-2 text-slate-300">
        <input type="checkbox" checked={prefs.email} onChange={e => setPrefs({...prefs, email: e.target.checked})} />
        Email
      </label>
      <label className="flex items-center gap-2 text-slate-300">
        <input type="checkbox" checked={prefs.sms} onChange={e => setPrefs({...prefs, sms: e.target.checked})} />
        SMS
      </label>
      <div className="text-xs text-slate-500 mt-2">Selected: {Object.keys(prefs).filter((k: any) => prefs[k as keyof typeof prefs]).join(', ')}</div>
    </div>
  );
};
export const PreferenceFormCode = `// Standard checkbox state
<input type="checkbox" onChange={...} />`;
