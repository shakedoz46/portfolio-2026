import { motion } from 'framer-motion'
import PortfolioHero from '../components/home/PortfolioHero'

export default function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-background"
    >
      <PortfolioHero />
    </motion.div>
  )
}
