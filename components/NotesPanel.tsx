'use client';

import { useState, useEffect } from 'react';
import { format, differenceInDays } from 'date-fns';
import { Quote, Bookmark, Trash2, Send, Wind, Layout } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MonthTheme } from '@/lib/themes';

interface NotesPanelProps {
  theme: MonthTheme;
  startDate: Date | null;
  endDate: Date | null;
  notes: Record<string, string>;
  onSaveNote: (key: string, content: string) => void;
  onClearNotes: () => void;
}

export default function NotesPanel({
  theme,
  startDate,
  endDate,
  notes,
  onSaveNote,
  onClearNotes,
}: NotesPanelProps) {
  const [noteContent, setNoteContent] = useState('');
  
  const getActiveKey = () => {
    if (startDate && endDate) {
      const start = startDate < endDate ? startDate : endDate;
      const end = startDate < endDate ? endDate : startDate;
      return `range_${format(start, 'yyyy-MM-dd')}_${format(end, 'yyyy-MM-dd')}`;
    }
    return 'general';
  };

  const activeKey = getActiveKey();

  useEffect(() => {
    setNoteContent(notes[activeKey] || '');
  }, [activeKey, notes]);

  const dayCount = startDate && endDate 
    ? differenceInDays(endDate > startDate ? endDate : startDate, startDate < endDate ? startDate : endDate) + 1 
    : 0;

  return (
    <div className="bg-white md:border-l border-gray-100 h-full flex flex-col shadow-inner-soft">
      <div className="p-10 border-b border-gray-50 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div 
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg"
            style={{ backgroundColor: theme.primary }}
          >
            <Quote className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-black tracking-tighter" style={{ color: theme.primary }}>Journal</h2>
            <p className="text-[10px] font-black text-muted uppercase tracking-[0.4em]">Curated Notes</p>
          </div>
        </div>
        <button
          onClick={onClearNotes}
          className="p-3 text-muted/30 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
          title="Clear Gallery"
        >
          <Trash2 className="w-6 h-6" />
        </button>
      </div>

      <div className="p-10 flex-1 overflow-y-auto bg-slate-50/10">
        <AnimatePresence mode="wait">
          {startDate && endDate ? (
            <motion.div
              key="active-range"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-10 p-8 rounded-[2rem] shadow-premium text-white relative overflow-hidden"
              style={{ backgroundColor: theme.primary }}
            >
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <Bookmark className="w-5 h-5" style={{ color: theme.accent }} />
                  <span className="text-[11px] font-black uppercase tracking-[0.3em]" style={{ color: theme.accent }}>Timeline</span>
                </div>
                <h3 className="text-3xl font-black tracking-tighter mb-1">
                  {dayCount} {dayCount === 1 ? 'Day' : 'Days'} Capture
                </h3>
                <p className="text-sm opacity-60 font-bold uppercase tracking-widest">
                  {format(startDate < endDate ? startDate : endDate, 'MMM d')} — {format(startDate < endDate ? endDate : startDate, 'MMM d, yyyy')}
                </p>
              </div>
              <Layout className="absolute -right-8 -bottom-8 w-48 h-48 opacity-10 text-white rotate-12" />
            </motion.div>
          ) : (
            <motion.div
              key="inactive"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-10 p-10 border-2 border-dashed border-gray-100 rounded-[2.5rem] flex flex-col items-center justify-center text-center group hover:border-accent/30 transition-all bg-white"
            >
              <div 
                className="p-6 rounded-2xl mb-5 group-hover:rotate-12 transition-transform duration-500"
                style={{ backgroundColor: `${theme.accent}10` }}
              >
                 <Wind className="w-10 h-10" style={{ color: theme.accent }} />
              </div>
              <h3 className="text-lg font-black text-primary mb-2">Awaiting Selection</h3>
              <p className="text-sm text-muted/60 max-w-[220px] font-bold leading-relaxed lowercase">tap a range on your {theme.name} calendar to begin journaling.</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative">
          <textarea
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            placeholder={`How is your ${theme.name} going?`}
            className="w-full min-h-[300px] p-8 text-gray-700 bg-white rounded-[2rem] border border-gray-50 shadow-subtle focus:shadow-premium focus:ring-0 focus:border-accent/30 outline-none transition-all resize-none text-lg font-bold leading-relaxed"
          />
          <button
            onClick={() => onSaveNote(activeKey, noteContent)}
            className="absolute bottom-10 right-10 p-5 text-white rounded-2xl shadow-premium hover:scale-110 active:scale-90 transition-all"
            style={{ backgroundColor: theme.primary }}
          >
            <Send className="w-6 h-6" />
          </button>
        </div>

        <div className="mt-14">
          <div className="flex items-center gap-4 mb-8">
            <h3 className="text-xs font-black text-primary font-black uppercase tracking-[0.5em]">The Registry</h3>
            <div className="flex-1 h-px bg-gray-100" />
          </div>
          <div className="space-y-6">
             {Object.entries(notes).filter(([_, v]) => v).length === 0 ? (
               <div className="py-20 text-center opacity-10 grayscale">
                 <p className="text-sm font-black uppercase tracking-widest italic">Silent Gallery</p>
               </div>
             ) : (
               Object.entries(notes).map(([key, value]) => {
                 if (!value) return null;
                 const isGeneral = key === 'general';
                 return (
                   <motion.div 
                     layout
                     initial={{ opacity: 0, x: -10 }}
                     animate={{ opacity: 1, x: 0 }}
                     key={key} 
                     className="p-6 bg-white border border-gray-50 rounded-2xl hover:shadow-premium transition-all relative overflow-hidden group shadow-sm"
                   >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.accent }} />
                        <span className="text-[10px] font-black text-muted uppercase tracking-widest">
                          {isGeneral ? `Focus for ${theme.name}` : key.replace('range_', '').replace('_', ' → ')}
                        </span>
                      </div>
                      <p className="text-base text-primary/70 font-bold leading-relaxed line-clamp-3 italic">"{value}"</p>
                   </motion.div>
                 );
               })
             )}
          </div>
        </div>
      </div>
    </div>
  );
}
