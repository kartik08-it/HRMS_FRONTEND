import { useEffect, useState } from "react";

const DigitalClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formattedTime = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const formattedDate = time.toLocaleDateString([], {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  return (
    <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20">
      <div className="text-xs font-bold text-indigo-400 uppercase tracking-wide mb-2">
        Current Time
      </div>

      <div className="text-3xl font-black text-white tracking-widest">
        {formattedTime}
      </div>

      <div className="text-xs text-indigo-300 mt-1">
        {formattedDate}
      </div>
    </div>
  );
};

export default DigitalClock;