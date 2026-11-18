import { useEffect, useState } from 'react';

function getRemaining(target) {
  const ms = Math.max(0, target.getTime() - Date.now());
  const totalSeconds = Math.floor(ms / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    isFinished: ms === 0,
  };
}

/** Live time remaining until `target` (a Date), updated every second. */
export function useCountdown(target) {
  const [remaining, setRemaining] = useState(() => getRemaining(target));

  useEffect(() => {
    const tick = () => setRemaining(getRemaining(target));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  return remaining;
}
