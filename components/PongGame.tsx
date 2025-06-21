"use client"

import React, { useEffect, useRef, useState } from "react"

interface PongGameProps {
  onGameEnd: () => void
}

const PongGame: React.FC<PongGameProps> = ({ onGameEnd }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const [score, setScore] = useState(0)
  const [showPopup, setShowPopup] = useState(false)
  const [canvasSize, setCanvasSize] = useState({ width: 400, height: 300 })

  const paddleWidth = 80
  const paddleHeight = 10
  const ballRadius = 10
  const maxScore = 3

  const paddle = useRef({ x: 160 })
  const ball = useRef({
    x: 200,
    y: 100,
    dx: 3,
    dy: 3,
  })

  const animationFrame = useRef<number | null>(null)

  const resetBall = () => {
    ball.current = {
      x: canvasSize.width / 2,
      y: canvasSize.height / 3,
      dx: 3,
      dy: 3,
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw paddle
      ctx.fillStyle = "#4ADE80"
      ctx.fillRect(
        paddle.current.x,
        canvas.height - paddleHeight - 10,
        paddleWidth,
        paddleHeight
      )

      // Draw ball
      ctx.beginPath()
      ctx.arc(ball.current.x, ball.current.y, ballRadius, 0, Math.PI * 2)
      ctx.fillStyle = "#C4D38C"
      ctx.fill()
      ctx.closePath()

      // Draw score
      ctx.font = "16px monospace"
      ctx.fillStyle = "#4ADE80"
      ctx.fillText(`Score: ${score}`, 10, 20)

      // Move ball
      ball.current.x += ball.current.dx
      ball.current.y += ball.current.dy

      // Wall collision
      if (
        ball.current.x + ballRadius > canvas.width ||
        ball.current.x - ballRadius < 0
      ) {
        ball.current.dx *= -1
      }

      if (ball.current.y - ballRadius < 0) {
        ball.current.dy *= -1
      }

      // Paddle collision
      if (
        ball.current.y + ballRadius >= canvas.height - paddleHeight - 10 &&
        ball.current.x >= paddle.current.x &&
        ball.current.x <= paddle.current.x + paddleWidth
      ) {
        ball.current.dy *= -1
        setScore((prev) => {
          const newScore = prev + 1
          if (newScore >= maxScore) {
            cancelAnimationFrame(animationFrame.current!)
            setShowPopup(true)
          }
          return newScore
        })
      }

      // Missed paddle
      if (ball.current.y + ballRadius > canvas.height) {
        cancelAnimationFrame(animationFrame.current!)
        setTimeout(() => {
          setScore(0)
          resetBall()
          animationFrame.current = requestAnimationFrame(update)
        }, 1000)
        return
      }

      animationFrame.current = requestAnimationFrame(update)
    }

    animationFrame.current = requestAnimationFrame(update)

    return () => {
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current)
    }
  }, [score, canvasSize])

  useEffect(() => {
    const movePaddle = (x: number) => {
      const canvas = canvasRef.current
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      const paddleX = x - rect.left - paddleWidth / 2
      paddle.current.x = Math.max(
        0,
        Math.min(canvas.width - paddleWidth, paddleX)
      )
    }

    const handleTouchMove = (e: TouchEvent) => {
      movePaddle(e.touches[0].clientX)
    }

    const handleMouseMove = (e: MouseEvent) => {
      movePaddle(e.clientX)
    }

    window.addEventListener("touchmove", handleTouchMove)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  useEffect(() => {
    const handleResize = () => {
      const container = containerRef.current
      if (!container) return
      const width = Math.min(container.offsetWidth, 400)
      const height = (width * 3) / 4
      setCanvasSize({ width, height })
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handlePopupClose = () => {
    setShowPopup(false)
    onGameEnd()
  }

  return (
    <div
      ref={containerRef}
      className="w-full flex flex-col items-center justify-center px-2 relative"
    >
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        className="border-2 border-green-400 bg-black rounded"
      />
      {showPopup && (
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-black/90 text-green-400 font-mono z-50">
          <div className="text-3xl mb-4">🎉 Great Job! 🎮</div>
          <p className="mb-6">You scored 3 points and beat the game!</p>
          <button
            onClick={handlePopupClose}
            className="border border-green-400 px-6 py-2 hover:bg-green-800"
          >
            Continue
          </button>
        </div>
      )}
    </div>
  )
}

export default PongGame
