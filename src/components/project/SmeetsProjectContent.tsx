import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { Project } from '../../data/projects'

const BRAND = '#FFC730'
const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

const RESEARCH_STATS = [
  {
    value: '91%',
    label: "of participants don't use any app to find sports activities",
    insight: 'Simplicity & Speed',
  },
  {
    value: '76%',
    label: 'report consistent difficulty in finding partners',
    insight: 'Gamified Motivation',
  },
  {
    value: '67%',
    label: 'express dissatisfaction with their weekly activity levels',
    insight: 'High User Activity',
  },
]

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

function BareImage({
  src,
  alt,
  className = '',
}: {
  src: string
  alt: string
  className?: string
}) {
  return <img src={src} alt={alt} className={`block max-w-full h-auto ${className}`} loading="lazy" />
}

const PHONE_CLASS = 'w-[min(100%,168px)] sm:w-[180px] md:w-[200px] shrink-0'

function PhoneMockup({ src, alt }: { src: string; alt: string }) {
  return <BareImage src={src} alt={alt} className={PHONE_CLASS} />
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

function SideBySide({
  phoneSide,
  text,
  twoPhones = false,
  wideGap = false,
  children,
}: {
  phoneSide: 'left' | 'right'
  text: { title?: string; body: string[] }
  twoPhones?: boolean
  wideGap?: boolean
  children: React.ReactNode
}) {
  const gapClass = wideGap ? 'md:gap-[88px]' : 'md:gap-10 lg:gap-14'

  const textBlock = (
    <div className="flex-1 min-w-0 flex flex-col justify-center text-left w-full">
      {text.title && (
        <h4 className="text-lg md:text-xl font-bold text-foreground mb-4">{text.title}</h4>
      )}
      {text.body.map((p, i) => (
        <p key={i} className="text-base text-muted leading-[1.85] break-words">
          {p}
        </p>
      ))}
    </div>
  )

  const phoneBlock = (
    <div
      className={`shrink-0 flex items-center justify-center ${
        twoPhones ? 'gap-[24px]' : ''
      }`}
    >
      {children}
    </div>
  )

  return (
    <div
      className={`flex flex-col md:flex-row ${gapClass} items-stretch md:items-center gap-10 py-12 w-full ${
        phoneSide === 'right' ? 'md:flex-row-reverse' : ''
      }`}
    >
      {phoneBlock}
      {textBlock}
    </div>
  )
}

interface SmeetsProjectContentProps {
  project: Project
}

export default function SmeetsProjectContent({ project }: SmeetsProjectContentProps) {
  const problem = project.sections.find((s) => s.sectionNumber === '01')
  const solution = project.sections.find((s) => s.sectionNumber === '02')
  const takeaway = project.sections.find((s) => s.sectionNumber === '05')

  return (
    <div className="smeets-content w-full pb-8 text-left">
      <FadeIn className="py-12">
        <h2 className="text-3xl md:text-4xl font-black text-foreground mb-6">Smeets - Sport Meeting</h2>
        <p className="text-base md:text-lg text-muted leading-[1.85]">
          Smeets is a social sports app designed to help people find and organize sports games
          with others nearby.
        </p>
      </FadeIn>

      <FadeIn className="py-12">
        <BareImage
          src="/smeets/smeets opening mockup.png"
          alt="Smeets opening"
          className="w-full"
        />
      </FadeIn>

      {problem?.body && (
        <FadeIn>
          <SectionText
            sectionNumber="01"
            title="The Problem: The Struggle for Consistent Team Sports"
            body={problem.body}
          />
        </FadeIn>
      )}

      {solution?.title && solution.body && (
        <FadeIn>
          <SectionText sectionNumber="02" title={solution.title} body={solution.body} />
        </FadeIn>
      )}

      <FadeIn className="py-12">
        <div className="mb-10">
          <BareImage
            src="/smeets/Me user persona.png"
            alt="Research persona"
            className="w-full max-w-[140px] md:max-w-[160px] rounded-xl border border-foreground/15"
          />
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted mb-4">03</p>
          <h3 className="text-xl md:text-2xl font-bold text-foreground mb-6 leading-snug">
            Research & Insights: Understanding the Inactive Majority
          </h3>
          <p className="text-base md:text-lg text-muted leading-[1.85]">
            During my research, I found a big gap in the market. User interviews helped shape the
            product, showing that a sports app needs to feel lively and always offer new chances to
            play.
          </p>
        </div>

        {/* Data frames row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
          {RESEARCH_STATS.map((stat) => (
            <div key={stat.value} className="rounded-xl border-2 border-foreground/12 bg-background px-5 py-8 text-left">
              <p
                className="text-4xl md:text-5xl font-black tracking-tight"
                style={{ color: BRAND }}
              >
                {stat.value}
              </p>
              <p className="mt-3 text-sm text-muted leading-snug">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Insight frames row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          {RESEARCH_STATS.map((stat) => (
            <div key={stat.insight} className="rounded-xl border-2 border-foreground/12 px-4 py-3 text-left">
              <p className="text-sm font-semibold text-foreground">{stat.insight}</p>
            </div>
          ))}
        </div>
      </FadeIn>

      <FadeIn className="py-12">
        <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4">
          Core Features: Designing for Instant Action
        </h3>
        <p className="text-base text-muted leading-[1.85] mb-4">
          I designed the interface to make it as quick as possible to go from opening the app to
          joining a game.
        </p>
      </FadeIn>

      <FadeIn>
        <SideBySide
          phoneSide="left"
          text={{
            title: 'The "One Tap" Home Screen',
            body: [
              'The home screen always shows the next available game, so users can join right away without overthinking their choices.',
            ],
          }}
        >
          <PhoneMockup src="/smeets/home.png" alt="Home screen" />
        </SideBySide>
      </FadeIn>

      <FadeIn>
        <SideBySide
          phoneSide="right"
          twoPhones
          wideGap
          text={{
            title: 'Advanced Team Discovery',
            body: [
              'For users who want something specific, I built a strong search system with filters for location, sport type, and time. Each team card highlights the key details, making it easy to decide quickly.',
            ],
          }}
        >
          <PhoneMockup src="/smeets/search.png" alt="Search" />
          <PhoneMockup src="/smeets/map.png" alt="Map" />
        </SideBySide>
      </FadeIn>

      <FadeIn>
        <SideBySide
          phoneSide="left"
          text={{
            title: 'In-House Coordination',
            body: [
              'I added a built-in chat so users can plan and coordinate matches without leaving the app or switching to other messaging tools.',
            ],
          }}
        >
          <PhoneMockup src="/smeets/chat.png" alt="Chat" />
        </SideBySide>
      </FadeIn>

      <FadeIn className="py-12">
        <div className="flex justify-center items-center gap-[24px] mb-10 -ml-4">
          <PhoneMockup src="/smeets/profile.png" alt="Profile" />
          <PhoneMockup src="/smeets/team.png" alt="Team" />
        </div>
        <div>
          <h4 className="text-lg md:text-xl font-bold text-foreground mb-4">
            Community Profiles
          </h4>
          <p className="text-base text-muted leading-[1.85]">
            Group and user profiles show participation stats and achievements. I left out skill
            levels to keep things inclusive and focused on bringing people together.
          </p>
        </div>
      </FadeIn>

      {takeaway?.body && (
        <FadeIn className="py-10 border-t border-foreground/10 mt-8">
          {takeaway.sectionNumber && (
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted mb-4">
              {takeaway.sectionNumber}
            </p>
          )}
          <h3 className="text-xl md:text-2xl font-bold text-foreground mb-6">{takeaway.title}</h3>
          {takeaway.body.map((p, i) => (
            <p key={i} className="text-base md:text-lg text-muted leading-[1.85] mb-5">
              {p}
            </p>
          ))}
          {takeaway.disclaimer && (
            <p className="mt-8 text-sm text-muted/80 italic">{takeaway.disclaimer}</p>
          )}
        </FadeIn>
      )}
    </div>
  )
}
