import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../lib/cn'

const linkBase =
  'whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition-colors md:text-sm md:px-3.5'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Michael Social', to: '/project/michael' },
  { label: 'AdVary', to: '/project/ab-testing' },
  { label: 'Reasy', to: '/project/reasy' },
  { label: 'Smeets', to: '/project/smeets' },
] as const

export default function FloatingNav() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Desktop pill nav */}
      <nav
        className="pointer-events-none fixed left-0 right-0 top-4 z-[100] hidden md:flex justify-center px-4"
        aria-label="Main"
      >
        <div className="pointer-events-auto flex w-max max-w-full items-center gap-0.5 overflow-x-auto rounded-full border border-foreground/10 bg-background/85 py-2 pl-2 pr-2 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.12)] backdrop-blur-md scrollbar-none">
          {navItems.map((item) => {
            const active = pathname === item.to
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  linkBase,
                  active
                    ? 'bg-foreground text-background'
                    : 'text-muted hover:bg-foreground/5 hover:text-foreground'
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Mobile hamburger button */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="md:hidden fixed right-4 top-4 z-[100] flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full border border-foreground/10 bg-background/90 shadow-md backdrop-blur-md"
      >
        <span className="block h-px w-5 bg-foreground" />
        <span className="block h-px w-5 bg-foreground" />
        <span className="block h-px w-5 bg-foreground" />
      </button>

      {/* Mobile drawer overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="md:hidden fixed inset-0 z-[200] bg-background/70 backdrop-blur-lg"
          >
            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-foreground/10 text-2xl leading-none text-foreground"
            >
              ×
            </button>

            {/* Nav links */}
            <nav className="flex flex-col gap-1 px-8 pt-20" aria-label="Mobile">
              {navItems.map((item, i) => {
                const active = pathname === item.to
                return (
                  <motion.div
                    key={item.to}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className={cn(
                        'block py-3 text-2xl font-bold transition-colors',
                        active ? 'text-foreground' : 'text-foreground/40 hover:text-foreground'
                      )}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                )
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
