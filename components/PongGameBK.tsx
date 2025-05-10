"use client";

import { useEffect, useRef, useState } from "react";

const PADDLE_HEIGHT = 100;
const PADDLE_WIDTH = 10;
const BALL_SIZE = 10;
const WIN_SCORE = 5;

export default function PongGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const paddleY = useRef(0);
  const ballX = useRef(0);
  const ballY = useRef(0);
  const ballSpeedX = useRef(3);
  const ballSpeedY = useRef(3);
  const animationRef = useRef(0);

  const hitSound = useRef<HTMLAudioElement | null>(null);
  const scoreSound = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const width = canvas?.width ?? 800;
    const height = canvas?.height ?? 400;

    // Reset game state
    paddleY.current = height / 2 - PADDLE_HEIGHT / 2;
    ballX.current = width / 2;
    ballY.current = height / 2;

    hitSound.current = new Audio("/sounds/hit.mp3");
    scoreSound.current = new Audio("/sounds/score.mp3");

    const move = () => {
      // Ball movement
      ballX.current += ballSpeedX.current;
      ballY.current += ballSpeedY.current;

      // Top/bottom collision
      if (ballY.current <= 0 || ballY.current + BALL_SIZE >= height) {
        ballSpeedY.current *= -1;
        hitSound.current?.play();
      }

      // Paddle collision
      if (
        ballX.current <= PADDLE_WIDTH &&
        ballY.current + BALL_SIZE >= paddleY.current &&
        ballY.current <= paddleY.current + PADDLE_HEIGHT
      ) {
        ballSpeedX.current *= -1;
        hitSound.current?.play();
      }

      // Scoring (right side = point)
      if (ballX.current > width) {
        setScore((prev) => {
          const newScore = prev + 1;
          if (newScore >= WIN_SCORE) setGameOver(true);
          return newScore;
        });
        resetBall();
        scoreSound.current?.play();
      }

      // Ball missed paddle (left side)
      if (ballX.current < 0) {
        resetBall();
      }

      draw();
      if (!gameOver) animationRef.current = requestAnimationFrame(move);
    };

    const resetBall = () => {
      ballX.current = width / 2;
      ballY.current = height / 2;
      ballSpeedX.current = 3;
      ballSpeedY.current = 3;
    };

    const draw = () => {
      if (!ctx) return;
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "white";
      ctx.fillRect(0, paddleY.current, PADDLE_WIDTH, PADDLE_HEIGHT);

      ctx.beginPath();
      ctx.arc(ballX.current, ballY.current, BALL_SIZE, 0, Math.PI * 2);
      ctx.fill();

      ctx.font = "24px monospace";
      ctx.fillText(`Score: ${score}`, width / 2 - 40, 30);
    };

    const mouseMoveHandler = (e: MouseEvent) => {
      const rect = canvas?.getBoundingClientRect();
      const offsetY = rect ? e.clientY - rect.top : 0;
      paddleY.current = offsetY - PADDLE_HEIGHT / 2;
    };

    canvas?.addEventListener("mousemove", mouseMoveHandler);
    animationRef.current = requestAnimationFrame(move);

    return () => {
      canvas?.removeEventListener("mousemove", mouseMoveHandler);
      cancelAnimationFrame(animationRef.current);
    };
  }, [gameOver]);

  return (
    <div className="flex flex-col items-center gap-4 bg-black h-screen text-green-400 font-mono justify-center">
      <canvas ref={canvasRef} width={800} height={400} className="border border-green-400" />
      {gameOver && (
        <div className="text-3xl">
          Game Over – You Win!
        </div>
      )}
    </div>
  );
}
