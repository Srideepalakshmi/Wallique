import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { MonthTheme } from '@/lib/themes';

interface DateCellProps {
  date: Date;
  theme: MonthTheme;
  isCurrentMonth: boolean;
  isToday: boolean;
  isWeekend: boolean;
  isSelected: boolean;
  isRangeStart: boolean;
  isRangeEnd: boolean;
  isInRange: boolean;
  onClick: () => void;
  holiday?: string;
}

export default function DateCell({
  date,
  theme,
  isCurrentMonth,
  isToday,
  isWeekend,
  isSelected,
  isRangeStart,
  isRangeEnd,
  isInRange,
  onClick,
  holiday,
}: DateCellProps) {
  const dayNumber = date.getDate();
  
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 0.97, backgroundColor: isCurrentMonth ? 'rgba(255,255,255,1)' : '' }}
      whileTap={{ scale: 0.94 }}
      onClick={onClick}
      className={cn(
        "relative h-32 md:h-44 p-5 transition-all flex flex-col items-start gap-3 border-r border-b border-gray-50/50 overflow-hidden",
        !isCurrentMonth && "bg-gray-50/20 text-gray-200 pointer-events-none",
        isCurrentMonth && "text-gray-600 hover:shadow-inner-soft",
        isWeekend && isCurrentMonth && !isSelected && "bg-slate-50/30",
        "group"
      )}
    >
      {/* Dynamic Theme Selection Backgrounds */}
      {isInRange && (
        <div 
          className="absolute inset-x-0 inset-y-3 z-0 opacity-20" 
          style={{ backgroundColor: theme.accent }}
        />
      )}
      
      {isRangeStart && (
        <motion.div 
          layoutId="range-start"
          className="absolute inset-0 z-0" 
          style={{ backgroundColor: theme.primary }}
        />
      )}
      
      {isRangeEnd && (
        <motion.div 
          layoutId="range-end"
          className="absolute inset-0 z-0" 
          style={{ backgroundColor: theme.primary }}
        />
      )}

      {/* Content */}
      <div className="relative z-10 flex justify-between w-full">
        <span className={cn(
          "text-xl font-black tracking-tighter w-10 h-10 flex items-center justify-center rounded-xl transition-all shadow-sm",
          isToday && !isRangeStart && !isRangeEnd && "text-white shadow-lg",
          (isRangeStart || isRangeEnd) && "bg-white shadow-2xl",
          !isToday && !isRangeStart && !isRangeEnd && isCurrentMonth && "group-hover:text-primary transition-colors"
        )}
        style={{ 
          backgroundColor: isToday && !isRangeStart && !isRangeEnd ? theme.accent : undefined,
          color: (isRangeStart || isRangeEnd) ? theme.primary : undefined
        }}>
          {dayNumber}
        </span>
        
        {holiday && isCurrentMonth && (
          <motion.span 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[10px] px-3 py-1.5 font-black rounded-full uppercase tracking-tighter shadow-sm"
            style={{ backgroundColor: `${theme.accent}30`, color: theme.primary }}
          >
            {holiday}
          </motion.span>
        )}
      </div>

      {isWeekend && isCurrentMonth && !isSelected && (
        <div className="mt-1 text-[9px] font-black opacity-10 uppercase tracking-[0.2em]">Off-Day</div>
      )}

      {/* Selection Glow Interaction */}
      {isCurrentMonth && !isSelected && (
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none"
          style={{ background: `radial-gradient(circle at center, ${theme.accent}, transparent)` }}
        />
      )}
    </motion.button>
  );
}
