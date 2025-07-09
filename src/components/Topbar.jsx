import { useEffect, useState } from "react";

export default function Topbar() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const options = { weekday: "short", hour: "2-digit", minute: "2-digit", second: "2-digit"};
      setTime(now.toLocaleTimeString("en-US", options));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-9 bg-black/60 backdrop-blur-md border-b border-green-800 text-green-300 flex justify-end items-center px-4 text-sm z-50">
      <div className="flex items-center gap-2">
        <img src="/ssklogo.png" alt="user" className="w-5 h-5 rounded-full" />
        <span className="text-xs">scgssk@portfolio</span>
      </div>
      <span className="ml-auto">{time}</span>
    </div>
  );
}
