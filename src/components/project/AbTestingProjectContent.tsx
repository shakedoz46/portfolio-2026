import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import IpadMockup from './IpadMockup'
import ProjectStats from './ProjectStats'
import type { Project } from '../../data/projects'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

const STATS = {
  title: 'Operational Efficiency: AI vs. Manual Design',
  rows: [
    { metric: 'Production Cost', traditional: '$30 – $50 per ad', ours: '~$0.90 per ad' },
    { metric: 'Delivery Time', traditional: '3 – 5 Days', ours: '< 90 Seconds' },
    { metric: 'Scale Potential', traditional: '~15 Ads Monthly', ours: '200+ Ads Monthly' },
  ],
}

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

function FeatureBlock({
  title,
  body,
  imageSrc,
}: {
  title: string
  body: string[]
  imageSrc: string
}) {
  return (
    <div className="py-12">
      <h4 className="text-lg md:text-xl font-bold text-foreground mb-4">{title}</h4>
      {body.map((p, i) => (
        <p
          key={i}
          className="text-base md:text-lg text-muted leading-[1.85] mb-5 last:mb-0 max-w-none"
        >
          {p}
        </p>
      ))}
      <IpadMockup className="mt-10">
        <img src={imageSrc} alt="" className="w-full h-auto block" loading="lazy" />
      </IpadMockup>
    </div>
  )
}

interface AbTestingProjectContentProps {
  project: Project
}

export default function AbTestingProjectContent({ project }: AbTestingProjectContentProps) {
  const challenge = project.sections.find((s) => s.sectionNumber === '01')
  const solution = project.sections.find((s) => s.sectionNumber === '02')

  return (
    <div className="ab-testing-content w-full pb-8 text-left">
      <FadeIn className="py-12">
        <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
          AdVary - AI Ad Variation System
        </h2>
        <p className="text-base md:text-lg text-muted leading-[1.85]">
          I built a system that uses AI to create a wide range of ad variations, saving a lot of
          time and resources.
        </p>
      </FadeIn>

      <FadeIn className="py-12">
        <IpadMockup className="w-full max-w-4xl">
          <img
            src="/AB testing/English version/Dashboard.jpg"
            alt="AdVary Dashboard"
            className="w-full h-auto block"
            loading="eager"
          />
        </IpadMockup>
      </FadeIn>

      {challenge?.body && (
        <FadeIn>
          <SectionText
            sectionNumber="01"
            title="The Challenge: Overcoming Creative Fatigue in Ad Agencies"
            body={challenge.body}
          />
        </FadeIn>
      )}

      {solution?.body && (
        <FadeIn>
          <SectionText
            sectionNumber="02"
            title="The Solution: Scaling Performance through Intelligent Augmentation"
            body={solution.body}
          />
        </FadeIn>
      )}

      <FadeIn>
        <SectionText
          sectionNumber="03"
          title="Strategic Impact: Data-Driven Performance"
          body={[
            "Research shows that one out of seven A/B tests fails because the changes aren't different enough or variables aren't isolated. Our solution makes sure each variation is both strategic and on-brand, so Meta's 7 to 14 day learning phase always has new data to work with.",
          ]}
        />
        <div className="mt-10">
          <ProjectStats title={STATS.title} rows={STATS.rows} />
        </div>
      </FadeIn>

      <FadeIn>
        <SectionText
          sectionNumber="04"
          title="Design Leadership: Transforming Code into a Product"
          body={[
            'As we developed the product, we created a working prototype with all the main features and logic. However, the user interface still needed more polish and better usability to be ready for launch. I used Figma MCP to move the product structure into Figma, where I redesigned the interface. This helped create a consistent visual style, made the product easier to use, and set it up for future growth.',
          ]}
        />
      </FadeIn>

      <FadeIn>
        <FeatureBlock
          title="Actionable Dashboard Overview"
          body={[
            'I redesigned the dashboard to make key performance metrics stand out and help users quickly see important insights. To make things easier, I added a "Recent Projects" section for quick access and included quick actions for common tasks. My aim was to keep the interface clean and welcoming, so users feel comfortable using it without feeling overloaded.',
          ]}
          imageSrc="/AB testing/English version/Dashboard.jpg"
        />
      </FadeIn>

      <FadeIn>
        <FeatureBlock
          title="Intelligent Variation Hub"
          body={[
            'To help users make better creative choices, I built a side-by-side Split-View Layout for comparing original ads with AI variations. Each ad comes with an AI Analysis Overlay that explains the reason for each change, like headline tweaks or CTA contrast updates.',
            'The AI Analysis Overlay was designed to be fully editable. This lets users guide the results to match what the client wants and helps the agent understand the requirements correctly.',
          ]}
          imageSrc="/AB testing/English version/Variation result.jpg"
        />
      </FadeIn>

      <FadeIn>
        <FeatureBlock
          title="Creative Analysis"
          body={[
            'Together with the AI agent, we built an additional editable section so users can steer outcomes to match client intent while ensuring the agent interprets requirements correctly.',
          ]}
          imageSrc="/AB testing/English version/creative analysis.jpg"
        />
      </FadeIn>

      <FadeIn className="py-12">
        <h3 className="text-xl md:text-2xl font-bold text-foreground mb-6 leading-snug">
          What I Learned
        </h3>
        <p className="text-base md:text-lg text-muted leading-[1.85]">
          Most importantly, I learned how to work well with AI. I quickly moved from code to
          design using tools like Figma and Claude Code, and I gained experience with MCP
          connections, APIs, database setup, and other tools that I know will be useful in the
          future.
        </p>
      </FadeIn>
    </div>
  )
}
