import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import ProjectStats from './ProjectStats'
import type { ProjectSection as Section } from '../../data/projects'

interface ProjectSectionProps {
  section: Section
}

export default function ProjectSection({ section }: ProjectSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const { sectionNumber, title, body, bullets, stats, disclaimer } = section
  const hasContent =
    title || body?.length || bullets?.length || stats || disclaimer

  if (!hasContent) return null

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="editorial-block py-10 text-left"
    >
      {sectionNumber && (
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted mb-4">
          {sectionNumber}
        </p>
      )}
      {title && (
        <h3 className="text-xl md:text-2xl font-bold text-foreground mb-6 leading-snug">
          {title}
        </h3>
      )}
      {body?.map((paragraph, i) => (
        <p
          key={i}
          className="text-base md:text-lg text-muted leading-[1.85] mb-5 last:mb-0"
        >
          {paragraph}
        </p>
      ))}
      {bullets && bullets.length > 0 && (
        <ul className="mt-2 space-y-5">
          {bullets.map((item, i) => (
            <li
              key={i}
              className="text-base md:text-lg text-muted leading-[1.85] list-none"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
      {stats && <ProjectStats title={stats.title} rows={stats.rows} />}
      {disclaimer && (
        <p className="mt-8 text-sm text-muted/80 italic border-t border-foreground/10 pt-8">
          {disclaimer}
        </p>
      )}
    </motion.div>
  )
}
