import { useEffect, useRef } from 'react'

export function Logo3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let rotation = 0

    const animate = () => {
      rotation += 0.02
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Save context
      ctx.save()

      // Translate to center
      ctx.translate(canvas.width / 2, canvas.height / 2)

      // Apply rotation
      ctx.rotate(rotation)

      // Create gradient
      const gradient = ctx.createLinearGradient(-50, -50, 50, 50)
      gradient.addColorStop(0, '#00d4ff')
      gradient.addColorStop(0.5, '#0099ff')
      gradient.addColorStop(1, '#0066ff')

      // Draw 3D cube effect
      ctx.fillStyle = gradient
      ctx.shadowColor = '#00d4ff'
      ctx.shadowBlur = 20
      ctx.shadowOffsetX = 0
      ctx.shadowOffsetY = 0

      // Draw main shape
      ctx.beginPath()
      ctx.moveTo(-40, -40)
      ctx.lineTo(40, -40)
      ctx.lineTo(50, 0)
      ctx.lineTo(40, 40)
      ctx.lineTo(-40, 40)
      ctx.lineTo(-50, 0)
      ctx.closePath()
      ctx.fill()

      // Draw inner glow
      ctx.strokeStyle = '#00ffff'
      ctx.lineWidth = 2
      ctx.stroke()

      ctx.restore()

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => cancelAnimationFrame(animationId)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      width={120}
      height={120}
      className="mx-auto"
      style={{ filter: 'drop-shadow(0 0 10px #00d4ff)' }}
    />
  )
}
