import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Tag from '../components/ui/Tag'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

const ABOUT_TEXT =
  'Product Designer with a strong foundation in UX/UI, product thinking, and AI-assisted design workflows. Passionate about solving complex problems, designing scalable digital experiences, and leveraging emerging technologies to improve both user experiences and design processes.'

const EXPERIENCE = [
  {
    company: 'DataPlus',
    type: 'Startup',
    role: 'AI Creative & Product Designer',
    date: 'Jan 2026',
    bullets: [
      'Joined an early-stage AI startup focused on human data and AI-generated digital models, contributing to product validation and growth initiatives.',
      'Designed and optimized AI-driven workflows using prompt engineering, QA systems, and automation tools to improve production efficiency.',
      'Worked extensively with AI tools, including Claude Code and image-generation platforms, while applying product thinking to streamline processes and improve user experience.',
    ],
  },
  {
    company: 'Deploy',
    type: 'Freelance',
    role: 'Freelancer Product Designer & Manager',
    date: 'Oct 2025',
    bullets: [
      'Led end-to-end design projects for clients across different industries, understood business needs, gathered requirements, and transformed ideas into practical digital solutions.',
      'Collaborated with remote development teams and managed project workflows throughout implementation.',
      'Identified product gaps and designed key interfaces, admin tools, and supporting features required for efficient product operations and user management.',
    ],
  },
  {
    company: 'Flowmo',
    type: 'Startup',
    role: 'Product Design Intern',
    date: 'Sep 2025',
    bullets: [
      'Collaborated with the design team, gaining hands-on experience in design processes and product development.',
      "Improved the product's user experience through design exploration and usability enhancements.",
      "Created marketing and visual content (website) to promote Flowmo's brand using AI tools.",
    ],
  },
]

const EDUCATION = [
  {
    institution: 'Studio 6B',
    degree: 'UX/UI and Graphic Design',
    date: 'Sep 2024',
    bullets: [
      "Took part of the studio's excellence program.",
      'Applied core principles of visual design, composition, and typography in the creation of complex digital products, apps, and websites.',
      'Created numerous AI-generated assets while working on branding projects, app design, and digital experiences — gaining extensive experience in prompt engineering and creative AI tools.',
    ],
  },
  {
    institution: 'ORT Givat Ram',
    degree: 'High School Diploma in Robotics',
    date: 'Sep 2019',
    bullets: [
      'Graduated with 20 academic units, specialized in robotics, mechatronics, and electronics.',
      'FRC robotics competitions — Mechanical team leader and main driver.',
    ],
  },
]

function FadeIn({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function AboutPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-background"
    >
      <div className="editorial-main project-typography pb-16">

        {/* Page header — matches project page style */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="pt-24 pb-10"
        >
          <Tag label="Product Designer" className="mb-6" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight text-foreground">
            About me
          </h1>
        </motion.div>

        {/* Photo + about text — vertically centered to each other */}
        <FadeIn className="flex flex-col md:flex-row gap-10 md:gap-14 items-center pb-10">
          {/* Animated photo */}
          <motion.div
            className="shrink-0 w-[200px] md:w-[220px] cursor-pointer"
            whileHover={{ y: -10, scale: 1.05 }}
            transition={{ duration: 0.35, ease }}
          >
            <div className="aspect-square overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/5 shadow-[0_16px_40px_-10px_rgba(0,0,0,0.22)] hover:shadow-[0_24px_56px_-12px_rgba(0,0,0,0.28)] transition-shadow">
              <img
                src="/about/shaked.jpg"
                alt="Shaked Oz"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </motion.div>

          {/* About text */}
          <div className="flex-1 min-w-0">
            <h2 className="text-foreground mb-5">Shaked Oz</h2>
            <p className="text-muted">{ABOUT_TEXT}</p>
          </div>
        </FadeIn>

        {/* Experience */}
        <FadeIn className="py-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted mb-4">
            Professional Experience
          </p>

          {EXPERIENCE.map((job, i) => (
            <FadeIn key={job.company} delay={i * 0.06} className="border-t border-foreground/10 py-8">
              <h3 className="text-foreground mb-1">
                {job.company}
                <span className="font-normal text-muted ml-2 text-base">· {job.type}</span>
              </h3>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted mb-1">
                {job.role}
              </p>
              <p className="text-xs text-muted mb-5">{job.date}</p>
              <ul className="space-y-3">
                {job.bullets.map((b, bi) => (
                  <li key={bi} className="flex gap-3 text-muted">
                    <span className="mt-[0.65em] shrink-0 w-1 h-1 rounded-full bg-foreground/25" />
                    {b}
                  </li>
                ))}
              </ul>
            </FadeIn>
          ))}
        </FadeIn>

        {/* Education */}
        <FadeIn className="py-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted mb-4">
            Education
          </p>

          {EDUCATION.map((edu, i) => (
            <FadeIn key={edu.institution} delay={i * 0.06} className="border-t border-foreground/10 py-8">
              <h3 className="text-foreground mb-1">{edu.institution}</h3>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted mb-1">
                {edu.degree}
              </p>
              <p className="text-xs text-muted mb-5">{edu.date}</p>
              <ul className="space-y-3">
                {edu.bullets.map((b, bi) => (
                  <li key={bi} className="flex gap-3 text-muted">
                    <span className="mt-[0.65em] shrink-0 w-1 h-1 rounded-full bg-foreground/25" />
                    {b}
                  </li>
                ))}
              </ul>
            </FadeIn>
          ))}
        </FadeIn>

      </div>
    </motion.div>
  )
}
