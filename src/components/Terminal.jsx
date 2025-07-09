import { useState, useRef, useEffect } from 'react';
import CommandRouter from './CommandRouter';
import TypingOutput from './TypingOutput';
const asciiHeader = `
____ ____ ____ ____ ____ _  _ 
[__  |    | __ [__  [__  |_/  
___] |___ |__] ___] ___] | |_ 
                            
WELCOME TO SCGSSK PORTFOLIO
`;

export default function Terminal() {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState('');
  const inputRef = useRef(null);
  const [historyPos, setHistoryPos] = useState(-1);

  useEffect(() => {
    inputRef.current?.focus();
  }, [history]);


  const handleCommand = (e) => {
  if (e.key === 'Enter') {
    if (input.trim() === '') return;

    const output = CommandRouter(input);
    setHistory(prev => [...prev, `> ${input}`, output]);
    setInput('');
    setHistoryPos(-1);
  }

  // Navigate up in command history
  if (e.key === 'ArrowUp') {
    const prevCmds = history.filter(h => h.startsWith('> ')).map(h => h.slice(2));
    if (prevCmds.length === 0) return;
    const newPos = Math.min(prevCmds.length - 1, historyPos + 1);
    setInput(prevCmds[prevCmds.length - 1 - newPos]);
    setHistoryPos(newPos);
  }

  // Navigate down in command history
  if (e.key === 'ArrowDown') {
    const prevCmds = history.filter(h => h.startsWith('> ')).map(h => h.slice(2));
    if (prevCmds.length === 0) return;
    const newPos = Math.max(-1, historyPos - 1);
    setInput(newPos === -1 ? '' : prevCmds[prevCmds.length - 1 - newPos]);
    setHistoryPos(newPos);
  }
};

  return (
    <div className="bg-black text-sm md:text-base text-green-400 font-mono min-h-screen w-full p-4 overflow-y-auto relative">

      {/* ASCII Banner at the top */}
      <pre className="text-green-400 text-xs mb-4 whitespace-pre-wrap leading-snug">
        {asciiHeader}
      </pre>

      {/* Command history */}
    {history.map((line, idx) => {
  const isLast = idx === history.length - 1;
  const isOutput = typeof line !== 'string' || (typeof line === 'string' && !line.startsWith('>'));

  if (isOutput && isLast) {
    return <TypingOutput key={idx} text={line} />;
  }

  return (
    <div key={idx} className="whitespace-pre-wrap text-green-400">
      {line}
    </div>
  );
})}



      {/* Input area */}
      <div className="flex items-center mt-4">
  <span className="text-green-400 mr-2">{'>'}</span>
  <input
    ref={inputRef}
    type="text"
    value={input}
    onChange={e => setInput(e.target.value)}
    onKeyDown={handleCommand}
    className="bg-transparent outline-none text-green-300 placeholder:text-green-600 caret-green-400 w-full"
    placeholder="type a command..."
  />
</div>


      <div className="text-xs text-green-600 mt-4">Type 'help' to see available commands</div>
    </div>
  );
}
