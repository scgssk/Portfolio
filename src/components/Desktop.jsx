import { useState, useEffect } from "react";
import Terminal from "./Terminal";
import FirefoxApp from "./FirefoxApp";
import Taskbar from "./Taskbar";
import WindowWrapper from "./WindowWrapper";
import Topbar from "./Topbar";

export default function Desktop() {
  const [contextMenu, setContextMenu] = useState(null);
  const [firefoxUrl, setFirefoxUrl] = useState("https://github.com/scgssk");
  const [firefoxMinimal, setFirefoxMinimal] = useState(false); // 🔥 New state

useEffect(() => {
  const handleNav = (e) => {
    const detail = e.detail;

    if (typeof detail === "string") {
      setFirefoxUrl(detail);
      setFirefoxMinimal(true); // from terminal
    } else if (typeof detail === "object" && detail !== null) {
      setFirefoxUrl(detail.url || "https://github.com/scgssk");
      setFirefoxMinimal(!!detail.minimal);
    } else {
      // fallback
      setFirefoxMinimal(false);
    }

    openApp("firefox");
  };

  const handleClose = () => {
    closeApp("firefox");
  };

  window.addEventListener("open-in-firefox", handleNav);
  window.addEventListener("close-firefox", handleClose);

  return () => {
    window.removeEventListener("open-in-firefox", handleNav);
    window.removeEventListener("close-firefox", handleClose);
  };
}, []);


  const [apps, setApps] = useState([
    { id: "terminal", title: "Terminal", visible: false, minimized: false, z: 1 },
    { id: "firefox", title: "Firefox", visible: false, minimized: false, z: 2 },
  ]);

  const [zCounter, setZCounter] = useState(3);

  useEffect(() => {
    const handleClick = () => setContextMenu(null);
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  const openApp = (id) => {
    if (id === "firefox") {
      setFirefoxUrl("https://github.com/scgssk"); // default view
      setFirefoxMinimal(false);                   // desktop-style: show top bar
    }

    setApps((prev) =>
      prev.map((app) =>
        app.id === id
          ? { ...app, visible: true, minimized: false, z: zCounter }
          : app
      )
    );
    setZCounter((z) => z + 1);
  };

  const closeApp = (id) => {
    setApps((prev) =>
      prev.map((app) => (app.id === id ? { ...app, visible: false } : app))
    );
  };

  const minimizeApp = (id) => {
    setApps((prev) =>
      prev.map((app) => (app.id === id ? { ...app, minimized: true } : app))
    );
  };

  const focusApp = (id) => {
    setApps((prev) =>
      prev.map((app) => (app.id === id ? { ...app, z: zCounter } : app))
    );
    setZCounter((z) => z + 1);
  };

  const renderApp = (app) => {
    if (!app.visible || app.minimized) return null;

    let content = null;
    switch (app.id) {
      case "terminal":
        content = <Terminal />;
        break;
      case "firefox":
        content = <FirefoxApp url={firefoxUrl} minimal={firefoxMinimal} />;
        break;
      default:
        return null;
    }

    return (
      <WindowWrapper
        key={app.id}
        appId={app.id}
        title={app.title}
        onClose={closeApp}
        onMinimize={minimizeApp}
        zIndex={app.z}
        onFocus={focusApp}
         hideTopbar={app.id === "firefox" && firefoxMinimal}
      >
        {content}
      </WindowWrapper>
    );
  };

  return (
    <div
      className="relative w-full h-screen text-green-400 font-mono overflow-hidden"
      style={{
        backgroundImage: `url('/linux-desktop-bg.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#000",
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        setContextMenu({ x: e.clientX, y: e.clientY });
      }}
    >
      <Topbar />

      {/* App icons */}
      <div className="absolute top-20 left-4 flex flex-col space-y-6">
        <button
          onClick={() => openApp("terminal")}
          className="flex flex-col items-center text-green-300 hover:text-white group"
        >
          <img src="/terminal-icon.png" className="w-17 h-12" alt="Terminal" />
          <span className="text-xs mt-1 group-hover:underline">Terminal</span>
        </button>

        <button
          onClick={() => openApp("firefox")}
          className="flex flex-col items-center text-green-300 hover:text-white group"
        >
          <img src="/firefox-icon.png" className="w-17 h-12" alt="Firefox" />
          <span className="text-xs mt-1 group-hover:underline">Firefox</span>
        </button>
      </div>

      {/* Render active apps */}
      {apps.map(renderApp)}

      {/* Taskbar */}
      <Taskbar apps={apps} onAppClick={openApp} />

      {/* Right-click context menu */}
      {contextMenu && (
        <div
          className="absolute bg-gray-800 border border-green-500 rounded shadow-md text-sm text-green-300 z-50"
          style={{ top: contextMenu.y, left: contextMenu.x }}
          onClick={() => setContextMenu(null)}
        >
          <ul>
            <li
              className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
              onClick={() => openApp("terminal")}
            >
              Open Terminal
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
              onClick={() => window.location.reload()}
            >
              Reload
            </li>
            <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
              System Info (coming soon)
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
