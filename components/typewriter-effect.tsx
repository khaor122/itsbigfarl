"use client"

import { useState, useEffect, useRef } from "react"

interface TypewriterEffectProps {
  text: string
  speed?: number
  onComplete?: () => void
}

export default function TypewriterEffect({ text, speed = 50, onComplete }: TypewriterEffectProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Only initialize audio in the browser
  useEffect(() => {
    if (typeof window !== "undefined" && !audioRef.current) {
      audioRef.current = new window.Audio("/sounds/typing.wav")
      audioRef.current.volume = 1.0 // Optional: adjust volume
    }
  }, [])

  useEffect(() => {
    // Reset when text changes
    setDisplayedText("")
    setCurrentIndex(0)
  }, [text])

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
        // Play typing sound
        if (audioRef.current) {
          try {
            audioRef.current.currentTime = 0
            audioRef.current.play()
          } catch (e) {
            // Ignore play errors (e.g., user hasn't interacted yet)
          }
        }
      }, speed)

      return () => clearTimeout(timeout)
    } else {
      // Stop typing sound when animation ends
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
      if (onComplete) {
        onComplete()
      }
    }
  }, [currentIndex, text, speed, onComplete])

  return <span>{displayedText}</span>
}
