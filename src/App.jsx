import { useState, useEffect } from "react";
import BootScreen from "./components/BootScreen";
import Terminal from "./components/Terminal";
import GUIWindow from "./components/GUIWindow";

function App() {
  const [bootDone, setBootDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setBootDone(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-screen bg-black text-green-400 font-mono">
      {!bootDone ? (
        <BootScreen />
      ) : (
        <>
          <Terminal />
          <GUIWindow />
          <img
            src="/ssklogo.png"
            alt="ssk logo"
            className="fixed bottom-5 right-10 w-12 h-12 opacity-80 hover:opacity-100 transition-opacity duration-300"
          />
        </>
      )}
    </div>
  );
}

export default App;
