import { useEffect, useState } from 'react';

export default function BootScreen() {
  const bootLines = [
    "Initializing Terminal Interface...",
    "Loading ASCII modules...",
    "Establishing neural handshake...",
    "sk-terminal v1.0 Ready.",
  ];

  const [displayedLines, setDisplayedLines] = useState([]);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < bootLines.length) {
        setDisplayedLines((prev) => [...prev, bootLines[i++]]);
      } else {
        clearInterval(interval);
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full w-full flex flex-col justify-center p-6 text-sm leading-tight text-green-400 font-mono">
      {displayedLines.map((line, idx) => (
        <p key={idx}>{line}</p>
      ))}
    </div>
  );
}
