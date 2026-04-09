import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, isWithinInterval, isWeekend } from 'date-fns';
import DateCell from './DateCell';
import { motion, AnimatePresence } from 'framer-motion';
import { MonthTheme } from '@/lib/themes';

interface CalendarGridProps {
  currentDate: Date;
  theme: MonthTheme;
  startDate: Date | null;
  endDate: Date | null;
  onDateClick: (date: Date) => void;
  holidays: Record<string, string>;
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function CalendarGrid({
  currentDate,
  theme,
  startDate,
  endDate,
  onDateClick,
  holidays,
}: CalendarGridProps) {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);
  
  const calendarDays = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  });

  const isInSelectedRange = (date: Date) => {
    if (!startDate || !endDate) return false;
    const start = startDate < endDate ? startDate : endDate;
    const end = startDate < endDate ? endDate : startDate;
    return isWithinInterval(date, { start, end });
  };

  const isRangeStart = (date: Date) => startDate && isSameDay(date, startDate);
  const isRangeEnd = (date: Date) => endDate && isSameDay(date, endDate);

  return (
    <div className="bg-white">
      {/* Weekday Headers */}
      <div className="grid grid-cols-7 border-b border-gray-50 bg-secondary/20">
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className="py-6 text-center text-[11px] font-black uppercase tracking-[0.3em] text-muted/40 border-r last:border-r-0 border-gray-50/50"
          >
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar Days */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentDate.getMonth()}
          initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, scale: 1.02, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-7"
        >
          {calendarDays.map((date) => (
             <DateCell
                key={date.toString()}
                date={date}
                theme={theme}
                isCurrentMonth={isSameMonth(date, monthStart)}
                isToday={isSameDay(date, new Date())}
                isWeekend={isWeekend(date)}
                isSelected={isRangeStart(date) || isRangeEnd(date) || isInSelectedRange(date)}
                isRangeStart={isRangeStart(date) || false}
                isRangeEnd={isRangeEnd(date) || false}
                isInRange={isInSelectedRange(date) && !isRangeStart(date) && !isRangeEnd(date)}
                onClick={() => onDateClick(date)}
                holiday={holidays[format(date, 'yyyy-MM-dd')]}
              />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
