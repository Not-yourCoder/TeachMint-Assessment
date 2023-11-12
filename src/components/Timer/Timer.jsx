import { useEffect, useState } from "react";

const Timer = () => {
  const [time, setTime] = useState(new Date());
  const [isRunning, setisRunning] = useState(true);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(new Date());
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);
  const handlePause = () => {
    setisRunning(false);
  };
  const handleStart = () => {
    setisRunning(true);
  };
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  return (
    <div className="flex gap-2 items-center">
      <p className="text-lg font-semibold">{`${hours}:${
        minutes < 10 ? "0" : ""
      }${minutes}:${seconds < 10 ? "0" : ""}${seconds}`}</p>
      <div className="flex items-center gap-2">
        <button onClick={handlePause} className="bg-red-400  px-2">
          Pause
        </button>
        <button onClick={handleStart} className="bg-red-400 px-2">
          Start
        </button>
      </div>
    </div>
  );
};

export default Timer;
