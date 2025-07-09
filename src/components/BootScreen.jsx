import { useEffect, useState, useRef } from "react";

export default function BootScreen({ onComplete }) {
  const bootLines = [
    "[    0.000001 ] Booting sk-linux...",
    "[    0.000293 ] Initializing kernel...",
    "[    0.001028 ] Detected CPU: Intel(R) Core(TM) i9-13900K",
    "[    0.001602 ] Allocating 2048MB RAM",
    "[    0.002140 ] Enabling hypervisor support...",
    "[    0.002621 ] Initializing system buses",
    "[    0.003301 ] Loading SCGSSK Terminal Environment...",
    "[    0.004192 ] Mounting root filesystem...",
    "[    0.004933 ] Starting boot daemons...",
    "[    0.005524 ] Establishing neural interface...",
    "[    0.006218 ] Network stack initialized",
    "[    0.007400 ] Audio driver loaded: SSK-Audio v1.2",
    "[    0.008201 ] Display driver loaded: MatrixView FX",
    "[    0.009420 ] User shell: SCG-Terminal v1.0",
    "[    0.010050 ] Login successful: sk",
    "[    0.011000 ] System Ready. Welcome, sk.",
  ];

  const [displayedLines, setDisplayedLines] = useState([]);
  const logRef = useRef(null);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < bootLines.length) {
        setDisplayedLines((prev) => [...prev, bootLines[i++]]);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 800);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

useEffect(() => {
  const timeout = setTimeout(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, 0); // allow DOM to paint
  return () => clearTimeout(timeout);
}, [displayedLines]);


  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black font-mono text-green-400 text-sm md:text-base">
      {/* Matrix Background */}
      <div className="fixed inset-0 z-0 bg-[url('/matrix.gif')] bg-cover bg-center opacity-10 blur-md animate-matrix pointer-events-none" />

      {/* CRT Scanlines */}
      <div className="fixed inset-0 z-10 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[length:100%_3px] pointer-events-none" />

      {/* Boot Log Fullscreen */}
      <div
        ref={logRef}
        className="relative z-20 h-full w-full p-4 overflow-y-auto"
      >
        {displayedLines.map((line, idx) => (
          <div
            key={idx}
            className="animate-glow border-l-2 border-green-500 pl-3 mb-1"
          >
            {line}
          </div>
        ))}
        <span className="text-green-300 animate-blink">▌</span>
      </div>
    </div>
  );
}
