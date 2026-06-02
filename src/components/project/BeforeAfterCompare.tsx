import { useRef, useState, useCallback, useLayoutEffect, useEffect } from 'react'

interface BeforeAfterCompareProps {
  beforeSrc: string
  afterSrc: string
}

export default function BeforeAfterCompare({ beforeSrc, afterSrc }: BeforeAfterCompareProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState(50)
  const [dims, setDims] = useState({ width: 0, height: 0 })
  const [imagesReady, setImagesReady] = useState(false)

  useEffect(() => {
    let loaded = 0
    const onLoad = () => {
      loaded += 1
      if (loaded >= 2) setImagesReady(true)
    }
    const before = new Image()
    const after = new Image()
    before.onload = onLoad
    after.onload = onLoad
    before.onerror = onLoad
    after.onerror = onLoad
    before.src = beforeSrc
    after.src = afterSrc
    setImagesReady(false)
  }, [beforeSrc, afterSrc])

  const measure = useCallback(() => {
    const box = containerRef.current
    if (!box) return
    const width = box.clientWidth
    if (width === 0) return
    const after = new Image()
    after.src = afterSrc
    after.onload = () => {
      const ratio = after.naturalHeight / after.naturalWidth
      setDims({
        width,
        height: Math.round(width * ratio),
      })
    }
    if (after.complete && after.naturalWidth > 0) {
      const ratio = after.naturalHeight / after.naturalWidth
      setDims({ width, height: Math.round(width * ratio) })
    }
  }, [afterSrc])

  useLayoutEffect(() => {
    if (!imagesReady) return
    measure()
    const ro = new ResizeObserver(measure)
    if (containerRef.current) ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [measure, imagesReady])

  const updatePosition = useCallback((clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = ((clientX - rect.left) / rect.width) * 100
    setPosition(Math.min(100, Math.max(0, x)))
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => updatePosition(e.clientX)

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) updatePosition(e.touches[0].clientX)
  }

  const ready = imagesReady && dims.height > 0

  return (
    <div
      ref={containerRef}
      className="relative w-full select-none cursor-col-resize"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      role="img"
      aria-label="Before and after comparison. Drag to compare; position stays where you release."
    >
      <div
        className="relative w-full overflow-hidden bg-[#0a0a0a]"
        style={{
          height: ready ? dims.height : 280,
        }}
      >
        {ready && (
          <>
            <img
              src={afterSrc}
              alt=""
              draggable={false}
              className="absolute inset-0 w-full h-full object-cover object-left-top"
            />

            <div
              className="absolute top-0 left-0 z-10 h-full overflow-hidden"
              style={{ width: `${position}%` }}
            >
              <img
                src={beforeSrc}
                alt=""
                draggable={false}
                className="absolute top-0 left-0 h-full object-cover object-left-top"
                style={{ width: dims.width, maxWidth: 'none' }}
              />
            </div>

            <div
              className="absolute top-0 z-20 w-px bg-white/90 shadow-[0_0_12px_rgba(0,0,0,0.35)] pointer-events-none"
              style={{
                left: `${position}%`,
                height: dims.height,
                transform: 'translateX(-50%)',
              }}
              aria-hidden
            />
          </>
        )}
      </div>
    </div>
  )
}
