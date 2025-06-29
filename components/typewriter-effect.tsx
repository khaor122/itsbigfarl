"use client"

import { useState, useEffect, useRef } from "react"

interface TypewriterEffectProps {
  text: string
  speed?: number
  onComplete?: () => void
  playSound?: boolean
}

export default function TypewriterEffect({
  text,
  speed = 50,
  onComplete,
  playSound = true,
}: TypewriterEffectProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Only initialize audio in the browser
  useEffect(() => {
    if (typeof window !== "undefined" && playSound && !audioRef.current) {
      audioRef.current = new Audio("/sounds/typing.wav")
      // Optional: preload for faster playback
      audioRef.current.preload = "auto"
    }
  }, [playSound])

  useEffect(() => {
    setDisplayedText("")
    setCurrentIndex(0)
  }, [text])

  useEffect(() => {
    let isCancelled = false

    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        if (isCancelled) return

        setDisplayedText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)

        // Play typing sound
        if (audioRef.current && playSound) {
          try {
            audioRef.current.currentTime = 0
            audioRef.current.play()
          } catch (e) {
            // Ignore playback error
          }
        }
      }, speed)

      return () => {
        isCancelled = true
        clearTimeout(timeout)
      }
    } else {
      // Typing complete
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
      if (onComplete) onComplete()
    }
  }, [currentIndex, text, speed, onComplete, playSound])

  return <span aria-live="polite">{displayedText}</span>
}
