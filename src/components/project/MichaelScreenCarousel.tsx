import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import IpadMockup from './IpadMockup'

const SLIDES = [
  { src: '/Michael/dashboard.png', label: 'Dashboard' },
  { src: '/Michael/client dashboard.png', label: 'Leads' },
  { src: '/Michael/calander dashboard.png', label: 'Calendar' },
] as const

interface MichaelScreenCarouselProps {
  accentColor: string
}

export default function MichaelScreenCarousel({ accentColor }: MichaelScreenCarouselProps) {
  const [index, setIndex] = useState(0)
  const mobileRef = useRef<HTMLDivElement>(null)
  const total = SLIDES.length

  const go = (next: number) => {
    setIndex(next)
    mobileRef.current?.scrollTo({
      left: next * (mobileRef.current.clientWidth),
      behavior: 'smooth',
    })
  }

  const handleMobileScroll = () => {
    if (!mobileRef.current) return
    const i = Math.round(mobileRef.current.scrollLeft / mobileRef.current.clientWidth)
    if (i !== index) setIndex(i)
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-10">

      {/* ── DESKTOP ── */}
      <div className="hidden md:block relative">
        <div className="relative w-full">
          {SLIDES.map((slide, i) => (
            <motion.div
              key={slide.src}
              className={i === 0 ? 'w-full' : 'absolute inset-0 w-full'}
              style={{ pointerEvents: i === index ? 'auto' : 'none' }}
              animate={{ opacity: i === index ? 1 : 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <IpadMockup className="w-full max-w-4xl">
                <img src={slide.src} alt={slide.label} className="w-full h-auto block" loading="lazy" />
              </IpadMockup>
            </motion.div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => go((index - 1 + total) % total)}
          className="absolute top-1/2 left-3 md:left-5 z-20 -translate-y-1/2 p-2 md:p-3 text-white/90 hover:text-white transition-colors drop-shadow-[0_1px_8px_rgba(0,0,0,0.55)]"
          aria-label="Previous screen"
        >
          <svg className="w-7 h-7 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => go((index + 1) % total)}
          className="absolute top-1/2 right-3 md:right-5 z-20 -translate-y-1/2 p-2 md:p-3 text-white/90 hover:text-white transition-colors drop-shadow-[0_1px_8px_rgba(0,0,0,0.55)]"
          aria-label="Next screen"
        >
          <svg className="w-7 h-7 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>

      {/* ── MOBILE: native snap scroll ── */}
      <div className="md:hidden">
        <div
          ref={mobileRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none"
          style={{ WebkitOverflowScrolling: 'touch' }}
          onScroll={handleMobileScroll}
        >
          {SLIDES.map((slide, i) => (
            <div key={slide.src} className="flex-none w-full snap-center">
              <IpadMockup className="w-full">
                <img
                  src={slide.src}
                  alt={slide.label}
                  className="w-full h-auto block"
                  loading={i === 0 ? 'eager' : 'lazy'}
                />
              </IpadMockup>
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center items-center gap-2.5 mt-6">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => go(i)}
            className="p-1 rounded-full"
            aria-label={`Go to ${slide.label}`}
            aria-current={i === index ? 'true' : undefined}
          >
            <span
              className="block w-2 h-2 rounded-full transition-all duration-200"
              style={{
                backgroundColor: i === index ? accentColor : 'rgba(107,107,107,0.35)',
                transform: i === index ? 'scale(1.3)' : 'scale(1)',
              }}
            />
          </button>
        ))}
      </div>
    </div>
  )
}
