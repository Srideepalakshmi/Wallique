import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { MonthTheme } from '@/lib/themes';

interface HeroSectionProps {
  theme: MonthTheme;
  currentYear: number;
}

export default function HeroSection({ theme, currentYear }: HeroSectionProps) {
  return (
    <div className="relative w-full h-[350px] md:h-[500px] overflow-hidden group">
      <AnimatePresence mode="wait">
        <motion.div
          key={theme.month}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <Image
            src={theme.image}
            alt={theme.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
        </motion.div>
      </AnimatePresence>
      
      {/* Decorative Wall Calendar Elements */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20">
         <div className="w-5 h-5 rounded-full bg-white/30 backdrop-blur-xl border border-white/50 shadow-2xl" />
      </div>

      {/* Floating Month Card */}
      <div className="absolute inset-x-0 bottom-0 p-10 flex justify-between items-end">
        <motion.div
          key={theme.name}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="glass-card p-8 rounded-3xl shadow-premium border border-white/40"
        >
          <span 
            className="text-xs font-black uppercase tracking-[0.4em] mb-2 block"
            style={{ color: theme.accent }}
          >
            {theme.mood}
          </span>
          <h1 className="text-5xl md:text-7xl font-black lowercase tracking-tighter" style={{ color: theme.primary }}>
            {theme.name}
            <span className="ml-3 opacity-30 font-light">{currentYear}</span>
          </h1>
        </motion.div>
        
      </div>

      {/* Subtle Grain Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/subtle-white-feather.png')]" />
    </div>
  );
}
