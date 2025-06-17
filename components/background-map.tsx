"use client"

import { useEffect, useRef } from "react"

export function BackgroundMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = canvas.offsetWidth * 2
    canvas.height = canvas.offsetHeight * 2
    ctx.scale(2, 2)

    // Clear canvas
    ctx.fillStyle = "#f8fafc"
    ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

    // Draw background gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.offsetWidth, canvas.offsetHeight)
    gradient.addColorStop(0, "#dbeafe")
    gradient.addColorStop(1, "#bfdbfe")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

    // Draw data points (no connections)
    const dataPoints = [
      { x: 30, y: 20, size: 4, color: "#3b82f6" },
      { x: 80, y: 35, size: 3, color: "#10b981" },
      { x: 120, y: 25, size: 5, color: "#8b5cf6" },
      { x: 160, y: 40, size: 3, color: "#f59e0b" },
      { x: 200, y: 30, size: 4, color: "#ef4444" },
      { x: 240, y: 45, size: 3, color: "#06b6d4" },
      { x: 50, y: 60, size: 4, color: "#84cc16" },
      { x: 100, y: 70, size: 3, color: "#f97316" },
      { x: 150, y: 55, size: 5, color: "#ec4899" },
      { x: 200, y: 75, size: 3, color: "#6366f1" },
      { x: 70, y: 90, size: 4, color: "#14b8a6" },
      { x: 130, y: 95, size: 3, color: "#a855f7" },
      { x: 180, y: 85, size: 4, color: "#22c55e" },
      { x: 220, y: 100, size: 3, color: "#f43f5e" },
    ]

    // Draw points
    dataPoints.forEach((point) => {
      ctx.beginPath()
      ctx.arc(point.x, point.y, point.size, 0, 2 * Math.PI)
      ctx.fillStyle = point.color
      ctx.fill()

      // Add glow effect
      ctx.shadowColor = point.color
      ctx.shadowBlur = 8
      ctx.fill()
      ctx.shadowBlur = 0
    })

    // Draw subtle grid lines
    ctx.strokeStyle = "rgba(148, 163, 184, 0.2)"
    ctx.lineWidth = 0.5

    // Vertical lines
    for (let x = 0; x < canvas.offsetWidth; x += 40) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvas.offsetHeight)
      ctx.stroke()
    }

    // Horizontal lines
    for (let y = 0; y < canvas.offsetHeight; y += 30) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvas.offsetWidth, y)
      ctx.stroke()
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ width: "100%", height: "100%" }} />
}
