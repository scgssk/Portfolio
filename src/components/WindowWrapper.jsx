import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function WindowWrapper({
  title,
  appId,
  onClose,
  onMinimize,
  zIndex,
  children,
  onFocus,
  hideTopbar = false,
}) {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [size, setSize] = useState({ width: 800, height: 460 });
  const [isMaximized, setIsMaximized] = useState(false);
  const draggingRef = useRef(null);
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

  useEffect(() => {
    if (isMobile) {
      setSize({
        width: Math.max(window.innerWidth, 320),
        height: Math.max(window.innerHeight, 500),
      });
      setPosition({ x: 0, y: 0 });
      setIsMaximized(true);
    }
  }, []);

  const toggleMaximize = () => {
    if (isMaximized) {
      setSize({ width: 800, height: 460 });
      setPosition({ x: 100, y: 100 });
    } else {
      setSize({
        width: Math.max(window.innerWidth, 320),
        height: Math.max(window.innerHeight, 500),
      });
      setPosition({ x: 0, y: 0 });
    }
    setIsMaximized(!isMaximized);
  };

  const handleMouseDown = (e) => {
    draggingRef.current = {
      offsetX: e.clientX - position.x,
      offsetY: e.clientY - position.y,
    };
    onFocus(appId);
  };

  const handleMouseMove = (e) => {
    if (draggingRef.current && !isMaximized) {
      const { offsetX, offsetY } = draggingRef.current;
      setPosition({ x: e.clientX - offsetX, y: e.clientY - offsetY });
    }
  };

  const handleMouseUp = () => {
    draggingRef.current = null;
  };

  return (
    <motion.div
      className="absolute bg-gray-900 border border-green-400 rounded-md shadow-lg overflow-hidden"
      style={{
        width: size.width,
        height: size.height,
        left: position.x,
        top: position.y,
        zIndex: isMaximized ? 999 : zIndex,
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseDown={() => onFocus(appId)}
      initial={{ opacity: 0, scale: 0.8, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{
        duration: 0.25,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {!hideTopbar && (
        <div
          onMouseDown={handleMouseDown}
          onDoubleClick={toggleMaximize}
          className="bg-gray-800 border-b border-green-500 px-4 py-1 flex items-center select-none"
        >
          <span className="text-green-300 text-sm font-semibold">{title}</span>
          <div className="flex items-center gap-2 ml-auto">
            <div
              title="Minimize"
              onClick={() => onMinimize(appId)}
              className="w-3 h-3 bg-yellow-400 rounded-full cursor-pointer hover:ring-2 ring-yellow-300"
            ></div>
            <div
              title="Maximize"
              onClick={toggleMaximize}
              className="w-3 h-3 bg-green-500 rounded-full cursor-pointer hover:ring-2 ring-green-400"
            ></div>
            <div
              title="Close"
              onClick={() => onClose(appId)}
              className="w-3 h-3 bg-red-500 rounded-full cursor-pointer hover:ring-2 ring-red-400"
            ></div>
          </div>
        </div>
      )}

      <div className="w-full h-full overflow-auto">{children}</div>
    </motion.div>
  );
}
