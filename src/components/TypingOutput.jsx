import { useEffect, useState } from 'react';

export default function TypingOutput({ text, onComplete }) {
      if (typeof text !== 'string') {
    return <div className="text-green-400 whitespace-pre-wrap">{text}</div>;
  }
  const [displayedText, setDisplayedText] = useState('');
  const lines = text.split('\n');

  useEffect(() => {
    let charIndex = 0;
    let lineIndex = 0;
    let currentLine = lines[0] || '';
    let interval = setInterval(() => {
      if (lineIndex < lines.length) {
        const nextChar = currentLine[charIndex];
        setDisplayedText(prev => {
          const updated = prev + (nextChar || '') + (nextChar === undefined ? '\n' : '');
          return updated;
        });
        charIndex++;

        if (charIndex > currentLine.length) {
          lineIndex++;
          currentLine = lines[lineIndex] || '';
          charIndex = 0;
        }
      } else {
        clearInterval(interval);
        onComplete && onComplete();
      }
    }, 10); // typing speed

    return () => clearInterval(interval);
  }, [text]);

  return (
    <pre className="whitespace-pre-wrap text-green-400">{displayedText}</pre>
  );
}
