'use client';
import { useEffect, useState } from 'react';

type TVShutdownProps = {
  onFinish: () => void;
  duration?: number; // in ms
};

export default function TVShutdown({ onFinish, duration = 1500 }: TVShutdownProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const audio = new Audio('/sounds/tv-off.mp3');
    audio.volume = 0.5;
    audio.play().catch(() => {});

    const timeout = setTimeout(() => {
      setVisible(false);
      onFinish();
    }, duration);

    return () => clearTimeout(timeout);
  }, [duration, onFinish]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <div className="tv-shutdown-dot"></div>
      <style jsx>{`
        .tv-shutdown-dot {
          width: 100vw;
          height: 100vh;
          background: #00ff99; /* Matching accent green */
          border-radius: 50%;
          box-shadow: 0 0 40px #00ff99;
          animation: shutdown 1.2s forwards ease-in;
        }

        @keyframes shutdown {
          0% {
            transform: scaleX(1) scaleY(1);
            opacity: 1;
          }
          30% {
            transform: scaleX(1.3) scaleY(0.2);
          }
          70% {
            transform: scaleX(0.3) scaleY(0.01);
          }
          100% {
            transform: scaleX(0) scaleY(0);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
