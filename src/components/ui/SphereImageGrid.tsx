import React, { useState, useEffect, useRef, useCallback } from 'react'
import { X } from 'lucide-react'

export interface ImageData {
  id: string
  src: string
  alt: string
  title?: string
  description?: string
}

export interface SphereImageGridProps {
  images?: ImageData[]
  containerSize?: number
  sphereRadius?: number
  dragSensitivity?: number
  momentumDecay?: number
  maxRotationSpeed?: number
  baseImageScale?: number
  hoverScale?: number
  perspective?: number
  autoRotate?: boolean
  autoRotateSpeed?: number
  className?: string
  centerContent?: React.ReactNode
}

interface Position3D { x: number; y: number; z: number }
interface SphericalPosition { theta: number; phi: number; radius: number }
interface WorldPosition extends Position3D {
  scale: number; zIndex: number; isVisible: boolean
  fadeOpacity: number; originalIndex: number
}
interface RotationState { x: number; y: number; z: number }
interface VelocityState { x: number; y: number }
interface MousePosition { x: number; y: number }

const normalizeAngle = (angle: number): number => {
  while (angle > 180) angle -= 360
  while (angle < -180) angle += 360
  return angle
}

const SphereImageGrid: React.FC<SphereImageGridProps> = ({
  images = [],
  containerSize = 400,
  sphereRadius = 200,
  dragSensitivity = 0.5,
  momentumDecay = 0.95,
  maxRotationSpeed = 5,
  baseImageScale = 0.12,
  hoverScale: _hoverScale = 1.2,
  perspective = 1000,
  autoRotate = false,
  autoRotateSpeed = 0.3,
  className = '',
  centerContent,
}) => {
  const [isMounted, setIsMounted] = useState(false)
  const [rotation, setRotation] = useState<RotationState>({ x: 15, y: 15, z: 0 })
  const [velocity, setVelocity] = useState<VelocityState>({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null)
  const [imagePositions, setImagePositions] = useState<SphericalPosition[]>([])
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const containerRef = useRef<HTMLDivElement>(null)
  const lastMousePos = useRef<MousePosition>({ x: 0, y: 0 })
  const animationFrame = useRef<number | null>(null)

  const actualSphereRadius = sphereRadius || containerSize * 0.5
  const baseImageSize = containerSize * baseImageScale

  const generateSpherePositions = useCallback((): SphericalPosition[] => {
    const positions: SphericalPosition[] = []
    const goldenRatio = (1 + Math.sqrt(5)) / 2
    const angleIncrement = 2 * Math.PI / goldenRatio

    for (let i = 0; i < images.length; i++) {
      const t = i / images.length
      const inclination = Math.acos(1 - 2 * t)
      const azimuth = angleIncrement * i
      let phi = inclination * (180 / Math.PI)
      let theta = (azimuth * (180 / Math.PI)) % 360
      const poleBonus = Math.pow(Math.abs(phi - 90) / 90, 0.6) * 35
      if (phi < 90) phi = Math.max(5, phi - poleBonus)
      else phi = Math.min(175, phi + poleBonus)
      phi = 15 + (phi / 180) * 150
      theta = (theta + (Math.random() - 0.5) * 20) % 360
      phi = Math.max(0, Math.min(180, phi + (Math.random() - 0.5) * 10))
      positions.push({ theta, phi, radius: actualSphereRadius })
    }
    return positions
  }, [images.length, actualSphereRadius])

  const calculateWorldPositions = useCallback((): WorldPosition[] => {
    const rotXRad = rotation.x * (Math.PI / 180)
    const rotYRad = rotation.y * (Math.PI / 180)

    const positions = imagePositions.map((pos, index) => {
      const thetaRad = pos.theta * (Math.PI / 180)
      const phiRad = pos.phi * (Math.PI / 180)

      let x = pos.radius * Math.sin(phiRad) * Math.cos(thetaRad)
      let y = pos.radius * Math.cos(phiRad)
      let z = pos.radius * Math.sin(phiRad) * Math.sin(thetaRad)

      const x1 = x * Math.cos(rotYRad) + z * Math.sin(rotYRad)
      const z1 = -x * Math.sin(rotYRad) + z * Math.cos(rotYRad)
      x = x1; z = z1

      const y2 = y * Math.cos(rotXRad) - z * Math.sin(rotXRad)
      const z2 = y * Math.sin(rotXRad) + z * Math.cos(rotXRad)
      y = y2; z = z2

      const fadeZoneStart = -10
      const fadeZoneEnd = -30
      const isVisible = z > fadeZoneEnd
      const fadeOpacity = z <= fadeZoneStart
        ? Math.max(0, (z - fadeZoneEnd) / (fadeZoneStart - fadeZoneEnd))
        : 1

      const isPoleImage = pos.phi < 30 || pos.phi > 150
      const distFromCenter = Math.sqrt(x * x + y * y)
      const distRatio = Math.min(distFromCenter / actualSphereRadius, 1)
      const centerScale = Math.max(0.3, 1 - distRatio * (isPoleImage ? 0.4 : 0.7))
      const depthScale = (z + actualSphereRadius) / (2 * actualSphereRadius)
      const scale = centerScale * Math.max(0.5, 0.8 + depthScale * 0.3)

      return { x, y, z, scale, zIndex: Math.round(1000 + z), isVisible, fadeOpacity, originalIndex: index }
    })

    // Collision detection
    const adjusted = [...positions]
    for (let i = 0; i < adjusted.length; i++) {
      if (!adjusted[i].isVisible) continue
      let s = adjusted[i].scale
      const size = baseImageSize * s
      for (let j = 0; j < adjusted.length; j++) {
        if (i === j || !adjusted[j].isVisible) continue
        const otherSize = baseImageSize * adjusted[j].scale
        const dx = adjusted[i].x - adjusted[j].x
        const dy = adjusted[i].y - adjusted[j].y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const minDist = (size + otherSize) / 2 + 1
        if (dist < minDist && dist > 0) {
          const overlap = minDist - dist
          s = Math.min(s, s * Math.max(0.4, 1 - (overlap / minDist) * 0.6))
        }
      }
      adjusted[i] = { ...adjusted[i], scale: Math.max(0.25, s) }
    }
    return adjusted
  }, [imagePositions, rotation, actualSphereRadius, baseImageSize])

  const clamp = useCallback((v: number) =>
    Math.max(-maxRotationSpeed, Math.min(maxRotationSpeed, v)), [maxRotationSpeed])

  const updateMomentum = useCallback(() => {
    if (isDragging) return
    setVelocity(prev => {
      const nv = { x: prev.x * momentumDecay, y: prev.y * momentumDecay }
      if (!autoRotate && Math.abs(nv.x) < 0.01 && Math.abs(nv.y) < 0.01) return { x: 0, y: 0 }
      return nv
    })
    setRotation(prev => ({
      x: normalizeAngle(prev.x + clamp(velocity.x)),
      y: normalizeAngle(prev.y + (autoRotate ? autoRotateSpeed : 0) + clamp(velocity.y)),
      z: prev.z,
    }))
  }, [isDragging, momentumDecay, velocity, clamp, autoRotate, autoRotateSpeed])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
    setVelocity({ x: 0, y: 0 })
    lastMousePos.current = { x: e.clientX, y: e.clientY }
  }, [])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return
    const dx = e.clientX - lastMousePos.current.x
    const dy = e.clientY - lastMousePos.current.y
    setRotation(prev => ({
      x: normalizeAngle(prev.x + clamp(-dy * dragSensitivity)),
      y: normalizeAngle(prev.y + clamp(dx * dragSensitivity)),
      z: prev.z,
    }))
    setVelocity({ x: clamp(-dy * dragSensitivity), y: clamp(dx * dragSensitivity) })
    lastMousePos.current = { x: e.clientX, y: e.clientY }
  }, [isDragging, dragSensitivity, clamp])

  const handleMouseUp = useCallback(() => setIsDragging(false), [])

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault()
    const t = e.touches[0]
    setIsDragging(true)
    setVelocity({ x: 0, y: 0 })
    lastMousePos.current = { x: t.clientX, y: t.clientY }
  }, [])

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return
    e.preventDefault()
    const t = e.touches[0]
    const dx = t.clientX - lastMousePos.current.x
    const dy = t.clientY - lastMousePos.current.y
    setRotation(prev => ({
      x: normalizeAngle(prev.x + clamp(-dy * dragSensitivity)),
      y: normalizeAngle(prev.y + clamp(dx * dragSensitivity)),
      z: prev.z,
    }))
    setVelocity({ x: clamp(-dy * dragSensitivity), y: clamp(dx * dragSensitivity) })
    lastMousePos.current = { x: t.clientX, y: t.clientY }
  }, [isDragging, dragSensitivity, clamp])

  const handleTouchEnd = useCallback(() => setIsDragging(false), [])

  useEffect(() => { setIsMounted(true) }, [])
  useEffect(() => { setImagePositions(generateSpherePositions()) }, [generateSpherePositions])

  useEffect(() => {
    if (!isMounted) return
    const animate = () => {
      updateMomentum()
      animationFrame.current = requestAnimationFrame(animate)
    }
    animationFrame.current = requestAnimationFrame(animate)
    return () => { if (animationFrame.current) cancelAnimationFrame(animationFrame.current) }
  }, [isMounted, updateMomentum])

  useEffect(() => {
    if (!isMounted) return
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('touchmove', handleTouchMove, { passive: false })
    document.addEventListener('touchend', handleTouchEnd)
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }, [isMounted, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd])

  const worldPositions = calculateWorldPositions()

  const renderNode = useCallback((image: ImageData, index: number) => {
    const pos = worldPositions[index]
    if (!pos || !pos.isVisible) return null
    const size = baseImageSize * pos.scale
    const isHovered = hoveredIndex === index
    const finalScale = isHovered ? Math.min(1.3, 1.3 / pos.scale) : 1

    return (
      <div
        key={image.id}
        className="absolute cursor-pointer select-none transition-transform duration-200 ease-out"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          left: `${containerSize / 2 + pos.x}px`,
          top: `${containerSize / 2 + pos.y}px`,
          opacity: pos.fadeOpacity,
          transform: `translate(-50%, -50%) scale(${finalScale})`,
          zIndex: pos.zIndex,
        }}
        onMouseEnter={() => setHoveredIndex(index)}
        onMouseLeave={() => setHoveredIndex(null)}
        onClick={() => setSelectedImage(image)}
      >
        {/* Logo card — white bg, padding, rounded */}
        <div className="relative w-full h-full rounded-xl overflow-hidden bg-white shadow-[0_4px_16px_rgba(0,0,0,0.10)] border border-black/6 p-[12%]">
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-contain"
            draggable={false}
            loading={index < 3 ? 'eager' : 'lazy'}
          />
        </div>
      </div>
    )
  }, [worldPositions, baseImageSize, containerSize, hoveredIndex])

  if (!isMounted) return (
    <div className="bg-foreground/5 rounded-2xl animate-pulse" style={{ width: containerSize, height: containerSize }} />
  )

  if (!images.length) return null

  return (
    <>
      <div
        ref={containerRef}
        className={`relative select-none cursor-grab active:cursor-grabbing ${className}`}
        style={{ width: containerSize, height: containerSize, perspective: `${perspective}px` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* Center content sits below sphere nodes */}
        {centerContent && (
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ zIndex: 5 }}
          >
            {centerContent}
          </div>
        )}
        <div className="relative w-full h-full" style={{ zIndex: 10 }}>
          {images.map((img, i) => renderNode(img, i))}
        </div>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="bg-white rounded-2xl p-8 max-w-[260px] w-full flex flex-col items-center gap-4 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="w-24 h-24 object-contain"
            />
            {selectedImage.title && (
              <p className="text-base font-bold text-foreground text-center">{selectedImage.title}</p>
            )}
            <button
              onClick={() => setSelectedImage(null)}
              className="p-2 rounded-full bg-foreground/8 hover:bg-foreground/12 transition-colors"
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default SphereImageGrid
