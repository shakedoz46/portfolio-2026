import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { Project } from '../../data/projects'

interface ProjectNavProps {
  next: Project
}

export default function ProjectNav({ next }: ProjectNavProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="mt-8 border-t border-foreground/10 text-left"
    >
      <Link
        to={`/project/${next.slug}`}
        className="group block py-16 hover:bg-foreground/[0.02] transition-colors rounded-2xl"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted mb-3">
          Next Project
        </p>
        <p className="text-2xl md:text-3xl font-black text-foreground group-hover:text-foreground/70 transition-colors">
          {next.title} →
        </p>
        <p className="text-base text-muted mt-2">{next.subtitle}</p>
      </Link>
    </motion.div>
  )
}
