import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { heroLogoCards } from '../../data/heroLogos'
import { cn } from '../../lib/cn'

const easeOut = [0.22, 1, 0.36, 1] as [number, number, number, number]

function buildPoses(count: number) {
  if (count === 1) return [{ rotate: 0, z: 1 }]
  const spread = 14
  return Array.from({ length: count }, (_, i) => ({
    rotate: -spread / 2 + (spread / (count - 1)) * i,
    z: i + 1,
  }))
}

interface NextProjectPickerProps {
  currentSlug: string
}

export default function NextProjectPicker({ currentSlug }: NextProjectPickerProps) {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const cards = heroLogoCards.filter((c) => c.slug !== currentSlug)
  const poses = buildPoses(cards.length)

  return (
    <div ref={ref} className="mt-8 border-t border-foreground/10 pt-16 pb-20 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted mb-12 md:mb-16">
        Next Project
      </p>

      {/* Desktop: fan */}
      <motion.div
        className="hidden md:flex justify-center items-center"
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: easeOut }}
      >
        <div className="flex items-center justify-center px-2">
          {cards.map((card, i) => {
            const pose = poses[i]
            const isHovered = hoveredSlug === card.slug
            const isAnyHovered = hoveredSlug !== null

            return (
              <motion.div
                key={card.slug}
                className="relative shrink-0 w-[clamp(80px,15vw,180px)] aspect-square first:ml-0 -ml-[clamp(12px,2.8vw,32px)]"
                animate={{
                  y: isHovered ? -12 : 0,
                  scale: isHovered ? 1.12 : 1,
                  rotate: isHovered ? 0 : pose.rotate,
                  zIndex: isHovered ? 50 : pose.z,
                }}
                transition={{ duration: 0.32, ease: easeOut }}
                onHoverStart={() => setHoveredSlug(card.slug)}
                onHoverEnd={() => setHoveredSlug(null)}
              >
                <motion.span
                  className="pointer-events-none absolute -top-8 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap text-sm font-semibold text-foreground"
                  animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 5 }}
                  transition={{ duration: 0.18 }}
                  aria-hidden={!isHovered}
                >
                  {card.label}
                </motion.span>

                <Link
                  to={`/project/${card.slug}`}
                  className={cn(
                    'block h-full w-full overflow-hidden rounded-2xl border border-foreground/10 bg-white shadow-[0_16px_40px_-10px_rgba(0,0,0,0.22)] transition-shadow',
                    isHovered && 'shadow-[0_24px_56px_-12px_rgba(0,0,0,0.28)]',
                    isAnyHovered && !isHovered && 'brightness-[0.97]'
                  )}
                  aria-label={`View ${card.label} case study`}
                >
                  <img
                    src={card.src}
                    alt=""
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </Link>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Mobile: horizontal row of smaller cards */}
      <div className="md:hidden flex justify-center items-center gap-3 flex-wrap px-4">
        {cards.map((card, i) => (
          <motion.div
            key={card.slug}
            className="flex flex-col items-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.07, duration: 0.4, ease: easeOut }}
          >
            <Link
              to={`/project/${card.slug}`}
              aria-label={`View ${card.label} case study`}
              className="block w-16 h-16 rounded-xl overflow-hidden border border-foreground/10 bg-white shadow-md active:scale-95 transition-transform"
            >
              <img src={card.src} alt="" className="w-full h-full object-cover" loading="lazy" />
            </Link>
            <span className="text-[11px] font-medium text-muted">{card.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
