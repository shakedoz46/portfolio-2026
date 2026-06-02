import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { heroLogoCards } from '../../data/heroLogos'
import { projects } from '../../data/projects'
import { cn } from '../../lib/cn'

const easeOut = [0.22, 1, 0.36, 1] as [number, number, number, number]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
}

const titleVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeOut },
  },
}

const descVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
}

/** Resting fan: slight tilt, left -> right z-order */
const CARD_POSE = [
  { rotate: -7, z: 1 },
  { rotate: -3.5, z: 2 },
  { rotate: 0, z: 3 },
  { rotate: 3.5, z: 4 },
  { rotate: 7, z: 5 },
] as const

const gridBackgroundStyle: React.CSSProperties = {
  backgroundImage:
    'linear-gradient(rgba(26,26,26,0.07) 1px, transparent 1px), linear-gradient(to right, rgba(26,26,26,0.07) 1px, transparent 1px)',
  backgroundSize: '3rem 3rem',
}

function HeroLogoCard({
  card,
  index,
  hoveredSlug,
  onHover,
}: {
  card: (typeof heroLogoCards)[number]
  index: number
  hoveredSlug: string | null
  onHover: (slug: string | null) => void
}) {
  const pose = CARD_POSE[index]
  const isHovered = hoveredSlug === card.slug
  const isAnyHovered = hoveredSlug !== null

  return (
    <motion.div
      className="relative shrink-0 w-[clamp(88px,17vw,200px)] aspect-square first:ml-0 -ml-[clamp(14px,3.2vw,36px)]"
      initial={{ opacity: 0, y: 36, scale: 0.9 }}
      animate={{
        opacity: 1,
        y: isHovered ? -11 : 0,
        scale: isHovered ? 1.1 : 1,
        rotate: isHovered ? 0 : pose.rotate,
        zIndex: isHovered ? 50 : pose.z,
      }}
      transition={{ duration: 0.35, ease: easeOut, delay: index * 0.06 }}
      onHoverStart={() => onHover(card.slug)}
      onHoverEnd={() => onHover(null)}
    >
      <motion.span
        className="pointer-events-none absolute -top-9 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap text-sm font-semibold text-foreground"
        initial={false}
        animate={{
          opacity: isHovered ? 1 : 0,
          y: isHovered ? 0 : 6,
        }}
        transition={{ duration: 0.2 }}
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
          loading={index >= 2 ? 'eager' : 'lazy'}
        />
      </Link>
    </motion.div>
  )
}

interface PortfolioHeroProps {
  className?: string
}

export default function PortfolioHero({ className }: PortfolioHeroProps) {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null)
  const hoveredProject = projects.find((project) => project.slug === hoveredSlug)
  const dynamicAccent = hoveredProject?.accentColor ?? '#1A1A1A'

  return (
    <section
      className={cn(
        'relative bg-background text-foreground md:h-dvh md:overflow-hidden',
        className
      )}
    >
      <div className="absolute inset-0" style={gridBackgroundStyle} aria-hidden />
      <div
        className="absolute inset-0 bg-gradient-to-b from-background via-background/94 to-background"
        aria-hidden
      />

      <motion.div
        className="relative z-20 mx-auto flex md:h-full max-w-6xl flex-col items-center justify-center gap-8 md:gap-10 px-4 pt-20 pb-12 md:px-8 md:pt-24 md:pb-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div
          className="flex w-full flex-col items-center text-center"
          variants={containerVariants}
        >
          <motion.h1
            className="max-w-4xl text-4xl font-black tracking-tight md:text-5xl lg:text-6xl lg:leading-[1.05]"
            variants={titleVariants}
          >
            Your search for a Designer ends right here.
          </motion.h1>

          <motion.p
            className="mt-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground/85"
            variants={titleVariants}
          >
            Hello, I&apos;m Shaked
          </motion.p>

          <motion.p
            className="mt-5 max-w-4xl text-lg text-foreground md:text-xl"
            variants={descVariants}
          >
            <span
              className="font-medium transition-colors duration-300"
              style={{ color: dynamicAccent }}
            >
              A Product Designer with young energy and battle-tested market experience.
            </span>
            <br />
            I don&apos;t just design pixels, I build scalable systems and solve business problems.
          </motion.p>
        </motion.div>

        <motion.div
          className="flex w-full justify-center"
          variants={descVariants}
        >
          {/* Desktop: horizontal fan */}
          <div className="hidden md:flex w-full max-w-[min(100%,1100px)] items-center justify-center px-1 sm:px-2">
            {heroLogoCards.map((card, i) => (
              <HeroLogoCard
                key={card.slug}
                card={card}
                index={i}
                hoveredSlug={hoveredSlug}
                onHover={setHoveredSlug}
              />
            ))}
          </div>

          {/* Mobile: vertical list */}
          <div className="md:hidden flex flex-col items-center gap-3 w-full px-4">
            {heroLogoCards.map((card, i) => (
              <motion.div
                key={card.slug}
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 }}
                className="w-full max-w-[340px]"
              >
                <Link
                  to={`/project/${card.slug}`}
                  className="group flex items-center gap-4 rounded-2xl border border-foreground/10 bg-white/60 p-3 shadow-sm backdrop-blur-sm overflow-hidden"
                  aria-label={`View ${card.label} case study`}
                >
                  <div className="w-14 h-14 shrink-0 rounded-xl overflow-hidden border border-foreground/8 bg-white">
                    <img src={card.src} alt="" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-sm font-semibold text-foreground group-hover:text-foreground/70 transition-colors">
                    {card.label}
                  </span>
                  <span className="ml-auto text-muted text-sm">→</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.p
          className="max-w-xl text-center text-xs text-foreground/80 md:text-sm"
          variants={descVariants}
        >
          Selected case studies in product design, systems thinking,
          <br />
          and AI-powered experiences.
        </motion.p>
      </motion.div>
    </section>
  )
}
