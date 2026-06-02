import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface ParallaxImageProps {
  src: string
  alt: string
  className?: string
  strength?: number
}

export default function ParallaxImage({
  src,
  alt,
  className = '',
  strength = 40,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [-strength, strength])

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y }}
        className="w-full h-full object-cover scale-110"
      />
    </div>
  )
}
