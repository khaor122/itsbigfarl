'use client';
import { useEffect, useState } from 'react';

export default function RetroIntro({ onFinish }: { onFinish: () => void }) {
    const [reveal, setReveal] = useState(false);
    const [showFlash, setShowFlash] = useState(false);
    const [showParticles, setShowParticles] = useState(false);
    const [showCrack, setShowCrack] = useState(false);

    useEffect(() => {
        const playAudio = async () => {
            try {
                const context = new (window.AudioContext || (window as any).webkitAudioContext)();
                if (context.state === 'suspended') {
                    await context.resume();
                }

                const audio = new Audio('/boot.mp3');
                audio.volume = 0.3;
                await audio.play();
            } catch (err) {
                console.warn("Audio error:", err);
            }
        };

        setReveal(true);
        playAudio();

        const flashTimer = setTimeout(() => {
            setShowFlash(true);
            setTimeout(() => setShowFlash(false), 150);
        }, 2400);

        const particleTimer = setTimeout(() => {
            setShowParticles(true);
        }, 2400);

        const crackTimer = setTimeout(() => {
            setShowCrack(true);
        }, 2400);

        const finishTimer = setTimeout(() => {
            onFinish();
        }, 4000);

        return () => {
            clearTimeout(flashTimer);
            clearTimeout(particleTimer);
            clearTimeout(crackTimer);
            clearTimeout(finishTimer);
        };
    }, [onFinish]);

    return (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden">
            {showFlash && <div className="absolute inset-0 bg-white opacity-70 animate-flash z-40" />}

            {showCrack && (
                <img
                    src="/images/crack.png"
                    alt="crack effect"
                    className="absolute z-30 w-[300px] h-auto animate-crack-fade"
                    style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                />
            )}

            {showParticles &&
                Array.from({ length: 18 }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 bg-white rounded-full animate-particle z-40"
                        style={{
                            top: '50%',
                            left: '50%',
                            transform: `translate(-50%, -50%) rotate(${i * 20}deg) translateY(-100px)`,
                            animationDelay: `${Math.random() * 0.1}s`
                        }}
                    />
                ))}

            <img
                src="/images/its big farl.png"
                alt="@ITSBIGFARL"
                className={`max-w-[90%] max-h-[80%] z-50 ${reveal ? 'crackedZoomReveal' : 'opacity-0'}`}
            />

            <style jsx>{`
                .crackedZoomReveal {
                    animation: crackedZoomReveal 3s ease-out forwards;
                }

                @keyframes crackedZoomReveal {
                    0%   { opacity: 0;   transform: scale(5) rotate(0deg); }
                    2%   { opacity: 1;   transform: scale(4.7) rotate(-1deg); }
                    4%   {               transform: scale(4.4) rotate(1deg); }
                    6%   {               transform: scale(4) rotate(-2deg); }
                    8%   {               transform: scale(3.6) rotate(2deg); }
                    10%  {               transform: scale(3.2) rotate(-1.5deg); }
                    12%  {               transform: scale(2.8) rotate(1deg); }
                    14%  {               transform: scale(2.4) rotate(-0.8deg); }
                    16%  {               transform: scale(2.1) rotate(0.5deg); }
                    20%  {               transform: scale(1.8) rotate(-0.4deg); }
                    25%  {               transform: scale(1.5) rotate(0.2deg); }
                    30%  {               transform: scale(1.3) rotate(-0.1deg); }
                    40%  {               transform: scale(1.15) rotate(0.05deg); }
                    50%  {               transform: scale(1.08) rotate(-0.03deg); }
                    60%  {               transform: scale(1.04) rotate(0.01deg); }
                    70%  {               transform: scale(1.015) rotate(0deg); }
                    80%  {               transform: scale(1) rotate(0deg); }
                    85%  {               transform: scale(1.02) translateY(-2px); }
                    90%  {               transform: scale(0.98) translateY(2px); }
                    95%  {               transform: scale(1.01) translateY(-1px); }
                    100% { opacity: 1;   transform: scale(1) translateY(0); }
                }

                @keyframes flash {
                    0% { opacity: 0.7; }
                    100% { opacity: 0; }
                }

                .animate-flash {
                    animation: flash 0.15s ease-out forwards;
                }

                @keyframes particle {
                    0% {
                        transform: translate(-50%, -50%) scale(1);
                        opacity: 1;
                    }
                    100% {
                        transform: translate(-50%, -50%) scale(0.5) translateY(-200px);
                        opacity: 0;
                    }
                }

                .animate-particle {
                    animation: particle 0.6s ease-out forwards;
                }

                @keyframes crackFade {
                    0% { opacity: 0; transform: scale(1.2); }
                    100% { opacity: 1; transform: scale(1); }
                }

                .animate-crack-fade {
                    animation: crackFade 0.6s ease-out forwards;
                }
            `}</style>
        </div>
    );
}
