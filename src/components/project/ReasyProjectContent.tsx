import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import IpadMockup from './IpadMockup'
import IphoneMockup from './IphoneMockup'
import ReasyScreenCarousel from './ReasyScreenCarousel'
import MatchingLogicTable from './MatchingLogicTable'
import type { Project } from '../../data/projects'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

const MATCHING_FORMULA =
  'To develop the matching formula, I looked at user data to find which details, like lifestyle, budget, and location, best predict a good match. Working with the client, I set up a weighted system that automates these connections, making the process faster and more satisfying for everyone.'

const ADMIN_INFRA =
  'To build the admin tools, I mapped out how the platform works from start to finish and designed an Admin Dashboard that gives full visibility. This included tools for moderating users, monitoring alerts, and managing listings, turning Reasy from a basic app into a business that can grow and be managed easily.'

const ADMIN_DASHBOARD =
  "The dashboard acts as a professional command center, letting the client manage tenants, landlords, and brokers, and keep track of real-time activity and the platform's health."

const SMART_MATCHING =
  'We built a system based on key variables that automates how tenants and landlords find each other. This has made searches much faster and helped close deals more quickly.'

const IMPACT_BODY =
  "For this project, I took charge of the product's direction and turned an idea into a working platform ready for the market. By solving the matching logic and building the business operations from scratch, I made sure Reasy brings real value to users and the business owner. I'm happy to say that Reasy is now almost ready and will be launching on app stores soon."

const PHONE_CLASS = 'w-full max-w-none'

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
  return (
    <p className="text-base md:text-lg text-muted leading-[1.85] mb-8 last:mb-0">{children}</p>
  )
}

interface ReasyProjectContentProps {
  project: Project
}

export default function ReasyProjectContent({ project }: ReasyProjectContentProps) {
  const problem = project.sections.find((s) => s.sectionNumber === '01')
  const solution = project.sections.find((s) => s.sectionNumber === '02')

  return (
    <div className="reasy-content w-full pb-8 text-left">
      <FadeIn className="py-12">
        <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
          Reasy - Easy to Rent
        </h2>
        <p className="text-base md:text-lg text-muted leading-[1.85]">
          This app makes it easy for tenants and landlords to connect. It helps people find rentals
          quickly with a simple user experience and an easy-to-follow property search.
        </p>
      </FadeIn>

      <FadeIn className="py-12">
        <IpadMockup className="w-full max-w-4xl">
          <img
            src="/Reasy/English version/Dashboard 1.jpg"
            alt=""
            className="w-full h-auto block"
            loading="eager"
          />
        </IpadMockup>
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
        <Subheading>Smart Matching Engine</Subheading>
        <BodyText>{MATCHING_FORMULA}</BodyText>
        <BodyText>{SMART_MATCHING}</BodyText>
        <MatchingLogicTable />
      </FadeIn>

      <FadeIn className="py-12">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted mb-4">04</p>
        <Subheading>Full-Scale Admin Dashboard</Subheading>
        <BodyText>{ADMIN_INFRA}</BodyText>
        <BodyText>{ADMIN_DASHBOARD}</BodyText>
        <div className="mt-10">
          <ReasyScreenCarousel accentColor={project.accentColor} />
        </div>
      </FadeIn>

      <FadeIn className="py-12">
        <h3 className="text-xl md:text-2xl font-bold text-foreground mb-6 leading-snug">
          My Impact: Turning Strategy into Reality
        </h3>
        <p className="text-base md:text-lg text-muted leading-[1.85]">{IMPACT_BODY}</p>
      </FadeIn>

      <FadeIn className="py-12">
        <div className="grid grid-cols-3 gap-3 sm:gap-5 md:gap-8 w-full items-end">
          <IphoneMockup className={PHONE_CLASS}>
            <img
              src="/Reasy/מסך פתיחה iphone.png"
              alt=""
              className="w-full h-auto block"
              loading="lazy"
            />
          </IphoneMockup>
          <IphoneMockup className={PHONE_CLASS}>
            <img
              src="/Reasy/מסך התאמה iphone.png"
              alt=""
              className="w-full h-auto block"
              loading="lazy"
            />
          </IphoneMockup>
          <IphoneMockup className={PHONE_CLASS}>
            <img
              src="/Reasy/הזמנה לסיור נשלחה - iphone.png"
              alt=""
              className="w-full h-auto block"
              loading="lazy"
            />
          </IphoneMockup>
        </div>
      </FadeIn>

      <FadeIn className="py-12">
        <img
          src="/Reasy/app mockup.png"
          alt=""
          className="w-full h-auto block rounded-[24px] shadow-[0_4px_24px_rgba(0,0,0,0.08),0_1px_8px_rgba(0,0,0,0.04)]"
          loading="lazy"
        />
      </FadeIn>
    </div>
  )
}
