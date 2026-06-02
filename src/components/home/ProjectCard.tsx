import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import Tag from '../ui/Tag'
import type { Project } from '../../data/projects'

interface ProjectCardProps {
  project: Project
  index: number
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [-20, 20])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
        delay: (index % 2) * 0.1,
      }}
    >
      <Link to={`/project/${project.slug}`} className="group block">
        {/* Cover image */}
        <div className="relative overflow-hidden rounded-2xl bg-foreground/5 aspect-[4/3] mb-5">
          <motion.img
            src={project.coverImage}
            alt={project.title}
            style={{ y }}
            className="absolute inset-0 w-full h-full object-cover scale-110 group-hover:scale-[1.13] transition-transform duration-700 ease-out"
            loading="lazy"
          />
          {/* Overlay on hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
            style={{ backgroundColor: project.accentColor }}
          />
        </div>

        {/* Card info */}
        <div className="px-1">
          <Tag label={project.tag} color={project.accentColor} className="mb-3" />
          <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-foreground/70 transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-muted">{project.subtitle}</p>
        </div>
      </Link>
    </motion.div>
  )
}
