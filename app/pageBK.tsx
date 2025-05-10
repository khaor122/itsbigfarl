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
import TVShutdownAnimation from '@/components/TVShutdownAnimation';



export default function Home() {
  const [started, setStarted] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const [countdownDone, setCountdownDone] = useState(true);

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
    name: "Jabari 'Big Farl' Greer Membership",
    description: "Join Jabari 'Big Farl' Greer's exclusive membership with a retro video game experience",
    image: "/images/character-1.png",
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: "9.99",
      availability: "https://schema.org/InStock",
    },
    brand: {
      "@type": "Brand",
      name: "Jabari 'Big Farl' Greer",
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

        

        {/* <TVShutdownAnimation /> */}

      </main>
    </>
  );
}
