import { useEffect, useRef, useState } from "react";

export default function GUIWindow() {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [size, setSize] = useState({ width: 800, height: 500 });
  const draggingRef = useRef(null);
  const resizingRef = useRef(null);
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    const open = () => setVisible(true);
    document.addEventListener("openGUI", open);
    return () => document.removeEventListener("openGUI", open);
  }, []);

  useEffect(() => {
    const onMouseMove = (e) => {
      if (draggingRef.current) {
        const { offsetX, offsetY } = draggingRef.current;
        setPosition({ x: e.clientX - offsetX, y: e.clientY - offsetY });
      }
      if (resizingRef.current) {
        const { startX, startY, startWidth, startHeight } = resizingRef.current;
        setSize({
          width: Math.max(400, startWidth + (e.clientX - startX)),
          height: Math.max(300, startHeight + (e.clientY - startY)),
        });
      }
    };

    const onMouseUp = () => {
      draggingRef.current = null;
      resizingRef.current = null;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute border border-green-400 bg-gray-900/95 rounded-lg shadow-2xl"
        style={{
          width: size.width,
          height: size.height,
          left: position.x,
          top: position.y,
        }}
      >
        {/* Top bar */}
        {/* Top bar */}
        <div
          onDoubleClick={() => {
            if (isMaximized) {
              setSize({ width: 800, height: 500 });
              setPosition({ x: 100, y: 100 });
            } else {
              setSize({
                width: window.innerWidth,
                height: window.innerHeight - 40,
              });
              setPosition({ x: 0, y: 0 });
            }
            setIsMaximized(!isMaximized);
          }}
          onMouseDown={(e) => {
            draggingRef.current = {
              offsetX: e.clientX - position.x,
              offsetY: e.clientY - position.y,
            };
          }}
          className="flex justify-between items-center bg-gray-800 border-b border-green-500 px-4 py-2 rounded-t-lg"
        >
          <h2 className="text-green-300 font-bold text-sm">
            SCGSSK GUI Portfolio
          </h2>

          {/* Right-aligned control circles */}
          <div className="flex items-center space-x-2 ml-4">
            <div
              title="Maximize"
              className="w-3 h-3 bg-green-500 rounded-full cursor-pointer"
            />
            <div
              title="Minimize"
              className="w-3 h-3 bg-yellow-400 rounded-full cursor-pointer"
            />
            <div
              onClick={() => setVisible(false)}
              className="w-3 h-3 bg-red-500 rounded-full cursor-pointer hover:ring-2 ring-red-300"
              title="Close"
            ></div>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-auto p-4 h-[calc(100%-56px)] text-white grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-800/70 p-4 rounded-md border border-green-400">
            <h3 className="text-green-300 font-semibold text-lg mb-2">
              IronMind
            </h3>
            <p>
              Daily focus app with Pomodoro, AI motivation & failure tracking.
            </p>
            <a
              href="https://github.com/scgssk/IronMind-Web"
              target="_blank"
              className="text-cyan-400 underline hover:text-cyan-300"
            >
              GitHub ↗
            </a>
          </div>
            <div className="bg-gray-800/70 p-4 rounded-md border border-green-400">
            <h3 className="text-green-300 font-semibold text-lg mb-2">
              IronMind
            </h3>
            <p>
              Daily focus app with Pomodoro, AI motivation & failure tracking.
            </p>
            <a
              href="https://github.com/scgssk/IronMind-Web"
              target="_blank"
              className="text-cyan-400 underline hover:text-cyan-300"
            >
              GitHub ↗
            </a>
          </div>
            <div className="bg-gray-800/70 p-4 rounded-md border border-green-400">
            <h3 className="text-green-300 font-semibold text-lg mb-2">
              IronMind
            </h3>
            <p>
              Daily focus app with Pomodoro, AI motivation & failure tracking.
            </p>
            <a
              href="https://github.com/scgssk/IronMind-Web"
              target="_blank"
              className="text-cyan-400 underline hover:text-cyan-300"
            >
              GitHub ↗
            </a>
          </div>
          
          <div className="bg-gray-800/70 p-4 rounded-md border border-green-400">
            <h3 className="text-green-300 font-semibold text-lg mb-2">
              Zenvend
            </h3>
            <p>Vendor management system with AI insights and analytics.</p>
            <a
              href="https://github.com/scgssk/Zenvend"
              target="_blank"
              className="text-cyan-400 underline hover:text-cyan-300"
            >
              GitHub ↗
            </a>
          </div>
          {/* Add more sections here */}
        </div>

        {/* Resize Handle */}
        <div
          onMouseDown={(e) => {
            resizingRef.current = {
              startX: e.clientX,
              startY: e.clientY,
              startWidth: size.width,
              startHeight: size.height,
            };
          }}
          className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize"
        ></div>
      </div>
    </div>
  );
}
