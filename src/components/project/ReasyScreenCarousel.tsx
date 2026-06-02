import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import IpadMockup from './IpadMockup'

const SLIDES: { src: string; label: string }[] = [
  { src: '/Reasy/צור קשר.png', label: 'Contact' },
  { src: '/Reasy/דשבורד כללי.png', label: 'Dashboard' },
  { src: '/Reasy/התראות.png', label: 'Alerts' },
  { src: '/Reasy/משתמשים.png', label: 'Users' },
  { src: '/Reasy/פרופיל שוכר.png', label: 'Tenant profile' },
  { src: '/Reasy/פרופיל משכיר.png', label: 'Landlord profile' },
]

const arrowClass =
  'absolute top-1/2 z-20 -translate-y-1/2 p-2 md:p-3 text-white/90 hover:text-white transition-colors drop-shadow-[0_1px_8px_rgba(0,0,0,0.55)]'

interface ReasyScreenCarouselProps {
  accentColor: string
}

export default function ReasyScreenCarousel({ accentColor }: ReasyScreenCarouselProps) {
  const [index, setIndex] = useState(0)
  const total = SLIDES.length

  const goPrev = () => setIndex((i) => (i - 1 + total) % total)
  const goNext = () => setIndex((i) => (i + 1) % total)

  const slide = SLIDES[index]

  return (
    <div className="w-full max-w-4xl mx-auto py-10">
      <div className="relative w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.src}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="w-full flex justify-center"
          >
            <IpadMockup className="w-full max-w-4xl">
              <img src={slide.src} alt="" className="w-full h-auto block" loading="lazy" />
            </IpadMockup>
          </motion.div>
        </AnimatePresence>

        <button type="button" onClick={goPrev} className={`${arrowClass} left-3 md:left-5`} aria-label="Previous">
          <svg className="w-7 h-7 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </button>
        <button type="button" onClick={goNext} className={`${arrowClass} right-3 md:right-5`} aria-label="Next">
          <svg className="w-7 h-7 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>

      <div className="flex justify-center items-center gap-2.5 mt-8">
        {SLIDES.map((s, i) => (
          <button
            key={s.src}
            type="button"
            onClick={() => setIndex(i)}
            className="p-1"
            aria-label={`Go to ${s.label}`}
            aria-current={i === index ? 'true' : undefined}
          >
            <span
              className="block w-2 h-2 rounded-full transition-all"
              style={{
                backgroundColor: i === index ? accentColor : 'rgba(107,107,107,0.45)',
                transform: i === index ? 'scale(1.25)' : 'scale(1)',
              }}
            />
          </button>
        ))}
      </div>
    </div>
  )
}
