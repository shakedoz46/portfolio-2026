import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { ProjectStatRow } from '../../data/projects'

interface ProjectStatsProps {
  title?: string
  rows: ProjectStatRow[]
}

export default function ProjectStats({ title, rows }: ProjectStatsProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="py-10 text-left"
    >
      {title && (
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted mb-6">
          {title}
        </p>
      )}
      <div className="overflow-x-auto rounded-2xl border border-foreground/10">
        <table className="w-full min-w-[480px] text-xs md:text-sm">
          <thead>
            <tr className="border-b border-foreground/10 bg-foreground/[0.03]">
              <th className="px-3 py-2.5 md:px-6 md:py-4 text-left font-semibold text-foreground">
                Metric
              </th>
              <th className="px-3 py-2.5 md:px-6 md:py-4 text-left font-semibold text-muted">
                Traditional Workflow
              </th>
              <th className="px-3 py-2.5 md:px-6 md:py-4 text-left font-semibold text-foreground">
                Our AI Solution
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.metric}
                className={i < rows.length - 1 ? 'border-b border-foreground/10' : ''}
              >
                <td className="px-3 py-2.5 md:px-6 md:py-4 text-left font-medium text-foreground">
                  {row.metric}
                </td>
                <td className="px-3 py-2.5 md:px-6 md:py-4 text-left text-muted">
                  {row.traditional}
                </td>
                <td className="px-3 py-2.5 md:px-6 md:py-4 text-left font-semibold text-foreground">
                  {row.ours}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}
