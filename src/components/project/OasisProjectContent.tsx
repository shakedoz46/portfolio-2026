import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import IpadMockup from './IpadMockup'
import type { Project } from '../../data/projects'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

const INTRO =
  'I created a smart management system to modernize hotel operations, help departments work together better, and make sure guests have a great experience.'

const PROBLEM =
  'Oasis Hotel used old manual processes and did not have a system that fit its needs. Because of this, guest requests were sometimes missed, room turnovers were delayed, and departments did not always communicate well.'

const GOALS = [
  {
    number: '01',
    text: 'Provide instant visibility and response to service needs',
  },
  {
    number: '02',
    text: 'Enable efficient coordination across all hotel departments',
  },
  {
    number: '03',
    text: 'Ensure a seamless and delightful guest experience',
  },
] as const

const HOTEL_REQUIREMENTS = [
  'Rooms expected to check in, check out and daily cleaning.',
  'Current occupancy by room type and availability.',
  'Upcoming arrivals scheduled for today.',
  'Urgent maintenance issues, guest complaints, etc.',
  'Expected reservations for spa, bar, and restaurant.',
  'High-priority events or VIPs requiring additional attention.',
  'Real-time view of active staff members per shift.',
]

const DASHBOARD_OVERVIEW =
  'The dashboard gives staff a real-time view of hotel operations so they can respond quickly and work efficiently.'

const RESERVATIONS_HUB =
  'The reservation module is the main part of the platform. It shows real-time information about room availability, booking status, and check-in or check-out times. This helps departments work together to avoid double-bookings and stay prepared.'

const ALERT_CENTER =
  'The alert center lets staff filter and track issues by urgency, department, date, and time. This helps them respond quickly and makes sure every request or problem gets attention.'

const RESERVATIONS_SYSTEM =
  'The reservations system covers everything needed for efficient room management, including guest type, room availability, and dates.\n\nIt has a dynamic filtering panel so staff can quickly sort and refine bookings by room type, status, duration, and source, like online, phone, or agency. This keeps operations running smoothly, even during busy times.'

const REFLECTIONS =
  "This project gave me hands-on experience designing data-driven interfaces and dashboards. I learned to work with client needs, pick out key information, and show it clearly. Most of all, I saw how good user flows can make things easier and more intuitive for people."

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

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-xl md:text-2xl font-bold text-foreground mb-5 leading-snug">{children}</h3>
  )
}

function BodyParagraph({ children }: { children: string }) {
  return <p className="text-base md:text-lg text-muted leading-[1.85] mb-6 last:mb-0">{children}</p>
}

function GoalFrame({
  number,
  text,
  accentColor,
}: {
  number: string
  text: string
  accentColor: string
}) {
  return (
    <div className="flex-1 min-w-[min(100%,220px)] rounded-xl border border-foreground/10 bg-white/70 p-5 md:p-6 shadow-[0_1px_0_rgba(0,0,0,0.04)]">
      <p className="text-2xl md:text-3xl font-black mb-4 tabular-nums" style={{ color: accentColor }}>
        {number}
      </p>
      <p className="text-sm md:text-base text-muted leading-relaxed">{text}</p>
    </div>
  )
}

interface OasisProjectContentProps {
  project: Project
}

export default function OasisProjectContent({ project }: OasisProjectContentProps) {
  const accent = project.accentColor
  const reservationsParagraphs = RESERVATIONS_SYSTEM.split('\n\n')

  return (
    <div className="oasis-content w-full pb-8 text-left">
      <FadeIn className="py-12">
        <SectionTitle>Oasis Hotel - Complex System</SectionTitle>
        <BodyParagraph>{INTRO}</BodyParagraph>
      </FadeIn>

      <FadeIn className="py-12">
        <IpadMockup>
          <img
            src="/Osis hotel/Dashboard.png"
            alt=""
            className="w-full h-auto block"
            loading="eager"
          />
        </IpadMockup>
      </FadeIn>

      <FadeIn className="py-12">
        <SectionTitle>The Problem</SectionTitle>
        <BodyParagraph>{PROBLEM}</BodyParagraph>

        <SectionTitle>Project Goals</SectionTitle>
        <div className="flex flex-col sm:flex-row gap-4 md:gap-5 mb-10">
          {GOALS.map((goal) => (
            <GoalFrame
              key={goal.number}
              number={goal.number}
              text={goal.text}
              accentColor={accent}
            />
          ))}
        </div>

        <SectionTitle>Hotel Requirements</SectionTitle>
        <ul className="list-disc pl-5 space-y-2.5 text-base md:text-lg text-muted leading-[1.85] mb-2">
          {HOTEL_REQUIREMENTS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </FadeIn>

      <FadeIn className="py-12">
        <SectionTitle>Dashboard Overview</SectionTitle>
        <BodyParagraph>{DASHBOARD_OVERVIEW}</BodyParagraph>
        <IpadMockup className="mt-10">
          <img
            src="/Osis hotel/Dashboard.png"
            alt=""
            className="w-full h-auto block"
            loading="lazy"
          />
        </IpadMockup>
      </FadeIn>

      <FadeIn className="py-12">
        <SectionTitle>The Heart of the System: Reservations Hub</SectionTitle>
        <BodyParagraph>{RESERVATIONS_HUB}</BodyParagraph>
        <IpadMockup className="mt-10">
          <img
            src="/Osis hotel/heart of the system.png"
            alt=""
            className="w-full h-auto block"
            loading="lazy"
          />
        </IpadMockup>
      </FadeIn>

      <FadeIn className="py-12">
        <SectionTitle>Alert Center Overview</SectionTitle>
        <BodyParagraph>{ALERT_CENTER}</BodyParagraph>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 mt-6 max-w-4xl mx-auto">
          <div className="w-full sm:w-[62%] shrink-0 min-w-0">
            <IpadMockup openSide="left" className="mx-0 max-w-none w-full">
              <img
                src="/Osis hotel/alret system.png"
                alt=""
                className="w-full h-auto block"
                loading="lazy"
              />
            </IpadMockup>
          </div>
          <div className="w-full sm:w-[34%] shrink-0">
            <img
              src="/Osis hotel/alret exmple.png"
              alt=""
              className="w-full h-auto block rounded-lg border border-foreground/8 shadow-sm"
              loading="lazy"
            />
          </div>
        </div>
      </FadeIn>

      <FadeIn className="py-12">
        <SectionTitle>Reservations System</SectionTitle>
        {reservationsParagraphs.map((p) => (
          <BodyParagraph key={p.slice(0, 32)}>{p}</BodyParagraph>
        ))}
        <IpadMockup className="mt-10">
          <img
            src="/Osis hotel/Reservation.png"
            alt=""
            className="w-full h-auto block"
            loading="lazy"
          />
        </IpadMockup>
      </FadeIn>

      <FadeIn className="py-12 border-t border-foreground/10 mt-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted mb-4">05</p>
        <SectionTitle>Reflections &amp; Learnings</SectionTitle>
        <BodyParagraph>{REFLECTIONS}</BodyParagraph>
      </FadeIn>
    </div>
  )
}
