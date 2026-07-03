import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { projects } from '../../data/projects'

const easeOut = [0.22, 1, 0.36, 1] as [number, number, number, number]

const VIDEO_MAP: Record<string, string> = {
  'ab-testing': '/logos/cover video/Advary.webm',
  'reasy': '/logos/cover video/Reasy.webm',
  'michael': '/logos/cover video/Michael.webm',
  'smeets': '/logos/cover video/Smeets.webm',
}

interface NextProjectPickerProps {
  currentSlug: string
}

export default function NextProjectPicker({ currentSlug }: NextProjectPickerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const others = projects.filter(p => p.slug !== currentSlug)

  return (
    <div ref={ref} className="mt-6 border-t border-foreground/10 pt-8 pb-10">
      {/* Section label — div avoids project-typography p override */}
      <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted mb-5 md:mb-6 text-center">
        More Case Studies
      </div>

      {/* Desktop: landscape video cards */}
      <motion.div
        className="hidden md:grid gap-3"
        style={{ gridTemplateColumns: `repeat(${others.length}, 1fr)` }}
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: easeOut }}
      >
        {others.map(project => (
          <Link
            key={project.slug}
            to={`/project/${project.slug}`}
            className="group relative block overflow-hidden rounded-xl aspect-[4/3]"
            aria-label={`View ${project.title} case study`}
          >
            <video
              autoPlay muted loop playsInline
              className="absolute inset-0 w-full h-full object-cover"
              src={VIDEO_MAP[project.slug]}
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/45 transition-colors duration-300" />
            <div
              className="absolute bottom-0 left-0 right-0 h-3/4"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 100%)' }}
            />
            {/* Text — divs to bypass .project-typography p override */}
            <div className="absolute bottom-0 left-0 p-4">
              <div className="text-white font-black leading-tight tracking-tight" style={{ fontSize: '1.15rem' }}>
                {project.title}
              </div>
              <div className="text-white/55 leading-snug mt-1 line-clamp-2" style={{ fontSize: '0.7rem' }}>
                {project.subtitle}
              </div>
            </div>
            <div className="absolute top-3 right-3 z-10">
              <span
                className="block rounded-full px-2.5 py-1 font-bold uppercase text-white backdrop-blur-sm"
                style={{ background: project.accentColor + 'bb', fontSize: '0.6rem', letterSpacing: '0.1em' }}
              >
                {project.tag}
              </span>
            </div>
          </Link>
        ))}
      </motion.div>

      {/* Mobile: portrait video cards */}
      <div className="md:hidden grid grid-cols-3 gap-2 px-0">
        {others.map((project, i) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.07, duration: 0.4, ease: easeOut }}
          >
            <Link
              to={`/project/${project.slug}`}
              className="group relative block overflow-hidden rounded-xl aspect-[2/3]"
              aria-label={`View ${project.title} case study`}
            >
              <video
                autoPlay muted loop playsInline
                className="absolute inset-0 w-full h-full object-cover"
                src={VIDEO_MAP[project.slug]}
              />
              <div className="absolute inset-0 bg-black/38 group-active:bg-black/52 transition-colors" />
              <div
                className="absolute bottom-0 left-0 right-0 h-2/3"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)' }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-2">
                {/* div to bypass .project-typography p */}
                <div className="text-white font-bold leading-tight" style={{ fontSize: '0.65rem' }}>
                  {project.title}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
