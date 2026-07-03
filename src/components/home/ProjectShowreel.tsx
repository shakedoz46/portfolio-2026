import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'

const ITEMS = [
  {
    slug: 'ab-testing',
    video: '/logos/cover video/Advary.webm',
    title: 'AdVary',
    subtitle: 'Saved a marketing agency hundreds of dollars per month.',
    tag: 'Complex System',
    accentColor: '#26D095',
  },
  {
    slug: 'reasy',
    video: '/logos/cover video/Reasy.webm',
    title: 'Reasy',
    subtitle: 'Built an end-to-end control system for an application.',
    tag: 'Complex System',
    accentColor: '#0088FF',
  },
  {
    slug: 'michael',
    video: '/logos/cover video/Michael.webm',
    title: "Michael's Social",
    subtitle: 'Helped Michael build his business and manage leads so no opportunity is ever missed.',
    tag: 'Hebrew Project',
    accentColor: '#FF6319',
  },
  {
    slug: 'smeets',
    video: '/logos/cover video/Smeets.webm',
    title: 'Smeets',
    subtitle: 'Created a social app that encourages people to leave home and do sports.',
    tag: 'Application',
    accentColor: '#FFC730',
  },
]

// Container = 4 × 150 = 600vh  →  scroll range = 500vh
// Each section slides in over 20% of progress (= 100vh of scroll):
//   i=0 → always visible (no slide-in)
//   i=1 → progress 0.20 – 0.40
//   i=2 → progress 0.40 – 0.60
//   i=3 → progress 0.60 – 0.80
//   hold → progress 0.80 – 1.00

interface PanelProps {
  item: (typeof ITEMS)[number]
  index: number
  containerProgress: ReturnType<typeof useScroll>['scrollYProgress']
}

function VideoPanel({ item, index, containerProgress }: PanelProps) {
  const [hovered, setHovered] = useState(false)

  // Hook called unconditionally — for index 0 we just won't use the value
  const yMotion = useTransform(
    containerProgress,
    [index * 0.2, (index + 1) * 0.2, 1],
    ['100%', '0%', '0%'],
  )

  const y = index === 0 ? '0%' : yMotion

  return (
    <motion.div
      className="sticky top-0 h-screen overflow-hidden"
      style={{ y, zIndex: index + 1 }}
    >
      <Link
        to={`/project/${item.slug}`}
        className="absolute inset-0 block focus:outline-none"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        tabIndex={0}
        aria-label={`View ${item.title} case study`}
      >
        {/* Looping video background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={item.video} type="video/webm" />
        </video>

        {/* Permanent subtle dim */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center bg-black/52"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          aria-hidden
        >
          <div className="text-center px-6 max-w-3xl">
            <h2 className="text-5xl font-black text-white md:text-7xl mb-4 leading-tight">
              {item.title}
            </h2>
            <p className="text-lg text-white/85 md:text-xl max-w-xl mx-auto mb-8 leading-relaxed">
              {item.subtitle}
            </p>
            <span className="inline-block rounded-full border-2 border-white/70 px-7 py-3 text-sm font-bold text-white tracking-wide hover:bg-white/10 transition-colors">
              View Case Study →
            </span>
          </div>
        </motion.div>

        {/* Tag — top right */}
        <div className="absolute top-5 right-5 z-20">
          <span
            className="block rounded-full px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.13em] text-white backdrop-blur-sm"
            style={{ background: item.accentColor + 'bb' }}
          >
            {item.tag}
          </span>
        </div>
      </Link>
    </motion.div>
  )
}

export default function ProjectShowreel() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  return (
    <>
      {/* Desktop: parallax stack */}
      <div
        ref={containerRef}
        className="relative hidden md:block"
        style={{ height: `${ITEMS.length * 150}vh` }}
      >
        {ITEMS.map((item, i) => (
          <VideoPanel
            key={item.slug}
            item={item}
            index={i}
            containerProgress={scrollYProgress}
          />
        ))}
      </div>

      {/* Mobile: simple vertical list */}
      <div className="md:hidden">
        {ITEMS.map((item) => (
          <Link
            key={item.slug}
            to={`/project/${item.slug}`}
            className="relative block overflow-hidden"
            style={{ height: '70vw' }}
            aria-label={`View ${item.title} case study`}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            >
              <source src={item.video} type="video/webm" />
            </video>
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex items-end justify-between p-5">
              <div className="flex-1 pr-3">
                <p className="text-white font-black text-2xl leading-tight mb-1">{item.title}</p>
                <p className="text-white/75 text-sm leading-snug line-clamp-2">{item.subtitle}</p>
              </div>
              <span
                className="flex-none self-start rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white backdrop-blur-sm"
                style={{ background: item.accentColor + 'bb' }}
              >
                {item.tag}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
