import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import IpadMockup from './IpadMockup'
import MichaelScreenCarousel from './MichaelScreenCarousel'
import type { Project } from '../../data/projects'

const SITE_URL = 'https://michaelsocial.vercel.app/#hero'
const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

function FadeIn({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function SectionText({
  sectionNumber,
  title,
  body,
}: {
  sectionNumber?: string
  title: string
  body: string[]
}) {
  return (
    <div className="text-left py-10">
      {sectionNumber && (
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted mb-4">
          {sectionNumber}
        </p>
      )}
      <h3 className="text-xl md:text-2xl font-bold text-foreground mb-6 leading-snug">{title}</h3>
      {body.map((p, i) => (
        <p key={i} className="text-base md:text-lg text-muted leading-[1.85] mb-5 last:mb-0">
          {p}
        </p>
      ))}
    </div>
  )
}

function Subheading({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="text-lg md:text-xl font-bold text-foreground mb-4 mt-2">{children}</h4>
  )
}

function BodyText({ children }: { children: string }) {
  return <p className="text-base md:text-lg text-muted leading-[1.85] mb-8">{children}</p>
}

function SiteCta({ accentColor }: { accentColor: string }) {
  return (
    <div className="text-center mt-8">
      <a
        href={SITE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex flex-col items-center gap-2 group michael-site-cta"
        style={{ ['--michael-accent' as string]: accentColor }}
      >
        <span className="text-base md:text-lg font-semibold text-foreground transition-colors group-hover:underline underline-offset-4 [.group:hover_&]:text-[var(--michael-accent)]">
          Click to explore the live site →
        </span>
        <span className="text-base md:text-lg font-semibold text-muted transition-colors group-hover:underline underline-offset-4 [.group:hover_&]:text-[var(--michael-accent)]">
          michaelsocial.vercel.app
        </span>
      </a>
    </div>
  )
}

interface MichaelProjectContentProps {
  project: Project
}

export default function MichaelProjectContent({ project }: MichaelProjectContentProps) {
  const accentColor = project.accentColor
  const problem = project.sections.find((s) => s.sectionNumber === '01')
  const solution = project.sections.find((s) => s.sectionNumber === '02')
  const process = project.sections.find((s) => s.sectionNumber === '04')
  const technical = project.sections.find((s) => s.sectionNumber === '05')

  return (
    <div className="michael-content w-full pb-8 text-left">
      <FadeIn className="py-12">
        <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
          Michael's Social - Portfolio &amp; CRM
        </h2>
        <p className="text-base md:text-lg text-muted leading-[1.85]">
          This is a personal branding website for a content creator. It also includes a custom
          dashboard to help manage clients, tasks, and workflows in an organized and efficient way.
        </p>
      </FadeIn>

      <FadeIn className="py-12">
        <a
          href={SITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="block group"
          aria-label="Open Michael's live site"
        >
          <IpadMockup>
            <video
              src="/Michael/Screen video.mov"
              className="w-full h-auto block"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/Michael/michael hero section.png"
            />
          </IpadMockup>
        </a>
        <SiteCta accentColor={accentColor} />
      </FadeIn>

      {problem?.body && (
        <FadeIn>
          <SectionText
            sectionNumber="01"
            title={problem.title ?? ''}
            body={problem.body}
          />
        </FadeIn>
      )}

      {solution?.body && (
        <FadeIn>
          <SectionText
            sectionNumber="02"
            title={solution.title ?? ''}
            body={solution.body}
          />
        </FadeIn>
      )}

      <FadeIn className="py-12">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted mb-4">03</p>
        <Subheading>Immersive Video Portfolio</Subheading>
        <BodyText>
          The front-end uses dynamic video and genre filters to make Michael&apos;s work stand
          out. The navigation helps potential clients move easily from his top projects to a full
          library of his work, creating a smooth and high-quality experience.
        </BodyText>
        <IpadMockup className="mt-10">
          <img
            src="/Michael/New york experience.png"
            alt=""
            className="w-full h-auto block"
            loading="lazy"
          />
        </IpadMockup>
      </FadeIn>

      {process?.body && (
        <FadeIn>
          <SectionText
            sectionNumber="04"
            title={process.title ?? ''}
            body={process.body}
          />
        </FadeIn>
      )}

      <FadeIn className="py-12">
        <div className="flex flex-col items-center gap-8 md:gap-10 max-w-4xl mx-auto">
          <IpadMockup>
            <img
              src="/Michael/lets talk.png"
              alt=""
              className="w-full h-auto block"
              loading="lazy"
            />
          </IpadMockup>

          <div className="text-muted" aria-hidden>
            <svg
              className="w-10 h-10 md:w-12 md:h-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
              />
            </svg>
          </div>

          <IpadMockup>
            <img
              src="/Michael/dashboard.png"
              alt=""
              className="w-full h-auto block"
              loading="lazy"
            />
          </IpadMockup>
        </div>
      </FadeIn>

      <FadeIn className="py-12">
        <Subheading>Key Features: Designed for Growth</Subheading>
        <BodyText>
          The platform was built to bridge the gap between creative expression and professional
          reliability.
        </BodyText>

        <Subheading>Centralized Business Dashboard</Subheading>
        <BodyText>
          The back-end gives Michael tools to track leads, schedule easily with an automated
          calendar, and manage projects and daily tasks. This turns his portfolio into a tool that
          can grow with his business.
        </BodyText>

        <MichaelScreenCarousel accentColor={accentColor} />
      </FadeIn>

      {technical?.body && (
        <FadeIn className="py-12">
          <SectionText
            sectionNumber="05"
            title={technical.title ?? ''}
            body={technical.body}
          />
        </FadeIn>
      )}
    </div>
  )
}
