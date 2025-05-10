import React, { useEffect, useState } from "react"

const countdownSteps = ["3", "2", "1", "Play!"]

export default function CountdownAnimation({
  onComplete,
}: {
  onComplete: () => void
}) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (index < countdownSteps.length - 1) {
      const timer = setTimeout(() => {
        setIndex((prev) => prev + 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else {
      // Wait 1 second after "Play!" and call onComplete
      const timer = setTimeout(() => {
        onComplete()
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [index])

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
      <div className="text-green-400 text-6xl font-bold animate-ping-slow">
        {countdownSteps[index]}
      </div>
    </div>
  )
}
