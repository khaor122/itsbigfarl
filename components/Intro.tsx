'use client';
import React, { useEffect } from 'react';

export default function Intro() {
  useEffect(() => {
    const timer = setTimeout(() => {
      const intro = document.getElementById('intro');
      if (intro) {
        intro.style.display = 'none';
      }
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="intro">
      <div className="merge-animation">
        {["@","I","T","S","B","I","G","F","A","R","L","."].map((char, index) => (
          <span key={index} className="char" style={{ "--i": index } as React.CSSProperties}>
            {char}
          </span>
        ))}
      </div>
    </div>
  );
}
