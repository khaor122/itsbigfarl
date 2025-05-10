'use client';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import RetroMembershipForm from '@/components/retro-membership-form';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Script from 'next/script';

const RetroIntro = dynamic(() => import('@/components/RetroIntro'), { ssr: false });
import Countdown from '@/components/CountDown';
import PongGame from '@/components/PongGame';
import TVShutdown from '@/components/TVShutdown';



export default function Home() {
  const [started, setStarted] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const [countdownDone, setCountdownDone] = useState(true);
  const [showShutdown, setshowShutdown] = useState(true);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 🎵 Boot sound function (called on click)
  const playAudio = () => {
    try {
      const audio = new Audio('/boot.mp3');
      audio.volume = 0.3;
      audio.play().catch((err) => {
        console.warn('Autoplay blocked or failed:', err);
      });
    } catch (err) {
      console.warn('Audio error:', err);
    }
  };

  useEffect(() => {
    // Preload sound
    audioRef.current = new Audio('/boot.mp3');
    audioRef.current.volume = 0.3;
  }, []);

  const handleStart = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((err) => {
        console.warn("Audio failed:", err);
      });
    }
    setStarted(true);
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "'Big Farl' Membership",
    description: "Join 'Big Farl' exclusive membership with a retro video game experience",
    image: "/images/character-1.png",
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: "9.99",
      availability: "https://schema.org/InStock",
    },
    brand: {
      "@type": "Brand",
      name: " 'Big Farl'",
    },
  };

  return (
    <>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main className="flex min-h-screen flex-col items-center justify-center bg-black text-green-400 font-mono">

        
        {/* STEP 1: PRESS START */}
        
        {!started && (
          <div className="flex flex-col items-center justify-center h-screen animate-flicker">
            <button
              onClick={handleStart}
              className="text-3xl border border-green-400 px-6 py-3 hover:bg-green-600 transition"
            >
              ▶ PRESS TO START
            </button>
            <style jsx>{`
              .animate-flicker {
                animation: flicker 1s infinite;
              }
              @keyframes flicker {
                0%   { opacity: 1 }
                50%  { opacity: 0.4 }
                100% { opacity: 1 }
              }
            `}</style>
          </div>
        )}

        {/* STEP 2: RETRO INTRO */}
        {started && !introDone && (
          <RetroIntro onFinish={() => setIntroDone(true)} />
        )}

        {/* STEP 3: MAIN CONTENT */}
        {started &&  introDone && (
          <>
            {!countdownDone ? <>
              <Countdown start={3} onComplete={() => setCountdownDone(true)} />
            </> : <>
              <div className="main-content w-full">
                <Header />
                <RetroMembershipForm />
                {/* <PongGame /> */}
                <Footer />
              </div>
            </>}

          </>
        )}
        {/* <TVShutdownAnimation /> */}
        {/* {showShutdown && <TVShutdown onFinish={() => setShowShutdown(false)} />} */}

      </main>
    </>
  );
}
