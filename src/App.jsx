import { useState } from "react";
import BootScreen from "./components/BootScreen";
import Desktop from "./components/Desktop";

function App() {
  const [bootDone, setBootDone] = useState(false);

  return (
    <div className="w-full h-screen bg-black text-green-400 font-mono">
      {!bootDone ? (
        <BootScreen onComplete={() => setBootDone(true)} />
      ) : (
        <Desktop />
      )}
    </div>
  );
}

export default App;
