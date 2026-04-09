import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { MonthTheme } from '@/lib/themes';

interface CalendarHeaderProps {
  theme: MonthTheme;
  currentYear: number;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
}

export default function CalendarHeader({
  theme,
  currentYear,
  onPreviousMonth,
  onNextMonth,
  onToday,
}: CalendarHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between p-10 bg-white border-b border-gray-50 gap-8">
      <div className="flex items-center gap-6">
        <motion.div 
          key={theme.month}
          initial={{ rotate: -20, scale: 0.8 }}
          animate={{ rotate: 0, scale: 1 }}
          className="p-4 rounded-2xl shadow-xl flex items-center justify-center"
          style={{ backgroundColor: `${theme.accent}20`, color: theme.primary }}
        >
          <CalendarIcon className="w-8 h-8" />
        </motion.div>
        <div>
          <h2 className="text-4xl font-black tracking-tighter" style={{ color: theme.primary }}>
            {theme.name} <span className="text-muted/20 font-black">{currentYear}</span>
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <Sparkles className="w-3 h-3 text-accent animate-spin-slow" style={{ color: theme.accent }} />
            <p className="text-[10px] font-black text-muted uppercase tracking-[0.3em]">Seasonal Curations</p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex bg-secondary/50 p-1.5 rounded-2xl">
          <button
            type="button"
            onClick={onPreviousMonth}
            className="p-3 rounded-xl hover:bg-white hover:shadow-subtle transition-all text-muted hover:text-primary"
            aria-label="Previous Month"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            type="button"
            onClick={onNextMonth}
            className="p-3 rounded-xl hover:bg-white hover:shadow-subtle transition-all text-muted hover:text-primary"
            aria-label="Next Month"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
        
        <button
          type="button"
          onClick={onToday}
          className="flex items-center gap-2 px-8 py-3.5 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all"
          style={{ backgroundColor: theme.primary }}
        >
          Today
        </button>
      </div>
    </div>
  );
}
