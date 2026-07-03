import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../lib/cn'

const MAIN_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
]

const PROJECT_LINKS = [
  { label: 'AdVary', to: '/project/ab-testing' },
  { label: 'Reasy', to: '/project/reasy' },
  { label: 'Michael', to: '/project/michael' },
  { label: 'Smeets', to: '/project/smeets' },
]

const drawerVariants = {
  hidden: { x: '-100%' },
  visible: {
    x: 0,
    transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] as number[] },
  },
  exit: {
    x: '-100%',
    transition: { duration: 0.28, ease: [0.55, 0, 0.22, 1] as number[] },
  },
}

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.055, delayChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, x: -14 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] as number[] } },
}

function NavLink({ to, label }: { to: string; label: string }) {
  const { pathname } = useLocation()
  const isActive = to === '/' ? pathname === '/' : pathname.startsWith(to)

  return (
    <motion.div variants={itemVariants}>
      <Link
        to={to}
        className={cn(
          'block py-2 px-3 rounded-xl text-base font-semibold transition-colors',
          isActive
            ? 'text-foreground bg-foreground/8'
            : 'text-foreground/50 hover:text-foreground hover:bg-foreground/5'
        )}
      >
        {label}
      </Link>
    </motion.div>
  )
}

export default function FloatingNav() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => { setOpen(false) }, [pathname])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  return (
    <>
      {/* Hamburger — fixed top-left, always visible */}
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="fixed left-5 top-5 z-[110] flex h-10 w-10 flex-col items-center justify-center gap-[5.5px] rounded-full border border-foreground/10 bg-background/80 shadow-sm backdrop-blur-md transition-shadow hover:shadow-md"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
      >
        <motion.span
          className="block h-[1.5px] w-[18px] rounded-full bg-foreground origin-center"
          animate={{ rotate: open ? 45 : 0, y: open ? 7 : 0 }}
          transition={{ duration: 0.24 }}
        />
        <motion.span
          className="block h-[1.5px] w-[18px] rounded-full bg-foreground"
          animate={{ opacity: open ? 0 : 1, scaleX: open ? 0 : 1 }}
          transition={{ duration: 0.18 }}
        />
        <motion.span
          className="block h-[1.5px] w-[18px] rounded-full bg-foreground origin-center"
          animate={{ rotate: open ? -45 : 0, y: open ? -7 : 0 }}
          transition={{ duration: 0.24 }}
        />
      </button>

      {/* Backdrop — click to close */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[95]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Drawer — slides in from left */}
      <AnimatePresence>
        {open && (
          <motion.aside
            key="nav-drawer"
            role="dialog"
            aria-label="Navigation"
            className="fixed inset-y-0 left-0 z-[100] w-[300px] max-w-[82vw]"
            style={{
              background:
                'linear-gradient(to right, rgb(249,249,247) 0%, rgba(249,249,247,0.97) 20%, rgba(249,249,247,0.88) 42%, rgba(249,249,247,0.62) 62%, rgba(249,249,247,0.22) 82%, rgba(249,249,247,0) 100%)',
              backdropFilter: 'blur(28px)',
              WebkitBackdropFilter: 'blur(28px)',
            }}
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.nav
              className="flex h-full flex-col px-5 pt-20 pb-8"
              variants={listVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Home + About */}
              <div className="flex flex-col gap-0.5 mb-5">
                {MAIN_LINKS.map(link => (
                  <NavLink key={link.to} {...link} />
                ))}
              </div>

              {/* Divider */}
              <motion.div variants={itemVariants} className="mb-3">
                <div className="h-px w-full bg-foreground/10" />
              </motion.div>

              {/* Projects section */}
              <motion.div variants={itemVariants}>
                <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-[0.26em] text-foreground/35">
                  Projects
                </p>
              </motion.div>

              <div className="flex flex-col gap-0.5">
                {PROJECT_LINKS.map(link => (
                  <NavLink key={link.to} {...link} />
                ))}
              </div>
            </motion.nav>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}
