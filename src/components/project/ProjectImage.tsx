import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface ProjectImageProps {
  src: string
  alt?: string
}

export default function ProjectImage({ src, alt = '' }: ProjectImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.figure
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="editorial-block py-8"
    >
      <img src={src} alt={alt} className="w-full h-auto block rounded-[24px] shadow-[0_4px_24px_rgba(0,0,0,0.08),0_1px_8px_rgba(0,0,0,0.04)]" loading="lazy" />
    </motion.figure>
  )
}
