'use client';
import { useEffect, useState } from 'react';

type CountdownProps = {
  start?: number;
  onComplete: () => void;
  interval?: number;
  showPlayText?: boolean;
};

export default function CountDown({
  start = 3,
  interval = 1000,
  onComplete,
  showPlayText = true,
}: CountdownProps) {
  const [count, setCount] = useState(start);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setTimeout(onComplete, 0); // defer callback
          return 0;
        }
        return prev - 1;
      });
    }, interval);
  
    return () => clearInterval(timer);
  }, [interval, onComplete]);

  return (
    <div className="text-6xl font-bold text-green-400 font-mono animate-flicker">
      {count === 0 ? (showPlayText ? 'PLAY!' : '') : count}
    </div>
  );
}
