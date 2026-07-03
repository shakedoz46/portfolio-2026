import { motion } from 'framer-motion'
import SphereImageGrid, { type ImageData } from '../ui/SphereImageGrid'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

const gridStyle: React.CSSProperties = {
  backgroundImage:
    'linear-gradient(rgba(26,26,26,0.065) 1px, transparent 1px), linear-gradient(to right, rgba(26,26,26,0.065) 1px, transparent 1px)',
  backgroundSize: '3rem 3rem',
}

// All tool logos from /logos/tools logos/
const BASE_LOGOS: ImageData[] = [
  { id: 'figma',      src: '/logos/tools logos/figma-svgrepo-com.svg',           alt: 'Figma',        title: 'Figma' },
  { id: 'cursor',     src: '/logos/tools logos/cursor.svg',                       alt: 'Cursor',       title: 'Cursor' },
  { id: 'claude',     src: '/logos/tools logos/claude-icon.svg',                  alt: 'Claude',       title: 'Claude' },
  { id: 'illustrator',src: '/logos/tools logos/adobe-illustrator-svgrepo-com.svg',alt:'Illustrator',   title: 'Illustrator' },
  { id: 'photoshop',  src: '/logos/tools logos/adobe-photoshop-svgrepo-com.svg',  alt: 'Photoshop',   title: 'Photoshop' },
  { id: 'premiere',   src: '/logos/tools logos/adobe-premiere-svgrepo-com.svg',   alt: 'Premiere',    title: 'Premiere' },
  { id: 'gemini',     src: '/logos/tools logos/gemini-color.svg',                 alt: 'Gemini',      title: 'Gemini' },
  { id: 'github',     src: '/logos/tools logos/github-icon.svg',                  alt: 'GitHub',      title: 'GitHub' },
  { id: 'playconsole',src: '/logos/tools logos/google-play-console-icon.svg',     alt: 'Play Console',title: 'Play Console' },
  { id: 'grok',       src: '/logos/tools logos/grok-icon.svg',                    alt: 'Grok',        title: 'Grok' },
  { id: 'lovable',    src: '/logos/tools logos/lovable-color.svg',                alt: 'Lovable',     title: 'Lovable' },
  { id: 'midjourney', src: '/logos/tools logos/midjourney.svg',                   alt: 'Midjourney',  title: 'Midjourney' },
  { id: 'miro',       src: '/logos/tools logos/miro-icon.svg',                    alt: 'Miro',        title: 'Miro' },
  { id: 'openai',     src: '/logos/tools logos/openai-icon.svg',                  alt: 'OpenAI',      title: 'OpenAI' },
  { id: 'perplexity', src: '/logos/tools logos/perplexity-icon.svg',              alt: 'Perplexity',  title: 'Perplexity' },
  { id: 'supabase',   src: '/logos/tools logos/supabase-icon.svg',                alt: 'Supabase',    title: 'Supabase' },
  { id: 'vercel',     src: '/logos/tools logos/vercel-icon.svg',                  alt: 'Vercel',      title: 'Vercel' },
  { id: 'vscode',     src: '/logos/tools logos/visual-studio-code.svg',           alt: 'VS Code',     title: 'VS Code' },
]

// Triple so sphere is fully dense (54 total)
const TOOL_LOGOS: ImageData[] = [
  ...BASE_LOGOS,
  ...BASE_LOGOS.map(l => ({ ...l, id: l.id + '_2' })),
  ...BASE_LOGOS.map(l => ({ ...l, id: l.id + '_3' })),
]

export default function PortfolioHero() {
  return (
    <section className="relative h-dvh overflow-hidden bg-background flex flex-col">
      {/* Grid */}
      <div className="pointer-events-none absolute inset-0" style={gridStyle} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background" />

      {/* Main row */}
      <div className="relative z-10 flex flex-1 flex-row items-center">

        {/* ── Left: text ── */}
        <div className="flex flex-col justify-center px-8 sm:px-12 md:px-20 lg:px-28 flex-1 min-w-0">

          {/* Overline */}
          <motion.div
            className="mb-7 flex items-center gap-3 md:mb-9"
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.12, duration: 0.55, ease }}
          >
            <div className="h-px w-6 bg-foreground/25" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-foreground/45">
              Product Designer · Based in Israel
            </span>
          </motion.div>

          {/* Giant name */}
          <motion.h1
            className="font-black leading-[0.88] tracking-[-0.03em] text-foreground"
            style={{ fontSize: 'clamp(56px, 8.5vw, 160px)' }}
            initial={{ opacity: 0, y: 52 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.78, ease }}
          >
            Shaked
            <br />
            Oz.
          </motion.h1>

          {/* Tagline */}
          <motion.p
            className="mt-6 max-w-[440px] text-base leading-[1.7] text-foreground/55 md:mt-8 md:text-lg"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.44, duration: 0.65, ease }}
          >
            Curious about design and constantly exploring new tools in the AI era.{' '}
            <span className="font-semibold text-foreground">
              Build digital products that ship, scale, and drive real results.
            </span>
          </motion.p>
        </div>

        {/* ── Right: tool sphere (desktop only) ── */}
        <motion.div
          className="hidden md:flex flex-shrink-0 items-center justify-center pr-8 lg:pr-16"
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.55, duration: 0.85, ease }}
        >
          <SphereImageGrid
            images={TOOL_LOGOS}
            containerSize={600}
            sphereRadius={245}
            baseImageScale={0.095}
            autoRotate
            autoRotateSpeed={0.24}
            dragSensitivity={0.5}
            momentumDecay={0.94}
            perspective={900}
            centerContent={
              <div
                className="flex items-center justify-center rounded-2xl bg-white border border-black/8 shadow-[0_6px_24px_-2px_rgba(0,0,0,0.14)]"
                style={{ width: 108, height: 108, padding: '15%' }}
              >
                <img
                  src="/logos/tools logos/figma-svgrepo-com.svg"
                  alt="Figma"
                  className="w-full h-full object-contain"
                  draggable={false}
                />
              </div>
            }
          />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-2 pb-9 md:pb-11"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.92, duration: 0.55 }}
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-foreground/30">
          Selected Work
        </span>
        <motion.span
          className="text-base text-foreground/25"
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut', delay: 0.4 }}
        >
          ↓
        </motion.span>
      </motion.div>
    </section>
  )
}
