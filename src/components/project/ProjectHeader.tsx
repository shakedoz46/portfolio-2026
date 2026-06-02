import { motion } from 'framer-motion'
import Tag from '../ui/Tag'
import type { Project } from '../../data/projects'

interface ProjectHeaderProps {
  project: Project
}

const META_FIELDS = [
  { key: 'year' as const, label: 'Year' },
  { key: 'industry' as const, label: 'Industry' },
  { key: 'role' as const, label: 'Role' },
  { key: 'client' as const, label: 'Client' },
]

export default function ProjectHeader({ project }: ProjectHeaderProps) {
  const { tag, title, titleLines, subtitle, accentColor } = project

  return (
    <header className="w-full">
      <div
        className="w-full pt-24 pb-16"
        style={{
          background: `linear-gradient(180deg, ${accentColor}2B 0%, ${accentColor}12 66%, #F9F9F7 100%)`,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="editorial-main text-left"
        >
          <Tag label={tag} color={accentColor} className="mb-8" />

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight text-foreground mb-3">
            {titleLines ? (
              <>
                {titleLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </>
            ) : (
              title
            )}
          </h1>
          <h2 className="text-xl md:text-2xl font-semibold text-muted mb-10">{subtitle}</h2>

          <dl className="pt-8 border-t border-foreground/10 grid grid-cols-2 gap-x-8 gap-y-8 md:flex md:flex-row md:flex-wrap md:gap-x-16 md:gap-y-0">
            {META_FIELDS.map(({ key, label }) => (
              <div key={key} className="min-w-0">
                <dt className="text-xs font-medium uppercase tracking-widest text-muted mb-1.5">
                  {label}
                </dt>
                <dd
                  className="text-sm md:text-base font-bold leading-snug m-0"
                  style={{ color: accentColor }}
                >
                  {project[key]}
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </header>
  )
}
