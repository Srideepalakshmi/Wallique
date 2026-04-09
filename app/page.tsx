'use client';

import { useState, useEffect } from 'react';
import { format, addMonths, subMonths, isSameDay } from 'date-fns';
import HeroSection from '@/components/HeroSection';
import CalendarHeader from '@/components/CalendarHeader';
import CalendarGrid from '@/components/CalendarGrid';
import NotesPanel from '@/components/NotesPanel';
import { MONTH_THEMES } from '@/lib/themes';
import { motion, AnimatePresence } from 'framer-motion';

const SAMPLE_HOLIDAYS = {
  '2026-01-01': 'New Year',
  '2026-02-14': 'Valentine',
  '2026-03-17': 'St Patrick',
  '2026-04-01': 'April Fool',
  '2026-04-05': 'Easter',
  '2026-04-22': 'Earth Day',
  '2026-05-01': 'May Day',
  '2026-05-10': 'Mother Day',
  '2026-06-21': 'Father Day',
  '2026-08-15': 'Independence',
  '2026-10-31': 'Halloween',
  '2026-12-25': 'Christmas',
};

export default function WalliqueCalendar() {
  const [mounted, setMounted] = useState(false);
  // Default to April 2026 as per our current date simulation
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3, 1)); 
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [notes, setNotes] = useState<Record<string, string>>({});

  // Get current theme based on month
  const currentTheme = MONTH_THEMES[currentDate.getMonth()];

  useEffect(() => {
    setMounted(true);
    const savedNotes = localStorage.getItem('wallique_notes_v3');
    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes));
      } catch (e) {
        console.error('Failed to parse notes', e);
      }
    }
  }, []);

  if (!mounted) return <div className="min-h-screen bg-white flex items-center justify-center font-black uppercase tracking-widest text-[10px] animate-pulse">Synchronizing Wallique...</div>;

  const handleDateClick = (date: Date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else {
      if (isSameDay(date, startDate)) {
        setStartDate(null);
        setEndDate(null);
      } else {
        setEndDate(date);
      }
    }
  };

  const handlePreviousMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const handleToday = () => {
    setCurrentDate(new Date(2026, 3, 1));
    setStartDate(null);
    setEndDate(null);
  };

  const saveNote = (key: string, content: string) => {
    const newNotes = { ...notes, [key]: content };
    setNotes(newNotes);
    localStorage.setItem('wallique_notes_v3', JSON.stringify(newNotes));
  };

  const clearNotes = () => {
    if (confirm('Permanently clear all journal entries for this era?')) {
      setNotes({});
      localStorage.removeItem('wallique_notes_v3');
    }
  };

  return (
    <motion.main 
      animate={{ backgroundColor: currentTheme.background }}
      transition={{ duration: 1 }}
      className="min-h-screen p-4 md:p-8 lg:p-16 overflow-x-hidden"
    >
      <div className="max-w-screen-2xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white rounded-[4rem] overflow-hidden shadow-premium border border-white/40 flex flex-col md:flex-row min-h-[90vh]"
        >
          {/* Calendar Workspace */}
          <div className="flex-1 flex flex-col border-b md:border-b-0 md:border-r border-gray-100/50">
            <HeroSection 
              theme={currentTheme}
              currentYear={currentDate.getFullYear()} 
            />
            
            <div className="flex-1 flex flex-col">
              <CalendarHeader
                theme={currentTheme}
                currentYear={currentDate.getFullYear()}
                onPreviousMonth={handlePreviousMonth}
                onNextMonth={handleNextMonth}
                onToday={handleToday}
              />
              
              <div className="flex-1 overflow-x-auto">
                <div className="min-w-[800px] md:min-w-0">
                  <CalendarGrid
                    currentDate={currentDate}
                    theme={currentTheme}
                    startDate={startDate}
                    endDate={endDate}
                    onDateClick={handleDateClick}
                    holidays={SAMPLE_HOLIDAYS}
                  />
                </div>
              </div>
            </div>
            
            <div className="p-8 bg-gray-50/10 flex justify-between items-center px-16">
               <div className="flex items-center gap-6">
                 <div className="text-[10px] font-black uppercase tracking-[0.5em] text-muted/30">
                    Wallique 2026
                 </div>
                 <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: currentTheme.accent }} />
                 <p className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: currentTheme.primary }}>{currentTheme.mood}</p>
               </div>
               <div className="flex gap-2 text-[10px] font-black text-muted/20 uppercase tracking-widest">
                 <span>Privacy</span>
                 <span>•</span>
                 <span>Archive</span>
               </div>
            </div>
          </div>

          {/* Journal Narrative */}
          <div className="w-full md:w-[450px] lg:w-[500px]">
             <NotesPanel
                theme={currentTheme}
                startDate={startDate}
                endDate={endDate}
                notes={notes}
                onSaveNote={saveNote}
                onClearNotes={clearNotes}
             />
          </div>
        </motion.div>
      </div>
      
      {/* Dynamic Background Accents */}
      <motion.div 
        animate={{ backgroundColor: currentTheme.accent, opacity: 0.05 }}
        className="fixed -top-32 -left-32 w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div 
        animate={{ backgroundColor: currentTheme.primary, opacity: 0.03 }}
        className="fixed -bottom-32 -right-32 w-[800px] h-[800px] rounded-full blur-[150px] pointer-events-none"
      />
    </motion.main>
  );
}
